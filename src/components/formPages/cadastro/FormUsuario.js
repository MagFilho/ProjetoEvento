import {Button, Form, FormGroup, Label} from "reactstrap";
import {parseCookies} from "nookies";
import {Controller, useForm} from "react-hook-form";
import MensagemErrorForm from "../../ElementosUI/MensagemErrorForm";
import {useEffect, useState} from "react";
import Constantes from "../../../Constantes/Constantes";
import Select from "react-select";

export default function FormUsuario({acionarAlertar, setLoading, usuarioValue, method, nomeBotao, toogleModal}){

    const {[Constantes.nome_token]: token} = parseCookies()
    const[posiliticos, setpoliticos] = useState([])
    const[assessor, setAssessor] = useState(false)
    const[orgaobool, setOrgaobool] = useState(false)
    const[orgao, setOrgao] = useState([]);

    const {register,
        handleSubmit,
        control,
        formState: { errors } } = useForm({defaultValues: usuarioValue || {}});

    useEffect(() => {
        buscarDadosCadastro("orgao", setOrgao);
        buscarDadosCadastro("politico/vinculo", setpoliticos)
    }, [])

    function buscarDadosCadastro(url,setDado){
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

    function onSubmit(dado){

        if(dado["tipoUsuario"] === "USER"){
            if((dado["politico"] && dado["politico"].length > 0)){
                dado["politico"] = dado["politico"].map((e) => {
                    return {
                        id: e["value"],
                        nome: e["label"]
                    }
                })
            }else{
                return
            }
        }else{
            dado["politico"] = []
        }

        if(dado["tipoUsuario"] === "ORGAO"){
            if((dado["orgao"] && dado["orgao"].length > 0)){
                dado["orgao"] = dado["orgao"].map((e) => {
                    return {
                        id: e["value"],
                        nome: e["label"]
                    }
                })
            }else{
                return
            }
        }else{
            dado["orgao"] = []
        }

        console.log(dado)

        fetch(Constantes.url + "usuario", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(dado)
        })
            .then((resp) => resp.status)
            .then((dado) => {
                dado !== 201
                    ? acionarAlertar("warning", "Não foi Possível salvar usuário")
                    : acionarAlertar("success", "Usuário salvo com sucesso")
                toogleModal()
            })
            .catch(() => {
                acionarAlertar("warning", "Não foi Possível salvar o Político")
                toogleModal()
            })
    }
    function completarCadastro(e){
        setAssessor(e.target.value === "USER")
        setOrgaobool(e.target.value === "ORGAO")
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>Nome: </Label>
                    <input
                        {...register("nome", {required: true})}
                        id={"nome"}
                        name={"nome"}
                        className={`${errors.nome && "is-invalid"} form-control`}
                    />
                    {errors.nome && <MensagemErrorForm/>}
                </FormGroup>
                <FormGroup>
                    <Label>Login:</Label>
                    <input
                        {...register("user", {required: true})}
                        id={"user"}
                        name={"user"}
                        className={`${errors.user && "is-invalid"} form-control`}
                    />
                    {errors.user && <MensagemErrorForm/>}
                </FormGroup>
                <FormGroup>
                    <Label>Senha:</Label>
                    <input
                        {...register("pass", {required: true})}
                        id={"pass"}
                        name={"pass"}
                        className={`${errors.pass && "is-invalid"} form-control`}
                    />
                    {errors.pass && <MensagemErrorForm/>}
                </FormGroup>
                <FormGroup>
                    <Label>Tipo:</Label>
                    <select
                        {...register("tipoUsuario", {required: true, onChange: completarCadastro})}
                        id={"tipoUsuario"}
                        name={"tipoUsuario"}
                        className={`${errors.tipoUsuario && "is-invalid"} form-select`}
                    >
                        <option value={""}>Selecione o tipo do usuário</option>
                        <option value={"ADMIN"}>Admin</option>
                    </select>
                    {errors.tipoUsuario && <MensagemErrorForm/>}
                </FormGroup>    
                <FormGroup>
                    <div className={"d-flex flex-row-reverse bd-highlight"}>
                        <Button>{nomeBotao}</Button>
                    </div>
                </FormGroup>
            </Form>
        </>
    );
}