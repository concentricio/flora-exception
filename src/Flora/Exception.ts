import { Append, IsArray, Not, Or, query, Reduce} from "faunadb";
const {
    Var,
    Select,
    If, 
    IsObject,
    ContainsPath,
    Equals, 
    Filter,
    Lambda,
    And
} = query;

export const isFloraException = "isFloraException";
export interface FloraExceptionI {
    location ? : string,
    name : string,
    msg : string,
    at ? : FloraExceptionI[],
    stack ? : FloraExceptionI[]
    [isFloraException] : true
}

/**
 * 
 * @param args 
 * @returns 
 */
export const FloraException = (args ? : {
    name ? : string,
    at ? : FloraExceptionI[],
    location ? : string
    msg ? : string,
    stack ? : FloraExceptionI[]
}) : FloraExceptionI=>{
    return {
        name : args && args.name ? args.name : "FloraException",
        msg : args && args.msg ? args.msg : "None",
        at : args && args.at ? args.at : [],
        location : args && args.location ? args.location : "None", 
        stack : args && args.stack ? args.stack : [],
        [isFloraException] : true
    } as FloraExceptionI
}

/**
 * Checks if object is an Exception on Flora.
 * @param expr 
 * @returns 
 */
export const IsException = (expr : query.ExprArg) : boolean=>{
    return If(
        And(
            Not(IsArray(expr)),
            IsObject(expr)
        ),
        If(
            ContainsPath(isFloraException, expr),
            Equals(
                Select(isFloraException, expr),
                true
            ),
            false
        ),
        false
    ) as boolean
}

const agg = "agg";
const el = "el";
export const ContainsException = (exprs : query.ExprArg) : boolean=>{
    return Reduce(
        Lambda(
            [agg, el],
            Or(
                Var(agg),
                IsException(Var(el))
            )
        ),
        false,
        exprs
    ) as boolean
}

export const GetExceptions = (exprs : any[]) : FloraExceptionI[]=>{

    return Reduce(
        Lambda(
            [agg, el],
            If(
                IsException(Var(el)),
                Append([Var(el)], Var(agg)),
                Var(agg)
            )
        ),
        [],
        exprs
    ) as FloraExceptionI[]
}