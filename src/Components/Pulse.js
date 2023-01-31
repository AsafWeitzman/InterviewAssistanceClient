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
const Pulse = styled.div`
  padding: 10px 10px;
  border-radius: 8px;
  text-align: center;
  animation: ${pulse} 2s ease-out;
  animation-iteration-count: ${(props) => {
    console.log(props);
    return props.shouldPules ? "infinite" : "0";
  }};
`;

export default Pulse;
