import { Route, Routes } from 'react-router-dom';
import { Home } from '../../../../pages/Home';
import { Verb } from '../../../../pages/Verb';
import { Noun } from '../../../../pages/Noun';
import { Adjective } from '../../../../pages/Adjective';
import { Preposition } from '../../../../pages/Preposition';
import { pathes } from '../../../../pages/Home/ui/Home';
import { TopicPage } from '../../../../pages/TopicPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={pathes.MAIN} element={<Home />} />
      <Route path={pathes.VERB} element={<Verb />} />
      <Route path={`${pathes.VERB}/:id`} element={<TopicPage />} />
      <Route path={pathes.NOUN} element={<Noun />} />
      <Route path={pathes.ADJECTIVE} element={<Adjective />} />
      <Route path={pathes.PREPOSITION} element={<Preposition />} />
    </Routes>
  );
};
