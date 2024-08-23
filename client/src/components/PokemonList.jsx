import React, { useEffect, useState } from 'react'
import { fetchPokemonDetails, fetchPokemonList } from '../api/pokemonService';
import { IoIosSearch } from "react-icons/io";
import { GoGear } from "react-icons/go";

const PokemonList = () => {

    const [pokemonData, setPokemonData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch initial list of Pokémon
        const fetchData = async () => {
            try {
                const list = await fetchPokemonList();
                const detailedData = await Promise.all(
                    list.map(async (pokemon) => {
                        const details = await fetchPokemonDetails(pokemon.url);
                        return {
                            name: pokemon.name,
                            id: details.id,
                            abilities: details.abilities.map((ability) => ability.ability.name),
                            base_exp: details.base_experience,
                            sprite: details.sprites.front_default,
                        };
                    })
                );
                setPokemonData(detailedData);
                setLoading(false);

            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredPokemon = pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='bg-blue-100 min-h-screen min-w-full pt-8'>


            <form class="max-w-md mx-auto">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <IoIosSearch />
                    </div>
                    <input type="search" id="default-search" class="block w-full py-4 px-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " placeholder="Search Pokemon...." required value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700  font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                </div>
            </form>


            {loading ? (
                <>
                    <div className='w-[100%] h-[100%] flex justify-center'>
                        <GoGear className='text-9xl animate-spin duration-100 mt-40' />
                    </div>
                </>
            ) : (
                <>

                    <div className='flex flex-row flex-wrap justify-evenly px-10 '>
                        {filteredPokemon.map((pokemon) => (

                            <div className='w-[15%] rounded-lg shadow-lg my-10 mx-8 flex flex-col py-4 px-5 pb-5 bg-white' key={pokemon.name} data-aos="flip-left">
                                <div className='flex flex-col items-center'>
                                    <img src={pokemon.sprite}
                                        alt={pokemon.name} />

                                    <p className='uppercase font-semibold'>{pokemon.name}</p>
                                    <div className='flex flex-row space-x-2 items-center justify-center'>
                                        <span className='text-xs font-semibold text-gray-500'>BASE_EXP</span>
                                        <span className='text-sm font-semibold'>{pokemon.base_exp}</span>
                                    </div>
                                </div>
                                <p className='text-xs mt-2 font-semibold uppercase text-red-600 mb-2'>Abilities</p>
                                {
                                    pokemon.abilities.map((ele, index) => {
                                        return <React.Fragment key={index}>
                                            <p className='ml-2 text-xs font-semibold uppercase'>{index + 1}.&nbsp;{ele}</p>
                                        </React.Fragment>
                                    })
                                }
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div >
    )
}

export default PokemonList
