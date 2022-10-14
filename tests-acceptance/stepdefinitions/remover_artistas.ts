import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

let sameId = ((elem, id) => elem.element(by.name('cpflist')).getText().then(text => text == id));
let sameUsername = ((elem, user) => elem.element(by.name('nomelist')).getText().then(text => text == user));

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
    
    Given(/^Eu estou na pagina "([^\"]*)"$/, async (page) => {
        await element(by.id(<string> page)).click();
        browser.driver.sleep(10000);
        browser.waitForAngular();
        await expect(browser.getTitle()).to.eventually.equal('ReviReli');
    });

    Given(/^O artista "([^\"]*)" com id "([^\"]*)" está cadastrado no sistema$/, async (user, id) => {
        var allalunos : ElementArrayFinder = element.all(by.name('artistList'));
        var samecpfsandname = allalunos.filter(elem => pAND(sameId(elem,id),sameUsername(elem,user)));
        await assertTamanhoEqual(samecpfsandname,1);   
    });
    
    When(/^Eu tento remover o artista "([^\"]*)" com id "([^\"]*)"$/, async (user, id) => {
        browser.driver.sleep(1000);
        browser.waitForAngular();
        var allalunos : ElementArrayFinder = element.all(by.name('artistList'));
        var samecpfsandname = allalunos.filter(elem => pAND(sameId(elem,id),sameUsername(elem,user)))
        await samecpfsandname.map(elem => elem.element(by.name('delete')).click())
        await element(by.buttonText("OK")).click();
    });

    Then(/^Nao consigo ver o artista "([^\"]*)" com id "([^\"]*)"$/, async (user, id) => {
        var allalunos : ElementArrayFinder = element.all(by.name('artistList'));
        var samecpfsandname = allalunos.filter(elem => pAND(sameId(elem,id),sameUsername(elem,user)));
        await assertTamanhoEqual(samecpfsandname,0);  
    });
    

})