Feature: Remoção usuario ADM
    As moderador do sistema
    I Want to criar e remover contas de usuario administrador
    So that Eu possa controlar a remoção de novos usuarios administradores num site de compartilhamento de reviews

Scenario: Remoção bem sucedida de um usuário administrador
Given estou logado com o usuario moderador "moderador" com senha "123"
And estou na pagina "Admin Management"
And o adm "adm-test" com username "adm-test" está cadastrado no sistema
When eu removo o usuário com username "adm-test"
And eu confirmo a operação
Then eu vejo uma mensagem de confirmação "Admin deleted successfully!"
And não consigo ver o usuário com username "adm-test" 

Scenario: Remoção mal sucedida de um usuário administrador por cancelamento
Given estou logado com o usuario moderador "moderador" com senha "123"
And estou na pagina "Admin Management"
And o adm "adm-test" com username "adm-test" está cadastrado no sistema
When eu removo o usuário com username "adm-test"
And eu cancelo a operação
Then consigo ver o usuário com username "adm-test" 

Scenario: Remoção mal sucedida de um usuário administrador
Given estou logado com o usuario moderador "moderador" com senha "123"
And estou na pagina "Admin Management"
And o adm "adm-test" com username "adm-test" está cadastrado no sistema
When eu removo o usuário com username "adm-test"
And eu confirmo a operação
Then eu vejo uma mensagem de confirmação "Admin deleted successfully!"
And consigo ver o usuário com username "adm-test" 