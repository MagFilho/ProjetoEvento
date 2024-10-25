import React from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import {useRouter} from "next/router";
import {destroyCookie} from "nookies";
import Constantes from "../../Constantes/Constantes";

const Header = ({ showMobmenu , showMobmenuOpen}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const router = useRouter();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    destroyCookie(undefined,Constantes.nome_token, {
      path: "/"
    })
    router.push('/')
  }

  return (
    <Navbar className="topbar bg-gradient" color="primary" dark expand="lg">
      <div className="d-flex align-items-center">
        {/* <NavbarBrand href="/">
          <img src={"/SEGOV2Carteira.svg"} alt="logo" />
        </NavbarBrand> */}
          <Button color="primary"  
              className={` navBarButton ${
                  !showMobmenuOpen ? "" 
                  : "navBarButtonShow" }`}  
              onClick={showMobmenu}
            >
            <i className="bi bi-list"></i>
          </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-lg-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          {/*<NavItem>*/}
          {/*  <Link href="/">*/}
          {/*    <a className="nav-link">Starter</a>*/}
          {/*  </Link>*/}
          {/*</NavItem>*/}
          {/*<NavItem>*/}
          {/*  <Link href="/about">*/}
          {/*    <a className="nav-link">About</a>*/}
          {/*  </Link>*/}
          {/*</NavItem>*/}
          <h3 className="ps-4" style={{textAlign: "center", color: "white"}}>{Constantes.nome_projeto}</h3>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <div style={{ lineHeight: "0px" }}>
              <img
                src={"/user4.jpg"}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            {/*<DropdownItem header>Info</DropdownItem>*/}
            {/*<DropdownItem>My Account</DropdownItem>*/}
            {/*<DropdownItem>Edit Profile</DropdownItem>*/}
            {/*<DropdownItem divider />*/}
            {/*<DropdownItem>My Balance</DropdownItem>*/}
            {/*<DropdownItem>Inbox</DropdownItem>*/}
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
