
describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
    });

    afterEach('Конец теста', function () {
        cy.get('#messageHeader').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });

    it('Верный логин и верный пароль', function () { //Позитивный кейс
        cy.get('#mail').type('login');
        cy.get('#pass').type('password');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Авторизация прошла успешно');
    })

    it('Восстановление пароля', function () { //Проверка Забыли пароль?
        cy.get('#forgotEmailButton').click();

        cy.get('#mailForgot').type('login');
        cy.get('#restoreEmailButton').click();

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
    })

    it('Верный логин и неверный пароль', function () { //Негативный кейс - пароль
        cy.get('#mail').type('ogin');
        cy.get('#pass').type('NevernyParol');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })

    it('Неверный логин и верный пароль', function () { //Негативный кейс - логин
        cy.get('#mail').type('neverny_login@email.ru');
        cy.get('#pass').type('password');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })

    it('Логин без @, ошибка валидации', function () { //Ошибка валидации
        cy.get('#mail').type('user_email.ru');
        cy.get('#pass').type('password');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
    })

    it('Приведение к строчным буквам в логине, верный пароль', function () { //Приведение к строчным
        cy.get('#mail').type('login');
        cy.get('#pass').type('password');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Авторизация прошла успешно');
    })
})