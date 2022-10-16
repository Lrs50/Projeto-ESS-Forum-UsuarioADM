Feature: Remover Usuário
As Usuário Administrador
I want to remover o meu usuário administrador
So that Eu posso remover minha conta de usuário administrador já existente no site de compartilhamento de reviews

Scenario: Remoção de um usuário administrador cancelada
Given Eu estou logado como usuário administrador com username "sonk" e senha "123"
And Estou na página de edição de perfil com ID "SonkAqQq41fdBA"
When Eu aperto o botão "Delete Account"
And Eu aperto "Cancel"
Then Permaneço na página de edição de perfil com ID "SonkAqQq41fdBA"

Scenario: Remoção bem sucedida de um usuário administrador
Given Eu estou logado como usuário administrador com username "sonk" e senha "123"
And Estou na página de edição de perfil com ID "SonkAqQq41fdBA"
When Eu aperto o botão "Delete Account"
And Eu confirmo apertando "OK"
Then Sou retornado à página "home/news" des-logado
And O usuário administrador com nome "sonk" e senha "123" é removido do sistema