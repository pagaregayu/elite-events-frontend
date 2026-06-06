import {
 createContext,
 useContext,
 useState,
 useEffect
} from "react";

const WishlistContext = createContext();

export const useWishlist =
() => useContext(WishlistContext);

export function WishlistProvider({children}) {

  const [wishlist,setWishlist] =
  useState([]);

  useEffect(()=>{

    const data =
      JSON.parse(localStorage.getItem("wishlist"))
      || [];

    setWishlist(data);

  },[]);

  const addToWishlist=(vendor)=>{

    const updated=[
      ...wishlist,
      vendor
    ];

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

  return(

    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>

  );
}