
export const API_URL = 'https://pokeapi.co/api/v2/pokemon'
export const API_URL_TYPE = 'https://pokeapi.co/api/v2/type'
export const SUCCESS = 'success'
export const LOADING = 'loading'
export const FAILED = 'failed'
export const MAX_NUM_OF_RECORDS = 1000

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

export async function getPokemonApiData(url){
  return callAPI(url);
}