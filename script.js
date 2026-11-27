/* =========================================================
   Aby Nails & Lashes — script.js
   Escrito en JavaScript clásico (ES5) para que funcione
   también en celulares y navegadores viejos.
   ========================================================= */
(function () {
  'use strict';

  /* ---- CAMBIA AQUÍ EL NÚMERO DE WHATSAPP ----
     Formato: 52 + 10 dígitos, sin espacios ni signos. */
  var PHONE = '525548588680';

  function waLink(msg) {
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);
  }

  /* 1. Todos los botones de WhatsApp usan el número de arriba */
  var links = document.querySelectorAll('[data-wa]');
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute('href', waLink(links[i].getAttribute('data-wa')));
  }
  var tels = document.querySelectorAll('[data-tel]');
  for (var t = 0; t < tels.length; t++) {
    tels[t].setAttribute('href', 'tel:+' + PHONE);
  }

  /* 2. Filtros de la galería */
  var filters = document.querySelectorAll('.filter');
  var items = document.querySelectorAll('#grid figure');

  function applyFilter(cat) {
    for (var f = 0; f < filters.length; f++) {
      var on = filters[f].getAttribute('data-filter') === cat;
      filters[f].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    for (var j = 0; j < items.length; j++) {
      var show = cat === 'todo' || items[j].getAttribute('data-cat') === cat;
      if (show) { items[j].removeAttribute('hidden'); }
      else { items[j].setAttribute('hidden', ''); }
    }
  }
  for (var k = 0; k < filters.length; k++) {
    filters[k].addEventListener('click', function () {
      applyFilter(this.getAttribute('data-filter'));
    });
  }

  /* 3. Formulario: arma el mensaje y abre WhatsApp */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var now = new Date();
  var today = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());

  var dateInput = document.getElementById('f-fecha');
  if (dateInput) {
    dateInput.setAttribute('min', today);
    // Navegadores muy viejos sin calendario: pedimos el formato a mano
    if (dateInput.type !== 'date') { dateInput.setAttribute('placeholder', 'dd/mm/aaaa'); }
  }

  function prettyDate(value) {
    if (!value) { return 'La que tengan disponible'; }
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    return m ? m[3] + '/' + m[2] + '/' + m[1] : value;
  }

  var form = document.getElementById('form-cita');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.nombre.value || '').replace(/^\s+|\s+$/g, '');
      var msg = 'Hola Aby, me gustaría agendar una cita.\n\n' +
        'Nombre: ' + (name || '-') + '\n' +
        'Servicio: ' + (form.servicio.value || 'Aún no sé, quiero asesoría') + '\n' +
        'Fecha: ' + prettyDate(form.fecha.value) + '\n' +
        'Horario: ' + (form.hora.value || 'Cualquiera') + '\n\n' +
        '¿Tienen disponibilidad?';
      var url = waLink(msg);
      // En celular abre la app de WhatsApp directo; si el navegador
      // bloquea la ventana nueva (Instagram/Facebook), navegamos en la misma.
      var win = null;
      try { win = window.open(url, '_blank'); } catch (err) { win = null; }
      if (!win) { window.location.href = url; }
    });
  }

  /* 4. Año del footer */
  var year = document.getElementById('year');
  if (year) { year.textContent = String(now.getFullYear()); }
})();
