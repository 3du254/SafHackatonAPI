const expect =require('chai').expect;
const request =require('supertest');
var sqlDb = require("mssql");
var server=request.agent("http://localhost:9000");
//const app =require ('../../../core/server');
const app =require ('../../../app');
var settings = require("../../../settings");

 describe('Scratch Card ',()=>{
     before((done)=>{
        var conn = new sqlDb.ConnectionPool(settings.dbConfig);
        conn.connect()
        .then(()=>done())
        .catch((err)=>done(err));
        
     })
     it('creating a new Scratch Card record',(done)=>{
         //request(app).post('/')
         server.post("/scratchCards")
         .send({             
                SerialNumber: "1234567890",
                ExpiryDate: "2019-06-12T00:00:00.000Z",
                VoucherAmount: 100000,
                Status: "active",
                DateCreated: "2019-06-12T00:00:00.000Z",
                DateUpdated: "2019-06-12T00:00:00.000Z"               
        })
        .then((res)=>{
            const body=res.body;            
            expect(res.status).to.equal(200);            
            done();
        })

     })

     it('Fetch new Scratch Card record created in the last 3 mins',(done)=>{
        //request(app).post('/')
        server.get("/newScratchCards")
        .send({})
       .then((res)=>{
           const body=res.body;            
           expect(res.status).to.equal(200);            
           done();
       })

    })

    it('Fetch new Scratch Card record by serial number',(done)=>{
        //request(app).post('/')
        server.get("/scratchCards/11")
        .send({})
       .then((res)=>{
           const body=res.body;            
           expect(res.status).to.equal(200);            
           done();
       })

    })

    it('Update Expired Scratch Card record status to inactive base on a defined expiry period ',(done)=>{
        //request(app).post('/')
        server.put("/updateExpiredScratchCard")
        .send({})
       .then((res)=>{
           const body=res.body;            
           expect(res.status).to.equal(200);            
           done();
       })

    })

    it('Update specific Scratch Card record by the serial number',(done)=>{
        //request(app).post('/')
        server.put("/updateScratchCardStatus")
        .send({
                SerialNumber: "11",                
                Status: "taken"                  
        })
       .then((res)=>{
           const body=res.body;            
           expect(res.status).to.equal(200);            
           done();
       })

    })
    
    it('Delete inactive Scratch Card record',(done)=>{
        //request(app).post('/')
        server.delete("/scratchCards")
        .send({})
       .then((res)=>{
           const body=res.body;            
           expect(res.status).to.equal(200);            
           done();
       })

    })

    
     
 })
