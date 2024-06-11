import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ModeSwitchers } from '../../../widgets/ModeSwitchers';

import cls from './TopicPage.module.scss';
import { Viewer } from '../../../widgets/Viewer';
import { AppContext } from '../../../app/App';
import axios from 'axios';

// let words2 = JSON.parse(JSON.stringify(words));
// let countWord = 1;
// words2.forEach((element: ITopicWordsObj) => {
//   for (let i = 0; i < element.words.length; i++) {
//     element.words[i].id = `w${countWord}`;
//     countWord++;
//   }
// });

export const TopicPage = () => {
  const { words, setWords } = useContext(AppContext);
  const { idd } = useParams();

  const [isAllWords, setIsAllWords] = useState(true);
  const [mode, setMode] = useState<null | number>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    words.forEach((item, index) => {
      if (item.idd === idd) setCurrentIndex(index);
    });
  }, [idd, words]);

  const setIsLearnHandler = (id: string) => {
    axios
      .put(`/words/${id}`)
      .then((res) => {
        console.log(res);

        if (setWords) {
          const newWordsArr = [...words[currentIndex].words];
          newWordsArr.forEach((word) => {
            if (word.idd === id) word.isLearn = !word.isLearn;
          });
          const newWordObj = { ...words[currentIndex], words: newWordsArr };
          const newWords = [...words];
          newWords[currentIndex] = newWordObj;

          setWords(newWords);
        }
      })
      .catch((error) => {
        console.error('There was an error updating the word!', error);
      });
  };

  return (
    <div className={cls.TopicPage}>
      <h2>{words[currentIndex].definition}</h2>
      <ModeSwitchers
        isAllWords={isAllWords}
        setIsAllWords={setIsAllWords}
        mode={mode}
        setMode={setMode}
      />
      <Viewer
        mode={mode}
        words={words[currentIndex].words}
        setIsLearn={setIsLearnHandler}
        isAllWords={isAllWords}
      />
    </div>
  );
};
