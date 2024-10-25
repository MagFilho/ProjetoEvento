import { Controller } from "react-hook-form"
import { FormGroup, Input, Label } from "reactstrap"

export default function SwitchLabelForm({titulo,control,name,id, defaultValue}){

    return (
        <>
            <FormGroup switch>
                <Label check>{titulo}</Label>
                <Controller render={
                            ({field}) => {
                                return (
                                    <>
                                    <Input
                                        {...field} 
                                        id={id}
                                        name={name}
                                        type="switch"
                                        role="switch"
                                        defaultChecked={defaultValue}
                                        // checked={cargoValue?.criterio}
                                    />
                                </>
                                )
                            }
                        } name={name} control={control} defaultValue={defaultValue}/>
            </FormGroup>
        </>
    )

}