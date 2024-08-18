import styled from "styled-components";
import { useState } from "react";
import { tableDef } from "./tableDef";
import ChipSvg from "./ChipSvg";

function RouletteTable({ currentChip, chipColors }) {
  const [betsQueue, setBetsQueue] = useState([]);
  const [undoQueue, setUndoQueue] = useState([]);
  const [showPayout, setShowPayout] = useState(true);
  const [betPayouts, setBetPayouts] = useState({});
//   const [bets]

function toggleShowPayout(){
  setShowPayout(!showPayout);
}
function recalculatePayouts(bets){
  const colorToValue = {
    'white' : 1,
    'red' : 5,
    'green' : 25,
    'black' : 50,
    'purple' : 100,
  }

  let numberTotals = {};
  bets.map((bet) => {
    console.log(`The bet is: $${colorToValue[bet.value]} on values ${bet.places}`)
    let basePayout = 36 / bet.places.length;
    let fullPayout = colorToValue[bet.value] * basePayout;
    console.log(`so base payout is: $${basePayout} and total payout is: ${fullPayout}`)
    for(let colorVals in bet.places){
      console.log(`place "${bet.places[colorVals]}" in ${bet.places}`)
      numberTotals[bet.places[colorVals]] = numberTotals[bet.places[colorVals]] ? numberTotals[bet.places[colorVals]] + fullPayout : fullPayout;
    }
  })
  // console.log(numberTotals)

  setBetPayouts(numberTotals);
  // console.log(numberTotals)
}
function clearBoard(){
  setUndoQueue([...betsQueue]);
  setBetsQueue([])
  setBetPayouts({});
}
function redoBoard(){
  if(undoQueue.length){
  enqueue(undoQueue.at(-1));
  setUndoQueue((undoQueue) => undoQueue.slice(0,-1));
  }
}
function undoBoard(){
  if(betsQueue.length){
  setUndoQueue((undoQueue) => [...undoQueue, betsQueue.at(-1)]);
  setBetsQueue((betsQueue) => betsQueue.slice(0, -1));
  }
}

// Function to add an item to the queue
const enqueue = (item) => {
    setBetsQueue((betsQueue) => [...betsQueue, item]);
    recalculatePayouts([...betsQueue, item]);
  };

  // Function to remove an item from the front of the queue
  const dequeue = () => {
    setBetsQueue((betsQueue) => betsQueue.slice(1));
  };

  // numbers - an array of numbers to be bet on
  // value - value of bet placed
  function placeBet(numbers, chipLocation) {
    // console.log(chipLocation)
    enqueue({value: currentChip, places: numbers, chipPosition: chipLocation, origin: numbers[0]});

  }

  function drawChip(bet){
    // console.log(bet.chipPosition)

    let location = bet.chipPosition;
    
    return <ChipSvg key={location.x * location.y} position={location} color={bet.value} radius={14}></ChipSvg>;
  }

  function placeChip(e) {
    const div = e.target;
    const { clientX, clientY } = e;

    const rect = div.getBoundingClientRect();
    const divWidth = rect.width;
    const divHeight = rect.height;
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;

    const { left, top, right, bottom, width, height } = rect;


    const center = { x: left + width / 2, y: top + height / 2 }
    // Corners
    const topLeft = { x: left, y: top };
    const topRight = { x: right, y: top };
    const bottomLeft = { x: left, y: bottom };
    const bottomRight = { x: right, y: bottom };

    // Sides
    const middleTop = { x: left + width / 2, y: top };
    const middleBottom = { x: left + width / 2, y: bottom };
    const middleLeft = { x: left, y: top + height / 2 };
    const middleRight = { x: right, y: top + height / 2 };

    function classifyClick(offsetX, offsetY, height, width, clickedKey) {
      if(clickedKey == "0" || clickedKey == "00")
          return "M";
      const BORDER_PCT = 0.2; // 20% (on all sides) counts as an edge click
      let left = offsetX < width * BORDER_PCT;
      let right = offsetX > width - width * BORDER_PCT;
      let top = offsetY < height * BORDER_PCT;
      let bottom = offsetY > width - width * BORDER_PCT;

      let cornerA = left && top;
      let cornerB = right && top;
      let cornerC = left && bottom;
      let cornerD = right && bottom;

      if (cornerA) { return "A";  }
      else if (cornerB) { return "B"; } 
      else if (cornerC) {return "C"; } 
      else if (cornerD) { return "D"; } 
      else if (left) { return "L"; }
      else if (top) { return "T"; }
      else if (right) { return "R"; }
      else if (bottom) { return "X"; }
      else { return "M"; }
    }

    function getRelevantNumbers(clickedKey, classifiedClick){
        let numbersClicked = [clickedKey];
        let chipLocation = center;
        let spotClicked = tableDef[clickedKey];
        console.log(`classified click: ${classifiedClick} for ${clickedKey}`)

        let invalid = classifiedClick == "L" && !spotClicked.left || classifiedClick == "R" && !spotClicked.right || classifiedClick == "T" && !spotClicked.up || classifiedClick == "X" && !spotClicked.down || classifiedClick == "A" && (!spotClicked.left || !spotClicked.up) || classifiedClick == "B" && (!spotClicked.right || !spotClicked.up) || classifiedClick == "C" && (!spotClicked.left || !spotClicked.down) || classifiedClick == "D" && (!spotClicked.right || !spotClicked.down)

        if(invalid){ 
            console.log("invalid bet");
            return null;
        }

        if(["L", "R", "X", "T"].includes(classifiedClick) && tableDef[clickedKey].class == "number"){
            // if the click is on the side and includes 2 numbers
            switch(classifiedClick){
                case "L": numbersClicked.push(spotClicked.left); chipLocation = (middleLeft); break;
                case "R": numbersClicked.push(spotClicked.right); chipLocation = (middleRight); break;
                case "X": numbersClicked.push(spotClicked.down); chipLocation = (middleBottom); break;
                case "T": numbersClicked.push(spotClicked.up); chipLocation = (middleTop); break;
            }
        } else {
            // if the click is on a corner
            let neighbor;
            switch(classifiedClick){
                case "A": numbersClicked.push(spotClicked.left); numbersClicked.push(spotClicked.up); numbersClicked.push(tableDef[spotClicked.up].left); chipLocation = (topLeft); break;
                case "B": numbersClicked.push(spotClicked.right); numbersClicked.push(spotClicked.up); numbersClicked.push(tableDef[spotClicked.up].right);  chipLocation = (topRight);break;
                case "C": numbersClicked.push(spotClicked.left); numbersClicked.push(spotClicked.down); numbersClicked.push(tableDef[spotClicked.down].left);  chipLocation = (bottomLeft);break;
                case "D": numbersClicked.push(spotClicked.right); numbersClicked.push(spotClicked.down); numbersClicked.push(tableDef[spotClicked.down].right); chipLocation = (bottomRight); break;
            }
        }

        if(spotClicked.class != "number" && spotClicked.class != "zero"){
          // clicked a grouped bet
          numbersClicked = [...spotClicked.selectedVals]
        }

        return [numbersClicked, chipLocation];
    }
    
    let clickedKey = div.getAttribute("data-key");
    let clickLocation = classifyClick(offsetX, offsetY, divHeight, divWidth, clickedKey);
    
    let [numbersClicked, chipLocation] = getRelevantNumbers(clickedKey, clickLocation);
    placeBet(numbersClicked, chipLocation)
    // console.log(numbersClicked);
  }

  return (
    <MainContainer>
      <Table>
        {Object.keys(tableDef).map((valKey) => {
          let spot = tableDef[valKey];
          let gridStyle = {
            gridRowStart: spot.position.rowStart,
            gridRowEnd: spot.position.rowEnd,
            gridColumnStart: spot.position.colStart,
            gridColumnEnd: spot.position.colEnd,
            backgroundColor: spot.color,
          };

          return (
            <Spot
              style={gridStyle}
              data-key={valKey}
              key={valKey}
              onClick={placeChip}
              chipclass={spot.class}
            >
              <SpotValue>{spot.value}</SpotValue>
              {(showPayout && (spot.class == "number" || spot.class == "zero")) &&
              <SpotPayout showpayout={showPayout.toString()} back={gridStyle.backgroundColor}>${betPayouts[spot.value] ? betPayouts[spot.value] : 0}</SpotPayout>
        }
              
            </Spot>
          );
        })}
        {
                    betsQueue.map((bet)=>{
                        return drawChip(bet);
                    })
                }
      </Table>
      <ControlButtons>
      <ShowPayoutButton show={showPayout.toString()} onClick={toggleShowPayout}>
        <SampleText>SHOW</SampleText><SampleText> PAYOUT</SampleText>
      </ShowPayoutButton>
      <ClearBoardButton onClick={clearBoard}>
        CLEAR BOARD
      </ClearBoardButton>
      <ClearBoardButton onClick={undoBoard}>
        UNDO
      </ClearBoardButton>
      <ClearBoardButton onClick={redoBoard}>
        REDO
      </ClearBoardButton>
      </ControlButtons>
    </MainContainer>
  );
}

const SpotPayout = styled.div`
  font-size: .7rem;
  pointer-events: none;

  color: ${props => props.showpayout == "true" ? '#FFFFFF' : props.back};
`
const SpotValue = styled.div`
  pointer-events: none;
`
const SampleText = styled.div`
  
`
const ControlButtons = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
`
const ShowPayoutButton = styled.div`
display: flex;
flex-direction: column;
  background-color: ${props => props.show == "true" ? "#319b35" : "#363636"};
  color: #212121;
  font-size: 1rem;
  font-weight: 800;
  padding: 1.2rem;
  padding-top: .2rem;
  padding-bottom: .2rem;
  border-radius: 1rem;
  &:hover{
    cursor: pointer;
  }
`
const ClearBoardButton = styled.div`
  background-color: #363636;
  font-size: 1.5rem;
  font-weight: 800;
  padding: 1.2rem;
  padding-top: .7rem;
  padding-bottom: .7rem;
  border-radius: 1rem;

  &:hover{
    cursor: pointer;
    background-color: #282828;
  }
`
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 2;
  /* padding: 5rem; */
`;

const Spot = styled.div`
  display: flex;
  flex-direction: ${props => props.chipclass == 'third' || props.chipclass == 'half' ? 'row' : 'column'} ;
  gap: ${props => props.chipclass == 'third' || props.chipclass == 'half' ? '.7rem' : '0'} ;
  background-color: green;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #e5e5e5; */
  /* border-radius: .2rem; */

  font-size: 1.1rem;
  font-weight: 800;

`;
const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(28, 1.8rem);
  grid-template-rows: repeat(6, 2rem) repeat(2, 2rem);
  height: 100%;
  width: 100%;

  gap: 2px;
`;

export default RouletteTable;
