%{
    const {Err} = require('../err');
    const {errores} = require('../Errores');



    function sr(a){
        var m = "";
        for (i = 0; i < a.length; i++) {
            m += a[i] + " ";
        }
        return m;
    }

    function desanidar(m){
        var res = "";
        var res2 = "";
        var mx = [];
        var op = [];

        for (i = 0; i < m.length; i++) {
            res = m[i].substr(0,8);
            if(res == "function"){
                mx.push(m[i]);
            }else{
                op.push(m[i]);
            }
        }

        res = "";
        res2 = "";

        for (i = 0; i < mx.length; i++) {
            res += mx[i];
        }

        for (i = 0; i < op.length; i++) {
            res2 += op[i];
        }

        return [res, res2];
    }

    function formater(s){
        var m = "";
        for (i = 0; i < s.length; i++) {
            m += s[i]+"\n";
        }
        return m;
    }

%}

%lex
%options case-insensitive
number  [0-9]+
decimal {number}[.]{number}
string  (\"[^"]*\")
string2  (\'[^"]*\')
%%
\s+                   /* skip whitespace */
[/][/].*                                {}  //una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	    {} //multilinea
{decimal}               return 'DECIMAL'
{number}                return 'NUMBER'
{string}                return 'STRING'
{string2}               return 'STRING'
"**"                     return '**'
"*"                     return '*'
"/"                     return '/'
";"                     return ';'
","                     return ','
"-"                     return '-'
"+"                     return '+'
"."                     return '.'
"%"                     return '%'

"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='
":"                   return ':'


"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"if"                    return 'IF'
"else"                  return 'ELSE'
"while"                 return 'WHILE'
"print"                 return 'PRINT'
"break"                 return 'BREAK'
"do"                    return 'DO'
"for"                   return 'FOR'
"switch"                return 'SWITCH'
"case"                  return 'CASE'
"default"               return 'DEFAULT'
"continue"              return 'CONTINUE'
"return"                return 'RETURN'
"console"               return 'CONSOLE'
"log"                   return 'LOG'
"function"              return 'FUNCTION'

"let"                   return 'LET'
"const"                 return 'CONST'
"var"                   return 'VAR'
"true"                  return 'TRUE'
"false"                 return 'FALSE'

/*value types*/
"string"                return "T_STRING"
"number"                return "T_NUMBER"
"boolean"               return "T_BOOLEAN"
"void"                  return "T_VOID"
"graficar_ts"           return "GP_TS"


([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>		                return 'EOF'
.                       { errores.push(new Err(yylloc.first_line, yylloc.first_column, 'lexico', yytext+" no pertenece al lenguaje")); }

/lex

%left '!'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'

%start Startup 

%%

Startup
    : Instructions EOF{
        return [formater($1), errores];
    }
;

Instructions
    : Instructions instruction {$1.push($2); $$ = $1;}
    | instruction {$$=[$1];}
;

instruction
    : statIf           { $$ = $1; }
    | statWhile        { $$ = $1; }
    | statDo           { $$ = $1; }
    | statFor          { $$ = $1; }
    | statSwitch       { $$ = $1; }
    | statBreak        { $$ = $1; }
    | statContinue     { $$ = $1; }
    | statConsole      { $$ = $1; }
    | statFunc         { $$ = $1; }
    | statGraph        { $$ = $1; }
    | statConsole      { $$ = $1; }
    | statCall         { $$ = $1; }
    | statIncremento   { $$ = $1; }
    | varDefinition    { $$ = $1; }
    | statReturn       { $$ = $1; }
    | varAsig          { $$ = $1; }
    | unarOpr          { $$ = $1; }
    | error ';'        { errores.push(new Err(this._$.first_line, this._$.first_column, 'Sintactico', yytext)) ;  }

;

statReturn
    : RETURN genExpr ';'    { $$ = sr([$1,$2,$3])+"\n";}
    | RETURN  ';'           { $$ = sr([$1,$2])+"\n";}
;

varDefinition
    : LET ID '=' genExpr ';'    {$$ = sr([$1,$2,$3,$4,$5]);}
    | CONST ID '=' genExpr ';'  {$$ = sr([$1,$2,$3,$4,$5]);}
    | LET ID ';'                {$$ = sr([$1,$2,$3]);}
    | LET ID ':' typeVar '=' genExpr  ';'{$$ = sr([$1,$2,$3,$4,$5,$6,$7]);}
    | CONST ID ':' typeVar '=' genExpr ';'  {$$ = sr([$1,$2,$3,$4,$5,$6,$7]);}
;


varAsig
    : ID '=' genExpr ';' {$$ = sr([$1,$2,$3,$4]);}
;

statGraph
    : GP_TS '(' ')' ';' { $$ = sr([$1,$2,$3,$4]); }
;
statIf
    : IF '(' genExpr ')' '{' Instructions '}' moreIf 
    {
        $$ = sr([$1,$2,$3,$4,$5+"\n", formater($6)+"\n",$7+"\n",$8]);
    }
;

moreIf
    : ELSE '{' Instructions '}'     {$$=sr([$1,$2+"\n",formater($3)+"\n",$4+"\n"]);}
    | ELSE statIf                   {$$=sr([$1,$2]);}
    | /* empty */                   {$$="";}
;

statWhile 
    : WHILE '(' genExpr ')' '{' Instructions '}' { $$ = sr([$1,$2,$3,$4,$5+"\n",formater($6)+"\n",$7]); }
;

statDo
    : DO '{' Instructions '}' WHILE '(' genExpr ')' ';'  { $$ = sr([$1,$2+"\n",formater($3)+"\n",$4,$5,$6,$7,$8,$9+"\n"]); }
;

statFor
    : FOR '(' forVariant ')' '{' Instructions '}' { $$ = sr([$1,$2,$3,$4,$5+"\n",formater($6),$7+"\n"]); }
;

forVariant
    : varFor ';' genExpr ';' pasoFor    { $$ = sr([$1,$2,$3,$4,$5]); }
;

pasoFor
    : ID '+''+'         { $$ = sr([$1,$2,$3]); }
    | ID '-''-'         { $$ = sr([$1,$2,$3]); }
    | ID '=' genExpr    { $$ = sr([$1,$2,$3]); }
;


varFor
    : LET ID '=' genExpr    { $$ = sr([$1,$2,$3,$4]);}
    | ID '=' genExpr        { $$ = sr([$1,$2,$3]); }
;

unarOpr
    : ID '+''+'';' { $$ = $1+$2+$3+$4; }
    | ID '-''-'';' { $$ = $1+$2+$3+$4; }
;

statSwitch
    : SWITCH '(' genExpr ')' '{' swCases '}'  { $$ = sr([$1,$2,$3,$4,$5+"\n",formater($6)+"\n",$7+"\n"]);}
;

/*fix pusher*/
swCases 
    : swCases swCase {$1.push($2); $$=$1;}
    | swCase {$$=[$1];}
;

swCase
    : CASE genExpr ':'  Instructions  { $$ = sr([$1,$2,$3+"\n",formater($4)+"\n"]); }
    | DEFAULT ':'  Instructions  { $$ = sr([$1,$2+"\n",formater($3)+"\n"]); } 
;

statBreak 
    : BREAK ';' { $$ = sr([$1,$2]); }
;

statContinue
    : CONTINUE ';' { $$ = sr([$1,$2]); }
;

/* here comes the magic */
statFunc 
    : FUNCTION ID '(' paramsFunc ')'  '{' Instructions '}'  
    {
        $$ = sr([$1,$2,$3,$4,$5,$6+"\n",desanidar($7)[1],$8+"\n", desanidar($7)[0]]);
    }
;

paramsFunc
    : paramsFunc ',' tpf    { $$ = sr([$1,$2,$3]); }
    | tpf                   { $$ = $1; }
    | /* empty */           { $$ = " "; }
;

tpf
    : ID ':' typeVar{ $$ = sr([$1,$2,$3]); }
;

typeReturn
    : T_VOID    { $$ = $1; }
    | T_NUMBER  { $$ = $1; }
    | T_BOOLEAN { $$ = $1; }
    | T_STRING  { $$ = $1; }
;

typeVar
    : T_NUMBER  { $$ = $1; }
    | T_BOOLEAN { $$ = $1; }
    | T_STRING  { $$ = $1; }
;


statConsole
    : CONSOLE '.' LOG '(' genExpr ')' ';' { $$ = $1 + $2 + $3 + $4 + $5 +$6 + $7; }
;

genExpr 
    : genExpr '+' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '-' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '**' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '*' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '/' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '<=' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '>=' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '<' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '>' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '==' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '!=' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '&&' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '%' genExpr { $$ = $1 + $2 + $3; }
    | genExpr '||' genExpr { $$ = $1 + $2 + $3; }
    | otro { $$ = $1; }
;

otro
    : '(' genExpr ')'   { $$ = $1 + $2 + $3; }
    | NUMBER            { $$ = $1; }
    | DECIMAL           { $$ = $1; }
    | STRING            { $$ = $1; }
    | ID                { $$ = $1; }
    | '-' genExpr       { $$ = $1 + $2; }
    | '!' genExpr       { $$ = $1 + $2; }
    | statCall2          { $$ = $1; }
    | TRUE              {$$=$1;}
    | FALSE             { $$=$1; }
;

statCall2
    : ID '(' ')'           { $$ = $1 + $2 + $3 ; }
    | ID '(' paramsCall ')'  { $$ = $1 + $2 + $3 +$4 ; }
;
statCall 
    : ID '(' ')' ';'           { $$ = $1 + $2 + $3 + $4; }
    | ID '(' paramsCall ')' ';' { $$ = $1 + $2 + $3 +$4 + $5; }
;

paramsCall
    : paramsCall ',' genExpr    { $$ = $1 + $2 + $3; }
    | genExpr                   {$$=$1;}
;
