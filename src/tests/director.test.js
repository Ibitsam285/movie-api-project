const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");  // Ensure `app` is properly exported
const Director = require("../models/Director");

let mongoServer;
let server;  // Define server variable

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect(); // Ensure any existing connection is closed
    await mongoose.connect(uri, {});
    server = app.listen(process.env.TEST_PORT); // Start the server on a test port
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    if (server) {
        server.close(); // Ensure the server is properly closed
    }
});


beforeEach(async () => {
    await Director.deleteMany({});
});

describe("Directors API", () => {
    it("should fetch all directors (empty at first)", async () => {
        const res = await request(app).get("/api/directors");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]); 
    });

    it("should add a new director", async () => {
        const res = await request(app).post("/api/directors").send({
            name: "Christopher Nolan",
            country: "UK",
            birth_year: 1970
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Christopher Nolan");
    });

    it("should fail when trying to add a director without required fields", async () => {
        const res = await request(app).post("/api/directors").send({
            country: "USA"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("Director validation failed");
    });
});
