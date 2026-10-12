# Kelly Coelho Projetos

Site institucional responsivo. Não precisa instalar programas nem reconstruir o site para atualizar o conteúdo.

## Pastas e arquivos

- `index.html`: seções e estrutura das páginas. Cada área está identificada por um comentário HTML.
- `js/conteudo.js`: **arquivo principal para editar** logo, e-mail, WhatsApp, Instagram, projetos, fotos, PDFs e depoimentos.
- `js/site.js`: filtros, menu, janela dos projetos, links de contato e envio do formulário. Cada função tem um comentário explicativo.
- `css/estilos.css`: identidade visual, estilos por seção e ajustes para computador, tablet e celular.
- `assets/logo/`: imagem oficial do logotipo.
- `assets/projetos/`: capas e galerias dos projetos.
- `assets/documentos/`: PDFs apresentados na janela do projeto.
- `assets/depoimentos/`: fotos opcionais dos clientes que autorizaram sua publicação.

## Como adicionar imagens e contatos

1. Coloque o logo em `assets/logo`, por exemplo `assets/logo/logo-kelly.png`. Abra `js/conteudo.js` e altere `logoImage: ''` para `logoImage: 'assets/logo/logo-kelly.png'`.
2. As fotos atuais do portfólio estão organizadas em `assets/projetos/residencial` e `assets/projetos/corporativo`. Para adicionar outro projeto, coloque as fotos na pasta da categoria correspondente e, em `js/conteudo.js`, informe a imagem principal em `cover` e as fotos adicionais em `gallery`.
3. Coloque os PDFs em `assets/documentos` e cadastre-os em `documents`, por exemplo: `[{ name: 'Memorial descritivo', file: 'assets/documentos/memorial.pdf' }]`.
4. No início de `js/conteudo.js`, preencha `email` e `whatsapp`. Escreva o WhatsApp com código do Brasil, DDD e número, somente números, por exemplo `5511999999999`.
5. Salve. Se o servidor de prévia já estiver aberto, recarregue a página no navegador.

Para publicar um depoimento, em `js/conteudo.js` acrescente um objeto em `testimonials` com `quote`, `author` e, opcionalmente, `context` e `photo`. Salve a foto autorizada em `assets/depoimentos` e preencha `photo: 'assets/depoimentos/cliente.jpg'`. Sem foto, o depoimento é exibido normalmente, sem imagem.

**Atenção:** o site publicado é público. Inclua somente fotos e PDFs autorizados e que não exponham dados pessoais ou informações confidenciais.

## Como ajustar o visual

Abra `css/estilos.css`. As cores principais estão no primeiro bloco, em `:root`. As demais seções, os estilos de cada componente e as regras para telas menores estão separados por comentários. O JavaScript e o conteúdo não ficam misturados ao CSS.

## Como visualizar

Se o endereço local `http://localhost:8000/` já estiver funcionando, basta recarregá-lo. Para iniciar uma prévia em um terminal, use `python3 -m http.server 8000` e depois abra `http://localhost:8000/` no navegador.

## Antes de publicar

- Confirme as informações dos projetos e que possui autorização para divulgar suas imagens.
- Confirme os contatos e escolha se deseja divulgar o CAU.
- Publique feedback e retratos somente depois de obter a autorização do cliente; não use capturas de e-mail com dados pessoais.
- No formulário, a pessoa escolhe entre WhatsApp e e-mail. WhatsApp abre a conversa com uma mensagem preenchida, que precisa ser confirmada no aplicativo. E-mail envia os dados pelo `formEndpoint` configurado e pode exigir a confirmação inicial do endereço no FormSubmit.
- Revise o aviso de privacidade e as informações LGPD para o fluxo e os serviços escolhidos.
- Configure hospedagem estática, HTTPS e, caso tenha, seu domínio. Custos de hospedagem, domínio e serviços externos dependem do fornecedor e do plano.
- A capa principal e algumas fotos adicionais do site ainda usam imagens externas e precisam de internet.