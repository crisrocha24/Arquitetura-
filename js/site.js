/* =====================================================================
   FUNCIONAMENTO DO SITE
   Os textos, contatos e projetos ficam em conteudo.js.
   As cores e a aparência ficam em css/estilos.css.
   ===================================================================== */
(() => {
  'use strict';

  const site = window.KELLY_COELHO || {};
  const settings = site.config || {};
  const projects = Array.isArray(site.projects) ? site.projects : [];
  const testimonials = Array.isArray(site.testimonials) ? site.testimonials : [];
  const projectGrid = document.getElementById('project-grid');
  const projectDialog = document.getElementById('project-dialog');
  const dialogContent = document.getElementById('dialog-content');
  let activeFilter = 'todos';

  /* 1. Protege textos editáveis antes de inseri-los no HTML. */
  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  /* 2. Aceita fotos HTTPS ou arquivos adicionados às pastas locais do site. */
  function getSafeFileURL(value) {
    if (typeof value !== 'string' || !value.trim() || value.trim().startsWith('//')) {
      return '';
    }

    const isRelativePath = !/^[a-z][a-z\d+.-]*:/i.test(value);

    try {
      const url = new URL(value, window.location.href);
      const isLocalFile = isRelativePath
        && url.origin === window.location.origin
        && url.protocol === window.location.protocol;

      return url.protocol === 'https:' || isLocalFile ? url.href : '';
    } catch {
      return '';
    }
  }

  /* 3. Substitui o símbolo provisório pelo arquivo de logo escolhido. */
  function setLogo() {
    const logoURL = getSafeFileURL(settings.logoImage);

    if (!logoURL) return;

    document.querySelectorAll('.brand-mark').forEach(mark => {
      const image = document.createElement('img');
      image.className = 'brand-image';
      image.alt = 'Logotipo oficial Kelly Coelho Projetos';
      image.src = logoURL;
      mark.replaceWith(image);
    });
  }

  /* 4. Anima as seções quando entram na tela; respeita redução de movimento. */
  function observeReveals(root = document) {
    const items = root.querySelectorAll('[data-reveal]:not(.is-visible)');

    if (!('IntersectionObserver' in window)
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }

    if (!window.revealObserver) {
      window.revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          window.revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
    }

    items.forEach(item => window.revealObserver.observe(item));
  }

  /* 5. Monta os cartões e aplica o filtro residencial/corporativo. */
  function renderProjects() {
    const visibleProjects = projects
      .map((project, index) => ({ project, index }))
      .filter(({ project }) => activeFilter === 'todos' || project.category === activeFilter);

    if (!visibleProjects.length) {
      projectGrid.innerHTML = '<p class="portfolio-empty">Os projetos desta categoria serão apresentados aqui.</p>';
      return;
    }

    projectGrid.innerHTML = visibleProjects.map(({ project, index }) => {
      const image = getSafeFileURL(project.cover)
        || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=78';
      const category = project.category === 'corporativo' ? 'Corporativo' : 'Residencial';
      const badge = project.isExample === false
        ? category
        : `Exemplo demonstrativo · ${category}`;

      return `
        <article class="project-card" data-reveal>
          <button class="project-open" type="button" data-project="${index}"
            aria-label="Ver detalhes: ${escapeHTML(project.name)}">
            <div class="project-image-wrap">
              <img class="project-image" src="${escapeHTML(image)}"
                alt="Imagem do projeto ${escapeHTML(project.name)}" loading="lazy">
              <span class="project-badge">${escapeHTML(badge)}</span>
            </div>
            <div class="project-info">
              <div>
                <h3>${escapeHTML(project.name)}</h3>
                <p>${escapeHTML(project.location || (project.isExample === false ? category : 'Imagem ilustrativa'))}</p>
              </div>
              <span class="project-arrow" aria-hidden="true">↗</span>
            </div>
          </button>
        </article>`;
    }).join('');

    observeReveals(projectGrid);
  }

  /* 6. Mostra fotos, descrição, serviços e PDFs no detalhe do projeto. */
  function getProjectDocuments(documents) {
    if (!Array.isArray(documents)) return [];

    return documents.flatMap(document => {
      if (!document || typeof document.file !== 'string') return [];

      const file = document.file.trim();
      if (!file.toLowerCase().split('?')[0].endsWith('.pdf')) return [];

      const url = getSafeFileURL(file);
      return url ? [{ url, name: String(document.name || 'Documento do projeto (PDF)') }] : [];
    });
  }

  function showProject(project) {
    const category = project.category === 'corporativo'
      ? 'Arquitetura corporativa'
      : 'Arquitetura residencial';
    const services = Array.isArray(project.services) && project.services.length
      ? `<ul class="dialog-services">${project.services.map(service => `<li>${escapeHTML(service)}</li>`).join('')}</ul>`
      : '';
    const images = [project.cover, ...(Array.isArray(project.gallery) ? project.gallery : [])]
      .map(getSafeFileURL)
      .filter(Boolean);
    const gallery = images.length
      ? `<div class="dialog-gallery">${images.map((image, index) => `
          <img src="${escapeHTML(image)}" alt="${escapeHTML(project.name)}, imagem ${index + 1}" loading="lazy">`).join('')}
        </div>`
      : '';
    const example = project.isExample !== false
      ? '<p class="dialog-note">Estudo demonstrativo; não representa projeto executado pela arquiteta.</p>'
      : '';
    const documents = getProjectDocuments(project.documents);
    const documentList = documents.length
      ? `<section class="project-documents" aria-label="Documentos do projeto">
          <h3>Documentos do projeto</h3>
          <ul class="project-document-list">${documents.map(document => `
            <li><a class="project-document-link" href="${escapeHTML(document.url)}"
              target="_blank" rel="noopener noreferrer">↗ ${escapeHTML(document.name)}</a></li>`).join('')}
          </ul>
        </section>`
      : '';

    document.getElementById('dialog-title').textContent = project.name;
    dialogContent.innerHTML = `
      <p class="dialog-meta">${category}${project.location ? ` · ${escapeHTML(project.location)}` : ''}</p>
      <p class="dialog-description">${escapeHTML(project.description || '')}</p>
      ${services}
      ${project.additionalInfo ? `<p>${escapeHTML(project.additionalInfo)}</p>` : ''}
      ${example}${gallery}${documentList}`;
    projectDialog.showModal();
  }

  projectGrid.addEventListener('click', event => {
    const button = event.target.closest('[data-project]');
    if (!button) return;

    const project = projects[Number(button.dataset.project)];
    if (project) showProject(project);
  });

  /* 7. Abre, fecha e troca a categoria selecionada no portfólio. */
  document.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
  projectDialog.addEventListener('click', event => {
    if (event.target === projectDialog) projectDialog.close();
  });

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(filter => {
        filter.setAttribute('aria-pressed', String(filter === button));
      });
      renderProjects();
    });
  });

  /* 8. Controla o menu compacto do celular. */
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-links');

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('is-open');
  });

  /* 9. Monta os links profissionais usando os dados de conteudo.js. */
  function renderContactLinks() {
    const links = [];
    const email = typeof settings.email === 'string' && settings.email.includes('@')
      ? settings.email.trim()
      : '';
    const phone = String(settings.whatsapp || '').replace(/\D/g, '');

    if (phone.length >= 10 && phone.length <= 13) {
      links.push(`<a class="contact-link" href="https://wa.me/${phone}"
        target="_blank" rel="noopener noreferrer"><span>WhatsApp</span>
        <span class="contact-link-arrow" aria-hidden="true">↗</span></a>`);
    } else {
      links.push('<span class="contact-link contact-link-disabled"><span>WhatsApp</span><small>Contato a configurar</small></span>');
    }

    if (email) {
      links.push(`<a class="contact-link" href="mailto:${escapeHTML(email)}">
        <span>${escapeHTML(email)}</span><span class="contact-link-arrow" aria-hidden="true">↗</span></a>`);
    } else {
      links.push('<span class="contact-link contact-link-disabled"><span>E-mail profissional</span><small>Contato a configurar</small></span>');
    }

    const instagram = getSafeInstagram(settings.instagram);
    const instagramUsername = new URL(instagram).pathname.replace(/^\/+|\/+$/g, '');
    links.push(`<a class="contact-link" href="${escapeHTML(instagram)}"
      target="_blank" rel="noopener noreferrer"><span>Instagram · @${escapeHTML(instagramUsername)}</span>
      <span class="contact-link-arrow" aria-hidden="true">↗</span></a>`);

    document.getElementById('contact-links').innerHTML = links.join('');
    document.getElementById('footer-instagram').href = instagram;
  }

  function getSafeInstagram(value) {
    const fallback = 'https://www.instagram.com/coelho.projetos/';

    try {
      const url = new URL(value || fallback);
      return url.protocol === 'https:' && ['instagram.com', 'www.instagram.com'].includes(url.hostname)
        ? url.href
        : fallback;
    } catch {
      return fallback;
    }
  }

  /* 10. Publica apenas depoimentos inseridos em conteudo.js. */
  function renderTestimonials() {
    const list = document.getElementById('testimonial-list');

    if (!testimonials.length) {
      list.textContent = 'Os depoimentos serão publicados com autorização dos clientes.';
      return;
    }

    list.classList.remove('testimonial-empty');
    list.innerHTML = testimonials.map(testimonial => {
      const photo = getSafeFileURL(testimonial.photo);
      const portrait = photo
        ? `<img class="testimonial-photo" src="${escapeHTML(photo)}" alt="Foto de ${escapeHTML(testimonial.author)}" loading="lazy">`
        : '';
      const project = testimonial.context
        ? `<span class="testimonial-context">${escapeHTML(testimonial.context)}</span>`
        : '';

      return `
        <article class="testimonial-quote">
          <blockquote>“${escapeHTML(testimonial.quote)}”</blockquote>
          <div class="testimonial-attribution">
            ${portrait}
            <div>
              <cite>${escapeHTML(testimonial.author)}</cite>
              ${project}
            </div>
          </div>
        </article>`;
    }).join('');
  }

  /* 11. Encaminha o orçamento pelo canal escolhido no formulário. */
  function setupQuoteForm() {
    const form = document.getElementById('quote-form');
    const deliveryNote = document.getElementById('delivery-note');

    form.querySelectorAll('input[name="canal"]').forEach(option => {
      option.addEventListener('change', () => {
        deliveryNote.textContent = option.value === 'whatsapp'
          ? 'O WhatsApp abrirá com os dados preenchidos para você revisar e enviar.'
          : 'A solicitação será encaminhada pelo serviço de e-mail configurado.';
      });
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const submittedForm = event.currentTarget;
      const status = document.getElementById('form-status');
      const fields = new FormData(submittedForm);
      const channel = fields.get('canal');
      const phone = String(settings.whatsapp || '').replace(/\D/g, '');
      const endpoint = typeof settings.formEndpoint === 'string' ? settings.formEndpoint.trim() : '';

      if (channel === 'whatsapp') {
        if (phone.length < 10 || phone.length > 13) {
          status.textContent = 'WhatsApp não configurado. Confira o número em js/conteudo.js.';
          return;
        }

        const message = [
          'Olá! Gostaria de solicitar um orçamento de projeto.',
          '',
          `Nome: ${fields.get('nome') || ''}`,
          `E-mail: ${fields.get('email') || ''}`,
          `Telefone/WhatsApp: ${fields.get('telefone') || 'Não informado'}`,
          `Cidade/estado: ${fields.get('cidade') || ''}`,
          `Tipo de projeto: ${fields.get('categoria') || ''}`,
          `Área aproximada: ${fields.get('area') || 'Não informada'}`,
          `Serviço desejado: ${fields.get('servico') || ''}`,
          `Prazo desejado: ${fields.get('prazo') || 'Não informado'}`,
          '',
          `Sobre o projeto: ${fields.get('mensagem') || ''}`
        ].join('\n');
        const whatsappURL = new URL(`https://wa.me/${phone}`);
        whatsappURL.searchParams.set('text', message);

        window.open(whatsappURL.href, '_blank', 'noopener,noreferrer');
        status.textContent = 'O WhatsApp abriu com sua solicitação preenchida. Revise a mensagem e toque em enviar na conversa.';
        return;
      }

      if (channel !== 'email') {
        status.textContent = 'Selecione WhatsApp ou e-mail para continuar.';
        return;
      }

      if (!endpoint) {
        status.textContent = 'Envio por e-mail não configurado. Preencha formEndpoint em js/conteudo.js.';
        return;
      }

      let url;
      try {
        url = new URL(endpoint, window.location.href);
      } catch {
        status.textContent = 'O endereço de envio é inválido. Revise o arquivo js/conteudo.js.';
        return;
      }

      if (!['https:', 'http:'].includes(url.protocol)) {
        status.textContent = 'O endereço de envio é inválido. Revise o arquivo js/conteudo.js.';
        return;
      }

      const button = form.querySelector('[type="submit"]');
      button.disabled = true;
      status.textContent = 'Enviando solicitação…';

      try {
        const response = await fetch(url.href, {
          method: 'POST',
          body: fields,
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('O serviço não aceitou a solicitação.');

        submittedForm.reset();
        status.textContent = 'Solicitação enviada. Obrigada por compartilhar os detalhes do seu projeto.';
      } catch {
        status.textContent = 'Não foi possível enviar agora. Verifique a integração do formulário e tente novamente.';
      } finally {
        button.disabled = false;
      }
    });
  }

  /* 12. Exibe o CAU somente se o número tiver sido informado. */
  function renderProfessionalRegistration() {
    const registration = String(settings.cau || '').trim();
    if (!registration) return;

    const label = document.createElement('span');
    label.textContent = `CAU: ${registration}`;
    document.querySelector('.footer-bottom').append(label);
  }

  /* 13. Inicializa a página depois que o HTML e conteudo.js foram carregados. */
  setLogo();
  renderProjects();
  renderContactLinks();
  renderTestimonials();
  setupQuoteForm();
  renderProfessionalRegistration();
  observeReveals();
})();
