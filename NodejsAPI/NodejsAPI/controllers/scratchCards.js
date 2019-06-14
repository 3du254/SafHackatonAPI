var db = require("../core/db");
const Joi =require('joi');
var settings = require("../settings");
var httpMsg = require("../core/httpMessage");
var util=require("util");

exports.getList = function (req, resp) {
    db.executeSql("select * from ScratchCard", function (data, err) {
        if (err) {
            httpMsg.show500(req,resp,err);            
        }
        else {
            httpMsg.sendJSON(req,resp,data);            
        }
        
    });
}

//function to get ScratchCard inserted in the last three mins
exports.getNewList = function (req, resp) {
    db.executeSql("select * from ScratchCard where DATEDIFF(MINUTE,DateCreated,getdate())<=3", function (data, err) {
        if (err) {
            httpMsg.show500(req,resp,err);            
        }
        else {
            httpMsg.sendJSON(req,resp,data);            
        }
        
    });
}

// function to to get ScratchCard via get by SerialNumber
exports.get = function (req, resp, id) {
    db.executeSql("select * from ScratchCard where SerialNumber="+id,function(data,err){
        if(err){
            httpMsg.show500(req,resp,err); 
        }
        else{
            httpMsg.sendJSON(req,resp,data); 
        }

    });    
}

// function to add ScratchCard via POST
exports.add = function (req, resp, reqBody) {
    try{
        if(!reqBody)throw new Error("Input not validddd");
        
        var data=reqBody;
        if(data){
            var d = new Date();
            var VoucherNumber = Math.floor(100000000 + Math.random() * 900000000); //generate random numbers            
            var sql="INSERT INTO [dbo].[ScratchCard] ([VoucherNumber],[SerialNumber],[ExpiryDate],[VoucherAmount],[Status],[DateCreated],[DateUpdated]) VALUES ";//('postman2',0000,'2018-01-01')"
            sql += util.format("('%s','%s','%s',%d,'%s',",VoucherNumber,data.SerialNumber,data.ExpiryDate,data.VoucherAmount,'active');
            
            sql +="GETDATE(),GETDATE())";
            db.executeSql(sql,function(data,err){
                if(err){
                    httpMsg.show500(req,resp,err); 
                }
                else{
                    httpMsg.sent200(req,resp); 
                }
        
            }); 

        }
        else{
            throw new Error("Input not valid");
        }

    }
    catch(ex){
        httpMsg.show500(req,resp,ex); 
    }

}

//function to update ScratchCard status by serial number
exports.update = function (req, resp, reqBody) {
    try{
        if(!reqBody)throw new Error("Input not valid");
        var data=JSON.parse(reqBody);
        if(data){
            if(!data.SerialNumber)throw new Error("serial number not provided");
            if(!data.Status)throw new Error("Status not provided");
            if(data.Status!='taken')throw new Error("can only take status taken");

            var sql=" UPDATE [dbo].[ScratchCard] SET  ";
            var isDataProvided=false;
            if(data.Status){
                sql+="Status='"+data.Status+"' ";
                isDataProvided=true;
            }            
            //sql=sql.slice(0,-1);
            sql+="WHERE SerialNumber="+data.SerialNumber;
            db.executeSql(sql,function(data,err){
                if(err){
                    httpMsg.show500(req,resp,err); 
                }
                else{
                    httpMsg.sent200(req,resp); 
                }
        
            }); 

        }
        else{
            throw new Error("Input not valid");
        }

    }
    catch(ex){
        httpMsg.show500(req,resp,ex); 
    }

}

//function to update scratchcard status of expired card 
exports.updateStatus = function (req, resp) {
    try{
            var sql="UPDATE ScratchCard SET Status='inactive' where Status='active' and DATEDIFF(MINUTE,DateCreated,getdate())>="+settings.expiry;
            db.executeSql(sql,function(data,err){
                if(err){
                    httpMsg.show500(req,resp,err); 
                }
                else{
                    httpMsg.sent200(req,resp); 
                }
        
            }); 

        }    
    catch(ex){
        httpMsg.show500(req,resp,ex); 
    }

}

exports.delete = function (req, resp, reqBody) {//function to delete all inactive records
    try{
        var sql="delete ScratchCard where Status='inactive'";
            db.executeSql(sql,function(data,err){
                if(err){
                    httpMsg.show500(req,resp,err); 
                }
                else{
                    httpMsg.sent200(req,resp); 
                }
        
            }); 

        }    
    catch(ex){
        httpMsg.show500(req,resp,ex); 
    }

}