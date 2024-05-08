import React, { useState } from "react";
import ReactDOM from 'react-dom/client';

// let container = document.getElementById('container');
// let wordFound = document.createElement('div');
// let wordNotFound = document.createElement('div');
// wordFound.id = 'wordFound';
// wordNotFound.id = 'wordNotFound';
// container.appendChild(wordFound);
// container.appendChild(wordNotFound);
// wordFound.style.display = "none";

let wordFound = document.getElementById('wordFound');
let wordNotFound = document.getElementById('wordNotFound');

let wordsToBeAdded = false;

function Container() {
  return(
    <div className="container">
      <div id="wordFound">F</div>
      <div id="wordNotFound">N</div>
    </div>
  )
}

function AddWords(props) {
  const {wordToSearch, doAddWord} = props;
  
  function handleClick() {
    doAddWord(wordToSearch);
    wordsToBeAdded = false;
    wordNotFound.style.display = "none";
  }
  return (
    <div>
      <input id="inputToAdd" defaultValue={wordToSearch}></input>
      <button onClick={handleClick}>Add word</button>
    </div>
  )
}

function SearchWords(props) {
  const {wordsList, doSearchWords} = props;

  function handleClick() {
    let wordInput = document.getElementById('wordInput')
      .value.toLocaleLowerCase();
    if (wordInput.length === 0) {
      document.getElementById('wordInput').placeholder = "please enter a word";
    };
    if (wordsList.includes(wordInput)) {
      wordFound.style.display = "block";
      wordFound.style.backgroundColor = "lightgray";
      const myWord = React.createElement('h2', {}, 'Last word searched:');
      const myWordInput = React.createElement('h1', {}, `${wordInput}`);
      const myDiv = React.createElement('div', {}, [myWord, myWordInput]);
      const rootDiv = ReactDOM.createRoot(document.getElementById('wordFound'));
      rootDiv.render(myDiv);
      wordNotFound.style.display = "none";
      wordsToBeAdded = false;
    } else if (!wordsList.includes(wordInput) && (wordInput.length > 0)) {
      wordNotFound.style.display = "block";
      wordFound.style.display = "none";
      wordNotFound.innerText = `The above word is not in the dictionary, 
        if you want to add it, press "Add word" button`;
        wordsToBeAdded = true;
    } else {
      wordFound.style.display = "none";
      wordNotFound.style.display = "none";
    };

    doSearchWords(wordInput);
  }

  return (
    <div>
      <input id="wordInput"></input>
      <button onClick={handleClick}>Search word</button>
    </div>
  );
}

function Dictionary() {
  const [listItems, setListItems] = useState(['word']);
  const [wordToSearch, setWordToSearch] = useState('');

  function doSearchWords(value) {
    setWordToSearch(value);
  }

  function doAddWord(value) {
    setListItems([...listItems, value]);
  }

  return (
    <section>
      <h1>Dictionary</h1>
      <SearchWords wordsList={listItems} doSearchWords={doSearchWords}/>
      {wordsToBeAdded && 
        <AddWords wordToSearch={wordToSearch} doAddWord={doAddWord}/>}
    </section>
  );
}

function App() {
  return (
    <>
      <Dictionary/>
      <Container />
    </>
  )
}

export default App;