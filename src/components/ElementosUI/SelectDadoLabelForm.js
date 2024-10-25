import {FormGroup, Label} from "reactstrap";
import MensagemErrorForm from "../../../src/components/ElementosUI/MensagemErrorForm";

export default function SelectDadoLabelForm({label,name,id,register,optionsTexto,dado, errors, requerid, cargoValue, disableSelect, extra, size, value}){

    let dadoLabel = "Sem Valor"

    if(dado.length > 0){
        let dadoResult = dado.find((e) => e["id"] == cargoValue)
        dadoLabel = dadoResult?.nome

    }

    return (
        <>
            <FormGroup>
                <Label size={size}>{label}</Label>
                {!disableSelect
                    ?
                    (
                        <>
                            <select
                                {...register(`${name}`, {required: requerid || false, ...extra})}
                                id={id}
                                name={name}
                                className={`${errors[name] && "is-invalid"} form-select form-select-${size}`}
                                // defaultValue={cargoValue}
                            >
                                <option value={""}>{optionsTexto}</option>
                                {dado.map((e) =>{
                                    return (
                                        <>
                                            <option
                                                key={e.id}
                                                value={e.id}
                                                selected={cargoValue == e.id}
                                            >{e[value || "nome"]}</option>
                                        </>
                                    )
                                })}
                            </select>
                            {errors[name] && <MensagemErrorForm/>}
                        </>
                    )
                    :
                    <input
                        className={"form-control"}
                        value={dadoLabel}
                        disabled={true}

                    />
                }

            </FormGroup>
        </>
    )
}