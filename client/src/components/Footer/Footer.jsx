import "./footer.css"; 

export default function Footer() {
  return (
    <div className="footer">
        
        <div className="eventRegion">
            <p className="eventRegionTitle formTitle">What happened in this date?</p>
            <form className="eventRegionForm">
                <input type="date" name="event-date" />
                <button className="eventRegionSubmit" type="submit">Search in History...</button>
            </form>
        </div>
        <div className="specificEventsRegion">
        <p className="specificEventsRegionTitle formTitle">Birth or Death</p>
            <form className="specificEventsRegionForm">
                <input type="date" name="birth-death-date" />
                <div className="specificEventsRegionButtons">
                    <button className="specificEventsRegionSubmit birthButton" type="submit" formAction="/birth">Birth</button>
                    
                    <button className="specificEventsRegionSubmit deathButton" type="submit" formAction="/death">Death</button>
                </div>
            </form>
        </div>
    </div>
  )
}
