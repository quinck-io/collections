export type GroupByMergeFunction<V> = (a: V, b: V) => V
export type Mapper<Input,Output> = (input: Input) => Output