import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  authState: {
    id: 0,
    userName: "",
    email: "",
    status: false,
    profilePicture: "",
  },
  setAuthState: () => {},
});

export function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    id: 0,
    userName: "",
    email: "",
    status: false,
    profilePicture: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/authUser", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            id: response.data.id,
            userName: response.data.userName,
            email: response.data.email,
            status: true,
            profilePicture: response.data.profilePicture,
          });
        }
      });
  }, []);

  console.log("AuthContext- authState: ", authState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
