const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req,res) => {
    fs.readFile('UserSplitting-SVD++-top-4-items.txt', 'utf8', (err, data) => {
        if (err){
            console.error(err);
            return
        }
        var recommended = data.split('\n');
        recommended.pop();
        
        recommended.forEach(element => {
            let singularRecommendation = element.split('-');

                let contexts = singularRecommendation[1].split(';');
                let recommendations = singularRecommendation[2].split(';');
                let fixedRecomm = [];
                recommendations.forEach(e => {
                    e = e.replace("(","");
                    e = e.replace(")","");
                    e = e.replace("*","");
                    let items = e.split(",");
                    items[1] = items[1].replace(" ","");
                    fixedRecomm.push(items);
                });

                //------------------------
                // Parse the fixedRecomm here, turn into JSON Object.
                //------------------------------------------
                
                let JSONObject = {
                    userID: singularRecommendation[0],
                    contexts: {
                        weather: contexts[0].split(':')[1],
                        visibility: contexts[1].split(':')[1],
                        temperature: contexts[2].split(':')[1]
                    },
                    recommendations: fixedRecomm
                    
                }
                console.log(JSONObject);
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(recommended[0].split('-')[0]);
    })

    
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});