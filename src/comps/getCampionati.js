function getCampionati(allLeagues) {
    let result = []
    allLeagues.forEach(element => {
        result.push(element.name)
    });
    return result
}

export default getCampionati;

