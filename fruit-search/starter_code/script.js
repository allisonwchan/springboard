const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// filter out results
function search(str) {
	let results = [];

	if (str.length) {
		// for each item in fruit, if input (str) is included in item, push to results
		results = fruit.filter((item) => item.toLowerCase().includes(str.toLowerCase()));
	}

	return results;
}

// with keyup, show results 
function searchHandler(e) {
	// e.target will be the input box
	// e.target.value is input text
	let inputText = e.target.value;
	let results = search(inputText);
	return showSuggestions(results, inputText);
}

// add items to create dropdown
// each li should only have 1 item from results in it
function showSuggestions(results, inputVal) {
	// initialize with empty list of suggestions
	suggestions.innerHTML = '';

	for (let r of results) {
		let resultLi = document.createElement('li');

		// find first index where inputVal appears in a result
		let firstIdx = r.toLowerCase().indexOf(inputVal);

		if (firstIdx === 0) {
			// bold inputVal and then add letters after firstIdx
			let result = "<b>" + r.substring(firstIdx, inputVal.length) + "</b>";
			result += r.substring(inputVal.length);
			resultLi.innerHTML = result;

		} else {
			// add letters before firstIdx, then bold firstIdx to end of inputVal 
			let result = r.substring(0, firstIdx);
			result += "<b>" + r.substring(firstIdx, (firstIdx + inputVal.length)) + "</b>";
			
			// if there's more characters after inputVal then add them
			if ((firstIdx + inputVal.length) !== r.length) {
				result += r.substring((firstIdx + inputVal.length), r.length);
			}

			resultLi.innerHTML = result;
		}
		
		suggestions.appendChild(resultLi);
	}
}

// populate search bar with text
function useSuggestion(e) {
	// e.target will be li
	let selectSuggestion = e.target.innerHTML;
	input.value = selectSuggestion;
	suggestions.innerHTML = '';
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);