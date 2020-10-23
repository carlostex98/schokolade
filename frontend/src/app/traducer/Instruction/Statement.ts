import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { errores } from "../Errores";

export class Statement extends Instruction{

    constructor(private code : Array<Instruction>, line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
        const newEnv = new Environment(env);
        for(const instr of this.code){
            try {
                const element = instr.execute(newEnv);
                if(element != undefined || element != null){
                    return element;  
                }                 
            } catch (error) {
                errores.push(error);
                //push del error :p 
            }
            //stx
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