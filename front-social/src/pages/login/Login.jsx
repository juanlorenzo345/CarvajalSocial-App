import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const { user } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    if(user == null) toast.error("Error en el usuario o contraseña")
  };

  return (
    <div className="login">
      <div><Toaster/></div>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Carvajal Social</h3>
                <span className="loginDesc"> App Social para conectar a Carvajal</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" className="loginInput" type="email" required ref={email}/>
                    <input placeholder="Password" required type="password" className="loginInput" ref={password}/>
                      <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? (
                          <CircularProgress color="inherit" />
                      ) : (
                          "Iniciar Sesión"
                      )}</button>
                    <span className="loginForgot">Olvidó su contraseña?</span>
                    <button className="loginRegisterButton"> {isFetching ? (
                          <CircularProgress color="inherit"/>
                      ) : (
                          "Crear una nueva cuenta"
                        )}</button>
                </form>
            </div>
        </div>
    </div>
  )
}
