/* eslint-disable require-jsdoc */
import {ControllerTomato} from './control.js';
import {RenderTomato} from './render.js';

export class Tomato {
	static instance = null;
	#activeTask;

	constructor(
			{
				time = 25,
				pause = 5,
				bigPause = 15,
				tasks = [],
			}, renderContainer = null) {
		if (Tomato.instance) return Tomato.instance;
		Tomato.instance = this;
		this.time = time;
		this.pause = pause;
		this.bigPause = bigPause;
		this.tasks = tasks;
		this.renderContainer = renderContainer;
		this.render();
	}

	get activeTask() {
		return this.#activeTask;
	}

	addTask(task) {
		this.tasks.push(task);
		this.renderTomato.renderQuestTasks();
		return this;
	}

	activateTask(id) {
		this.#activeTask = this.findTask(id);
		this.renderTomato.renderMainPanel();
		return this;
	}

	run() {
		const taskTime = this.toMinutes(this.time);
		const pauseTime = this.toMinutes(this.pause);
		const bigPauseTime = this.toMinutes(this.bigPause);

		try {
			if (!this.#activeTask) {
				throw new Error('Нет активной задачи!');
			}

			console.log('Активировали задачу #' + this.#activeTask.id);

			setTimeout(() => {
				if (this.#activeTask.counter % 3 === 0) {
					setTimeout(() => {
						console.log('Хорошо отдохнули!');
					}, bigPauseTime);
				} else {
					setTimeout(() => {
						console.log('Отдохнули');
					}, pauseTime);
				}
			}, taskTime);
			this.addCounter(this.#activeTask.id);
		} catch (err) {
			console.error(err.message);
		}
	}

	render() {
		if (this.renderContainer) {
			this.renderTomato = new RenderTomato(this.renderContainer, this);
			this.controllerTomato = new ControllerTomato(this,
				this.renderTomato.questTasks, this.renderTomato.taskForm);
		}
	}

	addCounter(id) {
		this.findTask(id).addCounter();
		this.renderTomato.renderQuestTasks();
	}

	findTask(id) {
		return this.tasks.find(task => task.id === id);
	}

	toMinutes(msec) {
		return msec * 1000 * 60;
	}
}
