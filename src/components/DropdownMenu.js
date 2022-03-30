import styled from "styled-components";

// background: var(--primary-hover-color);

const Dropdown = styled.div`
  position: fixed;
  background: hsl(0 0% 0% / 0.75);
  backdrop-filter: blur(0.3rem);
  inset: 0 0 0 30%;
  padding: min(30vh, 10rem) 2em;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: ${(props) =>
    props.menuOpen ? "translateX(0%)" : "translateX(100%)"};
  transition: transform 350ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  font-size: 1.5rem;
`;

export default function DropdownMenu({ menuOpen, children }) {
  return <Dropdown menuOpen={menuOpen}>{children}</Dropdown>;
}
