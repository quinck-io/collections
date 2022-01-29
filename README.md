# collections
Allows extra operations on JavaScript collections: Array, Map and Set.

## Overview
The operations are inspired from the Scala collection framework and aims to provide a simple way to perform operations like collect using match cases.

## Installation
`npm i @quinck/collections`

## Tests
`npm run test`

## Features
In this section will be presented the implemented operations.

| Collection | Operation | Description |
| -------- | -------- | -------- |
| `Array` | `groupBy` | Perform a group by operation, allowing to create a `Map` from an `Array`. The user has only to specify a function to obtain a the key from an element of the `Array`. It also allow to transform each element in a new element letting the user specifying a function to evaluate the new values. The resulting map will contain the different keys generated |
| `Array` | `groupByToDictionary` | Similar to the `groupBy`, but instead of a Map this will create an object. The created object will have as keys all the different keys generated. |
| `Array` | `simpleGroupBy` | Simplified version of the `groupBy`, this operation will not allow to specify a mapper function for the values. In this case for each key will be generated and `Array` of values referring to that key. |
| `Array` | `simpleGroupByToDictionary` | Simplified version of the `groupByToDictionary`, this operation will not allow to specify a mapper function for the values. In this case for each key will be generated and `Array` of values referring to that key. |
| `Array` | `collect` | This operation tries to perform the `collect` operation of the Scala collection framework. It performs `Array.filter` and `Array.map` operations in a single operation (browsing the elements of the array once). It allow to specify a filter and a mapper function. The elements that match the filter will be kept and the others will be discarded. Moreover as in Scala also here is possible to specify the default case that will take care of the elements that didn't matched the filter. |
| `Array` | `multipleCollect` | This operation extends the `collect`. The collect only allows to specify a single `MatchCase` (defining `MatchCase` as a pair of filter and mapper). As in Scala is possible to use the `match` construct, the `multipleCollet` allows to specify an ordered `Array` of `MatchCase`. Starting from the first to the last `MatchCase`, if an element of the `Array` satisfy the filter the relative mapper will be applied. As in Scala only the first successful case will be cosidered. Moreover as in the `collect` is possible to specify the default case specifying teh relative mapper. |
| `Map` | `toArray` | `Map` objects in JavaScript (or Typescript) are not really 'array-friendly'. In fact in order to obtain an `Array` having a `Map` you have to get all the entries, using `map.entries()`, and then creating an `Array` (i.e. using `Array.from`). This way does not allow to have a fluent code, so in order to achieve this the additional method `Map.toArray` transform a `Map` in an `Array` where each element is a pair of a key and the relative value. Doing this way is possible to have a fluent code.|

## Usage
In this section will be showed some examples.

### Array

#### GroupBy
```[javascript]
const students = [
    {
        studentClass = "A",
        studentGrade = 9,
        studentName = "Earvin"
    },
    {
        studentClass = "A",
        studentGrade = 10,
        studentName = "Michael"
    },
    {
        studentClass = "B",
        studentGrade = 9,
        studentName = "James"
    },
    {
        studentClass = "B",
        studentGrade = 10,
        studentName = "Kobe"
    },
    {
        studentClass = "B",
        studentGrade = 9,
        studentName = "Stephen"
    }
]

/* Lets find the best student per each class */

const bestStudents = students.groupBy(
    /* group by student class */
    ({studentClass}) => studentClass,
    student => student,
    /*
     * merge elements of the same group,
     * in this case take the higher studentGrade
     */
    (a,b) => a.studentGrade > b.studentGrade ? a : b
)

/*
bestStudents will contain:
A => {
        studentClass = "A",
        studentGrade = 10,
        studentName = "Michael"
    }
B => {
        studentClass = "B",
        studentGrade = 10,
        studentName = "Kobe"
    }
*/

```
#### Collect
```[javascript]
const students = [
    {
        studentClass = "A",
        studentGrade = 9,
        studentName = "Earvin"
    },
    {
        studentClass = "A",
        studentGrade = 10,
        studentName = "Michael"
    },
    {
        studentClass = "B",
        studentGrade = 9,
        studentName = "James"
    },
    {
        studentClass = "B",
        studentGrade = 10,
        studentName = "Kobe"
    },
    {
        studentClass = "B",
        studentGrade = 9,
        studentName = "Stephen"
    },
    {
        studentClass = "B",
        studentGrade = 5,
        studentName = "Kevin"
    }
]

/* Lets the students names of the class A */

const classAStudentsNames = students.collect(
    ({studentClass}) => studentClass === "A",
    ({studentName}) => studentName
)

/*
classAStudentsNames will be:
["Earvin","Michael"]
*/

/* Lets perform this operations:
give a scholarship to students with grade equals to 10
pass students with a grade greater than or equals to 6
fail other students
*/

const studentsWithStatus = students.multipleCollect([
    [
        ({studentGrade}) => studentGrade === 10,
        student => ({...student, status: "scholarship"})
    ],
    [
        ({studentGrade}) => studentGrade >= 6,
        student => ({...student, status: "pass"})
    ]
], student => ({...student, status: "fail"})
)

/*
studentsWithStatus will be:
[
    {
        studentClass = "A",
        studentGrade = 9,
        studentName = "Earvin",
        status: "pass"
    },
    {
        studentClass = "A",
        studentGrade = 10,
        studentName = "Michael",
        status: "scholarship"
    },
    ...
    {
        studentClass = "B",
        studentGrade = 5,
        studentName = "Kevin",
        status: "fail"
    }
]
*/

```

### Map

#### toArray
```[javascript]
const map = new Map([1,10],[2,20],[3,30])

const result = map.toArray() /* [[1,10],[2,20],[3,30]] */
    .filter(([key]) => key > 2) /* [[3,30]] */
```

### Mixing
```[javascript]
const map = new Map([1,10],[2,20],[3,30])

const result = map.toArray() /* [[1,10],[2,20],[3,30]] */
    .collect(
        ([key]) => key > 2,
        ([,value]) => [value],
        (a,b) => a.concat(b)
    )
/*
result = [30]
*/
```

## Contact
* Quinck: info@quinck.io
* Stefano Righini: stefano.righini@quinck.io