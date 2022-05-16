import serieA from "./../imgs/serieA.png";
import serieB from "./../imgs/serieB.png";
import liga1 from "./../imgs/liga1.png";
import liga2 from "./../imgs/liga2.png";
import premiere from "./../imgs/premierleague.png";
import championship from "./../imgs/championship.png";
import ligue1 from "./../imgs/ligue1.png";
import ligue2 from "./../imgs/ligue2.png";
import bundes1 from "./../imgs/bundesliga1.png";
import bundes2 from "./../imgs/bundesliga2.png";

function getImage(campionato) {
    switch (campionato){
        case "serieA":
        return serieA
        case "serieB":
        return serieB
        case "liga1":
        return  liga1
        case "liga2":
        return liga2
        case "premier":
        return premiere
        case "championship":
        return championship
        case "ligue1":
        return ligue1
        case "ligue2":
        return ligue2
        case "bundes1":
        return bundes1
        case "bundes2":
        return bundes2
        default :
        return         
    }

}

export default getImage;

