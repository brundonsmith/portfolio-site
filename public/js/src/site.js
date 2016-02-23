// parameters
var numTriangles = 120;
var squareSize = 30;
var rotations = [
	'top-left',
	'top-right',
	'bottom-left',
	'bottom-right'
];
var colorsOrange = [
	'rgb(237, 20, 64)',
	'rgb(244, 99, 66)',
	'rgb(249, 160, 67)',
	'rgb(255, 246, 69)'
];
var colorsPurple = [
	'rgb(44, 92, 179)',
	'rgb(47, 96, 181)',
	'rgb(174, 178, 224)',
	'rgb(139, 77, 172)',
	'rgb(161, 210, 242)'
];
var colorsBlue = [
	'rgb(128, 214, 247)',
	'rgb(48, 136, 209)',
	'rgb(81, 200, 245)',
	'rgb(25, 114, 196)'
];
var colorsAll = [];
colorsAll = colorsAll.concat(colorsOrange);
colorsAll = colorsAll.concat(colorsPurple);
colorsAll = colorsAll.concat(colorsBlue);
var center = {
	x: 0,
	y: 0
};
var radius = 500;

// functions
var distanceFromCenter = function(position) {
	return Math.sqrt( Math.pow(center.x - position.x, 2) + Math.pow(center.y - position.y, 2)  )
};
var randomBell = function() {
	return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
}
var existingTriangles = [];

for(var counter = 0; counter < numTriangles; counter++) {
	// come up with parameters
	var position;
	var rotation;
	var color = colorsOrange[Math.floor(Math.random() * colorsOrange.length)];
	while(typeof(position) === 'undefined' || typeof(rotation) === 'undefined' || existingTriangles.indexOf(position.x + 'x' + position.y + rotation) > -1) {
		position = {
			x: Math.round(((randomBell()) * radius + center.x) / squareSize) * squareSize,
			y: Math.round(((randomBell()) * radius + center.y) / squareSize) * squareSize
		};
		rotation = rotations[Math.floor(Math.random() * rotations.length)];
	}
	existingTriangles.push(position.x + 'x' + position.y + rotation);

	// configure element
	var newTriangle = $.parseHTML('<div class="triangle"></div>');
	$(newTriangle).css('border-top', squareSize/2 + 'px solid ' + color);
	$(newTriangle).css('border-left', squareSize/2 + 'px solid ' + color);
	$(newTriangle).css('border-bottom', squareSize/2 + 'px solid transparent');
	$(newTriangle).css('border-right', squareSize/2 + 'px solid transparent');
	$(newTriangle).addClass(rotation);
	$(newTriangle).css('left', position.x + 'px');
	$(newTriangle).css('top', position.y + 'px');

	(function(element, pos){
		setTimeout(function(){
			$(element).addClass('rotated');
		}, distanceFromCenter(pos) * 3 + (Math.random() - 0.5) * 200);
	}(newTriangle, position));

	$('.triangles-container').append(newTriangle);
}
