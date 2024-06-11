import { useCallback, useEffect, useState } from 'react';
import { IWord } from '../../../app/App';
import { classNames } from '../../../shared/lib/classNames';
import cls from './PhraseMode.module.scss';
import { getRandomNumber } from '../../../shared/lib/randomNumber';

export enum Languages {
  RUS = 'rus',
  ENG = 'eng',
}

interface PhraseModeProps {
  words?: IWord[];
  lang: Languages;
}

export const PhraseMode = ({ words, lang }: PhraseModeProps) => {
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
  }, [words]);

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
    <div className={classNames(cls.PhraseMode)}>
      {lang === Languages.ENG &&
        currentWord?.examples.map((elem, ind) => {
          return (
            <div key={ind} className={classNames(cls.definition)}>
              {elem[1]}
            </div>
          );
        })}
      {lang === Languages.RUS &&
        currentWord?.examples.map((elem, ind) => {
          return (
            <div key={ind} className={classNames(cls.definition)}>
              {elem[0]}
            </div>
          );
        })}

      <div className={classNames(cls.btnContainer)}>
        <button className={classNames(cls.btnTranslate)} onClick={toggleTranslateVisibility}>
          {!translateIsVisible && 'Показать перевод'}
          {translateIsVisible && 'Скрыть перевод'}
        </button>
        <button className={classNames(cls.btnTranslate)} onClick={nextWordHandler}>
          Следующее слово
        </button>
      </div>
      {translateIsVisible &&
        lang === Languages.ENG &&
        currentWord?.examples.map((element, ind) => {
          return (
            <div key={ind} className={classNames(cls.definition)}>
              {element[0]}
            </div>
          );
        })}
      {translateIsVisible &&
        lang === Languages.RUS &&
        currentWord?.examples.map((element, ind) => {
          return (
            <div key={ind} className={classNames(cls.definition)}>
              {element[1]}
            </div>
          );
        })}
    </div>
  );
};
