import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export const logout = async () => {
  let token = localStorage.getItem("token");
  try {
    const res = await axios.post("http://localhost/api/user/logout", token);
    localStorage.clear();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
