const express = require('express');
const app = express();
const port = 3000;

const sql = require('mssql');
const config=
{
    user:'NITA',
    password:'123#Nita',
    server:'SQLEXPRESS',
    database:'CarsDB',
    options:{encrypt:false}
};
//LAB104-12-P6BLQ\SQLEXPRESS ,LAB104-12-P6BLQ\NITA

app.get('/getCars',async(req,res)=>
{
    try
    {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Cars');
        res.json(result.recordset);
    }
    catch(error)
    {
        console.error("Error fetching the data",error);
        res.status(500).send("Error fetching data");
    }
});
 //for adding data
 app.post('/addCar',express.json(),async(req,res)=>
 {
    const{model,make,year}=req.body;
    try
    {
        const pool= await sql.connect(config);
        await pool.request()
         .input('model',sql.NVarChar,model)
         .input('make',sql.NVarChar,make)
         .input('year',sql.Int,year)
         .query('INSERT INTO Cars(model,make,year) VALUES (@model,@make,@year)');
         res.json({message:"Car add Successfully!"});

    }
    catch(error)
    {
        console.error("error adding car",error);
        res.status(500).send("error adding car");
    }
 });

 app.listen(port,()=>{console.log(`server is listening on port:${port}`)});
 