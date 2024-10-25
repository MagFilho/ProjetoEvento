export default function AjeitarSelectsPersonalizado(dado, name, mult) {
    if(dado[name]){
        if(mult){
            dado[name] = dado[name]?.map((e => {
                return {id: e?.value, nome: e?.label}
            })) 
        }else{
            converter(dado, name)
        }
    }else{
       dado[name] = null 
    }
    
}

function converter(dado, name){
    dado[name] = {
            id: dado[name]?.value,
            nome: dado[name]?.label
        }
}