import React, { useEffect, useState } from 'react';

// Reusable fetch method with timeout
const fetchData = async (url, options, setModels, setError, setLoading,setData) => {
  setLoading(true);
  setError('');
  setModels([]);

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Failed to fetch models. Please try again later.');
    }

    const data = await response.json();
    setModels(data|| [{ modelValue: 'TestMobile' }]);
  } catch (err) {
    setError(err.message || 'An unexpected error occurred.');
  } finally {
    setLoading(false);
  }
};

function Search() {
  const [brand, setBrand] = useState('');
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data,setData]=useState([]);

  const fetchModels = () => {
    if (!brand) {
      setError('Please enter a mobile brand name.');
      return;
    }

    const url = `https://mobile-phone-specs-database.p.rapidapi.com/gsm/get-models-by-brandname/${brand}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '885972bd5bmsh6be2aea76c02ea8p128905jsn514670ab0028',
        'X-RapidAPI-Host': 'mobile-phone-specs-database.p.rapidapi.com',
      },
    };

    fetchData(url, options, setModels, setError, setLoading,setData);
  };

  useEffect(()=>{

  },[data])

  return (
    <div className="min-h-screen flex flex-col items-center pt-[30vh] justify-center bg-white p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Enter Mobile Brand Name to Search
      </h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Search for a mobile brand..."
          className="w-full px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
        <button
          onClick={fetchModels}
          className="w-full mt-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
           Search
        </button>
      </div>
      {loading && <p className="mt-4 text-red-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <div className="flex flex-wrap gap-4 mt-6 w-full max-w-5xl">
        {models.map((model, index) => (
          <div
            key={index}
            className="border border-red-600 rounded-md p-4 bg-white shadow-lg w-48"
          >
            <h2 className="text-lg font-bold text-red-600 truncate">
              {model.modelValue}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
