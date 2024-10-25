import Constantes from "../Constantes/Constantes"
import { parseCookies } from "nookies"

export default function BuscarDadoSelect(url, setDado){

    const { [Constantes.nome_token] : token} = parseCookies()


    fetch(Constantes.url + url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
        .then((resp) => resp.json())
        .then((dado) => setDado(dado))
        .catch((error) => console.log(error))
}