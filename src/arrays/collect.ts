import { Filter, Mapper } from './models'

export type Case<T,NewType> = [Filter<T>,Mapper<T,NewType>]

declare global {
  interface Array<T> {
    /**
     * Perform filter and map operations in a unique one.
     * @param filter used to identify the items to be mapped with the matched function
     * @param matchedMapper used to map the items when the filter is satisfied
     * @param otherwiseMapper if specified mpas the items that does not satisfy the filter, if not specified these items will be discarded
     * @returns a new Array with the resulting items
     */
    collect<NewType>(filter: Filter<T>, matchedMapper: Mapper<T,NewType>, otherwiseMapper?: Mapper<T,NewType>): Array<NewType>

    /**
     * Perform filter and map operations in a unique one accepting multiple filter cases.
     * @param matchCases if a condition is satisfied the associeted mapping function is applied, if no condition is satisfied the element will be discarded
     * @returns a new RichArray with the resulting items
     */
    multipleCollect<NewType>(matchCases: Case<T,NewType>[], otherwiseMapper?: Mapper<T,NewType>): Array<NewType>
  }
}


Array.prototype.collect = function <T,NewType>(
    filter: Filter<T>,
    matchedMapper: Mapper<T,NewType>,
    otherwiseMapper?: Mapper<T,NewType>
): Array<NewType> {
    const _self = this as Array<T>
    if (otherwiseMapper)
        return _self.map(item => filter(item) ? matchedMapper(item) : otherwiseMapper(item))
    
    return _self.flatMap(item => filter(item) ? matchedMapper(item) : [])
}

Array.prototype.multipleCollect = function <T,NewType>(
    matchCases: Case<T,NewType>[],
    otherwiseMapper?: Mapper<T,NewType>
): Array<NewType> {
    const _self = this as Array<T>

    const otherwiseFunction = otherwiseMapper || (() => [])
    const otherwiseCase: Case<T,NewType|never[]> = [() => true, otherwiseFunction]

    return _self.flatMap(item => {
        const [,matchedMapper] = matchCases.find(([filter]) => filter(item)) || otherwiseCase
        return matchedMapper(item)
    })
}