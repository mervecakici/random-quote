import React from 'react';

import { getRandomNumber } from '../Utils/MathUtils.js'

import "./MainComponent.css";
import { TwitterShareButton, TwitterIcon,  WhatsappShareButton, WhatsappIcon, } from "react-share";


var COLORS = ["#81DAF5", "#04B4AE", "#FACC2E", "#FA8258", "#F5BCA9", "#D8CEF6", "#00FFBF", "#FA5858", "#FF00FF", "#0080FF"]

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
        const { quoteDataArray, quoteIndex, colorIndex} = this.state
        const { text, author } = quoteDataArray[quoteIndex]
        const authorString = author === null ? "Unknown author" : author
        
        

        return(
            <div id="main-container" style={{backgroundColor: COLORS[colorIndex]}}>
                <div id="quote-box">
                    <p id="text" style={{color: COLORS[colorIndex]}}>{text}</p>
                    <p id="author" style={{color: COLORS[colorIndex]}}>{`-${authorString}`}</p>
                    <div class="buttons">
                        <a href="twitter.com/intent/tweet" class="share-buttons" id="tweet-quote" ><TwitterShareButton url={`"${text}" -${authorString} #quoteoftheday`}><TwitterIcon size={32} round={true} /></TwitterShareButton></a>
                        <a href="web.whatsapp.com"class="share-buttons" id="whatsapp-quote" ><WhatsappShareButton url={`"${text}" -${authorString}`}><WhatsappIcon size={32} round={true}/></WhatsappShareButton></a>
                        <button id="back-button" onClick={this.handlePreviousQuote} disabled={this.state.quotePrevArray.length<=0} style={{backgroundColor: COLORS[colorIndex], borderColor: COLORS[colorIndex] }}>Previus</button>
                        <button id="new-quote" onClick={this.handleChangeQuote} style={{backgroundColor: COLORS[colorIndex], borderColor: COLORS[colorIndex]}} >New Quote</button>
                    </div>
                </div>
            </div>
            
        )
    };

};

export default MainComponent


  