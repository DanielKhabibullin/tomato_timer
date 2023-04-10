import './index.html';
import './index.scss';
import {Task} from './modules/task.js';
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

const task1 = new Task('take elephant');
const task2 = new Task('open refrigirator');

const timerPomodoro = new TimerPomodoro({
	timeTask: 0.5,
	timePause: 0.25,
	timeBigPause: 1,
	tasks: [task1, task2],
});

console.log(timerPomodoro.timeTask);
console.log(timerPomodoro.timePause);
console.log(timerPomodoro.timeBigPause);
console.log(timerPomodoro.tasks);
timerPomodoro.activateTask(task1.id);
console.log(timerPomodoro.activeTask);

timerPomodoro.startTask();
