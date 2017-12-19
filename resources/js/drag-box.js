/**
* Define a namespace for the application.
*/
var app = {};

/**
* Definining point coordinates
*/
var a,b,c,d = [];
var bcentre = [9373101.124793636,3274212.694353734];


/**
* @constructor
* @extends {ol.interaction.Pointer}
*/
app.Drag = function() {

    ol.interaction.Pointer.call(this, {
        handleDownEvent: app.Drag.prototype.handleDownEvent,
        handleDragEvent: app.Drag.prototype.handleDragEvent,
        handleMoveEvent: app.Drag.prototype.handleMoveEvent,
        handleUpEvent: app.Drag.prototype.handleUpEvent
    });

/**
* @type {ol.Pixel}
* @private
*/
this.coordinate_ = null;

/**
* @type {string|undefined}
* @private
*/
this.cursor_ = 'pointer';

/**
* @type {ol.Feature}
* @private
*/
this.feature_ = null;

/**
* @type {string|undefined}
* @private
*/
this.previousCursor_ = undefined;

};
ol.inherits(app.Drag, ol.interaction.Pointer);


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `true` to start the drag sequence.
*/
app.Drag.prototype.handleDownEvent = function(evt) {
    var map = evt.map;
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
            return feature;
        });
    if (feature) {
        this.coordinate_ = evt.coordinate;
        this.feature_ = feature;
    }
    return !!feature;
};


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
*/
app.Drag.prototype.handleDragEvent = function(evt) {
    var deltaX = evt.coordinate[0] - this.coordinate_[0];
    var deltaY = evt.coordinate[1] - this.coordinate_[1];

    var geometry = this.feature_.getGeometry();
    geometry.translate(deltaX, deltaY);

    this.coordinate_[0] = evt.coordinate[0];
    this.coordinate_[1] = evt.coordinate[1];
    Sort(d,b);
};


/**
* @param {ol.MapBrowserEvent} evt Event.
*/
app.Drag.prototype.handleMoveEvent = function(evt) {
    if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
                return feature;
            });
        var element = evt.map.getTargetElement();
        if (feature) {
            if (element.style.cursor != this.cursor_) {
                this.previousCursor_ = element.style.cursor;
                element.style.cursor = this.cursor_;
            }
        // cent=[evt.coordinate[0],evt.coordinate[1]];
        // console.log(cent);

        } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
        }

    }
};


/**
* @return {boolean} `false` to stop the drag sequence.
*/
app.Drag.prototype.handleUpEvent = function(evt) {
    this.coordinate_ = null;
    this.feature_ = null;
    return false;
};


var circle_feature = new ol.Feature({
geometry: new ol.geom.Point(bcentre),
speed: 232
});

var style = function(circle_feature, resolution) {
var length = circle_feature.get('speed'); // in pixel
var centre = circle_feature.getGeometry().getCoordinates();
a = [
    centre[0] - length * resolution,
    centre[1] + length * resolution
];
b = [
    centre[0] + length * resolution,
    centre[1] + length * resolution
];
c = [
    centre[0] + length * resolution,
    centre[1] - length * resolution
];
d = [
    centre[0] - length * resolution,
    centre[1] - length * resolution
];
var line = new ol.geom.LineString([
    a,b,c,d,a
]);

var poly = new ol.geom.Polygon([[
    a,b,c,d,a
]]);

return [
  new ol.style.Style({
    geometry: poly,
    stroke: new ol.style.Stroke({
        width: 3,
        color: [0, 0, 0, 0.8]
    }),
    fill: new ol.style.Fill({
        color: [242, 239, 233, 0.2]
    })
  })
];
};

var vectorSource = new ol.source.Vector({
features: [circle_feature]
});

var drag_polygon = new ol.layer.Vector({
source: vectorSource,
style: style
});




