import React from 'react'
import { useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from 'react-router';

const spritePrefix = "https://img.pokemondb.net/sprites/home/normal/";
const POKEMONS_PER_PAGE = 10;

function LandingPage() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [err, setErr] = useState(null);
  const history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(() => {
    setLoading(true);
    setErr(null);
    const offset = (page - 1) * POKEMONS_PER_PAGE;
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${POKEMONS_PER_PAGE}&offset=${offset}`
    )
      .then((resp) => resp.json())
      .then((result) => {
        setData(result.results);
        setLoading(false);
      });
  });

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
      .then((resp) => resp.json())
      .then((json) => {
        setData([json]);
        setLoading(false);
        setErr(null);
      })
      .catch(() => {
        setErr(`${input} is not a pokemon`);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!input) {
      fetchData();
    }
  }, [fetchData, input]);

  return (
    <div>
      <div className="form">
        <input
          type="search"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button disabled={loading} onClick={handleSearch}>
          {loading ? "Loading" : "Search"}
        </button>
      </div>
      <div className="container">
        {data && !err && !loading
          ? data.map((v, i) => {
              return (
                <div
                  onClick={() => history.push(`/pokemon/${v.name}`)}
                  className="pokemon button"
                >
                  <p>{v.name}</p>
                  <img src={`${spritePrefix}${v.name}.png`} alt="" />
                </div>
              );
            })
          : null}
        {loading && (
          <>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
            <Skeleton height={150}></Skeleton>
          </>
        )}
      </div>
      {err && !loading && (
        <div className="error-container">
          <p className="error-message">{err}</p>
        </div>
      )}
      <div className="pagination">
        <button
          disabled={page === 1 || loading}
          className="button"
          onClick={() => setPage(page === 1 ? 1 : page - 1)}
        >
          Prev
        </button>
        <button
          disabled={loading}
          className="button"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <p className="page-number">Page {page}</p>
    </div>
  );
}

export default LandingPage;
