import { expect } from "chai";
import "dotenv/config";
import Joi from "joi";
import { getUserFromId, getUsers } from "../schemas/User.js";

describe("User", () => {
  const baseEndpoint = "/usuarios";

  it("Should Get User", async () => {
    const response = await fetch(process.env.BASEURL + baseEndpoint);
    expect(response.status).eq(200);
    const data = await response.json();

    const validSchema = getUsers.validate(data);
    expect(validSchema.error).to.be.undefined;
  });

  it("Should Get User from Id", async () => {
    const response = await fetch(process.env.BASEURL + baseEndpoint + "/5");
    expect(response.status).eq(200);
    const data = await response.json();

    const validSchema = getUserFromId.validate(data);
    expect(validSchema.error).to.be.undefined;
  });

  it("Should create User", async () => {
    const response = await fetch(process.env.BASEURL + baseEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "test",
        email: "test",
        password: "test",
        administrador: "false",
      }),
    });
    expect(response.status).eq(201);
    const data = await response.json();

    const schema = Joi.object({
      message: Joi.string().required(),
      _id: Joi.string().required(),
    });

    const validSchema = schema.validate(data);
    expect(validSchema.error).to.be.undefined;
  });

  it("Should error when create User without email", async () => {
    const response = await fetch(process.env.BASEURL + baseEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "test",
        password: "test",
        administrador: "false",
      }),
    });
    expect(response.status).eq(400);
  });
});
