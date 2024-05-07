import "dotenv/config";
import fs from "fs/promises";
import fetch from "node-fetch";

const swaggerUrl = process.env.SWAGGERURL;
const swaggerFile = "swagger.json";

async function downloadSwagger() {
  try {
    try {
      await fs.access(swaggerFile);
      console.log(`The file ${swaggerFile} already exists. Deleting…`);
      await fs.unlink(swaggerFile);
    } catch (error) {}

    const response = await fetch(swaggerUrl);
    if (!response.ok) {
      throw new Error(
        `Error while downloading the Swagger: ${response.statusText}`
      );
    }

    const json = await response.json();
    await fs.writeFile(swaggerFile, JSON.stringify(json, null, 2));
    console.log(`Swagger saved ${swaggerFile}`);
  } catch (error) {
    console.error(`Error while downloading the Swagger: ${error.message}`);
  }
}

downloadSwagger();
