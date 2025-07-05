import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [listening, setListening] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleMicClick = () => {
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const mic = new recognition();
    mic.lang = i18n.language === 'mr' ? 'mr-IN' : i18n.language === 'hi' ? 'hi-IN' : 'en-US';

    mic.onstart = () => setListening(true);

    mic.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setText((prev) => prev + ' ' + spoken);
      setListening(false);
    };

    mic.onerror = () => setListening(false);
    mic.onend = () => setListening(false);

    mic.start();
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('lang', i18n.language);

      const res = await fetch('http://127.0.0.1:8000/process', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      alert('Error connecting to backend');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>

      <label className="mb-2">{t('input_label')}</label>
      <textarea
        className="border rounded p-2 w-full max-w-md mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Speak or type your answer..."
      />

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleMicClick}
          disabled={listening}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          🎤 {listening ? 'Listening...' : 'Speak'}
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {t('submit')}
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        <button onClick={() => changeLanguage('en')} className="text-sm text-blue-600">English</button>
        <button onClick={() => changeLanguage('hi')} className="text-sm text-blue-600">हिंदी</button>
        <button onClick={() => changeLanguage('mr')} className="text-sm text-blue-600">मराठी</button>
      </div>

      {response && (
        <div className="bg-white mt-6 p-4 rounded shadow max-w-md w-full text-left">
          <h3 className="font-semibold mb-1">✅ Server Response:</h3>
          <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
