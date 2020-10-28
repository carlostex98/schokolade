
import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { errores } from '../Errores';
import { Err } from "../err";
import { Function } from "../Instruction/Function";
import * as generator from "../final/generator";



export class manager {

    

    constructor() {

    }

    analizar(lineas): void {
        //llamamos al parser y parseamos
        let pst = require('../../parser/interpreter.js').parser;
        const ast = pst.parse(lineas);
        const env = new Environment(null);
        for (const instr of ast) {
            try {
                if (instr instanceof Function)
                    instr.execute(env);
            } catch (error) {
                errores.push(error);
            }
        }

        for (const instr of ast) {
            if (instr instanceof Function)
                continue;
            try {
                const actual = instr.execute(env);
                if (actual != null || actual != undefined) {
                    errores.push(new Err(actual.line, actual.column, 'Semantico', actual.type + ' fuera de un ciclo'));
                }
            } catch (error) {
                console.log(error);
                errores.push(error);
            }
        }

        console.log(generator.devolverCodigo());

    }

    






}