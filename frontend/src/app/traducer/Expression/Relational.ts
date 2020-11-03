import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";
import { Environment } from "../Symbol/Environment";
import * as generator from "../final/generator";

export enum RelationalOption {
    EQUAL,
    NOTEQUAL,
    LESS,
    LESSOREQUAL,
    GREATER,
    GREATEROREQUAL,
    AND,
    OR,
    NOT
}

export class Relational extends Expression {

    constructor(private left: Expression, private right: Expression, private type: RelationalOption, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        if (this.type == RelationalOption.EQUAL) {
            let gt1 = generator.solicitarGoto();//verdadero
            let gt2 = generator.solicitarGoto();//falso
            let s1 = generator.solicitarTemporal();//return
            let a1 = `if(${leftValue.value} == ${rightValue.value}){\ngoto L${gt1};\n}`;
            let a2 = `t${s1} = 0;`;
            let a3 = `goto S${gt2};`;
            let a4 = `L${gt1}:`;
            let a5 = `t${s1} = 1;`;
            let a6 = `S${gt2}:`;
            generator.agregarLinea(a1);
            generator.agregarLinea(a2);
            generator.agregarLinea(a3);
            generator.agregarLinea(a4);
            generator.agregarLinea(a5);
            generator.agregarLinea(a3);//salida fija
            generator.agregarLinea(a6);
            return { value: `t${s1}`, type: Type.TEMPORAL };
        }
        else if (this.type == RelationalOption.NOTEQUAL) {
            let gt1 = generator.solicitarGoto();//verdadero
            let gt2 = generator.solicitarGoto();//falso
            let s1 = generator.solicitarTemporal();//return
            let a1 = `if(${leftValue.value} != ${rightValue.value}){\ngoto L${gt1};\n}`;
            let a2 = `t${s1} = 0;`;
            let a3 = `goto S${gt2};`;
            let a4 = `L${gt1}:`;
            let a5 = `t${s1} = 1;`;
            let a6 = `S${gt2}:`;
            generator.agregarLinea(a1);
            generator.agregarLinea(a2);
            generator.agregarLinea(a3);
            generator.agregarLinea(a4);
            generator.agregarLinea(a5);
            generator.agregarLinea(a3);//salida fija
            generator.agregarLinea(a6);
            return { value: `t${s1}`, type: Type.TEMPORAL };
        }
        else if (this.type == RelationalOption.LESS) {
            let gt1 = generator.solicitarGoto();//verdadero
            let gt2 = generator.solicitarGoto();//falso
            let s1 = generator.solicitarTemporal();//return
            let a1 = `if(${leftValue.value} < ${rightValue.value}){\ngoto L${gt1};\n}`;
            let a2 = `t${s1} = 0;`;
            let a3 = `goto S${gt2};`;
            let a4 = `L${gt1}:`;
            let a5 = `t${s1} = 1;`;
            let a6 = `S${gt2}:`;
            generator.agregarLinea(a1);
            generator.agregarLinea(a2);
            generator.agregarLinea(a3);
            generator.agregarLinea(a4);
            generator.agregarLinea(a5);
            generator.agregarLinea(a3);//salida fija
            generator.agregarLinea(a6);
            return { value: `t${s1}`, type: Type.TEMPORAL };
        }
        else if (this.type == RelationalOption.LESSOREQUAL) {
            let gt1 = generator.solicitarGoto();//verdadero
            let gt2 = generator.solicitarGoto();//falso
            let s1 = generator.solicitarTemporal();//return
            let a1 = `if(${leftValue.value} <= ${rightValue.value}){\ngoto L${gt1};\n}`;
            let a2 = `t${s1} = 0;`;
            let a3 = `goto S${gt2};`;
            let a4 = `L${gt1}:`;
            let a5 = `t${s1} = 1;`;
            let a6 = `S${gt2}:`;
            generator.agregarLinea(a1);
            generator.agregarLinea(a2);
            generator.agregarLinea(a3);
            generator.agregarLinea(a4);
            generator.agregarLinea(a5);
            generator.agregarLinea(a3);//salida fija
            generator.agregarLinea(a6);
            return { value: `t${s1}`, type: Type.TEMPORAL };
        }
        else if (this.type == RelationalOption.GREATER) {
            let gt1 = generator.solicitarGoto();//verdadero
            let gt2 = generator.solicitarGoto();//falso
            let s1 = generator.solicitarTemporal();//return
            let a1 = `if(${leftValue.value} > ${rightValue.value}){\ngoto L${gt1};\n}`;
            let a2 = `t${s1} = 0;`;
            let a3 = `goto S${gt2};`;
            let a4 = `L${gt1}:`;
            let a5 = `t${s1} = 1;`;
            let a6 = `S${gt2}:`;
            generator.agregarLinea(a1);
            generator.agregarLinea(a2);
            generator.agregarLinea(a3);
            generator.agregarLinea(a4);
            generator.agregarLinea(a5);
            generator.agregarLinea(a3);//salida fija
            generator.agregarLinea(a6);
            return { value: `t${s1}`, type: Type.TEMPORAL };
        }
        else if (this.type == RelationalOption.GREATEROREQUAL) {
            let gt1 = generator.solicitarGoto();//verdadero
            let gt2 = generator.solicitarGoto();//falso
            let s1 = generator.solicitarTemporal();//return
            let a1 = `if(${leftValue.value} >= ${rightValue.value}){\ngoto L${gt1};\n}`;
            let a2 = `t${s1} = 0;`;
            let a3 = `goto S${gt2};`;
            let a4 = `L${gt1}:`;
            let a5 = `t${s1} = 1;`;
            let a6 = `S${gt2}:`;
            generator.agregarLinea(a1);
            generator.agregarLinea(a2);
            generator.agregarLinea(a3);
            generator.agregarLinea(a4);
            generator.agregarLinea(a5);
            generator.agregarLinea(a3);//salida fija
            generator.agregarLinea(a6);
            return { value: `t${s1}`, type: Type.TEMPORAL };
        }
        else if (this.type == RelationalOption.AND) {
            const result = leftValue.value && rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.OR) {
            const result = leftValue.value || rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.NOT) {
            const result = ! leftValue.value;
            //console.log(result);
            return { value: result, type: Type.BOOLEAN };
        }
        return { value: 0, type: Type.NUMBER }
    }
}

/**
 * 
 * Este codigo NO participo en plagio con los otros compañeros del curso
 * 
 * pongo esto porque quede traumado con algo asi en el pasado :(    
 * 
 */