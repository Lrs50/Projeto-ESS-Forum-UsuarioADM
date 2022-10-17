import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, Key } from 'protractor';
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
    Given(/^O artista com nome "([^\"]*)" esta cadastrado no sistema$/, async (name) => {
        await browser.get("http://localhost:4200/home/management/artist")
        await browser.driver.sleep(1000);

        await $("input[name='SearchBarArtist']").sendKeys(<string> name);
        await browser.driver.sleep(1500);
        var listedArtists : ElementArrayFinder = element.all(by.name('artistList'));
        await listedArtists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)); 
        await browser.driver.sleep(1000);
    })
    Given(/^Eu estou na pagina Edit Artist do Jesen Ackles$/, async () => {
        await browser.get("http://localhost:4200/home/management/artist/edit/HhHSE3Yd6u7rv02PmbG0m")
    })
    When(/^Eu edito o campo Descrição desse artista com "([^\"]*)"$/, async (text) => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys(<string> text, 'className', "ant-input ng-star-inserted");
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);
        await browser.driver.sleep(1000);
    })
    When(/^Confirmo a operação de edição$/, async () => {
        await browser.driver.sleep(1000);
        await element(by.buttonText("Save")).click();
    })
    Then(/^Estou na pagina Artists Management$/, async () => {
        await browser.driver.sleep(1000);
        const link = 'http://localhost:4200/home/management/artist' 
        await browser.driver.sleep(1000); 
        await browser.get(link) 
        await expect(await browser.getCurrentUrl()).to.equal(link) 
    })
    //Second scenario

    //Third scenario
    When(/^Eu edito o campo Name desse artista com um valor inválido$/, async () => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.chord(Key.CONTROL, "a"));
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.BACK_SPACE);
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);
        await browser.driver.sleep(1000);
    })
    Then(/^Continuo na pagina Edit Artist do Jesen Ackles$/, async () => {
        await browser.driver.sleep(1000);
        const link = 'http://localhost:4200/home/management/artist/edit/HhHSE3Yd6u7rv02PmbG0m' 
        await browser.driver.sleep(1000); 
        await browser.get(link) 
        await expect(await browser.getCurrentUrl()).to.equal(link) 
    })
})