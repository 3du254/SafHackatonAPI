var request = require('request'); 
var fs = require('fs');

request.post('http://dummy.restapiexample.com/api/v1/create', {json:{employee_name:"Jena Gaines",employee_salary:"2",employee_age:"3",profile_image:""}},function (error, response, body){    
    if (!error && response.statusCode == 200) {        
        fs.writeFile("CreateEmployee.json", response.statusCode, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }         
            console.log("JSON file has been saved.");
        });

        
     }
    
})