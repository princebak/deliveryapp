// import theme style scss file
import "styles/theme.scss";

export const metadata = {
  title: "DeliveryApp",
  description:
    "Notre plateforme vous permet de livrer votre colis partout a Kinshasa.",
  keywords: "Livraison moto colis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-light">{children}</body>
    </html>
  );
}
