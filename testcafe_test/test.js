import { Selector, t } from "testcafe";

fixture `Getting Started - test on testcafe example page`	
    .page `https://devexpress.github.io/testcafe/example`;

test('Test example 1', async t => {
    await t
        .typeText('#developer-name', 'John Smith')
        .click('#remote-testing')
        .click('#reusing-js-code')
        .click('#background-parallel-testing')
        .click('#continuous-integration-embedding')
        .click('#submit-button')
        .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});



fixture `Second test - on mediktor main page`
    .page `https://my.mediktor.com/it?lang=it-IT`;

test('Click test on symptom checker', async t => {
    await t 
        .click(Selector('.q-btn__content').withText('Valuta i sintomi'))
        .expect(Selector('.q-btn__content').withText('Valuta i sintomi').exists).ok();
});

fixture `Test a symptom flow`
    .page `https://my.mediktor.com/it?lang=it-IT`;

test('Write a symptom and begin the questionnaire', async t => {
    await t
        .typeText(".mdk-checker-reason-input__control", "dolore all'addome")
        .click(Selector('button[data-qa-ta="startInterrogatoryBtn"]'))
        
    const currentUrl = await t.eval(() => window.location.href);

    
    await t.navigateTo(currentUrl);

    const termsPoput = Selector('.mdk-terms-conditions__content');
   
    await t
        .expect(termsPoput.exists).ok()
        .expect(termsPoput.visible).ok()
        //.wait(4000)
    
        .scrollIntoView(Selector('span.block').withText('Continua'))
        .wait(1000)

        const checkBoxes = Selector('.q-checkbox__inner'  );

        const privacy = checkBoxes.nth(0);
        const legal = checkBoxes.nth(1);

    await t
        .click(privacy)
        .click(legal)
        .click(Selector('span.block').withText('Continua'));




    const maleButton = Selector('.mdk-checker-question-multi-item')
                   .withText('Male');

    const femaleButton = Selector('.mdk-checker-question-multi-item')
                     .withText('Female');

    const transgenderButton = Selector('.mdk-checker-question-multi-item')
                        .withText('Transgender');

    const genderSpecification = Selector('.mdk-checker-statement-text__text-symptom').withText('Donna transgender')
                        .parent('tr')
                        .find('input[type="radio"]');


    await t.click(transgenderButton)
            .click(genderSpecification)
            .expect(genderSpecification.checked).ok()
        

    
});


