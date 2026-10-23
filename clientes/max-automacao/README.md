# Site Max Automação Comercial (remodelação)

Nova versão de https://maxautomacaocomercial.com.br/ — HTML, CSS e JS puros, sem build.
Funciona em qualquer hospedagem (cPanel/FTP, Vercel, Netlify).

## Arquivos
| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página completa (textos, SEO, dados estruturados) |
| `css/estilo.css` | Visual |
| `js/site.js` | Menu mobile e formulário → WhatsApp |
| `img/logo-max.svg` | Símbolo "M" redesenhado em vetor, cores chapadas (o `LogoMX.jpg` atual tem o xadrez de fundo impresso) |

## Diretrizes
- **Conteúdo:** só informações que já estão no site atual da Max. Nada inventado (números, prazos, depoimentos, promessas).
- **Visual:** técnico e moderno. Grafite, branco e o vermelho chapado da logo. Sem degradês, sem sombras, cantos retos, linhas finas.
- **Tipografia:** Geist (textos) e Geist Mono (rótulos, telefones).
- **Conversão:** todos os botões levam ao WhatsApp do Comercial com mensagem pronta; suporte vai para o WhatsApp do Suporte.

## Pendências
Há comentários `PREENCHER` no `index.html` nos pontos onde entram:
- [ ] Endereço, cidade/UF e horário de atendimento (rodapé e JSON-LD no `<head>`)
- [ ] Números da empresa (anos de mercado, clientes, cidades) e selos oficiais — seção Diferenciais
- [ ] Nome, empresa e cidade dos depoimentos (com autorização do cliente)
- [ ] Logo original em vetor (SVG/AI/PDF), se existir
- [ ] Imagem de compartilhamento para redes sociais (`og:image`, 1200×630)

## Como publicar
1. Fazer backup do `index.html` antigo.
2. Enviar o conteúdo desta pasta para a raiz do site (`public_html`), **sem apagar a pasta `/bkp`**.

## Testar localmente
```bash
npx http-server clientes/max-automacao -p 8080
```
