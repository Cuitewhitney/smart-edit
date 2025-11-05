// src/App.tsx (Updated – copy this over)
import { useState } from 'react';
import axios from 'axios';

interface AIResponse {
  enhanced: string;
}

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callAI = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<AIResponse>('http://localhost:8000/api/ai/enhance/', {
        text: input
      });
      setOutput(res.data.enhanced);
    } catch (err) {
      // Enhanced error handling
      setError('Oops! Backend seems disconnected!"');
      setOutput(''); // Clear previous output
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto p-6 font-sans">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Welcome to Smart Edit!
        </h1>
        
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type anything..."
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
            rows={4}
          />

          <button
            onClick={callAI}
            disabled={loading || !input.trim()}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-all"
          >
            {loading ? 'Simulating AI...' : ' Enhance with AI'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <p className="font-semibold text-yellow-800">{error}</p>
          </div>
        )}

        {output && (
          <div className="p-5 bg-green-50 border-2 border-green-200 rounded-lg animate-fade-in">
            <p className="font-semibold text-green-800 mb-2">AI Output (Preview):</p>
            <p className="text-gray-800 italic">{output}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default App;