import React from "react";
import { Container } from "reactstrap";
import Header from "./header/Header";
import Sidebar from "./sidebars/vertical/Sidebar";

const FullLayout = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  return (
    <main>
      <div className="pageWrapper d-md-block d-lg-flex">
        <aside
          className={`sidebarArea shadow bg-white ${
            !open ? "" : "showSidebar"
          }`}
        >
          <Sidebar showMobilemenu={() => showMobilemenu()} />
        </aside>

        <div className="contentArea fixedTopBar">
          <Header showMobmenu={() => showMobilemenu()} showMobmenuOpen={open}/>

          <Container className="p-4 wrapper" fluid>
            <div>{children}</div>
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
