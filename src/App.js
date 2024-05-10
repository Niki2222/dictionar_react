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
  const [wordsList, setWordsList] = useState(['word']);
  const [foundWord, setFoundWord] = useState(null);
  const [lastWordSearched, setLastWordSearched] = useState('');

  function handleSearch() {
    const searchedInput = document.getElementById('inputToSearch').value;
    if (searchedInput.length === 0) {
      document.getElementById('inputToSearch').placeholder 
        = 'please enter a word';
      setFoundWord("");
    }
    if (wordsList.includes(searchedInput)) {
      setFoundWord(true);
      setLastWordSearched(searchedInput);
    } else if (!wordsList.includes(searchedInput) && searchedInput.length > 0){
      setFoundWord(false);
      setLastWordSearched(searchedInput);
    }
  }

  function handleAdd() {
    setWordsList([...wordsList, lastWordSearched]);
    setFoundWord(null);
  }

  return (
    <div>
      <h1>Dictionary</h1>
      <input id='inputToSearch' type='text'></input>
      <button onClick={handleSearch}>Search word</button>
      {foundWord === true && 
        <FoundWord lastWordSearched={lastWordSearched}/>}
      {foundWord === false && 
        <AddWord lastWordSearched={lastWordSearched} handleAdd={handleAdd}/>}
    </div>
  )
}

function App() {
  return (
    <div className='app'>
      <>
        <Dictionary />
      </>
    </div>
  );
}

export default App;
