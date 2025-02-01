import { useContext } from "react";
import { LoginContext } from "../App";

const useLogin = () => {
  const { loginData, saveLoginData, token } = useContext(LoginContext);
  return { loginData, saveLoginData, token };
};

export default useLogin;
