Feature: Deletar comentario de usuario comum como usuario administrador
As usuário moderador
I want to Deletar uma comentario
So that eu possa exercer a administração do site de compartilhamentos de review no qual sou administrador

Scenario: Cancelamento da remoção de um comentario.
	Given Eu estou logado como usuário mod "McPoze" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	Given Consigo ver o comentario "No baile nós é midia" na noticia
	When Eu tento remover o comentario "No baile nós é midia"
	When Eu cancelo a remocao do comentairo "No baile nós é midia"
	Then Consigo ver o comentario "No baile nós é midia"

Scenario: Falha da remoção de um comentario inexistente.
	Given Eu estou logado como usuário mod "McPoze" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	Given Não consigo ver o comentario "No baile os menor marola" na noticia
	When Eu tento remover o comentario inexistente "No baile os menor marola"
	Then Não consigo ver o comentario "No baile os menor marola"

Scenario: Remoção bem sucedida de um comentario.
	Given Eu estou logado como usuário mod "McPoze" com senha "123"
	Given Estou na página da noticia Filipe Ret é preso
	Given Consigo ver o comentario "acende, puxa, prende e solta" na noticia
	When Eu tento remover o comentario "acende, puxa, prende e solta"
	When Eu confirmo a remocao do comentario "acende, puxa, prende e solta"
	Then Não consigo ver o comentario "acende, puxa, prende e solta"