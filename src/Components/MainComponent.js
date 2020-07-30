import React from 'react';

import { getRandomNumber } from '../Utils/MathUtils.js'

import "./MainComponent.css";


var COLORS = ["#F3F781", "#81DAF5", "#04B4AE", "#FACC2E", "#FA8258", "#F5BCA9", "#D8CEF6", "#00FFBF", "#FA5858", "#FF00FF", "#0080FF"]

class MainComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            colorIndex: getRandomNumber(COLORS.length /* Max value */),
            quoteDataArray: [{
                text: '',
                author: ''
            }],
            quoteIndex: 0,
            quotePrevArray : [],
        }
        this.handleChangeQuote = this.handleChangeQuote.bind(this);
        this.handlePreviousQuote = this.handlePreviousQuote.bind(this);
    
    };
    handleChangeQuote(){
        const { quoteDataArray } = this.state
        this.setState({
            colorIndex: getRandomNumber(COLORS.length /* Max value */),
            quoteIndex: getRandomNumber(quoteDataArray.length),
            quotePrevArray: this.state.quotePrevArray.concat([this.state.quoteIndex])
        })
    }
    handlePreviousQuote(){
       if(this.state.quotePrevArray.length > 0){
        this.setState({
            quoteIndex: this.state.quotePrevArray[this.state.quotePrevArray.length-1],
            quotePrevArray: this.state.quotePrevArray.reverse().slice(1).reverse(),
            colorIndex: getRandomNumber(COLORS.length /* Max value */),
        })
    }
      else{
        this.setState({
            quoteIndex: this.state.quotePrevArray[0],
        })
      }
    }
  

    componentDidMount() {
        fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(data => {
            this.setState({
                quoteDataArray: data,
                quoteIndex: getRandomNumber(data.length)
            })
        });
    }
 
    render(){
        const { quoteDataArray, quoteIndex, colorIndex,quotePrevArray } = this.state
        const { text, author } = quoteDataArray[quoteIndex]
        console.log("mrev",quoteDataArray[quoteIndex])
        console.log("abc",quotePrevArray)

        return(
            <div id="main-container" style={{backgroundColor: COLORS[colorIndex]}}>
                <div id="quote-box">
                    <p id="text" style={{color: COLORS[colorIndex]}}>{text}</p>
                    <p id="author" style={{color: COLORS[colorIndex]}}>{`-${author}`}</p>
                    <div class="buttons">
                        <a class="share-buttons" id="tweet-quote">twitter</a>
                        <a class="share-buttons" id="whatsapp-quote" >whatsapp</a>
                        <a class="share-buttons" id="facebook-quote">facebook</a>
                        <button id="back-button" onClick={this.handlePreviousQuote} disabled={this.state.quotePrevArray.length<=0} style={{backgroundColor: COLORS[colorIndex]}}>Previus</button>
                        <button id="new-quote" onClick={this.handleChangeQuote} style={{backgroundColor: COLORS[colorIndex]}}>New Quote</button>
                    </div>
                </div>
            </div>
            
        )
    };

};

export default MainComponent


  