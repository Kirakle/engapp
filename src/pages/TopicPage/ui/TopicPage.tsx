import { useParams } from 'react-router-dom';
import style from './TopicPage.module.scss';
import { useEffect } from 'react';
import words from '../../../shared/words/baza.json';

export const TopicPage = () => {
  
  const { id } = useParams();
  console.log(words);

  return <div>TopicPage</div>;
};
