package com.example.nfc;

import org.apache.cordova.*;
import android.os.Bundle;

public class nfcActivity extends DroidGap {
	
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/index.html");
		
	}
	
}