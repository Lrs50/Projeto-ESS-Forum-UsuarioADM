Feature: Editar Usuário
As Usuário Administrador
I want to editar o meu usuário administrador
So that Eu posso alterar minha conta de usuário administrador já existente no site de compartilhamento de reviews

Scenario: Edição bem sucedida do nome de um usuário administrador
Given Eu estou logado como usuário administrador com username "sonk" e senha "123"
And Estou na página de edição de perfil com ID "SonkAqQq41fdBA"
When Eu modifico o meu campo de nome para "Gabriel"
And Confirmo a modificação
Then O usuário administrador com nome "Sonikku" é modificado no sistema para ter o seu nome igual a "Gabriel"

Scenario: Edição bem sucedida do 'about' de um usuário administrador
Given Eu estou logado como usuário administrador com username "sonk" e senha "123"
And Estou na página de edição de perfil com ID "SonkAqQq41fdBA"
When Eu modifico o meu campo de about para "Developer and Full-Time Sonikku"
And Confirmo a modificação
Then O usuário administrador com about "Developer and Part-Time Sonikku" é modificado no sistema para ter o seu about igual a "Developer and Full-Time Sonikku"

Scenario: Edição bem sucedida do avatar de um usuário administrador
Given Eu estou logado como usuário administrador com username "sonk" e senha "123"
And Estou na página de edição de perfil com ID "SonkAqQq41fdBA"
When Eu modifico o meu campo de avatar para "https://i.pinimg.com/736x/cb/c9/2f/cbc92f7dc296c6ab8ffa4fdcd7108dd7.jpg"
And Confirmo a modificação
Then O usuário administrador tem seu perfil modificado no sistema para ter o seu avatar igual a "https://i.pinimg.com/736x/cb/c9/2f/cbc92f7dc296c6ab8ffa4fdcd7108dd7.jpg"

Scenario: Edição bem sucedida do cover de um usuário administrador
Given Eu estou logado como usuário administrador com username "sonk" e senha "123"
And Estou na página de edição de perfil com ID "SonkAqQq41fdBA"
When Eu modifico o meu campo de cover para "https://i.pinimg.com/originals/4d/06/8f/4d068f21e15a5ec781db3b791e6d796c.png"
And Confirmo a modificação
Then O usuário administrador tem seu perfil modificado no sistema para ter o seu cover igual a "https://i.pinimg.com/originals/4d/06/8f/4d068f21e15a5ec781db3b791e6d796c.png"