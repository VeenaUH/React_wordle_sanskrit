//import { unicode_phoneme_split } from '@/components/keyboard/Keyboard'
import { unicodeSplit } from './words'
import { unicode_phoneme_split } from '../components/keyboard/Keyboard'
export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  solution: string,
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  //const splitSolution = unicode_phoneme_split(solution)
  const splitSolution = unicodeSplit(solution)
  const splitSolution_phoneme = unicode_phoneme_split(solution)



  // console.log('guesses=',guesses)
  // console.log('solution=',solution)
  // console.log('splitsolution=',splitSolution)


  guesses.forEach((word) => {
    //unicode_phoneme_split(word).forEach((letter, i) => {
      unicodeSplit(word).forEach((letter,i) => {   
        unicode_phoneme_split(letter).forEach((phoneme, j) => {
        console.log('guesswordLetter=',letter)
        console.log("phoneme=",phoneme)
        if (!splitSolution_phoneme.includes(phoneme)) {
          // make status absent
          console.log(splitSolution_phoneme)
          console.log("doesnt include")
          return (charObj[phoneme] = 'absent')
        }
        const split_solution_letter = unicode_phoneme_split(splitSolution[i])
        console.log("split solution letter =",split_solution_letter)
        if (phoneme === split_solution_letter[j]) {
          console.log("split_solution_letter[j]=",split_solution_letter[j])
          //make status correct
          return (charObj[phoneme] = 'correct')
        }
  
        if (charObj[letter] !== 'correct') {
          //make status present
          return (charObj[phoneme] = 'present')
        }
       })
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
