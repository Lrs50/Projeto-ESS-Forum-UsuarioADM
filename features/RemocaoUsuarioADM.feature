Feature: Remoção usuario ADM
    As moderador do sistema
    I Want to remover contas de usuario administrador
    So that Eu possa controlar a remoção de novos usuarios administradores num site de compartilhamento de reviews

Scenario: Remoção bem sucedida de um usuário administrador
Given eu sou o moderador do sistema
And o usuário administrador com "Nome" "Lucas Reis" e "ID" "1981" está cadastrado no sistema
And estou na página "Remoção de usuário administrador"
When eu removo o usuário com "Nome" "Lucas Reis" e "ID" "1981"
Then eu vejo uma mensagem de confirmação
And o usuário administrador "Lucas Reis" foi removido do sistema

Scenario: Remoção mal sucedida de um usuário administrador
Given eu sou o moderador do sistema
And o usuário administrador com "Nome" "Lucas Reis" e "ID" "1981" não está cadastrado no sistema
And estou na página "Remoção de usuário administrador"
When eu removo o usuário com "Nome" "Lucas Reis" e "ID" "1981"
Then eu vejo uma mensagem de erro "Usuário administrador não existente"

Scenario: Remoção mal sucedida de um usuário administrador por erro match entre o ID e o Nome
Given eu sou o moderador do sistema
And o usuário administrador com "Nome" "Lucas Reis" e "ID" "1991" está cadastrado no sistema
And estou na página "Remoção de usuário administrador"
When eu removo o usuário com "Nome" "Lucas Reis" e "ID" "1981"
Then eu vejo uma mensagem de erro "O usuario e o ID fornecidos não formam uma combinação existente"

