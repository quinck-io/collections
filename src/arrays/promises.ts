export {}

import './collect'

export type PromiseError = Error | unknown

declare global {
    interface Array<T> {
        /**
         * Applicable to arrays of promises.
         * Awaits all the promises elements of the array to be fulfilled.
         * @returns the elements of the array awaited
         * @throws {@link Error} if any promise fails
         */
        awaitAll(): Promise<Array<Awaited<T>>>

        /**
         * Applicable to arrays of promises.
         * Awaits all the promises elements of the array to be settled.
         * If a promise fulfills the item will be replaced with its awaited version,
         * if a promise rejects the item will be replaced with the error reported.
         * @returns an array of PromiseSettledResult with both fulfilled and rejected promises elements
         * @throws {@link Error} if any promise fails
         */
        tryToAwaitAll(): Promise<Array<PromiseSettledResult<Awaited<T>>>>

        /**
         * Applicable to arrays of promises.
         * Awaits all the promises elements of the array to be settled,
         * discarding elements that does not fulfills.
         * @returns the elements of the array awaited
         * @throws {@link Error} if any promise fails
         */
        awaitAllFulfilled(): Promise<Array<Awaited<T>>>

        /**
         * Applicable to arrays of promises.
         * Awaits all the promises elements of the array to be settled,
         * taking only the rejected.
         * @returns the elements of the array awaited
         * @throws {@link Error} if any promise fails
         */
        awaitAllRejected(): Promise<Array<PromiseError>>
    }
}

Array.prototype.awaitAll = async function <T>(): Promise<Array<Awaited<T>>> {
    const _self = this as Array<T>
    return Promise.all(_self)
}

Array.prototype.tryToAwaitAll = async function <T>(): Promise<
    Array<PromiseSettledResult<Awaited<T>>>
> {
    const _self = this as Array<T>
    return Promise.allSettled(_self)
}

Array.prototype.awaitAllFulfilled = async function <T>(): Promise<
    Array<Awaited<T>>
> {
    const _self = this as Array<T>
    return (await Promise.allSettled(_self)).singleCollect(
        ({ status }) => status === 'fulfilled',
        result => (result as PromiseFulfilledResult<Awaited<T>>).value,
    )
}

Array.prototype.awaitAllRejected = async function <T>(): Promise<
    Array<PromiseError>
> {
    const _self = this as Array<T>
    return (await Promise.allSettled(_self)).singleCollect(
        ({ status }) => status === 'rejected',
        result => (result as PromiseRejectedResult).reason,
    )
}
