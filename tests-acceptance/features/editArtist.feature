Feature: Editar artista
    As administrador do sistema
    I Want to editar paginas de artistas
    So that Eu possa atualizar, corrigir, modificar informações dos artistas do sistema

Scenario: Edição bem sucedida da pagina de um artista
Given Eu estou logado como usuário adm "costa" com senha "123"
And O artista com nome "Jensen Ackles" esta cadastrado no sistema
And Eu estou na pagina Edit Artist do Jesen Ackles
When Eu edito o campo Descrição desse artista com "Soldier Boy"
And Confirmo a operação de edição
Then Estou na pagina Artists Management

Scenario: Edição bem sucedida Nula
Given Eu estou logado como usuário adm "costa" com senha "123"
And O artista com nome "Jensen Ackles" esta cadastrado no sistema
And Eu estou na pagina Edit Artist do Jesen Ackles
When Confirmo a operação de edição
Then Estou na pagina Artists Management 

Scenario: Edição mal sucedida por apagar o nome do artista
Given Eu estou logado como usuário adm "costa" com senha "123"
And O artista com nome "Jensen Ackles" esta cadastrado no sistema
And Eu estou na pagina Edit Artist do Jesen Ackles
When Eu edito o campo Name desse artista com um valor inválido
And Confirmo a operação de edição
Then Continuo na pagina Edit Artist do Jesen Ackles