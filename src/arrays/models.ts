export type Mapper<Input,Output> = (input: Input) => Output
export type Filter<Input> = (input: Input) => unknown