import express from "express"; 
import formatEvent from "./data/format-event.js";

const app = express(); 
const PORT = process.env.PORT || 9000;

app.use(express.json()); 

async function getRandomFact(event_type, res) {
    const randomFact = await formatEvent(event_type); 
    
    res.json(randomFact);
};

async function getDateFact(event_type, date, res) {
    const dateEvent = await formatEvent(event_type, date); 

    res.json(dateEvent);
};

app.get("/", async (req, res) => {
    await getRandomFact("events", res); 
});

app.get("/event", async (req, res) => {
    await getRandomFact("events", res);
}); 

app.get("/event/:date", async (req, res) => {
    const paramDate = req.params.date; 
    
    await getDateFact("events", paramDate, res); 
});

app.get("/birth", async (req, res) => {
    await getRandomFact("births", res);
});

app.get("/birth/:date", async (req, res) => {
    const paramBirth = req.params.date; 

    await getDateFact("births", paramBirth, res);
});

app.get("/death", async (req, res) => {
    await getRandomFact("deaths", res);
});

app.get("/death/:date", async (req, res) => {
    const paramDeath = req.params.date; 

    await getDateFact("deaths", paramDeath, res);
});

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT); 
});