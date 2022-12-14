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

// Returns all persons
app.get('/api/persons/', function(req, res) {

    res.send({"message":"Hämtar alla personer från databasen"});

});

app.get('/api/persons/:socialSecurityNumber', function(req, res) {

    var socialSecurityNumber = req.params.socialSecurityNumber

    if (socialSecurityNumber == 12345) {

        res.send({"message":"Hämtar 12345 från databasen"});

    } else {
        res.send({})
    }

   // res.send({"message":"Hämtar specifik person från databasen"});
    
    //var personNumber = req.params.courseCode

    /** 
    // Gets the coursecode
    var code = req.params.courseCode;
    
    // Init JSON object
    var send = {};
    
    // Search miundb for the coursecode
    for(course of miundb.courses) {

        if (course.courseCode == code.toUpperCase()) {
            // Getting the subject for the course
            for(subject of miundb.subjects) {
                // If subjectcode matches, add the subject to course                
                setSubject(course);
                send = course;
            };
        // If coursecode doesn´t exist, return empty object
        } else {

            send;
        };
                    
    };
    
    res.send(send);
    */
});

// Add a person
app.post('/api/persons', function(req, res) {

    // Create a new Person
    var newPeron = {
        firstName : req.body.firstName,
        surName : req.body.surName,
        address : req.body.address,
        socialSecurityNumber : req.body.socialSecurityNumber,
        phone : req.body.phone
    };

    // Check if person already exists
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
app.put('/api/persons/:socialSecurityNumber', function(res, req) {

    var socialSecurityNumber = req.params.socialSecurityNumber;

    /** 
    for (course of miundb.myCourses) {

        // If in MyCourses
       if (course.courseCode == code) {
           // Update grade
           course.grade = req.body.grade
           
           // Sets the data
           setCourseData(course);
           setSubject(course);

           //Saves the file
           saveFile(); 

           // Return MyCourse
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