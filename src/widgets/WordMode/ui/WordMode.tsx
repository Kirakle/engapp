import { useCallback, useEffect, useState } from 'react';
import { IWord } from '../../../pages/TopicPage/ui/TopicPage';
import { classNames } from '../../../shared/lib/classNames';
import cls from './WordMode.module.scss';
import { getRandomNumber } from '../../../shared/lib/randomNumber';

export enum Languages {
  RUS = 'rus',
  ENG = 'eng',
}

interface WordOnEngModeProps {
  words?: IWord[];
  lang: Languages;
}

export const WordMode = ({ words, lang }: WordOnEngModeProps) => {
  const [currentWord, setCurrentWord] = useState<IWord>();
  const [translateIsVisible, setTranslateIsVisible] = useState<boolean>(false);

  const nextWordHandler = useCallback(() => {
    if (words) {
      setCurrentWord((prev) => {
        let newCurrentWord: IWord;
        while (prev !== (newCurrentWord = words[getRandomNumber(words.length)])) {
          return newCurrentWord;
        }
      });
      setTranslateIsVisible(false);
    }
  }, [words]);
  const toggleTranslateVisibility = useCallback(() => {
    setTranslateIsVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    if (words) {
      setCurrentWord(words[getRandomNumber(words.length)]);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'q') {
        toggleTranslateVisibility();
      }
      if (event.key === 'e') {
        nextWordHandler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextWordHandler, toggleTranslateVisibility]);

  return (
    <div className={classNames(cls.WordMode)}>
      {lang === Languages.ENG && (
        <div className={classNames(cls.definition)}>{currentWord?.translate}</div>
      )}
      {lang === Languages.RUS && (
        <div className={classNames(cls.definition)}>{currentWord?.word}</div>
      )}

      <div className={classNames(cls.btnContainer)}>
        <button className={classNames(cls.btnTranslate)} onClick={toggleTranslateVisibility}>
          {!translateIsVisible && 'Показать перевод'}
          {translateIsVisible && 'Скрыть перевод'}
        </button>
        <button className={classNames(cls.btnTranslate)} onClick={nextWordHandler}>
          Следующее слово
        </button>
      </div>
      {translateIsVisible && lang === Languages.ENG && (
        <div className={classNames(cls.translate)}>{currentWord?.word}</div>
      )}
      {translateIsVisible && lang === Languages.RUS && (
        <div className={classNames(cls.translate)}>{currentWord?.translate}</div>
      )}
    </div>
  );
};
