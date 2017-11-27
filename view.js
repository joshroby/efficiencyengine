var view = {

	options: {
		scoreDisplay: 'VPS',
	},

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
		
		var genericPartShoot = document.createElementNS('http://www.w3.org/2000/svg','g');
		genericPartShoot.id = 'genericPartShoot';
		defs.appendChild(genericPartShoot);
		var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
		polyline.setAttribute('fill','gray');
		polyline.setAttribute('stroke','black');
		polyline.setAttribute('points','3,0 2,9 -2,9 -3,0');
		genericPartShoot.appendChild(polyline);

		var resourceStone = document.createElementNS('http://www.w3.org/2000/svg','circle');
		resourceStone.id = 'resourceStone';
		resourceStone.setAttribute('cx',0);
		resourceStone.setAttribute('cy',0);
		resourceStone.setAttribute('r',2);
		resourceStone.setAttribute('stroke','black');
		defs.appendChild(resourceStone);
		
		var resourceIngot = document.createElementNS('http://www.w3.org/2000/svg','g');
		resourceIngot.id = 'resourceIngot';
		defs.appendChild(resourceIngot);
		var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		polygon.setAttribute('points','1,2 3,0 2.5,-2 0.5,-2 -2.5,0');
		polygon.setAttribute('stroke','black');
		polygon.setAttribute('stroke-linejoin','round');
		resourceIngot.appendChild(polygon);
		var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		polygon.setAttribute('points','-3,2 -2.5,0 0.5,0 1,2 -3,2');
		polygon.setAttribute('stroke','black');
		polygon.setAttribute('stroke-linejoin','round');
		resourceIngot.appendChild(polygon);
		
		var resourceCoin = document.createElementNS('http://www.w3.org/2000/svg','g');
		resourceCoin.id = 'resourceCoin';
		resourceCoin.setAttribute('stroke','black');
		defs.appendChild(resourceCoin);
		var ellipseHeads = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		resourceCoin.appendChild(ellipseHeads);
		ellipseHeads.setAttribute('cx',0.25);
		ellipseHeads.setAttribute('cy',0);
		ellipseHeads.setAttribute('rx',1.5);
		ellipseHeads.setAttribute('ry',2);
		var ellipseTails = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
		resourceCoin.appendChild(ellipseTails);
		ellipseTails.setAttribute('cx',-0.25);
		ellipseTails.setAttribute('cy',0);
		ellipseTails.setAttribute('rx',1.5);
		ellipseTails.setAttribute('ry',2);
		
		var resourceCrown = document.createElementNS('http://www.w3.org/2000/svg','g');
		defs.appendChild(resourceCrown);
		resourceCrown.id = 'resourceCrown';
		resourceCrown.setAttribute('stroke','black');
		var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		polygon.setAttribute('points','-2,2 2,2 3,-1 1,0 0,-2 -1,0 -3,-1 -2,2');
		polygon.setAttribute('stroke','black');
		polygon.setAttribute('stroke-linejoin','round');
		resourceCrown.appendChild(polygon);
		
		var resourceShield = document.createElementNS('http://www.w3.org/2000/svg','g');
		defs.appendChild(resourceShield);
		resourceShield.id = 'resourceShield';
		resourceShield.setAttribute('stroke','black');
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		var d = 'M 2,0 L 0,-2 L -2,0 L 0,2';
		d += 'C 0.5,2.5 1.5,2.5 2,2';
		d += 'C 2.5,1.5 2.5,0.5 2,0';
		d += ' z'
		path.setAttribute('d',d);
		path.setAttribute('stroke','black');
		path.setAttribute('stroke-linejoin','round');
		resourceShield.appendChild(path);
		
		var resourceSword = document.createElementNS('http://www.w3.org/2000/svg','g');
		defs.appendChild(resourceSword);
		resourceSword.id = 'resourceSword';
		resourceSword.setAttribute('stroke','black');
		var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		polygon.setAttribute('points',' -2.5,-2 -2,-2.5 2.5,1.5 2.5,2.5 1.5,2.5 -2.5,-2');
		polygon.setAttribute('stroke','black');
		polygon.setAttribute('stroke-linejoin','round');
		resourceSword.appendChild(polygon);
		var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		polygon.setAttribute('points','0,-2 1,-1 -1,1 -2,0 0,-2');
		polygon.setAttribute('stroke','black');
		polygon.setAttribute('stroke-linejoin','round');
		resourceSword.appendChild(polygon);
		
		var resourceCup = document.createElementNS('http://www.w3.org/2000/svg','g');
		defs.appendChild(resourceCup);
		resourceCup.id = 'resourceCup';
		resourceCup.setAttribute('stroke','black');
		var path = document.createElementNS('http://www.w3.org/2000/svg','path');
		var d = 'M -2,-2';
		d += 'C -2,0 -0.75,-0.5 -0.75,0';
		d += 'C -0.75,1.5 -1.5,2 -1.5,2';
		d += 'L 1.5,2';
		d += 'C 1.5,2 0.75,1.5 0.75,0';
		d += 'C 0.75,-0.5 2,0 2,-2';
		d += ' z'
		path.setAttribute('d',d);
		path.setAttribute('stroke','black');
		path.setAttribute('stroke-linejoin','round');
		resourceCup.appendChild(path);

		var resourceGem = document.createElementNS('http://www.w3.org/2000/svg','g');
		defs.appendChild(resourceGem);
		resourceGem.id = 'resourceGem';
		var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		polygon.setAttribute('points','-1,-2 1,-2 2,-1 2,1 1,2 -1,2 -2,1 -2,-1');
		polygon.setAttribute('stroke','black');
		resourceGem.appendChild(polygon);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.setAttribute('x',-1);
		rect.setAttribute('y',-1);
		rect.setAttribute('width',2);
		rect.setAttribute('height',2);
		rect.setAttribute('stroke-width',0.25);
		rect.setAttribute('stroke','black');
		resourceGem.appendChild(rect);
		
		var victoryPoint = document.createElementNS('http://www.w3.org/2000/svg','polygon');
		defs.appendChild(victoryPoint);
		victoryPoint.id = 'resourceVictoryPoint';
		victoryPoint.setAttribute('fill','cyan');
		victoryPoint.setAttribute('stroke','black');
		victoryPoint.setAttribute('stroke-width',0.5);
		victoryPoint.setAttribute('points','0,-2 1,-1 3,-1 2,0 3,1 1,1 0,2 -1,1 -3,1 -2,0 -3,-1 -1,-1');
		victoryPoint.setAttribute('transform','scale(0.9,1.2)');

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
		
		var uiGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		uiGroup.id = 'uiGroup';
		svg.appendChild(uiGroup);
		
		// Shop
		
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.setAttribute('x',-90);
		rect.setAttribute('y',51);
		rect.setAttribute('width',180);
		rect.setAttribute('height',10);
		rect.setAttribute('fill','darkslategray');
		shopGroup.appendChild(rect);

		var scoreGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		svg.appendChild(scoreGroup);
		scoreGroup.addEventListener('mouseenter',view.displayScore);
		scoreGroup.addEventListener('mouseleave',view.hideScore);
		scoreGroup.addEventListener('click',view.toggleScore);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		scoreGroup.appendChild(rect);
		rect.setAttribute('x',-90);
		rect.setAttribute('y',50);
		rect.setAttribute('width',12);
		rect.setAttribute('height',11);
		rect.setAttribute('fill','silver');
		rect.setAttribute('stroke','black');
		rect.setAttribute('stroke-width',0.5);
		var icon = document.createElementNS('http://www.w3.org/2000/svg','use');
		scoreGroup.appendChild(icon);
		icon.setAttribute('href','#resourceVictoryPoint');
		icon.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#resourceVictoryPoint');
		icon.setAttribute('x',-84);
		icon.setAttribute('y',55.5);
		icon.setAttribute('transform','translate(84,-55.5) scale(2)');
		var pointsDisplay = document.createElementNS('http://www.w3.org/2000/svg','text');
		scoreGroup.appendChild(pointsDisplay);
		pointsDisplay.id = 'pointsDisplay';
		pointsDisplay.setAttribute('x',-84);
		pointsDisplay.setAttribute('y',56.5);
		pointsDisplay.setAttribute('text-anchor','middle');
		pointsDisplay.setAttribute('font-size',3);
		pointsDisplay.setAttribute('paint-order','stroke');
		pointsDisplay.setAttribute('stroke','cyan');
		pointsDisplay.setAttribute('stroke-width',0.5);
		pointsDisplay.innerHTML = '1000';
		var scoreDetailsGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
		scoreGroup.appendChild(scoreDetailsGroup);
		scoreDetailsGroup.id = 'scoreDetailsGroup';
		scoreDetailsGroup.setAttribute('visibility','hidden');
		scoreDetailsGroup.setAttribute('font-size',3);
		scoreDetailsGroup.setAttribute('text-anchor','end');
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		scoreDetailsGroup.appendChild(rect);
		rect.setAttribute('x',-90);
		rect.setAttribute('y',8);
		rect.setAttribute('width',40);
		rect.setAttribute('height',40);
		rect.setAttribute('fill','silver');
		rect.setAttribute('stroke','black');
		rect.setAttribute('stroke-width',0.5);
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		scoreDetailsGroup.appendChild(text);
		text.setAttribute('x',-70);
		text.setAttribute('y',15);
		text.setAttribute('font-size',5);
		text.setAttribute('text-anchor','middle');
		text.innerHTML = 'Points Details';
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		scoreDetailsGroup.appendChild(text);
		text.setAttribute('x',-73);
		text.setAttribute('y',20);
		text.innerHTML = 'Victory';
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		scoreDetailsGroup.appendChild(text);
		text.setAttribute('x',-73);
		text.setAttribute('y',23);
		text.innerHTML = 'Points';
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		scoreDetailsGroup.appendChild(text);
		text.setAttribute('x',-73);
		text.setAttribute('y',30);
		text.innerHTML = 'Lifetime';
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		scoreDetailsGroup.appendChild(text);
		text.setAttribute('x',-73);
		text.setAttribute('y',33);
		text.innerHTML = 'Efficiency';
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		scoreDetailsGroup.appendChild(text);
		text.setAttribute('x',-73);
		text.setAttribute('y',40);
		text.innerHTML = 'Current';
		var text = document.createElementNS('http://www.w3.org/2000/svg','text');
		scoreDetailsGroup.appendChild(text);
		text.setAttribute('x',-73);
		text.setAttribute('y',43);
		text.innerHTML = 'Efficiency';
		for (var i=0;i<3;i++) {
			var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
			scoreDetailsGroup.appendChild(rect);
			rect.setAttribute('x',-70);
			rect.setAttribute('y',17 + i * 10);
			rect.setAttribute('width',15);
			rect.setAttribute('height',7);
			rect.setAttribute('fill','white');
			rect.setAttribute('stroke','black');
			rect.setAttribute('stroke-width',0.5);
			var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			scoreDetailsGroup.appendChild(text);
			text.setAttribute('x',-57);
			text.setAttribute('y',22 + i * 10);
			text.innerHTML = 'XXX';
			text.id = 'display' + ['VPS','LifetimeEfficiency','CurrentEfficiency'][i];
		};
		
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.setAttribute('x',-75);
		rect.setAttribute('y',50);
		rect.setAttribute('width',53);
		rect.setAttribute('height',11);
		rect.setAttribute('fill','silver');
		rect.setAttribute('stroke','black');
		rect.setAttribute('stroke-width',0.5);
		shopGroup.appendChild(rect);
		for (var i=0;i<5;i++) {
			var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
			circle.id = 'workshopSlot_'+i;
			circle.setAttribute('cx',-65 + i*8);
			circle.setAttribute('cy',56);
			circle.setAttribute('r',2.5);
			circle.setAttribute('fill','dimgray');
			circle.setAttribute('stroke','darkgray');
			shopGroup.appendChild(circle);
		};
		
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.setAttribute('x',-20);
		rect.setAttribute('y',50);
		rect.setAttribute('width',71);
		rect.setAttribute('height',11);
		rect.setAttribute('fill','silver');
		rect.setAttribute('stroke','black');
		rect.setAttribute('stroke-width',0.5);
		shopGroup.appendChild(rect);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.id = 'designScreen';
		rect.setAttribute('x',-17);
		rect.setAttribute('y',52);
		rect.setAttribute('rx',2);
		rect.setAttribute('ry',2);
		rect.setAttribute('width',50);
		rect.setAttribute('height',7);
		rect.setAttribute('fill','darkgray');
		rect.setAttribute('stroke','darkgray');
		shopGroup.appendChild(rect);		
		svgDiv.appendChild(svg);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		rect.id = 'designBtn';
		rect.setAttribute('x',36);
		rect.setAttribute('y',53.5);
		rect.setAttribute('rx',1);
		rect.setAttribute('ry',1);
		rect.setAttribute('width',12);
		rect.setAttribute('height',5);
		rect.setAttribute('fill','darkgray');
		rect.setAttribute('stroke','darkgray');
		rect.addEventListener('click',handlers.buildPart);
		shopGroup.appendChild(rect);

		var flush = document.createElementNS('http://www.w3.org/2000/svg','g');
		shopGroup.appendChild(flush);
		flush.id = 'flushPanel';
		flush.addEventListener('click',handlers.flush);
		var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
		flush.appendChild(rect);
		rect.setAttribute('x',78);
		rect.setAttribute('y',50);
		rect.setAttribute('width',12);
		rect.setAttribute('height',11);
		rect.setAttribute('fill','silver');
		rect.setAttribute('stroke','black');
		rect.setAttribute('stroke-width',0.5);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		flush.appendChild(circle);
		circle.setAttribute('cx',84);
		circle.setAttribute('cy',55.5);
		circle.setAttribute('r',3);
		circle.setAttribute('stroke','red');
		circle.setAttribute('fill','none');
		var line = document.createElementNS('http://www.w3.org/2000/svg','line');
		flush.appendChild(line);
		line.setAttribute('x1',84);
		line.setAttribute('y1',52.5);
		line.setAttribute('x2',84);
		line.setAttribute('y2',58.5);
		line.setAttribute('stroke','red');
		line.setAttribute('transform','rotate(45 84 55.5)');

		
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
		
		partGroup.addEventListener('mouseenter',handlers.displayComponents.bind(undefined,part));
		partGroup.addEventListener('mouseleave',handlers.clearComponents);
		
		if (part.outputs.length > 0) {
			var shoot = document.createElementNS('http://www.w3.org/2000/svg','use');
			shoot.setAttribute('href','#genericPartShoot');
			shoot.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#genericPartShoot');
			shoot.setAttribute('x',part.x);
			shoot.setAttribute('y',part.y+5);
			partGroup.appendChild(shoot);
			shoot.setAttribute('transform','rotate('+part.shoot.trajectory+' '+part.x+' '+(part.y+5)+')');
			shoot.addEventListener('mousedown',handlers.dragStart.bind(part,part.shoot));
		} else {
			var noShoot = document.createElementNS('http://www.w3.org/2000/svg','group');
			partGroup.appendChild(noShoot);
		};
		
		var partSprite = document.createElementNS('http://www.w3.org/2000/svg','use');
		partSprite.setAttribute('href','#genericPart');
		partSprite.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#genericPart');
		partSprite.setAttribute('x',part.x-5);
		partSprite.setAttribute('y',part.y);
		partGroup.appendChild(partSprite);
		partSprite.addEventListener('mousedown',handlers.dragStart.bind(part,part));
		
		if (part.inputs.length == 0) {
			var partWheel = document.createElementNS('http://www.w3.org/2000/svg','use');
			partWheel.setAttribute('href','#genericPartWheel');
			partWheel.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#genericPartWheel');
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
				inputLight.setAttribute('href','#resource'+part.inputs[i].icon);
				inputLight.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#resource'+part.inputs[i].icon);
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
				outputLight.setAttribute('href','#resource'+part.outputs[i].icon);
				outputLight.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#resource'+part.outputs[i].icon);
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
		var wheel = part.sprite.children[2];
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
				part.sprite.children[2].children[i].setAttribute('opacity',1);
			} else {
				part.sprite.children[2].children[i].setAttribute('opacity',0.2);
			};
		};
	},
	
	addResource: function(resource) {
		var icon = document.createElementNS('http://www.w3.org/2000/svg','use');
		icon.setAttribute('href','#resource'+resource.currency.icon);
		icon.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#resource'+resource.currency.icon);
		icon.setAttribute('x',resource.x);
		icon.setAttribute('y',resource.y);
		icon.setAttribute('fill',resource.currency.color);
		document.getElementById('resourcesGroup').appendChild(icon);
		
		icon.addEventListener('mousedown',handlers.dragStart.bind(resource,resource));
		icon.addEventListener('mouseover',handlers.checkForDead.bind(resource));
		return icon;
				
	},
	
	moveResource: function(resource) {
		resource.sprite.setAttribute('x',resource.x);
		resource.sprite.setAttribute('y',resource.y);
	},
	
	movePart: function(part) {
		part.sprite.children[0].setAttribute('x',part.x);
		part.sprite.children[0].setAttribute('y',part.y+5);
		part.sprite.children[0].setAttribute('transform','rotate('+part.shoot.trajectory+' '+part.x+' '+(part.y+5)+')');
		part.sprite.children[1].setAttribute('x',part.x - 5);
		part.sprite.children[1].setAttribute('y',part.y);
		if (part.inputs.length == 0) {
			part.sprite.children[2].setAttribute('x',part.x - 5);
			part.sprite.children[2].setAttribute('y',part.y);
		} else {
			var lights = part.sprite.children[2].children;
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
	
	moveShoot: function(shoot) {
		shoot.part.sprite.children[0].setAttribute('transform','rotate('+shoot.trajectory+' '+shoot.part.x+' '+(shoot.part.y+5)+')');
		var uiGroup = document.getElementById('uiGroup');
		uiGroup.innerHTML = '';
		var coords = {
			x: shoot.part.x - Math.sin(shoot.trajectory * Math.PI/180) * (12 + 2 * shoot.muzzleVelocity),
			y: shoot.part.y + 5 + Math.cos(shoot.trajectory * Math.PI/180) * (12 + 2 * shoot.muzzleVelocity),
		};
		var target = document.createElementNS('http://www.w3.org/2000/svg','g');
		uiGroup.appendChild(target);
		target.setAttribute('fill','none');
		target.setAttribute('stroke','red');
		target.setAttribute('stroke-width',0.25);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		target.appendChild(circle);
		circle.setAttribute('cx',coords.x);
		circle.setAttribute('cy',coords.y);
		circle.setAttribute('r',2);
		var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
		target.appendChild(circle);
		circle.setAttribute('cx',coords.x);
		circle.setAttribute('cy',coords.y);
		circle.setAttribute('r',1.5);
		var line = document.createElementNS('http://www.w3.org/2000/svg','line');
		target.appendChild(line);
		line.setAttribute('x1',coords.x+1.5);
		line.setAttribute('y1',coords.y);
		line.setAttribute('x2',coords.x+2.5);
		line.setAttribute('y2',coords.y);
		var line = document.createElementNS('http://www.w3.org/2000/svg','line');
		target.appendChild(line);
		line.setAttribute('x1',coords.x-1.5);
		line.setAttribute('y1',coords.y);
		line.setAttribute('x2',coords.x-2.5);
		line.setAttribute('y2',coords.y);
		var line = document.createElementNS('http://www.w3.org/2000/svg','line');
		target.appendChild(line);
		line.setAttribute('x1',coords.x);
		line.setAttribute('y1',coords.y+1.5);
		line.setAttribute('x2',coords.x);
		line.setAttribute('y2',coords.y+2.5);
		var line = document.createElementNS('http://www.w3.org/2000/svg','line');
		target.appendChild(line);
		line.setAttribute('x1',coords.x);
		line.setAttribute('y1',coords.y-1.5);
		line.setAttribute('x2',coords.x);
		line.setAttribute('y2',coords.y-2.5);
	},
	
	displayDesign: function(design) {
		var inputs = design.inputs;
		var outputs = design.outputs;
		var designGroup = document.getElementById('designGroup');
		designGroup.innerHTML = '';
		var screen = document.getElementById('designScreen');
		screen.setAttribute('fill','ghostwhite');
		var x = screen.x.animVal.value + 5;
		var y = screen.y.animVal.value + screen.height.animVal.value/2;
		x += (45 - (inputs.length + outputs.length + 1)*5)/2;
		for (var input of inputs) {
			var icon = document.createElementNS('http://www.w3.org/2000/svg','use');
			icon.setAttribute('href','#resource'+input.icon);
			icon.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#resource'+input.icon);
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
		if (outputs.length == 0) {
			var vps = document.createElementNS('http://www.w3.org/2000/svg','use');
			designGroup.appendChild(vps);
			vps.setAttribute('href','#resourceVictoryPoint');
			vps.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#resourceVictoryPoint');
			vps.setAttribute('x',x);
			vps.setAttribute('y',y);
			var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			designGroup.appendChild(text);
			text.setAttribute('x',x);
			text.setAttribute('y',y+1);
			text.setAttribute('text-anchor','middle');
			text.setAttribute('font-size',3);
			text.setAttribute('fill','black');
			text.setAttribute('stroke','cyan');
			text.setAttribute('stroke-width',0.5);
			text.setAttribute('paint-order','stroke');
			text.innerHTML = design.victoryPoints;
		} else {
			for (var output of outputs) {
				var icon = document.createElementNS('http://www.w3.org/2000/svg','use');
				icon.setAttribute('href','#resource'+output.icon);
				icon.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#resource'+output.icon);
				icon.setAttribute('x',x);
				icon.setAttribute('y',y);
				icon.setAttribute('fill',output.color);
				designGroup.appendChild(icon);
				x += 5;
			};
		};
		var workshopClear = true;
		for (var i in game.workshop) {
			if (game.workshop[i] !== undefined) {
				workshopClear = false;
			};
		};
		if (workshopClear) {
			for (var i=0;i<5;i++) {
				var slot = document.getElementById('workshopSlot_'+i);
				var icon = document.createElementNS('http://www.w3.org/2000/svg','use');
				icon.setAttribute('href','#resource'+design.components[i].icon);
				icon.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#resource'+design.components[i].icon);
				icon.setAttribute('x',slot.cx.animVal.value);
				icon.setAttribute('y',slot.cy.animVal.value);
				icon.setAttribute('opacity',0.5);
				icon.setAttribute('fill',design.components[i].color);
				document.getElementById('designGroup').appendChild(icon);
			};
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
	
	displayScore: function() {
		document.getElementById('scoreDetailsGroup').setAttribute('visibility','visible');
	},
	
	hideScore: function() {
		document.getElementById('scoreDetailsGroup').setAttribute('visibility','hidden');
	},
	
	toggleScore: function() {
		if (view.options.scoreDisplay == 'VPS') {
			view.options.scoreDisplay = 'lifetime';
		} else if (view.options.scoreDisplay == 'lifetime') {
			view.options.scoreDisplay = 'current';
		} else {
			view.options.scoreDisplay = 'VPS';
		};
	},
	
	displayScores: function(vps,lifetime,current) {
		var pointsDisplay = document.getElementById('pointsDisplay');
		document.getElementById('displayVPS').innerHTML = vps;
		document.getElementById('displayLifetimeEfficiency').innerHTML = Math.round(lifetime*1000)/1000 + '/s';
		document.getElementById('displayCurrentEfficiency').innerHTML = Math.round(current*1000)/1000 + '/s';
		if (view.options.scoreDisplay == 'VPS') {
			pointsDisplay.innerHTML = vps;
			pointsDisplay.setAttribute('font-size',3);
		} else if (view.options.scoreDisplay == 'lifetime') {
			pointsDisplay.innerHTML = Math.round(lifetime*100)/100 + '/s';
			pointsDisplay.setAttribute('font-size',2.5);
		} else {
			pointsDisplay.innerHTML = Math.round(current*100)/100 + '/s';
			pointsDisplay.setAttribute('font-size',2.5);
		};
		
	},

};