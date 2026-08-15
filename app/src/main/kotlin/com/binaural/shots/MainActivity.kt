package com.binaural.shots

import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        
        // Configurar o WebView
        with(webView.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            
            // Para melhor performance
            setAppCacheMaxSize(10 * 1024 * 1024) // 10MB
            setAppCachePath(cacheDir.path)
            setAppCacheEnabled(true)
            
            // Permitir acesso a mídia
            mediaPlaybackRequiresUserGesture = false
            
            // Layout
            useWideViewPort = true
            loadWithOverviewMode = true
            
            // Zoom
            builtInZoomControls = true
            displayZoomControls = false
            
            // User agent
            userAgentString = userAgentString + " BinauralShots/1.0"
        }

        // Definir client para controlar navegação
        webView.webViewClient = WebViewClient()

        // Carregar a página HTML inicial (mapa emocional)
        webView.loadUrl("file:///android_asset/shots_emocionais.html")
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
