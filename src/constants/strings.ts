export const GAME_TITLE = process.env.REACT_APP_GAME_NAME!

export const WIN_MESSAGES = ['साधु साधु!', 'उत्तमम्', 'समीचीनम्!']
export const GAME_COPIED_MESSAGE = 'क्रीडा अनुकृता'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'अक्षराणि अपर्याप्तानि'
export const WORD_NOT_FOUND_MESSAGE = 'शब्दो न लब्धः'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can be enabled only at the start!'
export const HARD_MODE_DESCRIPTION =
  'अग्रिमासु ऊहासु प्रकाशिताः सङ्केताः उपयोक्तव्याः Any revealed hints must be used in subsequent guesses'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `अपेक्षितः शब्दः = ${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  ` $${position}-स्थाने {guess} एव उपयोक्तव्यम् `
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `ऊहायाम् ${letter} अक्षरं स्यात्`
export const ENTER_TEXT = 'लिखतु'
export const DELETE_TEXT = 'मार्जयतु'
export const STATISTICS_TITLE = 'दत्तांशाः'
export const GUESS_DISTRIBUTION_TEXT = 'ऊहापरिमाणम्'
export const NEW_WORD_TEXT = 'अग्रिमं पदम् -'
export const SHARE_TEXT = 'संविभजताम्'
export const SHARE_FAILURE_TEXT =
  'Unable to share the results. This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.'
export const MIGRATE_BUTTON_TEXT = 'प्रेषयतु'
export const MIGRATE_DESCRIPTION_TEXT =
  'भवतां फलितांशान् नूतने उपकरणे प्रेषयितुम् अत्र नुदन्तु-'
export const TOTAL_TRIES_TEXT = 'आहत्य प्रयत्नाः'
export const SUCCESS_RATE_TEXT = 'यशः प्रमाणम्'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  "You are using an embedded browser and may experience problems sharing or saving your results. We encourage you rather to use your device's default browser."

export const DATEPICKER_TITLE = 'प्राचीनदिनाङ्कः चीयताम्'
export const DATEPICKER_CHOOSE_TEXT = 'चीयताम्'
export const DATEPICKER_TODAY_TEXT = 'अद्य'
export const ARCHIVE_GAMEDATE_TEXT = 'क्रीडादिनाङ्कः'
