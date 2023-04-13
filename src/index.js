import './index.html';
import './index.scss';
import {renderTomato} from './modules/render.js';
import {Task, TaskManager} from './modules/task.js';
import {TimerPomodoro} from './modules/timer.js';


let count = 0;
const imp = ['default', 'important', 'so-so'];
document.querySelector('.button-importance').
	addEventListener('click', ({target}) => {
		count += 1;
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

// const takeElephant = new Task('take elephant');
// console.log(takeElephant);
// takeElephant.changeTaskTitle('open refrigirator');
// takeElephant.increasePomodoro();



// const timerPomodoro = new TimerPomodoro({
// 	timeTask: 0.5,
// 	timePause: 0.25,
// 	timeBigPause: 1,
// 	tasks: [task1, task2],
// });

// console.log(timerPomodoro.timeTask);
// console.log(timerPomodoro.timePause);
// console.log(timerPomodoro.timeBigPause);
// console.log(timerPomodoro.tasks);
// console.log(timerPomodoro.activeTask);
// timerPomodoro.activateTask(task1.id);

// timerPomodoro.startTask();

const taskManager = new TaskManager();

const task1 = new Task('take elephant', 0, 'low');
const task2 = new Task('open refrigirator', 0, 'medium');
const task3 = new Task('put elephant', 0, 'high');


taskManager.addTask(task1);
taskManager.addTask(task2);
taskManager.addTask(task3);

console.log(taskManager);

const tasks = taskManager.getTasks();
console.log(tasks);

renderTomato();
