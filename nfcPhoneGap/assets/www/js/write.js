function onLoad() {
	document.addEventListener('deviceready', ready, false);
}


function writeTag(nfcEvent) {
	var typeDeVin = document.getElementById("typeDeVin").value, annee = document.getElementById("annee").value, domaine = document.getElementById("domaine").value;
	var text = "<typeDeVin>" + typeDeVin + "</typeDeVin><annee>" + annee + "</annee><domaine>" + domaine + "</domaine>";
	var ndefRecord = ndef.textRecord(text);
	var ndefMessage = ndef.encodeMessage([ndefRecord]);
	nfc.write([ndefRecord], function() {
		navigator.notification.vibrate(100);
		alert(text);
	}, function(reason) {
		navigator.notification.alert(reason, function() {
		}, "There was a problem");
	});

}

var ready = function() {

	function win() {
		console.log("Listening for NDEF tags");
	}

	function fail() {
		conole.log('Failed to register NFC Listener');
	}

	nfc.addNdefListener(writeTag, win, fail);

};

