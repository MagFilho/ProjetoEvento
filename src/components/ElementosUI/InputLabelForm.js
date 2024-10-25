import {FormGroup, Label} from "reactstrap";
import MensagemErrorForm from "../../../src/components/ElementosUI/MensagemErrorForm";

export default function InputLabelForm({label,name,id,register, errors, requerid,type,disableInput,extra, size}){
    return (
        <>
            <FormGroup>
                <Label size={size || ""}>{label}</Label>
                <input
                    {...register(`${name}`, {required: requerid || false})}
                    id={id}
                    name={name}
                    type={type}
                    disabled={disableInput}
                    className={`${errors[name] && "is-invalid"} form-control form-control-${size || ""}`}
                    {...extra}
                />
                {errors[name] && <MensagemErrorForm/>}
            </FormGroup>
        </>
    )
}