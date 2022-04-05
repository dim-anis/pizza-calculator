import styled from "styled-components";

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--secondary-text-color)"};
  border-radius: ${(props) =>
    props.name === "easy"
      ? "5px 0px 0px 5px"
      : props.name === "hard"
      ? "0px 5px 5px 0px"
      : "0px"};
  border: ${(props) =>
    props.active
      ? "1px solid var(--primary-color)"
      : "1px solid var(--gray-inactive-color)"};
  border-left: ${(props) =>
    props.position === "middle" && props.active
      ? "1px solid var(--primary-color)"
      : props.active
      ? "1px solid var(--primary-color)"
      : "1px solid var(--gray-inactive-color)"};
  border-right: ${(props) =>
    props.position === "middle" && props.active
      ? "1px solid var(--primary-color)"
      : props.active
      ? "1px solid var(--primary-color)"
      : "1px solid var(--gray-inactive-color)"};
  background-color: ${(props) =>
    props.active ? "var(--primary-selected)" : "transparent"};
  transition: 250ms all ease-in-out;

  &:hover {
    border-color: var(--primary-hover-color);
  }
`;

export default function OptionsButton({ name, className, onClick }) {
  return (
    <Button onClick={onClick} name={name} active={className}>
      {name}
    </Button>
  );
}
