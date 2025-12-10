import { setupTestServer } from "./setupTestServer";

describe("API boots correctly", () => {
  let server: Awaited<ReturnType<typeof setupTestServer>>;

  beforeAll(async () => {
    server = await setupTestServer();
  });

  afterAll(async () => {
    await server.close();
  });

  it("responds on /docs", async () => {
    const res = await server.app.inject({
      method: "GET",
      url: "/docs",
    });

    expect(res.statusCode).toBe(200);
  });
});
