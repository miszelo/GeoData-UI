import styled from "styled-components";

const mobileBreakpoint = "768px";

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 1rem;

  @media (max-width: ${mobileBreakpoint}) {
    padding: 0 10px;
  }
`;

export const MapTitle = styled.h3`
`;

export const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  .leaflet-popup-content-wrapper {
    width: 2vw;
    background-color: red;
  }
  
  h3 {
    font-size: 1.2em;
    margin-bottom: 8px;
    color: #333;
    word-break: break-word;
  }

  h4 {
    font-size: 1em;
    color: #888;
    margin-bottom: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;

    th,
    td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }
  }

  @media (max-width: ${mobileBreakpoint}) {
    h3 {
      font-size: 1em;
    }

    h4 {
      font-size: 0.8em;
    }

    table {
      th,
      td {
        padding: 6px;
        font-size: 0.9em;
      }
    }
  }
`;
