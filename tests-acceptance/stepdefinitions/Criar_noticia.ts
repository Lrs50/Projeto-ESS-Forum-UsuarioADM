import { defineSupportCode } from "cucumber";
import { browser, element, by, Key, $ } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
var { setDefaultTimeout } = require("cucumber");

setDefaultTimeout(60 * 1000);

async function clearAndSendKeys(keys: any, type: string, typeName: string) {
    await element(by.className(typeName)).sendKeys(Key.chord(Key.CONTROL, "a"));
    await element(by.className(typeName)).sendKeys(keys);

    await browser.driver.sleep(1000);
}

defineSupportCode(function ({ Given, When, Then }) {
    Given("Eu estou na pagina de criação de noticias", async () => {
        await browser.waitForAngular();
        await browser.get("http://localhost:4200/home/management/news/create");
        await browser.driver.sleep(1000);
        expect((await browser.getCurrentUrl()).includes("http://localhost:4200/home/management/news/create"));
    });

    When("Eu preencho os campos necessários para a criação da noticia", async () => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys("Djonga aparece em telão na Times Square", "className", "ant-input ng-star-inserted");

        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys("Descricao", "className", "ant-input ng-star-inserted");
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);

        await element(by.id("text-markdown")).sendKeys("Markdown");
        await browser.driver.sleep(1000);
    });

    When("Eu nao preencho os campos necessários para a criação da noticia", async () => {
        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys("Djonga aparece em telão na Times Square", "className", "ant-input ng-star-inserted");

        await browser.driver.sleep(1000);
        await element(by.className("ant-typography-edit ng-star-inserted")).click();
        await clearAndSendKeys("Descricao", "className", "ant-input ng-star-inserted");
        await element(by.className("ant-input ng-star-inserted")).sendKeys(Key.ENTER);
    });

    When("Eu tento criar uma noticia", async () => {
        await browser.driver.sleep(1000);
        await element(by.id("create-button")).click();
        await browser.driver.sleep(1000);
    });

    Then("A notícia com título Djonga aparece em telão na Times Square está cadastrada no sistema.", async () => {
        expect(await (await element(by.css(".main-title-text-size")).getText()).includes("Djonga aparece em telão na Times Square"));
    });

    Then("A notícia com título Djonga aparece em telão na Times Square nao está cadastrada no sistema.", async () => {
        expect((await browser.getCurrentUrl()).includes("http://localhost:4200/home/management/news/create"));
    });
});
