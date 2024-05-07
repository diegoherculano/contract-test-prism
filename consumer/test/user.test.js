import { expect } from "chai";
import "dotenv/config";
import { getUser } from "../schemas/getUser.js";

describe("User", () => {
  const baseEndpoint = "/usuarios";

  it("Should Get User Successfully", async () => {
    const response = await fetch(process.env.BASEURL + baseEndpoint);
    expect(response.status).eq(200);
    const data = await response.json();

    const validSchema = getUser.validate(data);
    expect(validSchema.error).to.be.undefined;
  });
});
