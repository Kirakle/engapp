import { classNames } from '../../../shared/lib/classNames';

import { PhraseMode } from '../../PhraseMode';
import { ViewMode } from '../../../widgets/ViewMode';
import { WordMode } from '../../WordMode';

import { Languages } from '../../WordMode/ui/WordMode';
import { IWord } from '../../../app/App';
import { Modes } from '../../ModeSwitchers/ui/ModeSwitchers';

import cls from './Viewer.module.scss';

interface ViewerProps {
  mode: number | null;
  words?: IWord[];
  setIsLearn: (id: string) => void;
  isAllWords: boolean;
}

export const Viewer = ({ mode, words, setIsLearn, isAllWords }: ViewerProps) => {
  const visibleWords = words?.filter((el) => {
    if (isAllWords) return true;
    else return !el.isLearn;
  });

  switch (mode) {
    case Modes.VIEW:
      return (
        <div className={classNames(cls.Viewer)}>
          <ViewMode words={visibleWords} setIsLearn={setIsLearn} />
        </div>
      );
    case Modes.RUSWORD:
      return (
        <div className={classNames(cls.Viewer)}>
          <WordMode words={visibleWords} lang={Languages.RUS} />
        </div>
      );
    case Modes.ENGWORD:
      return (
        <div className={classNames(cls.Viewer)}>
          <WordMode words={visibleWords} lang={Languages.ENG} />
        </div>
      );
    case Modes.RUSPHRASE:
      return (
        <div className={classNames(cls.Viewer)}>
          <PhraseMode words={visibleWords} lang={Languages.RUS} />
        </div>
      );
    case Modes.ENGPHRASE:
      return (
        <div className={classNames(cls.Viewer)}>
          <PhraseMode words={visibleWords} lang={Languages.ENG} />
        </div>
      );

    default:
      return <div className={classNames(cls.Viewer)}>Выбери тренировку</div>;
  }
};
