import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export default function SubMenuText(){

    const {user} = useContext(AuthContext);

    let navigation = []

    navigation.push(
        {
            title: "Eventos",
            href: "/painel",
            icon: "bi bi-speedometer2",
            subMenu: false
        },
        {
            title: "Usuários",
            href: "/painel/usuario/usuario",
            icon: "bi-people",
            subMenu: false
        },

    )
    return navigation
}