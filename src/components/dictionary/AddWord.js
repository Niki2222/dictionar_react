import React from "react";

export default function AddWord({lastWordSearched, handleAdd}) {
    return (
      <div className='addWord'>
        <input type='text' defaultValue={lastWordSearched}></input>
        <button onClick={handleAdd}>Add word</button>
      </div>
    );
  }