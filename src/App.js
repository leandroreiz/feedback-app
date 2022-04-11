import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import FeedbackData from './data/FeedbackData';
import FeedbackList from './components/FeedbackList';
import FeedbackForm from './components/FeedbackForm';
import FeedbackStats from './components/FeedbackStats';
import AboutIconLink from './components/AboutIconLink';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?'))
      setFeedback(feedback.filter((item) => item.id !== id));
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const homePage = (
    <>
      <FeedbackForm handleAdd={addFeedback} />
      <FeedbackStats feedback={feedback} />
      <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
    </>
  );

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route exact path="/" element={homePage} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        <AboutIconLink />
      </div>
    </BrowserRouter>
  );
}

export default App;
