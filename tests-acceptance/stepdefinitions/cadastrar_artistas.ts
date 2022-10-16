import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

defineSupportCode(function ({ Given, When, Then }) {
    
    Given(/^Eu estou na area de "([^\"]*)"$/, async (page) => {
        await element(by.id("Artist Management")).click();
        await browser.driver.sleep(1000);
        await element(by.id(<string> page)).click();
        await browser.driver.sleep(1000);
        await expect(browser.getTitle()).to.eventually.equal('ReviReli');
    });

    Given(/^As informações nome, type e description estão preenchidas$/, async () => {
        await element(by.id("selectArtist")).click();
        await element(by.className("ant-select-item-option-content")).click();
    });
    
    When(/^Eu tento cadastrar o artista$/, async () => {
        await element(by.id("createArtist")).click();
    });

    Then(/^Consigo ver a página do novo artista$/, async () => {
        var url = browser.getCurrentUrl();
        expect((await url).includes('http://localhost:4200/home/artist/'));
    });

})