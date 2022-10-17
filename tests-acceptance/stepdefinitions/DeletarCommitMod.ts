import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

async function login(user,passw){
    await element(by.id("login")).click();
    await browser.driver.sleep(1000);
    await preencher('UserSpace',user)
    await preencher('CpfBox', passw)
    await element(by.id("logButton")).click();
    await browser.driver.sleep(1000);
}
async function preencher(type, content) {
    if (type == 'UserSpace'){
        await $("input[name='UserSpace']").sendKeys(<string> content);
    }else
        if(type == 'CpfBox'){
            await $("input[name='CpfBox']").sendKeys(<string> content);
        }
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou logado como usuário mod "([^\"]*)" com senha "([^\"]*)"$/, async (user,passw) => {
        await browser.get("http://localhost:4200/home/news");
        await browser.driver.sleep(1000);
        await expect(browser.getTitle()).to.eventually.equal('ReviReli');
        if(await element(by.id("login")).isPresent()){
            await login(user,passw)
            expect (await element(by.id("profileEnter")).isPresent()).to.equal(true)
        }else{
            await element(by.id("profileEnter")).click();
            await browser.driver.sleep(1000);
            await element(by.id("logoutButton")).click();
            await browser.driver.sleep(1000);
            await login(user,passw)
            expect (await element(by.id("profileEnter")).isPresent()).to.equal(true)
        }

    })
    
})