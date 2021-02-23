const http = require('http');
const fs = require('fs');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'mochileros.csv',
    header: [
        {id: 'userID', title: 'userID'},
        {id: 'itemID', title: 'itemID'},
        {id: 'rating', title: 'rating'},
        {id: 'weather', title: 'weather'},
        {id: 'visibility', title: 'visibility > 8000'},
        {id: 'temp', title: 'temperature > 30'},
    ]
});

let amount_users = 10;
let amount_places = 30;
const weather = ['Sunny', 'Cloudy', 'Rain'];
var places_ids = ["playa-dorada", "playa-grande", "playa-costambar", "playa-long-beach", "cayo-arena", "teleferico-puerto-plata", "27-charcos-damajagua", "fortaleza-san-felipe", "macorix-tour-ron", "malecon-puerto-plata", "museo-ambar-dominicano", "del-oro-chocolate-factory", "monkey-jungle-dr", "museo-gregorio-luperon", "dressel-divers-puerto-plata", "restaurant-le-papillon", "ristorante-passatore", "los-tres-cocos", "mares-restaurant", "kaffe", "la-tarappa-pizzeria", "table-one-costambar", "tio-pan-panaderia", "bergatin-caribbean-grill", "green-jack-tar", "senor-rock-bar", "le-petit-francois", "gastro-gallery-market", "casa-40", "la-locanda-pop"];
let visibility = 1;
let temperature = 1;

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {

    if (req.url != '/favicon.ico') {
        let users = "";
    let places = [];

    for(let i = 1; i <= (amount_users - 5); i++ ){
        user = "u" + i;
        for(let j = 1; j <= (amount_places); j++ ){
            weather.forEach(element => {
                
                    if(element == "Sunny" && j < 6)
                    {
                        visibility = 1, temperature = 1, rating = 5;
                    }
                    
                else if(element == "Cloudy" && j < 6)
                {
                    visibility = 0, temperature = 0, rating = 3;
                    places.push(
                        {
                            userID: user,
                            itemID: "i" + j,
                            rating: rating,
                            weather: element,
                            visibility: visibility,
                            temp: temperature
                        });  
                    visibility = 1, temperature = 1, rating = 3;
                }
                else if(element == "Rain" && j < 6)
                {
                    visibility = 0, temperature = 0, rating = 1;
                    places.push(
                        {
                            userID: user,
                            itemID: "i" + j,
                            rating: rating,
                            weather: element,
                            visibility: visibility,
                            temp: temperature
                        });  
                    visibility = 1, temperature = 1, rating = 1;
                }

                else if(j % 2 == 0)
                    return;
                else if (j < 16){
                    rating = randomInt(2,6);
                }
                else if (j >= 16 && j <= 30){
                    rating = randomInt(1,3);
                }
                places.push(
                    {
                        userID: user,
                        itemID: "i" + j,
                        rating: rating,
                        weather: element,
                        visibility: visibility,
                        temp: temperature
                    });
            });
        }
    }

    for(let i = (amount_users - 5); i <= amount_users; i++ ){
        user2 = "u" + i;
        for(let j = 1; j <=  (amount_places) ; j++ ){
            
            weather.forEach(element => {
                if(element == "Sunny" && j < 6)
                    {
                        visibility = 1, temperature = 1, rating = 5;
                    }
                
                else if(element == "Cloudy" && j < 6)
                {
                    visibility = 0, temperature = 0, rating = 3;

                    places.push(
                        {
                            userID: user2,
                            itemID: "i" + j,
                            rating: rating,
                            weather: element,
                            visibility: visibility,
                            temp: temperature
                        });  
                    visibility = 1, temperature = 1, rating = 3;
                }
                else if(element == "Rain" && j < 6)
                {
                    visibility = 0, temperature = 0, rating = 1;

                    places.push(
                        {
                            userID: user2,
                            itemID: "i" + j,
                            rating: rating,
                            weather: element,
                            visibility: visibility,
                            temp: temperature
                        });  
                    visibility = 1, temperature = 1, rating = 1;
                }
                else if(j % 2 != 0)
                    return;
                else if (j < 16){
                    rating = randomInt(2,6);; //Love inside
                }
                else if (j <= 30 && element == "Sunny"){
                    rating = randomInt(4,6);
                }
                else if (j <= 30){
                    rating = randomInt(2,4);
                }
                
                places.push(
                    {
                        userID: user2,
                        itemID: "i" + j,
                        rating: rating,
                        weather: element,
                        visibility: visibility,
                        temp: temperature
                    });        
                
                    
                    
                    
            });
        }
    }

    for(let i = (amount_users); i <= amount_users + 5; i++ ){
        for(let j = 1; j <=  5 ; j++ ){
            visibility = 1, temperature = 1, rating = 5;

                    places.push(
                        {
                            userID: "u" + i,
                            itemID: "i" + j,
                            rating: rating,
                            weather: "Sunny",
                            visibility: visibility,
                            temp: temperature
                        });  
        }
    }

    csvWriter.writeRecords(places)       // returns a promise
    .then(() => {
        console.log('...Done');
    });

    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end(users);
    }

    
});

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
  }

// Start the server on port 3000
app.listen(6500, '127.0.0.1');
console.log('Node server running on port 6500');