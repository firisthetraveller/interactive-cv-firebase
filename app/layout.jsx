import "./globals.css";

export const metadata = {
    title: 'Interactive CV',
    description: "It's Guy LUONG's CV, but you can also play around."
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,200;0,400;1,200&family=Poppins:wght@400;600;700;800&display=swap"
                    rel="stylesheet" />
                <meta name="google-site-verification" content="i0ayqPH1T-pbP9Bm-DzcDGVxuzOMaY881WrQdPMCIQM" />
            </head>

            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <main id="root">{children}</main>
            </body>
        </html>
    )
}