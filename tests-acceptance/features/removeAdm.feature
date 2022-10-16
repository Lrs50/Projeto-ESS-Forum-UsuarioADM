
Feature: Remoção usuario ADM
    As moderador do sistema
    I Want to criar e remover contas de usuario administrador
    So that Eu possa controlar a remoção de novos usuarios administradores num site de compartilhamento de reviews

Scenario: Remoção mal sucedida de um usuário administrador por cancelamento
Given Eu estou logado como usuário mod "McPoze" com senha "123"
Given Eu estou na pagina Admin Management
And O adm com username "Lucas" está cadastrado no sistema
When Eu tento remover o usuário com username "Lucas"
And Eu cancelo a operação
Then Consigo ver o usuário com username "Lucas" 

Scenario: Remoção bem sucedida de um usuário administrador
Given Eu estou logado como usuário mod "McPoze" com senha "123"
Given Eu estou na pagina Admin Management
Given O adm com username "Lucas" está cadastrado no sistema
When Eu tento remover o usuário com username "Lucas"
When Eu confirmo a operação
Then Não consigo ver o usuário com username "Lucas" 