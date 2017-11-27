var model = {
	gameTitle: "Efficiency Engine",
	gameColors: [
		'grey',
	],
	supportLink: 'http://patreon.com/joshroby',
	supportLinkLabel: 'Patreon',
};

var game;
function Game() {
	this.colliders = [];
	this.currencies = [];
	this.resources = [];
	this.parts = [];
	this.designs = {};
	this.scoreLog = [];
	this.ticks = [];
	
	this.level = 1;
	this.vps = 0;
	
	this.colors = ['Red','Blue','Green'];
	this.colorsQueue = ['Yellow','Orange','Purple','Fuchsia','White'];
	this.icons = ['Stone'];
	this.iconsQueue = ['Ingot','Crown','Cup','Shield','Sword','Coin','Gem'];
	
	this.workshop = Array(5);
	
	this.newGame = function() {
		for (var i = 0; i<3; i++) {
			new Currency(['Red','Blue','Green'][i]);
		};
		var speed;
		var speeds = [Math.random(),Math.random(),Math.random()];
		var totalSpeed = speeds[0] + speeds[1] + speeds[2];
		for (var i in game.currencies) {
			speed = 0.1 * speeds[i] / totalSpeed;
			var newPart = new Part([],[this.currencies[i]],undefined,speed,0,0);
			this.parts.push(newPart);
			newPart.place(-20+20*i,-30);
			newPart.sprite = view.addPart(newPart);
		};
		new Currency();
		new Collider(-99,60,-99,-600,'none');
		new Collider(99,60,99,-600,'none');
		new Collider(-100,47,100,47,'none');
		new Collider(-100,62,100,62,'none');
	};
	
	this.tick = function() {
		var timedEvent = setTimeout(this.tick.bind(this),100);
		this.ticks.push(timedEvent);
		for (var resource of this.resources) {
			resource.tick();
		};
		for (var part of this.parts) {
			part.tick();
		};
		this.updateScore();
	};
	
	this.updateScore = function() {
		this.scoreLog.push(this.vps);
		var lifetimeEfficiency = 10 * this.vps / this.scoreLog.length;
		var currentInterval = 100;
		var currentEfficiency = (this.vps - this.scoreLog[this.scoreLog.length - currentInterval]) / (currentInterval/10);
		if (isNaN(currentEfficiency)) {currentEfficiency = 0;};
		view.displayScores(this.vps,lifetimeEfficiency,currentEfficiency);
	};
	
	this.flush = function() {
		for (var resource of this.resources) {
			resource.sprite.remove();
		};
		this.resources = [];
		this.workshop = Array(5);
		this.overload = false;
	};
	
	this.levelUp = function() {
		if (this.level % 3 == 0) {
			newColor = this.colorsQueue.shift();
			if (newColor !== undefined) {
				this.colors.push(newColor);
			};
		} else {
			newIcon = this.iconsQueue.shift();
			if (newIcon !== undefined) {
				this.icons.push(newIcon);
			};
		};
		this.level++;
	};
	
	this.addToWorkshop = function(index,resource) {
		this.workshop[index] = resource;
		var fill = true;
		var designString = '';
		var components = [];
		for (var i=0;i<this.workshop.length;i++) {
			if (this.workshop[i] == undefined) {
				fill = false;
			} else {
				designString += this.workshop[i].currency.name.replace(' ','');
				components.push(this.workshop[i].currency);
			};
		};
		if (fill) {
			document.getElementById('designBtn').setAttribute('fill','lightskyblue');
			this.previewing = designString;
			if (this.designs[designString] == undefined) {
				if (this.workshop[0].currency == this.workshop[1].currency && this.workshop[0].currency == this.workshop[2].currency && this.workshop[0].currency == this.workshop[3].currency && this.workshop[0].currency == this.workshop[4].currency) {
					this.designs[designString] = {
						tier: tier,
						type: 'victoryPoint',
						inputs: [this.workshop[0].currency],
						outputs: [],
						components: components,
						builds: 0,
						victoryPoints: this.workshop[0].currency.value,
					};
				} else {
					var inputPotentials = [], outputPotentials = [], types = [], upgrades = [], crossgrades = [], downgrades = [];
					var tier = 0, inputValue = 0, outputValue = 0;
					for (var resource of this.workshop) {
						inputPotentials.push(resource.currency);
						tier += resource.currency.value;
					};
					tier *= 0.2;
					if (tier > 1) {
						types = ['decompiler','converter','converter','refiner','refiner']
					} else {
						types = ['converter','refiner','refiner']
					};
					var partIndex = Math.random() * types.length << 0;
					if (tier > inputValue) {partIndex = Math.min(types.length-1,partIndex + 1)};
					var partType = types[partIndex];
					if (partType == 'refiner') {new Currency()};
					var inputNum = 1 + Math.random() * 3 << 0;
					var inputs = [];
					for (var i=0;i<inputNum;i++) {
						inputs.push(inputPotentials[Math.random() * inputPotentials.length << 0]);
						inputValue += inputs[i].value;
					};
					inputValue /= inputs.length;
					for (var currency of this.currencies) {
						if (currency.value > inputValue * 1.1) {
							upgrades.push(currency);
						} else if (currency.value < inputValue / 1.1) {
							downgrades.push(currency);
						} else {
							crossgrades.push(currency);
						};
					};
					var outputs = [], outputNum = 1;
					if (partType == 'refiner') {
						outputNum = Math.max(1,inputNum - 1);
						outputPotentials = upgrades.concat(upgrades.concat(upgrades));
						if (upgrades.length == 0) {outputNum++};
					} else if (partType == 'converter') {
						outputNum = inputNum + 1;
						outputPotentials = crossgrades.concat(crossgrades.concat(crossgrades));
					} else {
						outputNum = inputNum + 2;
						outputPotentials = downgrades.concat(downgrades.concat(downgrades));
					};
					outputPotentials = outputPotentials.concat(this.currencies);
					for (var i=0;i<outputNum;i++) {
						outputs.push(outputPotentials[Math.random() * outputPotentials.length << 0]);
						outputValue += outputs[i].value;
					};
					this.designs[designString] = {
						tier: tier,
						type: partType,
						inputs: inputs,
						outputs: outputs,
						components: components,
						builds: 0,
						victoryPoints: 0,
					};
				};
			};
			view.displayDesign(this.designs[designString]);
		};
	};
	
	this.buildPart = function() {
		this.designs[this.previewing].builds++;
		if (this.designs[this.previewing].builds == 1) {
			game.levelUp();
		};
		var inputs = this.designs[this.previewing].inputs;
		var outputs = this.designs[this.previewing].outputs;
		var newPart = new Part(inputs,outputs,this.designs[this.previewing].victoryPoints);
		newPart.tier = this.designs[this.previewing].tier;
		newPart.design = this.previewing;
		this.parts.push(newPart);
		newPart.place(60,50);
		newPart.sprite = view.addPart(newPart);
		for (var resource of this.workshop) {
			resource.sprite.remove();
			this.resources.splice(this.resources.indexOf(resource),1);
		};
		this.workshop = Array(5);
		view.clearDesign();
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
	
	this.value = (1 + game.icons.indexOf(this.icon)) * Math.max(1,game.colors.indexOf(this.color)-2);
	
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
							var resourceIndex = game.resources.indexOf(this);
							if (resourceIndex !== undefined) {
								game.resources.splice(resourceIndex,1);
							};
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
				if (this.momentum.x == 0 && this.momentum.y == 0 && collisionY && colliderY !== undefined) {
					this.atRest = true;
					colliderY.supporting.push(this);
				};
			
				view.moveResource(this);
			};
		};
	};
};

function Part(inputs,outputs,victoryPoints,step,trajectory,muzzleVelocity) {
	this.tier = undefined;
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
	} else if (outputs == []) {
		this.victoryPoints = victoryPoints;
	};
	this.outputs = outputs;
	this.shoot = {};
	if (trajectory == undefined) {
		this.shoot.trajectory = Math.random() * 360;
	} else {
		this.shoot.trajectory = trajectory;
	};
	if (muzzleVelocity == undefined) {
		this.shoot.muzzleVelocity = Math.random() * 10;
	} else {
		this.shoot.muzzleVelocity = muzzleVelocity;
	};
	this.colliders = [];
	this.victoryPoints = victoryPoints;
	
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

		this.shoot.part = this;
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
		if (game.resources.length < 1000) {
			for (var currency of this.outputs) {
				var trajectoryRadians = this.shoot.trajectory * Math.PI/180;
				var momentum = {
					x:Math.sin(trajectoryRadians) * this.shoot.muzzleVelocity * -1,
					y:Math.cos(trajectoryRadians) * this.shoot.muzzleVelocity,
				};
				momentum.x += (Math.random()-0.5)*2;
				momentum.y += (Math.random()-0.5)*2;
				startX = this.x - Math.sin(trajectoryRadians) * 9;
				startY = this.y + 5 + Math.cos(trajectoryRadians) * 9;
				game.resources.push(new Resource(startX,startY,currency,momentum));
			};
			if (this.victoryPoints !== undefined) {
				game.vps += this.victoryPoints;
			};
		} else {
			var flushPanel = document.getElementById('flushPanel');
			view.shakePart({sprite:flushPanel,x:84,y:55.5});
		};
		
		// Shake Shake
		view.shakePart(this);
		for (var collider of this.colliders) {
			for (var resource of collider.supporting) {
				resource.atRest = false;
				resource.momentum.y -= Math.random() * 5;
				resource.momentum.x = Math.random() - 0.5;
			};
			collider.supporting = [];
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
	
	this.shoot.moveShoot = function(e) {
		this.trajectory = Math.atan2(-1 * (this.x - this.part.x),this.y - this.part.y) * 180/Math.PI;
		var distance = Math.pow(Math.pow(this.x - this.part.x,2) + Math.pow(this.y - this.part.y,2),0.5);
		this.muzzleVelocity = Math.min(10,Math.max(0,distance-15));
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