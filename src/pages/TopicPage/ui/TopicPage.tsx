import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ModeSwitchers } from '../../../widgets/ModeSwitchers';

import words from '../../../shared/words/baza2.json';
import cls from './TopicPage.module.scss';
import { Viewer } from '../../../widgets/Viewer';
import { AppContext } from '../../../app/App';

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

// let words2 = JSON.parse(JSON.stringify(words));
// let countWord = 1;
// words2.forEach((element: ITopicWordsObj) => {
//   for (let i = 0; i < element.words.length; i++) {
//     element.words[i].id = `w${countWord}`;
//     countWord++;
//   }
// });

export const TopicPage = () => {
  //const { words } = useContext(AppContext);
  const { id } = useParams();
  const [topicWordsObj, setTopicWordsObj] = useState<ITopicWordsObj | null>(null);

  const [isAllWords, setIsAllWords] = useState(true);
  const [mode, setMode] = useState<null | number>(null);

  useEffect(() => {
    const currentObj = Object.assign({}, ...words.filter((item) => item.id === id));
    setTopicWordsObj(currentObj);
  }, [id]);

  const setIsLearnHandler = (id: string) => {
    setTopicWordsObj((prev) => {
      if (prev === null) {
        return null;
      }
      const newWordsArr = prev.words;
      newWordsArr.forEach((word) => {
        if (word.id === id) word.isLearn = !word.isLearn;
      });
      return { ...prev, words: newWordsArr };
    });
  };

  return (
    <div className={cls.TopicPage}>
      <h2>{topicWordsObj?.definition}</h2>
      <ModeSwitchers
        isAllWords={isAllWords}
        setIsAllWords={setIsAllWords}
        mode={mode}
        setMode={setMode}
      />
      <Viewer
        mode={mode}
        words={topicWordsObj?.words}
        setIsLearn={setIsLearnHandler}
        isAllWords={isAllWords}
      />
    </div>
  );
};
