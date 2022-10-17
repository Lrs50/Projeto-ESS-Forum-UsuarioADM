Feature: Deletar usuário comum
As usuário administrador
I want to Deletar uma conta usuário comum
So that eu possa exercer a administração do site de compartilhamentos de review no qual sou administrador

Scenario: Remoção bem sucedida de um usuário comum existente no sistema.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	And Eu estou na pagina UsersManagement
	And O Usuário comum "fake-username" com id "fake-id" está cadastrado no sistema
	When Eu tento remover o usuário comum "fake-username" com id "fake-id"
	And Eu confirmo a remocao do usuário comum "fake-username" com id "fake-id" 
	Then Nao consigo ver o usuário "fake-username" com id "fake-id"

Scenario: Remoção mal sucedida de um usuário comum inexistente no sistema
	Given Eu estou logado como usuário adm "costa" com senha "123"
	And Eu estou na pagina UsersManagement
	And O Usuário comum "fake-username-inexistete" com id "fake-id-inexistente" não está cadastrado no sistema
	When Eu tento remover o usuário comum "fake-username-inexistente" com id "fake-id-inexistente" inexistente
	Then Nao consigo ver o usuário "fake-username-inexistente" com id "fake-id-inexistente"

Scenario: Cancelamento de tentativa de remover um usuario comum.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	And Eu estou na pagina UsersManagement
	And O Usuário comum "fake-username" com id "fake-id" está cadastrado no sistema
	When Eu tento remover o usuário comum "fake-username" com id "fake-id" 
	And Eu cancelo a remocao do usuário comum "fake-username" com id "fake-id" 
	Then Eu consigo ver o usuário "fake-username" com id "fake-id"