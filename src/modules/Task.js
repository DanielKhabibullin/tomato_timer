/* eslint-disable require-jsdoc */
export class Task {
	#id;
	#title;
	#pomodoro;
	constructor(title, pomodoro = 0) {
		this.#id = Math.random().toString(16).substring(2, 8);
		this.#title = title;
		this.#pomodoro = pomodoro;
	}

	increasePomodoro() {
		this.#pomodoro++;
	}

	changeTaskTitle(newTitle) {
		this.#title = newTitle;
	}

	get title() {
		return this.#title;
	}
	get pomodoro() {
		return this.#pomodoro;
	}
	get id() {
		return this.#id;
	}
}

export const buyElephant = new Task('buy elephant');
