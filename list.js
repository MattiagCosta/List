function CreateList(listId){
	let list = document.createElement("ul");
	list.id = listId;
	return list;
}

function RemoveList(listId){
	let list = document.getElementById(listId);
	if(list){
		list.remove();
	}
}

function AppendBuddy(listId, buddyName="Buddy"){
	let list = document.getElementById(listId);
	if(!list){
		console.error("List with ID " + listId + " not found.");
		return;
	}

	if(list.querySelector("#" + listId + "-buddy")){
		console.error("Buddy already exists in list " + listId + ".");
		return;
	}

	let buddy = document.createElement("li");
	buddy.id = listId + "-buddy";
	buddy.textContent = buddyName;
	list.appendChild(buddy);

	return buddy.id;
}

function RemoveBuddy(listId){
	let list = document.getElementById(listId);
	if(!list){
		console.error("List with ID " + listId + " not found.");
		return;
	}

	let buddy = document.getElementById(listId + "-buddy");
	if(!buddy){
		console.error("Buddy with ID " + listId + "-buddy not found in list " + listId + ".");
		return;
	}

	list.removeChild(buddy);
}

function AppendListItem(listId, textItem){
	let list = document.getElementById(listId);
	if(!list){
		console.error("List with ID " + listId + " not found.");
		return;
	}

	let item = document.createElement("li");
	buddy = list.querySelector("#" + listId + "-buddy");
	item.textContent = textItem;
	if(buddy){
		item.id = listId + "-" + (list.children.length - 1);
		list.insertBefore(item, buddy);
	}
	else{
		item.id = listId + "-" + list.children.length;
		list.appendChild(item);
	}

	return item.id;
}

function RemoveListItem(listId, position){
	let list = document.getElementById(listId);
	if(!list){
		console.error("List with ID " + listId + " not found.");
		return;
	}

	let itemId = listId + "-" + position;

	let item = document.getElementById(itemId);
	if(!item){
		console.error("Item with ID " + itemId + " not found in list " + listId + ".");
		return;
	}

	list.removeChild(item);

	number = itemId.split("-")[1];
	for(let i = parseInt(number); i < list.children.length; i++){
		if(list.children[i].id !== listId + "-buddy"){
			list.children[i].id = listId + "-" + i;
		}
	}
}

function InsertListItem(listId, textItem, position){
	let list = document.getElementById(listId);
	if(!list){
		console.error("List with ID " + listId + " not found.");
		return;
	}

	if(position < 0 || position > list.children.length){
		console.error("Position " + position + " is out of bounds for list " + listId + ".");
		return;
	}

	let item = document.createElement("li");
	item.textContent = textItem;

	if(position >= list.children.length){
		buddy = list.querySelector("#" + listId + "-buddy");
		if(buddy){
			item.id = listId + "-" + (list.children.length - 1);
			list.insertBefore(item, buddy);
		}
		else{
			item.id = listId + "-" + list.children.length;
			list.appendChild(item);
		}
	}
	else{
		item.id = listId + "-" + position;
		list.insertBefore(item, list.children[position]);
	}

	for(let i = position+1; i < list.children.length; i++){
		if(list.children[i].id !== listId + "-buddy"){
			list.children[i].id = listId + "-" + i;
		}
	}

	return item.id;
}

function MoveListItem(listId, fromPosition, toPosition){
	let list = document.getElementById(listId);
	if(!list){
		console.error("List with ID " + listId + " not found.");
		return;
	}

	if(fromPosition < 0 || fromPosition >= list.children.length || toPosition < 0 || toPosition >= list.children.length){
		console.error("Invalid positions: from " + fromPosition + " to " + toPosition + " for list " + listId + ".");
		return;
	}

	let item = list.children[fromPosition];
	list.removeChild(item);

	if(toPosition >= list.children.length){
		buddy = list.querySelector("#" + listId + "-buddy");
		if(buddy){
			list.insertBefore(item, buddy);
		}
		else{
			list.appendChild(item);
		}
	} else {
		list.insertBefore(item, list.children[toPosition]);
	}

	for(let i = 0; i < list.children.length; i++){
		if(list.children[i].id !== listId + "-buddy"){
			list.children[i].id = listId + "-" + i;
		}
	}
}

function ClearList(listId){
	let list = document.getElementById(listId);
	if(!list){
		console.error("List with ID " + listId + " not found.");
		return;
	}

	while(list.firstChild){
		list.removeChild(list.firstChild);
	}
}

function SortList(listId){
	let list = document.getElementById(listId);
	if(!list){
		console.error("List with ID " + listId + " not found.");
		return;
	}

	let buddy = document.getElementById(listId + "-buddy");

	compareFunction = (a, b) => {
		if(!isNaN(Number(a.textContent)) && !isNaN(Number(b.textContent))){
			return Number(a.textContent) - Number(b.textContent);
		}
		if(a.textContent > b.textContent) return 1;
		if(a.textContent < b.textContent) return -1;
		return 0;
	}

	let items = Array.from(list.children).filter(item => item.id !== listId + "-buddy");
	items.sort(compareFunction);

	ClearList(listId);
	for(i = 0; i < items.length; i++){
		items[i].id = listId + "-" + i;
		list.appendChild(items[i]);
	}

	if(buddy){
		list.appendChild(buddy);
	}
}