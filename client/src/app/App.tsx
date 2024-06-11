import { useEffect, useState, createContext } from 'react';
import { Navbar } from '../widgets/Navbar';
import { AppRouter } from './providers/router';
import './styles/index.scss';
import axios from 'axios';
import wordsArr from '../shared/words/baza2.json';

export interface IWord {
  examples: Array<[string, string]>;
  translate: string;
  word: string;
  isLearn: boolean;
  idd: string;
  _id: string;
}

interface ITopicWordsObj {
  idd: string;
  _id: string;
  definition: string;
  words: Array<IWord>;
}

type AppContextDefaultValue = {
  words: ITopicWordsObj[];
  setWords?: React.Dispatch<React.SetStateAction<ITopicWordsObj[]>>;
};

export const AppContext = createContext<AppContextDefaultValue>({
  words: wordsArr as ITopicWordsObj[],
});

const App = () => {
  const [words, setWords] = useState<ITopicWordsObj[]>(wordsArr as ITopicWordsObj[]);
  useEffect(() => {
    try {
      axios.get<ITopicWordsObj[]>('/words').then((res) => {
        setWords(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <AppContext.Provider value={{ words, setWords }}>
      <div className="app">
        <Navbar />
        <div className="content-page">
          <AppRouter />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
