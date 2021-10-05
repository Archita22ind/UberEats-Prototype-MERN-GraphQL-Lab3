import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/restaurantDetails",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Orders",
    path: "/restaurantOrders",
    icon: <AiIcons.AiOutlineShop />,
    cName: "nav-text",
  },
  {
    title: "Sign Out",
    path: "/restaurantLogin",
    icon: <FaPowerOff />,
    cName: "nav-text",
  },
];
