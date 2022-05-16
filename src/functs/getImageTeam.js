import milan from "./../imgs/milan.png"
import inter from "./../imgs/inter.png"
import juve from "./../imgs/juve.png"
import liverpool from "./../imgs/liverpool.png"
import chelsea from "./../imgs/chelsea.png"
import arsenal from "./../imgs/arsenal.png"
import barcellona from "./../imgs/barcellona.png"
import realmadrid from "./../imgs/realmadrid.png"
import atleticomadrid from "./../imgs/atleticomadrid.png"
import pordenone from "./../imgs/pordenone.png"
import vicenza from "./../imgs/vicenza.png"
import benevento from "./../imgs/benevento.png"



function getImageTeam(squadra) {
    return "./../imgs/"+squadra+".png"
    /*switch (squadra){
        case "milan":
        return milan
        case "inter":
        return inter
        case "juve":
        return  juve
        case "liverpool":
        return liverpool
        case "chelsea":
        return chelsea
        case "arsenal":
        return arsenal
        case "Barcellona":
        return barcellona
        case "Real madrid":
        return realmadrid
        case "atletico madrid":
        return atleticomadrid
        case "pordenone":
        return pordenone
        case "vicenza":
        return vicenza
        case "benevento":
        return benevento
        default :
        return         
    }*/

}

export default getImageTeam;

