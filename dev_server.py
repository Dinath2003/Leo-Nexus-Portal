#!/usr/bin/env python3
import http.server
import socketserver
import sys
import os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173

class DevHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        '': 'application/octet-stream',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.mjs': 'text/javascript',
        '.json': 'application/json',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
    }

    def send_head(self):
        # Prevent 304 Not Modified so the browser ALWAYS executes fresh code from disk
        for h in list(self.headers.keys()):
            if h.lower() in ('if-modified-since', 'if-none-match'):
                del self.headers[h]
        return super().send_head()

    def end_headers(self):
        # Force browser to always fetch fresh files without caching in dev
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), DevHandler) as httpd:
        print(f"🌊 Leo Nexus Dev Server running at http://localhost:{PORT}/ (no-cache enabled)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
