const hintDiv = document.getElementById("displayHints");
const displayLettersDiv = document.getElementById("displayLetters");
const buttons = document.querySelectorAll(".letterButton");
const inncorrectGuessesDisplay = document.getElementById("inncorrectGuesses")
const mainImg = document.getElementById("mainImg");

console.log(buttons);

const programmingLanguages =
{
    java: 
    {
        word: "java",
        hint: "An object-oriented programming language known for its portability."
    },
    python: 
    {
        word: "python",
        hint: "A high-level, interpreted programming language known for readability and versatility."
    },
    ruby: 
    {
        word: "ruby",
        hint: "A dynamic, reflective, object-oriented language often used for web development."
    },
    csharp: 
    {
        word: "csharp",
        hint: "A modern, versatile programming language developed by Microsoft."
    },  
    javascript: 
    {
        word: "javascript",
        hint: "A scripting language commonly used for web development and client-side scripting."
    },  
    go: 
    {
        word: "go",
        hint: "An open-source programming language developed by Google, known for its efficiency."
    }, 
    swift: 
    {
        word: "swift",
        hint: "A powerful and intuitive programming language developed by Apple for iOS, macOS, watchOS, and tvOS."
    },  
    rust: 
    {
        word: "rust",
        hint: "A systems programming language known for its memory safety and performance."
    },
    kotlin: 
    {
        word: "kotlin",
        hint: "A statically-typed programming language developed by JetBrains, interoperable with Java."
    },
    typescript: 
    {
        word: "typescript",
        hint: "A superset of JavaScript, adding static typing and other features for large-scale applications."
    },
}

let incorrectGuesses = 0;
let selectedWord;
let selectedHint;

function getRandomWordAndHint()
{
    const programmingLanguagesKeys = Object.keys(programmingLanguages);
    const randomWordAndHint = programmingLanguagesKeys[Math.floor(Math.random() * programmingLanguagesKeys.length)];
    return programmingLanguages[randomWordAndHint];
}



const getInfo = getRandomWordAndHint();


selectedWord = getInfo.word;
selectedHint = getInfo.hint;



console.log(selectedWord);
console.log(selectedHint);

const split = selectedWord.split("")

console.log(split);

hintDiv.innerHTML = `<h3>Hint: ${selectedHint}</h3>`;

// function generateInitialDisplay(word) 
// {
//     return word.split('').map(letter => '_').join(' ');
//   }
  
function generateInitialDisplay(word, guessedLetter) {
    const lettersArray = word.split('');
    let updatedDisplay = '';
  
    for (const letter of lettersArray) {
      if (guessedLetter && letter === guessedLetter.toLowerCase()) {
        updatedDisplay += guessedLetter;
      } else {
        updatedDisplay += '_';
      }
    }
  
    return updatedDisplay;
  }
  

const initialDisplay = generateInitialDisplay(selectedWord);
displayLettersDiv.innerHTML = `<h1 id = "initialDisplay">${initialDisplay}</h1>`;


buttons.forEach(button => {
    button.addEventListener('click', function() {
      const guessedLetter = this.innerText;
  
      if (selectedWord.includes(guessedLetter.toLowerCase())) 
      {
        // The guessed letter is in the word
        console.log(`${guessedLetter} is in the word!`); 
        button.classList.add("correctSelection");
        // Add your logic for correct guess here
        const updatedDisplay = generateInitialDisplay(selectedWord, guessedLetter);
        displayLettersDiv.innerHTML = `<h1 id="initialDisplay">${updatedDisplay}</h1>`;
      } 
      else 
      {
        // The guessed letter is not in the word
        console.log(`${guessedLetter} is not in the word.`);
        // Add your logic for incorrect guess here
        button.classList.add("wrongSelection");
        
        incorrectGuesses++;
        console.log(incorrectGuesses)
        if(incorrectGuesses === 1 || incorrectGuesses === 2 || incorrectGuesses === 3)
        {
          inncorrectGuessesDisplay.classList.add("lowWarning");
        }
        else
        {
          inncorrectGuessesDisplay.classList.add("highWarning");
        }
        mainImg.src = `images/${incorrectGuesses}.png`
        inncorrectGuessesDisplay.innerHTML = `<h2 id ="incorrectGuessesDisplay">Incorrect guesses: ${incorrectGuesses}/6</h2>`;
      }
      button.disabled = true; 
    });
  });








