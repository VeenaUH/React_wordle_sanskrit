import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="कथं क्रीडनीयम्" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        षट्सु प्रयत्नेषु पदस्य ऊहां कुर्वन्तु । 
        प्रत्येकम् ऊहायाः अनन्तरं मञ्जूषानां वर्णाः परिवर्तन्ते, , ऊहितं पदं समीचीनस्य उत्तरस्य कियत्समीपम् आसीत् इति दर्शयन्ति च ।
      </p>

      <div className="mb-2 mt-2 flex justify-center">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="क"
          status="correct"
        />
        <Cell value="म" isCompleted={true} />
        <Cell value="लं" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        क इत्यत्र व्यञ्जनं तदेव । किन्तु स्वरः अन्यः ।
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="P" isCompleted={true} />
        <Cell value="I" isCompleted={true} />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="L"
          status="present"
        />
        <Cell value="O" isCompleted={true} />
        <Cell value="T" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter L is in the word but in the wrong spot.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="V" isCompleted={true} />
        <Cell value="A" isCompleted={true} />
        <Cell value="G" isCompleted={true} />
        <Cell isRevealing={true} isCompleted={true} value="U" status="absent" />
        <Cell value="E" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p>

      <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="font-bold underline"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}

