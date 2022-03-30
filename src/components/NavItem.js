import styled from "styled-components";

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.a`
  width: 2rem;
  aspect-ratio: 1;
  color: var(--primary-text-color);
  z-index: 9999;
`;

export default function NavItem({ menuOpen, icon, onClick, children }) {
  return (
    <Item>
      <Button href="/" onClick={onClick}>
        {icon}
      </Button>
      {menuOpen && children}
    </Item>
  );
}
