// import { expect } from "chai";
// import axios from "axios";
// import { getTokenHRM } from "../../src/connector/hrm-connector";
//
// const base = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/";
//
// describe("HRM bonus test", () => {
//     it("should make a successful GET request", () => {
//         try {
//             const token = await getTokenHRM();
//             const config = { headers: { Authorization: `Bearer ${token}` } };
//             const api_bonus = "api/v1/employee/1/bonussalary";
//
//             const response = await axios.get(`${base}${api_bonus}`);
//
//             expect(response.status).to.equal(200);
//             expect(response.data).to.be.an("object");
//             expect(response.data).to.have.property("id", 1);
//             expect(response.data).to.have.property("userId", 1);
//             expect(response.data).to.have.property("title");
//             expect(response.data).to.have.property("body");
//             done()
//         } catch (error) {
//             console.error("Error making GET request:", error);
//             throw error; // Rethrow the error to fail the test
//         }
//     });
// });
