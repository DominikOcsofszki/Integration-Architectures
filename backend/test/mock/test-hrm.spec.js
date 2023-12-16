// const sinon = require("sinon");
// const request = require("request");
// const chai = require("chai");
// const mocha = require("mocha");
// // const getTokken = require("../../src/connector/hrm-connector.ts");
// const getTokken = require("../../dist/connector/hrm-connector.js");
// const axios = require("axios");
//
// const should = chai.should();
// const expect = chai.expect;
//
// const base = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/";
//
// const token = getTokken.getTokenHRM();
// const responseObject = {
//     statusCode: 200,
//     headers: {
//         "content-type": "application/json",
//     },
// };
//
// const responseBody = {
//     status: "success",
//     data: [
//         {
//             firstName: "John",
//             middleName: "",
//             lastName: "Doe",
//             code: "91338",
//             employeeId: "85",
//             fullName: "John Doe",
//             status: null,
//             dob: null,
//             driversLicenseNumber: "",
//             licenseExpiryDate: null,
//             maritalStatus: null,
//             gender: null,
//             otherId: "",
//             nationality: null,
//             unit: "Sales",
//             jobTitle: null,
//             supervisor: null,
//         },
//         {
//             firstName: "Paul",
//             middleName: "",
//             lastName: "Kaye",
//             code: "90732",
//             employeeId: "31",
//             fullName: "Paul Kaye",
//             status: null,
//             dob: null,
//             driversLicenseNumber: "",
//             licenseExpiryDate: null,
//             maritalStatus: null,
//             gender: null,
//             otherId: "",
//             nationality: null,
//             unit: "Sales",
//             jobTitle: "Senior Salesman",
//             supervisor: null,
//         },
//         {
//             firstName: "Mary-Ann",
//             middleName: "",
//             lastName: "Sallinger",
//             code: "90124",
//             employeeId: "9",
//             fullName: "Mary-Ann Sallinger",
//             status: null,
//             dob: null,
//             driversLicenseNumber: "",
//             licenseExpiryDate: null,
//             maritalStatus: null,
//             gender: null,
//             otherId: "",
//             nationality: null,
//             unit: "Sales",
//             jobTitle: "Senior Salesman",
//             supervisor: [{ name: "Michael Moore", id: " 7" }],
//         },
//         {
//             firstName: "John",
//             middleName: "Steven",
//             lastName: "Smith",
//             code: "90123",
//             employeeId: "2",
//             fullName: "John Steven Smith",
//             status: null,
//             dob: "1982-11-15",
//             driversLicenseNumber: "",
//             licenseExpiryDate: null,
//             maritalStatus: null,
//             gender: null,
//             otherId: "",
//             nationality: null,
//             unit: "Sales",
//             jobTitle: "Senior Salesman",
//             supervisor: [{ name: "Michael Moore", id: " 7" }],
//         },
//         {
//             firstName: "Toni",
//             middleName: "",
//             lastName: "Tomato",
//             code: "91337",
//             employeeId: "84",
//             fullName: "Toni Tomato",
//             status: null,
//             dob: null,
//             driversLicenseNumber: "",
//             licenseExpiryDate: null,
//             maritalStatus: null,
//             gender: null,
//             otherId: "",
//             nationality: null,
//             unit: "Sales",
//             jobTitle: null,
//             supervisor: null,
//         },
//     ],
//     rels: [],
// };
//
// describe("when stubbed", () => {
//     beforeEach(() => {
//         this.get = sinon.stub(request, "get");
//     });
//
//     afterEach(() => {
//         request.get.restore();
//     });
//
//     //"https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2"
//     describe("GET /api/v1/employee", () => {
//         it("should return all employee", (done) => {
//             this.get.yields(null, responseObject, JSON.stringify(responseBody));
//
//             request.get(`${base}/api/v1/employee`, (err, res, body) => {
//                 // there should be a 200 status code
//                 res.statusCode.should.eql(200);
//                 // the response should be JSON
//                 res.headers["content-type"].should.contain("application/json");
//                 // parse response body
//                 body = JSON.parse(body);
//                 // the JSON response body should have a
//                 // key-value pair of {"status": "success"}
//                 body.status.should.eql("success");
//                 // the JSON response body should have a
//                 // key-value pair of {"data": [3 movie objects]}
//                 body.data.length.should.eql(5);
//
//                 // the first object should have the right value for name
//                 body.data[0].firstName.should.eql("John");
//                 done();
//             });
//         });
//     });
// });
//
// //"https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search?unit=2"
// describe("GET /api/v1/employee", () => {
//     // beforeAll(() => )
//     it("should return all employee",  (done) => {
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const fullUrl = `${base}/api/v1/employee`;
//         // const itemsReturnedAsJson = await axios.get(fullUrl, config);
//         // const itemsReturnedAsJson = await axios.get(fullUrl, config);
//
//         // this.get.yields(null, responseObject, JSON.stringify(responseBody));
//         //
//         // request.get(`${base}/api/v1/employee`, (err, res, body) => {
//             // there should be a 200 status code
//
//           axios.get(fullUrl, config), (err, res, body) => {
//
//             res.statusCode.should,eventually.eql(200);
//             // the response should be JSON
//             res.headers["content-type"].should.contain("application/json");
//             // parse response body
//             body = JSON.parse(body);
//             // the JSON response body should have a
//             // key-value pair of {"status": "success"}
//             body.status.should.eql("success");
//             // the JSON response body should have a
//             // key-value pair of {"data": [3 movie objects]}
//             body.data.length.should.eql(5);
//
//             // the first object should have the right value for name
//             body.data[0].firstName.should.eql("John");
//             done();
//         };
//     });
// });
// // });
