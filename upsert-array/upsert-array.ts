/**
* An array helper that counterfeits the {...object1, ...object2 } spread functionality.
* "Spreads" updated items (by item.id) into original array, and adds new items at the end.
*
* EXAMPLE:
* If you pass in originalArray: [ { id: 1, fruit: "banana" }, { id: 2, fruit: "apple" } ]
* along with incomingArray:     [ { id: 2, fruit: "mango" }, { id: 3, fruit: "papaya" } ]
* this funtion will return:     [ { id: 1, fruit: "banana" }, { id: 2, fruit: "mango" }, { id: 3, fruit: "papaya" } ]
*                                                                   ^ id 2 updated             ^ id 3 added
* @param originalArray
* @param incomingArray
*/
 export const upsertArray = (originalArray: Array<{ id: any }>, incomingArray: Array<{ id: any }>): Array<any> => {
    const originalArrayIdSet = originalArray.map(i => i.id);
    const incomingArrayIdSet = incomingArray.map(i => i.id);
    return (
        originalArray
            .map(originalItem => {
                if (incomingArrayIdSet.includes(originalItem.id)) {
                    // merge incoming item into existing item
                    // GOTCHA: Note that props missing from incoming item will not be removed from existing item
                    return { ...originalItem, ...incomingArray.find(i => i.id === originalItem.id) };
                }
                // just return existing item
                return originalItem;
            })
            // append brand-new items
            .concat(incomingArray.filter(i => !originalArrayIdSet.includes(i.id)))
    );
};
