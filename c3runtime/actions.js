'use strict';

{
	C3.Plugins.Twine.Acts =
	{
		SelectFirstPassage () {
			this.SelectFirstPassage();
		},

		SelectPassageByName (name_) {
			if (this.stories.length === 0) {
				console.error('The passage name >' + name_ + notIn);
				return;
			}

			var passagesArr = this.stories[this.storyI][passages];

			for (var i = 0; i < passagesArr.length; i++) {
				var thisName = this.Trans(passagesArr[i][name], this.stories[this.storyI][passages][0][hal]);
				if (thisName === name_) {
					this.stories[this.storyI][passId] = passagesArr[i][pid];
					this.stories[this.storyI][passI] = i;
					return;
				}
			}
			console.error('The passage name >' + name_ + notIn);
		},

		SelectPassageByID (id_) {
			if (this.stories.length === 0) {
				console.error('The passage id >' + id_ + notIn);
				return;
			}
			var passagesArr = this.stories[this.storyI][passages];

			for (var i = 0; i < passagesArr.length; i++) {
				if (passagesArr[i][pid] === id_) {
					this.stories[this.storyI][passId] = passagesArr[i][pid];
					this.stories[this.storyI][passI] = i;
					return;
				}
			}
			console.error('The passage id >' + id_ + notIn);
		},

		AddStoryJSON (json_) {
			var newStory = JSON.parse(json_);
			if (!newStory[creator] || !newStory[passages] || newStory[passages].length === 0) {
				return;
			}
			newStory[creator] += ' + colludium';
			newStory[startNode] = parseFloat(newStory[startNode]);
			newStory[passId] = newStory[startNode];
			newStory = this.CleanStoryText(newStory);
			newStory[passages][0][hal] = false;

			for (var i = 0; i < newStory[passages].length; i++) {
				if (newStory[passages][i][pid] === newStory[startNode]) {
					newStory[passI] = i;
				}
			}

			this.InsertStory(newStory);
		},

		AddEncryptedStoryJSON (json_, key) {
			var newStory = JSON.parse(json_);
			if (!newStory[creator] || !newStory[passages] || newStory[passages].length === 0) {
				return;
			}

			this.InsertStory(newStory);
		},

		CleanOutAllStories () {
			this.stories.length = 0;
			this.storyI = 0;
		},

		DeleteStory (n) {
			var stories = this.stories;
			for (var i = 0; i < stories.length; i++) {
				if (stories[i][name] === n) {
					stories.splice(i, 1);
					i -= 1;
				}
			}
		},

		SelectStoryName (name_) {
			if (this.stories.length === 0) {
				console.error('The passage name >' + name_ + notIn);
				return;
			}

			this.storyI = -1;

			for (var i = 0; i < this.stories.length; i++) {
				if (this.stories[i][name] === name_) {
					this.storyI = i;
				}
			}
		}
	};
}
