//import { unicode_phoneme_split } from '@/components/keyboard/Keyboard'
import { unicodeSplit } from './words'
import { unicode_phoneme_split } from '../components/keyboard/Keyboard'
export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  solution: string,
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicode_phoneme_split(solution)

  // const splitSolution : string[] =[]
  // unicodeSplit(solution).forEach((letter, i) =>{
  //   if(letter.includes("्")){
  //     splitSolution.push(letter)
  //   }
  //   else {
  //     splitSolution=splitSolution.concat(lookupElements(letter))
  //   }
  // })
// const splitSolution: string[] = [];

// unicodeSplit(solution).forEach((letter, i) => {
//   if (letter.includes("्")) {
//     splitSolution.push(letter);
//   } else {
//     splitSolution.push(...unicode_phoneme_split(letter));
//   }
// });



  console.log('guesses=',guesses)
  console.log('solution=',solution)
  console.log('splitsolution=',splitSolution)


  guesses.forEach((word) => {
    unicode_phoneme_split(word).forEach((letter, i) => {
      console.log('guesswordLetter=',letter)
      // let phonemes = lookupElements(letter)
      // phonemes.forEach((phoneme) => {
        if (!splitSolution.includes(letter)) {
          // make status absent
          console.log("doesnt include")
          return (charObj[letter] = 'absent')
        }
  
        if (letter === splitSolution[i]) {
          //make status correct
          return (charObj[letter] = 'correct')
        }
  
        if (charObj[letter] !== 'correct') {
          //make status present
          return (charObj[letter] = 'present')
        }
      //})
    });
  })

  return charObj
}

export const getGuessStatuses = (
  solution: string,
  guess: string
): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
