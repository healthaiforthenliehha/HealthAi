import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          // Überprüfe, ob der Benutzername leer ist und setze ihn auf 'Guest'
          if (res.username === '') {
            res.username = 'Guest';
          }
          setUser(res); // Aktualisiere den Benutzerzustand mit dem Benutzernamen
        } else {
          setIsLoggedIn(false);
          setUser({ username: 'Guest' }); // Setze den Benutzer auf 'Guest', wenn kein Benutzer vorhanden ist
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
