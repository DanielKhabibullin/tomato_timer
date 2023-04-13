import {el, setChildren} from 'redom';

export const renderTomato = () => {
	const windowPanelTitle = el('p.window__panel-title', 'Сверстать сайт');
	const windowPanelTaskText = el('p.window__panel-task-text', 'Томат 2');
	const windowPanel = el('div.window__panel', [
		windowPanelTitle,
		windowPanelTaskText,
	]);

	const windowTimerText = el('p.window__timer-text', '25:00');
	const buttonPrimary = el('button.button.button-primary', 'Старт');
	const buttonSecondary = el('button.button.button-secondary', 'Стоп');

	const windowBody = el('div.window__body', [
		windowTimerText,
		el('div.window__buttons', [
			buttonPrimary,
			buttonSecondary,
		]),
	]);

	const inputTask = el('input.task-name.input-primary',
		{type: 'text', name: 'task-name', id: 'task-name',
			placeholder: 'название задачи'});
	const buttonImportance = el('button.button.button-importance.default',
		{type: 'button', 'aria-label': 'Указать важность'});
	const buttonAddTask = el('button.button.button-primary.task-form__add-button',
		{type: 'submit'}, 'Добавить');

	const taskForm = el('form.task-form', {action: 'submit'}, [
		inputTask,
		buttonImportance,
		buttonAddTask,
	]);
	const pomodoroFormWindow = el('div.pomodoro-form.window',
		[windowPanel, windowBody, taskForm]);

	const questList = el('ul.pomodoro-tasks__quest-list', [
		el('li.pomodoro-tasks__list-item',
			'Напишите название задачи чтобы её добавить'),
		el('li.pomodoro-tasks__list-item',
			'Чтобы задачу активировать, выберите её из списка'),
		el('li.pomodoro-tasks__list-item', 'Запустите таймер'),
		el('li.pomodoro-tasks__list-item', 'Работайте пока таймер не прозвонит'),
		el('li.pomodoro-tasks__list-item', 'Сделайте короткий перерыв (5 минут)'),
		el('li.pomodoro-tasks__list-item',
			'Продолжайте работать, пока задача не будет выполнена.'),
		el('li.pomodoro-tasks__list-item',
			'Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).'),
	]);

	const countNumber = (number) => el('span.count-number', number);
	const taskText = (text, isActive) =>
		el(`button.pomodoro-tasks__task-text${isActive ?
		'.pomodoro-tasks__task-text_active' : ''}`, text);
	const taskButton = el('button.pomodoro-tasks__task-button');

	const questTasks = el('ul.pomodoro-tasks__quest-tasks', [
		el('li.pomodoro-tasks__list-task.important', [
			countNumber('1'),
			taskText('Сверстать сайт', true),
			taskButton,
		]),
		el('li.pomodoro-tasks__list-task.so-so', [
			countNumber('2'),
			taskText('Оплатить налоги', false),
			taskButton,
		]),
		el('li.pomodoro-tasks__list-task.default', [
			countNumber('3'),
			taskText('Проверить валидность', false),
			taskButton,
		]),
	]);

	const deadlineTimer = el('p.pomodoro-tasks__deadline-timer', '1 час 30 мин');

	const pomodoroTasks = el('div.pomodoro-tasks', [
		el('p.pomodoro-tasks__header-title', 'Инструкция:'),
		questList,
		questTasks,
		deadlineTimer,
	]);

	const mainSection = el('section.main', [
		el('div.container.main__container', [
			pomodoroFormWindow,
			pomodoroTasks,
		]),
	]);
	return {
		windowPanelTitle,
		windowPanelTaskText,
		windowTimerText,
		buttonPrimary,
		buttonSecondary,
		inputTask,
		buttonImportance,
		buttonAddTask,
		taskForm,
		mainSection,
	};
};
const app = el('main');
setChildren(app, renderTomato());
document.body.appendChild(app);
