# List.js

A lightweight JavaScript utility for creating and manipulating HTML lists (`<ul>` elements) and their items, including a special "buddy" item.

## Features

- Create and remove lists dynamically.
- Add, insert, move, and remove list items.
- Support for a special "buddy" item that can be appended to the list.
- Sort list items (numeric or lexicographic).
- Clear all items from a list.

## API

### CreateList(listId)

Creates a new `<ul>` element with the specified `listId` and returns it.

### RemoveList(listId)

Removes the list with the given `listId` from the DOM.

### AppendBuddy(listId, buddyName = "Buddy")

Appends a special "buddy" `<li>` to the list. Only one buddy per list is allowed.

### RemoveBuddy(listId)

Removes the buddy item from the list.

### AppendListItem(listId, textItem)

Appends a new item to the list. If a buddy exists, the item is inserted before the buddy.

### RemoveListItem(listId, position)

Removes the item at the specified position from the list and updates subsequent item IDs.

### InsertListItem(listId, textItem, position)

Inserts a new item at the specified position in the list.

### MoveListItem(listId, fromPosition, toPosition)

Moves an item from one position to another within the list.

### ClearList(listId)

Removes all items (including the buddy) from the list.

### SortList(listId)

Sorts the list items (excluding the buddy) numerically or lexicographically.

## Usage Example

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>tests</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src="list.js"></script>
</head>
<body>

    <script>
        let list = CreateList("list");

        document.body.appendChild(list);
        
        AppendBuddy("list");

        AppendListItem("list", "Item 5");
        AppendListItem("list", "Item 1");
        AppendListItem("list", "Item 2");
        AppendListItem("list", "Item 4");
        AppendListItem("list", "Item 3");
        AppendListItem("list", "Item 0");
        AppendListItem("list", "Item 6");

        SortList("list");

        //RemoveListItem("list", 2);

        //InsertListItem("list", "New Item 4", 4);

        //ClearList("list");

        //MoveListItem("list", 0, 3);
        
    </script>

    <button>Delete list</button>
    <script>
        document.querySelector("button").addEventListener("click", function() {
            RemoveList("list");
        });
    </script>

</body>
</html>
```

## Informations

Authors: MGC

Version: 1.0.0

Dated: 2025-06-12

### Licence

This project is available under the [MIT License](https://mit-license.org/).
