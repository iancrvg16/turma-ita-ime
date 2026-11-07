import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const About = lazy(() => import('./pages/About'))
const Institution = lazy(() => import('./pages/Institution'))
const Subjects = lazy(() => import('./pages/Subjects'))
const Team = lazy(() => import('./pages/Team'))
const Pirambu = lazy(() => import('./pages/Pirambu'))
const Contact = lazy(() => import('./pages/Contact'))
const Lab = lazy(() => import('./pages/Lab'))

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="route-loading" role="status">
          <span />
          Abrindo novas possibilidades…
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nossa-turma" element={<About />} />
          <Route path="ita" element={<Institution id="ita" />} />
          <Route path="ime" element={<Institution id="ime" />} />
          <Route path="disciplinas" element={<Subjects />} />
          <Route path="equipe" element={<Team />} />
          <Route path="pirambu-innovation" element={<Pirambu />} />
          <Route path="participe" element={<Contact />} />
          <Route path="laboratorio" element={<Lab />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
