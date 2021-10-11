import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Tabs from '../components/Tabs';

const imagePrefix = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
const tabs = ["Overview", "Stats", "Abilities"];

export default function DetailsPage() {
  const [pokemon, setPokemon] = useState(null);
  const history = useHistory();
  const name = history.location.pathname.split("/")[2]; // /pokemon/pikachu
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPokemon(data);
        console.log(data);
      });
  }, [name]);

  const zeroFilled = pokemon && ("0000" + pokemon.id).slice(-3);

  return (
    <div className="pokemon-page">
      <div className="sprite-container">
        <div className="circle">
          <img
            className="sprite"
            src={`${imagePrefix}${zeroFilled}.png`}
            alt=""
            height="500"
          />
        </div>
      </div>
      <div className="title-container">
        <span className="pokemon-id">#128</span>
        <h1>{name}</h1>
              <p className="type">
                  Type:{' '}
                  {pokemon &&
                      pokemon.types.map((v, i) => (
                      <span>
                          {v.type.name}
                          {i === pokemon.types.length - 1 ? null : ', '}
                       </span>
                  ))}
        </p>
          </div>
          <Tabs
              tabs={tabs}
              activeTabIndex={activeTabIndex}
              setActiveTabIndex={setActiveTabIndex}
          />
    </div>
  );
}

