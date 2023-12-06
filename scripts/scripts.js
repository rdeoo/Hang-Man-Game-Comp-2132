const hintDiv = document.getElementById("displayHints");
const displayLettersDiv = document.getElementById("displayLetters");
const buttons = document.querySelectorAll(".letterButton");
const inncorrectGuessesDisplay = document.getElementById("inncorrectGuesses")
const mainImg = document.getElementById("mainImg");
const wonPopup = document.getElementById("pop-upWon");
const lostPopup = document.getElementById("pop-upLost");
const showUserTheWord = document.getElementById("showUserWord");
const playAgainButton = document.getElementById("playAgainButton");
const playAgainButton2 = document.getElementById("playAgainButton2");


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
let correctLetters   = [];
let selectedWord;
let selectedHint;
const maxAmountOfUserGuesses = 6;

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

let split = selectedWord.split("")

console.log(split);

hintDiv.innerHTML = `<h3>Hint: ${selectedHint}</h3>`;


  


const showWordState = () =>
{
  for(let letter of selectedWord)
  {
    let lettersH2 = document.createElement('h1');
    // lettersH2.classList.add('initialDisplay');
    lettersH2.textContent = "_";
    lettersH2.style.marginRight = '10px';
    lettersH2.style.fontSize = "xx-large";
    displayLettersDiv.append(lettersH2);
    correctLetters.push('_')
    
  }
  console.log(correctLetters)
  displayLettersDiv.style.display = 'flex';
}





buttons.forEach(button => {
  button.addEventListener('click', function () 
  {
    const guessedLetter = this.innerText;

    let correctGuess = false;

    for (let i = 0; i < selectedWord.length; i++) 
    {
      if (guessedLetter.toLowerCase() === selectedWord[i]) 
      {
        // The guessed letter is in the word
        console.log(`${guessedLetter} is in the word!`);
        button.classList.remove("resetButton")
        button.classList.add("correctSelection");
        // Update the corresponding h1 element with the correct letter
        displayLettersDiv.children[i].textContent = guessedLetter;
        correctLetters[i] = guessedLetter.toLowerCase();
        
        console.log(correctLetters);
        correctGuess = true;
        if(compareArrays(split, correctLetters))
        {
          console.log(split);
          console.log(correctLetters)
          console.log("Big up")
          // buttons.disabled = true;
          for(i = 0; i < buttons.length; i++)
          {
            buttons[i].disabled = true;
          }
          const $wonpopUp = $(wonPopup);
          $wonpopUp.slideDown();
        }
      }
    }
    if (!correctGuess) 
    {
      // The guessed letter is not in the word
      console.log(`${guessedLetter} is not in the word.`);
      button.classList.remove("resetButton");
      button.classList.add("wrongSelection");

      incorrectGuesses++;
      console.log(incorrectGuesses)
      if(incorrectGuesses === 1 || incorrectGuesses === 2 || incorrectGuesses === 3) 
      { 
        inncorrectGuessesDisplay.classList.remove("resetIncorrectGuessesColor");
        inncorrectGuessesDisplay.classList.add("lowWarning");
      }
      else if(incorrectGuesses === maxAmountOfUserGuesses)
       {       console.log("rah man")
                
                // lostPopup.style.display = "flex";
                const $lostpopUp = $(lostPopup);
                $lostpopUp.slideDown();
                showUserTheWord.innerHTML = `<p>The word was: ${selectedWord}</p>`;
                // buttons.disabled = true;
                for(i = 0; i < buttons.length; i++)
                {
                   buttons[i].disabled = true;
                }
      } 
      else 
      { 
        inncorrectGuessesDisplay.classList.remove("resetIncorrectGuessesColor");
        inncorrectGuessesDisplay.classList.add("highWarning");
      }
      mainImg.src = `images/${incorrectGuesses}.png`
    }
    inncorrectGuessesDisplay.innerHTML = `<h2 id ="incorrectGuessesDisplay">Incorrect guesses: ${incorrectGuesses}/6</h2>`;
    button.disabled = true;
  }
  );
}
);


const compareArrays = (a, b) =>
a.length === b.length && a.every((element, index) => element === b[index])




showWordState();



playAgainButton.addEventListener("click", function()
{  
  const $wonpopUp = $(wonPopup);
  $wonpopUp.slideUp();
  selectedWord = "";
  selectedHint = "";
  split = ""
  wonPopup.style.display = "none";
  
  incorrectGuesses = 0
  correctLetters = []
  displayLettersDiv.innerHTML = ""
  const newInfo = getRandomWordAndHint();
  selectedWord = newInfo.word;
  selectedHint = newInfo.hint;
  split = selectedWord.split("")
  mainImg.src = "images/0.png";
  inncorrectGuessesDisplay.classList.remove("lowWarning", "highWarning");
  inncorrectGuessesDisplay.textContent = "Incorrect guesses: 0/6";
  inncorrectGuessesDisplay.classList.add("resetIncorrectGuessesColor")
  hintDiv.innerHTML = `<h3>Hint: ${selectedHint}</h3>`;
 
  for(i = 0; i < buttons.length; i++)
  {
    buttons[i].disabled = false;
    buttons[i].classList.remove("correctSelection", "wrongSelection");
    buttons[i].classList.add("resetButton");
  }

  showWordState();
}
  )


playAgainButton2.addEventListener("click", function()
  {  
    const $lostpopUp = $(lostPopup);
    $lostpopUp.slideUp()
    selectedWord = "";
    selectedHint = "";
    split = ""
    lostPopup.style.display = "none";
    incorrectGuesses = 0
    correctLetters = []
    displayLettersDiv.innerHTML = ""
    const newInfo = getRandomWordAndHint();
    selectedWord = newInfo.word;
    selectedHint = newInfo.hint;
    split = selectedWord.split("")
    mainImg.src = "images/0.png";
    inncorrectGuessesDisplay.classList.remove("lowWarning", "highWarning");
    inncorrectGuessesDisplay.textContent = "Incorrect guesses: 0/6";
    inncorrectGuessesDisplay.classList.add("resetIncorrectGuessesColor")
  
    hintDiv.innerHTML = `<h3>Hint: ${selectedHint}</h3>`;
   
    for(i = 0; i < buttons.length; i++)
    {
      buttons[i].disabled = false;
      buttons[i].classList.remove("correctSelection", "wrongSelection");
      buttons[i].classList.add("resetButton");
    }
  
    showWordState();
  }
    )








