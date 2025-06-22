import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import MainPage from './components/pages/MainPage/MainPage'
import Header from './components/Header/Header'
import { FileUploadProvider } from './components/FileUploadContext/FileUploadContext';

const GeneratorPage = lazy(() => import('./components/pages/GeneratorPage/GeneratorPage'));
const History = lazy(() => import('./components/pages/History/History'));


function App() {
  return (
    <Router>
      <FileUploadProvider>
        <div className='app'>
          <Header />
          <Suspense fallback={<div className='loading'>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/generate" element={<GeneratorPage />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Suspense>
        </div>
      </FileUploadProvider>
    </Router>

  )
}

export default App