const express =require("express");
const app=express();
const PORT_NO=8484;
const XLSX = require('xlsx');


function filterDataByModel(data, modelName) {
    return data.filter(item => item.model === modelName);
}

app.get('/search', (req, res) => {
   try{
    const workbook = XLSX.readFile("./data.xlsx");
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

   
    const modelName = req.query.q; 
    const filteredData = filterDataByModel(data, modelName);
    
    if (filteredData.length === 0) {
       
        res.json({ message: "No data found for the specified model." });
    } else {
        res.json(filteredData);
    }

   }catch(error){
    res.status(500).send("Internal server error: " + error.message);   }
});


app.listen(PORT_NO,()=>{
    console.log("Server is live on Port No: "+PORT_NO);
    console.log("Live Demo: "+"http://localhost:"+PORT_NO);
})
app.get("/",(req,res)=>{
    res.json("Server is Live on.")
})

