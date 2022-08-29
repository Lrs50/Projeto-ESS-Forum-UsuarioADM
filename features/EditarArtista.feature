Feature: Editar artista
    As administrador do sistema
    I Want to editar paginas de artistas
    So that Eu possa atualizar, corrigir, modificar informações dos artistas do sistema

Scenario: Edição bem sucedida da pagina de um artista
Given eu estou logado como usuario "administrador" e senha "duck123"
And estou na pagina "Editar Artistas" do artista "Hulk Sanches" com id "456763"
When Edito o campo "Descrição", "Nome" ou "ID" desse artista
And Confirmo a modificação
Then vejo uma mensagem "Modificações feitas com sucesso"
And o sistema atualizou os dados do artista

Scenario: Mudança inválida
Given eu estou logado como usuario "administrador" e senha "duck123"
And existe um artista com id "112233"
And estou na pagina "Editar Artistas" do artista "Hulk Sanches" com id "456763"
When Edito o campo "ID" desse artista para "112233"
And Confirmo a modificação
Then vejo uma mensagem de erro "Já existe um artista com este ID no sistema Mudança inválida!"
And retorno a página "Editar Artistas" do artista "Hulk Sanches" com id "456763"

Scenario: Mudança nula
Given eu estou logado como usuario "administrador" e senha "duck123"
And estou na pagina "Editar Artistas" do artista "Hulk Sanches" com id "456763"
When Confirmo a modificação
Then vejo uma mensagem "Modificações feitas com sucesso"
And o sistema atualizou os dados do artista



