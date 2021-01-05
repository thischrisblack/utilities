import { cloneDeep } from 'lodash';

/**
 * Recursively compare objects to find out which properties are different
 * @param obj1 The first object
 * @param obj2 The second object
 * @returns {key: value} An object showing the keys and values of props that differ between the two objects
 * This could be more robust. For example, it won't catch if there is a prop on obj2 that does not exist on obj1.
 * However, it is well suited for quick-and-dirty debugging.
 */
export const debugWhatIsDifferent = (obj1: any, obj2: any): {} | { key: string; value: string } => {
    // Strict null check here because we want to know if something is undefined
    if (obj1 === null || obj2 === null) {
        return {};
    }
    // Clone objects, or else they will be mutated in removeEmptyResults
    // TODO: Refactor removeEmptyResults so it won't mutate!
    const clonedObj1 = cloneDeep(obj1);
    const clonedObj2 = cloneDeep(obj2);
    const result = Object.keys(clonedObj1).reduce((acc, key) => {
        if (typeof clonedObj1[key] === 'object' && typeof clonedObj2[key] === 'object') {
            return {
                ...acc,
                [key]: debugWhatIsDifferent(clonedObj1[key], clonedObj2[key])
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

    return removeEmptyResults(result);
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