# TextField

Campo de texto com rótulo, dica e erro. O rótulo fica sempre visível acima do campo; o placeholder só mostra o formato esperado.

**Props:** `label`, `hint`, `error` (substitui a dica e marca o campo como inválido), `required`, `icon`, `suffix` (unidade: “R$/mês”, “horas”), `mono` (JetBrains Mono para CPF, PIS, matrícula, valores), mais qualquer atributo de `<input>`.

- Mensagem de erro diz o que fazer: “Informe um e-mail completo, como nome@empresa.com.br.” Nunca “Campo inválido”.
- Campos obrigatórios levam `required` (asterisco); se quase todos forem obrigatórios, marque os opcionais com “(opcional)” no rótulo.
- Dados sensíveis (CPF, salário, conta bancária) aparecem mascarados fora do modo de edição: `123.***.***-09`.
- Datas no formato dd/mm/aaaa; valores em reais com vírgula decimal: `4.850,00`.
