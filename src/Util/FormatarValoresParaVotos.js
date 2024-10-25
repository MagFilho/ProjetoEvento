export default function FormatarValoresVotos(valor){
    if(valor) {
        return (valor + "").replace(/(?=(\B)(\d{3})+$)/g, ".")
    }
    return valor
}