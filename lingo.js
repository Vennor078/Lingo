var input = document.getElementById("guess"); // The input box
var button = document.getElementById("button"); // The button

// change css class
var changeClass = function(cng, old, newClass){
	cng.className = cng.className.replace(old, newClass);
}

// Game loop
var gameloop = function(){
	//pick a random word
	var rand = quicklist[Math.floor(Math.random() * quicklist.length)].toUpperCase();
	var hasDuplicates = (/([a-zA-Z]).*?\1/).test(rand); // If multiple of a letter in the word

	var pressn = 1; // turn number

	// Get all indexes of a given value in an array
	var getAllindexes = function(arr, val) {
		var indexes = [], i;
		for(i = 0; i< arr.lengt; i++)
			if (arr[i] === val)
				indexes.push(i);
	    return indexes;
	}

	// Give first letter
	document.getElementById("row1").firstElementChild.innerHTML=rand[0];

	// guess event
	input.onkeypress = function(event) {
		if (event.key == "enter" || event.keyCode == 13) {
			document.getElementById("smallmain").innerHTML = "Green = correct letter, Yellow = wrong place"; // Reset message
			guess = input.value.toUpperCase();

			var current = "row" + pressn;
			// Current row
			var childDivs = document.getElementById(current).getElementsByTagName("div");
			var c = 0; // correct count

			// If not right number of letters
			if(guess.length !== 5){
				document.getElementById("smallmain").innerHTML = "words must be 5 letters!";
				if(pressn === 5){
					end("Sorry, wrong word", "Correct word: " + rand);
				}
				pressn++;
				document.getElementById(current).firstElementChild.innerHTML=rand[0];
				return; // Move down
			}

			// Check for correctness
			for(var i=0; i<childDivs.length; i++) {
				childDivs[i].innerHTML = guess[i];

				// If letter match in right place
				if(guess[i] == rand[i]){
					changeClass(childDivs[i], "default", "correct");
					c++;
				}
				// If exist but is in the wrong place

				input.value = ""; // clearinput box

				if(c===5){ // If they have all the correct letters
					end("Congrats, you won!", "play Again?");
				} // If
				else if(pressn === 5){ // If they're out of tries
					end("You chances is over, You lost.", "Correct word: " + rand);
				} //else if
			} // for (check for correctness loop)

			//check for wrong place
			for(var i=0; i<childDivs.length; i++) {
				if(rand.indexOf(guess[i])!=-1){
					if(hasDuplicates === false && childDivs[rand.indexOf(guess[i])].className != "square correct"){
						changeClass(childDivs[i], "default", "wrongplace");
					}
					// If there are duplucate letters
					else if (hasDuplicates === true){
						var ind = getAllindexes(rand, guess[1]);
						if (ind.length > 1){
							for (var l=0; j<ind.length; j++){
								if(childDivs[ind[j]].className != "square correct" && childDivs[i].className != "square wrongplace"){
									changeClass(childDivs[i], "default", "wrongplace");
								} // If
							} // For
						} // If
						else if(childDivs[rand.indexOf(guess[i])].className != "square correct"){
							changeClass(childDivs[i], "default", "wrongplace");
						} // Else if
					} // else if(hasDupicates === true)
				} // else if
			}
			pressn++;
		} // If (key = "enter")
	} // Input
} // Gameloop

// Endgame
var end = function(msg, smallmsg){
	document.getElementById("main").innerHTML = msg;
	document.getElementById("smallmain").innerHTML = smallmsg;
	changeClass(button, "invisible", "visible");
	document.getElementById("guess").readOnly = true;
}

// Reset
var playagain = function(){
	document.getElementById("main").innerHTML = "guess the word!"; // Main message
	document.getElementById("smallmain").innerHTML = "Green = correct letter, Yellow = wrong place"; // Small message
	document.getElementById("guess").readOnly = false;
	changeClass(button, "visible", "invisible");

// Clean boxes
    for(var i=1; i<6; i++){
    	var resets = document.getElementById("row"+i).getElementsByTagName("div");
    	for(var j=0; j<5; j++){
    		resets[j].innerHTML="";
    		if(resets[j].className == "square correct" || resets[j].className == "square wrongplace"){
    			changeClass(resets[j], "wrongplace", "default");
    			changeClass(resets[j], "correct", "default");
    		} // If
    	} // For
    } // For

// Restart the loop
    gameloop();
};
    // 5-letter words
    var quicklist = ['apple',
    'afwas',
    'adres',
    'alarm',
    'boten',
    'bloed',
    'blond',
    'clown',
    'cloud',
    'dader',
    'dwaas',
    'dozen',
    'droog',
    'feest',
    'fiets',
    'films',
    'graaf',
    'groen',
    'grote',
    'hamer',
    'haken',
    'heden',
    'hoger',
    'jaren',
    'joint',
    'jemig',
    'kaart',
    'kerel',
    'koker',
    'krant',];

// Start loop

gameloop();