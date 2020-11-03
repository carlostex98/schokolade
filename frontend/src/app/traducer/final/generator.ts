let i = 1;

export let codigo: Array<any> = new Array();
export let codigo_fuera: Array<any> = new Array();
export let temporals: Array<any> = new Array();
export let stack: number = 0;
export let heap: number = 0;
export let t_count: number = 0;

export let px: number = 0;
export let e: number = 0;

export let etq: number = 0;



export function modoMetodo():void{
    e = 1;
}

export function modoMain():void{
    e = 0;
}

export function solicitarTemporal():number{
    t_count++;
    return t_count;
}

export function solicitarGoto():number{
    etq++;
    return etq;
}

export function agregarLinea(cod):void{
    if(e==0){
        codigo.push(cod + '\n');
    }else{
        codigo_fuera.push(cod + '\n');
    }

    
}

export function devolverCodigo():string{
    let retorno = "";
    codigo.forEach(el => {
        retorno += el;
    });

    codigo_fuera.forEach(el => {
        retorno += el;
    });
    
    return retorno;
}

export function limpiar():void{
    temporals = [];
    codigo = [];
    codigo_fuera = [];
    stack = 0;
    heap = 0;
    t_count = 0;
    px = 0;
    e = 0;
    etq = 0;
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