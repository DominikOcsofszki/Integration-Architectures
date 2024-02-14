import { updateBonus } from '../../src/service/sheet-service';
import { BonusComputationSheet, SocialAttribute } from '../../src/model/BonusComputationSheet'; 
import { mock, instance, when } from 'ts-mockito';
import { expect } from "chai";


describe('updateBonus', () => {
  it('check calc/updating BonusComputationSheet', () => {
    const sheetMock: BonusComputationSheet = mock(BonusComputationSheet);

    const socialAttribute1: SocialAttribute = {
        targetValue: 0, actualValue: 3, bonus: 0,
        socialAttributeName: ''
    };
    const socialAttribute2: SocialAttribute = {
        targetValue: 2, actualValue: 0, bonus: 0,
        socialAttributeName: ''
    };
    const socialAttribute3: SocialAttribute = {
        targetValue: 1, actualValue: 3, bonus: 0,
        socialAttributeName: ''
    };
    const socialAttribute4: SocialAttribute = {
        targetValue: 1, actualValue: 1, bonus: 0,
        socialAttributeName: ''
    };
    const socialAttribute5: SocialAttribute = {
        targetValue: 2, actualValue: 0, bonus: 0,
        socialAttributeName: ''
    };const socialAttribute6: SocialAttribute = {
        targetValue: 3, actualValue: 0, bonus: 0,
        socialAttributeName: ''
    };
    const sheet: BonusComputationSheet = {
        socialPerformanceEvaluation: {
            socialAttributes: [socialAttribute1, socialAttribute2,socialAttribute3,socialAttribute4,socialAttribute5,socialAttribute6],
            bonussum: 0,
        },
        orderEvaluation: {
            bonussum: 0,
            orders: []
        },
        totalBonus: 0,
        salesmanId: 0,
        yearOfEvaluation: 0,
        status: 'incomplete',
        declined: false
    };
    when(sheetMock.socialPerformanceEvaluation).thenReturn(sheet.socialPerformanceEvaluation);
    when(sheetMock.orderEvaluation).thenReturn(sheet.orderEvaluation);

    const updatedSheet = updateBonus(instance(sheetMock));

    expect(updatedSheet.socialPerformanceEvaluation.socialAttributes[0].bonus).to.equal(150); 
    expect(updatedSheet.socialPerformanceEvaluation.socialAttributes[1].bonus).to.equal(10);
    expect(updatedSheet.socialPerformanceEvaluation.socialAttributes[2].bonus).to.equal(125);
    expect(updatedSheet.socialPerformanceEvaluation.socialAttributes[3].bonus).to.equal(50);
    expect(updatedSheet.socialPerformanceEvaluation.socialAttributes[4].bonus).to.equal(10);
    expect(updatedSheet.socialPerformanceEvaluation.socialAttributes[5].bonus).to.equal(0);
    expect(updatedSheet.socialPerformanceEvaluation.bonussum).to.equal(345); 
    expect(updatedSheet.totalBonus).to.equal(345); 
  });
});
