let card=document.getElementById('card');
let questiontxt=document.getElementById('questiontxt');
let optiona=document.getElementById('optiona');
let optionb=document.getElementById('optionb');
let optionc=document.getElementById('optionc');
let optiond=document.getElementById('optiond');
let next=document.getElementById('next');
let previous=document.getElementById('previous');
let finish=document.getElementById('finish');

let current=0;
let response=[];
let status=[];
let score=0;

start();
function start(){
	assignQuestion(current);
}

function assignQuestion(n){
	if(current==0){
		previous.style.display='none';
	}else{previous.style.display='inline';}
	if(current==9){
		next.style.display='none';
	}else{next.style.display='inline';}
	questiontxt.innerText=questions[n].question;
	optiona.innerText=questions[n].options.a;
	optionb.innerText=questions[n].options.b;
	optionc.innerText=questions[n].options.c;
	optiond.innerText=questions[n].options.d;
	color(response[current]);
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
}

function color(res){
	let temp='option'
	document.getElementById(temp+'a').style.backgroundColor='';
	document.getElementById(temp+'b').style.backgroundColor='';
	document.getElementById(temp+'c').style.backgroundColor='';
	document.getElementById(temp+'d').style.backgroundColor='';
	temp+=res;
	if(res==questions[current].answer){
		document.getElementById(temp).style.backgroundColor='green';
	}
	else if(res!=questions[current].answer&&res!=undefined){
		document.getElementById(temp).style.backgroundColor='red';
	}
}

next.addEventListener('click',function(){
	current++;
	assignQuestion(current);	
})
previous.addEventListener('click',function(){
	current--;
	assignQuestion(current);	
})

optiona.addEventListener('click',()=>{selectOption('a')});
optionb.addEventListener('click',()=>{selectOption('b')});
optionc.addEventListener('click',()=>{selectOption('c')});
optiond.addEventListener('click',()=>{selectOption('d')});


