import {Collapse, NavItem} from "reactstrap";
import Link from "next/link";
import React, {useState} from "react";

export default function SubMenu({nomeMenu, dados, location, icon}){

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <>
            <NavItem style={{cursor: "pointer"}}>
                <a
                    style={{display: "flex"}}
                    className={
                        !collapsed
                            ? "text-primary nav-link py-3"
                            : "nav-link text-secondary py-3"
                    }
                    onClick={toggleNavbar}
                >
                    <span className={"sidebarIcon"}>
                        <i className={icon}></i>
                    </span>
                    <span className={"ms-3 hide-mini w-100"}>
                        <div className={"d-flex align-items-center"}>
                            <span className={"bd-highlight"}>
                                {nomeMenu}
                            </span>
                              <span className={"ms-auto"}>
                                  {/*<span className={"badge me-2 bg-primary"}>{cadNavigation.length}</span>*/}
                                  <i className={
                                      !collapsed
                                          ? "bi fs-8 bi-chevron-up"
                                          : "bi fs-8 bi-chevron-down"
                                  }></i>
                              </span>
                        </div>
                    </span>
                </a>
                <Collapse isOpen={!collapsed} navbar>
                    <NavItem>
                        {dados.map((navi, index) => (
                            <NavItem key={index} className="sidenav-bg">
                                <Link href={navi.href}>
                                    <a
                                        className={
                                            location === navi.href
                                                ? "text-primary nav-link py-3"
                                                : "nav-link text-secondary py-3"
                                        }
                                    >
                                        <span className="ms-3 d-inline-block">{navi.title}</span>
                                    </a>
                                </Link>
                            </NavItem>
                        ))}
                    </NavItem>
                </Collapse>
            </NavItem>
        </>
    )
}