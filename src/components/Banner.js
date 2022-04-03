import styled from "styled-components";
import { useState } from "react";

import { ReactComponent as MenuIcon } from "../static/menu-outline.svg";
import { ReactComponent as CloseIcon } from "../static/close-outline.svg";
import Pizza from "../static/pizza.png";
import DropdownMenu from "./DropdownMenu";
import NavItem from "./NavItem";

const BannerContainer = styled.div`
  width: 100%;
  height: 25%;
  border-radius: 0px 0px 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--primary-color);
  color: var(--primary-text-color);
  overflow: hidden;
  position: relative;
`;

const NavBar = styled.nav`
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin: 1rem 0rem;
  z-index: 2;
`;

const Logo = styled.a`
  color: var(--primary-text-color);
  text-decoration: none;
  font-size: 2.5rem;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 52%;
  left: 65%;
`;

const MenuItem = styled.a`
  text-decoration: none;
  color: var(--primary-text-color);
  width: fit-content;
  &:hover {
    border-bottom: 1px solid var(--primary-text-color);
  }
`;

export default function Banner() {
  const [menuOpen, setMenuOpen] = useState(false);

  function openMenu(e) {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }

  return (
    <BannerContainer>
      <NavBar>
        <Logo href="#">
          <span>PizzaCalculator</span>
        </Logo>
        <NavItem
          icon={menuOpen ? <CloseIcon /> : <MenuIcon />}
          onClick={openMenu}
          menuOpen={menuOpen}
        />
        <DropdownMenu menuOpen={menuOpen}>
          <MenuItem href="https://github.com/dim-anis/pizza-calculator">Github</MenuItem>
        </DropdownMenu>
      </NavBar>
      <Img src={Pizza} alt="pizza" />
    </BannerContainer>
  );
}
