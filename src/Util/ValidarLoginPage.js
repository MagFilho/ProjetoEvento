import {useEffect} from "react";
import ValidarLogin from "../../src/Util/ValidarLogin";
import {useRouter} from "next/router";
import { parseCookies } from "nookies";

export default function ValidarLoginPage({children}){

    const router = useRouter();

    useEffect(() => {
        if(ValidarLogin.validarLogin()){
            router.push("/")
        }
    }, [])

    return (
        <>
            {children}
        </>
    )

}
// export const getServerSideProps = async (ctx) => {

//     const {['conjunturavsegov.token'] : token} = parseCookies(ctx);


//     console.log(token)

//     if(!token){
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {}
//     }
// }
