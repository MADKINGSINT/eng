const qa = [
	{
		question: `You can travel almost anywhere in the world, and you will probably see graffiti. Although graffiti is more common in big cities, today you may find it in almost any region or district, big or small. It's everywhere: on trains, walls, bridges and buildings. Love it or hate it but graffiti is part of the everyday urban world. Some people consider it art while others think it's vandalism. However, few of them really know how old graffiti is.

        The word graffiti itself probably comes from the old Greek verb which means “to write”. Writings on walls already existed in ancient Rome. The Romans cut graffiti on walls and monuments. What was it like, you may ask? Ancient graffiti was absolutely different from today's. It showed phrases of love, political ideas, simple thoughts, magic spells, alphabets, and famous quotations from literature.
        
        Modern graffiti dates back to the US of the 1960s. At that time for young people it was a form of self-expression and a political protest. Teenage groups in New York, for example, painted graffiti to mark their territory. Later, there started competitions between different groups. That meant that the quality of graffiti became more important than just the amount of it.
        
        Today graffiti has travelled all over the world. However, it is still an illegal art. It has been always painted on private or public property, like cars, trains, fences and house walls. As a result most people see it as vandalism. Besides, it's rather hard to clean graffiti paints, and cities spend millions every year on it. So, in most countries graffiti is forbidden.
        
        On the other hand, modern graffiti is, by its nature, a form of painting. After all, the artists uses the same methods and materials. However, instead of paints a graffiti artist prefers sprays, markers, and crayons. Some of their works are really impressive and fascinating, they are powerful and have a deep meaning. Graffiti often makes grey walls look cheerful.
        
        The purpose of some graffiti is to spread and declare social ideas. That's why a lot of graffiti paintings have political topics. Some cities have special places where the walls of different buildings can be used to create pieces of graffiti art.
        
        Probably, the most famous graffiti artist is Banksy, who comes from Bristol, England. He strongly believes that writing graffiti on buildings is an effective way to communicate with people. His works are very often aggressive, provocative and even rude. In his graffiti he expresses personal political and social views, which are against war and capitalism.
        
        Banksy is known not only for his graffiti works. He also likes playing “jokes”. He sometimes unofficially hangs his works in the main art galleries. He doesn't want to be paid for them because he's sure art should be free. He says he wants to see how long it will take people to notice it. Once Banksy went into the Tate Gallery dressed as an old man, and glued a picture to the museum wall in protest of the Iraq War.`,
		correct: "Дальше",
		incorrect: []
	},
    {
        question: `A number of the American graffiti fans later became well-known artists and designers.`,
        correct: "Not stated",
        incorrect:["True", "False"]
    }


];
const answerContainer = document.querySelector(".a");
const questionCon = document.querySelector(".q");
const question = document.querySelector(".q-item");
const bar = document.querySelector(".bar");
const barContainer = document.querySelector(".progressBar");
const progressBar = document.querySelector(".bar-w");
const next = document.querySelector(".next");
const startBtn = document.querySelector(".start-game");
const questions = [];
const player = { score: 0, answers: [] };
let cur = 0;
const holder = [];
(() => {
	loadQuestions(); // load questions immediately
})();

function loadQuestions() {
	qa.forEach((e) => {
		// loop through "qa"
		let temp = [];
		e.incorrect.forEach((ans) => {
			// loop through 'qa.incorrect' => place false on incorrect items
			let obj = {
				response: ans,
				correct: false
			};
			temp.push(obj);
		});

		let obj = {
			// place true on correct items
			response: e.correct,
			correct: true
		};
		temp.push(obj);
		let mainTemp = {
			question: e.question,
			options: temp, // both correct and incorrect options are stored here
			correct: e.correct // correct answer
		};
		questions.push(mainTemp); // push into global
	});
}
function newQuestion() {
	if (cur >= questions.length) {
		next.innerHTML = "Счет";
		results();
	} else {
		next.innerHTML = "Следующий вопрос";
	}
	answerContainer.innerHTML = "";
	const el = questions[cur];
	progess();
	console.log(el);
	el.options.sort(() => {
		return 0.5 - Math.random();
	});

	const capQuestion = el.question.charAt(0).toUpperCase() + el.question.slice(1);
	question.textContent = `${capQuestion}?`;
	answerContainer.innerHTML = "";

	el.options.forEach((option) => {
		const divOption = document.createElement("div");
		holder.push(divOption);
		divOption.correctAnswer = el.correct;
		divOption.que = capQuestion;
		divOption.isITcorrect = option.correct;
		divOption.classList.add("a-item");
		divOption.textContent = option.response;
		answerContainer.append(divOption);

		divOption.addEventListener("click", optSelect);
	});
}

// if selected option is T || F
function optSelect(e) {
	endTurn();
	if (e.target.isITcorrect) {
		player.score++;
		let obj = {
			que: e.target.que,
			res: e.target.textContent,
			correct: true,
			qNum: cur
		};
		player.answers.unshift(obj);
		e.target.style.color = "#008205";
		e.target.style.backgroundColor = "#dbfff3";
	} else {
		let obj = {
			que: e.target.que,
			res: e.target.textContent,
			correct: false,
			qNum: cur
		};
		player.answers.unshift(obj);
		e.target.style.color = "#e91e63";
		e.target.style.backgroundColor = "#ffd3e2";
	}
	e.target.style.cursor = "pointer";
	// player.answers.push(temp);
}

// OPTIONS not selected have a unique style

function endTurn() {
	holder.forEach((el) => {
		el.removeEventListener("click", optSelect);
		el.style.backgroundColor = "#ffffff05";
		el.style.color = "#565656";
		el.style.cursor = "default";
	});
	cur++;
	if (cur >= questions.length) {
		next.innerHTML = "Счет";
	} else {
		next.innerHTML = "Следующий вопрос";
	}
}

function progess() {
	bar.style.width = "60%";
	next.classList.add("progressActive");
	question.style.display = "block";

	const currentQ = cur + 1;
	const progressIs = (currentQ / questions.length) * 100;

	if (progressIs === 100) {
		next.innerHTML = "Счет";
		progressBar.style.maxWidth = "100%";
	}
	progressBar.style.width = `${progressIs}%`;
}
startBtn.addEventListener("click", newQuestion);
next.addEventListener("click", () => {
	if (cur >= questions.length) {
		results();
	} else {
		newQuestion();
	}
});

// update score while answering each Q

function results() {
	console.log(player.score);
	question.style.display = "block";
	answerContainer.innerHTML = "";
	question.textContent = `Итоги`;
	player.answers.forEach((ans, i) => {
		const resultsMockup = `
		<div class="result">
		<div class="result-q"><span>${ans.qNum}</span> ${ans.que}</div>
		<div>${ans.res}</div>
		<div>${ans.correct}</div>
		</div>`;
		answerContainer.insertAdjacentHTML("afterbegin", resultsMockup);
	});
	const progressIs = (player.score / questions.length) * 100;
	next.innerHTML = `${player.score} / ${questions.length} очков`;

	if (progressIs <= 50) {
		bar.style.backgroundColor = `#ff8585`;
		progressBar.style.backgroundColor = `red`;
	} else if (progressIs <= 75) {
		bar.style.backgroundColor = `#ffc582`;
		progressBar.style.backgroundColor = `#ff8900`;
	} else {
		progressBar.style.backgroundColor = `#00d15e`;
		bar.style.backgroundColor = `#bcffda`;
	}

	progressBar.style.width = `${progressIs}%`;

	loadQuestions();
}
function restartGame() {
	newQuestion();
}
