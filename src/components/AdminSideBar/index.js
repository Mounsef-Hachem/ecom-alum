import React, { useState } from "react";
import { Link} from "react-router-dom";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { AiOutlineUser } from "react-icons/ai";
import {
  BsBag,
  BsPeople,
  BsPersonSquare,
  BsBoxArrowRight,
  BsArchive
} from "react-icons/bs";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

import Logo from './../../assets/logo.png';
import LogoMin from './../../assets/logo-min.png';

import "react-pro-sidebar/dist/css/styles.css";
import './styles.scss';

const AdminSideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
          <ProSidebar collapsed={menuCollapse}>
            <SidebarHeader>
              <div className="logotext">
                {menuCollapse ?  <img src={LogoMin} alt="Alumen" /> :  <img src={Logo} alt="Alumen" />}
              </div>
              <div className="closemenu" onClick={menuIconClick}>
                {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem /*active={true}*/ icon={<AiOutlineUser />}>
                  <Link to="/admin"><p className="txtStle">My Profile</p></Link>
                </MenuItem>
                <MenuItem icon={<BsBag />}>
                  <Link to="/admin/products"><p className="txtStle">Categories of Products</p></Link>
                </MenuItem>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={<BsBoxArrowRight />}>
                <Link to="/logout"><p className="txtStle">Logout</p></Link>
                </MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
  );
};

export default AdminSideBar;
