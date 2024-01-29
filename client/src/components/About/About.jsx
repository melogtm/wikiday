import "./about.css";

export default function About() {
  return (
    <article className="about">
      <section className="aboutSection">
        <strong className="aboutTitle">Introdução:</strong>
        <p className="aboutInfo">Este projeto tem como objetivo principal oferecer uma experiência educativa e informativa, permitindo aos usuários explorar eventos marcantes na história por meio de uma interface simples e interativa. O foco principal deste projeto é a utilização de APIs (Interfaces de Programação de Aplicações) para obter e apresentar dados históricos de maneira acessível.</p> 
      </section>

       <section className="aboutSection">
          <strong className="aboutTitle">Recursos Principais:</strong>
              <ul className="aboutList aboutInfo">
                <li className="aboutItem">API de Eventos Históricos: 
                        Integração com uma API que fornece dados detalhados sobre eventos históricos relevantes. Essa API será a espinha dorsal do projeto, fornecendo informações precisas e confiáveis.</li>
                <li className="aboutItem">Interface Gráfica Intuitiva:
                        Uma interface de usuário amigável e intuitiva que permite aos usuários navegar pelos eventos históricos de forma simples e agradável.</li>
              </ul>
       </section>
    </article>
  )
}
