module.exports = class Util {

	static trimArray(arr, maxLen = 10) {
		if(arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	static firstUpperCase(text, split = ' ') {
		return text.split(split).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ');
	}
};