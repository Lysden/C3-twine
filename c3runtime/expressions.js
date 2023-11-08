'use strict';

{
	C3.Plugins.Twine.Exps =
	{
		TagsAsJSON () {
			if (!this.IsCorrect()) {
				return ('');
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];
			return (this.GetAsJSON(this.TransArray(thisPassage[tags])));
		},

		ObjectsAsJSON () {
			if (!this.IsCorrect() || !this.stories[this.storyI][passages][this.stories[this.storyI][passI]][objRefs]) {
				return ('');
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];
			return (this.GetAsJSON(this.TransArray(thisPassage[objRefs])));
		},

		FunctionsAsJSON () {
			if (!this.IsCorrect()) {
				return ('');
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			return (this.GetAsJSON(this.TransArray(thisPassage[funcCall])));
		},

		VariablesAsJSON ()	{
			if (!this.IsCorrect())	{
				return ('');
			}
			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];
			return (this.GetAsJSON(this.TransArray(thisPassage[variables])));
		},

		PluginAsJSON ()	{
			return (JSON.stringify(this.saveToJSON()));
		},

		FunctionParamsAtIndex (i)	{
			if (!this.IsCorrect())	{
				return ('');
			} else {
				var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

				if (thisPassage[funcCall] && i < thisPassage[funcCall].length) {
					return (this.Trans(thisPassage[funcCall][i][1], this.stories[this.storyI][passages][0][hal]));
				} else {
					console.error('The function call reference could not be found or the index was wrong!');
					return ('');
				}
			}
		},

		NumberOfLinks ()	{
			if (!this.IsCorrect())	{
				return (0);
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			return (thisPassage[links].length);
		},

		LinkNumberID (i)	{
			if (!this.IsCorrect())	{
				return (0);
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			if (thisPassage[links] && thisPassage[links][i])	{
				return (thisPassage[links][i][pid]);
			} else {
				console.error('There was not a link to match the index number');
				return (0);
			}
		},

		LinkTextID (i)	{
			if (!this.IsCorrect())	{
				return ('');
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			if (thisPassage[links] && thisPassage[links][i])	{
				var r = this.Trans(thisPassage[links][i][link], this.stories[this.storyI][passages][0][hal]);
				return (r);
			} else {
				console.error('Link array did not contain index number!');
				return ('');
			}
		},

		LinkLabelText (i)	{
			if (!this.IsCorrect())	{
				return ('');
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			if (thisPassage[links] && thisPassage[links][i])	{
				var r = this.Trans(thisPassage[links][i][name], this.stories[this.storyI][passages][0][hal]);
				return (r);
			} else {
				console.error('Link array did not contain index number!');
				return ('');
			}
		},

		NumberOfTags ()	{
			if (!this.IsCorrect())	{
				return (0);
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			return (thisPassage[tags].length);
		},

		TagAtIndex (i)	{
			if (!this.IsCorrect())	{
				return ('');
			}
			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			if (thisPassage[tags] && thisPassage[tags][i])	{
				var r = this.Trans(thisPassage[tags][i], this.stories[this.storyI][passages][0][hal]);
				return (r);
			} else {
				console.error('Tag array did not contain index number!');
				return ('');
			}
		},

		PassageText ()	{
			if (!this.IsCorrect())	{
				return ('');
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			if (thisPassage[text])	{
				var r = this.Trans(thisPassage[text], this.stories[this.storyI][passages][0][hal]);
				return (r);
			} else {
				console.error('There was no text in this passage!');
				return ('');
			}
		},

		PassageName ()	{
			if (!this.IsCorrect())	{
				return ('');
			}

			var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

			if (thisPassage[name])	{
				var r = this.Trans(thisPassage[name], this.stories[this.storyI][passages][0][hal]);
				return (r);
			} else {
				console.error('There was no name for this passage!');
				return ('');
			}
		},

		GetEncryptedStory (key)	{
			if (!this.IsCorrect())	{
				return ('');
			} else {
				var r = this.EncryptStory(key);
				return (r);
			}
		},

		PassageID ()	{
			if (!this.IsCorrect())	{
				return (0);
			} else {
				return (this.stories[this.storyI][passI]);
			}
		},

		NoOfVariables ()	{
			if (!this.IsCorrect())	{
				return (0);
			} else {
				var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

				return (thisPassage[variables].length);
			}
		},

		NoOfObjectRefs ()	{
			if (!this.IsCorrect())	{
				return (0);
			} else {
				var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

				return (thisPassage[objRefs].length);
			}
		},

		ObjectRefAtIndex (i)	{
			if (!this.IsCorrect())	{
				return ('');
			} else {
				var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

				if (thisPassage[objRefs] && i < thisPassage[objRefs].length) {
					return (this.Trans(thisPassage[objRefs][i], this.stories[this.storyI][passages][0][hal]));
				} else {
					console.error('The object refs could not be found or the index was wrong!');
					return ('');
				}
			}
		},

		VariableAtIndex (i)	{
			if (!this.IsCorrect()) {
				return ('');
			} else {
				var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

				if (thisPassage[variables] && i < thisPassage[variables].length) {
					return (this.Trans(thisPassage[variables][i][0], this.stories[this.storyI][passages][0][hal]));
				} else {
					console.error('The variables reference could not be found or the index was wrong!');
					return ('');
				}
			}
		},

		VariableValueAtIndex (i)	{
			if (!this.IsCorrect())	{
				return ('');
			} else {
				var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

				if (thisPassage[variables] && i < thisPassage[variables].length) {
					return (this.Trans(thisPassage[variables][i][1], this.stories[this.storyI][passages][0][hal]));
				} else {
					console.error('The variables reference could not be found or the index was wrong!');
					return ('');
				}
			}
		},

		NoOfFunctionCalls ()	{
			if (!this.IsCorrect())	{
				return (0);
			} else {
				var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

				return (thisPassage[funcCall].length);
			}
		},

		FunctionCallAtIndex (i)	{
			if (!this.IsCorrect())	{
				return ('');
			} else {
				var thisPassage = this.stories[this.storyI][passages][this.stories[this.storyI][passI]];

				if (thisPassage[funcCall] && i < thisPassage[funcCall].length) {
					return (this.Trans(thisPassage[funcCall][i][0], this.stories[this.storyI][passages][0][hal]));
				} else {
					console.error('The function call reference could not be found or the index was wrong!');
					return ('');
				}
			}
		}
	};
}
