$(function(){

    $(".btnGerar").click(function(){

        $("#areaTabela").html("");

        //Pega os valores
        let ind1 = $('.txtInd1').val();
        let ind2 = $('.txtInd2').val();

        ind1 = ind1.trim();
        ind2 = ind2.trim();

        $('.txtInd1').val("");
        $('.txtInd2').val("");

        //Validação de existênica
        if (ind1 == "" | ind2 == "")
        {
            alert("Siga os caminhos exatos!");
            return;
        }
        if (ind1.length != ind2.length)
        {
            alert("Coloque a mesma quantidade de Alelos para os dois indivíduos!");
            return;
        }

        //Ve se o número é par
        let par1 = true;
        let par2 = true;
        for (let i = 0; i < ind1.length; i++)
        {
            par1 = !par1;
        }
        for (let p = 0; p < ind2.length; p++)
        {
            par2 = !par2;
        }
        if (!par1 | !par2){ alert("Você colocou um número impar de alelos!"); return; }

        //Coloca os genótipos nos H
        $('#hind1').html(ind1);
        $('#hind2').html(ind2);
        $('.caixaInfo').show();

        //=============================================================================================
        //Cria os dois Arrays
        //Indivíduo 1
        let alelosInd1 = new Array(ind1.length/2);
        for (let i = 0; i < alelosInd1.length; i++) {
            alelosInd1[i] = new Array(2);
        }
        //Indivíduo2
        let alelosInd2 = new Array(ind2.length/2);
        for (let i = 0; i < alelosInd2.length; i++) {
            alelosInd2[i] = new Array(2);
        }
        //Separa os alelos e seus pares em um array
        let cont = 0;
        for (let i = 0; i < ind1.length/2; i++) {
            for (let p = 0; p < 2; p++){
                //Indivíduo 1
                alelosInd1[i][p] = ind1.substr(cont,1);
                alelosInd2[i][p] = ind2.substr(cont,1);
                cont++;
            }
        }
        //Separa os alelos possiveis do indivíduo
        let aPossiveisInd1 = "";
        let posGametasInd1 = 1;
        let aPossiveisInd2 = "";
        let posGametasInd2 = 1;
        for (let i = 0; i < ind1.length/2; i++)
        {
            //Indivíduo 1
            if (alelosInd1[i][0] == alelosInd1[i][1])
            {
                aPossiveisInd1 += alelosInd1[i][0] + ",";
                posGametasInd1 *= 1;
            }
            else
            {
                aPossiveisInd1 += alelosInd1[i][0] + alelosInd1[i][1] + ",";
                posGametasInd1 *= 2;
            }
            //Indivíduo 2
            if (alelosInd2[i][0] == alelosInd2[i][1])
            {
                aPossiveisInd2 += alelosInd2[i][0] + ",";
                posGametasInd2 *= 1;
            }
            else
            {
                aPossiveisInd2 += alelosInd2[i][0] + alelosInd2[i][1] + ",";
                posGametasInd2 *= 2;
            }
        }
        console.log("===================================================");
        console.log("Alelos Possíveis do indivíduo 1: " + aPossiveisInd1);
        console.log("Alelos Possíveis do indivíduo 2: " + aPossiveisInd2);

        //=============================================================================================

        //Gera os gametas
        //Indivíduo 1
        let gametasInd1 = new Array(posGametasInd1);
        let qtVezes = posGametasInd1;
        let qtPar = 1;
        cont = 0;

        for (let i = 0; i < aPossiveisInd1.length; i++){
            if (aPossiveisInd1.substr(i, 1) != ","){
                if (aPossiveisInd1.substr(i+1, 1) != ","){
                    //Dois alelos possíveis
                    qtVezes /= 2;
                    for (let h = 0; h < qtPar; h++){
                        for (let p = 0; p < qtVezes; p++){
                            if (gametasInd1[cont] == null)
                            {
                                gametasInd1[cont] = aPossiveisInd1.substr(i, 1);
                                gametasInd1[cont+qtVezes] = aPossiveisInd1.substr(i+1, 1);
                            }
                            else
                            {
                                gametasInd1[cont] += aPossiveisInd1.substr(i, 1);
                                gametasInd1[cont+qtVezes] += aPossiveisInd1.substr(i+1, 1);
                            }
                            if (qtVezes > 1){cont++;} else {cont+=2;}
                        }
                        if (qtVezes > 1 && qtVezes < posGametasInd1/2){cont+=qtVezes;}
                    }
                    cont = 0;
                    i++;
                    qtPar*=2;
                }
                else{
                    //Um alelo possível
                    for (let p = 0; p < posGametasInd1; p++){
                        if (gametasInd1[p] == null)
                        {
                            gametasInd1[p] = aPossiveisInd1.substr(i, 1);
                        }
                        else
                        {
                            gametasInd1[p] += aPossiveisInd1.substr(i, 1);
                        }
                    }
                }
            }
        }

        //Indivíduo 2
        let gametasInd2 = new Array(posGametasInd2);
        qtVezes = posGametasInd2;
        qtPar = 1;
        cont = 0;

        for (let i = 0; i < aPossiveisInd2.length; i++){
            if (aPossiveisInd2.substr(i, 1) != ","){
                if (aPossiveisInd2.substr(i+1, 1) != ","){
                    //Dois alelos possíveis
                    qtVezes /= 2;
                    for (let h = 0; h < qtPar; h++){
                        for (let p = 0; p < qtVezes; p++){
                            if (gametasInd2[cont] == null)
                            {
                                gametasInd2[cont] = aPossiveisInd2.substr(i, 1);
                                gametasInd2[cont+qtVezes] = aPossiveisInd2.substr(i+1, 1);
                            }
                            else
                            {
                                gametasInd2[cont] += aPossiveisInd2.substr(i, 1);
                                gametasInd2[cont+qtVezes] += aPossiveisInd2.substr(i+1, 1);
                            }
                            if (qtVezes > 1){cont++;} else {cont+=2;}
                        }
                        if (qtVezes > 1 && qtVezes < posGametasInd2/2){cont+=qtVezes;}
                    }
                    cont = 0;
                    i++;
                    qtPar*=2;
                }
                else{
                    //Um alelo possível
                    for (let p = 0; p < posGametasInd2; p++){
                        if (gametasInd2[p] == null)
                        {
                            gametasInd2[p] = aPossiveisInd2.substr(i, 1);
                        }
                        else
                        {
                            gametasInd2[p] += aPossiveisInd2.substr(i, 1);
                        }
                    }
                }
            }
        }
        console.log("Gametas Possíveis do Individuo 1: " + gametasInd1);
        console.log("Gametas Possíveis do Individuo 1: " + gametasInd2);

        //Gera o número de possibilidades dos genótipos possíveis e cria um array pra ele
        let posGenotipos = posGametasInd1 * posGametasInd2;
        let genotipos = new Array(posGametasInd2);
        for (let i = 0; i < genotipos.length; i++) {
            genotipos[i] = new Array(posGametasInd1);
        }
        //Monta os genótipos
        for(let i = 0; i < genotipos.length; i++){
            for(let p = 0; p < genotipos[i].length; p++){
                for(let l = 0; l < ind1.length/2; l++){
                    if (genotipos[i][p] == null)
                    {
                        if (gametasInd1[p].substr(l,1) == gametasInd1[p].substr(l,1).toUpperCase())
                        {
                            genotipos[i][p] = gametasInd1[p].substr(l,1) + gametasInd2[i].substr(l,1);                                
                        }
                        else
                        {
                            genotipos[i][p] = gametasInd2[i].substr(l,1) + gametasInd1[p].substr(l,1);
                        }
                    }
                    else
                    {
                        if (gametasInd1[p].substr(l,1) == gametasInd1[p].substr(l,1).toUpperCase())
                        {
                            genotipos[i][p] += gametasInd1[p].substr(l,1) + gametasInd2[i].substr(l,1);                                
                        }
                        else
                        {
                            genotipos[i][p] += gametasInd2[i].substr(l,1) + gametasInd1[p].substr(l,1);
                        }
                    }
                }
            }   
        }

        //Monta a tabela ===============================================================================
        //Primeira linha (Individuo 1)
        let conteudo = "";
        cont = 1;
        conteudo += "<table id='tabelona'><tr><th>G2|G1</th>";
        for (let i = 0; i < gametasInd1.length; i++)
        {
                conteudo += "<th>" + gametasInd1[i] + "</th>";
        }
        conteudo += "</tr>";
        //O resto das linhas (Individuo 2) + genótipos
        for (let i = 0; i < gametasInd2.length; i++)
        {
                conteudo += "<tr><th>" + gametasInd2[i] + "</th>";

                //Monta os genótipos
                for(let p = 0; p < gametasInd1.length; p++){
                        conteudo += "<td id='gen" + cont + "'>" + genotipos[i][p] + "</td>";
                        cont++;
                }            

                conteudo += "</tr>";
        }
        conteudo += "</table>";
        $("#areaTabela").html(conteudo);
        //$("#gen7").css('background-color', 'white');

    });

})