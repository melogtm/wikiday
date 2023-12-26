import axios from "axios"; 

class apiUsage {
    constructor(events_api_url, top_message){
        this.events_api_url = events_api_url; 

        this.message = top_message; 

        this.EVENT_API = "https://byabbe.se/on-this-day/"; 

        this.IMG_API = "https://en.wikipedia.org/w/api.php?action=query&titles=";

        this.IMG_API_PROPS = "&prop=pageimages&format=json&pithumbsize=200";

        this.URL_TO_IMAGE = "images/no-image.png"; 

        return  async () =>  {
            const result = (await axios.get(this.EVENT_API + this.events_api_url)).data; 

            // Determine if we are dealing with births, deaths or events in general.
            this.eventType = Object.keys(result)[2]; 

            this.event = result[this.eventType][this.randomEventChoose(result[this.eventType].length)]; 
            
            let imgEventSource = await this.returnEventImg(this.event); 

            if (imgEventSource) {
                this.URL_TO_IMAGE = imgEventSource; 
            }

            return {
                userMessage: await this.message,
                choosenEvent: await this.event,
                imgEvent: this.URL_TO_IMAGE
            }

        }
    }; 

    async returnEventImg(event) {
        let apiImage = await axios.get(this.IMG_API + event.wikipedia[0].title + this.IMG_API_PROPS); 

        let imgResult = apiImage.data.query.pages;

        let imgSource = imgResult[Object.keys(imgResult)[0]].thumbnail

        if (imgSource) {
            return imgSource.source; 
        } else {
            return false; 
        }

    };

    randomEventChoose(length) {
        return Math.floor(Math.random() * length); 
    }

}

export default apiUsage; 