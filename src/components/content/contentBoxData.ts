type contentBoxDataType = {code: string, text: string}[]

export const contentBoxData: contentBoxDataType = [
    {
        code: `typeChecker(10, "number"); \r\r// Ouputs true\r\r\rtypeChecker("hello", "boolean"); \r\r// Outputs false`,
        text: "It’s extremely easy to use. One call to the typeChecker function and two parameters will return a boolean respresenting if the data is the way it should be."
    },
    {
        code: 
`// Data Type                 Representation

 String:                         "string"

 Number:                      "number"

 Boolean:                      "boolean"

 Undefined:                   "undefined"

 Any_Value:                   "all"

 Empty_Arrays:              [  ] or "array"

 Non_Empty_Arrays:     [ "type" ]

 Tuples:                         [ "type", "type" ]
 
 Empty_Objects:           { } or "object"
 
 Non_Empty_Objects:   {"prop": "type"}
    `,
    
        text: "Many different data types are supported including undefined values, strings, booleans, numbers, arrays, objects, and tuples. Also the \"all\" type that matches any value. The visual display on the left shows how to represent different data types and templates."
    },
    {
        code: `const template = {
            "name": "string",
            "age": "number",
            "friendData": [ 
                {
                    "name": "string",
                    "age": "number"
                }
             ]
        };
        
        typeChecker(value, template);`,
        text: "Supports templates to check objects against. Great for validating data received from the client or an API on the server-side. The script will check as deep as the object goes."
    },
    {
        code: `// Optional Object Property

const template = {
    "prop?": "boolean"
};
            

// Multiple Allowed Types

const type = "string | number";

typeChecker(value, type);`,
        text: "You can also specify two or more primitive types that a value can be by seperating multiple values with \"|\". Or specify an object property that is optional by adding a \"?\" to the end of a property name."
    }
]