module.exports = {
  beforeEnter: function (el) {
    el.style.opacity = 0;
    el.style.height = 0;
  },
  enter: function (el, done) {
    let delay = el.dataset.index;
    setTimeout(function() {
      Velocity(
        el,
        { opacity: 1, height: '1.6em' },
        { complete: done }
      )
    }, delay);
  },
  leave: function (el, done) {
    let delay = el.dataset.index;
    setTimeout(function () {
      Velocity(
        el,
        { opacity: 0, height: 0 },
        { complete: done }
      )
    }, delay);
  }
};
