import React, { Component } from 'react';
import styled from 'styled-components';
import Rules from '../components/ReactBulsAndCowsGame/Rules';
import Game from '../components/ReactBulsAndCowsGame/Game';
import Difficulties from '../components/ReactBulsAndCowsGame/Difficulties'
import landScape from '../../public/game/bull-bg.jpg';

const AppWrapper = styled.div`
  padding: 1rem;
  color: white;
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${landScape});
  height: 100vh;
  box-sizing: border-box;
  overflow: scroll;
`
const AppHeader = styled.h1`
  display: inline-block;
  background-color: rgba(0,0,0,0.5);
  padding: 15px;
`

const PlayAgainButton = styled.button`
background: transparent;
font-family: inherit;
font-size: 14px;
margin: 0 auto;
font-weight: normal;
color: white;
padding: 1em;
display: block;
border: none;
text-decoration: underline;
cursor: pointer;
`
class RactBullsAndCows extends Component {
  state = {
    numberOfAttemptsSelected: 20
  };


  render() {
    return (
      <AppWrapper>
        <AppHeader>Bulls and Cows game</AppHeader>
        <div>
        <span className='bg-black bg-opacity-55 p-'>Имате 20 опита</span>
        </div>
        <Rules/>
        <PlayAgainButton onClick = { () => window.location.reload() }> 
         <span className="bg-black bg-opacity-55">Нова игра</span>      
         </PlayAgainButton>
        <Game 
          numberOfAttemptsSelected = { this.state.numberOfAttemptsSelected } 
        />
      </AppWrapper>
    );
  }
}

export default RactBullsAndCows;
