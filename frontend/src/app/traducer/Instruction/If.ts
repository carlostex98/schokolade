import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/ret_v";

export class If extends Instruction{

    constructor(private condition : Expression, private code : Instruction, private elsSt : Instruction | null,
        line : number, column : number){
        super(line, column);
    }

    public execute(envx : Environment) {
        const condition = this.condition.execute(envx);
        //console.log(condition);
        if(condition.type != Type.BOOLEAN){
            
            throw {tipo: "Semantico",razon: "La condicion no es booleana", linea: this.line, columna : this.column};
        }

        if(condition.value == true){
            return this.code.execute(envx);
        }
        else{
            return this.elsSt?.execute(envx);//retorna emse si y solo si existe
        }
    }
}


/**
 * 
 * Este codigo NO participo en plagio con los otros compañeros del curso
 * 
 * pongo esto porque quede traumado con algo asi en el pasado :(    
 * 
 */

