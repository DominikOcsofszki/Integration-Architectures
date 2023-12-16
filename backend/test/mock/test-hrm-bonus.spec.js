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
