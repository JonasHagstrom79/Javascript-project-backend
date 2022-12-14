// Include all needed modules
const express = require('express');
const cors = require('cors');
var jsonfile = require('jsonfile');

// Create an Express application
const app = express();
app.use(cors());  // CORS-enabled for all origins!


//***** */
// Tell express to use a express.json, a built-in middleware in Express,
// that parses incoming requests with JSON payloads.
app.use(express.json());

// Tell express to use express.urlencoded, a built-in middleware in Express,
// that parses incoming requests with urlencoded payloads.
// The extended option is required. true is the default value and allows 
// for a JSON-like experience with URL-encoded.
app.use(express.urlencoded({ extended: true }));
//***** */

// Define the port the server will accept connections on
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});

// Read from file
var file = "person-db.json";

// Declaring variables
var socialSecurityNumber;
var phone;
var persondb;

/**
 * Reads a json-file
 */
jsonfile.readFile(file, function(err, obj) {
    if (err) {
        console.log(err);
    } else {        
        persondb = obj;
    }
});

/**
 * Save JSON file
 */
function saveFile() {
    jsonfile.writeFile(file, persondb, function(err) {
        console.log(err);
    });
};

// Define a route handler for GET requests to the web root
// TODO: In lab 1, remove before submission
app.get('/', function(req, res) {
    res.send({ "message": "Hello, World!" });
});

// Returns all persons
app.get('/api/persons/', function(req, res) {

    res.send(persondb.persons);

    //res.send({"message":"Hämtar alla personer från databasen"});

});

app.get('/api/persons/:socialSecurityNumber', function(req, res) {

    // Gets social security number
    var socialSecurityNumber = req.params.socialSecurityNumber

    // Inir JSON object
    var send = {}

    for (person of persondb.persons) {

        if (person.socialSecurityNumber == socialSecurityNumber) {
            
            send = person;

        } else {
            
            send;

        };
    };
    
    res.send(send);
    
});

// Add a person
app.post('/api/persons', function(req, res) { //TODO: HERE!!

    // Create a new Person
    var newPerson = {
        firstName : req.body.firstName,
        surName : req.body.surName,
        address : req.body.address,
        socialSecurityNumber : req.body.socialSecurityNumber,
        phone : req.body.phone
    };

    // Check if person already exists
    
    for (person of persondb.persons) {

        if (newPerson.socialSecurityNumber == person.socialSecurityNumber) {
            
            res.status(409).json(
                {error: "Person already exists"}
            );
            return res.json();
        }

    }
    
    /** 
    for (myCourse of miundb.myCourses) {

        if(newMyCourse.courseCode == myCourse.courseCode) {
            // Send error message
            res.status(409).json(
                {error : "Course already exist in MyCourses"} 
            );
            return res.json();
        }
    };
    */
});

// Update phone number
app.put('/api/persons/:socialSecurityNumber', function(req, res) {

    // Gets social security number
    var socialSecurityNumber = req.params.socialSecurityNumber    
    //var phone = "";
    for (person of persondb.persons) {

        // If in person-db
        if (person.socialSecurityNumber == socialSecurityNumber) {
           // Update grade
           person.phone = req.body.phone;
                      
           //Saves the file
           saveFile(); 

           // Return person
           res.status(200).json(person);
           return res.json();
        };
       
    };    

   // If not in person-db return error msg 404
   for (person of persondb.persons) {
       
       if (person.socialSecurityNumber != socialSecurityNumber) {
            res.status(404).json(
                {error : "Persson doesnt exist"} 
               );
           return res.json();
       };
   };         
   
});


// Delete person
app.delete('/api/persons/:socialSecurityNumber', function(req, res) {

    // Get the socialSecurityNumber for the person to be deleted
    var socialSecurityNumber = req.params.socialSecurityNumber;
    
    /** 
    // If in myCourses
    for(var i=0; i<myCourses.length; i++) {
        if(myCourses[i].courseCode == code) {
            course = myCourses[i];

            // Removes the course
            myCourses.splice(i, 1);

            // saves the file and return course
            saveFile();
            res.status(200).json(course);
            return res.json();
        }        
    }    

    // If not in myCourse return error msg 404
    for (course of miundb.myCourses) {
        
        if (course.courseCode != code) {
             res.status(404).json(
                 {error : "Course doesnt exist in MyCourses"} 
                );
            return res.json();
        };
    }; 
    */
});