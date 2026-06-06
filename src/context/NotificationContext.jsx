import {
 createContext,
 useContext,
 useState,
 useEffect
} from "react";

const NotificationContext =
createContext();

export const useNotifications =
()=>useContext(NotificationContext);

export function NotificationProvider({
 children
}) {

 const [notifications,
 setNotifications] = useState([]);

 useEffect(()=>{

   const data =
   JSON.parse(
   localStorage.getItem(
   "notifications"
   )) || [];

   setNotifications(data);

 },[]);

 const addNotification=(message)=>{

   const updated=[
     ...notifications,
     {
      id:Date.now(),
      message
     }
   ];

   setNotifications(updated);

   localStorage.setItem(
   "notifications",
   JSON.stringify(updated)
   );
 };

 return(

  <NotificationContext.Provider
  value={{
    notifications,
    addNotification
  }}
  >

   {children}

  </NotificationContext.Provider>

 );
}