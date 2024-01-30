import "./about.css";

export default function About() {
  return (
    <article className="about">
      <section className="aboutSection">
        <strong className="aboutTitle">Introduction:</strong>
        <p className="aboutInfo">This project's main objective is to offer an educational and informative experience, allowing users to explore important events in history through a simple and interactive interface. The main focus of this project is the use of APIs (Application Programming Interfaces) to obtain and present historical data in an accessible way.</p> 
      </section>

       <section className="aboutSection">
          <strong className="aboutTitle">Services:</strong>
              <ul className="aboutList aboutInfo">
                <li className="aboutItem">Historical Events API: Integration with an API that provides detailed data on relevant historical events. This API will be the backbone of the project, providing accurate and reliable information.</li>
                <li className="aboutItem">Intuitive Graphical Interface: A friendly and intuitive user interface that allows users to navigate historical events in a simple and enjoyable way.</li>
              </ul>
       </section>
    </article>
  )
}
