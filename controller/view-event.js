import apiUsage from "./controller.js";

let url; 
let message; 
let response;
let historical_date; 

function getEventInfo(url, message) {
    return new apiUsage(url, message)(); 
}

export default async function handleEvent(event, user_date) {
    historical_date = new Date(); 

    if (user_date) {
        historical_date = new Date(`${user_date}T12:00:00`); 
    }; 

    let numeric_month = historical_date.getMonth() + 1
    
    let string_month = historical_date.toLocaleString('en-US', {month: 'long'})
    
    let day = historical_date.getDate()

    try {
        url = `${numeric_month}/${day}/${event}.json`;

        if (event === 'events') {
            message = `Historical Events in ${string_month} ${day}`;
        } else if (event === 'births') {
            message = `Born in ${string_month} ${day}`;
        } else {
            message = `Died in ${string_month} ${day}`;
        }

        response = await getEventInfo(url, message); 

        return {
            message: response.userMessage, 
            imageUrl: response.imgEvent, 
            eventDescription: response.choosenEvent.description,
            eventDate: response.choosenEvent.year
        }

    } catch (error) {
        return  {
            message: 'Something went wrong: ' + error.message, 
            imageUrl: 'images/no-image.png', 
            eventDescription: 'It was not your fault!', 
            eventDate: 'bugs, we trust.'
        }
    }
};