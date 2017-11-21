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
			game.dragging.atRest = false;
			game.dragging = undefined;
		};
	},

}

// Move blue box to under floor
// give it five input slots
// combinations of resources produce different parts
// can make duplicates with same sequences
// creating new parts introduces new currencies into the game