import { useState } from "react";
import {
  Paper,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Tooltip,
  Grow,
} from "@mui/material";

import {
  GitHub,
  LinkedIn,
  Telegram,
  Twitter,
  Email,
  ConnectWithoutContact,
} from "@mui/icons-material";

interface ISocials {
  Icon: any;
  name: string;
  link: string;
  color:
    | "disabled"
    | "primary"
    | "action"
    | "info"
    | "inherit"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | undefined;
}

const socials: ISocials[] = [
  {
    Icon: Email,
    name: "Email",
    link: "",
    color: "success",
  },
  {
    Icon: LinkedIn,
    name: "LinkedIn",
    link: "",
    color: "primary",
  },
  {
    Icon: GitHub,
    name: "GitHub",
    link: "https://github.com/sean-s14",
    color: "action",
  },
  {
    Icon: Telegram,
    name: "Telegram",
    link: "",
    color: "primary",
  },
  {
    Icon: Twitter,
    name: "Twitter",
    link: "",
    color: "info",
  },
];

function Sidebar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          left: 0,
          top: 0,
          width: 80,
          height: 80,
          borderRadius: 3,
          ml: 2,
          mt: 2,
        }}
      >
        <Tooltip title="Socials" placement="right">
          <IconButton
            size="small"
            sx={{ ml: 0, p: 2, borderRadius: "inherit" }}
          >
            <ConnectWithoutContact sx={{ width: 50, height: 50 }} />
          </IconButton>
        </Tooltip>
      </Paper>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow}
        sx={{
          position: "fixed",
          mt: 2,
          "& .MuiMenu-paper": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            borderRadius: 3,
          },
        }}
      >
        <MenuList>
          {socials.map(({ Icon, name, link, color }, index) => (
            <Tooltip key={index} title={name} placement="right">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: 0, margin: 0 }}
              >
                <MenuItem onClick={handleClose}>
                  <Icon color={color} fontSize="large" />
                </MenuItem>
              </a>
            </Tooltip>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default Sidebar;
