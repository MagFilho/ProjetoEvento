String.prototype.reverse = function(){
    return this.split('').reverse().join('');
};

export default function MaskCpfCnpj(e){
    let mascara = "#########-##".reverse();
    if(e.target.value.length > 18) {
        e.target.value = e.target.value.replaceAll(/.$/gi, "");
        return
    }
    if(e.target.value.length > 12){
        mascara = "##.###.###/####-##".reverse()
    }
    let valor  =  e.target.value.replace(/[^\d]+/gi,'').reverse();
    let resultado  = "";
    for (let x=0, y=0; x<mascara.length && y<valor.length;) {
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    e.target.value = resultado.reverse();
}

