Feature: "Inserir novo artista"
    As a usuario administrador
    I want to inserir um novo artista no sistema
    So that um usuario possa visualiza-lo no site

Scenario: Inserção bem sucedida de um novo artista
    Given Eu estou logado como usuário "administrador" e senha "1235"
    And Eu estou na página de "cadastro de artista"
    And O artista "Carlinhos Bala" com id "15987" não está cadastrado no sistema
    When Cadastrar o artista
    Then Posso ver uma mensagem de confirmação informando "o artista foi cadastrado com sucesso"
    And Sou redirecionado para a página "lista de artista"

Scenario: Inserção mal sucedida de artista por falta de nome
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página de "cadastro de artista"
    And O campo "nome" está vazio
	When Eu cadastrar o artista
	Then Posso ver na tela uma mensagem de Erro informando "Preencha todos os campos obrigatórios para prosseguir"
	And Continuo na página de "cadastro de artista"

Scenario: Inserção mal sucedida de artista por falta de id
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página de "cadastro de artista"
    And O campo "id" está vazio
	When Eu cadastrar o artista
	Then Posso ver na tela uma mensagem de Erro informando "Preencha todos os campos obrigatórios para prosseguir"
	And Continuo na página de "cadastro de artista"

Scenario: Inserção mal sucedida de artista que já existe no sistema
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página de "cadastro de artista"
	And O artista de nome "Carlinhos Bala" com id "15987" está cadastrado no sistema
	When Eu insiro o nome "Carlinhos Bala" no campo "nome" e id "15987" no campo "id"
	And Tento cadastrar o artista
	Then Posso ver na tela uma mensagem de erro informando "o artista com nome "Carlinhos Bala" e id "15987" já está cadastrado no sistema"
	And Continuo na página de "cadastro de artista"