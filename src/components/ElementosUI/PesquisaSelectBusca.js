import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { FormGroup, Label } from 'reactstrap';
import MensagemErrorForm from './MensagemErrorForm';

export default function PesquisaSelectBusca({labelTitulo, id, name, placeholder, isMulti, errors, control, buscar}){


    const[tempo, setTempo] = useState();

    const filterDados =  async (inputValue) => {
        let dados =  []

        if(inputValue){
           await buscar(inputValue)
            .then((resp) => resp.json())
            .then((dado) => {
                    dados = dado
                })
            .catch((error) => console.log(error)) 
        }



        return dados
      };
      
      const loadOptions = (
        inputValue,
        callback
      ) => {

        clearInterval(tempo);

        setTempo(setTimeout(() => {
            filterDados(inputValue)
            .then((dados) => 
            {
                if(inputValue){
                    callback(dados.map((e) => {
                        return {
                            value: e.id,
                            label: e["nome"]
                        }
                    }));
                }
            })
        }, 1000));

      };




    return (
        <>
            <FormGroup>
                <Label>{labelTitulo}</Label>
                <Controller render={
                    ({field}) => {
                        return (
                            <>
                                <AsyncSelect 
                                    {...field}
                                    cacheOptions 
                                    loadOptions={loadOptions} 
                                    defaultOptions
                                    id={id}
                                    name={name}
                                    isMulti={isMulti}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    />
                            </>
                        )
                    }
                } name={name} control={control}/>
                {errors[name] && <MensagemErrorForm/>}
            </FormGroup>
        </>
    )

}