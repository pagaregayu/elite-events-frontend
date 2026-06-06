import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

  const [user,setUser] = useState(null);

  useEffect(() => {

    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if(currentUser){
      setUser(currentUser);
    }

  },[]);

  const login = (email,password) => {

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      user =>
        user.email === email &&
        user.password === password
    );

    if(foundUser){

      setUser(foundUser);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(foundUser)
      );

      return true;
    }

    return false;
  };

  const register = (newUser) => {

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  };

  const logout = () => {

    setUser(null);

    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}