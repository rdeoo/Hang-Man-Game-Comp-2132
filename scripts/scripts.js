// Creating constants of all the dom elements i want to access and modify
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


// console.log(buttons);
// Java script object which holds programming lanaguages. Inside these programming languages are words representing the language and hints desribing the language
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

// define some variables that are going to be changed frequently
let incorrectGuesses = 0;
let correctLetters   = [];
let selectedWord;
let selectedHint;

// max amount of user guesses constant
const maxAmountOfUserGuesses = 6;


// function to pick a random programming language from the object
function getRandomWordAndHint()
{
    const programmingLanguagesKeys = Object.keys(programmingLanguages);
    const randomWordAndHint = programmingLanguagesKeys[Math.floor(Math.random() * programmingLanguagesKeys.length)];
    return programmingLanguages[randomWordAndHint];
}


// created a constant to hold the return values of the function
const getInfo = getRandomWordAndHint();

// put info into variables
selectedWord = getInfo.word;
selectedHint = getInfo.hint;

// console.log(selectedWord);
// console.log(selectedHint);

// seperated each letter and created new array to check agaisnt correct letters
let split = selectedWord.split("")

// console.log(split);

// set hintDiv innerhtml to whatever the hint is that has been selected
hintDiv.innerHTML = `<h3>Hint: ${selectedHint}</h3>`;

// function to loop through the selected word and make h1 elements accroding to the words length and display each letter as _
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


// main logic for hangman game. this loop through all the letterButtons and add a event listener. If the letter that is selected is correct the button will be diasbled and turned green. The button text will be added to correctLetters array.
// if split and correctLetters arrays match then the pop up indicating you won will slide down. If you guess incorrect the button will turn red and your incorrect guesses will be updated. If you have 1-3 it will show low warning
// but if its greater then 3 it will show high warning. If incorrect guesses equals maxnumofuser guesses then the pop up indidicating you lost will slide down. The hangman image changes depending on how many incorrect guesses you have

buttons.forEach(button => {
  button.addEventListener('click', function () 
  {
    const guessedLetter = this.innerText;

    let correctGuess = false;

    for (let i = 0; i < selectedWord.length; i++) 
    {
      if (guessedLetter.toLowerCase() === selectedWord[i]) 
      {
        
        // console.log(`${guessedLetter} is in the word!`);
        button.classList.remove("resetButton")
        button.classList.add("correctSelection");
        displayLettersDiv.children[i].textContent = guessedLetter;
        correctLetters[i] = guessedLetter.toLowerCase();
        
        console.log(correctLetters);
        correctGuess = true;
        if(compareArrays(split, correctLetters))
        {
          console.log(split);
          console.log(correctLetters)
          console.log("Big up")
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
      
      // console.log(`${guessedLetter} is not in the word.`);
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
       {      
              //  console.log("rah man")
              const $lostpopUp = $(lostPopup);
              $lostpopUp.slideDown();
              showUserTheWord.innerHTML = `<p>The word was: ${selectedWord}</p>`;
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

// function to compare arrays which i found on stack overflow. Im not the best with JavaScript yet as im still new. Im not sure if there is a better way to comapre arrays
const compareArrays = (a, b) =>
a.length === b.length && a.every((element, index) => element === b[index])

// call method to display words state as _
showWordState();


// if user wins and wants to play again when play again button is clicked varaibles are reset, new word and hint is picked, its state is displayed, image goes back to intital image, and classes are removed and added. The game is ready to be played again
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

// same exact thing as above just for play again button thats in the pop up if the user lost
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








