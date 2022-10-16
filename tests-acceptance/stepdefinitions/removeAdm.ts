import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

let sameUsername = ((elem, user) => elem.element(by.name('usernameList')).getText().then(text => text == user));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function criarAluno(name, cpf) {
    await $("input[name='namebox']").sendKeys(<string> name);
    await $("input[name='cpfbox']").sendKeys(<string> cpf);
    await element(by.buttonText('Adicionar')).click();
}


async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}



defineSupportCode(function ({ Given, When, Then }) {
    //given already implemented
    //First scenario
    Given(/^Eu estou na pagina Admin Management$/, async () => {
        await browser.get("http://localhost:4200/home/management/admin")
        await browser.driver.sleep(1000);
    })
    Given(/^O adm com username "([^\"]*)" está cadastrado no sistema$/, async (username) => {
        await browser.driver.sleep(1000);
        var alladms : ElementArrayFinder = element.all(by.name('adminList'));
        var sameUsername_ = alladms.filter(elem => sameUsername(elem,username));
        await assertTamanhoEqual(sameUsername_,1);  
    })
    When(/^Eu tento remover o usuário com username "([^\"]*)"$/, async (username) => {
        await browser.driver.sleep(1000);
        var alladms : ElementArrayFinder = element.all(by.name('adminList'));
        var sameUsername_ = alladms.filter(elem => sameUsername(elem,username));
        await sameUsername_.map(elem => elem.element(by.id('delete2')).click())
        await browser.driver.sleep(1000);
    })

    When(/^Eu cancelo a operação$/, async () => {
        await element(by.buttonText("Cancel")).click();
    })

    Then(/^Consigo ver o usuário com username "([^\"]*)"$/, async (username) => {
        await browser.driver.sleep(1000);
        var alladms : ElementArrayFinder = element.all(by.name('adminList'));
        var sameUsername_ = alladms.filter(elem => sameUsername(elem,username));
        await assertTamanhoEqual(sameUsername_,1);  
    })

    //second scenario
    When(/^Eu confirmo a operação$/, async () => {
        await element(by.buttonText("OK")).click();
    })
    Then(/^Não consigo ver o usuário com username "([^\"]*)"$/, async (username) => {
        await browser.driver.sleep(1000);
        var alladms : ElementArrayFinder = element.all(by.name('adminList'));
        var sameUsername_ = alladms.filter(elem => sameUsername(elem,username));
        await assertTamanhoEqual(sameUsername_,0);  
    })

})