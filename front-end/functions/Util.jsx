import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
const API = "http://localhost/api/";
export const logout = async () => {
  const navigate = useNavigate();
  try {
    /* const res = await axios.post("http://localhost/api/user/logout", {
      headers: {
        Authorization: `${token}`,
      },
    });*/
    localStorage.clear();
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const check = async () => {
  try {
    const res = await axios.get("http://localhost/api/user/check", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = res;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPortfolio = async () => {
  try {
    const res = await axios.get(API + "portfolio/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = res.data;
    return data ;
  } catch (error) {
    console.log(error);
  }
};
