Feature: Deletar usuário comum
As usuário administrador
I want to Deletar uma conta usuário comum
So that eu possa exercer a administração do site de compartilhamentos de review no qual sou administrador

Scenario: Remoção bem sucedida de um usuário comum existente no sistema.
	Given Eu estou logado como usuário "costa" com senha "123"
	Given Eu estou na pagina UsersManagement
	Given O Usuário comum "marcelo" com id "marcelo" está cadastrado no sistema
	When Eu removo o usuário comum "marcelo" com id "marcelo" 
	Then Nao consigo ver o usuário "marcelo" com id "marcelo"

