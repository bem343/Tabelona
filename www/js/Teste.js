//Valor teste para os dois individuos
let ind1 = "AaBbCc";
let ind2 = "AaBbCc";

//Cria os dois Arrays
let alelosInd1 = new Array(ind1.length/2, 2);
let alelosInd2 = new Array(ind1.length/2, 2);

//Separa os alelos e seus pares em um array
let cont = 0;
for (var i = 0; i < ind1.length/2; i++) {
    for (var p = 0; p < 2; p++){
    	//Indivíduo 1
	    alelosInd1[i, p] = ind1.substr(cont,1);
	    alelosInd2[i, p] = ind2.substr(cont,1);
	    cont++;
	}
}

//Separa os alelos possiveis do indivíduo
let aPossiveisInd1 = "";
let posGametasInd1 = 1;
let aPossiveisInd2 = "";
let posGametasInd2 = 1;
for (var i = 0; i < ind1.length/2; i++)
{
    //Indivíduo 1
    if (alelosInd1[i, 0] == alelosInd1[i, 1])
    {
        aPossiveisInd1 += alelosInd1[i, 0] + ",";
        posGametasInd1 *= 1;
    }
    else
    {
        aPossiveisInd1 += alelosInd1[i, 0] + alelosInd1[i, 1] + ",";
        posGametasInd1 *= 2;
    }
    //Indivíduo 2
    if (alelosInd2[i, 0] == alelosInd2[i, 1])
    {
        aPossiveisInd2 += alelosInd2[i, 0] + ",";
        posGametasInd2 *= 1;
    }
    else
    {
        aPossiveisInd2 += alelosInd2[i, 0] + alelosInd2[i, 1] + ",";
        posGametasInd2 *= 2;
    }
}
aPossiveisInd1 = aPossiveisInd1.substr(0, aPossiveisInd1.length-1);
aPossiveisInd2 = aPossiveisInd2.substr(0, aPossiveisInd2.length-1);

//Gera os genótipos possíveis e cria um array pra ele
let posGenotipos = posGametasInd1 * posGametasInd2;
let genotipos = new Array(posGenotipos);

//Gera os gametas
//Indivíduo 1
let gametasInd1 = new Array(posGametasInd1);
let qtVezes = posGametasInd1;
let qtPar = 1;
let cont = 0;

for (var i = 0; i < aPossiveisInd1.length; i++){
    if (aPossiveisInd1.substr(i, 1) != ","){
        if (aPossiveisInd1.substr(i+1, 1) != ","){
            //Dois alelos possíveis
            qtVezes /= 2;
            for (var h = 0; h < qtPar; h++){
                for (var p = 0; p < qtVezes; p++){
                    gametasInd1[cont] += aPossiveisInd1.substr(i, 1);
                    gametasInd1[cont+qtVezes] += aPossiveisInd1.substr(i+1, 1);
                    if (qtVezes > 1){cont++;} else {cont+=2;}
                }        
            }
            cont = 0;
            i++;
            qtPar*=2;
        }
        else{
            //Um alelo possível
            for (var p = 0; p < posGametasInd1; p++){
                    gametasInd1[p] += aPossiveisInd1.substr(i, 1);
            }
        }
    }
}

//Indivíduo 2
let gametasInd2 = new Array(posGametasInd2);
qtVezes = posGametasInd2;
qtPar = 1;
cont = 0;

for (var i = 0; i < aPossiveisInd2.length; i++){
    if (aPossiveisInd2.substr(i, 1) != ","){
        if (aPossiveisInd2.substr(i+1, 1) != ","){
            //Dois alelos possíveis
            qtVezes /= 2;
            for (var h = 0; h < qtPar; h++){
                for (var p = 0; p < qtVezes; p++){
                    gametasInd2[cont] += aPossiveisInd2.substr(i, 1);
                    gametasInd2[cont+qtVezes] += aPossiveisInd2.substr(i+1, 1);
                    if (qtVezes > 1){cont++;} else {cont+=2;}
                }        
            }
            cont = 0;
            i++;
            qtPar*=2;
        }
        else{
            //Um alelo possível
            for (var p = 0; p < posGametasInd2; p++){
                    gametasInd2[p] += aPossiveisInd2.substr(i, 1);
            }
        }
    }
}


