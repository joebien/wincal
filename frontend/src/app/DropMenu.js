import React from 'react'
import { Menu, MenuItem, Button } from '@material-ui/core';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { Link }  from 'react-router-dom';

export default function DropMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuOpenIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={"/"}>
          <MenuItem onClick={handleClose}>Calendar</MenuItem>
        </Link>

        <Link to={"/users"}>
          <MenuItem onClick={handleClose}>Users</MenuItem>
        </Link>

        <Link to={"/textA"}>
          <MenuItem onClick={handleClose}>textA</MenuItem>
        </Link>

        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
