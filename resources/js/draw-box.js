  var draw; // global so we can remove it later

  /*
   * Function to draw an interation box in the map
   */
  function addInteraction() {
    var geometryFunction;
    var start;
    var end;
    maxPoints = 2;
    /**
     * [A function to generate the geometry by locating the coordinate points.]
     * @param  {[type]} coordinates [Point in terms of longitude and latitude as (long,lat).]
     * @param  {[type]} geometry [point, line or polygon.]
     * @return {[type]} geometry [Returns polygon]
     */
    geometryFunction = function(coordinates, geometry) {
      if (!geometry) {
        geometry = new ol.geom.Polygon(null);
      }
      start = coordinates[0];
      end = coordinates[1];
      geometry.setCoordinates([
        [start, [start[0], end[1]], end, [end[0], start[1]], start]
      ]);
      return geometry;
    };
    draw = new ol.interaction.Draw({
      source: source,
      type: 'LineString',
      geometryFunction: geometryFunction,
      maxPoints: maxPoints
    });
    draw.on('drawstart', function(e){
      source.clear();
    });
    draw.on('drawend',function(e){
      var ext = e.feature.getGeometry().getExtent();
      var oo = ol.extent.getCenter(ext);

      Sort(start,end);
    });
    map.addInteraction(draw);
  }