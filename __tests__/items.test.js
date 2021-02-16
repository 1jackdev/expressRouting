process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let popsicle = { name: "popsicle", price: "1.45" };

beforeEach(() => {
  items.push(popsicle);
});

afterEach(() => {
  items.length = 0;
});

// base GET request
describe("GET /items", () => {
  test("Gets the list of items", async function () {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual([{ name: "popsicle", price: "1.45" }]);
  });
});

// GET a specific item
describe("GET /items:name", () => {
  test("Gets the item with name 'name'", async function () {
    const resp = await request(app).get("/items/popsicle");
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual([{ name: "popsicle", price: "1.45" }]);
  });
});

// Create an item
describe("POST /items", () => {
  test("Adds an item to the list", async () => {
    const resp = await request(app).post("/items").send({
      name: "bat",
      price: "2.75",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ added: { name: "bat", price: "2.75" } });
  });
});

// Delete an item
describe("Delete /items:name", () => {
  test("Deletes an item from the list", async () => {
    const resp = await request(app).delete("/items/popsicle");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "deleted" });
  });
});

// Edit an item
describe("PATCH /items:name", () => {
  test("Updates an item from the list", async () => {
    const resp = await request(app).patch("/items/popsicle").send({
      name: "bat",
      price: "2.75",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "updated" });
  });
});
