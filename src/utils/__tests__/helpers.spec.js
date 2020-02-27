import { addZero, getTime, headerNavigationOptions } from '../helpers';

describe("Test Helper functions", () => {
    test("AddZero Function", () => {
        const result = addZero(0)
        const result2 = addZero(12)
        const expected = '00'
        const expected2 = '12'
        expect(result).toEqual(expected)
        expect(result2).toEqual(expected2)
    })

    test("getTime Function", () => {
        const result = getTime(0)
        const expected = '00:00'
        expect(result).toEqual(expected)
    })

    test("headerNavigationOptions Function", () => {
        const result = headerNavigationOptions("PomoTodo")
        const expected = {
            headerTitle: "PomoTodo",
            headerStyle: {
                backgroundColor: '#009DDD'
            },
            headerTintColor: '#fff'
        }
        expect(result).toEqual(expected)
    })
})