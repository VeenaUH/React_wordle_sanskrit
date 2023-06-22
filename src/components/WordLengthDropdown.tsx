
export const wordLengths = [
  { value: 3 },
  { value: 4 },
  { value: 5 },
];
// //check if session storage is empty
// export const wordLength = sessionStorage.getItem('wordLength');

export const wordLength = parseInt(localStorage.getItem('wordLength') || '4');

function WordLengthDropdown({
  selectedWordLength,
  setSelectedWordLength,
}: {
  selectedWordLength: number;
  setSelectedWordLength: (length: number) => void;
}) {
  const handleSelectedWordLength = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const length = parseInt(e.target.value);
    if (length !== selectedWordLength) {
      setSelectedWordLength(length);
    }
    //wordLength = length;
    //console.log(wordLength)
    const isatleastOneRowCompleted = localStorage.getItem('atleastOneRowCompleted')
    if (!isatleastOneRowCompleted){
    localStorage.setItem('wordLength', length.toString());
    window.location.reload()
    }
  };

  return (
    <>
      <span>अक्षरसङ्ख्या : </span>
      <select value={selectedWordLength} onChange={handleSelectedWordLength}>
        {wordLengths.map((length) => (
          <option key={length.value} value={length.value}>
            {length.value}
          </option>
        ))}
      </select>
    </>
  );
}

export default WordLengthDropdown;
