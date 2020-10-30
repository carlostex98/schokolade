import { env } from "process"
import { Symbol } from "./Symbol";
import { Type } from "../Abstract/ret_v";
import { Function } from "../Instruction/Function";
import { Err } from "../err";

export class Environment {

    private variables: Map<string, Symbol>;//variables
    public funciones: Map<string, Function>; //unciones
    private pos: Map<string, number>; //posicion en el heap

    constructor(public anterior: Environment | null) {
        this.variables = new Map();
        this.funciones = new Map();
        this.pos = new Map();

    }

    public guardar(id: string, valor: any, type: Type, hh: number) {
        //guarda las variaqbles
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(id)) {
                //validamos

                //variable
                env.variables.set(id, new Symbol(valor, id, type));
                env.pos.set(id, hh);

                return;
            }
            env = env.anterior;
            //recorremos los demas envs
        }

        this.variables.set(id, new Symbol(valor, id, type));
        this.pos.set(id, hh);

    }

    //guarda func
    public guardarFuncion(id: string, funcion: Function, line: number, column: number) {
        if (this.funciones.has(id)) {
            //tiramos error si la funcion ya existe en el env
            throw new Err(line, column, "Semantico", "La funcion ya existe");
        } else {
            this.funciones.set(id, funcion);
        }

    }

    //obtiene var
    public getVar(id: string): Symbol | undefined | null {
        let envior: Environment | null = this;
        while (envior != null) {
            if (envior.variables.has(id)) {
                return envior.variables.get(id);
            }
            envior = envior.anterior;
        }
        return null;//en acces tira error si no existe
    }

    public getPx(id: string): number | undefined | null {
        let envior: Environment | null = this;
        while (envior != null) {
            if (envior.variables.has(id)) {
                return envior.pos.get(id);
            }
            envior = envior.anterior;
        }
        return null;//en acces tira error si no existe
    }

    //obtiene funccion
    public getFuncion(id: string): Function | undefined {
        let envx: Environment | null = this;
        while (envx != null) {
            if (envx.funciones.has(id)) {
                //detecta la func en el map
                return envx.funciones.get(id);
            }
            envx = envx.anterior;
        }
        return undefined;
    }

    //env global
    public getGlobal(): Environment {
        let envg: Environment | null = this;
        while (envg?.anterior != null) {

            envg = envg.anterior;
        }
        return envg;
    }

    /*
    --------- imagen tabla de simbolos
    */



    //retorna las funciones
    public print_func() {
        let env: Environment | null = this;
        let general = [];
        while (env != null) {
            //el valor del map ya contiene la ln y col
            for (let entry of env.funciones.entries()) {
                general.push([entry[0], "Codigo", "Funcion", entry[1].line, entry[1].column]);
            }

            env = env.anterior;
        }
        return general;
    }

}

/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */