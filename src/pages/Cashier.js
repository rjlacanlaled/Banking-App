import React, { useState } from "react";
import styled from "styled-components";
import { TransactionTypes } from "./TypeofTransaction";

export default function Transactions() {

   return (
      <Wrapper>
         <TransactionTypes />
      </Wrapper>
   );
}

const Wrapper = styled.div`
   height: 100vh;
   width: 100vw;
`;
