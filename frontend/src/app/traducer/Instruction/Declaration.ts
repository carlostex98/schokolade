import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { env } from "process";
import * as generator from "../final/generator";

export class Declaration extends Instruction {

    private id: string;
    private value: Expression;
    private tpx: number;

    constructor(id: string, value: Expression, line: number, column: number, tpx: number) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tpx = tpx;
        //registro de la linea y columna en la tabla de simbolos
    }

    public execute(env: Environment) {


        let t = generator.nuevaVar();//pos en el stack
        let n = generator.solicitarTemporal();
        let t1 = `t${n} = p + ${t};`;//preparamos la asignacion
        generator.agregarLinea(t1);
        const val = this.value.execute(env); //ejecuta la var

        let t2 = `stack[t${t}] = ${val.value};`;
        generator.agregarLinea(t2);

        env.guardar(this.id, val.value, val.type, t);
        //guardamos la variable en el enviroment actual y su pos en el stack :p
    }

}

/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */

