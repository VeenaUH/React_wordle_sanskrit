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
        {/* //<Cell value="म" isCompleted={true} /> */}
        <Cell isRevealing={true} isCompleted={true} value="म" status="absent" />
        {/* //<Cell value="ल" isCompleted={true} /> */}
        <Cell isRevealing={true} isCompleted={true} value="ल" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        क इति अक्षरं समीचीने स्थले अस्ति । अन्यानि अक्षराणि पदे न सन्ति
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        {/* //<Cell value="गी" isCompleted={true} /> */}
        <Cell isRevealing={true} isCompleted={true} value="गी" status="absent" />
        {/* //<Cell value="र्वा" isCompleted={true} /> */}
        <Cell isRevealing={true} isCompleted={true} value="र्वा" status="absent" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="ण"
          status="present"
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        ण इति अक्षरं पदे अस्ति, किन्तु स्थानम् अन्यत् । अन्यानि अक्षराणि पदे न सन्ति ।
      </p>

      <div className="text-sm text-gray-500 dark:text-gray-300">
        कुञ्चीफलके विद्यमानाः वर्णाः व्यञ्जनानां स्वराणां च उपस्थितिं स्थानं च पृथक् निर्दिशन्ति ।
        <p>उदा - आ(हरितवर्णः) - स्वरं पदे समीचीनस्थाने अस्ति ।</p>
        <p>र(नारङ्गवर्णः) - व्यञ्जनं पदे अस्ति, किन्तु स्थानम् अन्यत् ।</p>
        <p>त(धूसरवर्णः) - व्यञ्जनं पदे कुत्रापि नास्ति ।</p>
      </div>

      <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300">
        प्रसिद्धायाः ऊहाक्रीडायाः संस्कृतभाषा-आवृत्तिरियम्
      </p>
    </BaseModal>
  )
}

