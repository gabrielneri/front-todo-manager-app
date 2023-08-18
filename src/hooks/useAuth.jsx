import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import api from "../services/api";

const useAuth = () => {  
  const context = useContext(AuthContext);
  const accessToken = localStorage.getItem('access-token');
  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');
  if (accessToken && uid && client) {
    api.defaults.headers.common['access-token'] = accessToken;
    api.defaults.headers.common['uid'] = uid;
    api.defaults.headers.common['client'] = client;
  }

  return context;
};

export default useAuth;