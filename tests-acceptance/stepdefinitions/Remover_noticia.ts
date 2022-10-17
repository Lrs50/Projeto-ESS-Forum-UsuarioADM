import { defineSupportCode } from "cucumber";
import { browser, element, by, Key, $, ElementArrayFinder } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

async function clearAndSendKeys(keys: any, type: string, typeName: string) {
    await element(by.className(typeName)).sendKeys(Key.chord(Key.CONTROL, "a"));
    await element(by.className(typeName)).sendKeys(keys);

    await browser.driver.sleep(1000);
}

let sameTitle = (elem, id) =>
    elem
        .element(by.name("newstitle"))
        .getText()
        .then((text) => text == id);

defineSupportCode(function ({ Given, When, Then }) {
    Given("estou na view de gerenciamento de notícias.", async () => {
        await browser.driver.sleep(1000);
        await browser.waitForAngular();
        await browser.get("http://localhost:4200/home/management/news");
        await browser.driver.sleep(1000);
        expect((await browser.getCurrentUrl()).includes("http://localhost:4200/home/management/news"));
    });

    When(/^A notícia a ser removida "([^\"]*)" está cadastrada no sistema.$/, async (noticia) => {
        await browser.driver.sleep(1000);
        var allnews: ElementArrayFinder = element.all(by.name("newslist"));
        var sametitle = allnews.filter((elem) => sameTitle(elem, noticia));
        expect(sametitle != undefined);
    });

    When(/^Removo a noticia "([^\"]*)".$/, async (noticia) => {
        await browser.driver.sleep(1000);
        var allnews: ElementArrayFinder = element.all(by.name("newslist"));
        var sametitle = allnews.filter((elem) => sameTitle(elem, noticia));
        await sametitle.map((elem) => elem.element(by.id("delete-button")).click());
        await browser.driver.sleep(1000);
        await element(by.buttonText("OK")).click();
        await browser.driver.sleep(1000);
    });

    When(/^O sistema remove a noticia "([^\"]*)".$/, async (noticia) => {
        await browser.driver.sleep(1000);
        var allnews: ElementArrayFinder = element.all(by.name("newslist"));
        var sametitle = allnews.filter((elem) => sameTitle(elem, noticia));
        expect(sametitle);
    });
});
