window.onload = init;

function init(){

    request = new XMLHttpRequest ();
    request.open("GET", "xml/Sites.xml");   // Récupère les sites
    request.send();
    request.onreadystatechange = traitementReponse ;

}   // init()

function traitementReponse(){

    if (request.readyState == 4 && request.status == 200) {
        // traitement de la réponse stockée dans request.responseText

        var chaineXML = request.responseXML;

        // Ajoute les noms dans le fichier HTML
        divSites = document.getElementById("Sites");
        divSites.innerHTML = null;

        var nom = chaineXML.getElementsByTagName("nom");
        

        for (var indice = 0; indice < nom.length; indice++){

            // Noms des services
            var insertNom = document.createElement("h3");
            insertNom.appendChild(document.createTextNode(nom[indice].textContent));
            divSites.appendChild(insertNom);

            insertNom.setAttribute("id", indice); // Permet de savoir quel description ajouter

            insertNom.onmouseover = affiche;
            insertNom.onmouseout = enleve;
           
        }

    } 


}

function affiche(){

    var chaineXML = request.responseXML;

    // Ajout du lien du site
    var lien = chaineXML.getElementsByTagName("lien");
    
    var lienAdresse = document.createElement("a"); 

    lienAdresse.setAttribute("href", lien[this.getAttribute("id")].getAttribute("adresse"));
    lienAdresse.appendChild(document.createTextNode("---> Lien vers le site"));
    this.appendChild(lienAdresse);

    // Ajout de la description du site
    var desc = chaineXML.getElementsByTagName("desc");
    var descSites = document.createElement("h4");
    descSites.appendChild(document.createTextNode(desc[this.getAttribute("id")].textContent));
    this.appendChild(descSites);


}

function enleve(){
    this.removeChild(this.lastChild);   // Retire la description dès le retrait de la souris
    this.removeChild(this.lastChild);   // Retire le lien du site
}

