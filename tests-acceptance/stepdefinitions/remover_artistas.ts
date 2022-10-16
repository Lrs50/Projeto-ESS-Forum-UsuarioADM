import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

let sameId = ((elem, id) => elem.element(by.name('cpflist')).getText().then(text => text == id));

defineSupportCode(function ({ Given, When, Then }) {
    
    Given(/^Eu estou na pagina "([^\"]*)"$/, async (page) => {
        await element(by.id(<string> page)).click();
        await browser.driver.sleep(1000);
        await expect(browser.getTitle()).to.eventually.equal('ReviReli');
    });

    Given(/^O artista "([^\"]*)" com id "([^\"]*)" está cadastrado no sistema$/, async (user, id) => {
        await $("input[name='SearchBarArtist']").sendKeys(<string> id);
        await browser.driver.sleep(1500);
        var listedArtists : ElementArrayFinder = element.all(by.name('artistList'));
        await listedArtists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)); 
    });
    
    When(/^Eu tento remover o artista "([^\"]*)" com id "([^\"]*)"$/, async (user, id) => {
        var listedArtists : ElementArrayFinder = element.all(by.name('artistList'));
        await listedArtists.map(elem => elem.element(by.name('deleteArtist')).click())
        await element(by.buttonText("OK")).click();
    });

    When(/^Eu cancelo a remoção do artista "([^\"]*)" com id "([^\"]*)"$/, async (user, id) => {
        await browser.driver.sleep(1000);
        var listedArtists : ElementArrayFinder = element.all(by.name('artistList'));
        await listedArtists.map(elem => elem.element(by.name('deleteArtist')).click());
        await element(by.buttonText("Cancel")).click();
    });

    Then(/^Consigo ver o artista "([^\"]*)" com id "([^\"]*)"$/, async (user, id) => {
        var listedArtists : ElementArrayFinder = element.all(by.name('artistList'));
        await listedArtists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1)); 
    });

    Then(/^Nao consigo ver o artista "([^\"]*)" com id "([^\"]*)"$/, async (user, id) => {
        var listedArtists : ElementArrayFinder = element.all(by.name('artistList'));
        await listedArtists.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0)); 
    });
    

})