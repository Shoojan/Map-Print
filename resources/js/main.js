
var URL = 'http://localhost:9090/geoserver/BernHardt_Practical/wms';
var centerpos = [84.2, 28.2];
var newpos = ol.proj.transform(centerpos, 'EPSG:4326', 'EPSG:900913');
var maxExtent= [80.05844110511946, 26.34796713166333, 88.20152186778043, 30.447429596886728];
// alert(ol.proj.transformExtent([81.046142578125,26.976928710937496,84.5068359375,30.338745117187496], 'EPSG:4326', 'EPSG:900913'));
var mapProjection = new ol.proj.Projection({
  code: 'EPSG:4326',
  units: 'metric',
  axisOrientation: 'neu'
});

var source = new ol.source.Vector({wrapX: false});
var vector = new ol.layer.Vector({
  source: source
});


// var baseLayerBing = new ol.layer.Tile({
// 	source: new ol.source.BingMaps({
// 		key: 'AsQiTsXu5ok3pcDIlJvkAbSlfVL3ACapxyk37f8wDbCfQik96zgWscOLUpSdO9QK',
// 		imagerySet: 'Aerial'
// 	}),
// 	isBaseLayer:false	
// });

var baseLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
  isBaseLayer: true 
});

var Nepal = new ol.layer.Tile({
  visible: true,
  label:'Nepal',
  source: new ol.source.TileWMS({
    url: URL,          
    params: {
      LAYERS: 'BernHardt_Practical:Nepal'
    },
    serverType: 'geoserver'
  }),
  name: 'Nepal Boundary',
  isBaseLayer: false
});

var DevelopmentRegions = new ol.layer.Tile({
  visible: false,
  label:'DevelopmentRegions',
  source: new ol.source.TileWMS({
    url: URL,          
    params: {
      LAYERS: 'BernHardt_Practical:DevelopmentRegions'
    },
    serverType: 'geoserver'
  }),
  name: 'DevelopmentRegions Boundary',
  isBaseLayer: false
});

var PhysiographicRegions = new ol.layer.Tile({
  visible: false,
  label:'PhysiographicRegions',
  source: new ol.source.TileWMS({
    url: URL,          
    params: {
      LAYERS: 'BernHardt_Practical:PhysiographicRegions'
    },
    serverType: 'geoserver'
  }),
  name: 'Districts Boundary',
  isBaseLayer: false
});

var Districts = new ol.layer.Tile({
  visible: false,
  label:'Districts',
  source: new ol.source.TileWMS({
    url: URL,          
    params: {
      LAYERS: 'BernHardt_Practical:Districts',
    },
    serverType: 'geoserver'
  }),
  name: 'Districts Boundary',
  isBaseLayer: false
});

//Offline layers retrieved from Aayush's local sever (connected to same network)
var offlineNepalLand = new ol.layer.Tile({
  visible: true,
  label:'offlineNepalLand',
  source: new ol.source.TileWMS({
    url: 'http://192.168.1.220:9090/geoserver/nepal_map/wms',          
    params: {
      LAYERS: 'nepal_map:nepal_land'
    },
    serverType: 'geoserver'
  }),
  name: 'offlineNepalLand',
  isBaseLayer: false
});

var offlineNepalRoad = new ol.layer.Tile({
  visible: true,
  label:'offlineNepalRoad',
  source: new ol.source.TileWMS({
    url: 'http://192.168.1.220:9090/geoserver/nepal_map/wms',          
    params: {
      LAYERS: 'nepal_map:nepal_roads'
    },
    serverType: 'geoserver'
  }),
  name: 'offlineNepalRoad',
  isBaseLayer: false
});

var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([new app.Drag()]),
  layers: [
       baseLayer, Nepal, Districts, DevelopmentRegions, PhysiographicRegions, vector
    ],
  target: 'map',
  controls: ol.control.defaults().extend([
    new ol.control.ScaleLine({
      units: 'metric'
    }),
    new ol.control.OverviewMap()
  ]),
  view: new ol.View({
    center : newpos,
    zoom: 7
  })
});

var map2 = new ol.Map({
    target: 'map2',
    controls: [],
    layers: [baseLayer,Nepal,Districts,DevelopmentRegions,PhysiographicRegions],
    view: new ol.View({
      center : newpos,
      zoom: 5,
      fractionalZoom: true
    })
});


// google key= AIzaSyCbZ0GpnVai0tv-HKd7gQrtGjWLsXUPVlE;

// console.log(baseLayer.getSource().getProjection().getCode());
// var view = map.getView();
// console.log("View : "+view);
// var coords = view.getCenter();
// console.log("Center : "+coords);
// var resolution = view.getResolution();    
// console.log("resolution : "+resolution);
// var projection = view.getProjection();
// console.log("Projection : "+projection);
// var resolutionAtCoords = projection.getPointResolution(resolution, coords);
// console.log("resolutionAtCoords : "+resolutionAtCoords);

// and bind the view properties so they effectively share a view
// map.bindTo('view', map2);





