import {Modal, ModalBody, ModalHeader} from "reactstrap";
import FormUsuario from "../formPages/cadastro/FormUsuario";

export default function ModalCadastroUsuario({usuario, toggle, isOpen, acionarAlerta, setLoading,titulo,method,nomeButtao, buscarDadoUser}){
    return (
        <>
            <Modal size={"lg"} toggle={toggle} isOpen={isOpen}>
                <ModalHeader toggle={toggle} >{titulo}</ModalHeader>
                <ModalBody>
                    <FormUsuario
                        setLoading={setLoading}
                        usuarioValue={usuario}
                        toogleModal={() => {
                            toggle()
                            buscarDadoUser()
                        }}
                        method={method}
                        acionarAlertar={acionarAlerta}
                        nomeBotao={nomeButtao}
                    />
                </ModalBody>
            </Modal>

        </>
    )
}