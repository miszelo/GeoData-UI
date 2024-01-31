import styled from "styled-components";
const mobileBreakpoint = "768px";

export const Chart = styled.div`
  width: 50%;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%; /* Set width to 100% on smaller screens */
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
  width: 90vw;

  @media (max-width: ${mobileBreakpoint}) {
    width: 100%;
  }
`;
export const ChartTitle = styled.h3`
  @media (max-width: ${mobileBreakpoint}) {
    max-width: 80%;
    text-align: center;
  }`;
