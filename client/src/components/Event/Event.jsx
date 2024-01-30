import "./event.css"

// Props 
export default function Event({title, image, desc, date}) {
  return (
    <div className="event">
      <header>
        <h1 className="eventTitle">{title}</h1>
      </header>
      <main className="eventInfo">
        <img className="eventImage" src={image ? image : "image/nophoto.jpg"} alt={desc} />

        <section className="eventDesc">
          <q className="eventExplanation">{desc}</q>
          <p className="eventDate">In {date}</p>
        </section>
      </main>
    </div>
  )
}
