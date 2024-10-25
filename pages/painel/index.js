import ValidarLoginPage from "../../src/Util/ValidarLoginPage";
import {Button, Card, CardBody, CardHeader, CardTitle, Modal, Spinner, Table} from "reactstrap";
import Alerta from "../../src/components/ElementosUI/Alerta";
import {useEffect, useState} from "react";
import {parseCookies} from "nookies";
import Constantes from "../../src/Constantes/Constantes";
import ModalCadastro from "../../src/components/ModalPage/ModalCadastro";
import FormEvento from "../../src/components/formPages/cadastro/FormEvento";
import FormatarData from "../../src/Util/FormatarData";
import Paginacao from "../../src/components/ElementosUI/Paginacao";


export default function Index(){

    const [offset, setOffest] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [filter, setFilter] = useState({});
    const { [Constantes.nome_token]: token} = parseCookies()
    const[alerta, setAlerta] = useState({})
    const[loading, setLoading] = useState(false)
    const[ativarAlerta, setAtivarAlerta] = useState(false)
    const[visible, setVisible] = useState( true);
    const onDismiss = () => setVisible(false);
    const[dados, setDados] = useState([]);
    const[modal, setModal] = useState(false);
    const[dadoModal, setDadoModal] = useState({
        nomeButtao: "",
        method: "",
        usuario: {},
        titulo: ""

    })
    const toggleModal = () => setModal(!modal);
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

        setModal(true)

        setDadoModal({
            nomeButtao: "Cadastrar",
            method: "POST",
            usuario: {},
            titulo: "Cadastrar Evento"
        })

    }

    useEffect(() => {
        buscarDadoUser()
    },[, offset, pageSize, filter])

    function buscarDadoUser(){
        filter.page = offset;
        filter.size = pageSize;

        filter = {
            ...filter,
        }


        const queryParams = new URLSearchParams(filter);
        const url = "evento/listAll" + `?${queryParams}`
        fetch(Constantes.url + url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((resp) => resp.json())
            .then((dado) => {
                setDados(dado["content"])
                setTotalPages(dado["totalPages"])
                setTotalElements((dado["totalElements"]))
            })
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
                        Evento

                    </CardTitle>
                    <CardBody>
                        <Table bordered size={"sm"}>
                            <thead>
                            <tr>
                                <th>Nome de Evento</th>
                               
                                <th>Descrição de Evento</th>
                               
                               
                               
                                <th>Local</th>
                                <th>Inicio de Evento</th>
                                <th>Fim de Evento</th>
                               
                            </tr>
                            </thead>
                            <tbody>
                                {dados.map((user => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user["nome"]}</td>
                                            <td>{user["descricao"]}</td>
                                            <td>{user["local"]?.nome}</td>
                                            <td>{FormatarData(user["DataInicio"], "dd/MM/yyyy hh:mm")}</td>
                                            <td>{FormatarData( user["DataFim"],"dd/MM/yyyy hh:mm")}</td>
                                           
                                        </tr>
                                    )
                                }))}
                            </tbody>
                        </Table>

                        <Paginacao
                                        offset={offset}
                                        pageSize={pageSize}
                                        setOffeset={setOffest}
                                        totalPages={totalPages}
                                        totalElements={totalElements}
                                        setTotalPages={setPageSize}
                                    />

                        <div className={"d-flex flex-row-reverse bd-highlight"}>
                            <Button onClick={abrirModalCriar}>Criar Novo Evento</Button>
                        </div>
                    </CardBody>
                </Card>
            }
            
            <ModalCadastro
                isOpen={modal}
                titulo={"Cadastrar Evento"}
                toggle={toggleModal}

            >

            <FormEvento
                dadoModal={dadoModal}
                toogleModal={toggleModal}
                method={"POST"}
                nomeBotao={"Cadastrar"}
                acionarAlertar={acionarAlertar}
                               
                />
            </ModalCadastro>

            

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