Feature: Deletar comentario de usuario comum como usuario administrador
As usuário moderador
I want to Deletar uma comentario
So that eu possa exercer a administração do site de compartilhamentos de review no qual sou administrador

Scenario: Remoção bem sucedida de um comentario.
	Given Eu estou logado como usuário "moderador" com senha "1234"
	And Estou na página da noticia "Filipe ret e preso"
	And O comentario "Nova contratacao da NadaMal" do usuário comum "Marcelo" com id "12390" está associado a essa pagina
	When Eu removo o comentario "Nova contratacao da NadaMal" 
    And Confirmo que quero apagar o comentario "Nova contratacao da NadaMal" 
	Then Posso ver uma mensagem de confirmação "Comentario foi removido com sucesso"
	And O comentario "Nova contratacao da NadaMal" foi removido da pagina

Scenario: Cancelamento da remoção de um comentario.
	Given Eu estou logado como usuário "moderador" com senha "1234"
	And Estou na página da noticia "Filipe ret e preso"
	And O comentario "Nova contratacao da NadaMal" do usuário comum "Marcelo" com id "12390" está associado a essa pagina
	When Eu removo o comentario "Nova contratacao da NadaMal" 
    And Cancelo a exclusão do comentario "Nova contratacao da NadaMal" 
	Then Posso ver uma mensagem de cancelamento "O comentario nao foi deletado"
	