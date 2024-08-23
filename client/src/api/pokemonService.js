import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonList = async (limit = 80) => {
    try {
        const response = await axios.get(`${BASE_URL}?limit=${limit}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
};

// Fetch detailed data for a single Pokémon, including abilities
export const fetchPokemonDetails = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        throw error;
    }
};
