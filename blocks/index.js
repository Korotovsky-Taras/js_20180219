import {Auth, defaultLogin} from './auth/auth';
import {Chat} from './chat/chat';
import {Message} from './message/message';
import {request} from '../modules/utils';

window.addEventListener('DOMContentLoaded', () => {
    let auth = new Auth(document.querySelector('.js-auth'), {});
    let chat = new Chat(document.querySelector('.js-chat'), {});
    let message = new Message(document.querySelector('.js-message'), {});

    window.chat = chat;
    window.message = message;
    window.auth = auth;

	request('get', '/data/data.json')
			.then(({json}) => {
				let dataUsers = JSON.parse(json);
				Promise.all(dataUsers.reduce((res, cur) => {
					//Обрабатываем только если есть значение user
					if(cur.hasOwnProperty('user')){
						res.push(request('get', `/data/${cur.user}.json`));
					}
					return res;
				}, [])).then(result => {
					if(result instanceof Array) {
						for(let user of result){
							if(user.json && user.status && user.status < 400){
								console.log(JSON.parse(user.json))
							} else {
								//Почистить и перезаписать data.json?
							}
						}
					}
				});

			});

});
