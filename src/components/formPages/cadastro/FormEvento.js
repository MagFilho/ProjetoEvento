import {Button, Col, Form, FormGroup, Label, Row} from "reactstrap";
import {parseCookies} from "nookies";
import {Controller, useForm} from "react-hook-form";
import MensagemErrorForm from "../../ElementosUI/MensagemErrorForm";
import {useEffect, useState} from "react";
import Constantes from "../../../Constantes/Constantes";
import Select from "react-select";
import InputLabelForm from "../../../components/ElementosUI/InputLabelForm";
import SelectDadoLabelFormAtualizado from "../../../components/ElementosUI/SelectDadoLabelFormAtualizado";

export default function FormEvento({acionarAlertar, usuarioValue, nomeBotao, toogleModal}){

    const {[Constantes.nome_token]: token} = parseCookies()
    const[local, setLocal] = useState([]);

    const {register,
        handleSubmit,
        control,
        formState: { errors } } = useForm({defaultValues: usuarioValue || {}});

    useEffect(() => {
        buscarDadosCadastro("local/listAll", setLocal);
        
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

        
        fetch(Constantes.url + "evento/salvar", {
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
                    ? acionarAlertar("warning", "Não foi Possível salvar evento")
                    : acionarAlertar("success", "Evento salvo com sucesso")
                toogleModal()
            })
            .catch(() => {
                acionarAlertar("warning", "Não foi Possível salvar o Político")
                toogleModal()
            })
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <Row xl={2} lg={2} md={2} sm={2} xs={2} xxl={2} >
                <Col>
                    <InputLabelForm
                        label={"Nome"}
                        errors={errors}
                        id={"nome"}
                        name={"nome"}
                        type={"text"}
                        register={register}
                        requerid
                        extra={{required: true}}

                    />

                </Col>
                <Col>
                    <InputLabelForm
                        label={"Descrição"}
                        errors={errors}
                        id={"descricao"}
                        name={"descricao"}
                        type={"text"}
                        register={register}
                        requerid
                        extra={{required: true}}

                    />

                </Col>
               
                <Col>
                   <SelectDadoLabelFormAtualizado
                   
                   control={control}
                   dados={local}
                   errors={errors}
                   id={"local"}
                   titulo={"Local"}
                   name={"local"}
                   placeholder={"Selecione o Local"}

                    
                   />


                </Col>
                <Col>
                    <InputLabelForm
                        label={"Inicio de Evento"}
                        errors={errors}
                        id={"dataInicio"}
                        name={"dataInicio"}
                        type={"datetime-local"}
                        register={register}
                        requerid
                        extra={{required: true}}

                    />

                </Col>
                <Col>
                    <InputLabelForm
                        label={"Fim de Evento"}
                        errors={errors}
                        id={"dataFim"}
                        name={"dataFim"}
                        type={"datetime-local"}
                        register={register}
                        requerid
                        extra={{required: true}}

                    />

                </Col> 
                </Row>    
                <FormGroup>
                    <div className={"d-flex flex-row-reverse bd-highlight"}>
                        <Button>{nomeBotao}</Button>
                    </div>
                </FormGroup>
            </Form>
        </>
    );
}