import "./event.css"

// Props 
export default function Event() {
  return (
    <div className="event">
      <header>
        <h1 className="eventTitle">Historical Event on January 10</h1>
      </header>
      <main className="eventInfo">
        <img className="eventImage" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbilder.hifi-forum.de%2Fmax%2F134507%2F200px-homer-simpson-sabber-141903_457494.png&f=1&nofb=1&ipt=8b1c33510429cedb06097c7281e2c4b4064b05f69b72e159f097d88e70b2052d&ipo=images" alt="brazil" />

        <section className="eventDesc">
          <q className="eventExplanation">Porro quaerat ut ratione temporibus. Possimus autem consequatur sapiente quia. Qui quidem aut vitae aliquam ut. Doloribus quo qui ipsum.</q>
          <p className="eventDate">In 1816</p>
        </section>
      </main>
    </div>
  )
}
