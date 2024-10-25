export default function TratarDados(valor){
    if(valor){
        return valor.replaceAll("\." , "").replaceAll("," , ".");
    }
    return valor
}