

function criarTabela(resposta) {
   
    existeTabela = true;
  
    loaderTabela();

    
    const cabecalhoArray = ["CLASSIFICAÇÃO", "P", "J", "V", "E", "D", "GP", "GC", "SG", "%", "ÚLT.JOGOS"];

    
    var container = document.getElementById("containerSuperior");

        
        var sectionTable = document.createElement("section");
        sectionTable.setAttribute("class", "sectionTable");

            
            var tableTitulo = document.createElement("h2");
            tableTitulo.innerText = "TABELA";
            tableTitulo.setAttribute("class", "tituloTable");
            sectionTable.appendChild(tableTitulo);

          
            var table = document.createElement("table");

             
                var thead = document.createElement("thead");
                    
                   
                    var cabecalho = document.createElement("tr");
                    cabecalho.setAttribute("class", "cabecalho");

                        
                        for (var i = 0; i < cabecalhoArray.length; i++) {
                            if (i == 0) {
                                var th = document.createElement("th");
                                th.innerText = cabecalhoArray[i];
                                th.setAttribute("colspan", "3");
                                th.setAttribute("class", "classificacao");
                                cabecalho.appendChild(th);
                            }else {
                                var th = document.createElement("th");
                                th.innerText = cabecalhoArray[i];
                                cabecalho.appendChild(th);
                            }
                        }
                    
                    thead.appendChild(cabecalho);
             
                table.appendChild(thead);
                
                
                var tbody = document.createElement("tbody");
                    
                  
                    for (var i = 0; i < resposta.length; i++) {
                        var tr = document.createElement("tr");
                       
                            for (var j = 0; j < cabecalhoArray.length + 2; j++) {
                                var td = document.createElement("td");
                                
                                if (j == 0) {
                                    td.innerText = resposta[i].posicao;
                                }else if (j == 1) {
                                    var icone = document.createElement("img");
                                    icone.src = resposta[i].time.escudo;
                                    icone.setAttribute("class", "icone");
                                    td.appendChild(icone);
                                }else if (j == 2) {
                                    td.innerText = resposta[i].time.nome_popular;
                                }else if (j == 3) {
                                    td.innerText = resposta[i].pontos;
                                }else if (j == 4) {
                                    td.innerText = resposta[i].jogos;
                                }else if (j == 5) {
                                    td.innerText = resposta[i].vitorias;
                                }else if (j == 6) {
                                    td.innerText = resposta[i].empates;
                                }else if (j == 7) {
                                    td.innerText = resposta[i].derrotas;
                                }else if (j == 8) {
                                    td.innerText = resposta[i].gols_pro;
                                }else if (j == 9) {
                                    td.innerText = resposta[i].gols_contra;
                                }else if (j == 10) {
                                    td.innerText = resposta[i].saldo_gols;
                                }else if (j == 11) {
                                    td.innerText = resposta[i].aproveitamento;
                                }else {
                                  
                                    for (var k = 0; k < 5; k++) {
                                        var bolinha = document.createElement("span");
                                        bolinha.setAttribute("class", "ultimos-jogos");
                                        if (resposta[i].ultimos_jogos[k] == "v") {
                                            bolinha.classList.add("vitoria");
                                        }else if (resposta[i].ultimos_jogos[k] == "d") {
                                            bolinha.classList.add("derrota");
                                        }else {
                                            bolinha.classList.add("empate");
                                        }
                                        // coloca as bolinhas dentro da td
                                        td.appendChild(bolinha);
                                    }
                                } 
                             
                                tr.appendChild(td);
                            }
                       
                        tbody.appendChild(tr);
                    }
           
                table.appendChild(tbody);
        
            sectionTable.appendChild(table);
     
        container.appendChild(sectionTable);
}