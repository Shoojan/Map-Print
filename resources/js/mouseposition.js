$(document).ready(function(){
	map.on('pointermove', function(event){
		var coord3857 = event.coordinate;
		var coord4326 = ol.proj.transform(coord3857,"EPSG:3857","EPSG:4326");
		coord4326 = ol.coordinate.toStringXY(coord4326,4);
		$("#mouseLocation").text(coord4326);
	});
});

