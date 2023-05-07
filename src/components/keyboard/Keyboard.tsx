import { useEffect } from 'react'

import { DELETE_TEXT, ENTER_TEXT } from '../../constants/strings'
import { getStatuses } from '../../lib/statuses'
import { localeAwareUpperCase } from '../../lib/words'
import { Key } from './Key'

const lookupTable: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  क्: {अ: "क", आ: "का", इ: "कि", ई: "की", उ: "कु", ऊ: "कू", ऋ: "कृ", ए: "के", ऐ: "कै", ओ: "को", औ: "कौ"},
  ख्: {अ: "ख", आ: "खा", इ: "खि", ई: "खी", उ: "खु", ऊ: "खू", ऋ: "खृ", ए: "खे", ऐ: "खै", ओ: "खो", औ: "खौ"},
  ग्: {अ: "ग", आ: "गा", इ: "गि", ई: "गी", उ: "गु", ऊ: "गू", ऋ: "गृ", ए: "गे", ऐ: "गै", ओ: "गो", औ: "गौ"},
  घ्: {अ: "घ", आ: "घा", इ: "घि", ई: "घी", उ: "घु", ऊ: "घू", ऋ: "घृ", ए: "घे", ऐ: "घै", ओ: "घो", औ: "घौ"},

  च्: {अ: "च", आ: "चा", इ: "चि", ई: "ची", उ: "चु", ऊ: "चू", ऋ: "चृ", ए: "चे", ऐ: "चै", ओ: "चो", औ: "चौ"},
  छ्: {अ: "छ", आ: "छा", इ: "छि", ई: "छी", उ: "छु", ऊ: "छू", ऋ: "छृ", ए: "छे", ऐ: "छै", ओ: "छो", औ: "छौ"},
  ज्: {अ: "ज", आ: "जा", इ: "जि", ई: "जी", उ: "जु", ऊ: "जू", ऋ: "जृ", ए: "जे", ऐ: "जै", ओ: "जो", औ: "जौ"},
  झ्: {अ: "झ", आ: "झा", इ: "झि", ई: "झी", उ: "झु", ऊ: "झू", ऋ: "झृ", ए: "झे", ऐ: "झै", ओ: "झो", औ: "झौ"},

  ट्: {अ: "ट", आ: "टा", इ: "टि", ई: "टी", उ: "टु", ऊ: "टू", ऋ: "टृ", ए: "टे", ऐ: "टै", ओ: "टो", औ: "टौ"},
  ठ्: {अ: "ठ", आ: "ठा", इ: "ठि", ई: "ठी", उ: "ठु", ऊ: "ठू", ऋ: "ठृ", ए: "ठे", ऐ: "ठै", ओ: "ठो", औ: "ठौ"},
  ड्: {अ: "ड", आ: "डा", इ: "डि", ई: "डी", उ: "डु", ऊ: "डू", ऋ: "डृ", ए: "डे", ऐ: "डै", ओ: "डो", औ: "डौ"},
  ढ्: {अ: "ढ", आ: "ढा", इ: "ढि", ई: "ढी", उ: "ढु", ऊ: "ढू", ऋ: "ढृ", ए: "ढे", ऐ: "ढै", ओ: "ढो", औ: "ढौ"},
  ण्: {अ: "ण", आ: "णा", इ: "णि", ई: "णी", उ: "णु", ऊ: "णू", ऋ: "णृ", ए: "णे", ऐ: "णै", ओ: "णो", औ: "णौ"},

  त्: {अ: "त", आ: "ता", इ: "ति", ई: "ती", उ: "तु", ऊ: "तू", ऋ: "तृ", ए: "ते", ऐ: "तै", ओ: "तो", औ: "तौ"},
  थ्: {अ: "थ", आ: "था", इ: "थि", ई: "थी", उ: "थु", ऊ: "थू", ऋ: "थृ", ए: "थे", ऐ: "थै", ओ: "थो", औ: "थौ"},
  द्: {अ: "द", आ: "दा", इ: "दि", ई: "दी", उ: "दु", ऊ: "दू", ऋ: "दृ", ए: "दे", ऐ: "दै", ओ: "दो", औ: "दौ"},
  ध्: {अ: "ध", आ: "धा", इ: "धि", ई: "धी", उ: "धु", ऊ: "धू", ऋ: "धृ", ए: "धे", ऐ: "धै", ओ: "धो", औ: "धौ"},
  न्: {अ: "न", आ: "ना", इ: "नि", ई: "नी", उ: "नु", ऊ: "नू", ऋ: "नृ", ए: "ने", ऐ: "नै", ओ: "नो", औ: "नौ"},

  प्: {अ: "प", आ: "पा", इ: "पि", ई: "पी", उ: "पु", ऊ: "पू", ऋ: "पृ", ए: "पे", ऐ: "पै", ओ: "पो", औ: "पौ"},
  फ्: {अ: "फ", आ: "फा", इ: "फि", ई: "फी", उ: "फु", ऊ: "फू", ऋ: "फृ", ए: "फे", ऐ: "फै", ओ: "फो", औ: "फौ"},
  ब्: {अ: "ब", आ: "बा", इ: "बि", ई: "बी", उ: "बु", ऊ: "बू", ऋ: "बृ", ए: "बे", ऐ: "बै", ओ: "बो", औ: "बौ"},
  भ्: {अ: "भ", आ: "भा", इ: "भि", ई: "भी", उ: "भु", ऊ: "भू", ऋ: "भृ", ए: "भे", ऐ: "भै", ओ: "भो", औ: "भौ"},
  म्: {अ: "म", आ: "मा", इ: "मि", ई: "मी", उ: "मु", ऊ: "मू", ऋ: "मृ", ए: "मे", ऐ: "मै", ओ: "मो", औ: "मौ"},

  य्: {अ: "य", आ: "या", इ: "यि", ई: "यी", उ: "यु", ऊ: "यू", ऋ: "यृ", ए: "ये", ऐ: "यै", ओ: "यो", औ: "यौ"},
  र्: {अ: "र", आ: "रा", इ: "रि", ई: "री", उ: "रु", ऊ: "रू", ऋ: "रृ", ए: "रे", ऐ: "रै", ओ: "रो", औ: "रौ"},
  ल्: {अ: "ल", आ: "ला", इ: "लि", ई: "ली", उ: "लु", ऊ: "लू", ऋ: "लृ", ए: "ले", ऐ: "लै", ओ: "लो", औ: "लौ"},
  व्: {अ: "व", आ: "वा", इ: "वि", ई: "वी", उ: "वु", ऊ: "वू", ऋ: "वृ", ए: "वे", ऐ: "वै", ओ: "वो", औ: "वौ"},
  
  श्: {अ: "श", आ: "शा", इ: "शि", ई: "शी", उ: "शु", ऊ: "शू", ऋ: "शृ", ए: "शे", ऐ: "शै", ओ: "शो", औ: "शौ"},
  ष्: {अ: "ष", आ: "षा", इ: "षि", ई: "षी", उ: "षु", ऊ: "षू", ऋ: "षृ", ए: "षे", ऐ: "षै", ओ: "षो", औ: "षौ"},
  स्: {अ: "स", आ: "सा", इ: "सि", ई: "सी", उ: "सु", ऊ: "सू", ऋ: "सृ", ए: "से", ऐ: "सै", ओ: "सो", औ: "सौ"},
  ह्: {अ: "ह", आ: "हा", इ: "हि", ई: "ही", उ: "हु", ऊ: "हू", ऋ: "हृ", ए: "हे", ऐ: "है", ओ: "हो", औ: "हौ"}
};

// Example usage
const word = lookupTable["क्"]["अ"]; // Returns "ka"


type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  isRevealing?: boolean
  consonant: string
  isConsonant: boolean
  vowel: string
  isVowel: boolean
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

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      if (value>='क्' && value <= 'ह्'){
        isConsonant=true
        consonant=value
        //onChar(value)
      }
      else {
        isVowel=true
        vowel=value
        if (isConsonant){
          onDelete()
          value = lookupTable[consonant][vowel]          
          isConsonant=false
        }
        onChar(value)
      }
      //onChar(value)
    }
  }

  // const onClick = (value: string) => {
  //   if (value === 'ENTER') {
  //     onEnter()
  //   } else if (value === 'DELETE') {
  //     onDelete()
  //   } else if (value>='क्' && value[0] <= 'ह्') {
  //     isConsonant
  //     consonant : string  = value
  //   }
  // }
  
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key
        // TODO: check this test if the range works with non-english letters
        // if (key.length === 2 ) {
        //   onChar(key)
        // }
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
        {['अ','आ', 'इ','ई', 'उ','ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'ं', 'ः'].map((key) => (
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
        {['क्', 'ख्', 'ग्', 'घ्', 'च्', 'छ्', 'ज्', 'झ्', 'ट्', 'ठ्', 'ड्', 'ढ्', 'ण्'].map((key) => (
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
        {['त्', 'थ्', 'द्', 'ध्', 'न्', 'प्', 'फ्', 'ब्', 'भ्', 'म्'].map((key) => (
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
        {['य्', 'र्', 'ल्', 'व्', 'श्', 'ष्', 'स्', 'ह्'].map((key) => (
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

