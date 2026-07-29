package com.frequencias.formas;

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
        // ou, se preferir: webView.loadUrl("file:///android_asset/index.html");
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
