import 'bootstrap/dist/css/bootstrap.min.css';
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import GlobalStyle from "../src/styles/globalStyles/GlobalStyle";
import ValidarLogin from "../src/Util/ValidarLogin";
import {AuthContext} from "../src/Context/AuthContext";
import Constantes from '../src/Constantes/Constantes';

export default function Login() {

  const[login, setLogin] = useState({});
  const router = useRouter();
  const { signIn } = useContext(AuthContext)
  const [mensagem, setMensagem] = useState();


  useEffect(() => {
    if(!ValidarLogin.validarLogin()){
      router.push("/painel")
    }
  }, [])

  const submit = async (e) => {

    try{
      e.preventDefault()
      await signIn(login)
    }catch(e){
      setMensagem(e)
    }

  }

  function handleChange(e){
    setLogin({...login, [e.target.name] : e.target.value})
  }

  return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">{Constantes.nome_projeto}</h3>
            <div className="form-group mt-3">
              <label>Usuário</label>
              <input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control mt-1"
                  onChange={handleChange}
                  required={true}
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control mt-1"
                  onChange={handleChange}
                  required={true}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
            {mensagem && (
               <div className='d-flex flex-row-reverse'>
                <p style={{marginTop: "2vh", color: "red"}}>{mensagem}</p>
            </div>
            )}
           
            <p className="forgot-password text-right mt-2">
              <br/> 
            </p>
          </div>
        </form>
        <GlobalStyle/>
      </div>
  );
}
