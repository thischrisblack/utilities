/**
* Recursively compare objects to find out which properties are different
* @param obj1 The first object
* @param obj2 The second object
* @returns {key: value} An object showing the keys and values of props that differ between the two objects
*/
export const objectDifferenceByKey = (obj1: any, obj2: any): {} | { key: string; value: string } => {
   // Strict null check here because we want to know if something is undefined
   if (obj1 === null || obj2 === null) {
       return {};
   }
   const clonedObj1 = JSON.parse(JSON.stringify(obj1));
   const clonedObj2 = JSON.parse(JSON.stringify(obj2));
   const resultOneToTwo = Object.keys(clonedObj1).reduce((acc, key) => {
       if (typeof clonedObj1[key] === 'object' && typeof clonedObj2[key] === 'object') {
           return {
               ...acc,
               [key]: objectDifferenceByKey(clonedObj1[key], clonedObj2[key])
           };
       }
       if (clonedObj1[key] !== clonedObj2[key]) {
           return {
               ...acc,
               [`Object 1: ${key}`]: clonedObj1[key],
               [`Object 2: ${key}`]: clonedObj2[key]
           };
       }
       return acc;
   }, {});

   // Find props that exist on obj2 but not on obj1
   const resultTwoToOne = Object.keys(clonedObj2).reduce((acc, key) => {
       if (typeof clonedObj2[key] === 'object' && typeof clonedObj1[key] === 'object') {
           return {
               ...acc,
               [key]: objectDifferenceByKey(clonedObj1[key], clonedObj2[key])
           };
       }
       if (clonedObj2[key] !== clonedObj1[key]) {
           return {
               ...acc,
               [`Object 2: ${key}`]: clonedObj2[key],
               [`Object 1: ${key}`]: clonedObj1[key]
           };
       }
       return acc;
   }, {});

   return removeEmptyResults({ ...resultOneToTwo, ...resultTwoToOne });
};

// Recursively remove result object keys where the value is {}
function removeEmptyResults(obj: any): any {
   if (obj == null) {
       return null;
   }
   Object.keys(obj).forEach(key => {
       if (obj[key] != null && typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
           // eslint-disable-next-line no-param-reassign
           delete obj[key];
       } else if (typeof obj[key] === 'object') {
           removeEmptyResults(obj[key]);
       }
   });
   return obj;
}