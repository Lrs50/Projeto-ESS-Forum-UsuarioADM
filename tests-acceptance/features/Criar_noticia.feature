Feature: Criar notícia
    As usuario administrador
    I want to criar noticias
    So that eu consigo alimentar o site e atrair novos usuários

    Scenario: Cadastro bem sucedido uma notícia
        Given Eu estou logado como usuário adm "costa" com senha "123"
	    Given Eu estou na pagina de criação de noticias
        When Eu preencho os campos necessários para a criação da noticia
        When Eu tento criar uma noticia
        Then A notícia com título Djonga aparece em telão na Times Square está cadastrada no sistema.

    Scenario: Cadastro mal sucedido uma notícia
        Given Eu estou logado como usuário adm "costa" com senha "123"
	    Given Eu estou na pagina de criação de noticias
        When Eu nao preencho os campos necessários para a criação da noticia
        When Eu tento criar uma noticia
        Then A notícia com título Djonga aparece em telão na Times Square nao está cadastrada no sistema.