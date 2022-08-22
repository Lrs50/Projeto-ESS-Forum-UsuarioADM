Feature: Editar Usuário
As Usuário Administrador
I want to editar o meu usuário administrador
So that Eu posso alterar minha conta de usuário administrador já existente no site de compartilhamento de reviews

Scenario: Edição bem sucedida de um usuário administrador
Given Eu estou logado como usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234"
And Estou na página "Perfil de Usuário" no tópico "Edição de Usuário"
When Eu modifico o meu campo "Nome" para "Gabriel"
And Confirmo a modificação
Then Posso ver mensagem de confirmação
And O usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234" é modificado no sistema para ter o seu "Nome" igual a "Gabriel"

Scenario: Edição de ID mal sucedida por já existir outro usuário com mesmo ID
Given O sistema possui um usuário administrador com "Nome", "ID" e "Senha" iguais a "Marcelo", "12390" e "8123"
And Eu estou logado como usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234"
And Estou na página "Perfil de Usuário" no tópico "Edição de Usuário"
When Eu modifico o meu campo "ID" para "12390"
And Confirmo a modificação
Then Posso ver mensagem de erro "Já existe um usuário com esse ID"

Scenario: Edição de ID mal sucedida por preenchimento inválido dos dados
Given Eu estou logado como usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234"
And Estou na página "Perfil de Usuário" no tópico "Edição de Usuário"
When Eu modifico o meu campo "ID" para "Gabriel"
And Confirmo a modificação
Then Posso ver mensagem de erro "ID inválido!"

Scenario: Edição de ID mal sucedida pois o usuário foi removido por outro administrador do sistema
Given Eu estou logado como usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234"
And Estou na página "Perfil de Usuário" no tópico "Edição de Usuário"
When Eu modifico o meu campo "Nome" para "Gabriel"
And Um moderador do sistema remove o usuário com "Nome" e "ID" iguais a "Lucas" e "12392"
And Confirmo a modificação
Then Posso ver mensagem de erro "Usuário não existente!"
And Sou retornado ao site des-logado, pois o usuário com "Nome" e "ID" iguais a "Lucas" e "12392" foi removido do sistema

Scenario: Edição de ID bem sucedida com ID igual a outro usuário pois o usuário é deletado antes da edição ser completada
Given O sistema possui um usuário administrador com "Nome", "ID" e "Senha" iguais a "Marcelo", "12390" e "8123"
And Eu estou logado como usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234"
And Estou na página "Perfil de Usuário" no tópico "Edição de Usuário"
When Eu modifico o meu campo "ID" para "12390"
And O usuário administrador com "Nome", "ID" e "Senha" iguais a "Marcelo", "12390" e "8123" é deletado por outro moderador do sistema
And Confirmo a modificação
Then Posso ver mensagem de confirmação
And O usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234" é modificado no sistema para ter o seu "ID" igual a "12390"

Scenario: Edição de ID mal sucedida pois ambos o usuário não está presente no sistema e pelo preenchimento inválido dos dados
Given Eu estou logado como usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234"
And Estou na página "Perfil de Usuário" no tópico "Edição de Usuário"
When Eu modifico o meu campo "ID" para "Gabriel"
And Um moderador do sistema remove o usuário com "Nome" e "ID" iguais a "Lucas" e "12392"
And Confirmo a modificação
Then Posso ver mensagem de erro "Usuário não existente!"
And Sou retornado ao site des-logado, pois o usuário com "Nome" e "ID" iguais a "Lucas" e "12392" foi removido do sistema