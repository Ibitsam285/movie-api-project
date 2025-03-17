const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Actor = require("../models/Actor");
const Movie = require("../models/Movie");
const MovieActor = require("../models/MovieActor");

let mongoServer;
let server

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri, {  });
    server = app.listen(process.env.TEST_PORT); // Start the server on a test port
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close()
});

describe("MovieActors API", () => {
    let actorId, movieId;

    beforeEach(async () => {
        // Add a sample actor
        const actorRes = await request(app).post("/api/actors").send({
            name: "Robert Downey Jr.",
            birthdate: "1965-04-04",
            nationality: "American"
        });

        actorId = actorRes.body._id;

        // Add a sample movie
        const movieRes = await request(app).post("/api/movies").send({
            title: "Iron Man",
            releaseYear: 2008,
            genre: "Action",
            director: "Jon Favreau"
        });

        movieId = movieRes.body._id;
    });

    it("should fetch all movie-actor relationships (empty at first)", async () => {
        const res = await request(app).get("/api/movieActors");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    it("should fail when adding a movie-actor relationship without required fields", async () => {
        const res = await request(app).post("/api/movieActors").send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("MovieActor validation failed");
    });

    it("should fail when adding the same actor to the same movie twice", async () => {
        await request(app).post("/api/movieActors").send({
            movie: movieId,
            actor: actorId,
            role: "Tony Stark"
        });

        const res = await request(app).post("/api/movieActors").send({
            movie: movieId,
            actor: actorId,
            role: "Tony Stark"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("MovieActor validation failed");
    });
});
