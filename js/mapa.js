var map; 
var Layer_map,Layer_esri; //variables para las dos capas de fondo a utilizar
var ControlCapas;
var ControlEscala;

//Con la funcion init vamos a procesar la carga del mapa cuando se inicialize toda la pagina web
function init(){
    
    map= L.map("map-cementerio",{
        center:[41.972489,2.837095],
        zoom:18
    });//L.map->constructor principal de leaflet

    Layer_map=L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
        maxZoom:19,
        minZoom:1,
        attribution: "OSM"    
    });//L.tileLayer es un tipo de capa para añadir al objeto L.map

    Layer_esri=L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{
        maxZoom:19,
        minZoom:1,
        attribution:"Tiles © Esri"
    });

    var baseMaps={
        "Mapa ESRI": Layer_esri,
        "Mapa OSM ": Layer_map
    };

    
    Layer_esri.addTo(map);//Agregamos la capa al mapa

    ControlCapas=L.control.layers(baseMaps,null,{ collapsed: false }); //Control de capas
    ControlCapas.addTo(map);

    ControlEscala=L.control.scale();//Control de escala
    ControlEscala.addTo(map);
}


