var handlers = {

	load: function() {
		// Load Body Contents
		var pageContents = view.pageContents();
		document.body.innerHTML = '';
		for (var element of pageContents) {
			document.body.appendChild(element);
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
			};
		};
	},
	
	dragEnd: function() {
		if (game.dragging !== undefined) {
			if (game.dragging.currency !== undefined) {
				var mouse = {
					x: game.dragging.sprite.cx.animVal.value,
					y: game.dragging.sprite.cy.animVal.value,
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
					game.dragging.sprite.setAttribute('cx',slot.cx.animVal.value);
					game.dragging.sprite.setAttribute('cy',slot.cy.animVal.value);
					game.addToWorkshop(selectedSlot,game.dragging);
				} else {
					game.dragging.atRest = false;
				};
			};
			game.dragging = undefined;
		};
	},
	
	buildPart: function() {
		if (game.previewing !== undefined) {
			game.buildPart();
		};
	},

}

// Move blue box to under floor
// give it five input slots
// combinations of resources produce different parts
// can make duplicates with same sequences
// creating new parts introduces new currencies into the game