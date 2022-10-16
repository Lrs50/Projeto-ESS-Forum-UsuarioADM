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
    Given(/^Eu estou logado como usuário administrador com username "([^\"]*)" e senha "([^\"]*)"$/, async (user, passw) => {
        await browser.get("http://localhost:4200/home/news");
        await browser.driver.sleep(1000);
        await expect(browser.getTitle()).to.eventually.equal('ReviReli');
        if(await element(by.id("login")).isPresent()){
            await element(by.id("login")).click();
            await browser.driver.sleep(1000);
            await $("input[name='UserSpace']").sendKeys(<string> user);
            await $("input[name='CpfBox']").sendKeys(<string> passw);
            await element(by.id("logButton")).click();
            await browser.driver.sleep(1000);
            expect (await element(by.id("profileEnter")).isPresent()).to.equal(true)
        }else{
            await element(by.id("profileEnter")).click();
            await browser.driver.sleep(1000);
            await element(by.id("logoutButton")).click();
            await browser.driver.sleep(1000);
            await element(by.id("login")).click();
            await browser.driver.sleep(1000);
            await $("input[name='UserSpace']").sendKeys(<string> user);
            await $("input[name='CpfBox']").sendKeys(<string> passw);
            await element(by.id("logButton")).click();
            await browser.driver.sleep(1000);
            expect (await element(by.id("profileEnter")).isPresent()).to.equal(true)
        }
    })
    
    Given(/^Estou na página de edição de perfil$/, async () => {
        await element(by.id("profileEnter")).click();
        await browser.driver.sleep(1000);
        await element(by.id("profileButton")).click();
        await browser.driver.sleep(1000);
        await element(by.id("editProfileButton")).click();
    });

    When(/^Eu modifico o meu campo de nome para "([^\"]*)"$/, async (name) => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click()
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.chord(Key.CONTROL, "a"));
        await element(by.className("ant-input ng-star-inserted")).sendKeys(<string> name);
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);
    });
    When(/^Confirmo a modificação$/, async () => {
        await browser.driver.sleep(1000);
        await element(by.id("saveButton")).click()
    });

    Then(/^O usuário administrador com nome "([^\"]*)" é modificado no sistema para ter o seu nome igual a "([^\"]*)"$/, async (oldName, newName) => {
        await browser.driver.sleep(1000);
        expect(await element(by.id("usernameBox")).getText()).not.to.equal(oldName);
        expect(await element(by.id("usernameBox")).getText()).to.equal(newName);
    });

    //Scenario 2
    When(/^Eu modifico o meu campo de avatar para "([^\"]*)"$/, async (avatar) => {
        await browser.driver.sleep(1000);
        await element(by.id("avatarButton")).click()
        await browser.driver.sleep(500);
        await $("input[name='inputAvatar']").sendKeys(Key.chord(Key.CONTROL, "a"));
        await $("input[name='inputAvatar']").sendKeys(<string> avatar);
        await element(by.buttonText("OK")).click();
    });

    Then(/^O usuário administrador tem seu perfil modificado no sistema para ter o seu avatar igual a "([^\"]*)"$/, async (newAvatar) => {
        await browser.driver.sleep(1000);
        var allImages: ElementArrayFinder = element.all(by.tagName("img"))
        var sameImage = allImages.filter(elem => elem.getAttribute('src').then(url => url == <string> newAvatar));
        await assertTamanhoEqual(sameImage, 2);
    });
})