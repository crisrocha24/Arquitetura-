# Onde colocar os arquivos

- Logotipo: `assets/logo/`
- Fotos dos projetos: `assets/projetos/`
- PDFs: `assets/documentos/`
- Fotos autorizadas de clientes: `assets/depoimentos/`

As pastas `assets/projetos/residencial/` e `assets/projetos/corporativo/` contêm as fotos usadas no portfólio, organizadas em seis projetos. A configuração fica em `js/conteudo.js`: `logoImage` para o logo, `cover` e `gallery` para as imagens de cada projeto, e `documents` para os PDFs.

Para adicionar outro projeto, coloque as fotos numa subpasta de `assets/projetos/` e cadastre o projeto em `js/conteudo.js`, indicando a imagem principal em `cover` e as demais em `gallery`. Use nomes simples, como `capa-residencial-01.jpg`.

Para um PDF, use por exemplo `{ name: 'Memorial descritivo', file: 'assets/documentos/memorial-descritivo-01.pdf' }`. Só são exibidos PDFs locais ou endereços HTTPS terminados em `.pdf`.

Formatos de imagem: PNG, JPG, WebP e SVG. Você também pode anexar imagens na conversa. Inclua no site publicado apenas materiais autorizados para divulgação. O campo `photo` nos depoimentos é opcional; adicione relatos e fotos somente com autorização do cliente.
