var handlers = {

	newGame: function() {
		// Load Body Contents
		var pageContents = view.pageContents();
// 		document.body.innerHTML = '';
		document.getElementById('gameDiv').innerHTML = '';
		for (var element of pageContents) {
			document.getElementById('gameDiv').appendChild(element);
		};
		
		// Clear Old Game's Ticks
		if (game !== undefined) {
			for (var i in game.ticks) {
				clearTimeout(game.ticks[i]);
			};
		};
		
		// New Game
		game = new Game();
		game.newGame();
		game.tick();
	},
	
	advanceWheel: function(part) {
		part.advanceWheel();
	},
	
	dragStart: function(focus) {
		game.dragging = focus;
		game.dragStart = {
			x: focus.pageX,
			y: focus.pageY,
		};
		if (focus.currency !== undefined) { // is a resource
			for (var i in game.workshop) {
				if (focus == game.workshop[i]) {
					game.workshop[i] = undefined;
					view.clearDesign();
					this.previewing = undefined;
				};
			};
			focus.atRest = false;
		};
	},
	
	dragGo: function(e) {
		if (game.dragging !== undefined) {
			var item = game.dragging;
			var svgDiv = document.getElementById('svgDiv');
			item.x = 200*(e.pageX - svgDiv.offsetLeft)/svgDiv.offsetWidth - 100;
			item.y = 123*(e.pageY - svgDiv.offsetTop)/svgDiv.offsetHeight - 61.5;
			if (item instanceof Part) {
				view.movePart(item);
				item.setUpColliders();
			} else if (item instanceof Resource) {
				view.moveResource(item);
			} else if (item.trajectory !== undefined) {
				item.moveShoot();
				view.moveShoot(item);
			};
		};
	},
	
	dragEnd: function() {
		if (game.dragging !== undefined) {
			if (game.dragging.currency !== undefined) {
				var mouse = {
					x: game.dragging.sprite.x.animVal.value,
					y: game.dragging.sprite.y.animVal.value,
				};
				var selectedSlot = undefined;
				for (var i=0;i<5;i++) {
					var slot = document.getElementById('workshopSlot_'+i);
					var slotX = slot.cx.animVal.value;
					var slotY = slot.cy.animVal.value;
					var slotR = slot.r.animVal.value;
					if (mouse.x > slotX - slotR && mouse.x < slotX + slotR && mouse.y > slotY - slotR && mouse.y < slotY + slotR) {
						selectedSlot = i;
					};
				};
				if (selectedSlot !== undefined && game.workshop[selectedSlot] == undefined) {
					game.dragging.atRest = true;
					slot = document.getElementById('workshopSlot_'+selectedSlot);
					game.dragging.sprite.setAttribute('x',slot.cx.animVal.value);
					game.dragging.sprite.setAttribute('y',slot.cy.animVal.value);
					game.addToWorkshop(selectedSlot,game.dragging);
				} else {
					game.dragging.atRest = false;
				};
			};
			game.dragging = undefined;
		};
		var uiGroup = document.getElementById('uiGroup');
		uiGroup.innerHTML = '';
	},
	
	buildPart: function() {
		if (game.previewing !== undefined) {
			game.buildPart();
		};
	},
	
	displayComponents: function(part) {
		if (part.design !== undefined) {
			var workshopClear = true;
			for (var i in game.workshop) {
				if (game.workshop[i] !== undefined) {
					workshopClear = false;
				};
			};
			if (workshopClear) {
				view.displayDesign(game.designs[part.design]);
			};
		};
	},
	
	clearComponents: function() {
		view.clearDesign();
	},
	
	checkForDead: function(resource) {
		if (game.resources.indexOf(this) == -1) {this.sprite.remove()};
	},
	
	flush: function() {
		game.flush();
		document.getElementById('resourcesGroup').innerHTML = '';
	},

}