let i = 1;

export let codigo: Array<any> = new Array();
export let temporals: Array<any> = new Array();
export let stack: number = 0;
export let heap: number = 0;
export let t_count: number = 0;

export let px: number = 0;


export function solicitarTemporal():number{
    t_count++;
    return t_count;
}

export function agregarLinea(cod):void{
    codigo.push(cod + '\n');
}

export function devolverCodigo():string{
    let retorno = "";
    codigo.forEach(el => {
        retorno += el;
    });
    //console.log(retorno);
    return retorno;
}

export function limpiar():void{
    temporals = [];
    codigo = [];
    stack = 0;
    heap = 0;
    t_count = 0;
    px = 0;
}

export function nuevaVar():number{
    stack++;
    return stack;
}

export function getPx():number{
    return px;
}

export function setPx(val):void{
    px=val;
}