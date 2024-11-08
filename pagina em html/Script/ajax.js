
function ajaxTabela() {
    $.ajax({
    type: "GET",
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
    headers: {'Authorization': `Bearer test_0d2f2199b6c253642030c86933a8bc`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
      
        criarTabela(response);
      
        ajaxRodadas();
    }
    });
}


function ajaxRodadas() {
    $.ajax({
    type: "GET",
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas",
    headers: {'Authorization': `Bearer test_0d2f2199b6c253642030c86933a8bc`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
      
        var rodadaId = verificaRodada(response);
       
        ajaxJogos(rodadaId);
    }
    });
}


function ajaxJogos(rodadaId) {
    $.ajax({
    type: "GET",
    url: `https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/${rodadaId}`,
    headers: {'Authorization': `Bearer test_0d2f2199b6c253642030c86933a8bc`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        
        criarJogos(response);
       
        existeArtilharia == false ? ajaxArtilharia() : "";
    }
    });
}