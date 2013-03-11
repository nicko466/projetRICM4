function onLoad() {
    document.addEventListener('deviceready', ready, false);
}

function clearScreen() {
    document.getElementById("tagContents").innerHTML = "";
}

function showInstructions() {
    document.getElementById("tagContents").innerHTML =
    "<div id='instructions'>" +
    " <p>Scan a tag to begin.<\/p>" +
    " <p><\/p>" +    
    "<\/div>";
}

function template(record) {
    var recordType = nfc.bytesToString(record.type),
        payload;
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
        var record = records[i],
        p = document.createElement('p');
        p.innerHTML = nfc.bytesToString(record.payload);
        display.appendChild(p);
    }
    navigator.notification.vibrate(100);
}

var ready = function() {
    function failure(reason) {
        navigator.notification.alert(reason, function() {}, "There was a problem");
    }

    nfc.addNdefListener(
	
    parseTag,   

    function() {
       	alert("Success.");
    }   ,
    function() {
        alert("Fail.");
    }
);
    
    showInstructions();
    
};