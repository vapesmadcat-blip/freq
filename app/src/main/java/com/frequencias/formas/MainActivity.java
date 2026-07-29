package com.frequencias.formas;

<<<<<<< HEAD
<<<<<<< HEAD
import android.app.Activity;               // ← ESSENCIAL
import android.annotation.SuppressLint;
=======
>>>>>>> 0f2b1aa (fix)
=======
import android.app.Activity;               // ← ESSENCIAL
import android.annotation.SuppressLint;
>>>>>>> 4e5ba2c (fix)
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
<<<<<<< HEAD
=======

<<<<<<< HEAD
import androidx.appcompat.app.AppCompatActivity;
>>>>>>> 0f2b1aa (fix)

public class MainActivity extends AppCompatActivity {
=======
public class MainActivity extends Activity {
>>>>>>> 4e5ba2c (fix)

    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        webView.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
<<<<<<< HEAD
<<<<<<< HEAD
        settings.setMediaPlaybackRequiresUserGesture(false); // áudio automático
=======
        settings.setMediaPlaybackRequiresUserGesture(false);
>>>>>>> 0f2b1aa (fix)
=======
        settings.setMediaPlaybackRequiresUserGesture(false); // áudio automático
>>>>>>> 4e5ba2c (fix)
        settings.setAllowFileAccess(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.setWebViewClient(new WebViewClient());package com.frequencias.formas;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity; // ou Activity, dependendo do que você quer

public class MainActivity extends AppCompatActivity { // ou extends Activity

    private WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        // Layout params são opcionais se você usar setContentView(webView) – ele ocupa tudo por padrão
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false); // áudio sem toque prévio (cuidado)
        settings.setAllowFileAccess(true);                  // acesso a arquivos locais
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);    // cache padrão

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());  // necessário para vídeo/áudio em HTML5

        // Carrega o HTML – ajuste o caminho conforme sua estrutura
        webView.loadUrl("file:///android_asset/www/index.html");

        webView.setWebChromeClient(new WebChromeClient());

<<<<<<< HEAD
<<<<<<< HEAD
        // ATENÇÃO: verifique se o arquivo existe em app/src/main/assets/www/index.html
=======
        // Seu HTML está em app/src/main/assets/www/index.html
>>>>>>> 0f2b1aa (fix)
=======
        // ATENÇÃO: verifique se o arquivo existe em app/src/main/assets/www/index.html
>>>>>>> 4e5ba2c (fix)
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
