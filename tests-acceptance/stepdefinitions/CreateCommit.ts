import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));

var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);


defineSupportCode(function ({ Given, When, Then }) {
    When(/^Eu tento criar o comentario "([^\"]*)"$/, async (comentario) => {

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