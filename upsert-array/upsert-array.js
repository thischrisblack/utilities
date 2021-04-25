/**
 * An array helper that counterfeits the {...object1, ...object2 } spread functionality.
 * "Spreads" updated items (by item[key]) into original array, and adds new items at the end.
 * @param originalArray An array of objects.
 * @param incomingArray An array of new and/or updated objects.
 * @param key The key to upsert on.
 * @returns A merged array of orginal, updated, and new objects.
 */
const upsertArray = (originalArray, incomingArray, key = 'id') => {
    const originalKeyValues = originalArray.map((i) => i[key]);
    const incomingKeyValues = incomingArray.map((i) => i[key]);
    return (
        originalArray
            // Upsert existing items.
            .map((originalItem) => {
                if (incomingKeyValues.includes(originalItem[key])) {
                    // GOTCHA: Note that props missing from incoming item will not be removed from existing item.
                    return {
                        ...originalItem,
                        ...incomingArray.find(
                            (i) => i[key] === originalItem[key]
                        ),
                    };
                }
                // If no match, return original item.
                return originalItem;
            })
            // Append brand-new items.
            .concat(
                incomingArray.filter((i) => !originalKeyValues.includes(i[key]))
            )
    );
};
