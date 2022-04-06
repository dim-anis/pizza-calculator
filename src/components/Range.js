import styled, { css } from "styled-components";

const trackH = "0.4em";
const thumbD = "1.25em";
const trackC = "#ccced0";
const filllC = "#ff6347";

const track = css`
  box-sizing: border-box;
  border: none;
  height: 4px;
  background: ${trackC};
  border-radius: 8px;
`;

const trackFill = css`
  ${track};
  height: 6px;
  background-color: transparent;
  background-image: linear-gradient(${filllC}, ${filllC}),
    linear-gradient(${trackC}, ${trackC});
  background-size: var(--sx) 6px, calc(100% - var(--sx)) 4px;
  background-position: left center, right center;
  background-repeat: no-repeat;
`;

const fill = css`
  height: ${trackH};
  background: ${filllC};
  border-radius: 4px;
`;

const thumb = css`
  box-sizing: border-box;
  border: none;
  width: ${thumbD};
  height: ${thumbD};
  border-radius: 50%;
  background: white;
  box-shadow: 0px 0px 5px rgba(66, 97, 255, 0.5);
`;

const Slider = styled.input`
  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus::-moz-range-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus::-ms-thumb {
    outline: -webkit-focus-ring-color auto 5px;
  }

  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--val) - var(--min)) / var(--range));
  --sx: calc(0.5 * ${thumbD} + var(--ratio) * (100% - ${thumbD}));

  margin: 0;
  padding: 0;
  height: ${thumbD};
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    ${trackFill};
  }

  &::-moz-range-track {
    ${track};
  }

  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${fill};
  }

  &::-ms-fill-lower {
    ${fill};
  }

  &::-webkit-slider-thumb {
    margin-top: calc(0.5 * (${trackH} - ${thumbD}));
    ${thumb};
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`;

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0rem;
`;

const Input = styled.input`
  width: auto;
  padding: 0.25rem;
  border: 1px solid var(--gray-inactive-color);
  border-radius: 5px;
  text-align: right;
  font-weight: bold;
  text-align: center;
`;

export default function Range({itemName, max, min, step, value, onChange, id}) {
  return (
    <ComponentContainer>
      <LabelContainer>
        <p>{itemName}</p>
        <Input type="number" id={id} min={min} max={max} value={value} onChange={onChange} />
      </LabelContainer>
      <Slider type="range"
              onChange={onChange}
              value={value}
              step={step}
              max={max}
              style={{
                "--min": min,
                "--max": max,
                "--val": value,
              }}
              id={id}
      />
    </ComponentContainer>
  );
}
