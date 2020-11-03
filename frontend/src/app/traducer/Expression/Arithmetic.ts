import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";
import { Environment } from "../Symbol/Environment";
import { env } from "process";
import { Err } from "../err";
import * as generator from "../final/generator";

export enum ArithmeticOption {
    PLUS,
    MINUS,
    BY,
    DIV,
    MOD,
    POW
}

export class Arithmetic extends Expression {

    constructor(private left: Expression, private right: Expression, private type: ArithmeticOption, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        let result: Retorno;

        if (this.type == ArithmeticOption.PLUS) {

            let temp = generator.solicitarTemporal();
            let f = `t${temp} = ${leftValue.value} + ${rightValue.value};`
            generator.agregarLinea(f);
            result = { value: `t${temp}`, type: Type.TEMPORAL };

        }
        else if (this.type == ArithmeticOption.MINUS) {
            let temp = generator.solicitarTemporal();
            let f = `t${temp} = ${leftValue.value} - ${rightValue.value};`
            generator.agregarLinea(f);
            result = { value: `t${temp}`, type: Type.TEMPORAL };
        }
        else if (this.type == ArithmeticOption.BY) {
            let temp = generator.solicitarTemporal();
            let f = `t${temp} = ${leftValue.value} * ${rightValue.value};`
            generator.agregarLinea(f);
            result = { value: `t${temp}`, type: Type.TEMPORAL };
        }
        else if (this.type == ArithmeticOption.MOD) {
            let temp = generator.solicitarTemporal();
            let f = `t${temp} = ${leftValue.value} % ${rightValue.value};`
            generator.agregarLinea(f);
            result = { value: `t${temp}`, type: Type.TEMPORAL };
        }
        else if (this.type == ArithmeticOption.POW) {

            //generator.agregarLinea("//fffff");
            if (leftValue.type == Type.NUMBER && rightValue.type == Type.TEMPORAL) {
                //forma num ^ temp

                let t1 = generator.solicitarTemporal();
                let a1 = `t${t1} = ${leftValue.value};`;
                generator.agregarLinea(a1);

                let l0 = generator.solicitarGoto();
                let a2 = `L${l0}:`;
                generator.agregarLinea(a2);

                let salida = generator.solicitarGoto();

                let a3 = `if(${rightValue.value} == 0){ \ngoto S${salida};\n}`;

                generator.agregarLinea(a3);

                let ev1 = `t${t1} = t${t1} * t${t1};`;
                let ev2 = `${rightValue.value} = ${rightValue.value} - 1;`;

                generator.agregarLinea(ev1);
                generator.agregarLinea(ev2);

                generator.agregarLinea(`goto L${l0};`);
                generator.agregarLinea(`S${salida}:`);

                result = { value: `t${t1}`, type: Type.TEMPORAL };


            } else if (leftValue.type == Type.TEMPORAL && rightValue.type == Type.TEMPORAL) {
                let t1 = generator.solicitarTemporal();
                let a1 = `t${t1} = ${leftValue.value};`;
                generator.agregarLinea(a1);

                let l0 = generator.solicitarGoto();
                let a2 = `L${l0}:`;
                generator.agregarLinea(a2);

                let salida = generator.solicitarGoto();

                let a3 = `if(${rightValue.value} == 0){ \ngoto S${salida};\n}`;

                generator.agregarLinea(a3);

                let ev1 = `t${t1} = t${t1} * t${t1};`;
                let ev2 = `${rightValue.value} = ${rightValue.value} - 1;`;

                generator.agregarLinea(ev1);
                generator.agregarLinea(ev2);

                generator.agregarLinea(`goto L${l0};`);
                generator.agregarLinea(`S${salida}:`);

                result = { value: `t${t1}`, type: Type.TEMPORAL };

            } else if (leftValue.type == Type.TEMPORAL && rightValue.type == Type.NUMBER) {
                // t 
                let temp = generator.solicitarTemporal();
                let ex = rightValue.value;
                let f = `t${temp} = ${leftValue.value} * ${leftValue.value};`;
                generator.agregarLinea(f);
                for (let i = 2; i < ex; i++) {
                    let f = `t${temp} = t${temp} * ${leftValue.value};`;
                    generator.agregarLinea(f);
                }
                result = { value: `t${temp}`, type: Type.TEMPORAL };
            } else {
                //num num
                let temp = generator.solicitarTemporal();
                let ex = rightValue.value;
                let f = `t${temp} = ${leftValue.value} * ${leftValue.value};`;
                generator.agregarLinea(f);
                for (let i = 2; i < ex; i++) {
                    let f = `t${temp} = t${temp} * ${leftValue.value};`;
                    generator.agregarLinea(f);
                }
                result = { value: `t${temp}`, type: Type.TEMPORAL };
            }


        }
        else {
            if (rightValue.value == 0) {
                throw new Err(this.line, this.column, "Semantico", "No se puede dividir entre 0");
            }
            let temp = generator.solicitarTemporal();
            let f = `t${temp} = ${leftValue.value} / ${rightValue.value};`
            generator.agregarLinea(f);
            result = { value: `t${temp}`, type: Type.TEMPORAL };

        }
        return result;
    }
}

/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */