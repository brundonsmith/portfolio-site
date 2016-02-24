


// functions
var distanceFromCenter = function(position) {
	return Math.sqrt( Math.pow(position.x, 2) + Math.pow(position.y, 2)  )
};
var randomBell = function() {
	return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
}
var generateTriangles = function(parameters) {
	var existingTriangles = [];
	for(var counter = 0; counter < parameters.numTriangles; counter++) {
		// come up with parameters for this triangle
		var position;
		var rotation;
		var color = parameters.colors[Math.floor(Math.random() * parameters.colors.length)];
		while(typeof(position) === 'undefined' || typeof(rotation) === 'undefined' || existingTriangles.indexOf(position.x + 'x' + position.y + rotation) > -1) {
			position = {
				x: Math.round(((randomBell()) * parameters.radius) / parameters.squareSize) * parameters.squareSize,
				y: Math.round(((randomBell()) * parameters.radius) / parameters.squareSize) * parameters.squareSize
			};
			rotation = parameters.rotations[Math.floor(Math.random() * parameters.rotations.length)];
		}
		existingTriangles.push(position.x + 'x' + position.y + rotation);

		// configure element
		var newTriangle = $.parseHTML('<div class="triangle"></div>');
		$(newTriangle).css('border-top', parameters.squareSize/2 + 'px solid ' + color);
		$(newTriangle).css('border-left', parameters.squareSize/2 + 'px solid ' + color);
		$(newTriangle).css('border-bottom', parameters.squareSize/2 + 'px solid transparent');
		$(newTriangle).css('border-right', parameters.squareSize/2 + 'px solid transparent');
		$(newTriangle).addClass(rotation);
		$(newTriangle).css('left', position.x + 'px');
		$(newTriangle).css('top', position.y + 'px');

		(function(element, pos){
			setTimeout(function(){
				$(element).addClass('rotated');
			}, distanceFromCenter(pos) * parameters.speedFactor + (Math.random() - 0.5) * 300);
		}(newTriangle, position));

		$('.triangles-container').append(newTriangle);
	}
}

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
var radius = 500;


if($('#index').length > 0) {

	setTimeout(function(){
		generateTriangles({
			numTriangles: 100,
			squareSize: 30,
			radius: 300,
			speedFactor: 3,
			rotations: [
				'top-left',
				'top-right',
				'bottom-left',
				'bottom-right'
			],
			colors: [
				'rgb(237, 20, 64)',
				'rgb(244, 99, 66)',
				'rgb(249, 160, 67)',
				'rgb(255, 246, 69)'
			]
		});
	}, 1000);
}

if($('#projects').length > 0) {
	setTimeout(function(){
			generateTriangles({
			numTriangles: 120,
			squareSize: 30,
			radius: 500,
			speedFactor: 3,
			rotations: [
				'top-left',
				'top-right',
				'bottom-left',
				'bottom-right'
			],
			colors: [
				'rgb(44, 92, 179)',
				'rgb(47, 96, 181)',
				'rgb(174, 178, 224)',
				'rgb(139, 77, 172)',
				'rgb(161, 210, 242)'
			]
		});
	}, 500);
}

if($('#contact').length > 0) {
	generateTriangles({
		numTriangles: 200,
		squareSize: 30,
		radius: 600,
		speedFactor: 3,
		rotations: [
			'top-left',
			'top-right',
			'bottom-left',
			'bottom-right'
		],
		colors: [
			'rgb(128, 214, 247)',
			'rgb(48, 136, 209)',
			'rgb(81, 200, 245)',
			'rgb(25, 114, 196)'
		]
	});
}




var elements = document.getElementsByClassName('staggered');
for(var i = 0; i < elements.length; i++) {
    if(elements[i].classList.contains('staggered')) {
        elements[i].style.animationDelay = 0.6000 * Math.random() + 's';
    }
}
