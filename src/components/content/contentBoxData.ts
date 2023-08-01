type contentBoxDataType = {code: string, text: string}[]

export const contentBoxData: contentBoxDataType = [
    {
        code: `typeChecker(10, "number"); \r\r// Ouputs false`,
        text: "It’s extremely easy to use. One call to the typeChecker function and two parameters will return a boolean respresenting if the data is the way it should be."
    },
    {
        code: `//Primitive Types\r"string", "boolean", "number", "undefined"\r\r//Complex Types\r"object", "array", "tuple"`,
        text: "Many different data types are supported including undefined values, strings, booleans, numbers, arrays, objects, and tuples."
    }
]