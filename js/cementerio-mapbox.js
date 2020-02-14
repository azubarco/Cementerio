function init(){
    //Añadismos el token y estilo creado en Mapbox
    mapboxgl.accessToken="pk.eyJ1IjoiYXp1YmFyY28iLCJhIjoiY2s0OHRtbDNsMGI5YTNrcHJueWV3N20zdCJ9.qpTrQEyiBNskROz38Ggc3Q";
    
    var map=new mapboxgl.Map({
        container:"map-cementerio",
        style:"mapbox://styles/azubarco/ck6fsmxoy03d51ip6g6zekhj4",
        center:[2.837095,41.972489],
        zoom:17,
        attributionControl:false
    });

    //Agregamos algunos controles al mapa
    map.addControl(new mapboxgl.AttributionControl({compact: true}));
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.GeolocateControl({positionOptions:{enableHighAccuracy: true},trackUserLocation: true }));

    //Agregamos el tileset cargado previamente en Mapbox
    map.on('load',function(){

        map.addSource("Cementerio_girona",{
            type:"vector",
            url:"mapbox://azubarco.aqz14215"//Tileset ID del Geojson cargado
        });

        map.addLayer({
            id:"Cementerio_girona",
            type:"circle",
            source:"Cementerio_girona",
            'source-layer': "Sepulturas-5qj39g",//nombre del Tileset creado
            paint:{//para diferenciar el tipo de Sepultura hago un match al campo que contiene el tipo y le asigno un color
                   'circle-color': [
                                'match',
                                ['get', 'TIPUSCONST'],
                                'A',
                                '#ff9922',
                                'C',
                                '#13cd00',
                                'H',
                                '#d300ff',
                                'N',
                                '#0007d4',
                                'P',
                                '#38f7ff',
                                'T',
                                '#ffff12',
                                '#ccc' //otro
                                ],
                'circle-radius':6
            }
            
        });
    });

    //Creo una variable para alojar la información HTML a ingresar en el div "map-overlay"
    var overlay = document.getElementById("map-overlay"); 

    //Evento mousemove para poder visualizar la información de la sepultura
    map.on('mousemove','Cementerio_girona',function(e){
            map.getCanvas().style.cursor='pointer';

            var feature = e.features[0];

            //filtra la información
            var relatedFeatures=map.querySourceFeatures('Cementerio_girona',{
                sourceLayer:'Sepulturas-5qj39g',
                filter:['in','FID',feature.properties.FID]
            });

            //Agrego la información ade datos
            overlay.innerHTML=" ";

            var title=document.createElement('strong');
            title.textContent='LOCALITZAD: '+feature.properties.LOCALITZAD 

            var content_NOMDPT=document.createElement('div');
            content_NOMDPT.textContent='NOMDPT: '+ feature.properties.NOMDPT;
            var content_TIPUSCONST=document.createElement('div');
            content_TIPUSCONST.textContent=' TIPUSCONST: '+ feature.properties.TIPUSCONST;
            var content_NUMFILA1=document.createElement('div');
            content_NUMFILA1.textContent=' NUMFILA1: '+ feature.properties.NUMFILA1;
            var content_ANY_CONST=document.createElement('div');
            content_ANY_CONST.textContent=' ANY_CONST: '+ feature.properties.ANY_CONST;
            
            overlay.appendChild(title);
            overlay.appendChild(content_NOMDPT);
            overlay.appendChild(content_TIPUSCONST);
            overlay.appendChild(content_NUMFILA1);
            overlay.appendChild(content_ANY_CONST);
            overlay.style.display='block';
    
    });

    //Agregamos el popup en el evento click 
    map.on('click','Cementerio_girona',function(e){
        var text=" ";//Aqui almaceno la información del popup
        var tipo;
        for (key in e.features[0].properties){
            if (key=='LOCALITZAD' || key=='NOMDPT' || key=='ANY_CONST'){
                text+="<b>"+key+"</b>:"+e.features[0].properties[key]+"<br>";
            }else if(key=='NUMFILA1' || key=='NUMFILA2' || key=='NUMFILA3' || key=='NUMFILA4' || key=='NUMFILA5' || key=='NUMFILA6'){
                if (e.features[0].properties[key]!=" "){ //en caso no haya datos no muestra el campo
                    text+="<b>"+key+"</b>:"+e.features[0].properties[key]+"<br>";
                }
            }else if (key=='TIPUSCONST'){//para la descripción del tipo de sepultura.
                switch(e.features[0].properties[key]){
                    case "A": tipo="Altar";break;
                    case "C":tipo="Columbario";break;
                    case "H":tipo="Hipogeo";break;
                    case "N":tipo="Nicho";break;
                    case "P":tipo="Panteón";break;
                    case "T":tipo="Tumba";break; 
                    default: tipo="Sin descripción";
                };
                text+="<b>"+key+"</b>:"+tipo+"<br>";
            }
        }
        new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(text).addTo(map);
       
    });

    map.on('mouseenter','Cementerio_girona',function(){
        map.getCanvas().style.cursor='pointer';
      
    });
 
    map.on('mouseleave','Cementerio_girona',function(){
        map.getCanvas().style.cursor='';
        overlay.style.display='none';
    });
}