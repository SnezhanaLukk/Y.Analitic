import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header'

const GeneratorPage = lazy(() => import('./pages/GeneratorPage/GeneratorPage'));
const History = lazy(() => import('./pages/History/History'));
const Page404 = lazy(() => import('./pages/Page404/Page404'))


function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Suspense fallback={<div className='loading'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/generate" element={<GeneratorPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </div>
    </Router>

  )
}

export default App