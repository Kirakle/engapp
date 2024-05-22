import { Link } from 'react-router-dom';
import { pathes } from '../../Home/ui/Home';

import style from './Verb.module.scss';

const topics = [
  { definition: 'Этапы действия, часть и целое', id: '01' },
  { definition: 'Движение', id: '02' },
  { definition: 'Наличие, отсутствие, принадлежность', id: '03' },
  { definition: 'Работа, сотрудничество', id: '04' },
  { definition: 'Чувства, мышление, восприятие', id: '05' },
  { definition: 'Общение', id: '06' },
  { definition: 'Борьба', id: '07' },
];

export const Verb = () => {
  return (
    <div className={style.Verb}>
      <h2>Verb</h2>
      {topics.map((topic) => (
        <Link key={topic.id} to={`${pathes.VERB}/${topic.id}`}>
          {topic.definition}
        </Link>
      ))}
    </div>
  );
};
