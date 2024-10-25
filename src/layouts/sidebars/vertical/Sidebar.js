import {Button, Nav, NavItem} from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {useContext} from "react";
import {AuthContext} from "../../../Context/AuthContext";
import SubMenuText from "../../../Constantes/SubMenusText";
import SubMenu from "../../../../src/components/ElementosUI/SubMenu";


const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;

  const {user} = useContext(AuthContext);

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        {/* <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>  */}
      </div>
      <div className=" pt-4 mt-2">
        <Nav vertical className="sidebarBox"  >
          {SubMenuText().map((navi, index) => (
            navi.subMenu 
            ?
              <SubMenu
                dados={navi.subMenuList}
                icon={navi.icon}
                location={location}
                nomeMenu={navi.title}
                key={index}
              />
            :
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
