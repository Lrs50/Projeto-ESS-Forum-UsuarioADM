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
    Given(/^Estou na página da noticia Filipe Ret é preso$/, async () => {
        //expect(await element(by.cssContainingText('.text-content', 'Filipe Ret é preso')).isPresent()).to.equal(true)
        //await element(by.cssContainingText('.text-content', 'Filipe Ret é preso')).click()
        browser.driver.sleep(10000);
        browser.waitForAngular();
        await browser.get("http://localhost:4200/home/news/IQm_4PNXUvmikE5fmso2y")
    
    })
    Given(/^Consigo ver o comentario "([^\"]*)" na noticia$/, async (comentario) => {
        browser.driver.sleep(10000);
        browser.waitForAngular();
        expect(await element(by.cssContainingText('.ant-card-body', String(comentario))).isPresent()).to.equal(true)
        //var allalunos  = element(by.cssContainingText('.ant-card-body', String(comentario)))
        //allalunos.
    })
    When(/^Eu tento remover o comentario "([^\"]*)"$/, async (comentario) => {
        browser.driver.sleep(10000);
        browser.waitForAngular();
        //await element(by.buttonText("Delete")).click()
        var allCommits : ElementArrayFinder = element.all(by.name('allComments'));
        var sameComment = allCommits.filter(elem => elem.element(by.name('content')).getText().then(text => text == comentario));
        await sameComment.map(elem => elem.element(by.id("deleteCommentary")).click())
    })

    When(/^Eu cancelo a remocao do comentairo "([^\"]*)"$/, async (comentario) => {
        await element(by.buttonText("Cancel")).click();
    })

    Then(/^Consigo ver o comentario "([^\"]*)"$/, async (comentario) => {
        var allCommits : ElementArrayFinder = element.all(by.name('allComments'));
        var sameComment = allCommits.filter(elem => elem.element(by.name('content')).getText().then(text => text == comentario));
        await assertTamanhoEqual(sameComment,1);
    })
    
    //scenario 2
    When(/^Eu confirmo a remocao do comentario "([^\"]*)"$/, async (comentario) => {
        await element(by.buttonText("OK")).click();
    })

    Then(/^Não consigo ver o comentario "([^\"]*)"$/, async (comentario) => {
        var allCommits : ElementArrayFinder = element.all(by.name('allComments'));
        var sameComment = allCommits.filter(elem => elem.element(by.name('content')).getText().then(text => text == comentario));
        await assertTamanhoEqual(sameComment,0);
    })
    
})