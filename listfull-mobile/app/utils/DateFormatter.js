export const dateFormatter = (date, verbose) => {
	let formattedDeadline = new Date(parseFloat(date));
	let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return (verbose? formattedDeadline.toLocaleDateString('en-US', options) : formattedDeadline.toLocaleDateString('en-US'));
}
