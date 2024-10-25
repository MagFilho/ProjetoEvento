import {createContext, useEffect, useState} from "react";
import Constantes from "../../src/Constantes/Constantes";
import {useRouter} from "next/router";
import {destroyCookie, parseCookies, setCookie} from "nookies";


export const AuthContext = createContext({} )
export function AuthProvider({ children }) {

    const router = useRouter();
    const [user, setUser] = useState(null)
    const isAuthenticated = !!user;

    async function signIn(login) {

        const retutnOK = false;
        const mensagem = ""

        await fetch(Constantes.url  + "home/login", {
            method: "POST",
            headers : {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        })
        .then((resp) => {
            return new Promise((resolve) => resp.json()
            .then((json) => resolve({
                status: resp.status,
                ok: resp.ok,
                json: json
            })))
        })
        .then(({status, json, ok}) => {
            switch(status){
                case 200:{
                    if(json["token"]){
                        setCookie(undefined, Constantes.nome_token, json["token"], {
                            maxAge: 60 * 60 * 12, // 1 hour
                            path: "/"
                        })
                        setUser({
                            tipoUsuario: json["tipoUsuario"],
                            nome: json["nome"]
                        })
                        router.push("/painel")
                    }else{
                        // setMessage("Usuario ou senha Incorreto")
                    }
                }
                case 400: {
                    retutnOK = true
                    mensagem = json["detail"]
                }
            }
            
        })

        if(retutnOK){
            throw mensagem;
        }

        return mensagem;

}

    useEffect(() => {
        const { [Constantes.nome_token]: token } = parseCookies()
        if (token) {
            fetch(Constantes.url + "carregarUser", {
                method: "GET",
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + token
                }
            }).then((resp) => resp.json())
                .then((dado) => setUser({
                    tipoUsuario: dado["tipoUsuario"],
                    nome: dado["nome"]
                }))
                .catch(() => {
                        destroyCookie(undefined,Constantes.nome_token)
                    }
                )
        }
    }, [])

    return (
        <>
            <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
                {children}
            </AuthContext.Provider>
        </>
    )

}