var request = require('request'); 
var fs = require('fs');
request('http://dummy.restapiexample.com/api/v1/employees', function (error, response, body) {
    if (!error && response.statusCode == 200) {        
        fs.writeFile("Employees.json", body, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
        });

        
     }
})