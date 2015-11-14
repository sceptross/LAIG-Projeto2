function MyPatch(scene, order, partsU, partsV, controlPoints){

	var controlPointsSurface = [];
	var nArrays = Math.sqrt(controlPoints.length);

	for(var i = 0; i < nArrays; ++i){
		var controlPointsTemp = [];
		for(var j = 0; j < nArrays; ++j){
			controlPointsTemp.push(controlPoints[i*nArrays+j]);
		}
		controlPointsSurface.push(controlPointsTemp);
	}


	var knots = [];

	for(var i = 0; i < (order+1); ++i){
		knots.push(0);
	}

	for(var i = 0; i < (order+1); ++i){
		knots.push(1);
	}

	var nurbsSurface = new CGFnurbsSurface(order, order, knots, knots, controlPointsSurface);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};

    CGFnurbsObject.call(this,scene, getSurfacePoint, partsU, partsV);
}

MyPatch.prototype = Object.create(CGFnurbsObject.prototype);
MyPatch.prototype.constructor = MyPatch	;

MyPatch.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.scale(-1,1,1);
		this.scene.rotate(0,0,1,Math.PI);
		CGFnurbsObject.prototype.display.call(this);
	this.scene.popMatrix();
}

MyPatch.prototype.scaleTexCoords = function(ampS, ampT) {}