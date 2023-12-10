import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express(); 
const port = 3000;
const EVENT_API = "https://byabbe.se/on-this-day/";
const IMG_API = "https://en.wikipedia.org/w/api.php?action=query&titles=";
const IMG_API_PROPS = "&prop=pageimages&format=json&pithumbsize=200";

app.set('view, engine', 'ejs');
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));

let dateObject = new Date();

async function chooseEventAndImage(events_api_url, top_message) {
    try {
        const apiResult = await axios.get(events_api_url); 

        // Determine if we are dealing with births, deaths or events in general. 
        let firstKey = Object.keys(apiResult.data)[2]; 

        let event = apiResult.data[firstKey][Math.floor(Math.random() * (apiResult.data[firstKey].length - 1))];
        
        const apiImage = await axios.get(`${IMG_API}${event.wikipedia[0].title}${IMG_API_PROPS}`); 
    
        const ImgPageResult = apiImage.data.query.pages;
    
        let url_to_Image = 'images/no-image.png'; 
    
        if (ImgPageResult[Object.keys(ImgPageResult)[0]].thumbnail) {
            url_to_Image = ImgPageResult[Object.keys(ImgPageResult)[0]].thumbnail.source;
        };
    
        let eventBuild = {
            userMessage: top_message,
            choosenEvent: event, 
            imgEvent: url_to_Image
        };

        return eventBuild; 
    } catch (error) {
        console.log(error.message);
    } throw "Bad API Usage"; 
};
 
app.get("/", async (req, res) => {
    try {

        let apiResponse = await chooseEventAndImage(`${EVENT_API}${dateObject.getMonth() + 1}/${dateObject.getDate()}/events.json`, `Historical Events on ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`);

        res.render("index.ejs", {message: apiResponse.userMessage, imageUrl: apiResponse.imgEvent, eventDescription: apiResponse.choosenEvent.description, eventDate: apiResponse.choosenEvent.year}); 

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
        let apiResponse = await chooseEventAndImage(`${EVENT_API}${dateObject.getMonth() + 1}/${dateObject.getDate()}/births.json`, `Born in ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`);

        res.render("index.ejs", {message: apiResponse.userMessage, imageUrl: apiResponse.imgEvent, eventDescription: apiResponse.choosenEvent.description, eventDate: apiResponse.choosenEvent.year}); 
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
        let apiResponse = await chooseEventAndImage(`${EVENT_API}${dateObject.getMonth() + 1}/${dateObject.getDate()}/deaths.json`, `Died in ${dateObject.toLocaleString('en-US', {month: 'long'})} ${dateObject.getDate()}`);

        res.render("index.ejs", {message: apiResponse.userMessage, imageUrl: apiResponse.imgEvent, eventDescription: apiResponse.choosenEvent.description, eventDate: apiResponse.choosenEvent.year}); 
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