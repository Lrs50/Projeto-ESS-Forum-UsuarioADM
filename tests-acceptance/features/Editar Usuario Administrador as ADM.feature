Feature: Editar Usuário
As Usuário Administrador
I want to editar o meu usuário administrador
So that Eu posso alterar minha conta de usuário administrador já existente no site de compartilhamento de reviews

Scenario: Edição bem sucedida do nome de um usuário administrador
Given Eu estou logado como usuário administrador com username "sonk" e senha "123"
And Estou na página de edição de perfil
When Eu modifico o meu campo de nome para "Gabriel"
And Confirmo a modificação
Then O usuário administrador com nome "Sonikku" é modificado no sistema para ter o seu nome igual a "Gabriel"

Scenario: Edição bem sucedida do avatar de um usuário administrador
Given Eu estou logado como usuário administrador com username "sonk" e senha "123"
And Estou na página de edição de perfil
When Eu modifico o meu campo de avatar para "https://i.pinimg.com/736x/cb/c9/2f/cbc92f7dc296c6ab8ffa4fdcd7108dd7.jpg"
And Confirmo a modificação
Then O usuário administrador tem seu perfil modificado no sistema para ter o seu avatar igual a "https://i.pinimg.com/736x/cb/c9/2f/cbc92f7dc296c6ab8ffa4fdcd7108dd7.jpg"