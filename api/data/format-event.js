import RetrieveHistoricalInformation from "./data.js";

let url, message, response, historical_date; 

function getEventInfo(url, message) {
    return new RetrieveHistoricalInformation(url, message)(); 
};

export default async function formatEvent(event, user_date = false) {

    historical_date = new Date();
    
    if (user_date) {
        historical_date = new Date(`${user_date}T12:00:00`); 
    };

    // Hold the number for that month (Jan = 0; Fev = 1), but later on convert it to its name for the user. 
    let numeric_month, string_month, day; 
    numeric_month = historical_date.getMonth() + 1; 
    string_month = historical_date.toLocaleString('en-US', {month: "long"});
    day = historical_date.getDate(); 

    try {
        url = `${numeric_month}/${day}/${event}.json`; 

        switch (event) {
            case 'events':
                message = `Historical Events in ${string_month} ${day}`;
                break;
            
            case 'births': 
                message = `Born in ${string_month} ${day}`;
                break;
            default:
                message = `Died in ${string_month} ${day}`;
                break;
        }; 

        response = await getEventInfo(url, message); 

        return {
            message: response.topTitle, 
            imageUrl: response.imgEvent, 
            eventDescription: response.choosenEvent.description,
            eventDate: response.choosenEvent.year
        }
    } catch (error) {
        return {
            message: 'Something went wrong: ' + error.message, 
            imageUrl: undefined, 
            eventDescription: 'It was not your fault!', 
            eventDate: 'bugs, we trust.'
        }
    }
}