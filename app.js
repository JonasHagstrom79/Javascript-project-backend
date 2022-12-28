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
let socialSecurityNumber;
var phone;
let persondb;
var persons;
var firstName;
var surName;
let person;

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

/**
 * Checks if a string contains special chars
 * @param {*} str 
 * @returns boolean
 */
function containsSpecialChars(str) {    
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
}

/**
 * Check if string contains only digits
 * @param {*} str 
 * @returns boolean
 */
function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

// Define a route handler for GET requests to the web root
// TODO: In lab 1, remove before submission
app.get('/', function(req, res) {
    res.send({ "message": "Hello, World!" });
});

// Returns all persons
app.get('/api/persons/', function(req, res) {

    res.send(persondb.persons);    

});

// Return a specific person
app.get('/api/persons/:socialSecurityNumber', function(req, res) {
    //socialSecurityNumber
    // Gets social security number //:5
    let socialSecurityNumber = req.params.socialSecurityNumber;
    // Get the persons from database    
    console.log("SSNUM "+socialSecurityNumber) //TODO:remove!
    // Init JSON object    
    let send = {};

    for (person of persondb.persons) { //TODO:Person doesnt get sent to frontend
        //if (":"+person.socialSecurityNumber == socialSecurityNumber) {
        if (":"+person.socialSecurityNumber == socialSecurityNumber) {
            
            send = person;
            break;
            
        } 
        // else {
            
        // //     send;
        //     console.log(send)
        //     console.log("else-statement")
        // };
    };
    //console.log(send)
    console.dir("else-statement " +send.firstName)
    res.send(send);
    
});

// Add a person
app.post('/api/persons', function(req, res) { 

    var firstName = req.body.firstName;
    var surName = req.body.surName;
    var socialSecurityNumber = req.body.socialSecurityNumber;
    var phone = req.body.phone


    if (!firstName) {
        res.status(403).json(
            {error: "Please insert first name"}
        );
        return res.json();
    }

    if (!surName) {
        res.status(403).json(
            {error: "Please insert sur name"}
        );
        return res.json();
    }

    if (!socialSecurityNumber) {
        res.status(403).json(
            {error: "Please insert social security number"}
        );
        return res.json();
    }
   
    if (containsSpecialChars(firstName)) {
        res.status(403).json(
            {error: "Only use A-Ö chars"}
        );
        return res.json();
    };

    if (containsSpecialChars(surName)) {
        res.status(403).json(
            {error: "Only use A-Ö chars"}
        );
        return res.json();
    };

    if (!containsOnlyNumbers(socialSecurityNumber)) {
        res.status(403).json(
            {error: "Only use 0-9 digits, example: 195606129876"}
        );
        return res.json();
    };

    // Formats the phone number
    phone = formatPhoneNumber(phone);

    // Create a new Person
    var newPerson = {
        firstName, //: req.body.firstName,
        surName, //: req.body.surName,
        address : req.body.address,
        socialSecurityNumber,// : req.body.socialSecurityNumber,
        phone //: req.body.phone
    };


    // Check if person already exists    
    for (person of persondb.persons) {

        if (newPerson.socialSecurityNumber == person.socialSecurityNumber) {
            // Return status and result
            res.status(409).json(
                {error: "Person already exists"}
            );
            return res.json();
        }

    }
    // If person doesnt exist
    persondb.persons.push(newPerson);
    // Save file
    saveFile();
    // Send status and return result
    res.status(201).json(newPerson);
    return res.json();   
    
});

// Update a person
app.put('/api/persons/:socialSecurityNumber', function(req, res) {

    // Gets social security number
    var socialSecurityNumber = req.params.socialSecurityNumber    
    
    for (person of persondb.persons) {

        // If in person-db
        if (person.socialSecurityNumber == socialSecurityNumber) {
           
            //  var phone = req.body.phone;
            // TODO: logic for checking phone number?
            //  phone
           
            // Update the fields if necessary
            person.firstName = req.body.firstName,
            person.surName = req.body.surName,
            person.address = req.body.address,
            person.socialSecurityNumber = req.body.socialSecurityNumber,
            person.phone = req.body.phone
                      
           //Saves the file
           saveFile(); 

           // Return person
           res.status(200).json(person);
           return res.json();
        };
       
    };

    // If not in person-db return error msg 404   
    res.status(404).json(
        {error : "Persson doesnt exist"} 
    );
    
    return res.json();   
   
});

// Delete person
app.delete('/api/persons/:socialSecurityNumber', function(req, res) {

    // Get the socialSecurityNumber for the person to be deleted
    var socialSecurityNumber = req.params.socialSecurityNumber;
    // Get the persons from database
    var persons = persondb.persons
    
    for (var i=0; i<persons.length; i++) {
        // If person is found
        if(persons[i].socialSecurityNumber == socialSecurityNumber) {
            
            person = persons[i];
            // Remove person
            persons.splice(i, 1);
            // Save changes to file
            saveFile();
            // Send status and return result
            res.status(200).json(person);
            return res.json();
        }
    }

    // If not in person-db return error msg 404 
    res.status(404).json(
        {error : "Person doesnt exist"} 
    );

    return res.json();

});

/**
 * Formatts the phone number
 * @param {*} input Phone number to be formatted
 * @returns phone number
 */
function formatPhoneNumber(input) {

    // Remove all non-numeric characters from the input
    input = input.replace(/\D/g,'');    
  
    // Split the input into the area code, first 3 digits, and last 4 digits
    let areaCode = input.slice(0, 3);
    let firstThree = input.slice(3, 6);
    let lastFour = input.slice(6);
  
    // Return the formatted phone number
    return areaCode + '-' + firstThree + ' ' + lastFour;
}