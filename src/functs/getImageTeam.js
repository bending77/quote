import sasaList from './../data/SquadreConImmagine.json'
function getImageTeam(squadra) {
    let image
if (sasaList.indexOf(squadra) > -1){
    image = './'+squadra+'.png';
}else{
    image = './standard.png';
}
return image;
    
}

export default getImageTeam;

