type contentBoxDataType = {code: string, text: string}[]

export const contentBoxData: contentBoxDataType = [
    {
        code: `typeChecker(10, "number"); \r\r// Ouputs true\r\r\rtypeChecker("hello", "boolean"); \r\r// Outputs false`,
        text: "It’s extremely easy to use. One call to the typeChecker function and two parameters will return a boolean respresenting if the data is the way it should be."
    },
    {
        code: `// Primitive Types\r"string", "boolean", "number", "undefined"\r\r// Complex Types\r"object", "array", "tuple"\r\r// Additional Types\r "all"`,
        text: "Many different data types are supported including undefined values, strings, booleans, numbers, arrays, objects, and tuples. Also the \"all\" type that matches any value."
    },
    {
        code: `const template = {
            "name": "string",
            "age": "number",
            "friendNames": ["string"]
        }
        
        typeChecker(value, template);`,
        text: "Supports templates to check complex types against like arrays, objects, and tuples. Great for validating data received on the server-side"
    },
    {
        code: ``,
        text: ""
    }
]