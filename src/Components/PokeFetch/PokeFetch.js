import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
    }
  }

  componentDidMount() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  fetchPokemon() {
    let reveal = document.getElementById("reveal");
    reveal.style["filter"] = "brightness(5%)";
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))

      this.startCountdown(11)
  }

  startCountdown(seconds) {
    let counter = seconds;

    const interval = setInterval(() => {
      console.log(counter);
      counter = counter - 1;

      if (counter < 1) {
        clearInterval(interval);
        console.log('Time is up!')
        document.getElementById("pokeName").innerHTML = this.state.pokeName
        let reveal = document.getElementById("reveal");
        reveal.style["filter"] = "brightness(100%)";
      }

      document.getElementById("timer").innerHTML=counter;
    }, 1000);
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <span id="timer"></span>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} src={this.state.pokeSprite} alt="Pokemon" id="reveal" style={{ filter: 'brightness(5%)'}}/>
          <h1 className={'pokeName'} id="pokeName"></h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;