import React, { useState } from 'react';

function FoundWord({lastWordSearched}) {
  return (
    <div className='foundWord'>
      <h2>Last word found:</h2>
      <h1>{lastWordSearched}</h1>
    </div>
  );
}

function AddWord({lastWordSearched, handleAdd}) {
  return (
    <div className='addWord'>
      <input type='text' defaultValue={lastWordSearched}></input>
      <button onClick={handleAdd}>Add word</button>
    </div>
  );
}

function Dictionary() {
  const [list, setList] = useState(["word"]);
  const [foundWord, setFoundWord] = useState("");
  const [lastWordSearched, setLastWordSearched] = useState("");

  function handleClick() {
    const searchedInput = document.getElementById("inputToSearch").value;
    if (searchedInput.length === 0) {
      document.getElementById("inputToSearch").placeholder 
        = "please enter a word";
      setFoundWord("");
    }
    if (list.includes(searchedInput)) {
      setFoundWord("found");
      setLastWordSearched(searchedInput);
    } else if (!list.includes(searchedInput) && searchedInput.length > 0){
      setFoundWord("notFound");
      setLastWordSearched(searchedInput);
    }
  }

  function handleAdd() {
    setList([...list, lastWordSearched]);
    setFoundWord("");
  }

  return (
    <div>
      <h1>Dictionary</h1>
      <input id='inputToSearch' type='text'></input>
      <button onClick={handleClick}>Search word</button>
      {foundWord === "found" && 
        <FoundWord lastWordSearched={lastWordSearched}/>}
      {foundWord === "notFound" && 
        <AddWord lastWordSearched={lastWordSearched} handleAdd={handleAdd}/>}
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <>
        <Dictionary />
      </>
    </div>
  );
}

export default App;
