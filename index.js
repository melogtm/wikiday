import express from "express";
import bodyParser from "body-parser";
import apiUsage from "./controller/controller.js";

const app = express(); 
const port = 3000;
let url; 
let message; 
let response; 

app.set('view, engine', 'ejs');
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

let dateObject = new Date();

function getEventInfo(url, message) {
    return new apiUsage(url, message)(); 
}
 
app.get("/", async (req, res) => {
    try {
        url = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/events.json`

        message = `Historical Events on ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`

        response = await getEventInfo(url, message); 

        res.render("index.ejs", {message: response.userMessage, imageUrl: response.imgEvent, eventDescription: response.choosenEvent.description, eventDate: response.choosenEvent.year}); 

    } catch (error) {
        res.render("index.ejs", {message: 'Something went wrong: ' + error, imageUrl: 'images/no-image.png', eventDescription: 'It was not your fault!', eventDate: 'bugs, we trust.'});
    };
});

app.post("/", (req, res) => {
    if (!req.body.factdate) {
        dateObject = new Date();
    } else {
        dateObject = new Date(`${req.body.factdate}T12:00:00`);
    };

    res.redirect("/"); 
});

app.post("/birth", async (req, res) => {
    if (!req.body.bddate) {
        dateObject = new Date();
    } else {
        dateObject = new Date(`${req.body.bddate}T12:00:00`);
    };

    try {
        url = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/births.json`;

        message = `Born in ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`;

        response = await getEventInfo(url, message); 

        res.render("index.ejs", {message: response.userMessage, imageUrl: response.imgEvent, eventDescription: response.choosenEvent.description, eventDate: response.choosenEvent.year}); 
    } catch (error) {
        res.render("index.ejs", {message: 'Something went wrong: ' + error.message, imageUrl: 'images/no-image.png', eventDescription: 'It was not your fault!', eventDate: 'bugs, we trust.'});
    }
    
});

app.post("/death", async (req, res) => {
    if (!req.body.bddate) {
        dateObject = new Date();
    } else {
        dateObject = new Date(`${req.body.bddate}T12:00:00`);
    };

    try {
        url = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/deaths.json`;

        message = `Died in ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`; 

        response = await getEventInfo(url, message); 

        res.render("index.ejs", {message: response.userMessage, imageUrl: response.imgEvent, eventDescription: response.choosenEvent.description, eventDate: response.choosenEvent.year}); 
    } catch (error) {
        res.render("index.ejs", {message: 'Something went wrong: ' + error.message, imageUrl: url_to_Image, eventDescription: 'It was not your fault!', eventDate: 'bugs, we trust.'});
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs"); 
})

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`); 
})