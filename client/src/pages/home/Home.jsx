import Topbar from "../../components/Topbar/Topbar";
import Event from "../../components/Event/Event";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [title, setTitle] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [eventDesc, setEventDesc] = useState(null);
  const [eventDate, setEventDate] = useState(null); 

  useEffect(() => {
    axios.get("http://localhost:9000/").then((response) => {
      const result = response.data;

      setTitle(result.message);
      setImgUrl(result.imageUrl);
      setEventDesc(result.eventDescription);
      setEventDate(result.eventDate);
    });


  }, []);

  return (
    <>
      <Topbar /> 
      <Event title={title} image={imgUrl} desc={eventDesc} date={eventDate} /> 
      <Footer /> 
    </>
  )
}
