/* ЭРАЛИДЕР — интерактив лендинга */
(function () {
  'use strict';

  /* --- Прелоадер: проигрывается при каждой загрузке страницы --- */
  var pre = document.getElementById('preloader');
  if (pre) {
    document.documentElement.style.overflow = 'hidden';
    setTimeout(function () {
      pre.classList.add('is-hidden');
      document.documentElement.style.overflow = '';
      setTimeout(function () { if (pre.parentNode) pre.parentNode.removeChild(pre); }, 750);
    }, 2000);
  }

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  /* --- Sticky header: фон появляется при скролле,
         шапка прячется при скролле вниз и возвращается при скролле вверх --- */
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;

    if (y > 400) header.classList.add('is-stuck');
    else header.classList.remove('is-stuck');

    if (y > lastY && y > 120) {
      header.classList.add('is-hidden');   // скролл вниз
    } else if (y < lastY) {
      header.classList.remove('is-hidden'); // скролл вверх
    }
    lastY = y;
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Бургер-меню --- */
  function closeMenu() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
  }
  function toggleMenu() {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }

  if (burger && nav) {
    burger.addEventListener('click', toggleMenu);
    // закрываем меню при клике по ссылке
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) closeMenu();
    });
    // закрываем по Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    // закрываем при ресайзе на десктоп
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  /* --- Плавный скролл с учётом высоты шапки --- */
  var HEADER_OFFSET = 72;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* --- FAQ-аккордеон: открыт только один вопрос --- */
  document.querySelectorAll('.pp-faq').forEach(function (faq) {
    faq.addEventListener('click', function (e) {
      var q = e.target.closest('.pp-faq__q');
      if (!q || !faq.contains(q)) return;
      var item = q.closest('.pp-faq__item');
      var wasOpen = item.classList.contains('open');
      faq.querySelectorAll('.pp-faq__item.open').forEach(function (it) { it.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* --- Обработка формы заявки (заглушка, без бэкенда) --- */
  var form = document.getElementById('lead-form');
  var success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // TODO: заменить на реальную отправку (fetch на ваш endpoint / CRM)
      var data = Object.fromEntries(new FormData(form).entries());
      console.log('Заявка:', data);

      form.reset();
      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
})();
