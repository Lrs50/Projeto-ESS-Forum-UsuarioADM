Feature: Deletar usuário comum
As usuário administrador
I want to Deletar uma conta usuário comum
So that eu possa exercer a administração do site de compartilhamentos de review no qual sou administrador

Scenario: Remoção bem sucedida de um usuário comum existente no sistema.
	Given Eu estou logado como usuário "administrador" com senha "1234"
	And Estou na página "deletar usuário comum"
	And O Usuário comum "Marcelo" com id "12390" está cadastrado no sistema
	When Eu removo o usuário comum "Marcelo" com id "12390" 
	Then Posso ver uma mensagem de confirmação "O usuário foi removido com sucesso"
	And O usuário "Marcelo" com id "12390" é removido do sistema

Scenario: Remoção mal sucedida de um usuário comum inexistente no sistema
	Given Eu estou logado como usuário "administrador" com senha "1234"
	And Estou na página "deletar usuário comum"
	And O Usuário comum "Marcelo" com id "12390" não está cadastrado no sistema
	When Eu tento remover o usuário comum "Marcelo" com id "12390" 
	Then Posso ver uma mensagem de erro "Não existe um usuario cadastrado com essas credenciais"

Scenario: Tentativa mal sucedida de remover um usuário administrador.
	Given Eu estou logado como usuário "administrador" com senha "1234"
	And Estou na página "deletar usuário comum"
	And O Usuário administrador "administrador2" com id "12391" está cadastrado no sistema
	When Eu tento remover o usuário administrador "administrador2" com id "12391" 
	Then Posso ver uma mensagem de erro "você não pode remover um usuário administrador"
	And Nenhum usuário é removido do sistema

Scenario: Tentativa mal sucedida de remover um usuário comum devido a id e nomes que estão cadastrados mas não são um par válido
	Given Eu estou logado como usuário "administrador" com senha "1234"
	And Estou na página "deletar usuário comum"
	And O Usuário administrador "Marcelo" com id "12390" está cadastrado no sistema
	And O Usuário administrador "Lucas" com id "12392" está cadastrado no sistema
	When Eu tento remover o usuário comum "Marcelo" com id "12392" 
	Then Posso ver uma mensagem de erro "Não existe um usuario com essa combinação nome e de id"
	And Nenhum usuário é removido do sistema

Scenario: Tentativa mal sucedida de remover um usuário comum devido a falta de preenchimento de id e nome.
	Given Eu estou logado como usuário "administrador" com senha "1234"
	And Estou na página "deletar usuário comum"
    And O Usuário administrador "Marcelo" com id "12390" está cadastrado no sistema
	When Eu tento remover o usuário comum "" com id "" 
	Then Posso ver uma mensagem de erro "Usuario e Id não foram preenchidos"
	And Nenhum usuário é removido do sistema
	And Posso ver uma mensagem "Preencha os campos de forma válida"

Scenario: Tentativa mal sucedida de remover um usuário comum devido a falta de preenchimento de id.
	Given Eu estou logado como usuário "administrador" com senha "1234"
	And Estou na página "deletar usuário comum"
    And O Usuário administrador "Marcelo" com id "12390" está cadastrado no sistema
	When Eu tento remover o usuário comum "Marcelo" com id "" 
	Then Posso ver uma mensagem de erro "Id não foi preenchido"
	And Nenhum usuário é removido do sistema
	And Posso ver uma mensagem "Preencha todos os campos"

Scenario: Tentativa mal sucedida de remover um usuário comum devido a falta de preenchimento do nome do usuario.
	Given Eu estou logado como usuário "administrador" com senha "1234"
	And Estou na página "deletar usuário comum"
    And O Usuário administrador "Marcelo" com id "12390" está cadastrado no sistema
	When Eu tento remover o usuário comum "" com id "12390" 
	Then Posso ver uma mensagem de erro "Nome não foi preenchido"
	And Nenhum usuário é removido do sistema
	And Posso ver uma mensagem "Preencha todos os campos"
