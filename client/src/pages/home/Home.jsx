import Topbar from "../../components/Topbar/Topbar";
import Event from "../../components/Event/Event";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:9000";

function formatDate(date_object) {
  let day, month, year; 

  day = date_object.getDate() < 10 ? '0' + date_object.getDate() : date_object.getDate(); 
  month = (date_object.getMonth() + 1) < 10 ? '0' + (date_object.getMonth() + 1) : date_object.getMonth() + 1; 
  year = date_object.getFullYear(); 

  return `${year}-${month}-${day}`; 
}

export default function HomePage() {
  const [date, setDate] = useState(formatDate(new Date())); 
  
  const [title, setTitle] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [eventDesc, setEventDesc] = useState(null);
  const [eventDate, setEventDate] = useState(null); 

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      const result = response.data;

      setTitle(result.message);
      setImgUrl(result.imageUrl);
      setEventDesc(result.eventDescription);
      setEventDate(result.eventDate);
    });
  }, []);

  async function getEventDesc(type, date) {
    return (await axios.get(`${API_URL}/${type}/${date}`)).data
  };

  async function changeDate(e) {
    const buttonPressed = e.target; 

    let response; 

    switch (buttonPressed.innerHTML) {
      case 'Search':
        response = await getEventDesc('event', date);
        break;
      case 'Birth': 
      response = await getEventDesc('birth', date);
        break;
      default:
        response = await getEventDesc('death', date);
        break;
    }
  
    setTitle(response.message);
    setImgUrl(response.imageUrl);
    setEventDesc(response.eventDescription);
    setEventDate(response.eventDate);
  };

  function handleSubmit(e) {
    // Gets first element after <form>, in which case is an input -first index- therefore, pick its value. 
    const new_date = e.target.value
    // If user forgot to inform date, use today.
    setDate(new_date ? new_date : formatDate(new Date()));
  };

  return (
    <>
      <Topbar /> 
      <Event title={title} image={imgUrl} desc={eventDesc} date={eventDate} /> 
      <Footer onDateChange={changeDate} onSubmitChange={handleSubmit} /> 
    </>
  )
}
