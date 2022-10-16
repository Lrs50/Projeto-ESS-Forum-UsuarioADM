import { defineSupportCode } from 'cucumber';
import { browser, $, element, by, ElementArrayFinder, Key } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

async function clearAndSendKeys(keys: any, type: string, typeName: string){
    if (type == 'className'){
        await element(by.className(typeName)).sendKeys(Key.chord(Key.CONTROL, "a"));
        await element(by.className(typeName)).sendKeys(keys);
    } else if (type == 'inputName'){
        await $(`input[name='${typeName}']`).sendKeys(Key.chord(Key.CONTROL, "a"));
        await $(`input[name='${typeName}']`).sendKeys(keys);
    }
    await browser.driver.sleep(1000);
}

async function checkOldAndNewByID(id: string, oldCheck: string, newCheck: string){
    expect(await element(by.id(id)).getText()).not.to.equal(oldCheck);
    expect(await element(by.id(id)).getText()).to.equal(newCheck);
}

async function assertTamanhoEqual(set: any, n: number) {
    await set.then((elems: any[]) => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
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
            expect (await element(by.id("profileEnter")).isPresent()).to.equal(true);
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
            expect (await element(by.id("profileEnter")).isPresent()).to.equal(true);
        }
    });
    
    Given(/^Estou na página de edição de perfil com ID "([^\"]*)"$/, async (id) => {
        await element(by.id("profileEnter")).click();
        await browser.driver.sleep(500);
        await element(by.id("profileButton")).click();
        await browser.driver.sleep(500);
        await element(by.id("editProfileButton")).click();
        await expect(await browser.getCurrentUrl()).to.equal(`http://localhost:4200/home/user/${id}/edit`);
    });

    When(/^Eu modifico o meu campo de nome para "([^\"]*)"$/, async (name) => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys(<string> name, 'className', "ant-input ng-star-inserted");
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);
    });

    When(/^Confirmo a modificação$/, async () => {
        await browser.driver.sleep(1000);
        await element(by.id("saveButton")).click();
    });

    Then(/^O usuário administrador com nome "([^\"]*)" é modificado no sistema para ter o seu nome igual a "([^\"]*)"$/, async (oldName, newName) => {
        await browser.driver.sleep(1000);
        await checkOldAndNewByID("usernameBox", <string> oldName, <string> newName);
    });

    //Scenario 2
    When(/^Eu modifico o meu campo de about para "([^\"]*)"$/, async (about) => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys(<string> about, 'className', "ant-input ng-star-inserted");
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);
    });

    Then(/^O usuário administrador com about "([^\"]*)" é modificado no sistema para ter o seu about igual a "([^\"]*)"$/, async (oldAbout, newAbout) => {
        await browser.driver.sleep(1000);
        await checkOldAndNewByID("aboutBox", <string> oldAbout, <string> newAbout)
    });

    //Scenario 3
    When(/^Eu modifico o meu campo de avatar para "([^\"]*)"$/, async (avatar) => {
        await browser.driver.sleep(1000);
        await element(by.id("avatarButton")).click();
        await browser.driver.sleep(500);
        await clearAndSendKeys(<string> avatar, 'inputName', 'inputAvatar');
        await element(by.buttonText("OK")).click();
    });

    Then(/^O usuário administrador tem seu perfil modificado no sistema para ter o seu avatar igual a "([^\"]*)"$/, async (newAvatar) => {
        await browser.driver.sleep(1000);
        var allImages: ElementArrayFinder = element.all(by.tagName("img"));
        var sameImage = allImages.filter(elem => elem.getAttribute('src').then(url => url == <string> newAvatar));
        await assertTamanhoEqual(sameImage, 2);
    });

    //Scenario 4
    When(/^Eu modifico o meu campo de cover para "([^\"]*)"$/, async (cover) => {
        await browser.driver.sleep(1000);
        await element(by.id("coverButton")).click();
        await browser.driver.sleep(1000);
        await clearAndSendKeys(<string> cover, 'inputName', 'inputCover');
        await element(by.buttonText("OK")).click();
    });

    Then(/^O usuário administrador tem seu perfil modificado no sistema para ter o seu cover igual a "([^\"]*)"$/, async (newCover) => {
        await browser.driver.sleep(1000);
        var allImages: ElementArrayFinder = element.all(by.tagName("img"));
        var sameImage = allImages.filter(elem => elem.getAttribute('src').then(url => url == <string> newCover));
        await assertTamanhoEqual(sameImage, 1);
    });
})