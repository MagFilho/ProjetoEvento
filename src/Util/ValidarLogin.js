import Constantes from "../Constantes/Constantes";
import {parseCookies} from "nookies";


export default  class ValidarLogin {
    static validarLogin() {
        const { [Constantes.nome_token]: token } = parseCookies()
        return !token;
    }
}
//
//     static validatToken() {
//         let valido = false;
//         if (localStorage.getItem("token")) {
//             fetch(Constantes.url + "validarToken", {
//                 method: "POST",
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-Type": "application/json"
//                 },
//                 body: localStorage.getItem("token")
//             }).then((resp) => {
//                 if (resp.status != 200) {
//                     // localStorage.clear()
//                     valido = true;
//                 }
//             }).catch(() => console.log("error"))
//         }
//         return valido;
//     }
// }

