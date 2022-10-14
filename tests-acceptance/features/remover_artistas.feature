Feature: Remover artista
As usuário administrador
I want to remover um artista
So that um artista não possa mais ser acessado no sistema

Scenario: Remoção mal sucedida de um artista existente no sistema.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Eu estou na pagina "Artist Management"
	Given O artista "João Gomes" com id "joaogomes" está cadastrado no sistema
	When Eu tento remover o artista "João Gomes" com id "joaogomes" 
	Then Consigo ver o artista "João Gomes" com id "joaogomes"

Scenario: Remoção mal sucedida de um artista existente no sistema devido ao cancelamento da operação.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Eu estou na pagina "Artist Management"
	Given O artista "João Gomes" com id "joaogomes" está cadastrado no sistema
	When Eu tento remover o artista "João Gomes" com id "joaogomes" e cancelo 
	Then Consigo ver o artista "João Gomes" com id "joaogomes"

Scenario: Remoção bem sucedida de um artista existente no sistema.
	Given Eu estou logado como usuário adm "costa" com senha "123"
	Given Eu estou na pagina "Artist Management"
	Given O artista "Roberto Carlos" com id "robertocarlos" está cadastrado no sistema
	When Eu tento remover o artista "Roberto Carlos" com id "robertocarlos" 
	Then Nao consigo ver o artista "Roberto Carlos" com id "robertocarlos"