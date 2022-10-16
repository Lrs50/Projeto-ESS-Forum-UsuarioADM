Feature: Editar artista
    As administrador do sistema
    I Want to editar paginas de artistas
    So that Eu possa atualizar, corrigir, modificar informações dos artistas do sistema

Scenario: Edição bem sucedida da pagina de um artista
Given eu estou logado como usuario "adm" e senha "123"
And o artista com nome "Roberto Carlos" esta cadastrado no sistema
And estou na pagina "Edit Artist do Roberto Carlos" 
Then editar o campo "Descrição" desse artista com "testando"
When pressiono o botão save
Then vejo uma mensagem "Saved"
And estou na pagina "Artists Management" 

Scenario: Edição bem sucedida Nula
Given eu estou logado como usuario "adm" e senha "123"
And o artista com nome "Roberto Carlos" esta cadastrado no sistema
And estou na pagina "Edit Artist do Roberto Carlos" 
When pressiono o botão save
Then vejo uma mensagem "Saved"
And estou na pagina "Artists Management" 

Scenario: Edição mal sucedida por apagar o nome do artista
Given eu estou logado como usuario "adm" e senha "123"
And o artista com nome "Roberto Carlos" esta cadastrado no sistema
And estou na pagina "Edit Artist do Roberto Carlos" 
Then editar o campo "Name" desse artista com ""
When pressiono o botão save
Then vejo uma mensagem "Please make sure that the Name is not empty!"