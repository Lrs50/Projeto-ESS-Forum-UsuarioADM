Feature: Editar artista
    As administrador do sistema
    I Want to editar paginas de artistas
    So that Eu possa atualizar, corrigir, modificar informações dos artistas do sistema

Scenario: Edição bem sucedida da pagina de um artista
Given eu estou logado como usuario "administrador" e senha "duck123"
And estou na pagina "Edição de artistas"
And o artista "Hulk Sanches"  esta cadastrado no sistema
And preencho o campo "Nome" com "Hulk Sanches"
When Consigo editar o campo "Descrição" desse artista
And confirmar modificações 
Then vejo uma mensagem "Modificações feitas com sucesso"
And o sistema atualizou os dados do artista

Scenario: Artista não existente
Given eu estou logado como usuario "administrador" e senha "duck123"
And estou na pagina "Edição de artistas"
And o artista "Hulk Sanches"  não esta cadastrado no sistema
And preencho o campo "Nome" com "Hulk Sanches"
When vejo uma mensagem "Não existe nenhum artista com o nome fornecido"
When OK
Then retorno a pagina "Edicao de artistas"

Scenario: Mais de um artisca com o mesmo nome
Given eu estou logado como usuario "administrador" e senha "duck123"
And estou na pagina "Edição de artistas"
And o artista "Hulk Sanches" ID "12345" esta cadastrado no sistema
And o artista "Hulk Sanches" ID "12346" esta cadastrado no sistema
When preencho o campo "Nome" com "Hulk Sanches"
And vejo uma mensagem "Como existem mais de um artista com o mesmo nome preencha a caixa de ID"
And preencho o campo "ID" com "12345"
And Consigo editar o campo "Descrição" desse artista
And confirmar modificações 
Then vejo uma mensagem "Modificações feitas com sucesso"
And o sistema atualizou os dados do artista

Scenario: Mudança nula
Given eu estou logado como usuario "administrador" e senha "donkey123"
And estou na pagina "Edição de artistas"
And o artista "Hulk Carneiro"  esta cadastrado no sistema
When preencho o campo "Nome" com "Hulk Carneiro"
And Consigo editar o campo "Descrição" desse artista
And nenhuma moficicação é feita
And confirmar modificações 
Then vejo uma mensagem "Modificações feitas com sucesso"



