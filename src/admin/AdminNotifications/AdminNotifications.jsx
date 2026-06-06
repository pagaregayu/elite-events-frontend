import { Link } from "react-router-dom";
import { useEffect,useState } from "react";

function AdminNotifications(){

 const [
  notifications,
  setNotifications
 ] = useState([]);

 useEffect(()=>{

  const data =
   JSON.parse(
    localStorage.getItem(
     "notifications"
    )
   ) || [];

  setNotifications(data);

 },[]);

 return(

 <div>

 <h2>
  Notifications
 </h2>

 {
 notifications.length===0 ?

 <div className="alert alert-info">

  No Notifications

 </div>

 :

 notifications.map(item=>(

 <div
  key={item.id}
  className="card p-3 mb-3"
 >

 <h5>
  {item.message}
 </h5>

 <p>
  {item.date}
 </p>

 <Link
  to="/admin/messages"
  className="btn btn-warning"
 >
  View Messages
 </Link>

 </div>

 ))
 }

 </div>

 );
}

export default AdminNotifications;