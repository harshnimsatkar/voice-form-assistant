import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleMicClick = () => {
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!recognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    const mic = new recognition();
    mic.lang = i18n.language === 'mr' ? 'mr-IN' : i18n.language === 'hi' ? 'hi-IN' : 'en-US';
    mic.interimResults = false;
    mic.maxAlternatives = 1;

    mic.onstart = () => {
      setListening(true);
    };

    mic.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setText(prev => prev + ' ' + spokenText);
      setListening(false);
    };

    mic.onerror = (event) => {
      alert('Mic error: ' + event.error);
      setListening(false);
    };

    mic.onend = () => {
      setListening(false);
    };

    mic.start();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('welcome')}</h1>

      <label className="mb-2 text-lg text-gray-600">{t('input_label')}</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full max-w-md mb-4"
        placeholder="Speak or type your answer..."
      ></textarea>

      <div className="flex gap-2 items-center">
        <button
          onClick={handleMicClick}
          className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ${listening ? 'opacity-50' : ''}`}
          disabled={listening}
        >
          🎤 {listening ? 'Listening...' : 'Speak'}
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {t('submit')}
        </button>
      </div>

      <div className="mt-4">
        <button onClick={() => changeLanguage('en')} className="text-sm text-blue-600 mx-2">English</button>
        <button onClick={() => changeLanguage('hi')} className="text-sm text-blue-600 mx-2">हिंदी</button>
        <button onClick={() => changeLanguage('mr')} className="text-sm text-blue-600 mx-2">मराठी</button>
      </div>
    </div>
  );
}

export default App;
