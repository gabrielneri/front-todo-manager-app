import { createContext, useContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signin = async (userData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await api.post("/auth/sign_in", userData);
  
      const headers = {
        accessToken: response.headers["access-token"],
        uid: response.headers["uid"],
        client: response.headers["client"],
      };  
      // Salvar tokens no localStorage
      localStorage.setItem("access-token", headers.accessToken);
      localStorage.setItem("uid", headers.uid);
      localStorage.setItem("client", headers.client);
      
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return {
        data: response.data,
        headers: headers,
      };
    } catch (error) {
      throw error;
    }
  };
  
  const signup = async (userData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await api.post("/auth", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
      });
    } catch (error) {
      throw error;
    }
  };

  const signout = async () => {
    // eslint-disable-next-line no-useless-catch
    try {      
      await api.delete("/auth/sign_out", {
        headers: { 
          'access-token': localStorage.getItem("access-token"),
          'uid': localStorage.getItem("uid"),
          'client': localStorage.getItem("client")
        }
      });
      // Remover os tokens do localStorage
      localStorage.removeItem("access-token");
      localStorage.removeItem("uid");
      localStorage.removeItem("client");

      setUser(null);
      localStorage.removeItem("user");

    } catch(error) {
      throw error;
    }
  };

  const contextValue = { user, signin, signup, signout, };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};