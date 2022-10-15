Feature: Criar comentario em uma noticia como um usuario comum
As usuário comum
I want to Criar um comentario em uma noticia
So that eu possa dar minha opiniao sobre alguma noticia

Scenario: Cancelamento da criacao de um comentario.
	Given Eu estou logado como usuário adm "marcelo" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	When Eu tento criar o comentario "quero falhar"
	When Eu cancelo a criacao do comentairo "quero falhar"
	Then Não consigo ver o comentario "quero falhar"

Scenario: Criacao bem sucedida de um comentario.
	Given Eu estou logado como usuário adm "marcelo" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	When Eu tento criar o comentario "No baile nós é midia"
	When Eu confirmo a criacao do comentairo "No baile nós é midia"
	Then Consigo ver o comentario "No baile nós é midia" na noticia
