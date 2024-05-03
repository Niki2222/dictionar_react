import React, { useState } from "react";
import ReactDOM from 'react-dom/client';

let foundWord = document.getElementById('foundWord');
let notFoundWord = document.getElementById('notFoundWord');
foundWord.style.display = "none";
let toBeAdded = false;

function AddWords(props) {
  const {wordToSearch, doAdd} = props;
  
  function handleClick() {
    doAdd(wordToSearch);
    toBeAdded = false;
    notFoundWord.style.display = "none";
  }
  return (
    <div>
      <input id="inputToAdd" defaultValue={wordToSearch}></input>
      <button onClick={handleClick}>Add word</button>
    </div>
  )
}

function Search(props) {
  const {list, doSearch} = props;

  function handleClick() {
    let wordInput = document.getElementById('wordInput').value.toLocaleLowerCase();
    if (wordInput.length === 0) {
      document.getElementById('wordInput').placeholder = "please enter a word";
    };
    if (list.includes(wordInput)) {
      foundWord.style.display = "block";
      foundWord.style.backgroundColor = "lightgray";
      const myWord = React.createElement('h2', {}, 'Last word searched:');
      const myWordInput = React.createElement('h1', {}, `${wordInput}`);
      const myDiv = React.createElement('div', {}, [myWord, myWordInput]);
      const rootDiv = ReactDOM.createRoot(document.getElementById('foundWord'));
      rootDiv.render(myDiv);
      notFoundWord.style.display = "none";
      toBeAdded = false;
    } else if (!list.includes(wordInput) && (wordInput.length > 0)) {
      notFoundWord.style.display = "block";
      foundWord.style.display = "none";
      notFoundWord.innerText = 'The above word is not in the dictionary, if you want to add it, press "Add word" button';
      toBeAdded = true;
    } else {
      foundWord.style.display = "none";
      notFoundWord.style.display = "none";
    };

    doSearch(wordInput);
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

  function doSearch(value) {
    setWordToSearch(value);
  }

  function doAdd(value) {
    setListItems([...listItems, value]);
  }

  return (
    <section>
      <h1>Dictionary</h1>
      <Search list={listItems} doSearch={doSearch}/>
      {toBeAdded && <AddWords wordToSearch={wordToSearch} doAdd={doAdd}/>}
    </section>
  );
}

function App() {
  return (
    <>
      <Dictionary/>
    </>
  )
}

export default App;