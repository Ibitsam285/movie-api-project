### Movie API

This is a RESTful API for managing movies, directors, genres, and actors using Node.js, Express, and MongoDB. The API supports user authentication, movie data management, and more.

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- bcrypt (for password hashing)
- dotenv (for environment variables)
- Jest & Supertest (for testing)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Ibitsam285/movie-api.git
   cd movie-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

## Testing
First comment the app.listen and uncomment export line in src/server.js
Run the test suite using:
```sh
npm test
```

## Common Issues
### Duplicate Key Error
If you encounter the error:
```
MongoServerError: E11000 duplicate key error collection: movieDB.users index: Username_1 dup key: { Username: null }
```
Check the following:
- Ensure that `username` is properly passed in the request body.
- Validate user input before saving to the database.
- Drop existing indexes if needed:
  ```sh
  db.users.dropIndex("Username_1")
  ```

