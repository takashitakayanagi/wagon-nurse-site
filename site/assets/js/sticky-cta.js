(function(){
  var bar = document.querySelector('.sticky-cta');
  if(!bar) return;
  function onScroll(){
    if(window.scrollY > 500){ bar.classList.add('visible'); }
    else { bar.classList.remove('visible'); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
