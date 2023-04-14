/* eslint-disable require-jsdoc */
import {el, setChildren} from 'redom';

export class RenderTomato {
	constructor(main, tomato) {
		this.main = main;
		this.tomato = tomato;
		this.init();
	}

	init() {
		const container = el('div.container.main__container');
		setChildren(this.main, container);

		const pomodoroTasks = el('div.pomodoro-tasks');
		const pomodoroFormWindow = el('div.pomodoro-form.window');
		setChildren(container, [pomodoroFormWindow, pomodoroTasks]);

		this.questTasks = el('ul.pomodoro-tasks__quest-tasks');
		const headerTitle = el('p.pomodoro-tasks__header-title', 'Инструкция:');
		setChildren(pomodoroTasks,
			[headerTitle, this.createQuestList(), this.questTasks]);

		this.windowPanel = el('div.window__panel');
		this.windowBody = el('div.window__body');

		this.taskForm = this.createTaskForm();

		setChildren(pomodoroFormWindow,
			[this.windowPanel, this.windowBody, this.taskForm]);

		this.renderQuestTasks();
		this.renderMainPanel();
	}

	renderQuestTasks() {
		setChildren(this.questTasks, this.createTasks());
	}

	renderMainPanel() {
		this.hasActiveTask = !!this.tomato.activeTask;
		setChildren(this.windowBody, this.createWindowBodyElement());
		setChildren(this.windowPanel, this.createWindowPanelElements());
	}

	createTaskForm() {
		const taskForm = el('form.task-form', {action: 'submit'});
		const taskName = el('input.task-name.input-primary',
			{type: 'text',
				name: 'task-name',
				id: 'task-name',
				placeholder: 'название задачи',
			});
		const buttonImportance = el('button.button.button-importance.default', {
			type: 'button', ariaLabel: 'Указать важность',
		});
		const buttonAdd = el(
			'button.button.button-primary.task-form__add-button',
			{type: 'submit'},
			'Добавить',
		);
		setChildren(taskForm, [taskName, buttonImportance, buttonAdd]);

		return taskForm;
	}

	createWindowBodyElement() {
		const windowTimerText =
		el('p.window__timer-text', this.tomato.time + ':00');
		const windowButtons = el('div.window__buttons');
		const buttonStart = el('button.button.button-primary',
			{disabled: !this.hasActiveTask}, 'Старт');
		const buttonStop = el('button.button.button-secondary',
			{disabled: !this.hasActiveTask}, 'Стоп');

		setChildren(windowButtons, [buttonStart, buttonStop]);
		return [windowTimerText, windowButtons];
	}

	createWindowPanelElements() {
		const windowPanelTitle = el('div.window__panel-title',
			this.hasActiveTask ? this.tomato.activeTask.title : 'Нет задачи');
		const windowPanelTaskText = el('div.window__panel-task-text',
			this.hasActiveTask ? 'Томат №' + this.tomato.activeTask.counter : '');

		return [windowPanelTitle, windowPanelTaskText];
	}

	createQuestList() {
		const questListItems = [
			'Напишите название задачи чтобы её добавить',
			'Чтобы задачу активировать, выберите её из списка',
			'Запустите таймер',
			'Работайте пока таймер не прозвонит',
			'Сделайте короткий перерыв (5 минут)',
			'Продолжайте работать, пока задача не будет выполнена.',
			'Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).',
		];
		const questList = el('ul.pomodoro-tasks__quest-list',
			questListItems.map(item => el('li.pomodoro-tasks__list-item', item)));

		return questList;
	}

	createTasks() {
		const listTasks = [];

		this.tomato.tasks.forEach((task, index) => {
			let taskClass;
			if (task.importance === 'major') {
				taskClass = 'important';
			} else {
				taskClass = task.importance === 'standart' ? 'so-so' : 'default';
			}

			const listTask = el(`li.pomodoro-tasks__list-task.${taskClass}`);
			listTask.dataset.id = task.id;
			const countNumber = el('span.count-number', index + 1);
			const buttonTaskText = el(
				'button.pomodoro-tasks__task-text',
				task.title,
			);
			const buttonTask = el('button.pomodoro-tasks__task-button');

			if (task.id === this.tomato.activeTask?.id) {
				buttonTaskText.classList.add('pomodoro-tasks__task-text_active');
			}
			setChildren(listTask, [countNumber, buttonTaskText, buttonTask]);
			listTasks.push(listTask);
		});

		return listTasks;
	}
}
