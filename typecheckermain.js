"use strict";

function typeChecker(value, type) {
    var localValue = JSON.parse(JSON.stringify(value));
    var primitiveTypeRegex = /^(boolean|string|number|undefined)$/i;
    var optionalValRegex = /^\S{1,}\?$/;
    var mainRetval = true;
    if (type === "object") {
        mainRetval = checkObject(localValue);
    }
    else if (isObject(type)) {
        if ((Object.keys(type)).length > 0) {
            mainRetval = checkObject(localValue, type);
        }
        else {
            mainRetval = checkObject(localValue);
        }
    }
    else if (type === "array") {
        mainRetval = checkArray(localValue);
    }
    else if (Array.isArray(type) && type.length <= 1) {
        if (type.length > 0) {
            mainRetval = checkArray(localValue, type);
        }
        else {
            mainRetval = checkArray(localValue);
        }
    }
    else if (type === "tuple" || (Array.isArray(type) && type.length > 1)) {
        mainRetval = checkTuple(localValue, type);
    }
    else {
        mainRetval = checkPrimitive(localValue, type);
    }
    function checkPrimitive(localValue, type) {
        var retval = true;
        //  OR OPERATOR
        if (/[a-z]{1,}\s*\|\s*[a-z]{1,}/i.test(type)) {
            var typesRegExpString = "";
            var types = type.split("|");
            var typesLength = types.length;
            for (var i = 0; i < typesLength; ++i) {
                types[i] = types[i].trim();
                if (!primitiveTypeRegex.test(types[i])) {
                    retval = false;
                    throwError("Bad Type \"".concat(types[i], "\""));
                }
                typesRegExpString += (i > 0) ? "|".concat(types[i]) : types[i];
            }
            var typesRegExp = new RegExp(typesRegExpString, "g");
            if (!(typesRegExp.test(typeof localValue))) {
                retval = false;
            }
        }
        else {
            if (primitiveTypeRegex.test(type)) {
                if (typeof localValue != type.toLowerCase()) {
                    retval = false;
                }
            }
            else if (typeof type != "string" || !(type.toLowerCase() == "any")) {
                retval = false;
                throwError("Bad Type \"".concat(type, "\""));
            }
        }
        return retval;
    }
    function checkArray(localValue, curTemplate) {
        if (curTemplate === void 0) { curTemplate = undefined; }
        var retval = true;
        if (Array.isArray(localValue)) {
            if (curTemplate !== undefined) {
                if (curTemplate.length <= 1 && Array.isArray(curTemplate)) {
                    var valLength = (localValue.length === 0) ? 1 : localValue.length;
                    var newTemplate = curTemplate[0];
                    for (var i = 0; i < valLength; ++i) {
                        if (newTemplate == "array" || newTemplate == "tuple") {
                            if (!checkArray(localValue[i])) {
                                retval = false;
                            }
                        }
                        else if (Array.isArray(newTemplate)) {
                            if (newTemplate.length <= 1) {
                                if (!checkArray(localValue[i], newTemplate)) {
                                    retval = false;
                                }
                            }
                            else {
                                if (!checkTuple(localValue[i], newTemplate)) {
                                    retval = false;
                                }
                            }
                        }
                        else if (newTemplate == "object") {
                            if (!checkObject(localValue[i])) {
                                retval = false;
                            }
                        }
                        else if (isObject(newTemplate)) {
                            if (!checkObject(localValue[i], newTemplate)) {
                                retval = false;
                            }
                        }
                        else {
                            if (!checkPrimitive(localValue[i], newTemplate)) {
                                retval = false;
                            }
                        }
                    }
                }
                else {
                    retval = false;
                    throwError("Bad Template \"".concat(curTemplate, "\""));
                }
            }
        }
        else {
            retval = false;
        }
        return retval;
    }
    function checkObject(localValue, curTemplate) {
        if (curTemplate === void 0) { curTemplate = undefined; }
        var retval = true;
        if (isObject(localValue)) {
            if (curTemplate !== undefined) {
                if (isObject(curTemplate)) {
                    var templateKeys = Object.keys(curTemplate);
                    var localValueKeys = Object.keys(localValue);
                    var optionalKeys_1 = templateKeys.map(function (key) {
                        if (!optionalValRegex.test(key)) {
                            return key + "?";
                        }
                        else {
                            return key;
                        }
                    });
                    if (localValueKeys.length <= templateKeys.length) {
                        localValueKeys.forEach(function (key) {
                            if (!optionalKeys_1.includes(key + "?")) {
                                retval = false;
                            }
                        });
                        for (var key in curTemplate) {
                            var templateKey = key;
                            if (((localValue[key] != undefined) || optionalValRegex.test(key))) {
                                // CHECK OPTIONAL PROPS
                                if (optionalValRegex.test(key)) {
                                    templateKey = key;
                                    key = key.slice(0, -1);
                                    if (localValue[key] == undefined) {
                                        localValue[key] = "undefined";
                                        curTemplate[templateKey] = "any";
                                    }
                                }
                                if (curTemplate[templateKey] === "array" || curTemplate[templateKey] === "tuple") {
                                    if (!checkArray(localValue[key])) {
                                        retval = false;
                                    }
                                }
                                else if (Array.isArray(curTemplate[templateKey])) {
                                    if (curTemplate[templateKey].length <= 1) {
                                        if (!checkArray(localValue[key], curTemplate[templateKey])) {
                                            retval = false;
                                        }
                                    }
                                    else {
                                        if (!checkTuple(localValue[key], curTemplate[templateKey])) {
                                            retval = false;
                                        }
                                    }
                                }
                                else if (curTemplate[templateKey] == "object") {
                                    if (!checkObject(localValue[key])) {
                                        retval = false;
                                    }
                                }
                                else if (isObject(curTemplate[templateKey])) {
                                    if (!checkObject(localValue[key], curTemplate[templateKey])) {
                                        retval = false;
                                    }
                                }
                                else {
                                    if (!checkPrimitive(localValue[key], curTemplate[templateKey])) {
                                        retval = false;
                                    }
                                }
                            }
                            else {
                                retval = false;
                            }
                        }
                    }
                    else {
                        retval = false;
                    }
                }
                else {
                    retval = false;
                    throwError("Bad Template \"".concat(curTemplate, "\""));
                }
            }
        }
        else {
            retval = false;
        }
        return retval;
    }
    function checkTuple(localValue, curTemplate) {
        if (curTemplate === void 0) { curTemplate = undefined; }
        var retval = true;
        if (Array.isArray(localValue)) {
            if (curTemplate !== undefined && Array.isArray(curTemplate)) {
                var validTemplate = true;
                if (!Array.isArray(localValue)) {
                    validTemplate = false;
                }
                if (validTemplate) {
                    if (curTemplate.length == localValue.length) {
                        var valLength = localValue.length;
                        for (var i = 0; i < valLength; ++i) {
                            if (curTemplate[i] == "array" || curTemplate[i] == "tuple") {
                                if (!checkArray(localValue[i])) {
                                    retval = false;
                                }
                            }
                            else if (Array.isArray(curTemplate[i])) {
                                if (curTemplate[i].length <= 1) {
                                    if (!checkArray(localValue[i], curTemplate[i])) {
                                        retval = false;
                                    }
                                }
                                else {
                                    if (!checkTuple(localValue[i], curTemplate[i])) {
                                        retval = false;
                                    }
                                }
                            }
                            else if (curTemplate[i] == "object") {
                                if (!checkObject(localValue[i])) {
                                    retval = false;
                                }
                            }
                            else if (isObject(curTemplate[i])) {
                                if (!checkObject(localValue[i], curTemplate[i])) {
                                    retval = false;
                                }
                            }
                            else {
                                if (!checkPrimitive(localValue[i], curTemplate[i])) {
                                    retval = false;
                                }
                            }
                        }
                    }
                    else {
                        retval = false;
                    }
                }
                else {
                    retval = false;
                    throwError("Bad Template \"".concat(curTemplate, "\""));
                }
            }
            else {
                retval = false;
                throwError("Tuple Type Checks Require A Template");
            }
        }
        else {
            retval = false;
        }
        return retval;
    }
    // HELPER FUNCS
    function isObject(val) {
        return (Object.prototype.toString.call(val) == "[object Object]") ? true : false;
    }
    function throwError(error) {
        console.error("TypeCheckerError: ".concat(error));
    }
    return mainRetval;
}
export default typeChecker
