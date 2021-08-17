$(function(){

    $(".btnGerar").click(function(){

        $("#areaTabela").html("");

        //Pega os valores
        var ind1 = $('.txtInd1').val();
        var ind2 = $('.txtInd2').val();

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
        var par1 = true;
        var par2 = true;
        for (var i = 0; i < ind1.length; i++)
        {
            if (par1) { par1 = false; } else { par1 = true; }
        }
        for (var p = 0; p < ind2.length; p++)
        {
            if (par2) { par2 = false; } else { par2 = true; }
        }
        if (!par1 | !par2){ alert("Você colocou um número impar de alelos!"); return; }

        //Separa os Alelos
        console.log("===================================================");
        var alelosInd1 = new Array(ind1.length);
        var alelosInd2 = new Array(ind2.length);

        for (var i = 0; i < ind1.length; i++) {
            alelosInd1[i] = ind1.substr(i,1);
            alelosInd2[i] = ind2.substr(i,1);
        }

        //Separa os alelos possiveis
        var alelosPInd1 = "";
        var alelosPInd2 = "";
        for (var i = 0; i < alelosInd1.length; i++)
        {
            //Indivíduo 1
            if (alelosInd1[i] == alelosInd1[i+1])
            {
                alelosPInd1 += alelosInd1[i] + ",";
            }
            else
            {
                alelosPInd1 += alelosInd1[i];
                alelosPInd1 += alelosInd1[i+1] + ",";
            }
            //Indivíduo 2
            if (alelosInd2[i] == alelosInd2[i+1])
            {
                alelosPInd2 += alelosInd2[i] + ",";
            }
            else
            {
                alelosPInd2 += alelosInd2[i];
                alelosPInd2 += alelosInd2[i+1] + ",";
            }
            i++;
        }
        alelosPInd1 = alelosPInd1.substr(0, alelosPInd1.length-1);
        alelosPInd2 = alelosPInd2.substr(0, alelosPInd2.length-1);
        console.log("Alelos Possíveis do indivíduo 1: " + alelosPInd1);
        console.log("Alelos Possíveis do indivíduo 2: " + alelosPInd2);

        //Gera os gametas
        //Individio 1 =================================================================================
        var gametasInd1 = "";
        if (ind1.length > 2)
        {
            for (var i = 0; i < 2; i++)
            {
                if (alelosPInd1.substr(i,1) != ",")
                {
                    for (var p = 2; p < alelosPInd1.length; p++)
                    {
                        if (alelosPInd1.substr(p,1) != ",")
                        {
                            gametasInd1 += alelosPInd1.substr(i,1) + alelosPInd1.substr(p,1) + ",";
                        }
                    }
                }
            }
        }
        else
        {
            if (alelosPInd1.substr(0,1) == alelosPInd1.substr(1,1))
            {
                gametasInd1 = alelosPInd1.substr(0,1) + ",";
            }
            else
            {
                gametasInd1 = alelosPInd1.substr(0,1) + "," + alelosPInd1.substr(1,1) + ",";
            }
        }
        gametasInd1 = gametasInd1.substr(0, gametasInd1.length - 1);
        console.log("Gametas Possíveis do Individuo 1: " + gametasInd1);
        //Individio 2 =================================================================================
        var gametasInd2 = "";
        if (ind2.length > 2)
        {
            for (var i = 0; i < 2; i++)
            {
                if (alelosPInd2.substr(i,1) != ",")
                {
                    for (var p = 2; p < alelosPInd2.length; p++)
                    {
                        if (alelosPInd2.substr(p,1) != ",")
                        {
                            gametasInd2 += alelosPInd2.substr(i,1) + alelosPInd2.substr(p,1) + ",";
                        }
                    }
                }
            }
        }
        else
        {
            if (alelosPInd2.substr(0,1) == alelosPInd2.substr(1,1))
            {
                gametasInd2 = alelosPInd2.substr(0,1) + ",";
            }
            else
            {
                gametasInd2 = alelosPInd2.substr(0,1) + "," + alelosPInd2.substr(1,1) + ",";
            }
        }
        gametasInd2 = gametasInd2.substr(0, gametasInd2.length - 1);
        console.log("Gametas Possíveis do Individuo 1: " + gametasInd2);

        //Monta a tabela ===============================================================================
        //Primeira linha (Individuo 1)
        var conteudo = "";
        conteudo += "<table id='tabelona'><tr><th>/</th>";
        for (var i = 0; i < gametasInd1.length; i++)
        {
            if (gametasInd1.substr(i,1) != ",")
            {
                conteudo += "<th>" + gametasInd1.substr(i,1);
                if (gametasInd1.substr(i+1,1) != ",") 
                {
                    conteudo += gametasInd1.substr(i+1,1);    
                }
                conteudo += "</th>";
                i++;
            }
        }
        conteudo += "</tr>";
        //Segunda linha (Individuo 2)
        for (var i = 0; i < gametasInd2.length; i++)
        {
            if (gametasInd2.substr(i,1) != ",")
            {
                conteudo += "<tr><th>" + gametasInd2.substr(i,1);
                if (gametasInd2.substr(i+1,1) != ",") 
                {
                    conteudo += gametasInd2.substr(i+1,1);
                }
                conteudo += "</th></tr>";
                i++;
            }
        }
        conteudo += "</table>";
        $("#areaTabela").html(conteudo);

    });

})