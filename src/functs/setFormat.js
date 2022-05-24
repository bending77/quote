function setFormat(stringa) {
    let arr = stringa.split(" ")
    return arr.map(element => {
        element = element.trim()
        if (element.length < 3 ){
            return element.toUpperCase()
        }else{
         return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
        }   
    }).join().replace(/,/g," ");
}

export default setFormat;