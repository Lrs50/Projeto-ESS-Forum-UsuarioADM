Feature: Remover Usuário
As Usuário Administrador
I want to remover o meu usuário administrador
So that Eu posso remover minha conta de usuário administrador já existente no site de compartilhamento de reviews

Scenario: Remoção bem sucedida de um usuário administrador
Given Eu estou logado como usuário administrador com nome "costa" e senha "123"
And Estou na página de edição de perfil
When Eu aperto o botão "Delete Account"
And Eu confirmo apertando "OK"
Then Sou retornado à página "home" des-logado
And O usuário administrador com nome "costa" e senha "123" é removido do sistema

Scenario: Remoção mal sucedida de um usuário administrador pois o usuário já foi removido por outro administrador do sistema
Given Eu estou logado como usuário administrador com nome "costa" e senha "123"
And Estou na página de edição de perfil
When Outro moderador do sistema remove o usuário administrador com nome "costa"
And Eu aperto o botão "Delete Account"
And Eu confirmo apertando "OK"
Then Sou retornado à página "home" des-logado pois o usuário administrador com nome "costa" e senha "123" foi removido do sistema