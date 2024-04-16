import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");
export const logout = async () => {
  console.log(token);
  try {
    const res = await axios.post("http://localhost/api/user/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.clear();
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
    let data = res.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
