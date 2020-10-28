let i = 1;

export let codigo: Array<any> = new Array();
export let temporals: any[];
export let stack: number = 0;
export let heap: number = 0;
export let t_count: number = 0;


export function solicitarTemporal():number{
    //reciclar

    //fin reciclar
    t_count++;
    return t_count;
}

export function agregarLinea(cod):void{
    codigo.push(cod);
    console.log(codigo);
}

export function devolverCodigo():string{
    let retorno = "";
    
    return retorno;
}