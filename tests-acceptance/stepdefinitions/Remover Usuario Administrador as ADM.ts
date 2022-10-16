import { defineSupportCode } from 'cucumber';
import { browser, $, element, by, ElementArrayFinder, Key } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

let sameId = ((elem, id) => elem.element(by.name('cpflist')).getText().then(text => text == id));
let sameUsername = ((elem, user) => elem.element(by.name('nomelist')).getText().then(text => text == user));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

defineSupportCode(function ({ Given, When, Then }) {
    //Scenario 1
    When(/^Eu aperto o botão "([^\"]*)"$/, async (name) => {
        await element(by.id("deleteButton")).click()
    });

    When(/^Eu aperto "([^\"]*)"$/, async (cancel) => {
        await browser.driver.sleep(500);
        await element(by.buttonText(<string> cancel)).click()
    });

    Then(/^Permaneço na página de edição de perfil com ID "([^\"]*)"$/, async(id) => {
        await browser.driver.sleep(500);
        await expect(await browser.getCurrentUrl()).to.equal(`http://localhost:4200/home/user/${id}/edit`)
    });

    //Scenario 2
    When(/^Eu confirmo apertando "([^\"]*)"$/, async (ok) => {
        await browser.driver.sleep(500);
        await element(by.buttonText(<string> ok)).click()
    });

    Then(/^Sou retornado à página "([^\"]*)" des-logado$/, async(page) => {
        await browser.driver.sleep(500);
        await expect(await browser.getCurrentUrl()).to.equal(`http://localhost:4200/${page}`)
    });

    Then(/^O usuário administrador com nome "([^\"]*)" e senha "([^\"]*)" é removido do sistema$/, async (user, passw) => {
        await browser.get("http://localhost:4200/home/news");
        await expect(browser.getTitle()).to.eventually.equal('ReviReli');
        await element(by.id("login")).click();
        await $("input[name='UserSpace']").sendKeys(<string> user);
        await $("input[name='CpfBox']").sendKeys(<string> passw);
        await element(by.id("logButton")).click();
        expect (await element(by.id("profileEnter")).isPresent()).to.equal(false)
    });
})