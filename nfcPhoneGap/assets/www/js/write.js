/*global NdefPlugin, Ndef */

function writeTag(nfcEvent) {
  // ignore what's on the tag for now, just overwrite
  //var mimeType = "text/pg",//document.forms[0].elements["mimeType"].value,
 //   payload = "Hey i'm mickey",//document.forms[0].elements["payload"].value,
//    record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));
var typeDeVin = document.getElementById("typeDeVin").value,
	anne = document.getElementById("annee").value,
	domaine = document.getElementById("domaine").value;

var text = "<typeDeVin>"+typeDeVin+"</typeDeVin><annee>"+annee+"</annee><domaine>"+domaine+"</domaine>";
var ndefRecord =  ndef.textRecord(text);	
var ndefMessage = ndef.encodeMessage([ndefRecord]);
  nfc.write(
        [ndefRecord], 
        function () {
            navigator.notification.vibrate(100);
            alert(text);
        }, 
        function (reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
        }
  );   
  
}

var ready = function () {
  
  function win() {
    console.log("Listening for NDEF tags");
  }
  
  function fail() {
    conole.log('Failed to register NFC Listener');
  }
  nfc.addTagDiscoveredListener(writeTag,win,fail);

};

function onLoad() {
   document.addEventListener('deviceready', ready, false);
}
