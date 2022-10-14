Feature: Deletar usuário comum
As usuário administrador
I want to Deletar uma conta usuário comum
So that eu possa exercer a administração do site de compartilhamentos de review no qual sou administrador

Scenario: Remoção bem sucedida de um usuário comum existente no sistema.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Eu estou na pagina UsersManagement
	Given O Usuário comum "fake-username" com id "fake-id" está cadastrado no sistema
	When Eu tento remover o usuário comum "fake-username" com id "fake-id"
	When Eu confirmo a remocao do usuário comum "fake-username" com id "fake-id" 
	Then Nao consigo ver o usuário "fake-username" com id "fake-id"

Scenario: Remoção mal sucedida de um usuário comum inexistente no sistema
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Eu estou na pagina UsersManagement
	Given O Usuário comum "fake-username" com id "fake-id" não está cadastrado no sistema
	When Eu tento remover o usuário comum "fake-username" com id "fake-id" inexistente
	Then Nao consigo ver o usuário "fake-username" com id "fake-id"

Scenario: Cancelamento de tentativa de remover um usuario comum.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Eu estou na pagina UsersManagement
	Given O Usuário comum "fake-username" com id "fake-id" está cadastrado no sistema
	When Eu tento remover o usuário comum "fake-username" com id "fake-id" 
	When Eu cancelo a remocao do usuário comum "fake-username" com id "fake-id" 
	Then Eu consigo ver o usuário "fake-username" com id "fake-id"