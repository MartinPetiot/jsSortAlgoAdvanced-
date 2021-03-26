let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(Ville) {
    const lat1 = 45.188529;
    const lon1 = 5.724524;
    const lat2 = Ville.latitude;
    const lon2 = Ville.longitude;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    console.log(d);
    return d;
}


/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(listVille,i, j) {
    i = distanceFromGrenoble(i);
    j = distanceFromGrenoble(j);
    if (i<j) {
        return true;
    }
    console.log(isLess(listVille,i,j));
}

/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
function swap (listVille, i , j){
    let temp = listVille[i];
    listVille[i]=listVille[j];
    listVille[j]=temp;
}
    console.log();


function sort(type) {
    switch (type) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':

            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
    }
}

function insertsort() {
    console.log("insertsort - implement me !");
}

function selectionsort() {
    console.log("selectionsort - implement me !");
}

function bubblesort() {
    console.log("bubblesort - implement me !");
}

function shellsort() {
    console.log("shellsort - implement me !");
}

function mergesort(listVille) {
    const n = listVille.length
    const middle = Math.floor(n/2);
    const left = listVille.slice(0, middle)
    const right = listVille.slice(middle, n)
    if (n <= 1) { //n correspond à l'index max de mon tableau
        return listVille;
    } else{
        return fusion(mergesort(left), mergesort(right));
    }
}

    function fusion (tabA,tabB) {
        if (tabA.length === 0 ) {
            return tabB;
        } else if (tabB.length === 0) {
            return tabA;
        } else if (tabA[0] <= tabB[0]) {
            return [tabA[0]].concat(fusion(tabA.slice(1,tabA.length), tabB));
        } else {
            return [tabB[0]].concat(fusion(tabA,tabB.slice(1, tabB.length)));
        }
    }
    console.log(mergesort(listVille));



function heapsort() {
    console.log("heapsort - implement me !");
}

function quicksort(tableau,first=0,last=tableau.length-1){
    if (first<last){
        let pi = partitionner(tableau,first, last);
        quicksort(tableau,first,pi-1);
        quicksort(tableau,pi+1,last);
    }
}

    function partitionner (tableau, first, last){
        let pivot = last;
        let j = first;
        for (let i = j; i<last;i++){
            if (tableau[i]<= tableau[pivot]){
                swap(tableau, i, j)
                j=j+1;
            }
        }
        swap(tableau, last, j)
        return j;
    }
quicksort(tableau)
console.log(tableau)


/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}
