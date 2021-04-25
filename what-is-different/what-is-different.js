/**
 * Recursively compare objects to find out which properties are different.
 *
 * @param obj1 The first object
 * @param obj2 The second object
 * @returns An object showing the keys and values of props that differ between the two objects
 */
const whatIsDifferent = (obj1, obj2) => {
    // Strict null check here because we want to know if something is undefined
    if (obj1 === null || obj2 === null) {
        return {};
    }
    const clonedObj1 = JSON.parse(JSON.stringify(obj1));
    const clonedObj2 = JSON.parse(JSON.stringify(obj2));

    // Find props in obj1 that differ from obj2.
    const resultOneToTwo = compare(clonedObj1, clonedObj2);

    // Find props in obj2 that do not exist in obj1
    const resultTwoToOne = compare(clonedObj2, clonedObj1);

    return removeEmptyProps({ ...resultOneToTwo, ...resultTwoToOne });
};

function compare(obj1, obj2) {
    return Object.keys(obj1).reduce((acc, key) => {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            return {
                ...acc,
                [key]: whatIsDifferent(obj1[key], obj2[key]),
            };
        }
        if (obj1[key] !== obj2[key]) {
            return {
                ...acc,
                [`Object 1, ${
                    Array.isArray(obj1) ? 'index ' : ''
                }${key}`]: obj1[key],
                [`Object 2, ${
                    Array.isArray(obj1) ? 'index ' : ''
                }${key}`]: obj2[key],
            };
        }
        return acc;
    }, {});
}

// Recursively remove object props where the value is {}
function removeEmptyProps(obj) {
    if (obj == null) {
        return null;
    }
    Object.keys(obj).forEach((key) => {
        if (
            obj[key] != null &&
            typeof obj[key] === 'object' &&
            Object.keys(obj[key]).length === 0
        ) {
            // eslint-disable-next-line no-param-reassign
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            removeEmptyProps(obj[key]);
        }
    });
    return obj;
}
