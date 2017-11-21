var view = {

	pageContents: function() {
		var svgDiv = document.createElement('div');
		svgDiv.id = 'svgDiv';
	
		var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
		svg.id = 'gameSVG';
		svg.setAttribute('viewBox','-100 -61.5 200 123');
		svg.addEventListener('mousemove',handlers.dragGo);
		svg.addEventListener('mouseup',handlers.dragEnd);
		svg.addEventListener('mouseleave',handlers.dragEnd);
		
		var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
		svg.appendChild(defs);
		var genericPart = document.createElementNS('http://www.w3.org/2000/svg','rect');
		genericPart.id = 'genericPart';
		genericPart.setAttribute('x',0);
		genericPart.setAttribute('y',0);
		genericPart.setAttribute('width',10);
		genericPart.setAttribute('height',10);
		genericPart.setAttribute('fill','grey');
		genericPart.setAttribute('stroke','black');
		defs.appendChild(genericPart);
		var genericPartWheel = document.createElementNS('http://www.w3.org/2000/svg','g');
		genericPartWheel.id = 'genericPartWheel';
		defs.appendChild(genericPartWheel);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		circle.setAttribute('cx',5);
		circle.setAttribute('cy',5);
		circle.setAttribute('r',3);
		circle.setAttribute('fill','grey');
		circle.setAttribute('stroke','black');
		genericPartWheel.appendChild(circle);
		var lilCircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		lilCircle.setAttribute('cx',5);
		lilCircle.setAttribute('cy',7);
		lilCircle.setAttribute('r',1);
		lilCircle.setAttribute('fill','grey');
		lilCircle.setAttribute('stroke','black');
		genericPartWheel.appendChild(lilCircle);

		var genericResource = document.createElementNS('http://www.w3.org/2000/svg','circle');
		genericResource.id = 'genericResource';
		genericResource.setAttribute('cx',0);
		genericResource.setAttribute('cy',0);
		genericResource.setAttribute('r',2);
		genericResource.setAttribute('stroke','black');
		defs.appendChild(genericResource);

		
		var colliderGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		colliderGroup.id = 'colliderGroup';
		svg.appendChild(colliderGroup);
		
		var resourcesGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		resourcesGroup.id = 'resourcesGroup';
		svg.appendChild(resourcesGroup);
		
		var partsGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		partsGroup.id = 'partsGroup';
		svg.appendChild(partsGroup);
		
		svgDiv.appendChild(svg);
		
		return [svgDiv];
	},
	
	addCollider: function(collider) {
		var line = document.createElementNS('http://www.w3.org/2000/svg','line');
		line.setAttribute('x1',collider.x1);
		line.setAttribute('y1',collider.y1);
		line.setAttribute('x2',collider.x2);
		line.setAttribute('y2',collider.y2);
		line.setAttribute('stroke',collider.color);
		line.setAttribute('stroke-width',2);
		document.getElementById('colliderGroup').appendChild(line);
		
		return line;
	},
	
	addPart: function(part) {
		var partGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		document.getElementById('partsGroup').appendChild(partGroup);
		
		var partSprite = document.createElementNS('http://www.w3.org/2000/svg','use');
		partSprite.setAttribute('href','#genericPart');
		partSprite.setAttribute('x',part.x-5);
		partSprite.setAttribute('y',part.y);
		partGroup.appendChild(partSprite);
		partSprite.addEventListener('mousedown',handlers.dragStart.bind(part,part));
		
		if (part.inputs.length == 0) {
			var partWheel = document.createElementNS('http://www.w3.org/2000/svg','use');
			partWheel.setAttribute('href','#genericPartWheel');
			partWheel.setAttribute('x',part.x-5);
			partWheel.setAttribute('y',part.y);
			partWheel.addEventListener('click',handlers.advanceWheel.bind(part,part));
			partGroup.appendChild(partWheel);
		} else {
			var displayGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
			partGroup.appendChild(displayGroup);
			console.log('ping');
			for (var i in part.inputs) {
				var inputLight = document.createElementNS('http://www.w3.org/2000/svg','use');
				var lightCoordinates = view.lightCoordinates(part,i,'inputs');
				var cx = lightCoordinates.x;
				var cy = lightCoordinates.y;
				inputLight.setAttribute('href','#genericResource');
				inputLight.setAttribute('x',cx );
				inputLight.setAttribute('y',cy);
				inputLight.setAttribute('fill',part.inputs[i].color);
				inputLight.setAttribute('opacity',0.2);
				var scale = 0.5;
				var translateString = (-cx*(scale-1))+' '+(-cy*(scale-1));
				inputLight.setAttribute('transform','translate('+translateString+') scale('+scale+')');
				displayGroup.appendChild(inputLight);
			};
			for (var i in part.outputs) {
				var outputLight = document.createElementNS('http://www.w3.org/2000/svg','use');
				var lightCoordinates = view.lightCoordinates(part,part.inputs.length+parseInt(i),'outputs');
				var cx = lightCoordinates.x;
				var cy = lightCoordinates.y;
				outputLight.setAttribute('href','#genericResource');
				outputLight.setAttribute('x',cx );
				outputLight.setAttribute('y',cy);
				outputLight.setAttribute('fill',part.outputs[i].color);
				var scale = 0.5;
				var translateString = (-cx*(scale-1))+' '+(-cy*(scale-1));
				outputLight.setAttribute('transform','translate('+translateString+') scale('+scale+')');
				displayGroup.appendChild(outputLight);
			};
		};
		
		return partGroup;
	},
	
	lightCoordinates: function(part,lightIndex,inputOutput) {
		if (inputOutput == 'outputs') {lightIndex -= part.inputs.length};
		var x = part.x-3 + lightIndex * (6 / (part[inputOutput].length-1));
		var y = part.y+3;
		if (inputOutput == 'outputs') {y += 5};
		return {x:x,y:y};
	},
	
	turnPartWheel: function(part) {
		var wheel = part.sprite.children[1];
		wheel.setAttribute('transform','rotate('+part.progress*360+' '+part.x+' '+(part.y+5)+')');
	},
	
	shakePart: function(part) {
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,5),1);
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,-5),100);
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,5),200);
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,-5),300);
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,0),400);	
	},
	
	rotateElement: function(part,rotation) {
		part.sprite.setAttribute('transform','rotate('+rotation+' '+part.x+' '+(part.y+5)+')');
	},
	
	partProgress: function(part) {
		for (var i in part.inputs) {
			if (part.inputs[i] == part.hopper[i]) {
// 				console.log(part.sprite.children[1].children);
				part.sprite.children[1].children[i].setAttribute('opacity',1);
			} else {
				part.sprite.children[1].children[i].setAttribute('opacity',0.2);
			};
		};
	},
	
	addResource: function(resource) {
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		circle.setAttribute('cx',resource.x);
		circle.setAttribute('cy',resource.y);
		circle.setAttribute('r',2);
		circle.setAttribute('fill',resource.currency.color);
		circle.setAttribute('stroke','black');
		document.getElementById('resourcesGroup').appendChild(circle);
		
		circle.addEventListener('mousedown',handlers.dragStart.bind(resource,resource));
		
		return circle;
	},
	
	moveResource: function(resource) {
		resource.sprite.setAttribute('cx',resource.x);
		resource.sprite.setAttribute('cy',resource.y);
	},
	
	movePart: function(part) {
		part.sprite.children[0].setAttribute('x',part.x - 5);
		part.sprite.children[0].setAttribute('y',part.y);
		if (part.inputs.length == 0) {
			part.sprite.children[1].setAttribute('x',part.x - 5);
			part.sprite.children[1].setAttribute('y',part.y);
		} else {
			var lights = part.sprite.children[1].children;
			for (var i=0;i<lights.length;i++) {
				var inputOutput = 'inputs';
				if (i >= part.inputs.length) {inputOutput = 'outputs'};
				var lightCoordinates = view.lightCoordinates(part,i,inputOutput);
				var cx = lightCoordinates.x;
				var cy = lightCoordinates.y;
				var scale = 0.5;
				var translateString = (-cx*(scale-1))+' '+(-cy*(scale-1));
				lights[i].setAttribute('x',cx);
				lights[i].setAttribute('y',cy);
				lights[i].setAttribute('transform','translate('+translateString+') scale('+scale+')');
			};
		};
	},

};