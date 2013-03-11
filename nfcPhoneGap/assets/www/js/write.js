/*global NdefPlugin, Ndef */

function writeTag(nfcEvent) {
  // ignore what's on the tag for now, just overwrite
    
  var mimeType = text/plain,//document.forms[0].elements["mimeType"].value,
    payload = "Hey i'm mickey",//document.forms[0].elements["payload"].value,
    record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

  nfc.write(
        [record], 
        function () {
            toast.showShort("Wrote data to tag.");
            navigator.notification.vibrate(100);
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
    alert('Failed to register NFC Listener');
  }
  
  nfc.addTagDiscoveredListener(writeTag, win, fail);

};

function onLoad() {
   document.addEventListener('deviceready', ready, false);
}
