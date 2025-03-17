const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // Import the server
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Director = require("../models/Director");

let mongoServer;
let server;

// 🛠 Setup & Teardown for Test Database
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connection.close();
    await mongoose.connect(uri, { });
    server = app.listen(process.env.TEST_PORT); // Start the server on a test port
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close()
});

beforeEach(async () => {
    await Movie.deleteMany({});
    await Genre.deleteMany({});
    await Director.deleteMany({});
});

describe("Movies API", () => {
    it("should fetch all movies (empty at first)", async () => {
        const res = await request(app).get("/api/movies");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]); // Initially, no movies should be present
    });

    it("should add a new movie", async () => {
        // Create test data
        const genre = new Genre({ name: "Action" });
        const director = new Director({ name: "John Doe", country: "USA", birth_year: 1970 });
        await genre.save();
        await director.save();

        const movieData = {
            title: "Test Movie",
            releaseYear: 2024,
            genre: genre.name,
            director: director.name
        };

        const res = await request(app).post("/api/movies").send(movieData);
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(movieData.title);
    });

    it("should fail when trying to add a movie with missing fields", async () => {
        const res = await request(app).post("/api/movies").send({
            title: "Test Movie",
            releaseYear: 2024
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("Path `genre` is required");
    });
});
