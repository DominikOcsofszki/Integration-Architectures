import { expect } from "chai";
import axios from "axios";

describe("Axios Test", () => {
  it("should make a successful GET request", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");

    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property("id", 1);
    expect(response.data).to.have.property("userId", 1);
    expect(response.data).to.have.property("title");
    expect(response.data).to.have.property("body");
  });
});
