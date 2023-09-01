// import theme style scss file
import Providers from "components/Providers";
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
      <body className="bg-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
 