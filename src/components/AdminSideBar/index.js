import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

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
  BsCreditCard,
  BsBoxArrowRight,
  BsArchive
} from "react-icons/bs";
import { FiUsers, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";

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
          {menuCollapse ? <img src={LogoMin} alt="Alumen" /> : <img src={Logo} alt="Alumen" />}
        </div>
        <div className="closemenu" onClick={menuIconClick}>
          {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem icon={<AiOutlineDashboard />}>
            <NavLink to="/admin"><p className="txtStle">Dashboard</p></NavLink>
          </MenuItem>
          <MenuItem icon={<BsBag />}>
            <Link to="/admin/products"><p className="txtStle">Products</p></Link>
          </MenuItem>
          <MenuItem icon={<BsArchive />}>
            <Link to="/admin/categories"><p className="txtStle">Categories</p></Link>
          </MenuItem>
          <MenuItem icon={<BsCreditCard />}>
            <Link to="/admin/orders"><p className="txtStle">Orders</p></Link>
          </MenuItem>
          <MenuItem icon={<FiUsers />}>
            <Link to="/admin/users"><p className="txtStle">Users</p></Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Menu iconShape="round">
          <MenuItem icon={<BsBoxArrowRight />}>
            <Link to="/"><p className="txtStle">Back</p></Link>
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default AdminSideBar;
