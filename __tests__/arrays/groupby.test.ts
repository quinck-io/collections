import '../../src/arrays'

test('Groupby returns a Map', () => {
    const numberOfPeople = 5
    const numberOfTransactionsPerPerson = 3
    const transactions = Array.from({length:numberOfPeople},(_,i) => i)
        .flatMap(personId => Array.from({length:numberOfTransactionsPerPerson},(_,i) => i)
            .map(transactionId => ({personId,transactionId}))
        )
    const transactionsByPerson = transactions.groupby(
        ({personId}) => personId,
        ({transactionId}) => [transactionId],
        (a,b) => a.concat(b)
    )
    expect(transactionsByPerson).toBeInstanceOf(Map)
})