import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
} from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  { text: "Home", link: "/" },
  { text: "Stats", link: "/stats" },
  { text: "Settings", link: "/settings" },
];

const ResponsiveAppBar = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: any;
}) => {
  const [anchorElNav, setAnchorElNav] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <TopDiv>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.text}>
                    <ContainerDiv key={page.text}>
                      <Link href={page.link}>{page.text}</Link>
                    </ContainerDiv>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <ContainerDiv key={page.text}>
                  <Link href={page.link}>{page.text}</Link>
                </ContainerDiv>
              ))}
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Switch
                checked={theme == "dark"}
                onChange={() => {
                  theme == "dark" ? setTheme("light") : setTheme("dark");
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
              <a
                href={
                  "https://sonarcloud.io/summary/new_code?id=jonattfin_flowometer-web"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={
                    "https://sonarcloud.io/api/project_badges/measure?project=jonattfin_flowometer-web&metric=alert_status"
                  }
                  alt="sonar url"
                />
              </a>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </TopDiv>
  );
};
export default ResponsiveAppBar;

const ContainerDiv = styled.div`
  padding: 10px;
`;

const TopDiv = styled.div`
  padding: 1vh 0px;
`;

const ExtraParagraph = styled.p`
  padding: 0px 10px;
`;
