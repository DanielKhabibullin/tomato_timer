/* eslint-disable require-jsdoc */
export class TimerPomodoro {
	#timeTask;
	#timePause;
	#timeBigPause;
	#tasks;
	#activeTask;
	static instance;
	constructor(options = {}) {
		if (TimerPomodoro.instance) {
			return TimerPomodoro.instance;
		}
		TimerPomodoro.instance = this;
		const {
			timeTask = 25,
			timePause = 5,
			timeBigPause = 15,
			tasks = [],
		} = options;
		this.#timeTask = timeTask;
		this.#timePause = timePause;
		this.#timeBigPause = timeBigPause;
		this.#tasks = tasks;
		this.#activeTask = null;
	}
	get timeTask() {
		return this.#timeTask;
	}

	get timePause() {
		return this.#timePause;
	}

	get timeBigPause() {
		return this.#timeBigPause;
	}

	get tasks() {
		return this.#tasks;
	}

	get activeTask() {
		return this.#activeTask;
	}

	set activeTask(value) {
		this.#activeTask = value;
	}

	addTask(task) {
		this.#tasks.push(task);
	}

	activateTask(id) {
		const task = this.#tasks.find(task => task.id === id);
		if (task) {
			this.#activeTask = task;
		}
	}

	startTask() {
		if (!this.#activeTask) {
			console.error('Error: no active task');
			return;
		}
		console.log(`Starting task "${this.#activeTask.title}"`);
		setTimeout(() => {
			this.#activeTask.increasePomodoro();
			console.log(`Task "${this.#activeTask.title
			}" completed, amount of pomodoros: ${this.#activeTask.pomodoro}`);
			const isBigPause = (this.#activeTask.pomodoro + 1) % 3 === 0;
			this.startPause(isBigPause);
		}, this.#timeTask * 60000);
	}

	startPause(isBig) {
		console.log(`Starting ${isBig ? 'big' :
		''} pause after the task "${this.#activeTask.title}"`);
		setTimeout(() => {
			console.log(`${isBig ? 'Big' : 'Small'} pause has been completed`);
			this.#activeTask = null;
		}, (isBig ? this.#timeBigPause : this.#timePause) * 60000);
	}
}
