var game;
function Game() {
	this.colliders = [];
	this.currencies = [];
	this.resources = [];
	this.parts = [];
	this.designs = [];
	
	this.level = 1;
	this.colors = ['Red','Blue','Green'];
	this.colorsQueue = ['Yellow','Orange','Purple','White','Black'];
	this.icons = ['Coin'];
	this.iconsQueue = ['Stone','Ingot','Gem','Crown','Sword','Shield','Cup','Diamond'];
	
	this.newGame = function() {
		for (var i = 0; i<3; i++) {
			new Currency(['Red','Blue','Green'][i]);
		};
		for (var i in game.currencies) {
			var newPart = new Part([],[this.currencies[i]],undefined,{x:0,y:0});
			this.parts.push(newPart);
			newPart.place(-20+20*i,-30);
			newPart.sprite = view.addPart(newPart);
		};
		new Collider(-99,60,-99,-600,'none');
		new Collider(99,60,99,-600,'none');
		new Collider(-100,50,100,50,'none');
		new Collider(-100,62,100,62,'none');
	};
	
	this.tick = function() {
		for (var resource of this.resources) {
			resource.tick();
		};
		for (var part of this.parts) {
			part.tick();
		};
		var timedEvent = setTimeout(this.tick.bind(this),100);
	};
	
	this.levelUp = function() {
		if (this.level % 3 == 0) {
			this.colors.push(this.colorsQueue.shift());
		} else {
			this.icons.push(this.iconsQueue.shift());
		};
		this.level++;
		console.log(this.colors,this.icons);
	};
};

function Collider(x1,y1,x2,y2,color,part) {
	var minX = -100, maxX = 100, minY = -60, maxY = 60;
	if (x1 == undefined) {
		this.x1 = minX + Math.random() * (maxX - minX);
	} else {
		this.x1 = x1;
	};
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.color = color;
	this.part = part;
	this.supporting = [];
	
	this.angles = [Math.atan2( (this.x1 - this.x2),(this.y1 - this.y2)),Math.atan2( (this.x2 - this.x1),(this.y2 - this.y1))]; 
	
	this.sprite = view.addCollider(this);
	game.colliders.push(this);
};

function Currency(color) {
	this.name = undefined;
	if (color == undefined) {
		this.color = game.colors[Math.random() * game.colors.length << 0];
	} else {
		this.color = color;
	};
	this.icon = game.icons[Math.random() * game.icons.length << 0];
	this.name = this.color + ' ' + this.icon;
	this.key = this.name.replace(' ','');
	
	var duplicate = false;
	for (var currency of game.currencies) {
		if (currency.name == this.name) {
			duplicate = true;
		};
	};
	if (!duplicate) {
		game.currencies.push(this);
	};
};

function Resource(x,y,currency,momentum) {
	this.x = x;
	this.y = y;
	this.currency = currency;
	this.momentum = momentum;
	
	this.sprite = view.addResource(this);
	
	this.tick = function() {
		if (!this.atRest && game.dragging !== this) {
			this.momentum.y += 1;
		
			// Collision
			var collision = false, collisionY = false, consumed = false;
			for (var collider of game.colliders) {
				var p1 = {x:this.x,y:this.y};
				var p2 = {x:this.x+this.momentum.x,y:this.y+this.momentum.y};
				var p3 = {x:collider.x1,y:collider.y1};
				var p4 = {x:collider.x2,y:collider.y2};
				if (isIntersect(p1,p2,p3,p4)) {
					var bounce = false;
					if (collider.part !== undefined && collider.part.inputs.indexOf(this.currency) !== -1 ) { // part takes this currency
						var indices = [];
						var index = collider.part.inputs.indexOf(this.currency);
						while (index != -1) {
							indices.push(index);
							index = collider.part.inputs.indexOf(this.currency,index+1);
						};
						var full = true;
						var emptySlots = [];
						for (var index of indices) {
							if (collider.part.hopper[index] !== this.currency) {
								full = false;
								emptySlots.push(index);
							};
						};
						if (full) {
							bounce = true;
						} else {
							collider.part.addToHopper(this.currency,emptySlots[0]);
							game.resources.splice(game.resources.indexOf(this),1);
							this.sprite.remove();
							consumed = true;
						};
					} else {
						bounce = true;
					};
					if (bounce) { // bounce
						collision = true;
						colliderY = undefined;
						var intersect = lineIntersect(p1,p2,p3,p4);
						var speed = Math.pow(Math.pow(p1.x - p2.x,2) + Math.pow(p1.y - p2.y,2) ,0.5);
						var distToIntersect = Math.pow(Math.pow(p1.x - intersect.x,2) + Math.pow(p1.y - intersect.y,2),0.5);
						var distRemaining = speed - distToIntersect;
						var direction = Math.atan2( (p1.x - p2.x),(p1.y - p2.y));
						var reflectionAngle = (collider.angles[0] + collider.angles[1])/2;
						if (reflectionAngle == Math.PI/2) {
							this.momentum.x *= -0.6;
						} else if (reflectionAngle == 0) {
							this.momentum.y *= -0.6 * distToIntersect / speed;
							this.momentum.x *= 0.97;
							collisionY = true;
							colliderY = collider;
						};
					};
				};
			};
			
			if (!consumed) {	
				this.y += this.momentum.y;
				this.x += this.momentum.x;
			
				// Terminal Friction
				if (Math.abs(this.momentum.x) < 0.1) {this.momentum.x = 0};
				if (Math.abs(this.momentum.y) < 0.1) {this.momentum.y = 0};
				if (this.momentum.x == 0 && this.momentum.y == 0 && collisionY) {
					this.atRest = true;
					colliderY.supporting.push(this);
				};
			
				view.moveResource(this);
			};
		};
	};
};

function Part(inputs,outputs,step,momentum) {
	this.name = undefined;
	this.progress = 0;
	if (step == undefined) {
		this.step = Math.random() * 0.05;
	} else {
		this.step = step;
	};
	if (inputs == undefined) {
		inputs = [];
		var num = Math.random() * 3 + 1;
		for (var i=0;i<num;i++) {
			inputs.push(game.currencies[Math.random() * game.currencies.length << 0]);
		};
	};
	this.inputs = inputs;
	this.hopper = [];
	if (outputs == undefined) {
		outputs = [];
		var num = Math.random() * Math.random() * Math.random() * 3 + 1;
		for (var i=0;i<num;i++) {
			outputs.push(game.currencies[Math.random() * game.currencies.length << 0]);
		};
	};
	this.outputs = outputs;
	if (momentum == undefined) {
		this.momentum = {
			x: 20 * (Math.random() - 0.5),
			y: 20 * (Math.random() - 0.5),
		};
	} else {
		this.momentum = momentum;
	};
	this.colliders = [];
	
	this.name = ['inator','izer',' distributor',' bus'][Math.random() * 4 << 0];
	
	this.setUpColliders = function() {
		for (var collider of this.colliders) {
			for (var resource of collider.supporting) {
				resource.atRest = false;
			};
			game.colliders.splice(game.colliders.indexOf(collider),1);
		};
		this.colliders = [];
		this.colliders.push(new Collider(this.x-5,this.y,this.x+5,this.y,'none',this));
		this.colliders.push(new Collider(this.x+5,this.y,this.x+5,this.y+10,'none',this));
		this.colliders.push(new Collider(this.x-5,this.y,this.x-5,this.y+10,'none',this));
	};
	
	this.place = function(x,y) {
		this.x = x;
		this.y = y;
		this.setUpColliders();
	};
	
	this.tick = function() {
		if (this.inputs.length == 0) {
			this.progress += this.step;
			view.turnPartWheel(this);
			if (this.progress > 1) {
				this.progress -= 1;
				this.produceOutputs();
			};
		};
	};
	
	this.produceOutputs = function() {
		view.shakePart(this);
		for (var currency of this.outputs) {
			var newMomentum = {x:this.momentum.x+(Math.random()-0.5)*2,y:this.momentum.y+(Math.random()-0.5)*2};
			startX = this.x;
			if (newMomentum.y > -1) {
				startY = this.y + 10;
			} else {
				startY = this.y - 1;
			};
			game.resources.push(new Resource(startX,startY,currency,newMomentum));
		};
		for (var collider of this.colliders) {
			for (var resource of collider.supporting) {
				resource.atRest = false;
				resource.momentum.y -= Math.random() * 5;
				resource.momentum.x = Math.random() - 0.5;
			};
		};
	};
	
	this.advanceWheel = function() {
		this.progress += 0.1;
	};
	
	this.addToHopper = function(currency,slot) {
		this.hopper[slot] = currency;
		view.partProgress(this);
		if (this.hopper.length == this.inputs.length) {
			var allInputs = true;
			for (var index in this.inputs) {
				if (this.hopper[index] !== this.inputs[index]) {
					allInputs = false;
				};
			};
			if (allInputs) {
				this.hopper = [];
				this.produceOutputs();
				view.partProgress(this);
			};
		};
	};
	
	// End Part
};

// Geometry Functions

function Turn(p1, p2, p3) {
  a = p1.x; b = p1.y; 
  c = p2.x; d = p2.y;
  e = p3.x; f = p3.y;
  A = (f - b) * (c - a);
  B = (d - b) * (e - a);
  return (A > B + Number.EPSILON) ? 1 : (A + Number.EPSILON < B) ? -1 : 0;
}

function isIntersect(p1, p2, p3, p4) {
  return (Turn(p1, p3, p4) != Turn(p2, p3, p4)) && (Turn(p1, p2, p3) != Turn(p1, p2, p4));
}

function lineIntersect(p1,p2,p3,p4) {
    var ua, ub, denom = (p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y);
    if (denom == 0) {
        return null;
    }
    ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x))/denom;
    ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x))/denom;
    return {
        x: p1.x + ua*(p2.x - p1.x),
        y: p1.y + ua*(p2.y - p1.y),
//         seg1: ua >= 0 && ua <= 1,
//         seg2: ub >= 0 && ub <= 1
    };
}