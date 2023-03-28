const SEARCH_URL = 'https://restcountries.com/v3.1/name/'

const searchParams = new URLSearchParams({
    fields: ["name", "capital", "population", "flags", "languages"],
})

export const fetchCountries = (name) => {
    return fetch(`${SEARCH_URL}${name}?${searchParams}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    
    
}