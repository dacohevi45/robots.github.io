// ===== DATOS =====
const estados = [
  { nombre: 'Nueva Gales del Sur', abrev: 'NSW', capital: 'Sídney', area: 800642, poblacion: '8,47 millones', color: '#2980b9',
    ciudades: [
      { nombre: 'Sídney', sitios: [
        { nombre: 'Ópera de Sídney', imagen: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Ópera_de_Sídney' },
        { nombre: 'Puente de la Bahía de Sídney', imagen: 'https://images.unsplash.com/photo-1524820197278-540916411e20?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Puente_de_la_Bahía_de_Sídney' }
      ]},
      { nombre: 'Newcastle', sitios: [
        { nombre: 'Faro de Nobbys Head', imagen: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Faro_de_Nobbys_Head' },
        { nombre: 'Playa Newcastle', imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Newcastle_(Nueva_Gales_del_Sur)' }
      ]},
      { nombre: 'Coffs Harbour', sitios: [
        { nombre: 'Parque Nacional de Coffs Coast', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Parque_Nacional_de_Coffs_Coast' },
        { nombre: 'Muelle de Coffs Harbour', imagen: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Coffs_Harbour' }
      ]}
    ]
  },
  { nombre: 'Victoria', abrev: 'VIC', capital: 'Melbourne', area: 227416, poblacion: '6,96 millones', color: '#27ae60',
    ciudades: [
      { nombre: 'Melbourne', sitios: [
        { nombre: 'Federación Square', imagen: 'https://images.unsplash.com/photo-1514395462911-4b9c6c0e4a2a?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Federation_Square' },
        { nombre: 'Real Jardín Botánico', imagen: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Real_Jardín_Botánico_de_Melbourne' }
      ]},
      { nombre: 'Geelong', sitios: [
        { nombre: 'Eastern Beach', imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Geelong' },
        { nombre: 'Jardines Botánicos de Geelong', imagen: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Jardines_Botánicos_de_Geelong' }
      ]},
      { nombre: 'Ballarat', sitios: [
        { nombre: 'Sovereign Hill', imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Sovereign_Hill' },
        { nombre: 'Lago Wendouree', imagen: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Lago_Wendouree' }
      ]}
    ]
  },
  { nombre: 'Queensland', abrev: 'QLD', capital: 'Brisbane', area: 1730648, poblacion: '5,56 millones', color: '#8e44ad',
    ciudades: [
      { nombre: 'Brisbane', sitios: [
        { nombre: 'South Bank Parklands', imagen: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80', link: 'https://es.wikipedia.org/wiki/South_Bank_Parklands' },
        { nombre: 'Monte Coot-tha', imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Monte_Coot-tha' }
      ]},
      { nombre: 'Cairns', sitios: [
        { nombre: 'Gran Barrera de Coral', imagen: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Gran_Barrera_de_Coral' },
        { nombre: 'Parque Nacional Daintree', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Parque_Nacional_Daintree' }
      ]},
      { nombre: 'Gold Coast', sitios: [
        { nombre: 'Playa Surfers Paradise', imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Surfers_Paradise' },
        { nombre: 'Warner Bros. Movie World', imagen: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Warner_Bros._Movie_World' }
      ]}
    ]
  },
  { nombre: 'Australia Occidental', abrev: 'WA', capital: 'Perth', area: 2529875, poblacion: '2,95 millones', color: '#e67e22',
    ciudades: [
      { nombre: 'Perth', sitios: [
        { nombre: 'Kings Park', imagen: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Kings_Park' },
        { nombre: 'Isla Rottnest', imagen: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Isla_Rottnest' }
      ]},
      { nombre: 'Fremantle', sitios: [
        { nombre: 'Mercado de Fremantle', imagen: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Fremantle' },
        { nombre: 'Prisión de Fremantle', imagen: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Prisión_de_Fremantle' }
      ]},
      { nombre: 'Broome', sitios: [
        { nombre: 'Cable Beach', imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Cable_Beach' },
        { nombre: 'Playa Roebuck', imagen: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Broome' }
      ]}
    ]
  },
  { nombre: 'Australia Meridional', abrev: 'SA', capital: 'Adelaida', area: 983482, poblacion: '1,87 millones', color: '#16a085',
    ciudades: [
      { nombre: 'Adelaida', sitios: [
        { nombre: 'Valle Barossa', imagen: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Valle_Barossa' },
        { nombre: 'Museo de Australia Meridional', imagen: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Museo_de_Australia_Meridional' }
      ]},
      { nombre: 'Port Lincoln', sitios: [
        { nombre: 'Parque Nacional de Lincoln', imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Parque_Nacional_de_Lincoln' },
        { nombre: 'Bahía Coffin', imagen: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Port_Lincoln' }
      ]},
      { nombre: 'Victor Harbor', sitios: [
        { nombre: 'Isla Granite', imagen: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Isla_Granite' },
        { nombre: 'Bahía Encounter', imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Victor_Harbor' }
      ]}
    ]
  },
  { nombre: 'Tasmania', abrev: 'TAS', capital: 'Hobart', area: 68401, poblacion: '0,58 millones', color: '#d35400',
    ciudades: [
      { nombre: 'Hobart', sitios: [
        { nombre: 'Monte Wellington', imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Monte_Wellington' },
        { nombre: 'Museo MONA', imagen: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Museo_MONA' }
      ]},
      { nombre: 'Launceston', sitios: [
        { nombre: 'Cataract Gorge', imagen: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Cataract_Gorge' },
        { nombre: "Parque Prince's Square", imagen: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Launceston' }
      ]},
      { nombre: 'Devonport', sitios: [
        { nombre: 'Cradle Mountain', imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Monte_Cradle' },
        { nombre: 'Muelle Spirit of Tasmania', imagen: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80', link: 'https://es.wikipedia.org/wiki/Devonport' }
      ]}
    ]
  }
];

// ===== GENERAR ESTADOS =====
const container = document.getElementById('estadosContainer');
estados.forEach((estado, index) => {
  const card = document.createElement('div');
  card.className = 'estado-card';
  card.style.borderLeftColor = estado.color;

  const ciudadesHTML = estado.ciudades.map(ciudad => `
    <div class="ciudad-card" style="border-top-color: ${estado.color}">
      <h4>${ciudad.nombre}</h4>
      <ul class="sitios-lista">
        ${ciudad.sitios.map(sitio => `
          <li class="sitio-item">
            <img class="sitio-imagen" src="${sitio.imagen}" alt="${sitio.nombre}" loading="lazy"
              onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1524820197278-540916411e20?w=600&q=80'">
            <div class="sitio-info">
              <div class="sitio-nombre">${sitio.nombre}</div>
              <a class="sitio-link" href="${sitio.link}" target="_blank" rel="noopener">Ver más en Wikipedia →</a>
            </div>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="estado-header" role="button" tabindex="0" aria-expanded="false">
      <div class="estado-titulo">
        <h3>${estado.nombre} <span style="color:${estado.color}">(${estado.abrev})</span></h3>
        <span class="capital">🏙️ Capital: ${estado.capital}</span>
      </div>
      <div class="estado-meta">
        <span>📐 ${estado.area.toLocaleString('es-ES')} km²</span>
        <span>👥 ${estado.poblacion}</span>
        <span class="toggle-icon">+</span>
      </div>
    </div>
    <div class="ciudades-container"><div class="ciudades-grid">${ciudadesHTML}</div></div>
  `;

  const header = card.querySelector('.estado-header');
  const alternar = () => {
    const abierto = card.classList.toggle('open');
    header.setAttribute('aria-expanded', String(abierto));
  };
  header.addEventListener('click', alternar);
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      alternar();
    }
  });
  if (index === 0) {
    card.classList.add('open');
    header.setAttribute('aria-expanded', 'true');
  }
  container.appendChild(card);
});

// ===== TABLA =====
const tableBody = document.getElementById('tableBody');
estados.forEach(e => {
  const row = document.createElement('tr');
  row.innerHTML = `<td><strong>${e.nombre}</strong></td><td>${e.abrev}</td><td>${e.capital}</td><td>${e.area.toLocaleString('es-ES')}</td><td>${e.poblacion}</td>`;
  tableBody.appendChild(row);
});

// ============================================
// ===== WIDGETS (con diagnóstico) =====
// ============================================

const coordenadas = {
  Sydney:    { lat: -33.8688, lon: 151.2093 },
  Melbourne: { lat: -37.8136, lon: 144.9631 },
  Brisbane:  { lat: -27.4698, lon: 153.0251 },
  Perth:     { lat: -31.9505, lon: 115.8605 },
  Adelaide:  { lat: -34.9285, lon: 138.6007 },
  Hobart:    { lat: -42.8821, lon: 147.3272 }
};

function codigoClima(code) {
  const mapa = {
    0:  { icono: '☀️', texto: 'Despejado' },
    1:  { icono: '🌤️', texto: 'Mayormente despejado' },
    2:  { icono: '⛅', texto: 'Parcialmente nublado' },
    3:  { icono: '☁️', texto: 'Nublado' },
    45: { icono: '🌫️', texto: 'Niebla' },
    48: { icono: '🌫️', texto: 'Niebla helada' },
    51: { icono: '🌦️', texto: 'Llovizna ligera' },
    53: { icono: '🌦️', texto: 'Llovizna moderada' },
    55: { icono: '🌧️', texto: 'Llovizna densa' },
    61: { icono: '🌧️', texto: 'Lluvia ligera' },
    63: { icono: '🌧️', texto: 'Lluvia moderada' },
    65: { icono: '🌧️', texto: 'Lluvia fuerte' },
    66: { icono: '🌧️', texto: 'Lluvia helada' },
    71: { icono: '🌨️', texto: 'Nieve ligera' },
    73: { icono: '🌨️', texto: 'Nieve moderada' },
    75: { icono: '❄️', texto: 'Nieve fuerte' },
    80: { icono: '🌦️', texto: 'Chubascos' },
    81: { icono: '🌦️', texto: 'Chubascos moderados' },
    82: { icono: '⛈️', texto: 'Chubascos violentos' },
    95: { icono: '⛈️', texto: 'Tormenta' },
    96: { icono: '⛈️', texto: 'Tormenta con granizo' },
    99: { icono: '⛈️', texto: 'Tormenta fuerte con granizo' }
  };
  return mapa[code] || { icono: '🌡️', texto: 'Desconocido' };
}

// Fetch con timeout para no quedarse colgado
function fetchConTimeout(url, ms = 8000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Tiempo de espera agotado (8s)')), ms))
  ]);
}

// ----- CLIMA -----
async function cargarClima(ciudad) {
  const resultado = document.getElementById('climaResultado');
  resultado.innerHTML = '<p class="loading">Cargando clima...</p>';
  const { lat, lon } = coordenadas[ciudad];

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=auto`;
    const res = await fetchConTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    const clima = codigoClima(c.weather_code);

    resultado.innerHTML = `
      <div class="clima-principal">
        <span class="clima-icono">${clima.icono}</span>
        <div>
          <div class="clima-temp">${Math.round(c.temperature_2m)}°C</div>
          <div class="clima-detalle">${clima.texto}</div>
        </div>
      </div>
      <div class="clima-detalle">
        💧 Humedad: ${c.relative_humidity_2m}% · 🌬️ Viento: ${Math.round(c.wind_speed_10m)} km/h
      </div>
    `;
  } catch (err) {
    resultado.innerHTML = `<p class="loading">⚠️ No se pudo cargar el clima<br><small>${err.message}</small></p>`;
  }
}

// ----- PRONÓSTICO -----
async function cargarPronostico(ciudad) {
  const cont = document.getElementById('pronostico');
  cont.innerHTML = '<p class="loading">Cargando pronóstico...</p>';
  const { lat, lon } = coordenadas[ciudad];

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
    const res = await fetchConTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.daily) throw new Error('Sin datos diarios');

    cont.innerHTML = data.daily.time.map((fecha, i) => {
      const clima = codigoClima(data.daily.weather_code[i]);
      const dia = new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short' });
      return `
        <div class="dia-pronostico">
          <div class="dia-nombre">${dia}</div>
          <div class="dia-icono">${clima.icono}</div>
          <div class="dia-temp">${Math.round(data.daily.temperature_2m_max[i])}°</div>
          <div class="dia-min">${Math.round(data.daily.temperature_2m_min[i])}°</div>
        </div>
      `;
    }).join('');
  } catch (err) {
    cont.innerHTML = `<p class="loading">⚠️ No se pudo cargar el pronóstico<br><small>${err.message}</small></p>`;
  }
}

// ----- CAMBIO -----
// Las tasas se piden una sola vez y se reutilizan mientras el usuario escribe
let tasasPromesa = null;
function obtenerTasas() {
  if (!tasasPromesa) {
    tasasPromesa = fetchConTimeout('https://open.er-api.com/v6/latest/AUD')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.rates) throw new Error('Respuesta sin tasas');
        return data.rates;
      })
      .catch(err => {
        tasasPromesa = null; // permite reintentar en el siguiente cambio
        throw err;
      });
  }
  return tasasPromesa;
}

async function cargarCambio() {
  const monto = parseFloat(document.getElementById('montoAUD').value) || 0;
  const destino = document.getElementById('monedaDestino').value;
  const resultado = document.getElementById('cambioResultado');
  resultado.innerHTML = '<p class="loading">Convirtiendo...</p>';

  try {
    const rates = await obtenerTasas();
    const tasa = rates[destino];
    if (typeof tasa !== 'number') throw new Error(`Sin tasa para ${destino}`);
    const convertido = (monto * tasa).toFixed(2);
    resultado.innerHTML = `
      <div class="resultado-cambio">${monto} AUD = ${convertido} ${destino}</div>
      <div class="tasa-info">1 AUD = ${tasa.toFixed(4)} ${destino}</div>
    `;
  } catch (err) {
    resultado.innerHTML = `<p class="loading">⚠️ No se pudo cargar la tasa<br><small>${err.message}</small></p>`;
  }
}

// ----- RELOJES -----
const zonasHorarias = [
  { ciudad: 'Sídney',    tz: 'Australia/Sydney' },
  { ciudad: 'Melbourne', tz: 'Australia/Melbourne' },
  { ciudad: 'Brisbane',  tz: 'Australia/Brisbane' },
  { ciudad: 'Perth',     tz: 'Australia/Perth' },
  { ciudad: 'Adelaida',  tz: 'Australia/Adelaide' },
  { ciudad: 'Darwin',    tz: 'Australia/Darwin' }
];

function actualizarRelojes() {
  const cont = document.getElementById('relojes');
  cont.innerHTML = zonasHorarias.map(z => {
    const hora = new Date().toLocaleTimeString('es-ES', { timeZone: z.tz, hour: '2-digit', minute: '2-digit' });
    return `<div class="reloj-item"><div class="reloj-ciudad">${z.ciudad}</div><div class="reloj-hora">${hora}</div></div>`;
  }).join('');
}

// ===== INICIALIZAR =====
document.getElementById('ciudadClima').addEventListener('change', (e) => {
  cargarClima(e.target.value);
  cargarPronostico(e.target.value);
  document.getElementById('ciudadPronostico').textContent = e.target.options[e.target.selectedIndex].text;
});
document.getElementById('montoAUD').addEventListener('input', cargarCambio);
document.getElementById('monedaDestino').addEventListener('change', cargarCambio);

cargarClima('Sydney');
cargarPronostico('Sydney');
cargarCambio();
actualizarRelojes();
setInterval(actualizarRelojes, 1000);

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});