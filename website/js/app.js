// Response structure is explained in this website: https://openweathermap.org/current#parameter


// The API key obtained from OpenWeatherMap.
// The base URL is split into three strings since the zipcode and API key must be entered in the middle.
// baseURL: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
let baseURL_1 = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let baseURL_2 = '&appid=';
let apiKey = '00beb9ba70f8e6c6228a7557f6dab996';
let baseURL_3 = '&units=imperial'; // To get the temperature in Fahrenheit since the standard is in Kelvin.

let tempData;

const getTemperature = async (baseURL_1,baseURL_2,zipCode,apiKey,baseURL_3)=>{
    const res = await fetch(baseURL_1+zipCode+baseURL_2+apiKey+baseURL_3);
    try{
        const data = await res.json();
        return data.main.temp; // For now it is returning the whole data, but we will select the temperature.
    } catch(error) {
        console.log("error",error);
    }
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',  // GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, same-origin, omit
    headers: {
        'Content-Type': 'application/json', // We as saying that the application to run on JSON data.
    },
   // Body data type must match "Content-Type" header (JSON). Because servers deal with that as Strings and we want to deal with JSON, we use the method
   // JSON.stringify() to turn our data into JSON data.       
    body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

/**
 * Begin Helper Functions
*/

function date(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

/**
 * Begin Main Functions
*/

// A method that will generate the baseURL and use it along with the API key and the 
function generate(evt){
    
    evt.preventDefault(); // Preventing the default action (which is for the button to jump to itself based on href='#') - Is there a better way to do that?
    
    // Extracting the zipcode entered by the user in the form.
    const zipCode = document.getElementById('zip').value;

    // Calling the async function with fetch to get the temperature from the API
    getTemperature(baseURL_1,baseURL_2,zipCode,apiKey,baseURL_3)

    .then(function(data){
            // Chained Promise that makes a POST request to add the API data and the user data to the API.
            postData('/addData', {
                temp: data,
                date: date(),
                response: document.getElementById('feeling').value
            });

            // update the UI
            updateUI();
    }
    )
}



// A function to update the UI.
const updateUI = async () =>{

    const request = await fetch('/all');

    try{

        const allData = await request.json();

        // Accessing the last element which represents the most recent entry.
        document.getElementById('date').innerHTML = `Date: ${allData[allData.length - 1].date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData[allData.length - 1].temp}`;
        if (allData[allData.length - 1].response !== ""){ // A condition to print NA if a feeling was not entered.
            document.getElementById('response').innerHTML = `Feeling: ${allData[allData.length - 1].response}`;
        } else {
            document.getElementById('response').innerHTML = `Feeling: NA`;
        }
        
    } catch(error){
        console.log("error",error);
    }
}

/**
 * Begin Events
*/

// Event Listener for the 'Generate' click
document.querySelector('#generate').addEventListener('click', generate);