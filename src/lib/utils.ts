export function toHoursAndMinuts(minutes: number) {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;

	let result = "";

	if (hours > 0) {
		result += hours + "h ";
	}

	if (mins > 0) {
		result += mins + "min";
	}

	return result.trim();
}

export function url(_path: string) {
	const path = _path.startsWith("/") ? _path.substring(1) : _path;
	return `${import.meta.env.BASE_URL}${path}`;
}
