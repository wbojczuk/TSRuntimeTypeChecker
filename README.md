# TSRuntimeTypeChecker
This powerful tool allows you to check the types of values against predefined templates or primitive types and get a boolean in response.
<br>
While developing applications, TypeScript can be great for enforcing types. But what if you need to validate the types during runtime? If you're recieving unchecked data? That's where this tool would be useful.
<br>
<h1>Syntax</h1>
  <b>typeChecker(value, type);</b> : Returns a boolean depending on whether or not the value is of "type". <br>
  <b>value</b>: is any type and is the value you are checking.<br>
  <b>type</b>: is the type you are checking the value against. More details below... <br><br>
  
<h1>Types</h1>
  <b>Primitives</b>: "undefined", "number", "string", "boolean" <br><br>
  
  <b>Primitive OR Types</b>: "number | string" matches either a number or string<br><br>
  
  <b>All Wildcard</b>: The type "all" will match any type.<br><br>
  
  <b>Array/Object ANY Contents</b>: "array", "object" / or [ ], { }<br><br>
  
  <b>Tuples</b>: Any array template with more than one element specified. EG: ["string", "number"]. Will match an array with exactly 2 elements with the first being a string and the second a number. <br><br>
  
  <b>Non-empty Array</b>: ["string"] matches an array of strings. [ { } ] matches an array of any objects<br><br>
  
  <b>Non-empty Object</b>: <br>
    <b>NOTE</b>: Using JSON Syntax {"property" : "type"} is reccommended to avoid TypeScript Linting Errors.<br><br>
    {"test": "string"} matches an object with only the property <b>test</b> and it is a type of string.<br>
    {"test": ["string"]} matches an object with the property <b>test</b> that contains an array of strings.<br><br>

    <b>"optional?" Property</b>: Including a "?" after the name of a property will make that property optional. EG: {"test?": "number"} is an optional property of type number, but will match even if the property does not exist. It will NOT match if the property exists and is of the wrong type.<br><br>
