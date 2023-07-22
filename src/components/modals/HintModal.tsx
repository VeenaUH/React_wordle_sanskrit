import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import {
    loadGameStateFromLocalStorage
} from '../../lib/localStorage'
import { getIsLatestGame, unicodeSplit } from '../../lib/words'
import { getGuessStatuses } from '../../lib/statuses'
type Props = {
    isOpen: boolean
    handleClose: () => void
}

const storedGameState = loadGameStateFromLocalStorage(getIsLatestGame());
console.log(storedGameState);
export const HintModal = ({ isOpen, handleClose }: Props) => {
    let value: string[]
    let guesses: string[]
    if (storedGameState && storedGameState.guesses.length !== 0) {
        value = unicodeSplit(storedGameState.solution)
        guesses = storedGameState.guesses
        const solutionLength = value.length
        //console.log(value)
        for (let i = 0; i < guesses.length; i++) {
            const statuses = getGuessStatuses(storedGameState.solution, storedGameState.guesses[i])
            console.log(statuses)
            statuses.forEach((element, j) => {
                if (element === 'correct') {
                    value[j] = "_"
                }
            });
        }
        console.log(value)
        console.log(value.length)
        const hintVector: string[] = Array(value.length).fill('_'); // Steps 2 and 3
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== "_") {
                hintVector[i] = value[i]
                break;
            }
        }
        console.log(hintVector)

        const emptyCells = Array.from(Array(solutionLength))

        return (
            <BaseModal title="साहाय्यम्" isOpen={isOpen} handleClose={handleClose}>

                <div className={`flex justify-center mb-1 ${String}`}>
                    {hintVector.map((letter, i) => (
                        <Cell key={i} value={letter} />
                    ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                    भवन्तः एकवारम् एव साहाय्यम् उपयोक्तुं शक्नुवन्ति
                </p>
            </BaseModal>
        )
    }

    return (
        <BaseModal title="साहाय्यम्" isOpen={isOpen} handleClose={handleClose}>
            <p className="text-sm text-gray-500 dark:text-gray-300">
                एका वा पङ्क्तिः पूरिता स्यात्
            </p>
        </BaseModal>
    )
}
    // return (
    //     <BaseModal title="साहाय्यम्" isOpen={isOpen} handleClose={handleClose}>
    //         <p className="text-sm text-gray-500 dark:text-gray-300">
    //             साहाय्यं पूर्वमेव उपयुक्तम्
    //         </p>
    //     </BaseModal>
    // )


