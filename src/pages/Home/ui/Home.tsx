import { Link } from 'react-router-dom';
import style from './Home.module.css';
import axios from 'axios';

export enum pathes {
  MAIN = '/',
  VERB = '/verb',
  NOUN = '/noun',
  ADJECTIVE = '/adjective',
  ADVERB = '/adverb',
  PREPOSITION = '/preposition',
}

const partsOfSpeach = [
  { name: 'Глагол', path: pathes.VERB },
  { name: 'Существительное', path: pathes.NOUN },
  { name: 'Прилагательное', path: pathes.ADJECTIVE },
  { name: 'Наречие', path: pathes.ADVERB },
  { name: 'Предлог', path: pathes.PREPOSITION },
];

export const Home = () => {
  return (
    <div className={style.Home}>
      {partsOfSpeach.map((part, index) => (
        <Link key={index} to={part.path}>
          {part.name}
        </Link>
      ))}
    </div>
  );
};
