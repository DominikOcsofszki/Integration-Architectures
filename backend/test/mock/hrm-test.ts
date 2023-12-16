import { expect } from "chai";
import axios from "axios";
import { getTokenHRM } from "../../src/connector/hrm-connector";

const base = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/";

// const token = getTokenHRM();
// const token = "653ad4975aa2c2320fe6df4bf7085c81da9a501a";

describe("HRM bonus test", () => {
    it("should make a successful GET request", () => {
        getTokenHRM().then((token) => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const api_bonus = "api/v1/employee/1/bonussalary";

            axios.get(`${base}${api_bonus}`, config).then((response) => {
                console.log(response);
                expect(response.status).to.equal(200);
                expect(response.data).to.be.an("object");
                expect(response.data).to.have.property("id", 1);
                expect(response.data).to.have.property("userId", 1);
                expect(response.data).to.have.property("title");
                expect(response.data).to.have.property("body");
            });
        });
    });
});

//
// describe("GET api/v1/employee/1/bonussalary", () => {
//     it("should return bonus of employee 1", async (done) => {
//         // this.get.yields(null, responseObject, JSON.stringify(responseBody));
//
//         const token = await getTokenHRM();
// const config = { headers: { Authorization: `Bearer ${token}` } };
//        const response =  await axios.get(
//             `${base}api/v1/employee/1/bonussalary`,
//             co
//         );
//
//         expect(response.status).to.equal(200);
//         expect(response.data).to.be.an("object");
//         expect(response.data).to.have.property("id", 1);
//         expect(response.data).to.have.property("userId", 1);
//         expect(response.data).to.have.property("title");
//         expect(response.data).to.have.property("body");
//             // res.statusCode.should.eql(200);
//             // res.headers["content-type"].should.contain("application/json");
//             // body = JSON.parse(body);
//             // body.status.should.eql("success");
//             // body.data.length.should.eql(1);
//             // body.data[0].year.should.eql("2012");
//             // body.data[0].valud.should.eql("1234");
//             done();
//         });
//     });
// });

//
// const sinon = require("sinon");
// // const request = require("request");
// const request = require("axios");
// const chai = require("chai");
// const mocha = require("mocha");
//
// const should = chai.should();
// var expect = chai.expect;
//
// const base = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/";
//
// const responseObject = {
//   statusCode: 200,
//   headers: {
//     "content-type": "application/json",
//   },
// };
//
// const responseBody = {
//   "data": [
//     {
//       "year": "2012",
//       "value": "1234"
//     }
//   ],
//   "rels": []
// }
// // https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/1/bonussalary
// describe("when stubbed", () => {
//   beforeEach(() => {
//     this.get = sinon.stub(request, "get");
//   });
//
//   afterEach(() => {
//     request.get.restore();
//   });
//
//   describe("GET api/v1/employee/1/bonussalary", () => {
//
//     it("should return bonus of employee 1", (done) => {
//       this.get.yields(null, responseObject, JSON.stringify(responseBody));
//
//       request.get(`${base}api/v1/employee/1/bonussalary`, (err, res, body) => {
//
//         res.statusCode.should.eql(200);
//         res.headers["content-type"].should.contain("application/json");
//         body = JSON.parse(body);
//         body.status.should.eql("success");
//         body.data.length.should.eql(1);
//         body.data[0].year.should.eql("2012");
//         body.data[0].valud.should.eql("1234");
//         done();
//       })})})})
//
