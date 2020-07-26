import React from 'react';

import { getRandomNumber } from '../Utils/MathUtils.js'

import "./MainComponent.css";


var COLORS = ["#F3F781", "#81DAF5", "#04B4AE", "#FACC2E", "#FA8258", "#F5BCA9", "#D8CEF6", "#00FFBF", "#FA5858", "#FF00FF", "#0080FF"]

class MainComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            colorIndex: getRandomNumber(COLORS.length /* Max value */),
        }
        this.changeColor = this.changeColor.bind(this);
    };
    changeColor(){
        this.setState({
            colorIndex: getRandomNumber(COLORS.length /* Max value */)
        })
    }

    render(){
        return(
            <div id="main-container" style={{backgroundColor: COLORS[this.state.colorIndex]}}>
                <div id="quote-box">
                    <p id="text" style={{color: COLORS[this.state.colorIndex]}}>Hello</p>
                    <p id="author" style={{color: COLORS[this.state.colorIndex]}}>-Author</p>
                    <div class="buttons">
                        <a type="button" class="share-buttons"id="tweet-quote" href="www.google.com">twitter</a>
                        <a class="share-buttons" id="whatsapp-quote" href="www.google.com">whatsapp</a>
                        <a class="share-buttons" id="facebook-quote" href="www.google.com">facebook</a>
                        <button id="new-quote" onClick={this.changeColor} style={{backgroundColor: COLORS[this.state.colorIndex]}}>New Quote</button>
                    </div>
                </div>
            </div>
            
        )
    };

};

export default MainComponent


  