import { useCallback, useEffect, useState } from 'react';
import { IWord } from '../../../pages/TopicPage/ui/TopicPage';
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
    <div className={classNames(cls.PhraseMode)}>
      {lang === Languages.ENG &&
        currentWord?.examples.map(([example, translate], ind) => {
          return (
            <div key={ind} className={classNames(cls.definition)}>
              {translate}
            </div>
          );
        })}
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
      {translateIsVisible &&
        lang === Languages.ENG &&
        currentWord?.examples.map(([example, translate], ind) => {
          return (
            <div key={ind} className={classNames(cls.definition)}>
              {example}
            </div>
          );
        })}
      {translateIsVisible && lang === Languages.RUS && (
        <div className={classNames(cls.translate)}>{currentWord?.translate}</div>
      )}
    </div>
  );
};
