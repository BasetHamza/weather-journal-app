/* Empty JS object to act as endpoint for all routes */
projectData = [];

// TODO-Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/*Middleware*/
// Here we are configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Telling body-parser exactly how we want our data to be dealt with. Which is using JSON.

// Cors for cross origin allowance - Let's the browser and server talk to each other without any security interruptions.
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
// Allows us to write server-side code that can then connect to client-side code which would be in a folder called website.
app.use(express.static('website'));


/*Creating a local server*/

const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

/* GET route that returns the projectData object */
app.get('/',function(req,res){
    res.send(projectData);
});

/* POST route that adds incoming data to projectData */

// The POST route should anticipate receiving three pieces of data from the request body
// temperature
// date
// user response

app.post('/addData', addWeatherData);

function addWeatherData (req, res){
    let newData = req.body;
    let newEntry = {
        temp: newData.temp,
        date: newData.date,
        response: newData.response
    }
    
    projectData.push(newEntry);

    console.log(projectData);
}
