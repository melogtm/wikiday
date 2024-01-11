import express from "express";
import bodyParser from "body-parser";
import handleEvent from "./controller/view-event.js";

const app = express(); 
const port = 3000;

let date; 

app.set('view, engine', 'ejs');
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    const events = await handleEvent('events', date);
    
    res.render("index.ejs", {message: events.message, imageUrl: events.imageUrl, eventDescription: events.eventDescription, eventDate: events.eventDate}); 
});

app.get("/about", (req, res) => {
    res.render("about.ejs"); 
})

app.post("/", async (req, res) => {
    date = req.body.factdate; 

    res.redirect("/"); 
});

app.post("/birth", async (req, res) => {
    const births = await handleEvent('births', req.body.bddate);
    
    res.render("index.ejs", {message: births.message, imageUrl: births.imageUrl, eventDescription: births.eventDescription, eventDate: births.eventDate});
});

app.post("/death", async (req, res) => {
    const deaths = await handleEvent('deaths', req.body.bddate);
    
    res.render("index.ejs", {message: deaths.message, imageUrl: deaths.imageUrl, eventDescription: deaths.eventDescription, eventDate: deaths.eventDate});
});

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`); 
})