// ===== REPOSITORIOS =====
// Los archivos se guardan en IndexedDB (soporta archivos grandes, como videos pesados).
// Quedan almacenados en el navegador de quien los sube.

const DB_NOMBRE = 'repositorios-robots';
const DB_TIENDA = 'archivos';

const form = document.getElementById('formSubida');
const inputTitulo = document.getElementById('titulo');
const inputDesc = document.getElementById('descripcion');
const inputArchivo = document.getElementById('archivo');
const zona = document.getElementById('zonaArchivo');
const vistaPrevia = document.getElementById('vistaPrevia');
const nombreSel = document.getElementById('nombreSeleccionado');
const barra = document.getElementById('barraProgreso');
const barraInterna = barra.querySelector('span');
const mensaje = document.getElementById('mensajeForm');
const btnSubir = document.getElementById('btnSubir');
const lista = document.getElementById('listaRepos');
const contador = document.getElementById('contador');

let urlPreview = null;
let urlsLista = [];

// ----- IndexedDB -----
function abrirDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NOMBRE, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(DB_TIENDA, { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function guardarRegistro(registro) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_TIENDA, 'readwrite');
    tx.objectStore(DB_TIENDA).add(registro);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error('Almacenamiento lleno o transacción cancelada'));
  });
}

async function obtenerRegistros() {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction(DB_TIENDA, 'readonly').objectStore(DB_TIENDA).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function eliminarRegistro(id) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_TIENDA, 'readwrite');
    tx.objectStore(DB_TIENDA).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ----- Utilidades -----
function formatearTamano(bytes) {
  if (bytes < 1024) return bytes + ' B';
  const unidades = ['KB', 'MB', 'GB', 'TB'];
  let valor = bytes / 1024, i = 0;
  while (valor >= 1024 && i < unidades.length - 1) { valor /= 1024; i++; }
  return valor.toFixed(valor >= 100 ? 0 : 1) + ' ' + unidades[i];
}

function escaparHTML(texto) {
  const d = document.createElement('div');
  d.textContent = texto;
  return d.innerHTML;
}

function mostrarMensaje(texto, tipo = '') {
  mensaje.textContent = texto;
  mensaje.className = 'mensaje-form ' + tipo;
}

// ----- Vista previa del archivo elegido -----
function limpiarPreview() {
  if (urlPreview) { URL.revokeObjectURL(urlPreview); urlPreview = null; }
  vistaPrevia.innerHTML = '';
  vistaPrevia.classList.remove('visible');
  nombreSel.textContent = '';
}

function mostrarPreview(archivo) {
  limpiarPreview();
  if (!archivo) return;
  urlPreview = URL.createObjectURL(archivo);
  if (archivo.type.startsWith('image/')) {
    vistaPrevia.innerHTML = `<img src="${urlPreview}" alt="Vista previa">`;
  } else if (archivo.type.startsWith('video/')) {
    vistaPrevia.innerHTML = `<video src="${urlPreview}" controls preload="metadata"></video>`;
  }
  vistaPrevia.classList.add('visible');
  nombreSel.textContent = `${archivo.name} · ${formatearTamano(archivo.size)}`;
}

function archivoValido(archivo) {
  return archivo && (archivo.type.startsWith('image/') || archivo.type.startsWith('video/'));
}

inputArchivo.addEventListener('change', () => {
  const archivo = inputArchivo.files[0];
  if (archivo && !archivoValido(archivo)) {
    mostrarMensaje('Solo se permiten imágenes o videos.', 'error');
    inputArchivo.value = '';
    limpiarPreview();
    return;
  }
  mostrarMensaje('');
  mostrarPreview(archivo);
});

// Arrastrar y soltar
['dragenter', 'dragover'].forEach(ev =>
  zona.addEventListener(ev, e => { e.preventDefault(); zona.classList.add('arrastrando'); }));
['dragleave', 'drop'].forEach(ev =>
  zona.addEventListener(ev, e => { e.preventDefault(); zona.classList.remove('arrastrando'); }));
zona.addEventListener('drop', e => {
  const archivo = e.dataTransfer.files[0];
  if (!archivo) return;
  if (!archivoValido(archivo)) {
    mostrarMensaje('Solo se permiten imágenes o videos.', 'error');
    return;
  }
  const dt = new DataTransfer();
  dt.items.add(archivo);
  inputArchivo.files = dt.files;
  mostrarMensaje('');
  mostrarPreview(archivo);
});

// ----- Subida -----
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = inputTitulo.value.trim();
  const descripcion = inputDesc.value.trim();
  const archivo = inputArchivo.files[0];

  if (!titulo) return mostrarMensaje('Escribe un título.', 'error');
  if (!descripcion) return mostrarMensaje('Escribe una descripción.', 'error');
  if (!archivo) return mostrarMensaje('Selecciona una imagen o un video.', 'error');
  if (!archivoValido(archivo)) return mostrarMensaje('Solo se permiten imágenes o videos.', 'error');

  btnSubir.disabled = true;
  barra.classList.add('visible');
  barraInterna.style.width = '0%';
  mostrarMensaje('Guardando archivo...');

  // Progreso simulado: IndexedDB no reporta avance real al guardar
  let progreso = 0;
  const timer = setInterval(() => {
    progreso = Math.min(progreso + 4, 90);
    barraInterna.style.width = progreso + '%';
  }, 120);

  try {
    await guardarRegistro({
      titulo,
      descripcion,
      tipo: archivo.type,
      nombre: archivo.name,
      tamano: archivo.size,
      fecha: Date.now(),
      archivo: archivo // el File/Blob se guarda tal cual
    });
    clearInterval(timer);
    barraInterna.style.width = '100%';
    form.reset();
    limpiarPreview();
    mostrarMensaje('✅ Archivo subido correctamente.', 'ok');
    await renderizarLista();
  } catch (err) {
    clearInterval(timer);
    const lleno = err && (err.name === 'QuotaExceededError' || /quota|lleno/i.test(err.message || ''));
    mostrarMensaje(lleno
      ? '⚠️ No hay espacio suficiente en el navegador para este archivo. Elimina archivos o prueba con uno más liviano.'
      : '⚠️ No se pudo guardar el archivo: ' + (err && err.message ? err.message : 'error desconocido'),
      'error');
  } finally {
    btnSubir.disabled = false;
    setTimeout(() => { barra.classList.remove('visible'); barraInterna.style.width = '0%'; }, 700);
  }
});

// ----- Listado (uno debajo del otro) -----
async function renderizarLista() {
  urlsLista.forEach(u => URL.revokeObjectURL(u));
  urlsLista = [];

  let registros = [];
  try {
    registros = await obtenerRegistros();
  } catch (err) {
    lista.innerHTML = '<div class="repos-vacio">⚠️ No se pudo leer el almacenamiento del navegador.</div>';
    return;
  }

  registros.sort((a, b) => b.fecha - a.fecha); // más recientes primero
  contador.textContent = registros.length === 1 ? '1 archivo' : `${registros.length} archivos`;

  if (!registros.length) {
    lista.innerHTML = '<div class="repos-vacio">No tienes borradores en este navegador. Sube uno con el formulario de arriba.</div>';
    return;
  }

  lista.innerHTML = '';
  registros.forEach(r => {
    const url = URL.createObjectURL(r.archivo);
    urlsLista.push(url);

    const media = r.tipo.startsWith('video/')
      ? `<video src="${url}" controls preload="metadata"></video>`
      : `<img src="${url}" alt="${escaparHTML(r.titulo)}" loading="lazy">`;

    const fecha = new Date(r.fecha).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });

    const item = document.createElement('article');
    item.className = 'repo-item';
    item.innerHTML = `
      <h3>${escaparHTML(r.titulo)}</h3>
      <div class="repo-media">${media}</div>
      <div class="repo-cuerpo">
        <p class="repo-desc">${escaparHTML(r.descripcion)}</p>
        <div class="repo-meta">
          <span>${escaparHTML(r.nombre)} · ${formatearTamano(r.tamano)} · ${fecha}</span>
          <span class="repo-acciones">
            <button type="button" class="btn-publicar">📤 Publicar</button>
            <button type="button" class="btn-eliminar">🗑️ Eliminar</button>
          </span>
        </div>
      </div>
    `;
    item.querySelector('.btn-publicar').addEventListener('click', () => prepararPublicacion(r, item));
    item.querySelector('.btn-eliminar').addEventListener('click', async () => {
      if (!confirm(`¿Eliminar "${r.titulo}"?`)) return;
      await eliminarRegistro(r.id);
      renderizarLista();
    });
    lista.appendChild(item);
  });
}

// Pedir almacenamiento persistente (evita que el navegador borre los archivos)
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().catch(() => {});
}

// ===== PUBLICAR: pasar un borrador a la carpeta repositorio/ del proyecto =====
function nombreSeguro(nombre) {
  const partes = nombre.split('.');
  const ext = partes.length > 1 ? '.' + partes.pop().toLowerCase() : '';
  const base = partes.join('.')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'archivo';
  return base + ext;
}

function prepararPublicacion(r, item) {
  const previo = item.querySelector('.publicar-panel');
  if (previo) { previo.remove(); return; }

  const nombre = nombreSeguro(r.nombre);
  const carpeta = r.tipo.startsWith('video/') ? 'videos' : 'imagenes';
  const entrada = JSON.stringify({ titulo: r.titulo, descripcion: r.descripcion, archivo: `${carpeta}/${nombre}` }, null, 2);

  // Descarga el archivo con un nombre seguro para guardarlo en repositorio/
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(r.archivo);
  enlace.download = nombre;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  setTimeout(() => URL.revokeObjectURL(enlace.href), 5000);

  const panel = document.createElement('div');
  panel.className = 'publicar-panel';
  panel.innerHTML = `
    <p><strong>1.</strong> Se descargó <code>${nombre}</code>. Guárdalo dentro de la carpeta <code>repositorio/${carpeta}/</code> de tu proyecto.</p>
    <p><strong>2.</strong> Copia esta entrada y pégala dentro de la lista de <code>repositorio/archivos.json</code> (separada por coma de las demás):</p>
    <textarea readonly rows="6"></textarea>
    <button type="button" class="btn-copiar">Copiar entrada</button>
    <p><strong>3.</strong> Sube los cambios a GitHub. Cuando se actualice la página, aparecerá en "Archivos publicados".</p>
    <p><em>¿Es un video de más de ~25 MB? GitHub no lo aceptará. Súbelo a YouTube (no listado) o Google Drive y, en lugar de <code>"archivo"</code>, usa <code>"url": "https://..."</code> en la entrada.</em></p>
  `;
  const area = panel.querySelector('textarea');
  area.value = entrada;
  panel.querySelector('.btn-copiar').addEventListener('click', async (e) => {
    try { await navigator.clipboard.writeText(entrada); }
    catch { area.select(); document.execCommand('copy'); }
    e.target.textContent = '✅ Copiado';
  });
  item.appendChild(panel);
}

// ===== ARCHIVOS PUBLICADOS (leídos de repositorio/archivos.json) =====
const EXT_VIDEO = ['mp4', 'webm', 'mov', 'm4v', 'ogg', 'ogv'];

// Convierte un enlace de YouTube / Google Drive / Vimeo en su URL para incrustar
function embedDesdeURL(url) {
  let m = String(url).match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = String(url).match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  m = String(url).match(/vimeo\.com\/(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return null;
}

async function cargarPublicados() {
  const cont = document.getElementById('listaPublicados');
  const cnt = document.getElementById('contadorPublicados');
  try {
    const res = await fetch('repositorio/archivos.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const datos = await res.json();
    if (!Array.isArray(datos)) throw new Error('El JSON debe ser una lista []');

    cnt.textContent = datos.length === 1 ? '1 archivo' : `${datos.length} archivos`;
    if (!datos.length) {
      cont.innerHTML = '<div class="repos-vacio">Aún no hay archivos publicados.</div>';
      return;
    }

    cont.innerHTML = '';
    datos.forEach(d => {
      if (!d.archivo && !d.url) return;
      let media;
      if (d.url) {
        // Video alojado fuera de GitHub (YouTube, Google Drive, Vimeo o enlace directo a .mp4)
        const embed = embedDesdeURL(d.url);
        const urlSegura = String(d.url).replace(/"/g, '&quot;');
        const extUrl = String(d.url).split('?')[0].split('.').pop().toLowerCase();
        if (embed) {
          media = `<div class="repo-embed"><iframe src="${embed}" title="${escaparHTML(d.titulo || 'Video')}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
        } else if (EXT_VIDEO.includes(extUrl)) {
          media = `<video src="${urlSegura}" controls preload="metadata"></video>`;
        } else {
          media = `<p style="padding:30px;color:#fff;"><a style="color:#f5b041;" href="${urlSegura}" target="_blank" rel="noopener">Abrir enlace del archivo →</a></p>`;
        }
      } else {
        // Se codifica cada tramo por separado para permitir subcarpetas (imagenes/foto.jpg)
        const ruta = 'repositorio/' + String(d.archivo).split('/').map(encodeURIComponent).join('/');
        const ext = String(d.archivo).split('.').pop().toLowerCase();
        media = EXT_VIDEO.includes(ext)
          ? `<video src="${ruta}" controls preload="metadata"></video>`
          : `<img src="${ruta}" alt="${escaparHTML(d.titulo || '')}" loading="lazy">`;
      }

      const item = document.createElement('article');
      item.className = 'repo-item';
      item.innerHTML = `
        <h3>${escaparHTML(d.titulo || 'Sin título')}</h3>
        <div class="repo-media">${media}</div>
        <div class="repo-cuerpo">
          <p class="repo-desc">${escaparHTML(d.descripcion || '')}</p>
          <div class="repo-meta"><span>${escaparHTML(d.archivo || d.url || '')}</span></div>
        </div>
      `;
      cont.appendChild(item);
    });
  } catch (err) {
    cnt.textContent = '';
    cont.innerHTML = `<div class="repos-vacio">No se pudo leer <code>repositorio/archivos.json</code> (${escaparHTML(err.message)}).<br>
      Si abriste el HTML con doble clic, usa un servidor local (por ejemplo la extensión Live Server) o GitHub Pages.</div>`;
  }
}

cargarPublicados();
renderizarLista();
