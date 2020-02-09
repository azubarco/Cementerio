var layer_Sepulturas;
var urlSepulturas="datos/Sepulturas.json";


function addDatosCementerio(){
    
    layer_Sepulturas= new L.GeoJSON.AJAX(
        urlSepulturas,
        {
            onEachFeature:function(feature,layer){
                var tipo;
                switch(feature.properties.TIPUSCONST){
                    case "A": tipo="Altar";break;
                    case "C":tipo="Columbario";break;
                    case "H":tipo="Hipogeo";break;
                    case "N":tipo="Nicho";break;
                    case "P":tipo="Panteón";break;
                    case "T":tipo="Tumba";break; 
                    default: tipo="Sin descripción";
                };
                popupContent = "<b>ID:" + feature.properties.LOCALITZAD + "</b><br>"+
                               "<b>Departamento: " + feature.properties.NOMDPT + "</b><br>" +
                               "<b>Tipo de Construcción: " + tipo + "</b><br>" + 
                               "<b>Primera fila: " + feature.properties.NUMFILA1 + "</b><br>" +
                               "<b>Año de construcción: " + feature.properties.ANY_CONST + "</b><br>";
                layer.bindPopup(popupContent);
                
            },
            pointToLayer:function(feature,latlng){
                var fcolor;
                switch(feature.properties.TIPUSCONST){
                    case "A":fcolor="#ff9922";break;
                    case "C":fcolor="#13cd00";break;
                    case "H":fcolor="#d300ff";break;
                    case "N":fcolor="#0007d4";break;
                    case "P":fcolor="#38f7ff";break;
                    case "T":fcolor="#ffff12";break; 
                    default: fcolor="#ffffff";
                };
                return L.circleMarker(latlng,{
                    radius:3,
                    fillColor:fcolor,
                    color:fcolor,
                    weight:1,
                    opacity:1,
                    fillOpacity:0.8
                });
            }
        }
    ).addTo(map);
    
    ControlCapas.addOverlay(layer_Sepulturas,"Sepulturas");//Agrego la capa Sepulturas como Overlay al control de capas
    map.setView([41.972489,2.837095],18);
}

