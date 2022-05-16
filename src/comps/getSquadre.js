import getAllLeagues from './mayorLeagues.js'

function getSquadre(campionato) {
    let result = []
    let allLeagues = getAllLeagues()
    allLeagues.forEach(element => {
        if (element.name === campionato){
            result = element.teams
        }
    });
    return result
}

export default getSquadre;

