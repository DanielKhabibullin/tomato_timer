/* eslint-disable require-jsdoc */
export class Task {
	#id;
	#title;
	#counter;

	constructor(title, counter = 0) {
		this.#id = Math.random().toString(16).substring(2, 8);
		this.#title = title;
		this.#counter = counter;
	}

	get id() {
		return this.#id;
	}

	get title() {
		return this.#title;
	}

	get counter() {
		return this.#counter;
	}

	addCounter() {
		this.#counter++;
		return this;
	}

	setTitle(title) {
		this.#title = title;
		return this;
	}
}

export class ImportantTask extends Task {
	#importance = 'major';

	constructor(title, counter = 0) {
		super(title, counter);
	}

	get importance() {
		return this.#importance;
	}
}

export class StandartTask extends Task {
	#importance = 'standart';

	constructor(title, counter = 0) {
		super(title, counter);
	}

	get importance() {
		return this.#importance;
	}
}

export class UnimportantTask extends Task {
	#importance = 'unimportant';

	constructor(title, counter = 0) {
		super(title, counter);
	}

	get importance() {
		return this.#importance;
	}
}
