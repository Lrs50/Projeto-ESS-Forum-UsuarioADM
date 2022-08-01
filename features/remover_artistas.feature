Feature: "Remoção de artistas"
    As a usuario administrador
    I want to remover um artista no sistema
    So that um usuario comum não possa visualizar

Scenario: Remoção bem sucedida de um artista
	Given Eu estou logado como usuário “administrador” e senha “1234”
	And Eu estou na página de “lista de artistas”
    And O artista “Carlinhos Bala” com id “15987” está cadastrado no sistema
	When Remover o artista
	Then Posso ver na tela uma mensagem de confirmação informando “o artista foi removido com sucesso”
	And Continuo na página de “lista de artistas”
