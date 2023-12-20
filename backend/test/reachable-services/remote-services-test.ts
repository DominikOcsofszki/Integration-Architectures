import { expect } from "chai";
import {getItemsFromHRM} from "../../src/connector/hrm-connector";
import {getItemsCRX} from "../../src/connector/crx-connector";
import mongoose from "mongoose";
import {Salesman, SalesmanModel} from "../../src/model/Salesman";

const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';

describe("HRM employee test", () => {
    it("should return all employees", async () => {
        const allSalesmenUrl = "/api/v1/employee/search?unit=2";
        const salesmen = await getItemsFromHRM(`${baseUrl}${allSalesmenUrl}`);
        expect(salesmen.data[0].firstName).to.equal('John');
        expect(salesmen.data[4].lastName).to.equal('Tomato');
    })
})

describe('CRX companies test', () => {
    it('should get all companies from crx', async () => {
        const companies = await getItemsCRX("https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/?queryType=org:opencrx:kernel:account1:LegalEntity")
        expect(companies['@total']).to.equal("4");
        expect(companies.objects[0].name).to.equal("Telekom AG");
        expect(companies.objects[1].accountRating).to.equal(3);
    })
})

// describe('MongoDB salesmen test', () => {
//     before(async () => {
//         await mongoose.connect(`${process.env.DB_URL}`);
//     })
//     it('should return the stored salesmen with id 90124', async () => {
//         const mary = await SalesmanModel.findOne({ id: 90124 }) as Salesman;
//         expect(mary.id).to.equal(90124);
//         expect(mary.firstname).to.equal('Mary-Ann');
//     })
//     it('should return all salesmen', async () => {
//         const allSalesmen = await SalesmanModel.find() as Salesman[];
//         expect(allSalesmen.length).to.equal(5);
//     })
//     after(async () => {
//         await mongoose.disconnect();
//     })
// })