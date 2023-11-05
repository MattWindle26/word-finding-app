import { useState } from "react";
import { useGetWords } from "./hooks/useGetWords";
import { Loader } from "./components/Loader"
import { Dropdown } from "./components/Dropdown";
import { HistoryItem } from "./components/HistoryItem";

function App() {

  const [word, setWord] = useState("");
  const [searchType, setSearchType] = useState({value: "?rel_syn=", name: "Synonyms"});
  const [wordHistory, setWordHistory] = useState([]);
  const {wordResults, isLoading, getWords, setWordResults} = useGetWords();

  const submitWord = (e) => {
    e.preventDefault();
    getWords(word, searchType.value);
    setHistory();
  }

  const clearSearch = () => {
    setWord("")
    setWordResults([])
  }

  const setHistory = () => {
    const newEntry = {word: word, searchType: searchType.name};
    setWordHistory([...wordHistory, newEntry]);
    console.log(wordHistory)
  }

const wordTypes = [
  { id: 1, value: '?rel_syn=', name: "Synonyms" },
  { id: 2, value: '?rel_jjb=', name: "Adjectives" },
  { id: 3, value: '?rel_jja=', name: "Nouns" },
  { id: 4, value: '?ml=', name: "Related Words" },
]


  return (
    <div className="flex flex-row  bg-gray-700/70 h-[100svh]">
      <aside className="p-4 bg-gray-800 w-64 fixed top-0 left-0 h-[100svh] overflow-y-auto">
        <h2 className="text-white text-xl font-medium mb-4">History</h2>
        {wordHistory.length < 1 && (<p className="text-white text-xs">No history found.</p>)}
        {wordHistory.map((history, index) => (
          <HistoryItem key={index} name={history.word} type={history.searchType} />
        ))}
      </aside>
      <div className="flex items-center justify-center w-full">
        <div className="container mx-auto flex flex-col items-center pt-8">
          <form action="" className="mt-4"  onSubmit={submitWord}>
            <label htmlFor="submitWord" className="text-white font-semibold text-5xl pb-2 my-4 block text-center">
              Search Word 
            </label>
            <div className="flex gap-4"> 
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              id="submitWord"
              type="text"
              className="py-2 px-4 rounded-md w-64 min-w-[25rem] capitalize border-2 border-gray-200"
            />

            <Dropdown dropDownItems={wordTypes} onChange={setSearchType}/>

            <button className="py-2 px-4 rounded-md border-2 border-gray-200  cursor-pointer font-medium text-white hover:bg-white/20">
              Search
            </button>
            <button onClick={() => clearSearch()} type="button" className=" py-2 px-4 rounded-md border-2 border-gray-200  cursor-pointer font-medium text-white hover:bg-white/20">
              Clear
            </button>
            </div>

          </form>
          <div className="flex flex-row gap-4 max-w-[1200px] flex-wrap mt-8">
          {isLoading ? (
            <>
              <Loader />
            </>

          ) : (
            <>
              {wordResults.map((singleWordResult, index) => (
                <p onClick={() => {
                  getWords(singleWordResult.word, searchType)
                  setWord(singleWordResult.word)
                }} key={index} className="bg-gray-200 py-2 px-4 capitalize rounded-md hover:bg-blue-200 cursor-pointer">{singleWordResult.word}</p>
              ))}
            </>
          )}

          </div>
    
        </div>
      </div>
    </div>
  );
}

export default App;
