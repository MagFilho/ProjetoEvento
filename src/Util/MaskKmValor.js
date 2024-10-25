String.prototype.reverse = function(){
    return this.split('').reverse().join('');
};

export default function MaskKmValor(e){
    if(e.length > 14) {
        e = e.replaceAll(/.$/gi, "");
        return
    }
    let valor  =  e.replace(/[^\d]+/gi,'').reverse();
    let resultado  = "";
    let mascara = "###.###.###.###.###,## km".reverse();
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
    e = resultado.reverse();
}

