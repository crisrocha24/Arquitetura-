/* =====================================================================
   CONTEÚDO DO SITE: altere este arquivo para personalizar sua página.
   Mantenha cada imagem ou documento na pasta correspondente dentro de assets.
   ===================================================================== */
window.KELLY_COELHO = {
  /* 1. CONTATO, LOGO E REDES SOCIAIS
     Os campos vazios não são mostrados como informações de contato. */
  config: {
    /* Troque pela imagem do seu logo em assets/logo, por exemplo:
       'assets/logo/logo-kelly.png'. Vazio mantém o símbolo dourado atual. */
    logoImage: '',

    /* Seu e-mail profissional. Exemplo: 'contato@seudominio.com.br'. */
    email: 'kellycoelho.arq@gmail.com',

    /* WhatsApp com código do Brasil, DDD e número, somente números.
       Exemplo: '5511999999999'. */
    whatsapp: '5585996314441',

    /* Perfil profissional do Instagram. Atualize o endereço se mudar de usuário. */
    instagram: 'https://www.instagram.com/coelho.projetos/',

    /* Alternativa por e-mail se o número do WhatsApp estiver vazio ou inválido. */
    formEndpoint: 'https://formsubmit.co/ajax/kellycoelho.arq@gmail.com',

    /* Registro profissional, caso queira publicá-lo. Vazio mantém oculto. */
    cau: ''
  },

  /* 2. PORTFÓLIO
     As fotos ficam em assets/projetos/residencial ou corporativo.
     Copie um objeto de projeto para cadastrar outro.
     category: 'residencial' ou 'corporativo'.
     cover: caminho da foto principal.
     gallery: fotos adicionais do mesmo projeto.
    documents: PDFs opcionais em assets/documentos.
    Deixe isExample: true somente para estudos demonstrativos. */
  projects: [
    {
      name: 'Apartamento estudantil',
      category: 'residencial',
      location: '',
      description: 'Projeto de apartamento estudantil.',
      services: [],
      cover: 'assets/projetos/residencial/APARTAMENTO  ESTUDANTIL.png',
      gallery: [
        'assets/projetos/residencial/APARTAMENTO  ESTUDANTIL 1.png'
      ],
      documents: [],
      additionalInfo: '',
      isExample: false
    },
    {
      name: 'Casa de praia',
      category: 'residencial',
      location: '',
      description: 'Projeto residencial de casa de praia, com imagens e planta baixa.',
      services: [],
      cover: 'assets/projetos/residencial/CASA DE PRAIA (1).jpg',
      gallery: [
        'assets/projetos/residencial/CASA DE PRAIA (2).jpg',
        'assets/projetos/residencial/CASA DE PRAIA PLANTA BAIXA (3).jpg'
      ],
      documents: [],
      additionalInfo: '',
      isExample: false
    },
    {
      name: 'Kitnets',
      category: 'residencial',
      location: '',
      description: 'Projeto residencial de kitnets, apresentado em imagens e partes do projeto.',
      services: [],
      cover: 'assets/projetos/residencial/KITNETS 1 PARTE 1.png',
      gallery: [
        'assets/projetos/residencial/KITNETS 1 PARTE 2.png',
        'assets/projetos/residencial/KITNETS 1 PARTE 3.png',
        'assets/projetos/residencial/KITNETS 1 PARTE 4.png',
        'assets/projetos/residencial/KITNETS 2.png',
        'assets/projetos/residencial/KITNETS 2 PARTE 1.png',
        'assets/projetos/residencial/KITNETS 2 PARTE 3.png',
        'assets/projetos/residencial/KITNETS (2).png'
      ],
      documents: [],
      additionalInfo: '',
      isExample: false
    },
    {
      name: 'Casa de eventos',
      category: 'residencial',
      location: '',
      description: 'Projeto de casa de eventos.',
      services: [],
      cover: 'assets/projetos/residencial/PROJETO CASA EVENTOS.png',
      gallery: [
        'assets/projetos/residencial/PROJETO CASA EVENTOS 1.png',
        'assets/projetos/residencial/PROJETO CASA EVENTOS 2.png'
      ],
      documents: [],
      additionalInfo: '',
      isExample: false
    },
    {
      name: 'Escritório de advocacia',
      category: 'corporativo',
      location: '',
      description: 'Projeto corporativo de escritório de advocacia, com imagens e planta baixa.',
      services: [],
      cover: 'assets/projetos/corporativo/ESCRITORIO ADVOCACIA  (1).png',
      gallery: [
        'assets/projetos/corporativo/ESCRITORIO ADVOCACIA  (3).png',
        'assets/projetos/corporativo/ESCRITORIO ADVOCACIA  (4).png',
        'assets/projetos/corporativo/ESCRITORIO ADVOCACIA  (5).png',
        'assets/projetos/corporativo/ESCRITORIO ADVOCACIA  (6).png',
        'assets/projetos/corporativo/ESCRITORIO ADVOCACIA  PLANTA BAIXA (1).png'
      ],
      documents: [],
      additionalInfo: '',
      isExample: false
    },
    {
      name: 'Sala presidencial',
      category: 'corporativo',
      location: '',
      description: 'Projeto corporativo de sala presidencial.',
      services: [],
      cover: 'assets/projetos/corporativo/SALA PRESIDENCIAL.jpeg',
      gallery: [],
      documents: [],
      additionalInfo: '',
      isExample: false
    }
  ],

  /* 3. DEPOIMENTOS
     Adicione relatos verdadeiros aprovados pelos clientes.
     A foto é opcional; use apenas uma imagem autorizada em assets/depoimentos.
     Exemplo:
     {
       quote: 'Comentário autorizado pelo cliente.',
       author: 'Nome autorizado',
       context: 'Projeto residencial',
       photo: 'assets/depoimentos/cliente.jpg'
     }
     Deixe photo vazio ou remova o campo para mostrar o relato sem fotografia. */
  testimonials: []
};