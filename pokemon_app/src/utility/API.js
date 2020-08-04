
export const API_URL = 'https://pokeapi.co/api/v2/pokemon'
export const API_URL_TEST = 'https://pokeapi.co/api/v2/pokemon/butterfree'
export const SUCCESS = 'success'
export const LOADING = 'loading'
export const FAILED = 'failed'

async function callAPI(url){
  let data
  try {
    const response = await fetch(url)
    data = await response.json()
  
    if (response.ok) {
      return data
    }
  
    throw new Error(response.statusText)
  } 
  catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

export async function getPokemons(url, pageNumber=1, numberOfRecords=40){
  let offset = pageNumber === 1 ? 0 : numberOfRecords * (pageNumber -1)
  url = `${API_URL}/?offset=${offset}&limit=${numberOfRecords}`

  return callAPI(url);
}

export async function getPokemonByName(name='butterfree'){
  let url = `${API_URL}/{name}`
  return callAPI(url);
}