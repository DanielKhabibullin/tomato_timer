/* eslint-disable require-jsdoc */
export class Task {
	#id;
	#title;
	#pomodoro;
	#importance;
	constructor(title, pomodoro = 0, importance = 'medium') {
		this.#id = Math.random().toString(16).substring(2, 8);
		this.#title = title;
		this.#pomodoro = pomodoro;
		this.#importance = importance;
	}

	increasePomodoro() {
		this.#pomodoro++;
	}

	changeTaskTitle(newTitle) {
		this.#title = newTitle;
	}

	setImportance(importance) {
		this.#importance = importance;
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
	get importance() {
		return this.#importance;
	}
}

export class ImportantTask extends Task {
	#importance;
	constructor(title, pomodoro = 0, importance = 'high') {
		super(title, pomodoro);
		this.#importance = importance;
	}
	get importance() {
		return this.#importance;
	}
}

export class StandardTask extends Task {
	#importance;
	constructor(title, pomodoro = 0, importance = 'medium') {
		super(title, pomodoro);
		this.#importance = importance;
	}
	get importance() {
		return this.#importance;
	}
}

export class UnimportantTask extends Task {
	#importance;
	constructor(title, pomodoro = 0, importance = 'low') {
		super(title, pomodoro);
		this.#importance = importance;
	}
	get importance() {
		return this.#importance;
	}
}

export class Command {
	execute() {}
	undo() {}
	redo() {}
}

export class AddTaskCommand extends Command {
	constructor(task, tasks) {
		super();
		this.task = task;
		this.tasks = tasks;
	}

	execute() {
		this.tasks.push(this.task);
	}

	undo() {
		const index = this.tasks.indexOf(this.task);
		if (index !== -1) {
			this.tasks.splice(index, 1);
		}
	}

	redo() {
		this.execute();
	}
}

export class RemoveTaskCommand extends Command {
	constructor(task, tasks) {
		super();
		this.task = task;
		this.tasks = tasks;
	}

	execute() {
		const index = this.tasks.indexOf(this.task);
		if (index !== -1) {
			this.tasks.splice(index, 1);
		}
	}

	undo() {
		this.tasks.push(this.task);
	}

	redo() {
		this.execute();
	}
}

export class ChangeTaskTitleCommand extends Command {
	constructor(task, newTitle) {
		super();
		this.task = task;
		this.oldTitle = task.title;
		this.newTitle = newTitle;
	}

	execute() {
		this.task.changeTaskTitle(this.newTitle);
	}

	undo() {
		this.task.changeTaskTitle(this.oldTitle);
	}

	redo() {
		this.execute();
	}
}

class SetTaskImportanceCommand extends Command {
	constructor(task, importance) {
		super();
		this.task = task;
		this.oldImportance = task.importance;
		this.newImportance = importance;
	}

	execute() {
		this.task.setImportance(this.newImportance);
	}

	undo() {
		this.task.setImportance(this.oldImportance);
	}

	redo() {
		this.execute();
	}
}

export class TaskManager {
	#tasks = [];
	#commands = [];

	// constructor() {
	// this.#tasks = [];
	// this.#commands = [];
	// }

	getTasks() {
		return [...this.#tasks];
	}

	addTask(task) {
		this.#tasks.push(task);
		this.#commands.push(new AddTaskCommand(task, this.#tasks));
	}

	removeTask(task) {
		const index = this.#tasks.indexOf(task);
		if (index !== -1) {
			this.#tasks.splice(index, 1);
			this.#commands.push(new RemoveTaskCommand(task, this.#tasks));
		}
	}

	changeTaskTitle(task, newTitle) {
		this.#commands.push(new ChangeTaskTitleCommand(task, newTitle));
		task.changeTaskTitle(newTitle);
	}

	increasePomodoro(task) {
		task.increasePomodoro();
	}

	setTaskImportance(task, importance) {
		this.#commands.push(new SetTaskImportanceCommand(task, importance));
		task.setImportance(importance);
	}

	undo() {
		const command = this.#commands.pop();
		if (command) {
			command.undo();
		}
	}

	redo() {
		const command = this.#commands[this.#commands.length - 1];
		if (command) {
			command.redo();
		}
	}
}
