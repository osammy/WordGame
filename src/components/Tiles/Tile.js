import React from "react";
import './tile.css';



const Tile = ({letter, animateClick}) =>{
    // const tileClass = null;
    // const handleClick = ()=>{
    //     console.log("clicekd")
    //     tileClass = "letter-pressed";
    //     setTimeout(function(){
    //         tileClass = "letter";
    //     },2000)
    // }
    return ( <div className="letter">{letter}</div>)
}

  
export default Tile;