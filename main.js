const search = document.getElementById('search');
const searchList = document.getElementById('match-list');

searchStates = async searchText => {
    const res = await fetch('states.json');
    const states = await res.json();
    //console.log(states);    
    
    let matches = states.filter(state => {
        const regx = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regx) || state.abbr.match(regx);
    });

    if(searchText.length === 0) {
        matches = [];
        searchList.innerHTML = '';
    }
    

    outputHTML(matches);
}

const outputHTML = matches => {  
    if(matches.length > 0) {
        const html = matches.map(match => 
            `<div class="card card-body mb-1">
            <h5>${match.name} (${match.abbr})
            <span class="text-primary">${match.capital}</span></h5>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>`
        )
        .join('');
        searchList.innerHTML = html;
    } 
    
};

search.addEventListener('input', () => searchStates(search.value));