import {
  addDays,
  differenceInDays,
  formatISO,
  parseISO,
  startOfDay,
} from 'date-fns'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import queryString from 'query-string'

import { ENABLE_ARCHIVED_GAMES } from '../constants/settings'
import { NOT_CONTAINED_MESSAGE, WRONG_SPOT_MESSAGE } from '../constants/strings'
import { VALID_GUESSES } from '../constants/validGuesses'
import { getWordsByLength } from '../constants/wordlist'
import { getToday } from './dateutils'
import { getGuessStatuses } from './statuses'

//let wordLength_inString : any = localStorage.getItem("wordLength")
//const wordLength = parseInt(wordLength_inString)
// 1 January 2022 Game Epoch
export const firstGameDate = new Date(2022, 0)
export const periodInDays = 1
//let WORDS : string[]

const wordLength = parseInt(localStorage.getItem('wordLength') || '4');
export const WORDS = getWordsByLength(wordLength);
export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}      

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(solution, guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }


  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit1 = (word: string) => {
return new GraphemeSplitter().splitGraphemes(word)
}

// export const unicodeSplit = (word: string) => {
//   const output: string[] = [];
//   const input = unicodeSplit1(word)
//   for (let i = 0; i < input.length; i++) {
//     let currentLetter = input[i];
    
//     if (currentLetter.includes("्")) {
//       const nextLetter = input[i + 1];
      
//       if (nextLetter) {
//         const mergedLetter = currentLetter + nextLetter;
//         output.push(mergedLetter);
//         i++; // Skip the next letter since it's already merged
//       } 
//       else {
//         output.push(currentLetter); // Add the current letter as is
//       }
//     } else {
//       output.push(currentLetter); // Add non-virama letters as is
//     }
//   }  
//   return output;
// }

export const unicodeSplit = (word: string) => {
  const output: string[] = [];
  const input = unicodeSplit1(word)
  for (let i = 0; i < input.length; i++) {
    let currentLetter = input[i];
    
    if (currentLetter.includes("्")) {
      const nextLetter = input[i + 1];
      
      if (nextLetter) {
        currentLetter = currentLetter + nextLetter;
        i++; // Skip the next letter since it's already merged
      } 
    } 
      output.push(currentLetter); // Add non-virama letters as is
  }  
  return output;
}

// export const unicodeSplit = (word : string) => {
//   const output : string[] = [];
//   const input = unicodeSplit1(word)
//   let carryLetter = "";
//   for(let i=0; i< input.length; i++){
//     let currentLetter = input[i];
//     if (currentLetter.includes("्")) {
//       carryLetter = carryLetter+currentLetter
//       continue;
//     }
//     currentLetter=carryLetter+currentLetter
//     carryLetter=""
//     output.push(currentLetter)
//   }
//   return output;
// }

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getLastGameDate = (today: Date) => {
  const t = startOfDay(today)
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays
  return addDays(t, -daysSinceLastGame)
}

export const getNextGameDate = (today: Date) => {
  return addDays(getLastGameDate(today), periodInDays)
}

export const isValidGameDate = (date: Date) => {
  if (date < firstGameDate || date > getToday()) {
    return false
  }

  return differenceInDays(firstGameDate, date) % periodInDays === 0
}

export const getIndex = (gameDate: Date) => {
  let start = firstGameDate
  let index = -1
  do {
    index++
    start = addDays(start, periodInDays)
  } while (start <= gameDate)

  return index
}

export const getWordOfDay = (index: number) => {
  if (index < 0) {
    throw new Error('Invalid index')
  }

  return localeAwareUpperCase(WORDS[index % WORDS.length])
}

export const getSolution = (gameDate: Date) => {
  const nextGameDate = getNextGameDate(gameDate)
  const index = getIndex(gameDate)
  const wordOfTheDay = getWordOfDay(index)
  return {
    solution: wordOfTheDay,
    solutionGameDate: gameDate,
    solutionIndex: index,
    tomorrow: nextGameDate.valueOf(),
  }
}

export const getGameDate = () => {
  if (getIsLatestGame()) {
    return getToday()
  }

  const parsed = queryString.parse(window.location.search)
  try {
    const d = startOfDay(parseISO(parsed.d!.toString()))
    if (d >= getToday() || d < firstGameDate) {
      setGameDate(getToday())
    }
    return d
  } catch (e) {
    console.log(e)
    return getToday()
  }
}

export const setGameDate = (d: Date) => {
  try {
    if (d < getToday()) {
      window.location.href = '/?d=' + formatISO(d, { representation: 'date' })
      return
    }
  } catch (e) {
    console.log(e)
  }
  window.location.href = '/'
}

export const getIsLatestGame = () => {
  if (!ENABLE_ARCHIVED_GAMES) {
    return true
  }
  const parsed = queryString.parse(window.location.search)
  return parsed === null || !('d' in parsed)
}

export const { solution, solutionGameDate, solutionIndex, tomorrow } =
  getSolution(getGameDate())
