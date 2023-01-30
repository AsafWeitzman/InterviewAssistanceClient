import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const pulse = keyframes`
  from {
    background-color: rgba(255,255,255,0.1);
  }

  to {
    background-color: rgba(255,255,255,0.8);
  }
`;
//
const Pulse = styled.div`
  padding: 8px 8px;
  border-radius: 8px;
  text-align: center;
  animation: ${pulse} 3s ease-in-out;
  animation-iteration-count: infinite;
`;

export default Pulse;
