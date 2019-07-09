const express = require("express")
const bodyParser = require('body-parser');
const r=require("./Route/route")
const dbConfig=require("./Config/config")
const mongoose=require("mongoose")


const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.use("/",r)
app.listen(8080,()=>{console.log("connection server success on 8080");
});