Feature: Remover notícia
    As usuario administrador
    I want to remover noticias
    So that eu posso gerenciar melhor o meu site

    Scenario: Remoção bem sucedida de uma notícia
        Given Eu estou logado como usuário adm "costa" com senha "123"
        Given estou na view de gerenciamento de notícias.
        And A notícia a ser removida "Djonga e o album O Dono do Lugar" está cadastrada no sistema.
        When Removo a noticia "Djonga e o album O Dono do Lugar".
        Then O sistema remove a noticia "Djonga e o album O Dono do Lugar".