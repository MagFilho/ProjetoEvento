import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function ModalDelete({frase,toggle,deleteSubmit,isOpen,titulo}){

    return (
        <>
            <Modal size={"sm"} centered toggle={toggle} isOpen={isOpen}>
                <ModalHeader toggle={toggle} >{titulo}</ModalHeader>
                <ModalBody>
                   {frase}
                </ModalBody>
                <ModalFooter>                  
                    <Button color="primary" onClick={toggle}> 
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={deleteSubmit}> 
                        Confirmar
                    </Button>
                </ModalFooter>
            </Modal>

        </>
    )
}