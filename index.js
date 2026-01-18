function initThemeToggle() {
  const toggleButton = document.querySelector('.btn-toggle-theme');
  const body = document.body;
  if (!toggleButton) return;

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

function newletterSubscription() {
  const form = document.querySelector('.form-newlestter');
  if (!form) return;
  let msgDiv = document.querySelector('.newsletter-msg');
  if (!msgDiv) {
    msgDiv = document.createElement('div');
    msgDiv.className = 'newsletter-msg';
    form.parentNode.insertBefore(msgDiv, form.nextSibling);
  }
  form.addEventListener('submit', (e) => {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    msgDiv.textContent = '';
    msgDiv.classList.remove('sucesso', 'erro');
    if (!validarEmail(email)) {
      e.preventDefault();
      msgDiv.textContent = 'Por favor, insira um e-mail válido.';
      msgDiv.classList.add('erro');
      emailInput.focus();
      return;
    }
    msgDiv.textContent = 'Inscrição realizada com sucesso!';
    msgDiv.classList.add('sucesso');
    form.reset();
  });
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document
  .getElementById('newsletter-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('email-newlestter');
    const email = emailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    fetch(
      'https://script.google.com/macros/s/AKfycbwLKaI2iI1MYvg6MRV-Ks5AzML1nfb78bqy5XI8j6TmHkpWcrTeUWZq4cW1m0Hkx-g9/exec',
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'success') {
          alert('Inscrição realizada com sucesso!');
          emailInput.value = '';
        } else {
          alert('Erro ao salvar inscrição.');
        }
      })
      .catch(() => alert('Erro ao conectar com o servidor.'));
  });

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMenuMobile();
    initProjetos();
    initSkills();
    scrollToTop();
    newletterSubscription();
  });