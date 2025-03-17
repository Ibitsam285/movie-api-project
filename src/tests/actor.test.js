const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Actor = require("../models/Actor");

let mongoServer;
let server;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri, {});
    server = app.listen(process.env.TEST_PORT); // Start the server on a test port
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close()
});

describe("Actors API", () => {
    it("should fetch all actors (empty at first)", async () => {
        const res = await request(app).get("/api/actors");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    it("should fail to add an actor without required fields", async () => {
        const res = await request(app).post("/api/actors").send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("Actor validation failed");
    });

    it("should not add a duplicate actor", async () => {
        await request(app).post("/api/actors").send({
            name: "Leonardo DiCaprio",
            birthdate: "1974-11-11",
            nationality: "American"
        });

        const res = await request(app).post("/api/actors").send({
            name: "Leonardo DiCaprio",
            birthdate: "1974-11-11",
            nationality: "American"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("Actor validation failed");
    });
});
