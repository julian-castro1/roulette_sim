import styled from 'styled-components'
import { useState } from 'react'
import { ssrDynamicImportKey } from 'vite/runtime';

function Card({card, color, isFlipped, setIsFlipped, index}) {

  function flip(){
    setIsFlipped(index);
  }

  function cap(phrase) {
    return phrase
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

  function realColor(c){
    if(c === "blue"){
      return "#2121b8"
    }
      else if(c === "red"){
        return "#b51c1c"
      }
        else if(c === "neutral"){
            return "#b4914b"
        }
        else if(c === "bomb"){
            return "#000000"
        }
  }

  return (
    <CardContainer className="card" color={realColor(color)} onClick={flip} flipped={isFlipped.toString()}>
      <Word>
        <Text>
            {cap(card)}
        </Text>
      </Word>
    </CardContainer>
  )
}

const CardContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 20px;
    background-color: ${props => props.flipped != "false" ? props.color : "#1d1d1d"};
    border-radius: 20px;

    &:hover{
      cursor: pointer;
    }
`
const Word = styled.div`
  font-size: 20px;
  font-weight: 700;

`
const Text = styled.p`

`

export default Card;