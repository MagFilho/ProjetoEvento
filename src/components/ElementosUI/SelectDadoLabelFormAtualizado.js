import { Controller } from "react-hook-form";
import Select from "react-select";
import { FormGroup, Label } from "reactstrap";
import MensagemErrorForm from "./MensagemErrorForm";

export default function SelectDadoLabelFormAtualizado({name, titulo,id, placeholder, dados, value,label,errors,control, isMulti, defaultValue, extra}){

    return (
        <>
            <FormGroup>
                <Label>{titulo}</Label>
                <Controller render={
                    ({field}) => {
                        return (
                            <>
                                <Select
                                    {...field}
                                    isMulti={isMulti}
                                    id={id}
                                    name={name}
                                    placeholder={placeholder}
                                    defaultValue={defaultValue}
                                    options={dados}
                                    getOptionLabel={(valor)=>valor?.nome}
                                    getOptionValue={(valor)=>valor?.id}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    {...extra}
                                />
                            </>
                        )
                    }
                } name={name} control={control} defaultValue={defaultValue}/>
                {errors[name] && <MensagemErrorForm/>}
            </FormGroup>
        </>
    )

}