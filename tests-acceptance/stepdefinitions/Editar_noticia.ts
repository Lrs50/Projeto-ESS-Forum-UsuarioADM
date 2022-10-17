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
    Given("estou na pagina de gerenciamento de notícias.", async () => {
        await browser.driver.sleep(1000);
        await browser.waitForAngular();
        await browser.get("http://localhost:4200/home/management/news");
        await browser.driver.sleep(1000);
        expect((await browser.getCurrentUrl()).includes("http://localhost:4200/home/management/news"));
    });

    When(/^A notícia "([^\"]*)" está cadastrada no sistema.$/, async (noticia) => {
        await browser.driver.sleep(1000);
        var allnews: ElementArrayFinder = element.all(by.name("newslist"));
        var sametitle = allnews.filter((elem) => sameTitle(elem, noticia));
        expect(sametitle != undefined);
    });

    When(/^Entro na pagina de edicao de noticia da notícia "([^\"]*)".$/, async (noticia) => {
        await browser.driver.sleep(1000);
        var allnews: ElementArrayFinder = element.all(by.name("newslist"));
        var sametitle = allnews.filter((elem) => sameTitle(elem, noticia));
        await sametitle.map((elem) => elem.element(by.id("edit-button")).click());
        await browser.driver.sleep(1000);
        expect((await browser.getCurrentUrl()).includes("/home/management/news/edit"));
        await browser.driver.sleep(1000);
    });

    When(/^mudo o título para "([^\"]*)".$/, async (noticia) => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys(noticia, "className", "ant-input ng-star-inserted");
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);
    });

    When("mudo o título para vazio.", async () => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys(Key.BACK_SPACE, "className", "ant-input ng-star-inserted");
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);
    });

    When("eu tento salvar as edicoes", async () => {
        await browser.driver.sleep(1000);
        await element(by.id("save-button")).click();
        await browser.driver.sleep(1000);
    });

    Then("O sistema edita a notícia de título Djonga aparece em telão na Times Square para Djonga e o album O Dono do Lugar", async () => {
        await browser.driver.sleep(1000);
        expect(await (await element(by.css(".main-title-text-size")).getText()).includes("Djonga e o album O Dono do Lugar"));
    });

    Then("O sistema nao edita a notícia de título Djonga aparece em telão na Times Square para vazio", async () => {
        await browser.driver.sleep(1000);
        expect(await (await element(by.css(".main-title-text-size")).getText()).includes(""));
    });
});
