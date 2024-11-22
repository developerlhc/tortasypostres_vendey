cordova.plugins.barcodeScanner.scan(successCallBack, errorCallback, options);
var options = {
"preferFrontCamera" : true, // iOS and Android
"showFlipCameraButton" : true, // iOS and Android
"prompt" : "Place a barcode inside the scan area", // supported on Android only
"formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
"orientation" : "landscape"
}