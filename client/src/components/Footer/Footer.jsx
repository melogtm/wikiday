import "./footer.css"; 

export default function Footer({onDateChange, onSubmitChange}) {
  return (
    <div className="footer">
        <div className="eventRegion">
            <p className="eventRegionTitle formTitle">What happened in this date?</p>
            <form className="eventRegionForm" onSubmit={(e) => e.preventDefault()}>
                <input onChange={onSubmitChange} type="date" name="event-date" />
                <button onClick={onDateChange} className="eventRegionSubmit" type="submit">Search</button>
            </form>
        </div>
        <div className="specificEventsRegion">
        <p className="specificEventsRegionTitle formTitle">Birth or Death</p>
            <form className="specificEventsRegionForm" onSubmit={(e) => e.preventDefault()}>
                <input onChange={onSubmitChange} type="date" name="birth-death-date" />
                <div className="specificEventsRegionButtons">
                    <button onClick={onDateChange} className="specificEventsRegionSubmit birthButton" type="submit">Birth</button>
                    <button onClick={onDateChange} className="specificEventsRegionSubmit deathButton" type="submit">Death</button>
                </div>
            </form>
        </div>
    </div>
  )
}
