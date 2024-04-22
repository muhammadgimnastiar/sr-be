import { createDatabaseConnection } from "./db.js";

describe("Database Connection", () => {
  it("should successfully connect to the database", async () => {
    const connection = await createDatabaseConnection();
    await connection.end();
    expect(true).toBe(true);
  });
});
