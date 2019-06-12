var http = require("http");
var cont = require("../controllers/scratchCards");
var settings = require("../settings");
var httpMsg = require("./httpMessage");
http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsg.showHome(req,resp);                
                
            } 
            else if (req.url === "/scratchCards") {//get all records in table scratch card
                cont.getList(req, resp);                                
            }
            else if (req.url === "/newScratchCards") {//get all new records in table scratch card created in the last 3 minutes
                cont.getNewList(req, resp);
            }
            else {//get a specific records in table scratch card by serial number 
                var IDpatt="[0-9]+" ;
                var patt=new RegExp("/scratchCards/" +IDpatt);   
                if(patt.test(req.url)) {
                    patt=new RegExp(IDpatt);
                    var ID=patt.exec(req.url)
                    cont.get(req,resp,ID);
                }
                else{
                    httpMsg.show404(req,resp);
                }                   
            }
            break;
        case "POST":
                if (req.url === "/scratchCards") {//add records in table scratch card
                    var reqBody='';
                    req.on("data",function(data){
                        reqBody+=data;
                        if(reqBody.length>1e7){//check not to exceed 10mb
                            httpMsg.show413(req,resp);
                        }
                        
                    })
                    req.on("end",function (){
                        cont.add(req,resp,reqBody);
                    });
                                   
                    
                }
                else{
                    httpMsg.show404(req,resp);
                }
            break;
        case "PUT":
            if (req.url === "/updateScratchCardStatus") {//function update record status by serial number
                var reqBody='';
                req.on("data",function(data){
                    reqBody+=data;
                    if(reqBody.length>1e7){//check not to exceed 10mb
                        httpMsg.show413(req,resp);
                    }
                    
                })
                req.on("end",function (){
                    cont.update(req,resp,reqBody);
                });
                               
                
            }
            else if(req.url === "/updateExpiredScratchCard"){ //function to update expired scratchcard                
                cont.updateStatus(req,resp);                
            }
            else{
                httpMsg.show404(req,resp);
            }
            break;
        case "DELETE":
            if (req.url === "/scratchCards") {                
                cont.delete(req,resp);               
            }
            else{
                httpMsg.show404(req,resp);
            }
            break;
        default:
            httpMsg.show405(req,resp);
            break;
    }
}).listen(settings.webPort, function () {
    console.log("Started listening at: " + settings.webPort);
})