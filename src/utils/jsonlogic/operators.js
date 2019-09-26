"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lodashOperators = void 0;
// Use only immutable useful functions from Lodash.
// Visit https://lodash.com/docs for more info.
var lodashOperators = [// Array
'chunk', 'compact', 'concat', 'difference', 'differenceBy', 'differenceWith', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'findIndex', 'findLastIndex', 'first', 'flatten', 'flattenDeep', 'flattenDepth', 'fromPairs', 'head', 'indexOf', 'initial', 'intersection', 'intersectionBy', 'intersectionWith', 'join', 'last', 'lastIndexOf', 'nth', 'slice', 'sortedIndex', 'sortedIndexBy', 'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexBy', 'sortedLastIndexOf', 'sortedUniq', 'sortedUniqBy', 'tail', 'take', 'takeRight', 'takeRightWhile', 'takeWhile', 'union', 'unionBy', 'unionWith', 'uniq', 'uniqBy', 'uniqWith', 'unzip', 'unzipWith', 'without', 'xor', 'xorBy', 'xorWith', 'zip', 'zipObject', 'zipObjectDeep', 'zipWith', // Collection
'countBy', 'every', 'filter', 'find', 'findLast', 'flatMap', 'flatMapDeep', 'flatMapDepth', 'groupBy', 'includes', 'invokeMap', 'keyBy', 'map', 'orderBy', 'partition', 'reduce', 'reduceRight', 'reject', 'sample', 'sampleSize', 'shuffle', 'size', 'some', 'sortBy', // Date
'now', // Function
'flip', 'negate', 'overArgs', 'partial', 'partialRight', 'rearg', 'rest', 'spread', // Lang
'castArray', 'clone', 'cloneDeep', 'cloneDeepWith', 'cloneDeep', 'conformsTo', 'eq', 'gt', 'gte', 'isArguments', 'isArray', 'isArrayBuffer', 'isArrayLike', 'isArrayLikeObject', 'isBoolean', 'isBuffer', 'isDate', 'isElement', 'isEmpty', 'isEqual', 'isEqualWith', 'isError', 'isFinite', 'isFunction', 'isInteger', 'isLength', 'isMap', 'isMatch', 'isMatchWith', 'isNaN', 'isNative', 'isNil', 'isNull', 'isNumber', 'isObject', 'isObjectLike', 'isPlainObject', 'isRegExp', 'isSafeInteger', 'isSet', 'isString', 'isSymbol', 'isTypedArray', 'isUndefined', 'isWeakMap', 'isWeakSet', 'lt', 'lte', 'toArray', 'toFinite', 'toInteger', 'toLength', 'toNumber', 'toPlainObject', 'toSafeInteger', 'toString', // Math
'add', 'ceil', 'divide', 'floor', 'max', 'maxBy', 'mean', 'meanBy', 'min', 'minBy', 'multiply', 'round', 'subtract', 'sum', 'sumBy', // Number
'clamp', 'inRange', 'random', // Object
'at', 'entries', 'entriesIn', 'findKey', 'findLastKey', 'functions', 'functionsIn', 'get', 'has', 'hasIn', 'invert', 'invertBy', 'invoke', 'keys', 'keysIn', 'mapKeys', 'mapValues', 'omit', 'omitBy', 'pick', 'pickBy', 'result', 'toPairs', 'toPairsIn', 'transform', 'values', 'valuesIn', // String
'camelCase', 'capitalize', 'deburr', 'endsWith', 'escape', 'escapeRegExp', 'kebabCase', 'lowerCase', 'lowerFirst', 'pad', 'padEnd', 'padStart', 'parseInt', 'repeat', 'replace', 'snakeCase', 'split', 'startCase', 'startsWith', 'toLower', 'toUpper', 'trim', 'trimEnd', 'trimStart', 'truncate', 'unescape', 'upperCase', 'upperFirst', 'words', // Util
'cond', 'conforms', 'constant', 'defaultTo', 'flow', 'flowRight', 'identity', 'iteratee', 'matches', 'matchesProperty', 'method', 'methodOf', 'nthArg', 'over', 'overEvery', 'overSome', 'property', 'propertyOf', 'range', 'rangeRight', 'stubArray', 'stubFalse', 'stubObject', 'stubString', 'stubTrue', 'times', 'toPath', 'uniqueId'];
exports.lodashOperators = lodashOperators;