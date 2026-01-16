import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("User:", user);
  const userRole = user?.role || ''
  const userPermissions = user?.permissions || [];
  const hasDiamondWritePermission = userPermissions.includes('Diamond_write') && (userRole === 'user') || (userRole === 'admin');
  // Diamond_read,stoneGroup_read
  const hasDiamondDiamond_readPermission = userPermissions.includes('Diamond_read') && (userRole === 'user') || (userRole === 'admin');
  const hasDiamondstoneGroup_readPermission = userPermissions.includes('stoneGroup_read') && (userRole === 'user') || (userRole === 'admin');

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(JSON.parse(localStorage.getItem("user")).email)

    // console.log("Token in Header:", token);
    if (!token) {
      navigate("/login");
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <>
      <div className="fixed w-full z-10 top-0">
        <Navbar fluid rounded  >
          <NavbarBrand>
            <Link to="/" className="flex items-center">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Dimond</span>
            </Link>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink>
              <Link to="/">Home</Link>
            </NavbarLink>
            
            {
              userRole === 'admin' && (
                <NavbarLink>
                  <Link to="/user_list">users</Link>
                </NavbarLink>
              )
            }
            
            {hasDiamondstoneGroup_readPermission ? (
              <NavbarLink>
                <Link to="/stoneGroup">Stone Group</Link>
              </NavbarLink>
            ) : null}
            {hasDiamondWritePermission ? (
              <NavbarLink>
                <Link to="/add-dimond">Add Diamond</Link>
              </NavbarLink>
            ) : null}
            {hasDiamondDiamond_readPermission ? (
              <NavbarLink>
                <Link to="/diamond-list">Inventory List</Link>
              </NavbarLink>
            ) : null}
            
            <p className="bg-amber-50 rounded text-black px-2">{JSON.parse(localStorage.getItem("user")).username}</p>
            <button onClick={() => logout()} className="text-red-500">Log Out</button>
          </NavbarCollapse>
        </Navbar>
      </div>

    </>
  )
}

export default Header
