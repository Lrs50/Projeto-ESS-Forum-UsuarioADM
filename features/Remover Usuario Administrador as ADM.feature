Feature: Remover Usuário
As Usuário Administrador
I want to remover o meu usuário administrador
So that Eu posso remover minha conta de usuário administrador já existente no site de compartilhamento de reviews

Scenario: Remoção bem sucedida de um usuário administrador
Given Eu estou logado como usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234"
And Estou na página "Remoção de Usuário"
When Eu confirmo a remoção da minha conta de usuário administrador
Then Posso ver mensagem de confirmação
And Sou retornado ao site des-logado
And O usuário administrador com "Nome" e "ID" iguais a "Lucas" e "12392" é removido do sistema

Scenario: Remoção mal sucedida de um usuário administrador pois o usuário já foi removido por outro administrador do sistema
Given Eu estou logado como usuário administrador com "Nome", "ID" e "Senha" iguais a "Lucas", "12392" e "1234"
And Estou na página "Remoção de Usuários"
When Outro moderador do sistema remove o usuário com "Nome" e "ID" iguais a "Lucas" e "12392"
And Eu confirmo a remoção
Then Posso ver mensagem de erro "Usuário não existente!"
And Sou retornado ao site des-logado, pois o usuário com "Nome" e "ID" iguais a "Lucas" e "12392" foi removido do sistema
