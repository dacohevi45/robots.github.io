/* Menú y pie de página compartidos. Se generan desde aquí para cambiarlos en un solo lugar. */
(function () {
  var ESTRUCTURA = [{"slug": "fundamentos", "titulo": "Fundamentos tecnológicos", "corto": "Fundamentos", "icono": "⚙️", "subs": [{"slug": "que-es-un-cobot", "titulo": "¿Qué es un robot colaborativo?"}, {"slug": "componentes-mecanicos", "titulo": "Componentes mecánicos: brazo, articulaciones y pinzas"}, {"slug": "sensores-percepcion", "titulo": "Sensores y percepción del entorno"}, {"slug": "control-programacion", "titulo": "Sistemas de control y programación"}, {"slug": "seguridad-normativas", "titulo": "Seguridad y normativas (ISO 10218 e ISO/TS 15066)"}, {"slug": "ia-vision-artificial", "titulo": "Inteligencia artificial y visión artificial"}, {"slug": "comunicacion-redes", "titulo": "Comunicación y redes industriales"}]}, {"slug": "evolucion", "titulo": "Evolución tecnológica", "corto": "Evolución", "icono": "📈", "subs": [{"slug": "origenes-robotica-industrial", "titulo": "Orígenes de la robótica industrial"}, {"slug": "concepto-de-cobot", "titulo": "El concepto de cobot en los años 90"}, {"slug": "primeros-cobots-comerciales", "titulo": "Primeros cobots comerciales"}, {"slug": "normalizacion-y-madurez", "titulo": "Normalización y madurez del mercado"}, {"slug": "llegada-ia-y-vision", "titulo": "La llegada de la IA y la visión artificial"}, {"slug": "robots-moviles-humanoides", "titulo": "Manipuladores móviles y humanoides"}, {"slug": "tendencias-futuras", "titulo": "Tendencias futuras"}]}, {"slug": "noticias", "titulo": "Noticias y actualidad", "corto": "Noticias", "icono": "📰", "subs": [{"slug": "mercado-global", "titulo": "El mercado global de cobots"}, {"slug": "principales-fabricantes", "titulo": "Principales fabricantes"}, {"slug": "cobots-e-ia-generativa", "titulo": "Cobots e inteligencia artificial generativa"}, {"slug": "humanoides-colaborativos", "titulo": "Humanoides en entornos colaborativos"}, {"slug": "colombia-y-latinoamerica", "titulo": "Colombia y Latinoamérica"}, {"slug": "casos-de-exito", "titulo": "Casos de éxito recientes"}, {"slug": "estadisticas-y-eventos", "titulo": "Estadísticas, informes y eventos del sector"}]}, {"slug": "aplicaciones", "titulo": "Aplicaciones tecnológicas", "corto": "Aplicaciones", "icono": "🏭", "subs": [{"slug": "manufactura-ensamblaje", "titulo": "Manufactura y ensamblaje"}, {"slug": "logistica-almacenes", "titulo": "Logística y almacenes"}, {"slug": "salud-rehabilitacion", "titulo": "Salud y rehabilitación"}, {"slug": "agricultura", "titulo": "Agricultura"}, {"slug": "alimentos-y-bebidas", "titulo": "Alimentos y bebidas"}, {"slug": "educacion-investigacion", "titulo": "Educación e investigación"}, {"slug": "robots-en-enjambre", "titulo": "Robots en enjambre y colaboración multi-robot"}]}, {"slug": "impacto", "titulo": "Impacto social, ambiental y ético", "corto": "Impacto", "icono": "🌍", "subs": [{"slug": "empleo-y-futuro-del-trabajo", "titulo": "Empleo y futuro del trabajo"}, {"slug": "seguridad-salud-laboral", "titulo": "Seguridad y salud laboral"}, {"slug": "ergonomia-bienestar", "titulo": "Ergonomía y bienestar de los trabajadores"}, {"slug": "impacto-ambiental", "titulo": "Impacto ambiental y eficiencia energética"}, {"slug": "etica-y-responsabilidad", "titulo": "Ética y responsabilidad"}, {"slug": "capacitacion-y-brecha-de-habilidades", "titulo": "Capacitación y brecha de habilidades"}, {"slug": "accesibilidad-e-inclusion", "titulo": "Accesibilidad e inclusión"}]}, {"slug": "proyecto", "titulo": "Proyecto práctico e interactividad", "corto": "Proyecto", "icono": "🧪", "subs": [{"slug": "quiz", "titulo": "Quiz interactivo"}, {"slug": "linea-de-tiempo", "titulo": "Línea de tiempo interactiva"}, {"slug": "comparador-de-cobots", "titulo": "Comparador de robots"}, {"slug": "calculadora-roi", "titulo": "Calculadora de retorno de inversión"}, {"slug": "glosario", "titulo": "Glosario interactivo"}, {"slug": "guia-de-proyecto", "titulo": "Guía para un proyecto con robots"}, {"slug": "conclusiones", "titulo": "Conclusiones y evaluación"}]}];
  var script = document.currentScript;
  var BASE = new URL('.', script.src).href;
  var ruta = location.pathname;

  function el(tag, attrs, hijos) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]);
    });
    (hijos || []).forEach(function (h) { n.appendChild(h); });
    return n;
  }
  function href(p) { return BASE + p; }
  function esActual(p) {
    var u = new URL(BASE + p).pathname;
    return ruta === u || (ruta.charAt(ruta.length - 1) === '/' && u === ruta + 'index.html');
  }

  var nav = el('nav', { 'class': 'site-nav', 'aria-label': 'Navegación principal' });
  var inner = el('div', { 'class': 'site-nav-inner' });
  inner.appendChild(el('a', { 'class': 'site-logo', href: href('index.html'), text: '🤖 Robots Colaborativos' }));

  var toggle = el('button', { 'class': 'menu-toggle', type: 'button', 'aria-expanded': 'false', 'aria-label': 'Abrir menú', text: '☰' });
  inner.appendChild(toggle);

  var ul = el('ul', { 'class': 'menu-principal' });

  function simple(texto, p, activo) {
    var li = el('li', activo ? { 'class': 'activo' } : {});
    li.appendChild(el('a', { href: href(p), text: texto }));
    return li;
  }

  ul.appendChild(simple('Inicio', 'index.html', esActual('index.html') && !location.hash));

  ESTRUCTURA.forEach(function (s) {
    var enSeccion = ruta.indexOf('/' + s.slug + '/') !== -1;
    var li = el('li', { 'class': 'tiene-sub' + (enSeccion ? ' activo' : '') });
    li.appendChild(el('a', { href: href(s.slug + '/index.html'), text: s.corto }));
    var b = el('button', { 'class': 'sub-toggle', type: 'button', 'aria-expanded': 'false', 'aria-label': 'Mostrar subpáginas de ' + s.corto, text: '▾' });
    li.appendChild(b);
    var sub = el('ul', { 'class': 'submenu' });
    var ver = el('li', { 'class': 'ver-seccion' });
    ver.appendChild(el('a', { href: href(s.slug + '/index.html'), text: s.icono + ' ' + s.titulo }));
    sub.appendChild(ver);
    s.subs.forEach(function (x) {
      var item = el('li');
      var a = el('a', { href: href(s.slug + '/' + x.slug + '.html'), text: x.titulo });
      if (esActual(s.slug + '/' + x.slug + '.html')) a.className = 'activo';
      item.appendChild(a);
      sub.appendChild(item);
    });
    li.appendChild(sub);
    b.addEventListener('click', function () {
      var abierto = li.classList.toggle('abierto');
      b.setAttribute('aria-expanded', String(abierto));
    });
    ul.appendChild(li);
  });

  ul.appendChild(simple('Repositorio', 'repositorios.html', esActual('repositorios.html')));
  ul.appendChild(simple('Australia', 'index.html#australia', false));
  inner.appendChild(ul);
  nav.appendChild(inner);

  toggle.addEventListener('click', function () {
    var abierto = nav.classList.toggle('abierto');
    toggle.setAttribute('aria-expanded', String(abierto));
    toggle.textContent = abierto ? '✕' : '☰';
  });

  var destino = document.getElementById('site-nav');
  if (destino) destino.appendChild(nav);

  var pie = document.getElementById('site-footer');
  if (pie) {
    pie.appendChild(el('p', { text: '© 2026 · Sitio educativo realizado por David Correa Herrera' }));
    pie.appendChild(el('p', { text: 'Tecnológico de Antioquia' }));
  }
})();
