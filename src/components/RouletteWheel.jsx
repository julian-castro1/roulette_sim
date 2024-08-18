import styled from 'styled-components'

function RouletteWheel(){
    return(
            <MainContainer> 
                <Title> Spin: </Title>

                <SubContainer>
                    <MiniTitle>Manual Selection:</MiniTitle>
                    <Description>Calculate the payout if a specific number is spun!</Description>
                    <SelectContainer>
                        <TextBox>

                        </TextBox>
                        <CalculateButton val={true.toString()}>
                            GO!
                        </CalculateButton>
                    </SelectContainer>
                </SubContainer>
                <SubContainer>
                    <MiniTitle>Random Spin:</MiniTitle>
                    <Description>Test your strategy by simulating a real spin, place your chips and try your luck!</Description>
                    <SelectContainer>
                        <TextBox>

                        </TextBox>
                        <CalculateButton val={false.toString()}>
                            SPIN!
                        </CalculateButton>
                    </SelectContainer>
                </SubContainer>
            </MainContainer>
    )
}

const BalanceContainer = styled.div`
    height: 2rem;
    background-color: red;
`
const StartingBalance = styled.div`
    
`
const LastChange = styled.div`
    
`
const ChipsContainer = styled.div`
    
`
const MainContainer = styled.div`
    flex: 1;
    /* width: 20%; */

    background-color: #2d2d2d;
    border-radius: 2.2rem;


    padding: 2rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
    

    display:flex;
    flex-direction: column;
`
const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 800;
    padding-bottom: 1rem;
`
const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

`
const MiniTitle = styled.div`
    font-weight: 700;
`
const Description = styled.div`
    font-size: .8rem;
    text-align: left;
`
const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    /* justify-content: space-between; */

    padding-top: 1rem;
    padding-bottom: 1rem;
    gap: .7rem;
`
const TextBox = styled.div`
    background-color: #3d3d3d;
    border-radius: 1rem;
    min-width: 5rem;
    flex: 4;
`
const CalculateButton = styled.div`
    background-color: #5bbb5b;
    font-weight: 900;
    font-size: 1rem;
    color: #2d2d2d;
    padding: 1rem;
    border-radius: 1rem;
    flex: ${props => props.val == "true" ? 1 : 9};

    &:hover{
        cursor: pointer;
    }
`

export default RouletteWheel;