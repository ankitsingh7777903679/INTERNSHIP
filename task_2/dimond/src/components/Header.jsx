import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar fluid rounded >
        <NavbarBrand>
          <Link to="/" className="flex items-center">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Dimond</span>
          </Link>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink>
            <Link to="/dimond">Stone Group</Link>
          </NavbarLink>
          <NavbarLink>
            <Link to="/dimond-price">Add Dimond</Link>
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </>
  )
}

export default Header
