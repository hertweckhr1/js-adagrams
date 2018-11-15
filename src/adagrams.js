const Adagrams = {
  drawLetters() {
    let bagOfLetters = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B",
    "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E",
    "E", "E", "E", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "I",
    "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M",
    "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O",
    "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T",
    "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X",
    "Y", "Y", "Z"];

    const shuffle = function shuffle (array) {
      let i = 0;
      let j = 0;
      let temp = null;

      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array;
    };

    let individualHand = new Array(10);

    for (let i=0; i < individualHand.length; i++) {
      bagOfLetters = shuffle(bagOfLetters);
      let letter = bagOfLetters.pop();
      individualHand[i] = letter
    }
    return individualHand;
  },
  usesAvailableLetters(wordInput, individualLetters) {
    let wordInputSplit = wordInput.split("")
    for (let i = 0; i < wordInput.length; i++) {
      if (individualLetters.includes(wordInputSplit[i])) {
        individualLetters.splice(individualLetters.indexOf(wordInputSplit[i]), 1);
      } else {
        return false;
      }
    }
    return true;
  },
  scoreWord (word) {
    const letterValues = { A: 1,
      B: 3,
      C: 3,
      D: 2,
      E: 1,
      F: 4,
      G: 2,
      H: 4,
      I: 1,
      J: 8,
      K: 5,
      L: 1,
      M: 3,
      N: 1,
      O: 1,
      P: 3,
      Q: 10,
      R: 1,
      S: 1,
      T: 1,
      U: 1,
      V: 4,
      W: 4,
      X: 8,
      Y: 4,
      Z: 10
    };
    const wordDivided = word.toUpperCase().split("");
    // const values = wordDivided.map((letter) => letterValues.letter)
    let wordValue = 0;
    wordDivided.forEach((letter) => {
      wordValue += letterValues[letter]
    });

    if (wordDivided.length >= 7 && wordDivided.length <= 10) {
      wordValue += 8;
    }
    return wordValue
  },

  highestScoreFrom(words) {
    let wordScores = words.map(word => ({ word: word, score: this.scoreWord(word) }));

    let winner = []
    let maxScore = 0
    for (let i = 0; i < wordScores.length; i++) {
      if (wordScores[i].score > maxScore) {
        maxScore = wordScores[i].score;
        winner = [({ word: wordScores[i].word, score: wordScores[i].score })];
      } else if (wordScores[i].score == maxScore) {
        winner.push(({ word: wordScores[i].word, score: wordScores[i].score }));
      }
    }

    let shortestWord = 1000
    let shortestWinner = []
    for (let i = 0; i < wordScores.length; i++) {
      if (wordScores[i].word.length < shortestWord) {
        shortestWord = wordScores[i].word.length;
        shortestWinner = [({ word: wordScores[i].word, score: wordScores[i].score })];
      }
    }

    let maxEqualsTen = winner.filter(word => word.word.length == 10);

    if (winner.length == 1) {
      return winner[0];
    } else {
      if (maxEqualsTen.length == 0) {
        return shortestWinner[0];
      } else {
        return maxEqualsTen[0];
      }
    }

  },
};

const words = [ 'bird', 'duck', 'dog', 'cheetah']
console.log(Adagrams.highestScoreFrom(words));
// console.log(Adagrams.drawLetters());
// const drawn = ['D', 'O', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
// const word = 'DOG';

// console.log(Adagrams.drawLetters(word, drawn));
// console.log(Adagrams.usesAvailableLetters(word, drawn));

// Do not remove this line or your tests will break!
export default Adagrams;
