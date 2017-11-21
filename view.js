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

		// Layers
		var colliderGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		colliderGroup.id = 'colliderGroup';
		svg.appendChild(colliderGroup);
		
		var shopGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		shopGroup.id = 'shopGroup';
		svg.appendChild(shopGroup);
		
		var designGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		designGroup.id = 'designGroup';
		svg.appendChild(designGroup);
		
		var resourcesGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		resourcesGroup.id = 'resourcesGroup';
		svg.appendChild(resourcesGroup);
		
		var partsGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		partsGroup.id = 'partsGroup';
		svg.appendChild(partsGroup);
		
		// Shop
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.setAttribute('x',-90);
		rect.setAttribute('y',51);
		rect.setAttribute('width',180);
		rect.setAttribute('height',10);
		rect.setAttribute('fill','darkslategray');
		shopGroup.appendChild(rect);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.setAttribute('x',-90);
		rect.setAttribute('y',50);
		rect.setAttribute('width',53);
		rect.setAttribute('height',12);
		rect.setAttribute('fill','silver');
		shopGroup.appendChild(rect);
		for (var i=0;i<5;i++) {
			var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
			circle.id = 'workshopSlot_'+i;
			circle.setAttribute('cx',-80 + i*8);
			circle.setAttribute('cy',56);
			circle.setAttribute('r',2.5);
			circle.setAttribute('fill','dimgray');
			circle.setAttribute('stroke','darkgray');
			shopGroup.appendChild(circle);
		};
		
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.setAttribute('x',-35);
		rect.setAttribute('y',50);
		rect.setAttribute('width',70);
		rect.setAttribute('height',12);
		rect.setAttribute('fill','silver');
		shopGroup.appendChild(rect);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.id = 'designScreen';
		rect.setAttribute('x',-33);
		rect.setAttribute('y',52);
		rect.setAttribute('rx',2);
		rect.setAttribute('ry',2);
		rect.setAttribute('width',50);
		rect.setAttribute('height',8);
		rect.setAttribute('fill','darkgray');
		rect.setAttribute('stroke','darkgray');
		shopGroup.appendChild(rect);		
		svgDiv.appendChild(svg);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.id = 'designBtn';
		rect.setAttribute('x',20);
		rect.setAttribute('y',53.5);
		rect.setAttribute('rx',1);
		rect.setAttribute('ry',1);
		rect.setAttribute('width',12);
		rect.setAttribute('height',5);
		rect.setAttribute('fill','darkgray');
		rect.setAttribute('stroke','darkgray');
		rect.addEventListener('click',handlers.buildPart);
		shopGroup.appendChild(rect);
		
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
		var x, y;
		lightIndex = parseInt(lightIndex);
		if (inputOutput == 'outputs') {lightIndex -= part.inputs.length};
		if (part[inputOutput].length == 1) {
			x = part.x;
		} else {
			x = part.x-3 + lightIndex * (6 / (part[inputOutput].length-1));
		};
		y = part.y+3;
		if (inputOutput == 'outputs') {y += 5};
		return {x:x,y:y};
	},
	
	turnPartWheel: function(part) {
		var wheel = part.sprite.children[1];
		wheel.setAttribute('transform','rotate('+part.progress*360+' '+part.x+' '+(part.y+5)+')');
	},
	
	shakePart: function(part) {
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,3),1);
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,-3),50);
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,3),100);
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,-3),150);
		var timedEvent = setTimeout(view.rotateElement.bind(this,part,0),200);	
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
	
	displayDesign: function(inputs,outputs) {
		var designGroup = document.getElementById('designGroup');
		designGroup.innerHTML = '';
		var screen = document.getElementById('designScreen');
		screen.setAttribute('fill','ghostwhite');
		var x = screen.x.animVal.value + 5;
		var y = screen.y.animVal.value + screen.height.animVal.value/2;
		x += (45 - (inputs.length + outputs.length + 1)*5)/2
		for (var input of inputs) {
			var icon = document.createElementNS('http://www.w3.org/2000/svg','use');
			icon.setAttribute('href','#genericResource');
			icon.setAttribute('x',x);
			icon.setAttribute('y',y);
			icon.setAttribute('fill',input.color);
			designGroup.appendChild(icon);
			x += 5;
		};
		var arrow = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		var arrowString = (x-1.5) + ',' + (y-2) + ' ' + (x+1.5) + ',' + y + ' ' + (x-1.5) + ',' + (y+2);
		arrow.setAttribute('points',arrowString);
		arrow.setAttribute('fill','black');
		designGroup.appendChild(arrow);
		x += 5;
		for (var output of outputs) {
			var icon = document.createElementNS('http://www.w3.org/2000/svg','use');
			icon.setAttribute('href','#genericResource');
			icon.setAttribute('x',x);
			icon.setAttribute('y',y);
			icon.setAttribute('fill',output.color);
			designGroup.appendChild(icon);
			x += 5;
		};
	},
	
	clearDesign: function() {
		var designGroup = document.getElementById('designGroup');
		designGroup.innerHTML = '';
		var designScreen = document.getElementById('designScreen');
		designScreen.setAttribute('fill','darkgray');
		var designBtn = document.getElementById('designBtn');
		designBtn.setAttribute('fill','darkgray'); 
	},

};