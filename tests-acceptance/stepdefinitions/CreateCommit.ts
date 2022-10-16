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
    When(/^Eu tento criar o comentario "([^\"]*)"$/, async (comentario) => {
        //await element(by.buttonText("Delete")).click()
        //var allCommits : ElementArrayFinder = element.all(by.name('allComments'));
        //var sameComment = allCommits.filter(elem => elem.element(by.name('content')).getText().then(text => text == comentario));
        //await browser.driver.sleep(1000);
        //await sameComment.map(elem => elem.element(by.id("deleteCommentary")).click())
        await browser.driver.sleep(1000);
        await $("textarea[name='commitArea']").sendKeys(<string> comentario);
        await element(by.id("addCommentB")).click();
    })

    When(/^Eu cancelo a criacao do comentairo "([^\"]*)"$/, async (comentario) => {
        await browser.driver.sleep(1000);
        await element(by.buttonText("Cancel")).click();
    })

    When(/^Eu confirmo a criacao do comentairo "([^\"]*)"$/, async (comentario) => {
        await browser.driver.sleep(1000);
        await element(by.buttonText("OK")).click();
    })
    
})