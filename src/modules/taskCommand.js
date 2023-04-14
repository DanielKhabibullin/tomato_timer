/* eslint-disable require-jsdoc */

import {ImportantTask, StandartTask, UnimportantTask} from './Task.js';

export class TaskCommand {
	constructor(tomato, title, pomodoro = 0) {
		this.tomato = tomato;
		this.title = title;
		this.pomodoro = pomodoro;
	}

	execute() {
		throw new Error('Unavaliable command');
	}
}

export class CreateImportantTask extends TaskCommand {
	execute() {
		this.tomato.addTask(new ImportantTask(this.title, this.pomodoro));
	}
}

export class CreateStandartTask extends TaskCommand {
	execute() {
		this.tomato.addTask(new StandartTask(this.title, this.pomodoro));
	}
}

export class CreateUnimportantTask extends TaskCommand {
	execute() {
		this.tomato.addTask(new UnimportantTask(this.title, this.pomodoro));
	}
}
