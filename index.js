const barras = document.querySelectorAll('.progresso');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ativo');
      }
    });
  }, {
    threshold: 0.5
  });

barras.forEach( barra => observer.observe(barra))