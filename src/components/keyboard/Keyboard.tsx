import { useState, useEffect } from 'react'

import { DELETE_TEXT, ENTER_TEXT } from '../../constants/strings'
import { getStatuses } from '../../lib/statuses'
//import { localeAwareUpperCase } from '../../lib/words'
import { Key } from './Key'
import { unicodeSplit } from '../../lib/words'
//import { exit } from 'process'

const suffixes: {[key: string]:string} = {आ: "ा", इ: "ि", ई: "ी", उ: "ु", ऊ: "ू", ऋ: "ृ", ए: "े", ऐ: "ै", ओ: "ो", औ: "ौ"};

// Example usage
//const word = lookupTable["क्"]["अ"]; // Returns "ka"
//Added by veena, to split a letter to its constituent consonant and vowel by looking up the table
export function unicode_phoneme_split(input: string): string[] {
  let result: string[] = [];
  // console.log("from called function, the word=",input)
  const splitWord = unicodeSplit(input);
  splitWord.forEach(letter => {
      let sub_array : string[] =[]
      while (letter!==""){
      let last_phoneme = letter.slice(-1); 
      for (const key in suffixes){
        if (suffixes[key]===last_phoneme){
          last_phoneme = key
        }
      }
      sub_array.push(last_phoneme)
      letter=letter.slice(0,-1)    
    }
    result = result.concat(sub_array.slice().reverse())
  });
  // console.log('returning from called funciton==', result);
  return result;
}

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  isRevealing?: boolean
  consonant: string
  isConsonant?: boolean
  vowel: string
  isVowel?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
  consonant,
  isConsonant,
  vowel,
  isVowel
}: Props) => {
  const charStatuses = getStatuses(solution, guesses)
  
  const [previousClick, setPreviousClick] = useState('');
  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      if (value>='आ' && value <= 'औ' && !(previousClick==='ENTER' || previousClick === 'DELETE' || previousClick==='')){
          value = suffixes[value]
      }
      onChar(value)
    }
    // if (value==="्") value = previousClick+value;
    setPreviousClick(value);
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
         let key = e.key
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="mb-1 flex justify-center">
        {["्",'अ','आ', 'इ','ई', 'उ','ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'ं', 'ः'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {['क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ', 'ड', 'ढ'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {['त', 'थ', 'द', 'ध',  'प', 'फ', 'ब', 'भ', 'ण','न','म'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        {['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह','ङ', 'ञ'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}   