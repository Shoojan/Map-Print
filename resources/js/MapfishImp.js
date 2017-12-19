
  /**
   * [Initializing the default boundary box of the map]
   * @type {Array}
   */
  var box_cordinates = [81.05791015625,25.10185546875,87.25419921875,31.29814453125];
 
  /*
   * Click Event for Draw Box Selection in Map Layer
   */
  $('#select_box').change(function() {
    if ($(this).is(':checked')) {
      $('#custom_box').prop('checked', false).change();
      map.removeLayer(drag_polygon);
      addInteraction();
    }
    else{
      map.removeInteraction(draw);
      source.clear();
      $('#map_title').val("");
      $('#map_comment').val("");
    }
  });

  /*
   * Click Event for Custom Box Selection in Map Layer
   */
  $('#custom_box').change(function() {
    if ($(this).is(':checked')) {
      map.removeInteraction(draw);
      source.clear();
      $('#select_box').prop('checked', false).change();
      map.addLayer(drag_polygon);
    }
    else{
      map.removeLayer(drag_polygon);
      $('#map_title').val("");
      $('#map_comment').val("");
    }
  });


    // $('.print_div').hide("slide");
    // $('.print_div').show("slide");

  // -------------------------------------------------------------------------------

  /**
   * [Sorting the Boundary Box Cordinates when drawn from any direction as, Bbox = [minX,minY,maxX,maxY] ]
   * @param {[type]} start []
   * @param {[type]} end []
   */
  function Sort(start,end){
      if(start[0]<end[0] && start[1]<end[1])
      {
        box_cordinates = [start[0],start[1],end[0],end[1]];
      }
      else if(start[0]>end[0] && start[1]>end[1])
      {
        box_cordinates = [end[0],end[1],start[0],start[1]];
      }
      else if(start[0]<end[0] && start[1]>end[1])
      {
        box_cordinates = [start[0],end[1],end[0],start[1]];
      }
      else if(start[0]>end[0] && start[1]<end[1])
      {
        box_cordinates = [end[0],start[1],start[0],end[1]];
      }

      //Displaying the selected map in secondary map considering it as an image.
      map2.getView().fit(box_cordinates);
      console.log("Extent : "+box_cordinates);
  }

  /*
   * Using GET Method for print.pdf HTTP Command | GeoServer Priting Plugin
   * Syntax: GET {PRINT_URL}/print.pdf?spec={SPEC}
  */
  $("#export").click(function(){
    var size = $('#size').val();
    var title = $('#map_title').val();
    var dpi = $("#dpi").val();
    var outname = title + "map";

    /* declare an checkbox array */
    var chkArray = [];
    
    /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
    $(".chk:checked").each(function() {
      chkArray.push($(this).val());
    });
    
    /* we join the array separated by the comma */
    var layers;
    layers = chkArray.join(',') ;
    
    /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
    if(layers.length < 1){
      alert(" No Layers Selected ");
      layers = null; 
    }

    /*
     * Defining a JSON object as per the requirement to use Geoserver Plugin
     */
    var spec = {
      "layout":size,
      "srs":"EPSG:900913",
      "units":"m",
      "dpi":dpi,
      "mapTitle":title,
      "outputFilename":outname,
      "geodetic": true,
      "layers":[
        {
          "baseURL":"http://c.tile.openstreetmap.org",
          "singleTile":false,
          "type":"OSM",
          "maxExtent":[-20037508.3392,-20037508.3392,20037508.3392,20037508.3392],
          "tileSize":[256,256],
          "extension":"png",
          "resolutions":[156543.03390625,78271.516953125,39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245256282, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717,0.41999977320012255, 0.2799998488000817,0.13999992440004086, 0.08399995464002451, 0.05599996976001634, 0.02799998488000817]
        },
        // {
        //   "baseURL":"http://vmap0.tiles.osgeo.org/wms/vmap0",
        //   "opacity":1,
        //   "singleTile":false,
        //   "customParams":{},
        //   "type":"WMS",
        //   "layers":["basic"],
        //   "format":"image/png",
        //   "styles":[],
        //   "overview":true
        // },
        {
          "baseURL":"http://localhost:9090/geoserver/BernHardt_Practical/wms",
          "opacity":1.0,
          "singleTile":false,
          "type":"WMS",
          "layers":[layers],
          "format":"image/png"
        }
      ],
      "pages":[
        { 
          // Can use either "bbox" or "center & scale"
          "bbox":box_cordinates,
          // "center":[84.2,28.2],
          // "scale":4000000,
          "rotation":0
        }
      ]
    };

    var url = 'http://localhost:9090/geoserver/pdf/print.pdf?spec=';
    var printUrl = url + encodeURI(JSON.stringify(spec));
    window.location = printUrl;
  });


  // ---------------------- NOT WORKING ----------------------
  /*
   * Using POST Method for print.pdf HTTP Command | GeoServer Priting Plugin
   * Syntax: POST {PRINT_URL}/print.pdf with {SPEC} in the request body
  */
  $("#export-pdf").click(function(){
         var json = (JSON.stringify(spec));

         $.post('http://localhost:9090/geoserver/pdf/print.pdf', { spec: json}, 
         function(returnedData){
              alert("Passed");
         }).fail(function(){
              alert("Failed");
         });
     });
  // ---------------------------------------------------------------------------------


  /*
   * Change the layers on the basis of checkbox selected
   */
  var changeLayer = function changeLayer() {
    var val = $(this).val();
    var checked =$(this).is(':checked');

    map.getLayers().forEach(function (layer) {
      if(layer.get('label')== val) {
        layer.setVisible(checked);
      }
    });
  };

  $('input').each(function () {
    $(this).on('change', changeLayer);
  });
  // ----------------------------------------------------------------------------


 
