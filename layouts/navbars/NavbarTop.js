"use client";

// import node module libraries
import { Menu } from "react-feather";
import Link from "next/link";
import { Nav, Navbar, Form } from "react-bootstrap";

// import sub components
import QuickMenu from "layouts/QuickMenu";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NavbarTop = (props) => {
  const [deliveryCode, setDeliveryCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/deliveries/${deliveryCode}`);
  };
  return (
    <Navbar expanded="lg" className="navbar-classic navbar navbar-expand-lg">
      <div className="d-flex justify-content-between w-100">
        <div className="d-flex align-items-center">
          <Link
            href="#"
            id="nav-toggle"
            className="nav-icon me-2 icon-xs"
            onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
          >
            <Menu size="18px" />
          </Link>
          <div className="ms-lg-3 d-none d-md-none d-lg-block">
            {/* Search Form */}
            <Form
              className="d-flex align-items-center"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Form.Control
                type="search"
                placeholder="Code de la livraison"
                value={deliveryCode}
                onChange={(e) => setDeliveryCode(e.target.value)}
                required
              />
            </Form>
          </div>
        </div>
        {/* Quick Menu */}
        <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
          <QuickMenu />
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavbarTop;
