import { useEffect, useState, createContext } from 'react';
import { Navbar } from '../widgets/Navbar';
import { AppRouter } from './providers/router';
import './styles/index.scss';
import axios from 'axios';

export interface IWord {
  examples: Array<[string, string]>;
  translate: string;
  word: string;
  isLearn: boolean;
  id: string;
}

interface ITopicWordsObj {
  id: string;
  definition: string;
  words: Array<IWord>;
}

export const AppContext = createContext({});

const App = () => {
  const [words, setWords] = useState<ITopicWordsObj[]>([]);
  useEffect(() => {
    try {
      axios.get('/words').then((res) => {
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
