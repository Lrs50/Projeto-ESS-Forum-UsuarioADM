Feature: Remoção de artistas
    As a usuario administrador
    I want to remover um artista no sistema
    So that um artista não possa mais ser visto no site

Scenario: Remoção bem sucedida de um artista
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página "lista de artistas"
    And O artista "Carlinhos Bala" com id "15987" está cadastrado no sistema
	When Remover o artista
	Then Posso ver na tela uma mensagem de confirmação informando "o artista foi removido com sucesso"
	And Continuo na página "lista de artistas"

Scenario: Remoção mal sucedida de um artista 
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página "lista de artistas"
    And O artista "Carlinhos Bala" com id "15987" não está cadastrado no sistema
	When Pesquisar o artista
	Then Posso ver na tela uma mensagem informando "o artista não existe"

Scenario: Remoção mal sucedida de artista devido a id e nome que estão cadastrados mas não são um par válido
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página "lista de artistas"
    And O artista "Carlinhos Bala" com id "15987" está cadastrado no sistema
	And O artista "Caça Rato" com id "14836" está cadastrado no sistema
	When Pesquisar o artista com nome "Carlinhos Bala" e id "14836"
	Then Posso ver na tela uma mensagem informando "não existe um artista com essa combinação de nome e id"
	And Continuo na página "lista de artistas"

Scenario: Remoção de artista com nome errado
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página "lista de artistas"
    And O artista "Carlinhos Bala" com id "15987" está cadastrado no sistema
	When Pesquisar o artista com nome "Charlinhos Bala"
	Then Posso ver na tela uma mensagem informando "não existe um artista com esse nome"
	And Continuo na página "lista de artistas"

Scenario: Remoção de artista com id errado
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página "lista de artistas"
    And O artista "Carlinhos Bala" com id "15987" está cadastrado no sistema
	When Pesquisar o artista com id "15989"
	Then Posso ver na tela uma mensagem informando "não existe um artista com esse id"
	And Continuo na página "lista de artistas"

Scenario: Remoção de artista cancelada
	Given Eu estou logado como usuário "administrador" e senha "1234"
	And Eu estou na página "lista de artistas"
    And O artista "Carlinhos Bala" com id "15987" não está cadastrado no sistema
	When Pesquisar o artista
	And Clico para remover o artista
	And Cancelo
	Then Continuo na página "lista de artistas"