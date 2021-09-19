import './App.css';
import { useEffect, useState } from 'react';


const POKEMONS_PER_PAGE = 20;

function App() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const offset = (page - 1) * POKEMONS_PER_PAGE;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMONS_PER_PAGE}&offset=${offset}`)
      .then((resp) => resp.json())
      .then((result) => {
        setData(result.results);
        setLoading(false);
      })
  }, [page]);
  return (
    <div className="App">
      <div className='container'>
        {data ? (
          data.map((v, i) => {
            return (
              <div className='pokemon button'>
                <p>{v.name}</p>
              </div>
            );
          })
        ) : (
        <p>No Pokemon</p>
        )}
      </div>
      <div className='pagination'>
        <button
          disabled={page === 1 || loading}
          className='PrevNextButton'
          onClick={() => setPage(page === 1 ? 1 : page - 1)}
        > Prev </button>
        <button
          disabled={loading}
          className='PrevNextButton'
          onClick={() => setPage(page + 1)}
        > Next </button>
      </div>
      <p className='page-number'>Page {page}</p>
    </div>
  );
}

export default App;
