// const sinon = require("sinon");
// const axios = require("axios");
// const chai = require("chai");
//
// const should = chai.should();
//
// const base = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/";
//
// const responseObject = {
//     status: 200,
//     headers: {
//         "content-type": "application/json",
//     },
// };
//
// const responseBody = {
//     status: "success",
//     data: [
//         {
//             year: "2012",
//             value: "1234",
//         },
//     ],
//     rels: [],
// };
//
// describe("when stubbed", () => {
//     let getStub;
//
//     beforeEach(() => {
//         getStub = sinon.stub(axios, "get");
//     });
//
//     afterEach(() => {
//         getStub.restore();
//     });
//
//     describe("GET api/v1/employee/1/bonussalary", () => {
//         it("should return bonus of employee 1", (done) => {
//             getStub.resolves({ data: responseObject });
//
//             request
//                 .get(`${base}api/v1/employee/1/bonussalary`)
//                 .then((res) => {
//                     // res.status.should.eql(200);
//                     res.headers["content-type"].should.contain("application/json");
//                     const body = res.data;
//                     body.status.should.eql("success");
//                     body.data.length.should.eql(1);
//                     body.data[0].year.should.eql("2012");
//                     body.data[0].value.should.eql("1234");
//                     done();
//                 })
//                 .catch((err) => done(err));
//         });
//     });
// });
