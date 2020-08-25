let card=document.getElementById('card');
let questiontxt=document.getElementById('questiontxt');
let optiona=document.getElementById('optiona');
let optionb=document.getElementById('optionb');
let optionc=document.getElementById('optionc');
let optiond=document.getElementById('optiond');
let next=document.getElementById('next');
let previous=document.getElementById('previous');
let finish=document.getElementById('finish');
let startbtn=document.getElementById('startbtn');
let name=document.getElementById('name');
let qholder=document.getElementById('qholder');
let introduction=document.getElementById('introduction');


let current=0;
let response=[];
let order=[];
let status=[];
let score=0;
let player='';

initialize();
function initialize(){
	qholder.style.display='none';
	introduction.style.display='block';
	name.defaultValue=player;
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

startbtn.addEventListener('click',start)
function start(){
	console.log(name.value);
	if (name.value=='') {
		document.getElementById('error').innerText="Name cannot be empty";
		return 0;
	}
	shuffle();
	assignQuestion(order[current]);
	player=name.value;
	introduction.style.display='none';
	qholder.style.display='block';
	
	console.log(order);
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
}

function selectOption(res){
	if(status[current]!=undefined){return 0}
	response[current]=res;	
	if(questions[current].answer==res){
		status[current]=true;
		score++;
		response[current]=res;
	}
	else{
		status[current]=false;
		response[current]=res;
	}	
	color(res);
	hovering();
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
	document.querySelectorAll('.opt').forEach(function(y){
		y.classList.remove('hover');	
		if(status[current]==undefined){
			y.classList.add('hover');
		}
	})
}

next.addEventListener('click',()=>{
	current++;
	assignQuestion(order[current]);	
})
previous.addEventListener('click',()=>{
	current--;
	assignQuestion(order[current]);	
})
finish.addEventListener('click',()=>{
	card.innerHTML=`<h6>${player}, your Score Is...<h6>`;
	card.innerHTML+=`<h5>${score}</h5>`;
	card.innerHTML+=`<span id="retry" class="qbtn">Retry?</span>`;
	document.getElementById('retry').addEventListener('click',()=>{location.reload();})
})

optiona.addEventListener('click',()=>{selectOption('a')});
optionb.addEventListener('click',()=>{selectOption('b')});
optionc.addEventListener('click',()=>{selectOption('c')});
optiond.addEventListener('click',()=>{selectOption('d')});


