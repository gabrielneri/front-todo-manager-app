import { createContext, useContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authHeaders, setAuthHeaders] = useState({});

  const setHeaders = (headers) => {
    setAuthHeaders(headers);
    console.log("Headers atualizados:", headers);

  };
  
  const signin = async (userData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.post("/auth/sign_in", userData);
  
      const headers = {
        accessToken: response.headers["access-token"],
        uid: response.headers["uid"],
        client: response.headers["client"],
      };
  
      setHeaders(headers);
      setUser(response.data);
  
      return {
        data: response.data,
        headers: headers,
      };
    } catch (error) {
      throw error;
    }
  };
  

  const signout = async () => {
    // eslint-disable-next-line no-useless-catch
    try {      
      console.log("Antes do signout:");
      console.log(authHeaders.accessToken, authHeaders.uid, authHeaders.client);  
      const response = await api.delete("/auth/sign_out", {
        headers: { 
          'access-token': authHeaders.accessToken,
          'uid': authHeaders.uid,
          'client': authHeaders.client,
        }
      });
      console.log("Logout... " + response);
      setUser(null);
      setAuthHeaders({});
    } catch(error) {
      throw error;
    }
  };


  const isAuthenticated = () => {

  };

  const contextValue = { user, signin, signout, isAuthenticated, authHeaders, setHeaders, };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};