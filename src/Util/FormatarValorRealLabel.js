export default function FormatarValorRealLabel(valor){
    if(valor) {
        return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor)
    }
    return valor
}