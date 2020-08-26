let card=document.getElementById('card');
let questiontxt=document.getElementById('questiontxt');
let optiona=document.getElementById('optiona');
let optionb=document.getElementById('optionb');
let optionc=document.getElementById('optionc');
let optiond=document.getElementById('optiond');
let next=document.getElementById('next');
let previous=document.getElementById('previous');
let submit=document.getElementById('submit');
let startbtn=document.getElementById('startbtn');
let name=document.getElementById('name');
let qholder=document.getElementById('qholder');
let introduction=document.getElementById('introduction');
let time=document.getElementById('time');
let results= document.getElementById('results');
let error = document.getElementById('error');

let current=0;
let response=[];
let order=[];
let status=[];
let visited=[];
let correct=0;
let wrong=0;
let score=0;
let player='';
let timer;
let finaltime=30;

initialize();
function initialize(){
	qholder.style.display='none';
	introduction.style.display='block';
	results.style.display='none';
	name.defaultValue=player;
	current=0;
	response=[];
	order=[];
	status=[];
	visited=[];
	correct=0;
	wrong=0;
	score=0;
	finaltime=30;
}

function shuffle() {
	let temp,rand;
	for (var i = 0; i < 10; i++) {
		order[i]=i;
		}
	for (var i = 9; i >= 0; i--) {
		rand= Math.floor(Math.random() * i);
		temp=order[i];
		order[i]=order[rand];
		order[rand]=temp;
	}
}

function start(){
	if (name.value=='') {
		error.innerText="Name cannot be empty";
		return 0;
	}
	error.innerText='';
	shuffle();
	assignQuestion(order[current]);
	player=name.value;
	introduction.style.display='none';
	qholder.style.display='block';
	document.querySelectorAll('.icon').forEach((icon)=>{
		icon.classList.add('navigate');

	})		
	navigationEvent();
	navbarColor();
	time.innerText='30';
	timer = setInterval(updateTime, 1000);
}

function updateTime(){
	let now = parseInt(time.innerText);
	now--;
	finaltime=now;
	time.innerText=now;
	if(now==0){
		submitQuiz();
	}
}

function assignQuestion(n){
	if(current==0){
		previous.style.display='none';
	}else{previous.style.display='inline-block';}
	if(current==9){
		next.style.display='none';
	}else{next.style.display='inline-block';}
	questiontxt.innerText=questions[n].question;
	optiona.innerText=questions[n].options.a;
	optionb.innerText=questions[n].options.b;
	optionc.innerText=questions[n].options.c;
	optiond.innerText=questions[n].options.d;
	color(response[current]);
	hovering();
	visited[current]=true;
	navbarColor();
}

function selectOption(res){
	if(status[current]!=undefined){return 0}
	response[current]=res;	
	if(questions[order[current]].answer==res){
		status[current]=true;
		response[current]=res;
		correct++;
	}
	else{
		status[current]=false;
		response[current]=res;
		wrong++;
	}	
	color(res);
	hovering();
	navbarColor();
}

function color(res){
	let temp='option'
	document.getElementById(temp+'a').style.backgroundColor='';
	document.getElementById(temp+'b').style.backgroundColor='';
	document.getElementById(temp+'c').style.backgroundColor='';
	document.getElementById(temp+'d').style.backgroundColor='';
	temp+=res;
	if(res==questions[order[current]].answer){
		document.getElementById(temp).style.backgroundColor='green';
	}
	else if(res!=questions[order[current]].answer&&res!=undefined){
		document.getElementById(temp).style.backgroundColor='red';
	}
}

function hovering(){
	document.querySelectorAll('.opt').forEach((y)=>{
		y.classList.remove('hover');	
		if(status[current]==undefined){
			y.classList.add('hover');
		}
	})
}

function navigationEvent(){
	document.querySelectorAll('.navigate').forEach((nav)=>{
		nav.addEventListener('click',()=>{
			current=parseInt(nav.innerText)-1;
			assignQuestion(order[current]);
		})
	})
}

function navbarColor(){
	document.querySelectorAll('.icon').forEach((nav)=>{
		let temp=parseInt(nav.innerText)-1;
		if(status[temp]==true){
			nav.style.backgroundColor='#53ff1a';
		}
		else if(status[temp]==false){
			nav.style.backgroundColor='#ff6666';
		}
		else if(visited[temp]==true){
			nav.style.backgroundColor='#80ccff';
		}
		else{
			nav.style.backgroundColor='';
		}		
	})
}

function calculateScore(){
	score=(5*correct) - (2*wrong) + (finaltime/2);
}

function highscore(){
	let datetime=new Date();
	let temp1=datetime.toString();
	let temp2 = temp1.split("GMT");  //To remove timezone part of date
	datetime=temp2[0];
	if(localStorage.getItem('highscore')==null){
		localStorage.setItem('highscore',score);
		localStorage.setItem('name',player);
		localStorage.setItem('datetime',datetime);
	}
	else{
		if(parseInt(localStorage.getItem('highscore'))<score){
			localStorage.setItem('highscore',score);
			localStorage.setItem('name',player);
			localStorage.setItem('datetime',datetime);
		}
	}
}

function submitQuiz(){
	document.querySelectorAll('.icon').forEach((icon)=>{
		icon.classList.remove('navigate');
	})
	qholder.style.display='none';
	results.style.display='block';
	clearInterval(timer);
	calculateScore();
	highscore();
	results.innerHTML=`<h6>${player}, your Score Is...<h6>`;
	results.innerHTML+=`<h5>${score}</h5>`;
	results.innerHTML+=`<h6>High Score : ${localStorage.getItem('highscore')}</h6>`
	results.innerHTML+=`<h4>High score by ${localStorage.getItem('name')} on ${localStorage.getItem('datetime')}</h4>`
	results.innerHTML+=`<span id="retry" class="qbtn">Retry?</span>`;
	document.getElementById('retry').addEventListener('click',()=>{
		current=0;
		response=[];
		order=[];
		status=[];
		visited=[];
		correct=0;
		wrong=0;
		score=0;
		finaltime=30;
		navbarColor();
		initialize();
	})
}

startbtn.addEventListener('click',start);

next.addEventListener('click',()=>{
	current++;
	assignQuestion(order[current]);	
})
previous.addEventListener('click',()=>{
	current--;
	assignQuestion(order[current]);	
})
submit.addEventListener('click',submitQuiz)

optiona.addEventListener('click',()=>{selectOption('a')});
optionb.addEventListener('click',()=>{selectOption('b')});
optionc.addEventListener('click',()=>{selectOption('c')});
optiond.addEventListener('click',()=>{selectOption('d')});
