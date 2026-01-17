const toggleButton = document.querySelector('.btn-toggle-theme');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('theme-dark');
} else {
  body.classList.remove('theme-dark');
}
updateToggleButtonIcon();

toggleButton.addEventListener('click', () => {
  body.classList.toggle('theme-dark');
  localStorage.setItem(
    'theme',
    body.classList.contains('theme-dark') ? 'dark' : 'light',
  );
  updateToggleButtonIcon();
});

function updateToggleButtonIcon() {
  const btn = document.querySelector('.btn-toggle-theme');
  const icon = btn.querySelector('i');

  icon.classList.toggle('fa-sun', body.classList.contains('theme-dark'));
  icon.classList.toggle('fa-moon', !body.classList.contains('theme-dark'));
}

const btnAbrir = document.querySelector('.btn-menu');
const btnFechar = document.querySelector('.btn-menu-fechar');
const menu = document.querySelector('.menu');

btnAbrir.addEventListener('click', () => {
  menu.classList.add('ativo');
  if (window.matchMedia('(max-width: 600px)').matches) {
    btnAbrir.style.display = 'none';
    btnFechar.style.display = 'flex';
  }
});

btnFechar.addEventListener('click', () => {
  menu.classList.remove('ativo');
  if (window.matchMedia('(max-width: 600px)').matches) {
    btnAbrir.style.display = 'flex';
    btnFechar.style.display = 'none';
  }
});

if (window.matchMedia('(max-width: 600px)').matches) {
  btnAbrir.style.display = 'flex';
  btnFechar.style.display = 'none';
} else {
  btnAbrir.style.display = '';
  btnFechar.style.display = '';
}

const buttonSkills = document.querySelectorAll('.button-skill');
let activeDescricao = null;
let activeButton = null;

buttonSkills.forEach((button) => {
  button.addEventListener('click', () => {
    if (activeDescricao) {
      activeDescricao.remove();
      if (activeButton) activeButton.classList.remove('ativo');
      if (activeButton === button) {
        activeDescricao = null;
        activeButton = null;
        return;
      }
    }

    const descricao = document.createElement('div');
    descricao.className = 'descricao-skill';
    descricao.textContent = button.getAttribute('data-descricao');

    button.parentNode.insertBefore(descricao, button.nextSibling);
    button.classList.add('ativo');
    activeDescricao = descricao;
    activeButton = button;
  });
});

const projetos = document.querySelectorAll('.projeto');
projetos.forEach((projeto) => {
  const btnDetalhes = projeto.querySelector('.btn-detalhes');
  if (btnDetalhes) {
    btnDetalhes.addEventListener('click', () => {
      const blocos = projeto.querySelectorAll('.info-bloco');
      const aberto = btnDetalhes.getAttribute('aria-expanded') === 'true';
      if (!aberto) {
        blocos.forEach((bloco) => {
          bloco.classList.remove('oculto');
          bloco
            .querySelectorAll('.oculto')
            .forEach((el) => el.classList.remove('oculto'));
        });
        btnDetalhes.setAttribute('aria-expanded', 'true');
        btnDetalhes.textContent = 'Fechar Detalhes';
      } else {
        blocos.forEach((bloco) => {
          bloco.classList.add('oculto');
          bloco
            .querySelectorAll('h4, ul')
            .forEach((el) => el.classList.add('oculto'));
        });
        btnDetalhes.setAttribute('aria-expanded', 'false');
        btnDetalhes.textContent = 'Ver Detalhes';
      }
    });
  }
});
