import { IWord } from '../../../pages/TopicPage/ui/TopicPage';
import { classNames } from '../../../shared/lib/classNames';
import cls from './ViewMode.module.scss';

interface ViewModeProps {
  words?: IWord[];
  setIsLearn: (id: string) => void;
}

export const ViewMode = ({ words, setIsLearn }: ViewModeProps) => {
  // const changeLearnHandler = (index: number) => {
  //   const newWordsArr = JSON.parse(JSON.stringify(words));
  //   newWordsArr[index].isLearn = !newWordsArr[index].isLearn;
  //   setWords(newWordsArr);
  // };

  return (
    <div className={classNames(cls.ViewMode)}>
      <ul>
        {words?.map((wordObj, index) => (
          <li key={index} className={classNames(cls.wordsItem)}>
            <div>
              {wordObj.word} - {wordObj.translate}
              <input
                type="checkbox"
                checked={wordObj.isLearn}
                onChange={() => {
                  setIsLearn(wordObj.id);
                }}
              />
            </div>

            {wordObj.examples.map((item, index) => {
              return (
                <div key={index} className={classNames(cls.wordsItemExample)}>
                  {item[0]} - {item[1]}
                </div>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};
