import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
          passwordAgain.current.setCustomValidity("Las contraseñas no coinciden!");
        } else {
          const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
          };
          try {
            await axios.post("/auth/register", user);
            history.push("/login");
          } catch (err) {
            console.log(err);
          }
        }
      };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Carvajal Social</h3>
                <span className="loginDesc"> App Social para conectar a Carvajal</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Usuario" className="loginInput" required ref={username} />
                    <input placeholder="Email" className="loginInput" required ref={email} type="email"/>
                    <input placeholder="Contraseña" className="loginInput" required ref={password} type="password" minLength="6"/>
                    <input placeholder="Confirmar Contraseña" className="loginInput" required ref={passwordAgain} type="password"/>
                    <button className="loginButton">Crear cuenta</button>
                    <button className="loginRegisterButton">Ya tengo un cuenta</button>
                </form>
            </div>
        </div>
    </div>
  )
}
