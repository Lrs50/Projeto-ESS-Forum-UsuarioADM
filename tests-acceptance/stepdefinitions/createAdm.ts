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
    Given(/^Estou na pagina Create Admin User$/, async () => {
        browser.waitForAngular();
        await browser.get("http://localhost:4200/home/management/admin/create")
    })
    When(/^Eu preencho os campos Username name e password com "([^\"]*)" "([^\"]*)" e "([^\"]*)"$/, async (username,name,password) => {
        await browser.driver.sleep(1000); 
        await $("input[name='usernameBox']").sendKeys(<string> username);
        await $("input[name='nameBox']").sendKeys(<string> name);
        await $("input[name='passwordBox']").sendKeys(<string> password);
        await browser.driver.sleep(1000); 
    })
    When(/^Eu aperto o botão create$/, async () => {
        await browser.driver.sleep(1000);
        await element(by.buttonText("Create")).click();
    })

    Then(/^Estou na pagina Admin Management$/, async () => {
        await browser.driver.sleep(1000);
        const link = 'http://localhost:4200/home/management/admin' 
        await browser.get(link) 
        expect(await browser.getCurrentUrl()).to.equal(link) 
    })

    Then(/^Consigo ver o usuario adm com username "([^\"]*)"$/, async (username) => {
        await browser.driver.sleep(1000);
        var alladms : ElementArrayFinder = element.all(by.name('adminList'));
        var sameUsername_ = alladms.filter(elem => sameUsername(elem,username));
        await browser.driver.sleep(1000);
        await assertTamanhoEqual(sameUsername_,1);  
    })

})