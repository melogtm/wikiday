import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express(); 
const port = 3000;
const EVENT_API = "https://byabbe.se/on-this-day/"
const IMG_API = "https://en.wikipedia.org/w/api.php?action=query&titles="
const IMG_API_PROPS = "&prop=pageimages&format=json&pithumbsize=200"

app.set('view, engine', 'ejs');
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

let dateObject = new Date();
let events = '';
let births = '';
let deaths = '';
let url_to_Image = '';

let TopMessage = `Historical Events on ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`

app.get("/", async (req, res) => {
    const apiResult = await axios.get(`${EVENT_API}${dateObject.getMonth() + 1}/${dateObject.getDate()}/events.json`);

    events = apiResult.data.events; 

    let choosenEvent = events[Math.floor(Math.random() * (events.length - 1))]

    const apiImage = await axios.get(`${IMG_API}${choosenEvent.wikipedia[0].title}${IMG_API_PROPS}`);

    const pageResult = apiImage.data.query.pages
    
    url_to_Image = 'images/no-image.png'

    if (pageResult[Object.keys(pageResult)[0]].thumbnail) {
        url_to_Image = pageResult[Object.keys(pageResult)[0]].thumbnail.source; 
    }

    res.render("index.ejs", {message: TopMessage, imageUrl: url_to_Image, eventDescription: choosenEvent.description, eventDate: choosenEvent.year}); 
})

app.post("/", (req, res) => {
    if (!req.body.factdate) {
        dateObject = new Date();
    } else {
        dateObject = new Date(`${req.body.factdate}T12:00:00`);
    }

    TopMessage = `Historical Events on ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`

    res.redirect("/"); 
})

app.post("/birth", async (req, res) => {
    if (!req.body.bddate) {
        dateObject = new Date();
    } else {
        dateObject = new Date(`${req.body.bddate}T12:00:00`);
    }
    TopMessage = `Born in ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()} `
    
    const apiResult = await axios.get(`${EVENT_API}${dateObject.getMonth() + 1}/${dateObject.getDate()}/births.json`);

    births = apiResult.data.births; 

    let choosenBirth = births[Math.floor(Math.random() * (births.length - 1))]

    const apiImage = await axios.get(`${IMG_API}${choosenBirth.wikipedia[0].title}${IMG_API_PROPS}`);

    const pageResult = apiImage.data.query.pages

    url_to_Image = 'images/no-image.png'

    if (pageResult[Object.keys(pageResult)[0]].thumbnail) {
        url_to_Image = pageResult[Object.keys(pageResult)[0]].thumbnail.source; 
    }

    res.render("index.ejs", {message: TopMessage, imageUrl: url_to_Image, eventDescription: choosenBirth.description, eventDate: choosenBirth.year}); 
});

app.post("/death", async (req, res) => {
    if (!req.body.bddate) {
        dateObject = new Date();
    } else {
        dateObject = new Date(`${req.body.bddate}T12:00:00`);
    }
    TopMessage = `Died in ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`

    const apiResult = await axios.get(`${EVENT_API}${dateObject.getMonth() + 1}/${dateObject.getDate()}/deaths.json`);

    deaths = apiResult.data.deaths; 

    let choosenDeath = deaths[Math.floor(Math.random() * (deaths.length - 1))]

    const apiImage = await axios.get(`${IMG_API}${choosenDeath.wikipedia[0].title}${IMG_API_PROPS}`);

    const pageResult = apiImage.data.query.pages
    
    url_to_Image = 'images/no-image.png'

    if (pageResult[Object.keys(pageResult)[0]].thumbnail) {
        url_to_Image = pageResult[Object.keys(pageResult)[0]].thumbnail.source; 
    }

    res.render("index.ejs", {message: TopMessage, imageUrl: url_to_Image, eventDescription: choosenDeath.description, eventDate: choosenDeath.year});  
});

app.get("/about", (req, res) => {
    res.render("about.ejs"); 
})

app.listen(port, ()=> {
    console.log(`Server is on at port ${port}`); 
})
