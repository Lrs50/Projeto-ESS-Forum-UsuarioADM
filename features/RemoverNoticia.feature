Feature: Remover notícia
    As usuario administrador
    I want to remover noticias
    So that eu posso gerenciar melhor o meu site

    Scenario: Remoção bem sucedida de uma notícia
        Given eu estou logado como administrador e a notícia "Felipe Ret é preso" está cadastrada no sistema
        And estou na página de gerenciamento de notícias
        When Eu removo a notícia "Felipe Ret é preso".
        Then Eu recebo uma mensagem de confirmação
        And O sistema remove a notícia de título "Felipe Ret é preso".