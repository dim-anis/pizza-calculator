import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const Input = styled.select`
  padding: 0.5em 0.5em;
  width: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  background: none;

  &::active, ::focus {
    border: 2px solid var(--primary-hover-color);
  }
`;

const CustomArrow = styled.span`
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  height: 100%;
  width: 3rem;
  background: var(--primary-color);
  border-radius: 0px 5px 5px 0px;
  pointer-events: none;

  &::before, ::after {
    --size: 0.3em;

    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid rgba(255, 255, 255, 1);
    top: 40%;
  }

  &::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid rgba(255, 255, 255, 1);
    top: 60%;
  }
`;

export default function SelectOption({ options, typeOfPizza, handleChange }) {
  return (
    <Container>
      <Input value={typeOfPizza} onChange={handleChange}>
        {options.map((pizza, index) => (
          <option value={pizza.label} key={index}>
            {pizza.name}
          </option>
        ))}
      </Input>
      <CustomArrow />
    </Container>
  );
}
