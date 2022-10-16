Feature: Criação usuario ADM
    As moderador do sistema
    I Want to criar e remover contas de usuario administrador
    So that Eu possa controlar a criação de novos usuarios administradores num site de compartilhamento de reviews

Scenario: Criação mal sucedida de um usuário administrador
Given estou logado com o usuario moderador "moderador" com senha "123"
And estou na pagina "Create Admin User"
When eu preencho os campos "Username" "name" e "password" com "admin-test1" "admin-test1" e "123"
And eu aperto o botão create
Then eu vejo uma mensagem de confirmação "New Admin User was created successfully!"
And estou na pagina "Create Admin User"
And não consigo ver o usuario adm com username "admin-test1"

Scenario: Criação bem sucedida de um usuário administrador
Given estou logado com o usuario moderador "moderador" com senha "123"
And estou na pagina "Create Admin User"
When eu preencho os campos "Username" "name" e "password" com "admin-test1" "admin-test1" e "123"
And eu aperto o botão create
Then eu vejo uma mensagem de confirmação "New Admin User was created successfully!"
And estou na pagina "Create Admin User"
And consigo ver o usuario adm com username "admin-test1"

Scenario: Criação mal sucedida de um usuário administrador por preenchimento incompleto
Given estou logado com o usuario moderador "moderador" com senha "123"
And estou na pagina "Create Admin User"
When eu apenas preencho os campos "Username" e "name" com "admin-test2" e "admin-test1"
Then eu vejo uma mensagem de erro "Please make sure that Username, Name and Password are not empty!"