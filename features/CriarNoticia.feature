Feature: Criar notícia
    As usuario administrador
    I want to criar noticias
    So that eu consigo alimentar o site e atrair novos usuários

    Scenario: Cadastro bem sucedido uma notícia
        Given eu estou logado como administrador
        And estou na página de gerenciamento de notícias
        When eu preencho os campos para a criação da notícia com "título" "Felipe Ret é preso"
        Then Eu vejo uma mensagem de confirmação
        And A notícia com título "Felipe Ret é preso" está cadastrada no sistema.

    Scenario: Cadastro mal sucedido uma notícia
        Given eu estou logado como administrador
        And estou na página de gerenciamento de notícias
        When eu não preencho todos os campos para criação da notícia com "título" "Felipe Ret é preso"
        Then Eu vejo uma mensagem de erro
        And A notícia com título "Felipe Ret é preso" não é cadastrada no sistema.