Feature: Cadastrar artista
As usuário administrador
I want to cadastrar um artista
So that um artista possa ser acessado no sistema

Scenario: Cadastro bem sucedido de um artista no sistema.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Eu estou na area de "Create Artist"
	Given As informações nome, type e description estão preenchidas
	When Eu tento cadastrar o artista 
	Then Consigo ver a página do novo artista