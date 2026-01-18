function initThemeToggle() {
  const toggleButton = document.querySelector('.btn-toggle-theme');
  const body = document.body;
  if (!toggleButton) return;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('theme-dark');
    body.classList.remove('theme-light');
  } else {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
  }
  updateToggleButtonIcon();

  toggleButton.addEventListener('click', () => {
    const isDark = body.classList.toggle('theme-dark');
    if (isDark) {
      body.classList.remove('theme-light');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
    }
    updateToggleButtonIcon();
  });

  function updateToggleButtonIcon() {
    const icon = toggleButton.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-sun', body.classList.contains('theme-dark'));
    icon.classList.toggle('fa-moon', !body.classList.contains('theme-dark'));
  }
}

function initMenuMobile() {
  const btnAbrir = document.querySelector('.btn-menu');
  const btnFechar = document.querySelector('.btn-menu-fechar');
  const menu = document.querySelector('.menu');

  if (!btnAbrir || !btnFechar || !menu) return;

  btnAbrir.addEventListener('click', () => {
    menu.classList.add('ativo');
    if (
      window.matchMedia('(min-width: 396px) and (max-width: 576px)').matches
    ) {
      btnAbrir.style.display = 'none';
      btnFechar.style.display = 'flex';
    }
  });

  btnFechar.addEventListener('click', () => {
    menu.classList.remove('ativo');
    if (
      window.matchMedia('(min-width: 396px) and (max-width: 576px)').matches
    ) {
      btnAbrir.style.display = 'flex';
      btnFechar.style.display = 'none';
    }
  });

  function ajustarMenu() {
    if (
      window.matchMedia('(min-width: 396px) and (max-width: 576px)').matches
    ) {
      btnAbrir.style.display = 'flex';
      btnFechar.style.display = 'none';
    } else {
      btnAbrir.style.display = '';
      btnFechar.style.display = '';
    }
  }
  ajustarMenu();
  window.addEventListener('resize', ajustarMenu);
}

function initProjetos() {
  const projetos = document.querySelectorAll('.projeto');
  projetos.forEach((projeto) => {
    const btnDetalhes = projeto.querySelector('.btn-detalhes');
    if (!btnDetalhes) return;

    btnDetalhes.addEventListener('click', () => {
      const blocos = projeto.querySelectorAll('.info-bloco');
      const aberto = btnDetalhes.getAttribute('aria-expanded') === 'true';

      if (!aberto) {
        abrirDetalhes(blocos, btnDetalhes);
      } else {
        fecharDetalhes(blocos, btnDetalhes);
      }
    });
  });

  function abrirDetalhes(blocos, btn) {
    blocos.forEach((bloco) => {
      bloco.classList.remove('oculto');
      bloco
        .querySelectorAll('.oculto')
        .forEach((el) => el.classList.remove('oculto'));
    });
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Fechar detalhes';
  }
}

function fecharDetalhes(blocos, btn) {
  blocos.forEach((bloco) => {
    bloco.classList.add('oculto');
    bloco
      .querySelectorAll('h4, ul')
      .forEach((el) => el.classList.add('oculto'));
  });
  btn.setAttribute('aria-expanded', 'false');
  btn.textContent = 'Ver detalhes';
}

function initSkills() {
  const skills = document.querySelectorAll('.skill-card');
  skills.forEach((skill) => {
    let descDiv = null;
    skill.addEventListener('click', function () {
      if (descDiv && descDiv.parentNode) {
        descDiv.parentNode.removeChild(descDiv);
        descDiv = null;
        skill.classList.remove('expanded');
        return;
      }
      document.querySelectorAll('.skill-card.expanded').forEach((btn) => {
        btn.classList.remove('expanded');
        const openDesc = btn.nextElementSibling;
        if (openDesc && openDesc.classList.contains('descricao-skill')) {
          openDesc.remove();
        }
      });
      const descricao = skill.getAttribute('data-descricao');
      if (descricao) {
        descDiv = document.createElement('div');
        descDiv.className = 'descricao-skill';
        descDiv.textContent = descricao;
        skill.insertAdjacentElement('afterend', descDiv);
        skill.classList.add('expanded');
      }
    });
  });
}

function toggleSkillDescricao(skill) {
  document.querySelectorAll('.skill-card.expanded').forEach((btn) => {
    btn.classList.remove('expanded');
    const openDesc = btn.nextElementSibling;
    if (openDesc && openDesc.classList.contains('descricao-skill')) {
      openDesc.remove();
    }
  });

  if (skill.classList.contains('expanded')) return;

  const descricao = skill.getAttribute('data-descricao');
  if (descricao) {
    const descDiv = document.createElement('div');
    descDiv.className = 'descricao-skill';
    descDiv.textContent = descricao;
    skill.insertAdjacentElement('afterend', descDiv);
    skill.classList.add('expanded');
  }
}

function closeAllSkillDescricoes() {
  document
    .querySelectorAll('.skill-card.expanded')
    .forEach((btn) => btn.classList.remove('expanded'));
  document
    .querySelectorAll('.descricao-skill')
    .forEach((desc) => desc.remove());
}

function scrollToTop() {
  const header = document.querySelector('header');
  const voltarAoTopoBtn = document.querySelector('.voltar-ao-topo');
  if (voltarAoTopoBtn) {
    voltarAoTopoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToHeader();
    });
  }

  function scrollToHeader() {
    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMenuMobile();
  initProjetos();
  initSkills();
  scrollToTop();
});
