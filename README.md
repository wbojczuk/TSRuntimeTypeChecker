# TSRuntimeTypeChecker
This powerful tool allows you to check the types of values against predefined templates or primitive types and get a boolean in response.
<br>
<h1>Syntax</h1>
  <b>typeChecker(value, type);</b> : Returns a boolean depending on whether or not the value is of "type". <br>
  <b>value</b>: is any type and is the value you are checking.<br>
  <b>type</b>: is the type you are checking the value against. More details below... <br><br>
  
<h1>Types</h1>
  <b>Primitives</b>: "undefined", "number", "string", "boolean" <br><br>
  
  <b>Primitive OR Types</b>: "number | string" matches either a number or string<br><br>
  
  <b>Array/Object ANY Contents</b>: "array", "object" / or [ ], { }<br><br>
  
  <b>Tuples</b>: Any array template with more than one element specified. EG: ["string", "number"]. Will match an array with exatcly 2 elements with the first being a string and the second a number. <br><br>
  
  <b>Non-empty Array</b>: ["string"] matches an array of strings. [ { } ] matches an array of any objects<br><br>
