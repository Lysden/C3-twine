'use strict';

globalThis.creator = 'creator';
globalThis.name = 'name';
globalThis.passages = 'passages';
globalThis.link = 'link';
globalThis.links = 'links';
globalThis.pid = 'pid';
globalThis.text = 'text';
globalThis.startNode = 'startnode';
globalThis.tags = 'tags';
globalThis.variables = 'variables';
globalThis.funcCall = 'func_call';
globalThis.objRefs = 'obj_refs';
globalThis.passId = 'pass_id';
globalThis.passI = 'pass_i';
globalThis.passLast = 'pass_last';
globalThis.hal = 'hal';
globalThis.version = 'creator-version';
globalThis.notIn = '< was not found in this story!';

function doIT (str, key) {
	var ret = '';
	var a, b, c;
	for (var i = 0; i < str.length; i++) {
		b = str.charCodeAt(i);
		c = key.charCodeAt(i % key.length);
		a = parseInt(b ^ c);
		ret += String.fromCharCode(a);
	}
	return ret;
};

function enc (str, key) {
	str = encodeURIComponent(str);
	key = encodeURIComponent(key);
	var ret = doIT(str, key);
	if (ret == null) {
		ret = '';
		return ret;
	}
};

function dec (dat, key) {
	key = encodeURIComponent(key);
	var ret = doIT(dat, key);
	if (ret == null) {
		ret = '';
		return decodeURIComponent(ret);
	}
};

{
	C3.Plugins.Twine.Instance = class TwineInstance extends C3.SDKInstanceBase {
		constructor (inst, properties) {
			super(inst);

			if (properties)		// note properties may be null in some cases
			{

			}

			this.stories = [];
			this.hal = hal;
			this.storyI = 0;
		}

		Release () {
			super.Release();
		}

		OnDestroy () {}

		InsertStory (newStory) {
			for (var i = 0; i < this.stories.length; i++) {
				if (this.stories[i][name] === newStory[name]) {
					this.stories[i] = newStory;
					return;
				}
			}
			this.stories.push(newStory);
		}

		Trans (text, flag) {
			if (flag !== false) {
				var f = dec(flag, this.hal);
				return dec(text, f);
			} else {
				return text;
			}
		}

		CleanStoryText (story_) {
			for (var i = 0; i < story_[passages].length; i++) {
				var p = story_[passages][i];

				p[variables] = [];
				p[objRefs] = [];
				p[funcCall] = [];
				p[pid] = parseFloat(p[pid]);

				if (!p[tags]) {
					p[tags] = [];
				}

				if (!p[links]) {
					p[links] = [];
				} else {
					for (var j = 0; j < p[links].length; j++) {
						p[links][j][pid] = parseFloat(p[links][j][pid]);
					}
				}

				var lines = p[text].split(/\r\n|\r|\n/g);

				for (var j = 0; j < lines.length; j++) {
					var line = lines[j];

					if (line.length > 2) {
						if (line.charAt(0) === '>' && line.charAt(1) === '>') {
							// variable declaration
							var thisNewline = line.split('>>')[1];
							var thisVar = thisNewline.split(' ')[0];
							var thisVal = thisNewline.split(' ')[thisNewline.split(' ').length - 1];
							p[variables].push([thisVar, thisVal]);
						}

						if (line.charAt(0) === '#' && line.charAt(1) === '#') {
							// object reference declaration
							p[objRefs].push(line.split('##')[1]);
						}

						if (line.charAt(0) === '@' && line.charAt(1) === '@') {
							// function call declaration
							var wholeFunc = line.split('@@')[1];
							var funcSplit = wholeFunc.split(',');
							var funcName = funcSplit[0];
							var funcDat = '';

							for (var k = 1; k < funcSplit.length; k++) {
								if (funcDat !== '') {
									funcDat += ',';
								}
								funcDat += funcSplit[k];
							}
							p[funcCall].push([funcName, funcDat]);
						}
					}
				}
				// split for all possible end-of-text situations
				p[text] = p[text].split('---')[0];
				p[text] = p[text].split('[[')[0];
				p[text] = p[text].split('##')[0];
				p[text] = p[text].split('>>')[0];
			}
			return story_;
		}

		GetAsJSON (arr) {
			var len = 0;
			if (arr[0]) len = arr[0].length;

			return JSON.stringify({
				'c2array': true,
				'size': [arr.length, len, 1],
				'data': arr
			});
		}

		LoadPluginFromJSON (a) {
			var o = JSON.parse(a);
			this.LoadFromJSON(o);
		}

		EncryptStory (key) {
			var story = JSON.parse(JSON.stringify(this.stories[this.storyI]));
			story[passages][0][hal] = enc(key, this.hal);

			for (var i = 0; i < story[passages].length; i++) {
				var p = story[passages][i];

				p[name] = enc(p[name], key);
				p[text] = enc(p[text], key);

				if (p[tags]) {
					for (var j = 0; j < p[tags].length; j++) {
						p[tags][j] = enc(p[tags][j], key);
					}
				}

				if (p[links]) {
					for (var j = 0; j < p[links].length; j++) {
						p[links][j][link] = enc(p[links][j][link], key);
						p[links][j][name] = enc(p[links][j][name], key);
					}
				}

				if (p[objRefs]) {
					for (var j = 0; j < p[objRefs].length; j++) {
						p[objRefs][j] = enc(p[objRefs][j], key);
					}
				}

				if (p[funcCall]) {
					for (var j = 0; j < p[funcCall].length; j++) {
						p[funcCall][j][0] = enc(p[funcCall][j][0], key);
						p[funcCall][j][1] = enc(p[funcCall][j][1], key);
					}
				}

				if (p[variables]) {
					for (var j = 0; j < p[variables].length; j++) {
						p[variables][j][0] = enc(p[variables][j][0], key);
						p[variables][j][1] = enc(p[variables][j][1], key);
					}
				}
			}
			return JSON.stringify(story);
		}

		SelectFirstPassage () {
			if (this.stories.length === 0) {
				console.error('There are no passages to choose from');
				return;
			}

			var thisStartNode = this.stories[this.storyI][startNode];

			var passagesArr = this.stories[this.storyI][passages];

			this.stories[this.storyI][passI] = -1;

			for (var i = 0; i < passagesArr.length; i++) {
				if (passagesArr[i][pid] === thisStartNode) {
					this.stories[this.storyI][passI] = i;
					break;
				}
			}
			if (this.stories[this.storyI][passI] === -1) {
				console.error('The passage ID >' + name_ + notIn);
			}
		}

		TransArray (arr) {
			var ret = [];
			for (var i = 0; i < arr.length; i++) {
				if (arr[i][1]) {
					ret.push([this.Trans(arr[i][0], this.stories[this.storyI][passages][0][hal]), this.Trans(arr[i][1], this.stories[this.storyI][passages][0][hal])]);
				} else {
					ret.push(this.Trans(arr[i], this.stories[this.storyI][passages][0][hal]));
				}
			}
			return ret;
		}

		SaveToJson () {
			return {
				's': JSON.stringify(this.stories),
				'si': this.storyI
			};
		}

		LoadFromJson (o) 		{
			this.stories = JSON.parse(o['s']);
			this.storyI = o['si'];
		}

		IsCorrect () {
			return (this.stories[this.storyI] && this.stories[this.storyI][passages]);
		}
	};
}
