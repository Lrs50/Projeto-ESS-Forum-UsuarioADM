Feature: Criação usuario ADM
    As moderador do sistema
    I Want to criar contas de usuario administrador
    So that Eu possa controlar a criação de novos usuarios administradores num site de compartilhamento de reviews

Scenario: Criação bem sucedida de um usuário administrador
Given eu sou o moderador do sistema
And estou na pagina "cadastro de usuario administrador"
When eu preencho os campos para criação de usuário "administrador" com "apelido" "Lucas Reis" e "senha" "3PYP0"
Then eu vejo uma mensagem de confirmação
And o usuário administrador "Lucas Reis" foi adicionado no sistema

Scenario: Criação mal sucedida de um usuário administrador
Given eu sou o moderador do sistema
And estou na página "Cadastro de usuário administrador"
When eu não preencho os campos para criação de usuário "administrador" com "apelido" "Lucas Reis" e "senha" "3PYP0"
Then eu vejo uma mensagem de erro "existem campos obrigatórios não preenchidos"

Scenario: Criação mal sucedida de um usuário administrador por ja existir alguem com aquele determinado apelido
Given eu sou o moderador do sistema
And o usuário administrador com "apelido" "Lucas Reis" está cadastrado no sistema
And estou na pagina "cadastro de usuario administrador"
When eu preencho os campos para criação de usuário "administrador" com "apelido" "Lucas Reis" e "senha" "3PYP0"
Then eu vejo uma mensagem de erro  "Já existe um usuario com esse apelido"
Then eu volto para a pagina "cadastro de usuario administrador"




