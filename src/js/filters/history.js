var History = function(initalState,maxHistory) {

	this._state = [initalState];
	this._current = 0;

		this.getCurrent = function() {
			console.log('History getCurrent: ',this._current, 'state: ', this._state[this._current]);
			return this._state[this._current];
		};
		this.getAll = function() {
			console.log('History getAll: ',this._state);
			return this._state;
		};
		this.add = function (jsonStringify) {
			console.log('History add: ',jsonStringify);
			// console.log(this._state[this._current+=1]);
			this._current+=1;
			if (this._current > maxHistory) {
				this._state.shift();
			}
			return this._state.push(jsonStringify);
		};
		this.undo = function() {
			// if (this._state[this._current-1]) {
			// 	console.log('History undo: ',this._state[this._current-1]);
			// 	return this._state[this._current-=1];
			// }
			return this._state[this._current-=1];

			if (this._current>1) {
				console.log(this._state);
				this._state = this._state.slice(0, this._current-=1);
				console.log(this._state,this._state[this._current]);
				return this._state[this._current];
			}
		};
		this.redo = function() {
			console.log('History redo: ',this._state[this._current+1]);
			return this._state[this._current+=1];
		};
		this.clear = function() {
			console.log('Cleared history _current: ',this._current,' _state: ' ,this._state);
			this._state = [initalState];
			this._current = 0;
			return this.getCurrent();
		};
};
