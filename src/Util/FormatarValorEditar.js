import FormatarValorRealLabel from "./FormatarValorRealLabel";

export default function FormatarValorEditar(valor){
    if(valor) {
        return FormatarValorRealLabel(valor).replace("R$ ", "");
    }
    return valor
}