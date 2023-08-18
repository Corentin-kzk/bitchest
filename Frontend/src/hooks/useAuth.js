import axios from "../api/config";
import { csrf } from "../api/crsf";


export const useAuth = () => {
  const login = async (credentials, setErrors, setSuccessResponse) => {
    await csrf();
    try {
      const res = await axios.post("/login", credentials);
      setSuccessResponse(res.data.user);
      window.location.href('/dashboard')
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };
  return {
    login,
  };
};
