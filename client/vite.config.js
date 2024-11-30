import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifest = {
    name: "Note\nAttendance",
    short_name: "Note\nAttendance",
    start_url: "/",
    description: "A web app that helps instructors take attendance digitally & performs updates on spreadsheets automatically",
    icons: [
        {
            "src": "icons/manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "icons/manifest-icon-192.maskable.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "icons/manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
        },
        {
            "src": "icons/manifest-icon-512.maskable.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    shortcuts:[
        {
            "name":"Today's Report",
            "short_name":"Today's Report",
            "url":"/daily-report",
            "icons":[
                {"src":"icons/search.png","sizes":"320x320"}
            ]
        },
        {
            "name":"Student Record",
            "short_name":"Student Record",
            "url":"/search",
            "icons":[
                {"src":"icons/report.png","sizes":"320x320"}
            ]
        }

    ],
    theme_color: "#02825c",
    background_color: "#ffffff"
}

export default defineConfig({
    plugins: [react(), VitePWA({
        manifest:manifest
    })]
})