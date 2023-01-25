import { useState } from "react";
import {
  Paper,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Tooltip,
  Grow,
  Dialog,
  ListItemButton,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  GitHub,
  LinkedIn,
  Telegram,
  Twitter,
  Email,
  ConnectWithoutContact,
  ContentCopy,
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

const ContactEmail = import.meta.env.VITE_CONTACT_EMAIL;

const socials: ISocials[] = [
  {
    Icon: Email,
    name: "Email",
    link: ContactEmail, // TODO: Change this
    color: "success",
  },
  {
    Icon: LinkedIn,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/sean-stocker-404149226/",
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
    link: "https://t.me/seanstocker",
    color: "primary",
  },
  {
    Icon: Twitter,
    name: "Twitter",
    link: "https://twitter.com/sean_s150",
    color: "info",
  },
];

function Sidebar() {
  const [openEmail, setOpenEmail] = useState(false);
  const [openCopiedMsg, setOpenCopiedMsg] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openSocials = Boolean(anchorEl);
  const handleOpenSocials = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSocials = () => {
    setAnchorEl(null);
  };

  function handleEmailOpen() {
    setOpenEmail(true);
  }

  function handleEmailClose() {
    setOpenEmail(false);
    handleCloseSocials();
  }

  function copyEmailToClipboard() {
    setOpenCopiedMsg(true);
    navigator.clipboard.writeText(ContactEmail);
  }

  function handleCopiedMsgClose() {
    setOpenCopiedMsg(false);
  }

  return (
    <>
      <Paper
        id="fade-button"
        aria-controls={openSocials ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openSocials ? "true" : undefined}
        onClick={handleOpenSocials}
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
        open={openSocials}
        onClose={handleCloseSocials}
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
              {name === "Email" ? (
                <ListItemButton onClick={handleEmailOpen}>
                  <Icon color={color} fontSize="large" />
                </ListItemButton>
              ) : (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: 0, margin: 0 }}
                >
                  <MenuItem onClick={handleCloseSocials}>
                    <Icon color={color} fontSize="large" />
                  </MenuItem>
                </a>
              )}
            </Tooltip>
          ))}
        </MenuList>
      </Menu>

      {/* Dialog for Copying Contact Email */}
      <Dialog onClose={handleEmailClose} open={openEmail}>
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <TextField
            defaultValue={ContactEmail}
            disabled
            size="medium"
            sx={{
              width: 230,
              bgcolor: "#212121",
            }}
          />
          <IconButton
            size="large"
            sx={{ borderRadius: "50%" }}
            onClick={copyEmailToClipboard}
          >
            <ContentCopy sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Stack>
      </Dialog>

      {/* "Copied" Message */}
      <Snackbar
        open={openCopiedMsg}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1500}
        onClose={handleCopiedMsgClose}
        message="Email Copied"
      >
        <Alert
          onClose={handleCopiedMsgClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Email Copied
        </Alert>
      </Snackbar>
    </>
  );
}

export default Sidebar;
