"use client";
// import node module libraries
import { useState } from "react";

// import theme style scss file
import "styles/theme.scss";

// import sub components
import NavbarVertical from "/layouts/navbars/NavbarVertical";
import NavbarTop from "/layouts/navbars/NavbarTop";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthLayout from "app/(auth)/authentication/layout";
import SignIn from "app/(auth)/authentication/sign-in/page";

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(true);
  const router = useRouter();
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };
  const { data: session } = useSession();
  if (session && router.pathname !== "/login") {
    return (
      <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
        <div className="navbar-vertical navbar">
          <NavbarVertical
            showMenu={showMenu}
            onClick={(value) => setShowMenu(value)}
          />
        </div>
        <div id="page-content">
          <div className="header">
            <NavbarTop
              data={{
                showMenu: showMenu,
                SidebarToggleMenu: ToggleMenu,
              }}
            />
          </div>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </>
    );
  }
}
