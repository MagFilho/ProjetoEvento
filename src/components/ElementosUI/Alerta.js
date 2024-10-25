import {Alert} from "reactstrap";

export default function Alerta({texto,type,visible, toggle}){

    setTimeout(function () {
        toggle()
    }, 5000)

    return (
        <div id={"alertas"} className={"fixed-top mt-5 mt d-inline-flex flex-row-reverse"}
            style={{paddingRight: "15px"}}
        >
            <Alert color={type} isOpen={visible} toggle={toggle}>
                {texto}
            </Alert>
        </div>
    )
}