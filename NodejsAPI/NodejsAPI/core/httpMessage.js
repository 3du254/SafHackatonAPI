var settings =require("../settings");
exports.show500=function (req,resp,err){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(500, "Internal Error occorred", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details:" + err + "</br></body></html>")
    }
    else{
        resp.writeHead(500, "Internal Error occorred", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({data:"Error occured: "+err}))
    }
    resp.end();
};

exports.sendJSON=function (req,resp,data){
    resp.writeHead(200,{"Content-Type":"application/json"});
    if(data){
        resp.write(JSON.stringify(data));
    }else{
        resp.write("record not found");
    }    
    resp.end();
};

exports.show405=function (req,resp){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported </br></body></html>")
    }
    else{
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({data:"Method not supported"}))
    }
    resp.end();
};

exports.show404=function (req,resp){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(404, "Resource not found", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found </br></body></html>")
    }
    else{
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({data:"Resource not found"}))
    }
    resp.end();
};

exports.show413=function (req,resp){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(413, "Request Entity too large", { "Content-Type": "text/html" });
        resp.write("<html><head><title>413</title></head><body>413: Request Entity too large </br></body></html>")
    }
    else{
        resp.writeHead(413, "Request Entity too large", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({data:"Request Entity too large"}));
    }
    resp.end();
};
exports.sent200=function (req,resp){
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.write(JSON.stringify({status:"success"}))
    resp.end();    
};
exports.showHome=function (req,resp){
    if(settings.httpMsgsFormat==="HTML"){
        resp.writeHead(202, { "Content-Type": "text/html" });
        resp.write("<html><head><title>home</title></head><body>valid endpoints </br> <ul><li> /scratchCards - POST -Create a scratch card record.</li><li> /newScratchCards - GET -Fetch all records inserted in the last 3 minutes.</li><li> /scratchCards/{serialNumber} - GET -Fetch a scratch card record by the serial number</li><li> /updateExpiredScratchCard - PUT -update expired Scratch Card to inactive</li><li> /updateScratchCardStatus - DELETE -Delete all inactive records</li><li> /scratchCards - DELETE -Update scratch card info set status to taken</li></ul> </body></html>")
    }
    else{ 
        resp.writeHead(202, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify([
            {url:"/contacts",method :"GET",description:"list all contact" },
            {url:"/contacts/ID",method :"GET",description:"get one contact" }
        ]))
    }
    resp.end();   
};