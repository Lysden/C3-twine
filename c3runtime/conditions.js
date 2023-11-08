'use strict';

{
	C3.Plugins.Twine.Cnds =
	{
		CanMoveAlong () {
			if (!this.IsCorrect()) {
				return false;
			}

			return this.stories[this.storyI][passages][this.stories[this.storyI][passI]][links].length > 0;
		},

		TestForTag (tag) {
			if (!this.IsCorrect()) {
				return false;
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			if (thisPassage[tags].length === 0) {
				return false;
			}

			for (var i = 0; i < thisPassage[tags].length; i++) {
				var tag_ = this.Trans(thisPassage[tags][i], this.stories[this.storyI][passages][0][hal]);
				if (tag_ === tag)	{
					return true;
				}
			}
			return false;
		},

		TestForName (name) {
			if (!this.IsCorrect()) {
				return false;
			}

			var name_ = this.Trans(this.stories[this.storyI][passages][this.stories[this.storyI][passI]][name], this.stories[this.storyI][passages][0][hal]);
			return name_ === name;
		},

		HasFunctionCall () {
			if (!this.IsCorrect()) {
				return false;
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			return thisPassage[funcCall] && thisPassage[funcCall].length > 0;
		},

		HasVariableData () {
			if (!this.IsCorrect()) {
				return false;
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			return thisPassage[variables] && thisPassage[variables].length > 0;
		},

		HasTagData () {
			if (!this.IsCorrect()) {
				return false;
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			return thisPassage[tags] && thisPassage[tags].length > 0;
		},

		HasReferenceData () {
			if (!this.IsCorrect()) {
				return false;
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			return thisPassage[objRefs] && thisPassage[objRefs].length > 0;
		}

	};
}
