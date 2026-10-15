# SideNav

Barra lateral do aplicativo, em azul-noite (`nav`) nos dois temas, com a logo branca.

**Props:** `logoSrc` (use a logo branca do grupo Logos), `groups` (`{ title?, items: [{ id, label, icon, badge?, href? }] }`), `active` + `onSelect(id)` ou `defaultActive`, `user` (`{ name, role }`, no rodapé).

- Ordem dos módulos: Painel; Pessoas (Colaboradores, Admissão, Avaliações); Departamento Pessoal (Ponto, Férias, Folha, Benefícios); Gestão (Relatórios, Documentos).
- `badge` só para pendências que pedem ação (admissões a concluir, férias a aprovar).
- Largura `sidebar` (248px); abaixo de 960px, vira menu em gaveta.
