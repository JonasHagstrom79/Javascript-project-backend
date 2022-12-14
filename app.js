// Include all needed modules
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());  // CORS-enabled for all origins!

// Define the port the server will accept connections on
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});

// Define a route handler for GET requests to the web root
// TODO: In lab 1, remove before submission
app.get('/', function(req, res) {
    res.send({ "message": "Hello, World!" });
});