import React from "react";

export default function FoundWord({lastWordSearched}) {
    return (
      <div className='foundWord'>
        <h2>Last word found:</h2>
        <h1>{lastWordSearched}</h1>
      </div>
    );
  }