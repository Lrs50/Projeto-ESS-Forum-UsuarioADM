Feature: Criar comentario em uma noticia como um usuario comum
As usuário comum
I want to Criar um comentario em uma noticia
So that eu possa dar minha opiniao sobre alguma noticia

Scenario: Cancelamento da criacao de um comentario.
	Given Eu estou logado como usuário adm "marcelo" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	When Eu tento criar o comentario "Mc maneirinho na NadaMal"
	When Eu cancelo a criacao do comentairo "Mc maneirinho na NadaMal"
	Then Nao consigo ver o comentario "Mc maneirinho na NadaMal" na noticia

Scenario: Criacao bem sucedida de um comentario.
	Given Eu estou logado como usuário adm "marcelo" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	When Eu tento criar o comentario "Mc maneirinho na NadaMal"
	When Eu confirmo a criacao do comentairo "Mc maneirinho na NadaMal"
	Then Consigo ver o comentario "Mc maneirinho na NadaMal" na noticia
