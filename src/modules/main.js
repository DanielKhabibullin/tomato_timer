import {Tomato} from './tomato.js';

const test = {
	time: 5,
	pause: 3,
	bigPause: 5,
};

const tomatoTimer = new Tomato(test, document.querySelector('.main'));

console.log('tomatoTimer: ', tomatoTimer);
