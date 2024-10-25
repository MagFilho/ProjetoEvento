export default function AjeitarSelectsPersonalizadoEdit(dado, name, mult) {
    if(dado[name]){
        if(mult){
            dado[name] = dado[name]?.map((e => {
                return {value: e?.id, label: e?.nome}
            })) 
        }else{
            converter(dado, name)
        }
    }
    
}

function converter(dado, name){
    dado[name] = {
            value: dado[name]?.id,
            label: dado[name]?.nome
        }
}