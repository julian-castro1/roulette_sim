import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import RouletteTable from "./components/RouletteTable";
import RouletteWheel from "./components/RouletteWheel";
import ChipSvg from "./components/ChipSvg";

function App() {
  const [currentChip, setChip] = useState("white");

  const chipColors = {
    "white" : ["#dddddd", "#9b9b9b"],
    "red" : ["#be0909", "#6f0303"],
    "green" : ["#2ee412", "#24740c"],
    "black" : ["#000000", "#434343"],
    "purple" : ["#9b17ac", "#580a62"],
  }

  return (
    <>
      <TitleContainer>
        {/* <Title> Roulette Simulator </Title> */}
        <Subtitle>
          {" "}
          To begin, place chips on the board and spin to see payout!{" "}
        </Subtitle>
      </TitleContainer>
      <BalanceContainer>
        <StartingBalance>Starting Balance: $500</StartingBalance>
        <LastChange>
          <LastChangeLabel>Last Spin: </LastChangeLabel>
          <LastChangeValue>-</LastChangeValue>
        </LastChange>
        <ChipsContainer>
          <Chip colarr={chipColors} sel={currentChip} col={"white"} onClick={()=>{setChip("white");}}>$1</Chip>
          <Chip colarr={chipColors} sel={currentChip} col={"red"} onClick={()=>{setChip("red");}}>$5</Chip>
          <Chip colarr={chipColors} sel={currentChip} col={"green"} onClick={()=>{setChip("green");}}>$25</Chip>
          <Chip colarr={chipColors} sel={currentChip} col={"black"} onClick={()=>{setChip("black");}}>$50</Chip>
          <Chip colarr={chipColors} sel={currentChip} col={"purple"} onClick={()=>{setChip("purple");}}>$100</Chip>
        </ChipsContainer>
      </BalanceContainer>
      <ContentContainer>
        <RouletteWheel></RouletteWheel>
        <RouletteTable currentChip={currentChip} chipColors={chipColors}></RouletteTable>
      </ContentContainer>
    </>
  );
}

const Chip = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 5rem;
  background-color: ${props => props.colarr[props.col][0]};

  border: ${props => props.sel == props.col ? `3px solid ${props.colarr[props.col][1]}` : "0"};

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 1.2rem;
  font-weight: 900;
  color: #212121;

  &:hover{
    cursor: pointer;
  }
`
const BalanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* height: 2rem; */

  margin-bottom: 2rem;
  justify-content: space-between;
  width: 90%;
`;
const StartingBalance = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: #2a2a2a;
`;
const LastChange = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

background-color: #2e2e2e;
padding: .2rem;
padding-left: 2rem;
padding-right: 2rem;
border-radius: 1rem;
`;
const LastChangeLabel = styled.div`
font-weight: 500;
font-size: .7rem;
color: #7d7d7d;
`;
const LastChangeValue = styled.div`
font-weight: 800;
font-size: 2rem;
color: #e5e5e5;
`;
const ChipsContainer = styled.div`
  display: flex;
  gap: .6rem;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  margin-bottom: 0.7rem;
`;
const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
`;
const Subtitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: gray;
`;
const ContentContainer = styled.div`
  display: flex;
  /* padding: 2rem; */
  
  flex-direction: row;

  @media (width <= 1250px) {
    flex-direction: column;
  }
  width: 90vw;

  gap: 4rem;
`;

export default App;
