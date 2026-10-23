# Site Max Automação Comercial (remodelação)

Nova versão de https://maxautomacaocomercial.com.br/ — HTML, CSS e JS puros, sem build.
Funciona em qualquer hospedagem (cPanel/FTP, Vercel, Netlify).

## Arquivos
| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página completa (textos, SEO, dados estruturados) |
| `css/estilo.css` | Visual: cores da logo, tipografia, responsivo |
| `js/site.js` | Menu mobile, abas de segmento, animações, formulário → WhatsApp |
| `img/logo-max.svg` | Símbolo "M" redesenhado em vetor (substitui o `LogoMX.jpg`, que tem o xadrez de fundo impresso) |

## O que mudou em relação ao site atual
- **Cores da marca:** o site antigo era azul-céu, mas a logo é vermelha e grafite. O novo segue a logo.
- **Mensagem clara:** "Seu caixa não pode parar. A Max garante." no lugar de jargões ("Hub Operacional", "Blindagem").
- **Um caminho para a venda:** escolha do segmento (farmácia, varejo ou restaurante), demonstração pelo WhatsApp, proposta.
- **Provas de credibilidade:** números, selos, parceiros, "como trabalhamos" e perguntas frequentes.
- **Formulário único:** monta o pacote e abre o WhatsApp do comercial com a mensagem pronta. Não precisa de servidor.
- **Suporte separado de vendas:** área própria para clientes (AnyDesk, TeamViewer, WhatsApp do suporte).
- **SEO:** título e descrição revisados, Open Graph, dados estruturados `LocalBusiness`, HTML semântico e acessível.

## Pendências (aparecem destacadas em amarelo no site)
Procure por `class="pendente"` e `PREENCHER` no `index.html`. Ao inserir o dado real, remova o `<mark class="pendente">`.

- [ ] Cidade/UF (faixa do topo e "Sobre")
- [ ] Endereço completo e horário de atendimento (rodapé e JSON-LD no `<head>`)
- [ ] Números: anos de mercado, empresas atendidas, cidades, tempo médio do suporte
- [ ] CNPJ
- [ ] Selo de revenda autorizada e logos oficiais dos parceiros (pedir aos fabricantes)
- [ ] Logo original em vetor (SVG/AI/PDF) para substituir a recriação em `img/logo-max.svg`
- [ ] Depoimentos com nome, empresa e cidade reais (com autorização do cliente)
- [ ] Imagem de compartilhamento `img/og-max.png` (1200×630)

## Como publicar
1. Enviar o conteúdo desta pasta para a raiz do site (`public_html`), **sem apagar a pasta `/bkp`**.
2. Fazer backup do `index.html` antigo antes de substituir.

## Testar localmente
```bash
npx http-server clientes/max-automacao -p 8080
```
