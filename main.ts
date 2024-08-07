function RNG(min: number, max: number): number {
    const rng = Math.random();
    return Math.trunc((rng * (max - min) + min));
}

function RNGDec(min: number, max: number, precision: number): number{
    if ( precision < 0) {
        throw new Error("La precisione deve essere maggiore o uguale a zero");
    }

    if (precision % 1 > 0) {
        throw new Error("La precisione deve essere un numero intero");
    }

    const rng = Math.random();
    const multFactot: number = 10 ** precision;
    return Math.trunc((rng * (max - min) + min) * multFactot) / multFactot;
}

function RNGsequence(len: number, min: number, max: number): number[] {
    if ( len > max - min) {
        throw new Error("Non posso trovare " + len + " numeri tra " + min + " e " + max + "!");
    }

    const res: number[] = [];

    while (res.length < len) {
        const rn = RNG(min, max)
        if (res.includes(rn)) {
            continue;
        }
        res.push(rn);
    }
    return res;
}

const ruote: string[] = ['Bari', 'Cagliari', 'Firenze', 'Genova', 'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia', 'Nazionale'];
const estrazioni: { [ruota: string]: number[]} = {};

for (const ruota of ruote) {
    const estrazione: number[] = RNGsequence(5, 1, 91);
    estrazioni[ruota] = estrazione;
}

console.log(JSON.stringify(estrazioni, null, 2));

//console.log(RNGDec(0, 10, 2.2));

function createRuotaCnt(ruotaName: string, estrazioni: number[]) {
    const ruotaDiv = document.createElement('div');
    ruotaDiv.className = 'ruota ' + ruotaName.toLowerCase();
    const nameH2 = document.createElement('h2');
    nameH2.innerText = ruotaName;
    nameH2.className = 'ruota-title'
    ruotaDiv.appendChild(nameH2);

    for (const num of estrazioni) {
        const numP = document.createElement('p');
        numP.innerText = "" +num;
        const numDiv = document.createElement('div');
        numDiv.className = 'ruota-estrazione'
        numDiv.appendChild(numP);
        ruotaDiv.appendChild(numDiv);
    }

    return ruotaDiv;
}

const container = document.getElementById('cnt');
if (container) {
    const pre = document.createElement('pre');
    //pre.innerText = JSON.stringify(estrazioni, null, 2);
    //container.appendChild(pre);

    for (const ruota of ruote) {
        const ruotaEstrazioni = estrazioni[ruota];
        const ruotaDiv = createRuotaCnt(ruota, ruotaEstrazioni);
        container.appendChild(ruotaDiv);
    }
}

