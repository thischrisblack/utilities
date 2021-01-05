/**
 * An array helper that counterfeits the {...object1, ...object2 } functionality.
 * "Spreads" updated items (by item.id) into original array, and adds brand-new items at the end.
 *
 * EXAMPLE:
 * If you pass in arrayOne: [ { id: 1, monkey: "banana" }, { id: 2, monkey: "coconut" } ]
 * along with arrayTwo:     [ { id: 2, monkey: "drum" }, { id: 3, monkey: "kong" } ]
 * this funtion will return [ { id: 1, monkey: "banana" }, { id: 2, monkey: "drum" }, { id: 3, monkey: "kong" } ]
 *                                                           ^ id 2 updated             ^ id 3 added
 * @param originalArray
 * @param incomingArray
 */
export function upsertArray(originalArray: Array<{ id: any }>, incomingArray: Array<{ id: any }>): Array<any> {
    return (
        originalArray
            .map(originalItem => {
                if (incomingArray.map(i => i.id).includes(originalItem.id)) {
                    // replace existing item with incoming item
                    return incomingArray.find(i => i.id === originalItem.id);
                }
                // just return existing item
                return originalItem;
            })
            // append brand-new items
            .concat(incomingArray.filter(i => !originalArray.map(x => x.id).includes(i.id)))
    );
}
