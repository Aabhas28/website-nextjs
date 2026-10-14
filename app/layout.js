import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.mactus.co.in"),
  title: "High Grade Industrial Minerals Manufacturer & Exporter | Mactus Mineral",
  description:
    "Mactus specializes in refined Soda and Potash Feldspar, Talc, Kaolin Clay, Quartz, Ball Clay, and Mica. Home to India’s largest wet-type processing plant in Morbi, Gujarat.",
  keywords: [
    "Mactus Minerals",
    "Soda Feldspar",
    "Potash Feldspar",
    "Morbi Mineral Supplier",
    "Wet-type Processing Plant",
    "Ceramic Minerals",
    "Talc",
    "Kaolin Clay",
    "China Clay",
    "Quartz",
    "Ball Clay",
    "Mica"
  ],
  openGraph: {
    title: "Mactus Minerals | Leading Mineral Supplier in India",
    description: "Refined Soda and Potash Feldspar, Talc, Kaolin Clay, Quartz, Ball Clay and Mica. 20+ Years ceramic expertise.",
    url: "https://www.mactus.co.in/",
    siteName: "Mactus Minerals",
    images: [
      {
        url: "/images/assets/Mactus_Logo.svg",
        width: 800,
        height: 600,
        alt: "Mactus Minerals"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/images/assets/Mactus_Logo.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
