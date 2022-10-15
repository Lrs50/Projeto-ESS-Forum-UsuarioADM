Feature: Deletar comentario de usuario comum como usuario administrador
As usuário administrador
I want to Deletar uma comentario
So that eu possa exercer a administração do site de compartilhamentos de review no qual sou administrador

Scenario: Cancelamento da remoção de um comentario.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	Given Consigo ver o comentario "Mc maneirinho na NadaMal" na noticia
	When Eu tento remover o comentario "Mc maneirinho na NadaMal"
	When Eu cancelo a remocao do comentairo "Mc maneirinho na NadaMal"
	Then Consigo ver o comentario "Mc maneirinho na NadaMal"

Scenario: Falha da remoção de um comentario inexistente.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	Given Não consigo ver o comentario "No pique da in dollar" na noticia
	When Eu tento remover o comentario inexistente "No pique da in dollar"
	Then Não consigo ver o comentario "No pique da in dollar"

Scenario: Remoção bem sucedida de um comentario.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	Given Consigo ver o comentario "Nova contratacao da NadaMal" na noticia
	When Eu tento remover o comentario "Nova contratacao da NadaMal"
	When Eu confirmo a remocao do comentario "Nova contratacao da NadaMal"
	Then Não consigo ver o comentario "Nova contratacao da NadaMal"
