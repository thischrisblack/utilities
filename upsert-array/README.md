# upsertArray

An array helper that counterfeits the {...object1, ...object2 } spread functionality. "Spreads" updated items (by item[key]) into original array, and adds new items at the end. The default key is 'id', but any other value may be passed in as the third argument.

EXAMPLE:

```
const originalArray = [ { id: 1, fruit: "banana" }, { id: 2, fruit: "apple" } ];

const incomingArray = [ { id: 2, fruit: "mango" }, { id: 3, fruit: "papaya" } ];

upsertArray(originalArray, incomingArray);
```

This will return:

```
[ { id: 1, fruit: "banana" }, { id: 2, fruit: "mango" }, { id: 3, fruit: "papaya" } ]
                                ^ id 2 updated             ^ id 3 added
```
