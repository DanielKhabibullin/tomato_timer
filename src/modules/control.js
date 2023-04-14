/* eslint-disable require-jsdoc */

import {CreateImportantTask, CreateStandartTask,
	CreateUnimportantTask} from './taskCommand.js';


export class ControllerTomato {
	#list = null;
	#form = null;

	constructor(tomato, list = null, form = null) {
		this.tomato = tomato;
		this.#list = list;
		this.#form = form;
		this.commands = [];
		this.init();
	}

	init() {
		this.controlList();
		this.controlForm();
	}

	controlForm() {
		if (!this.#form) return;

		this.#form.addEventListener('submit', event => {
			event.preventDefault();

			const title = this.#form.querySelector('.task-name').value;
			const importance = this.#form.
				querySelector('.button-importance').classList[2];

			this.createTask(title, importance);
			this.#form.reset();
		});

		let count = 0;
		const imp = ['default', 'important', 'so-so'];
		this.#form.querySelector('.button-importance').
			addEventListener('click', ({target}) => {
				count++;
				if (count >= imp.length) {
					count = 0;
				}

				for (let i = 0; i < imp.length; i++) {
					if (count === i) {
						target.classList.add(imp[i]);
					} else {
						target.classList.remove(imp[i]);
					}
				}
			});
	}

	controlList() {
		if (!this.#list) return;

		this.#list.addEventListener('click', event => {
			const target = event.target;
			if (target.closest('.pomodoro-tasks__task-text')) {
				const taskId = target.closest('li').dataset.id;
				this.tomato.activateTask(taskId);
			}
		});
	}

	createTask(title, importance) {
		let Command;

		if (importance === 'important') {
			Command = CreateImportantTask;
		} else {
			Command = importance === 'so-so' ? CreateStandartTask :
			CreateUnimportantTask;
		}

		const command = new Command(this.tomato, title);
		if (command.execute()) {
			this.commands.push(command);
		}
	}
}
