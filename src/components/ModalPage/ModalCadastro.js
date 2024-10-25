import { Children } from "react";
import {Modal, ModalBody, ModalHeader} from "reactstrap";

export default function ModalCadastro({toggle, isOpen, titulo, children}){
        
    return (
        <>
            <Modal size={"lg"} toggle={toggle} isOpen={isOpen}>
                <ModalHeader toggle={toggle} >{titulo}</ModalHeader>
                <ModalBody>
                  {children}
                </ModalBody>
            </Modal>

        </>
    )
}