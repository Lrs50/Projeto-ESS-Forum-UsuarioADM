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
    Given(/^Eu estou logado como usuário mod "([^\"]*)" com senha "([^\"]*)"$/, async (user,passw) => {
        await browser.get("http://localhost:4200/home/news");
        await expect(browser.getTitle()).to.eventually.equal('ReviReli');
        if(await element(by.id("login")).isPresent()){
            await element(by.id("login")).click();
            await $("input[name='UserSpace']").sendKeys(<string> user);
            await $("input[name='CpfBox']").sendKeys(<string> passw);
            await element(by.id("logButton")).click();
            expect (await element(by.id("profileEnter")).isPresent()).to.equal(true)
        }else{
            await element(by.id("profileEnter")).click();
            await element(by.id("logoutButton")).click();
            await element(by.id("login")).click();
            await $("input[name='UserSpace']").sendKeys(<string> user);
            await $("input[name='CpfBox']").sendKeys(<string> passw);
            await element(by.id("logButton")).click();
            expect (await element(by.id("profileEnter")).isPresent()).to.equal(true)
        }

    })
    
})