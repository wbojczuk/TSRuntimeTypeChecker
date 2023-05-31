function typeChecker(value: any, type: any): boolean{
 
     const primitiveTypeRegex: RegExp = /^(boolean|string|number|undefined)$/i;
     const optionalValRegex: RegExp = /^\S{1,}\?$/;
     // const curType: string = (type.trim()).toLowerCase();
     let mainRetval: boolean = true;
 
     if(type === "object"){
 
         mainRetval = checkObject(value);
 
     }else if(isObject(type)){
 
         if((Object.keys(type)).length > 0){
             mainRetval = checkObject(value, type);
         }else{
             mainRetval = checkObject(value);
         }
 
     }else if(type === "array"){
 
         mainRetval = checkArray(value);
 
     }else if(Array.isArray(type) && type.length <= 1){
 
         if(type.length > 0){
             mainRetval = checkArray(value, type);
         }else{
             mainRetval = checkArray(value);
         }
 
     }else if(type === "tuple" || (Array.isArray(type) && type.length > 1)){
         mainRetval = checkTuple(value, type);
     }else{
             mainRetval = checkPrimitive(value, type);
     }
 
 
     function checkPrimitive(value: any, type: string): boolean{
         let retval: boolean = true;
        //  OR OPERATOR
        if(/[a-z]{1,}\s*\|\s*[a-z]{1,}/i.test(type)){
            let typesRegExpString: string = "";
            const types = type.split("|");
            const typesLength = types.length;

            for(let i = 0; i < typesLength; ++i){
                types[i] = types[i].trim();
                if(!primitiveTypeRegex.test(types[i])){
                    retval = false;
                    throwError(`Bad Type "${types[i]}"`);
                }
                typesRegExpString += (i > 0) ? `|${types[i]}` : types[i];
            }
            const typesRegExp: RegExp = new RegExp(typesRegExpString, "g"); 
            if(!(typesRegExp.test(typeof value))){
                retval = false;
            }
        }else{
            if(primitiveTypeRegex.test(type)){
                if(typeof value != type.toLowerCase()){
                    retval = false;
                }
            }else if(!(type.toLowerCase() == "any")){
                retval = false;
                throwError(`Bad Type "${type}"`);
            }
        }
        
         return retval
     }
 
 
 
     function checkArray(value: any, curTemplate: any = undefined): boolean{
         let retval: boolean = true;
         
         if(Array.isArray(value)){
             if(curTemplate !== undefined){
                 if(curTemplate.length <= 1 && Array.isArray(curTemplate)){
                    
                     const valLength = (value.length === 0) ? 1 : value.length;
                     const newTemplate = curTemplate[0];
                     for(let i = 0; i < valLength; ++i ){
                         
                         if(newTemplate == "array" ||  newTemplate == "tuple"){
                             if(!checkArray(value[i])){retval = false;}
                             
                            }else if(Array.isArray(newTemplate)){
                                
                             
                                 if(newTemplate.length <= 1){
                                     if(!checkArray(value[i],  newTemplate)){retval = false;}
 
                                 }else{
                                     if(!checkTuple(value[i],  newTemplate)){retval = false;}
                                 }
                             
                            }else if(newTemplate == "object"){
 
                                 if(!checkObject(value[i])){retval = false;}
 
                            }else if(isObject(newTemplate)){
 
                             if(!checkObject(value[i],newTemplate)){retval = false;}
                             
                            }else{
                             if(!checkPrimitive(value[i], newTemplate)){retval = false;}
                                 
                             }
                     }
 
                 }else{
                     retval = false;
                     throwError(`Bad Template "${curTemplate}"`);
                 }
 
             }
         }else{
             retval = false;
         }
         return retval
     }
 
 
 
     function checkObject(value: any, curTemplate: any = undefined): boolean{
        
         let retval: boolean = true;
         
         if(isObject(value)){
 
            if(curTemplate !== undefined){
 
             if(isObject(curTemplate)){
 
             const templateKeys = Object.keys(curTemplate);
             const valueKeys = Object.keys(value);
             if(valueKeys.length <= templateKeys.length){
 
             for(let key in curTemplate){
                let templateKey: string = key;
                 
                 if(((value[key] != undefined) || optionalValRegex.test(key))){
                    // CHECK OPTIONAL PROPS
                    
                    if(optionalValRegex.test(key)){
                        
                        templateKey = key;
                        key = key.slice(0,-1);
                        if(value[key] == undefined){
                            value[key] = "undefined";
                            curTemplate[templateKey] = "any";
                        }
                    }
                    if(curTemplate[templateKey] === "array" || curTemplate[templateKey] === "tuple"){
                        
                         if(!checkArray(value[key])){retval = false;}
 
                    }else if(Array.isArray(curTemplate[templateKey])){
                        
                         if(curTemplate[templateKey].length <= 1){
                             if(!checkArray(value[key], curTemplate[templateKey])){retval = false;}
 
                         }else{
                            
                             if(!checkTuple(value[key], curTemplate[templateKey])){retval = false;}
                         }
                     
                    }
                    else if(curTemplate[templateKey] == "object"){
 
                         if(!checkObject(value[key])){retval = false;}
 
                    }else if(isObject(curTemplate[templateKey])){
                     
                     if(!checkObject(value[key], curTemplate[templateKey])){retval = false;}
                     
                    }else{
                     
                     if(!checkPrimitive(value[key], curTemplate[templateKey])){retval = false;}
                         
                     }
 
                 }else{
                     
                     retval = false;
                 }
 
             }
         }else{
             
             retval = false;
         }
     }else{
         
         retval = false;
         throwError(`Bad Template "${curTemplate}"`);
     }
            }
         }else{
             
             retval = false;
         }
         
         return retval
     }
 
     function checkTuple(value: any, curTemplate: any = undefined): boolean{
         let retval: boolean = true;
         if(Array.isArray(value)){
         if(curTemplate !== undefined && Array.isArray(curTemplate)){
 
             let validTemplate: boolean = true;
             if(!Array.isArray(value)){
                 validTemplate = false;
             }
            
             if(validTemplate){
                 if(curTemplate.length == value.length){
 
                     const valLength = value.length;
                     for(let i = 0; i < valLength; ++i ){
                         
                         if( curTemplate[i] == "array" ||  curTemplate[i] == "tuple"){
                             if(!checkArray(value[i])){retval = false;}
                             
                            }else if(Array.isArray(curTemplate[i])){
                             
                             
                                 if(curTemplate[i].length <= 1){
                                     if(!checkArray(value[i],  curTemplate[i])){retval = false;}
                                 }else{
 
                                     if(!checkTuple(value[i],  curTemplate[i])){retval = false;}
                                 }
                             
                            }
                            else if(curTemplate[i] == "object"){
 
                                 if(!checkObject(value[i])){retval = false;}
 
                            }else if(isObject( curTemplate[i])){
                             if(!checkObject(value[i],curTemplate[i])){retval = false;}
                             
                            }else{
                     
                             if(!checkPrimitive(value[i], curTemplate[i])){retval = false;}
                                 
                             }
                     }
 
                 }else{
                     retval = false;
                 }
                 
 
             }else{
                 retval = false;
                 throwError(`Bad Template "${curTemplate}"`);
             }
 
         }else{
             retval = false;
             throwError("Tuple Type Checks Require A Template")
         }
         }else{
             retval = false;
         }
         return retval
     }
 
     
 
 
     // HELPER FUNCS
     function isObject(val: any): boolean{
         return (Object.prototype.toString.call(val) == "[object Object]")? true : false ;
     }
     function throwError(error: string): void{
         console.error(`TypeCheckerError: ${error}`);
     }
     return mainRetval
 }
