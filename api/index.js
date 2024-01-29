import express from "express"; 

const app = express(); 
const PORT = process.env.PORT || 9000;

app.use(express.json()); 

app.get("/status", (req, res) => {
    const status = {
       "Status": "Running",
    };
    
    res.send(status);
 });

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT); 
});