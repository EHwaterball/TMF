(function () {
  if (!('IntersectionObserver' in window)) return;

  document.body.classList.add('js-anim');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var headings = document.querySelectorAll(
    '.intro, .page-title, .section-heading, .label'
  );
  headings.forEach(function (el) {
    el.dataset.text = el.textContent;
    el.classList.add('ink-wipe');
  });

  document
    .querySelectorAll('.why-list, .notes, .card-grid, .process-list')
    .forEach(function (el) {
      el.classList.add('draw-rule');
    });

  document.querySelectorAll('.why-text blockquote').forEach(function (el) {
    el.classList.add('quote-rise');
  });

  var targets = document.querySelectorAll(
    '.ink-wipe, .draw-rule, .quote-rise'
  );

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach(function (t) {
    io.observe(t);
  });
})();
