
var imagens = {
    setaEsquerda: '<svg class="seta-esquerda" stroke="#06AA48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"></path></svg>',

    setaDireita: '<svg class="seta-direita" stroke="#06AA48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"></path></svg>',

    placarVersus: '<svg viewBox="0 0 100 100" id="scoreboard-vs-icon" width="100%" height="100%"><line x1="-3" x2="100" y1="1" y2="100" stroke="#555" stroke-width="5"></line><line x1="-3" x2="100" y1="100" y2="1" stroke="#555" stroke-width="5"></line></svg>',

    setaEsquerdaDesativada: '<svg class="seta-esquerda" stroke="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"></path></svg>',

    setaDireitaDesativada: '<svg class="seta-direita" stroke="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"></path></svg>',
};


function criaBotoesNavegacaoRodada(objetoRodada, direcional) {
   
    var button= document.createElement("button");
    var classeDirecaoBotao = direcional == "previous" ? "buttonEsquerdo" : "buttonDireito";
    button.setAttribute("class", classeDirecaoBotao);

    
    var seta = document.createElement("span");
    var classeDirecaoSeta = direcional == "previous" ? "span--seta-esquerda" : "span--seta-direita";
    seta.setAttribute("class", classeDirecaoSeta);
    seta.innerHTML = direcional == "previous" ? imagens.setaEsquerda : imagens.setaDireita;
    button.appendChild(seta);

    
    if (objetoRodada != null) {
        direcional == "previous" ? button.setAttribute("onclick", `ajaxJogos(${objetoRodada.rodada})`) : button.setAttribute("onclick", `ajaxJogos(${objetoRodada.rodada})`);
    }else {
        
        button.disabled = true;
        var setaURL = direcional == "previous" ? imagens.setaEsquerdaDesativada : imagens.setaDireitaDesativada;
        seta.innerHTML = setaURL;
    }

    return button;
}

controleJogos = false;


function criarJogos(response) {
    
    diaSemana = new Array ("DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"); 

    
    var container = document.getElementById("containerSuperior");

    
    if (controleJogos){
        var sectionJogosRemove = document.getElementById("sectionJogos")
        container.removeChild(sectionJogosRemove);
        controleJogos = false;
    }
      
        var sectionJogos = document.createElement("section");
        controleJogos = true;
        sectionJogos.setAttribute("class", "sectionJogos");
        sectionJogos.setAttribute("id", "sectionJogos");

           
            var header = document.createElement("header");
              
                var titulo = document.createElement("h2");
                titulo.innerText = "JOGOS";
                titulo.setAttribute("class", "titulo-jogos");
                header.appendChild(titulo);

           
            sectionJogos.appendChild(header);

           
            var nav = document.createElement("nav");
            nav.setAttribute("class", "nav-jogos");
                
                
                var buttonEsquerdo = criaBotoesNavegacaoRodada(response.rodada_anterior, "previous");
                nav.appendChild(buttonEsquerdo);

                
                var rodada = document.createElement("span");
                rodada.innerText = response.nome;
                rodada.setAttribute("class", "titulo-rodada");
                nav.appendChild(rodada);

                
                var buttonDireito = criaBotoesNavegacaoRodada(response.proxima_rodada, "next");
                nav.appendChild(buttonDireito);

            
            sectionJogos.appendChild(nav);

           
            for (var i = 0; i < response.partidas.length; i++) {
               
                response.partidas[i].estadio == null ? response.partidas[i].estadio = {nome_popular: ""} : "";

                
                var jogo = document.createElement("div");
                jogo.setAttribute("class", "jogo");

                   
                    var informacoes = document.createElement("div");
                    informacoes.setAttribute("class", "jogo-informacoes");

                        
                        var spanDiaSemana = document.createElement("span");
                        var dataAPI = new Date(response.partidas[i].data_realizacao_iso);
                        spanDiaSemana.innerText = diaSemana[dataAPI.getDay()];
                        spanDiaSemana.setAttribute("class", "jogo-informacoes--dia");
                        informacoes.appendChild(spanDiaSemana);

                        
                        var data = document.createElement("span");
                        data.innerText = response.partidas[i].data_realizacao;
                        data.setAttribute("class", "jogo-informacoes--data");
                        informacoes.appendChild(data);

                        
                        var estadio = document.createElement("span");
                        estadio.innerText = response.partidas[i].estadio.nome_popular;
                        estadio.setAttribute("class", "jogo-informacoes--estadio");
                        informacoes.appendChild(estadio);

                        
                        var hora = document.createElement("span");
                        hora.innerText = response.partidas[i].hora_realizacao;
                        hora.setAttribute("class", "jogo-informacoes--hora");
                        informacoes.appendChild(hora); 

                    
                    jogo.appendChild(informacoes);

                   
                    var placar = document.createElement("div");
                    placar.setAttribute("class", "jogo-placar");

                       
                        var equipeMandante = document.createElement("div");
                        equipeMandante.setAttribute("class", "jogo-placar--equipe");
                        equipeMandante.classList.add("jogo-placar--equipe-mandante");

                            var siglaMandante = document.createElement("span");
                            siglaMandante.innerText = response.partidas[i].time_mandante.sigla;
                            equipeMandante.appendChild(siglaMandante);

                          
                            var logoMandante = document.createElement("img");
                            logoMandante.src = response.partidas[i].time_mandante.escudo;
                            logoMandante.setAttribute("class", "jogo-escudo");
                            logoMandante.classList.add("jogo-escudo--mandante");
                            equipeMandante.appendChild(logoMandante);

                     
                        placar.appendChild(equipeMandante);

                      
                        var placarBox = document.createElement("div");
                        placarBox.setAttribute("class", "placar-box");

                            
                            var golsMandante = document.createElement("span");
                            golsMandante.innerText = response.partidas[i].placar_mandante;
                            golsMandante.setAttribute("class", "placar-box--valor");
                            placarBox.appendChild(golsMandante);

                           
                            var placarBoxVersus = document.createElement("span");
                            placarBoxVersus.setAttribute("class", "placar-box--versus");
                            placarBoxVersus.innerHTML = imagens.placarVersus;
                            placarBox.appendChild(placarBoxVersus);

                           
                            var golsVisitante = document.createElement("span");
                            golsVisitante.innerText = response.partidas[i].placar_visitante;
                            golsVisitante.setAttribute("class", "placar-box--valor");
                            placarBox.appendChild(golsVisitante);

                       
                        placar.appendChild(placarBox);

                        
                        var equipeVisitante = document.createElement("div");
                        equipeVisitante.setAttribute("class", "jogo-placar--equipe");
                        equipeVisitante.classList.add("jogo-placar--equipe-visitante");

                          
                            var logoVisitante = document.createElement("img");
                            logoVisitante.src = response.partidas[i].time_visitante.escudo;
                            logoVisitante.setAttribute("class", "jogo-escudo");
                            logoVisitante.classList.add("jogo-escudo--visitante");
                            equipeVisitante.appendChild(logoVisitante);

                            
                            var siglaVisitante = document.createElement("span");
                            siglaVisitante.innerText = response.partidas[i].time_visitante.sigla;
                            equipeVisitante.appendChild(siglaVisitante);
                        
                        
                        placar.appendChild(equipeVisitante);
                  
                    jogo.appendChild(placar);

                   
                    var transmissao = document.createElement("div");
                    transmissao.innerText = "VEJA COMO FOI";
                    transmissao.setAttribute("class", "jogo-transmissao");
                    jogo.appendChild(transmissao);

              
                sectionJogos.appendChild(jogo);
            }
       
        container.appendChild(sectionJogos);
}