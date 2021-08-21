

//Получаем дом элемент счётчика
const countElem = document.querySelector('.score span');

//Получаем элемент таймера
const timer = document.querySelector('.time span');

//Получаем кнопку
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
	btn.disabled = true;

	const box = document.querySelector('#box');
	const ctx = box.getContext('2d');

	const cloud = new Image(),
		man = new Image(),
		rain = new Image(),
		bg = new Image(),
		road = new Image();

	cloud.src = 'img/cloud/cloud.png';
	man.src = 'img/man/man.png';
	rain.src = 'img/rain/rain.png';
	bg.src = 'img/bg.png';
	road.src ='img/road/road.png';

	//Функция для получения высоты элемента
	function getHeight(element) {
		return element.height;
	};

	//Функция для получения высоты ширины
	function getWidth(element) {
		return element.width;
	};

	//Функция для создания облаков
	function clouds() {
		ctx.drawImage(cloud, 0, 0, 200, 100);
		ctx.drawImage(cloud, 190, 0, 200, 100);
		ctx.drawImage(cloud, 350, 0, 200, 100);
	};

	//Функция для создания дорожек
	function path() {
		ctx.drawImage(road, 0, getHeight(box) - getHeight(road) + 263, getWidth(box), 150);
	};

	//Функция для создания человечка с зонтиком
	function manWithUmbrella(x) {
		ctx.drawImage(man, x, getHeight(box) - getHeight(man) - 25);
	};

	// Задний фон канваса
	function bgCanvas() {
		ctx.drawImage(bg, 0, 0, getWidth(box), getHeight(box));
	};

	//Позиция человечка по оси х
	let xPos = 150;

	//Счёт
	let count = 0;

	//Таймер
	let timers = 60;

	//Функция для создания капли
	function dropOfRain(x, y) {

		ctx.drawImage(rain, x, y);
		
	};

	//Рандомное число для координаты капли по оси х (чтобы рендерить капли рандомно по оси х)
	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};
	
	//Массив из объектов по координатам капли (х, y)
	const drops = [];
	drops[0] = {
		x: getRandomNumber(0, 540),
		y: 80
	}


	
	// Функция для рендеринга всю содержимое канваса
	function draw() {

		// console.log(man.width);
	
		countElem.textContent = count; //Счёт
	
		//Задний фон канваса
		bgCanvas();
		
		//Дорожка
		path();
	
		//Рендеринг капли с помощью перебирающего цикла
		for (let i = 0; i < drops.length; i++) {
	
			//Рендеринг капля
			dropOfRain(drops[i].x, drops[i].y)
			drops[i].y += 2; //Увеличиваем значени y в массиве при каждой вызыве функции draw()
	
			//Если капля достиг 475 координат по оси y перерендеринг капли занова с новыми координатами 

			if (drops[i].y >= 340) {

				let coordinataManXA = xPos;
				let coordinataManXB = coordinataManXA + 119;

				if (drops[i].x >= coordinataManXA && drops[i].x <= coordinataManXB && drops[i].y <= getHeight(box) - getHeight(man) - 25) {
					drops[0] = {
						x: getRandomNumber(0, 550),
						y: 80
					}
					count += 1;
				}

			}

			if (drops[i].y >= 475) {
				
				drops[0] = {
					x: getRandomNumber(0, 550),
					y: 80
				}
			}
	
			
		}
	
		//Облако
		clouds(); 
	
		//Человечек с зонтиком 
		manWithUmbrella(xPos);

		//Анимация
		let id = requestAnimationFrame(draw);
		if (timers === 0) {
			box.width = 550;
			box.height = 550;
			cancelAnimationFrame(id);
		}
	
	};
	
	//Управление человечка
	document.addEventListener('keydown', (e) => {
		if (e.keyCode === 37) {
			if (xPos >= 1) {
				xPos -= 8;
			}
		}
	
		if (e.keyCode === 39) {
			if (xPos <= getWidth(box) - getWidth(man)) {
				xPos += 8;
			}
		}
	});

	//Функция для добавки 0 если передаваемый аргумент меньше 10, если больше просто возвращает цифру
	function setZero(number) {
		if (number < 10) {
			return `0${number}`;
		}
		if (number >= 10) {
			return `${number}`;
		}
	}

	
	//Таймер
	let idTime = setInterval(() => {

		if (timers === 1) {
			clearInterval(idTime);
			btn.disabled = false;
		}
		timers--;
		timer.textContent = `00:${setZero(timers)}`;
		
	}, 1000);
	

	//Вызов функци после того как загрузились все изображения
	road.onload = draw;
});

