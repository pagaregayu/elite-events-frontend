import {
 createContext,
 useContext,
 useState,
 useEffect
} from "react";

const BookingContext =
createContext();

export const useBookings =
()=>useContext(BookingContext);

export function BookingProvider({
 children
}) {

 const [bookings,
 setBookings] = useState([]);

 useEffect(()=>{

   const data =
   JSON.parse(
   localStorage.getItem(
   "bookings"
   )) || [];

   setBookings(data);

 },[]);

 const addBooking=(booking)=>{

   const updated=[
    ...bookings,
    booking
   ];

   setBookings(updated);

   localStorage.setItem(
   "bookings",
   JSON.stringify(updated)
   );
 };

 return(

 <BookingContext.Provider
 value={{
  bookings,
  addBooking
 }}
 >

 {children}

 </BookingContext.Provider>

 );
}