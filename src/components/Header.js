
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios/axios";
export default function Header() {
  const [data, setData] = useState({});
  const fectchData = async () => {
    try {
      const res = await Axios.get("/receptionist/home");
      console.log(res.data.data.data);
      setData({
        name: res.data.data.data.name,
        role: res.data.data.data.role,
        gender: res.data.data.data.gender,
        id: res.data.data.data.id,
      });
      console.log("data: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fectchData();
  }, []);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div style={styles.navbar}>
      <div style={styles.userInfo}>
        <div style={styles.userAvatar}></div>
        <div style={styles.userName}>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {data.name}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #DDD",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    background: "#D9D9D9",
    borderRadius: "50%",
    marginRight: "20px",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};
