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
        const tipoDominante = this.tipoDominante(leftValue.type, rightValue.type);

        if (this.type == ArithmeticOption.PLUS) {

            let temp = generator.solicitarTemporal();
            let f = `t${temp} = ${leftValue.value} + ${rightValue.value}`
            generator.agregarLinea(f);
            result = { value: `t${temp}`, type: Type.NUMBER };

        }
        else if (this.type == ArithmeticOption.MINUS) {
            let temp = generator.solicitarTemporal();
            let f = `t${temp} = ${leftValue.value} - ${rightValue.value}`
            generator.agregarLinea(f);
            result = { value: `t${temp}`, type: Type.NUMBER };
        }
        else if (this.type == ArithmeticOption.BY) {
            let temp = generator.solicitarTemporal();
            let f = `t${temp} = ${leftValue.value} * ${rightValue.value}`
            generator.agregarLinea(f);
            result = { value: `t${temp}`, type: Type.NUMBER };
        }
        else if (this.type == ArithmeticOption.MOD) {
            result = { value: (leftValue.value % rightValue.value), type: Type.NUMBER };
        }
        else if (this.type == ArithmeticOption.POW) {
            result = { value: (leftValue.value ** rightValue.value), type: Type.NUMBER };
        }
        else {
            if (rightValue.value == 0) {
                throw new Err(this.line, this.column, "Semantico", "No se puede dividir entre 0");
            }
            result = { value: (leftValue.value / rightValue.value), type: Type.NUMBER };
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