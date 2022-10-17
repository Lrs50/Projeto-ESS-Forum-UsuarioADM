Feature: Editar notícia
    As usuario administrador
    I want to editar noticias
    So that eu posso gerenciar melhor o meu site

    Scenario: Edição bem sucedida de uma notícia
        Given Eu estou logado como usuário adm "costa" com senha "123"
        Given estou na pagina de gerenciamento de notícias.
        And A notícia "Djonga aparece em telão na Times Square" está cadastrada no sistema.
        When Entro na pagina de edicao de noticia da notícia "Djonga aparece em telão na Times Square".
        And mudo o título para "Djonga e o album O Dono do Lugar".
        When eu tento salvar as edicoes
        Then O sistema edita a notícia de título Djonga aparece em telão na Times Square para Djonga e o album O Dono do Lugar

    Scenario: Edição mal sucedida de uma notícia
        Given Eu estou logado como usuário adm "costa" com senha "123"
        Given estou na pagina de gerenciamento de notícias.
        And A notícia "Djonga e o album O Dono do Lugar" está cadastrada no sistema.
        When Entro na pagina de edicao de noticia da notícia "Djonga e o album O Dono do Lugar".
        And mudo o título para vazio.
        When eu tento salvar as edicoes
        Then O sistema nao edita a notícia de título Djonga aparece em telão na Times Square para vazio


