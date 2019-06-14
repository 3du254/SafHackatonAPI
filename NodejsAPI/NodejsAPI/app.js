//require("./core/server");
const settings=require("./settings");
const Joi =require('joi');
var cont = require("./controllers/scratchCards");
const httpMsg=require("./core/httpMessage")
const express=require('express');
const app =express();
app.use(express.json());

/*GET requests*/
app.get('/',(req,resp)=>{
    httpMsg.showHome(req,resp); 
});
app.get('/scratchCards',(req,resp)=>{
    /*get all records in table scratch card*/
    cont.getList(req, resp); 
});
app.get('/newScratchCards',(req,resp)=>{
    /*get all new records in table scratch card created in the last 3 minutes*/
    cont.getNewList(req, resp); 
});
app.get('/scratchCards/:id',(req,resp)=>{
    /*get records by serial number*/
    const id=req.params.id;       
    if(id) {
        cont.get(req,resp,id);
    }
    else{
        httpMsg.show404(req,resp);
    }   
});

/*POST requests*/
app.post('/scratchCards',(req,resp)=>{
    /*add records in table scratch card*/
    
    const schema ={
        /*"ID": "", auto increment*/
        /*"VoucherNumber": "", auto generated*/
        SerialNumber: Joi.string().required(),
        ExpiryDate: Joi.string().required(),
        VoucherAmount: Joi.number().required(),
        /*"Status": "", set to active*/
        /*"DateCreated": "", date.now*/
        /*"DateUpdated": "" date.now*/
    }
    const result=Joi.validate(req.body,schema);
    if(result.error){
        resp.status(400).send(result.error.details[0].message);
        return;
    }   
    cont.add(req,resp,req.body);
   
});

/*PUT requests*/
app.put('/updateScratchCardStatus',(req,resp)=>{
    /*function update record status by serial number*/
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
});
app.put('/updateExpiredScratchCard',(req,resp)=>{
    /*function to update expired scratchcard*/
    cont.updateStatus(req,resp); 
});

/*DELETE requests*/
app.delete('/scratchCards',(req,resp)=>{
    /*function to delete all inactive scratchcard*/
    cont.delete(req,resp); 
});


const port =process.env.PORT || settings.webPort;
app.listen(port,()=>console.log(`Started listening at port ${port}`));