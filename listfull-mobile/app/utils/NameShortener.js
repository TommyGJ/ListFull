const nameShortener = (name) => { 
	let newName;
	if (name.length > 23) {
		newName = name.slice(0,20);
		newName += "..."
		return newName;
	} else {
		return name;
	}
}

export default nameShortener;
