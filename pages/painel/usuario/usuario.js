import ValidarLoginPage from "../../../src/Util/ValidarLoginPage";
import {Button, Card, CardBody, CardHeader, CardTitle, Spinner, Table} from "reactstrap";
import Alerta from "../../../src/components/ElementosUI/Alerta";
import {useEffect, useState} from "react";
import {parseCookies} from "nookies";
import Constantes from "../../../src/Constantes/Constantes";
import ModalCadastroUsuario from "../../../src/components/ModalPage/ModalCadastroUsuario";

export default function Usuario(){

    const { [Constantes.nome_token]: token} = parseCookies()
    const[alerta, setAlerta] = useState({})
    const[loading, setLoading] = useState(false)
    const[ativarAlerta, setAtivarAlerta] = useState(false)
    const[visible, setVisible] = useState( true);
    const onDismiss = () => setVisible(false);
    const[usuario, setUsuario] = useState([]);
    const[modalUsuario, setModalUsuario] = useState(false);
    const[dadoModal, setDadoModal] = useState({
        nomeButtao: "",
        method: "",
        usuario: {},
        titulo: ""

    })

    function acionarAlertar(type, texto){
        setVisible(false);

        setAlerta({
            type: type,
            texto: texto
        })
        setVisible(true)
        setAtivarAlerta(true)
    }
    function abrirModalCriar(){

        setModalUsuario(true)

        setDadoModal({
            nomeButtao: "Cadastrar",
            method: "POST",
            usuario: {},
            titulo: "Cadastrar Usuário"
        })

    }

    useEffect(() => {
        buscarDadoUser()
    },[])

    function buscarDadoUser(){
        fetch(Constantes.url + "usuario", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((resp) => resp.json())
            .then((dado) => setUsuario(dado))
            .catch((error) => console.log(error))
    }

    return(
        <ValidarLoginPage>
            {loading
                ?
                <div className={"container"}>
                    <div className={" d-flex justify-content-center"}>
                        <Spinner
                            style={{color: "black"}}
                        >
                        </Spinner>
                    </div>
                </div>
                :
                <Card>
                    <CardTitle  tag={"h6"} className={"border-bottom p-3 mb-0"}>
                        <i className="bi-person me-2"> </i>
                        Usuário

                    </CardTitle>
                    <CardBody>
                        <Table bordered size={"sm"}>
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Login</th>
                                <th>Tipo</th>
                                <th>Usuário Responsável</th>
                            </tr>
                            </thead>
                            <tbody>
                                {usuario.map((user => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user["nome"]}</td>
                                            <td>{user["login"]}</td>
                                            <td>{user["tipoUsuario"]  === "ADMIN" ? "Admin"
                                                : user["tipoUsuario"] === "USER" ? "Assessor": "Órgão"}</td>
                                            <td>{user["usuarioResponsavel"]}</td>
                                        </tr>
                                    )
                                }))}
                            </tbody>
                        </Table>
                        <div className={"d-flex flex-row-reverse bd-highlight"}>
                            <Button onClick={abrirModalCriar}>Criar Novo Usuario</Button>
                        </div>
                    </CardBody>
                </Card>
            }
            <ModalCadastroUsuario
                toggle={() => setModalUsuario(!modalUsuario)}
                method={dadoModal.method}
                isOpen={modalUsuario}
                setLoading={setLoading}
                acionarAlerta={acionarAlertar}
                usuario={dadoModal.usuario}
                nomeButtao={dadoModal.nomeButtao}
                titulo={dadoModal.titulo}
                buscarDadoUser={buscarDadoUser}
            />
            {ativarAlerta && (
                <Alerta type={alerta["type"]}
                        texto={alerta["texto"]}
                        visible={visible}
                        toggle={onDismiss}>

                </Alerta>
            )}
        </ValidarLoginPage>
    )
}