function onLoad() {
	document.addEventListener('deviceready', ready, false);
}

function clearScreen() {
	document.getElementById("tagContents").innerHTML = "";
}

function showInstructions() {
	document.getElementById("tagContents").innerHTML = "<div id='instructions'>" + " <p>Scan a tag to begin.<\/p>" + " <p><\/p>" + "<\/div>";
}

function template(record) {
	var recordType = nfc.bytesToString(record.type), payload;
	// attempt display as a string
	payload = nfc.bytesToString(record.payload);
	return payload;
}

function parseTag(nfcEvent) {
	clearScreen();
	var tag = nfcEvent.tag;
	var records = tag.ndefMessage;
	var display = document.getElementById("tagContents");
	// Display Record Info
	for (var i = 0; i < records.length; i++) {
		var record = records[i], p = document.createElement('p');
		p.innerHTML = nfc.bytesToString(record.payload);
		var typeDeVin = p.getElementsByTagName("typeDeVin"), annee = p.getElementsByTagName("annee"), domaine = p.getElementsByTagName("domaine");
		p.innerHTML = "Type de vin : " + typeDeVin[0].innerHTML + "<br> annee :" + annee[0].innerHTML + "<br> domaine : " + domaine[0].innerHTML;
		display.appendChild(p);
	}
	navigator.notification.vibrate(100);
}

function treatment(chaine) {

}

var ready = function() {
	function failure(reason) {
		navigator.notification.alert(reason, function() {
		}, "There was a problem");
	}


	nfc.addNdefListener(parseTag, function() {
		console.log("Success.");
	}, function() {
		console.log("Fail.");
	});

	showInstructions();

};
