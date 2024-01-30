import axios from 'axios'; 

class RetrieveHistoricalInformation {
    constructor(events_url, title) {
        
        this.url = events_url; 
        this.title = title; 
        this.EVENT_API = "https://byabbe.se/on-this-day/"; 
        this.IMG_API = "https://en.wikipedia.org/w/api.php?action=query&titles=";
        this.IMG_PROPS = "&prop=pageimages&format=json&pithumbsize=200";
        this.URL_TO_IMG = undefined; 

        return async() => {
            const result = (await axios.get(this.EVENT_API + this.url)).data;

            // Determine if we are dealing with births, deaths or events in general. 
            const eventType = Object.keys(result)[2]; // Example: Object.keys(result) = [key1, key2, "death"...]
            this.event = result[eventType][Math.floor(Math.random() * result[eventType].length)]; // Choose a random event. 

            let imgEventSource = await this.returnEventImg(this.event); 
            
            if (imgEventSource) {
                this.URL_TO_IMG = imgEventSource; 
            };

            return {
                topTitle: await this.title,
                choosenEvent: await this.event, 
                imgEvent: this.URL_TO_IMG
            }
        };
    }
    async returnEventImg(event) {
            let apiImage = (await axios.get(this.IMG_API + event.wikipedia[0].title + this.IMG_PROPS)).data.query.pages; 
            // Route to find Image source link.
            let imgSource = apiImage[Object.keys(apiImage)[0]].thumbnail; 

            if (imgSource) {
                return imgSource.source; 
            } else {
                return undefined; 
            };
    };
};

export default RetrieveHistoricalInformation; 