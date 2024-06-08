import { classNames } from '../../../shared/lib/classNames';
import cls from './ModeSwitchers.module.scss';

export enum Modes {
  VIEW,
  RUSWORD,
  ENGWORD,
  RUSPHRASE,
  ENGPHRASE,
}

const modes = [
  { description: 'Просмотр', mode: Modes.VIEW },
  { description: 'Слово на русский', mode: Modes.RUSWORD },
  { description: 'Слово на английский', mode: Modes.ENGWORD },
  { description: 'Фраза на русский', mode: Modes.RUSPHRASE },
  { description: 'Фраза на английский', mode: Modes.ENGPHRASE },
];

interface ModeSwitchersProps {
  isAllWords: boolean;
  setIsAllWords: React.Dispatch<React.SetStateAction<boolean>>;
  mode: number | null;
  setMode: (newMode: number) => void;
}

export const ModeSwitchers = ({ isAllWords, mode, setIsAllWords, setMode }: ModeSwitchersProps) => {
  return (
    <div className={cls.ModeSwitchers}>
      <div>
        <h3>Режим:</h3>
        <button
          className={classNames('', { [cls.active]: isAllWords })}
          onClick={() => {
            setIsAllWords(true);
          }}>
          Все слова
        </button>
        <button
          className={classNames('', { [cls.active]: !isAllWords })}
          onClick={() => {
            setIsAllWords(false);
          }}>
          Только невыученные
        </button>
      </div>
      <div>
        <h3>Тренировка:</h3>
        {modes.map((item) => {
          const isActiveMode = item.mode === mode;
          return (
            <button
              key={item.mode}
              className={classNames('', { [cls.active]: isActiveMode })}
              onClick={() => {
                setMode(item.mode);
              }}>
              {item.description}
            </button>
          );
        })}
      </div>
    </div>
  );
};
