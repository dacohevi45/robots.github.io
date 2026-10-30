/* Widgets interactivos de la sección "Proyecto práctico". Los datos vienen en <script id="datos-widget">. */
(function () {
  var cont = document.getElementById('widget');
  var fuente = document.getElementById('datos-widget');
  if (!cont || !fuente) return;

  var datos;
  try { datos = JSON.parse(fuente.textContent); }
  catch (err) { cont.textContent = 'No se pudieron cargar los datos del widget.'; return; }

  function el(tag, clase, texto) {
    var n = document.createElement(tag);
    if (clase) n.className = clase;
    if (texto != null) n.textContent = texto;
    return n;
  }
  function num(n, dec) {
    if (n == null || isNaN(n)) return '—';
    return Number(n).toLocaleString('es-CO', { maximumFractionDigits: dec == null ? 2 : dec });
  }

  /* ---------------------------------------------------------- QUIZ */
  function quiz() {
    var P = datos.preguntas || [];
    var i = 0, aciertos = 0;
    var caja = el('div', 'quiz');
    cont.appendChild(caja);

    function mostrar() {
      caja.innerHTML = '';
      if (i >= P.length) return resultado();

      var p = P[i];
      var respondida = false;
      caja.appendChild(el('div', 'quiz-progreso', 'Pregunta ' + (i + 1) + ' de ' + P.length));
      var barra = el('div', 'quiz-barra');
      var rel = el('span');
      rel.style.width = (i / P.length * 100) + '%';
      barra.appendChild(rel);
      caja.appendChild(barra);
      caja.appendChild(el('h3', 'quiz-pregunta', p.pregunta));

      var ops = el('div', 'quiz-opciones');
      var fb = el('div', 'quiz-feedback');
      var sig = el('button', 'boton quiz-siguiente', i === P.length - 1 ? 'Ver resultado' : 'Siguiente pregunta →');
      sig.type = 'button';
      sig.hidden = true;

      p.opciones.forEach(function (texto, k) {
        var b = el('button', 'quiz-opcion', texto);
        b.type = 'button';
        b.addEventListener('click', function () {
          if (respondida) return;
          respondida = true;
          var ok = k === p.correcta;
          if (ok) { aciertos++; b.classList.add('ok'); }
          else { b.classList.add('mal'); ops.children[p.correcta].classList.add('ok'); }
          Array.prototype.forEach.call(ops.children, function (c) { c.disabled = true; });
          fb.textContent = (ok ? '✅ ¡Correcto! ' : '❌ Incorrecto. ') + (p.explicacion || '');
          fb.className = 'quiz-feedback visible ' + (ok ? 'ok' : 'mal');
          sig.hidden = false;
          sig.focus();
        });
        ops.appendChild(b);
      });
      caja.appendChild(ops);
      caja.appendChild(fb);
      sig.addEventListener('click', function () { i++; mostrar(); });
      caja.appendChild(sig);
    }

    function resultado() {
      var pct = Math.round(aciertos / P.length * 100);
      var msg = pct >= 80 ? '¡Excelente! Dominas el tema.' : pct >= 50 ? 'Buen trabajo. Repasa las secciones del sitio para afianzar.' : 'Te recomiendo repasar las secciones de Fundamentos y Aplicaciones.';
      caja.appendChild(el('h3', 'quiz-pregunta', 'Resultado'));
      caja.appendChild(el('div', 'quiz-puntaje', aciertos + ' / ' + P.length + ' (' + pct + '%)'));
      caja.appendChild(el('p', '', msg));
      var otra = el('button', 'boton', 'Intentarlo de nuevo');
      otra.type = 'button';
      otra.addEventListener('click', function () { i = 0; aciertos = 0; mostrar(); });
      caja.appendChild(otra);
    }
    mostrar();
  }

  /* ------------------------------------------------ LÍNEA DE TIEMPO */
  function linea() {
    var ev = (datos.eventos || []).slice().sort(function (a, b) { return a.anio - b.anio; });
    var barra = el('div', 'tl-acciones');
    var abrir = el('button', 'tl-boton', 'Expandir todo');
    var cerrar = el('button', 'tl-boton', 'Contraer todo');
    abrir.type = cerrar.type = 'button';
    barra.appendChild(abrir);
    barra.appendChild(cerrar);
    cont.appendChild(barra);

    var lista = el('div', 'tl');
    var items = ev.map(function (x) {
      var d = document.createElement('details');
      d.className = 'tl-item';
      var s = document.createElement('summary');
      s.appendChild(el('span', 'tl-anio', String(x.anio)));
      s.appendChild(el('span', 'tl-titulo', x.titulo));
      d.appendChild(s);
      d.appendChild(el('p', 'tl-desc', x.descripcion));
      lista.appendChild(d);
      return d;
    });
    cont.appendChild(lista);
    abrir.addEventListener('click', function () { items.forEach(function (d) { d.open = true; }); });
    cerrar.addEventListener('click', function () { items.forEach(function (d) { d.open = false; }); });
    if (items[0]) items[0].open = true;
  }

  /* --------------------------------------------------- COMPARADOR */
  function comparador() {
    var R = datos.robots || [];
    var cols = [
      { k: 'nombre', t: 'Modelo' },
      { k: 'fabricante', t: 'Fabricante' },
      { k: 'carga_kg', t: 'Carga (kg)', num: true },
      { k: 'alcance_mm', t: 'Alcance (mm)', num: true },
      { k: 'repetibilidad_mm', t: 'Repetibilidad (±mm)', num: true },
      { k: 'ejes', t: 'Ejes', num: true }
    ];
    var orden = { k: null, asc: true };
    var sel = [];
    var cargaMin = 0;
    var maxCarga = Math.max.apply(null, R.map(function (r) { return r.carga_kg || 0; }));

    var filtro = el('div', 'cmp-filtro');
    var lab = el('label', '', 'Carga útil mínima: ');
    var out = el('strong', '', '0 kg');
    var rango = document.createElement('input');
    rango.type = 'range'; rango.min = 0; rango.max = Math.ceil(maxCarga); rango.step = 1; rango.value = 0;
    rango.setAttribute('aria-label', 'Carga útil mínima en kilogramos');
    lab.appendChild(out);
    filtro.appendChild(lab);
    filtro.appendChild(rango);
    cont.appendChild(filtro);
    cont.appendChild(el('p', 'cmp-ayuda', 'Haz clic en los encabezados para ordenar y marca hasta 3 modelos para compararlos.'));

    var envoltura = el('div', 'tabla-contenedor cmp-tabla');
    cont.appendChild(envoltura);
    var panel = el('div', 'cmp-panel');
    cont.appendChild(panel);

    function dibujaTabla() {
      envoltura.innerHTML = '';
      var datosVisibles = R.filter(function (r) { return (r.carga_kg || 0) >= cargaMin; });
      if (orden.k) {
        datosVisibles.sort(function (a, b) {
          var x = a[orden.k], y = b[orden.k];
          if (x == null && y == null) return 0;
          if (x == null) return 1;
          if (y == null) return -1;
          var c = typeof x === 'string' ? x.localeCompare(y) : x - y;
          return orden.asc ? c : -c;
        });
      }
      var t = el('table', 'tabla-estructura');
      var th = el('thead');
      var trh = el('tr');
      trh.appendChild(el('th', '', ''));
      cols.forEach(function (c) {
        var h = el('th', 'cmp-th', c.t + (orden.k === c.k ? (orden.asc ? ' ▲' : ' ▼') : ''));
        h.tabIndex = 0;
        h.setAttribute('role', 'button');
        function ordenar() {
          if (orden.k === c.k) orden.asc = !orden.asc; else { orden.k = c.k; orden.asc = true; }
          dibujaTabla();
        }
        h.addEventListener('click', ordenar);
        h.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ordenar(); } });
        trh.appendChild(h);
      });
      th.appendChild(trh);
      t.appendChild(th);
      var tb = el('tbody');
      datosVisibles.forEach(function (r) {
        var tr = el('tr');
        var td0 = el('td');
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = sel.indexOf(r.nombre) !== -1;
        cb.setAttribute('aria-label', 'Comparar ' + r.nombre);
        cb.addEventListener('change', function () {
          if (cb.checked) {
            if (sel.length >= 3) { cb.checked = false; return; }
            sel.push(r.nombre);
          } else {
            sel = sel.filter(function (n) { return n !== r.nombre; });
          }
          dibujaPanel();
        });
        td0.appendChild(cb);
        tr.appendChild(td0);
        cols.forEach(function (c) {
          var v = r[c.k];
          tr.appendChild(el('td', '', c.num ? num(v, 3) : v));
        });
        tb.appendChild(tr);
      });
      if (!datosVisibles.length) {
        var f = el('tr'); var c = el('td', '', 'Ningún modelo cumple el filtro.'); c.colSpan = cols.length + 1; f.appendChild(c); tb.appendChild(f);
      }
      t.appendChild(tb);
      envoltura.appendChild(t);
    }

    function dibujaPanel() {
      panel.innerHTML = '';
      var elegidos = R.filter(function (r) { return sel.indexOf(r.nombre) !== -1; });
      if (elegidos.length < 2) {
        panel.appendChild(el('p', 'cmp-ayuda', elegidos.length ? 'Selecciona al menos un modelo más para compararlos.' : ''));
        return;
      }
      var maxAlc = Math.max.apply(null, R.map(function (r) { return r.alcance_mm || 0; }));
      var mejorCarga = Math.max.apply(null, elegidos.map(function (r) { return r.carga_kg || 0; }));
      var mejorAlc = Math.max.apply(null, elegidos.map(function (r) { return r.alcance_mm || 0; }));
      var reps = elegidos.map(function (r) { return r.repetibilidad_mm; }).filter(function (v) { return v != null; });
      var mejorRep = reps.length ? Math.min.apply(null, reps) : null;

      var grid = el('div', 'cmp-grid');
      elegidos.forEach(function (r) {
        var c = el('div', 'cmp-card');
        c.appendChild(el('h3', '', r.nombre));
        c.appendChild(el('small', '', r.fabricante));

        function fila(etq, valor, unidad, pct, mejor) {
          var f = el('div', 'cmp-fila');
          var cab = el('div', 'cmp-etq');
          cab.appendChild(el('span', '', etq));
          var v = el('strong', '', num(valor, 3) + (valor == null ? '' : ' ' + unidad));
          if (mejor) v.className = 'mejor';
          cab.appendChild(v);
          f.appendChild(cab);
          if (pct != null) {
            var b = el('div', 'cmp-barra');
            var s = el('span');
            s.style.width = Math.max(0, Math.min(100, pct)) + '%';
            b.appendChild(s);
            f.appendChild(b);
          }
          c.appendChild(f);
        }
        fila('Carga útil', r.carga_kg, 'kg', maxCarga ? (r.carga_kg || 0) / maxCarga * 100 : 0, r.carga_kg === mejorCarga);
        fila('Alcance', r.alcance_mm, 'mm', maxAlc ? (r.alcance_mm || 0) / maxAlc * 100 : 0, r.alcance_mm === mejorAlc);
        fila('Repetibilidad', r.repetibilidad_mm, '±mm', null, r.repetibilidad_mm != null && r.repetibilidad_mm === mejorRep);
        fila('Ejes', r.ejes, '', null, false);
        grid.appendChild(c);
      });
      panel.appendChild(grid);
      panel.appendChild(el('p', 'cmp-ayuda', 'En verde, el mejor valor entre los modelos elegidos (más carga, más alcance y menor repetibilidad). Las barras son relativas al máximo de la tabla. Datos de las fichas técnicas oficiales listadas en las fuentes.'));
    }

    rango.addEventListener('input', function () {
      cargaMin = Number(rango.value);
      out.textContent = cargaMin + ' kg';
      dibujaTabla();
    });
    dibujaTabla();
    dibujaPanel();
  }

  /* ---------------------------------------------------------- ROI */
  function roi() {
    var P = datos.parametros || {};
    var campos = [
      ['costo_cobot', 'Costo del robot (USD)'],
      ['costo_integracion', 'Costo de integración (USD)'],
      ['salario_mensual', 'Salario mensual con cargas sociales (USD)'],
      ['turnos_reemplazados', 'Turnos de trabajo que cubre el robot'],
      ['mantenimiento_anual', 'Mantenimiento anual (USD)']
    ];
    var inputs = {};
    var form = el('div', 'roi-form');
    campos.forEach(function (c) {
      var f = el('div', 'campo');
      var l = el('label', '', c[1]);
      var i = document.createElement('input');
      i.type = 'number'; i.min = 0; i.step = c[0] === 'turnos_reemplazados' ? 1 : 100;
      i.value = P[c[0]] != null ? P[c[0]] : 0;
      i.id = 'roi-' + c[0];
      l.setAttribute('for', i.id);
      i.addEventListener('input', calcular);
      inputs[c[0]] = i;
      f.appendChild(l);
      f.appendChild(i);
      form.appendChild(f);
    });
    cont.appendChild(form);

    var salida = el('div', 'roi-salida');
    cont.appendChild(salida);

    if (datos.notas && datos.notas.length) {
      var notas = el('div', 'roi-notas');
      notas.appendChild(el('h3', '', 'Cómo interpretar el cálculo'));
      var ul = el('ul', 'lista');
      datos.notas.forEach(function (n) { ul.appendChild(el('li', '', n)); });
      notas.appendChild(ul);
      cont.appendChild(notas);
    }

    function v(k) { var x = parseFloat(inputs[k].value); return isNaN(x) || x < 0 ? 0 : x; }

    function calcular() {
      var inversion = v('costo_cobot') + v('costo_integracion');
      var bruto = v('salario_mensual') * 12 * v('turnos_reemplazados');
      var neto = bruto - v('mantenimiento_anual');
      salida.innerHTML = '';

      function tarjeta(titulo, valor, clase) {
        var t = el('div', 'roi-tarjeta' + (clase ? ' ' + clase : ''));
        t.appendChild(el('small', '', titulo));
        t.appendChild(el('strong', '', valor));
        salida.appendChild(t);
      }
      tarjeta('Inversión inicial', 'USD ' + num(inversion, 0));
      tarjeta('Ahorro anual bruto', 'USD ' + num(bruto, 0));
      tarjeta('Ahorro anual neto', 'USD ' + num(neto, 0), neto <= 0 ? 'mal' : '');
      if (neto > 0) {
        var anios = inversion / neto;
        var meses = Math.round(anios * 12);
        tarjeta('Recuperación de la inversión', num(anios, 1) + ' años (≈ ' + num(meses, 0) + ' meses)', 'ok');
        tarjeta('Balance acumulado a 5 años', 'USD ' + num(neto * 5 - inversion, 0), neto * 5 - inversion < 0 ? 'mal' : 'ok');
      } else {
        tarjeta('Recuperación de la inversión', 'No se recupera con estos valores', 'mal');
      }
    }
    calcular();
  }

  /* ------------------------------------------------------ GLOSARIO */
  function glosario() {
    var T = (datos.terminos || []).slice().sort(function (a, b) { return a.termino.localeCompare(b.termino, 'es'); });
    var buscador = document.createElement('input');
    buscador.type = 'search';
    buscador.className = 'glo-buscador';
    buscador.placeholder = 'Buscar un término…';
    buscador.setAttribute('aria-label', 'Buscar en el glosario');
    cont.appendChild(buscador);
    var cuenta = el('p', 'cmp-ayuda');
    cont.appendChild(cuenta);
    var lista = el('dl', 'glo-lista');
    cont.appendChild(lista);

    function dibujar() {
      var q = buscador.value.trim().toLowerCase();
      lista.innerHTML = '';
      var visibles = T.filter(function (t) {
        return !q || t.termino.toLowerCase().indexOf(q) !== -1 || t.definicion.toLowerCase().indexOf(q) !== -1;
      });
      var letra = '';
      visibles.forEach(function (t) {
        var l = t.termino.charAt(0).toUpperCase();
        if (l !== letra) { letra = l; lista.appendChild(el('div', 'glo-letra', l)); }
        var dt = el('dt', '', t.termino);
        var dd = el('dd', '', t.definicion);
        lista.appendChild(dt);
        lista.appendChild(dd);
      });
      cuenta.textContent = visibles.length + ' de ' + T.length + ' términos';
      if (!visibles.length) lista.appendChild(el('p', '', 'No se encontraron términos.'));
    }
    buscador.addEventListener('input', dibujar);
    dibujar();
  }

  var mapa = { quiz: quiz, linea_tiempo: linea, comparador: comparador, roi: roi, glosario: glosario };
  var fn = mapa[cont.getAttribute('data-tipo')];
  if (fn) fn();
})();
