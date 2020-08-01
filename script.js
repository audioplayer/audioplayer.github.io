
let odd = 2;
let mus = 1;
let audioCou = 0;
let tog = 2;
let oddprev = 2;
let oddlove = 2;

let main = []
let lovi = []


let onAlla = document.querySelector('.notif')
onAlla.style.height = window.innerHeight + 'px';

function slide(value){
	let inp = document.querySelector('#file')
	let petq = (value-inp.min)/(inp.max-inp.min)*100;
	let back = 'linear-gradient(to right, black 0%, black ' + petq + '%, white ' + petq + '%, white 100%)'
	inp.style.background = back;
}

function doa(){
		
		let mus = document.getElementById("music");
		let currentTim = mus.currentTime;
		let dur = mus.duration;
		let n = document.querySelector("#file")
		   		// let div = document.querySelector(".div")
		let x = n.getAttribute('value')
		slide(currentTim)
	    n.setAttribute('max', dur)
		if(x != dur){
		    n.setAttribute('value', currentTim)
		 }
		 else {
		    clearInterval(progress)
		 }
}
			

function interVal () {

	
	let mus = document.getElementById("music");
	let currentTim = Math.ceil(mus.currentTime);
	let dur = mus.duration;
	let par = document.getElementById("curTime");
	let minutes =  Math.floor(currentTim / 60);
	let minindur = Math.floor(dur / 60);
	if(minutes > 0){
		currentTim -= minutes * 60;
	}

	if(minindur > 0){
		dur -= minindur * 60;
	}
	if(currentTim < 10) {
		currentTim = "0" + currentTim;
	}

	par.innerText = minutes + ':' +currentTim + "        "+ minindur + ':' + Math.ceil(dur)+ "s";
	
	if(mus.currentTime ==  mus.duration){next()}
	} 


function startPlay() {
	let progress = setInterval(doa,1200)

	let curInt = setInterval(interVal , 100)

	let mus = document.getElementById("music");

	let pause = document.getElementById("playpause");
	
	
	if (odd%2 === 0) {
		odd++
		mus.play();
		pause.src = "icons/svg/pause.svg"
	}
	else {
		odd++
		mus.pause();
		pause.src = "icons/svg/play.svg"
	}
}
function startPlayOth() {
	let curInt = setInterval(interVal , 100)
	let mus = document.getElementById("music");

	let pause = document.getElementById("playpause");
	odd++
	mus.play();
	pause.src = "icons/svg/pause.svg"
}
function goTo(time) {
	

	let curInt1 = setInterval(interVal , 100)

	let mus = document.getElementById("music");

	if(mus.currentTime >= 0 && mus.currentTime <  mus.duration){
		let pause = document.getElementById("playpause");
		mus.currentTime += time;
		mus.play();
		pause.src = "icons/svg/pause.svg"
	}
}
function next () {
	let mus = document.getElementById("music");
	let source = document.getElementById("source")
	let sngName = document.getElementById("sngName")
	let singName = document.getElementById("singName")
	let cover = document.getElementById('cover')
	let cont = document.getElementById('allCont')
	audioCou += 1;
	if(audioCou === main.length) {
		audioCou = 0;
	}
	if(main == lovi) {
		let txt = main[audioCou].author;
	let sing = main[audioCou].name

	if(sing.length > 20) {
		sing = sing.split('').slice(0,20).join(" ") + "..."
	}
	if(txt.length > 20) {
		txt = sing.split('').slice(0,20).join(" ") + "..."
	}
	

	source.src = main[audioCou].src;
	sngName.innerHTML = txt;
	singName.innerHTML = sing;
	cover.setAttribute('src', main[audioCou].cover)
	cont.style.backgroundImage = `url(${main[audioCou].autpic}`;
	mus.load()
	startPlayOth()
	}
	else{
	let txt = main[audioCou][0].author;
	let sing = main[audioCou][0].name

	if(sing.length > 20) {
		sing = sing.split('').slice(0,20).join(" ") + "..."
	}
	if(txt.length > 20) {
		txt = sing.split('').slice(0,20).join(" ") + "..."
	}
	

	source.src = main[audioCou][0].src;
	sngName.innerHTML = txt;
	singName.innerHTML = sing;
	cover.setAttribute('src', main[audioCou][0].cover)
	cont.style.backgroundImage = `url(${main[audioCou][0].autpic}`;
	mus.load()
	startPlayOth()
	}
}
function prev() {
	let mus = document.getElementById("music");
	let source = document.getElementById("source")
	let sngName = document.getElementById("sngName")
	let singName = document.getElementById("singName")
	let cover = document.getElementById('cover')
	let cont = document.getElementById('allCont')

	if(audioCou <= 0) {
		audioCou = music.length;
	}
	audioCou -= 1;

	source.src =  main[audioCou][0].src

	let txt = main[audioCou][0].author;
	let sing = main[audioCou][0].name;

	if(sing.length > 20) {
		sing = sing.split('').slice(0,20).join(" ") + "..."
	}
	if(txt.length > 20) {
		txt = sing.split('').slice(0,20).join(" ") + "..."
	}

	cover.setAttribute('src', main[audioCou][0].cover)
	source.src = main[audioCou][0].src;
	sngName.innerHTML = txt;
	singName.innerHTML = sing;
	cont.style.backgroundImage = `url(${main[audioCou][0].autpic}`;

	mus.load()
	startPlayOth()
	
}
function volumemin() {
	let mus = document.getElementById("music");

	mus.volume -= 0.2;
}
function volumehigh(){
	let mus = document.getElementById("music");

	mus.volume += 0.2;
}

function addObj(){
	let aut = document.getElementById('3');

	
	main = [{
	src:'audios/1.wav',
	name:'Example',
	author:'Someone'
}]

	fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${aut.value}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		"x-rapidapi-key": "f69da9f58cmsh14d3c68f57938d9p12d268jsn7c2c8a19d877"
	}
	})
	.then(r => {r.json().then(function(data) {
  		data.data.forEach((e) => {

  				var temp = [{
  					'src': e.preview,
  					'name': e.title_short,
  					'author': e.artist.name,
  					'album' : e.album.title,
  					'cover' : e.album.cover_xl,
  					'autpic': e.artist.picture_xl
  				}
  			];	
				main.push(temp)
				console.log(temp)
			})
  		if(main.length <= 1) {
			document.getElementById('error').style.display = "flex";
		}
		else {
			document.querySelector('.sucess').style.display = 'block'
			setTimeout(function (){document.querySelector('.sucess').style.display = 'none'}, 3000)
			}
		next()
		startPlay()
		interVal()
	});})
	.catch(err => {
		let error = document.createTextNode(err);

		document.querySelector('.error').style.display = flex;

		document.querySelector('.error').append(error)
	});

	
	let newObj = new Object()

	newObj.auth = aut.value;

	aut.value = '';

	onAlla.style.display = 'none';

	setTimeout(function(){  }, 1000);
}
function playlist(){
	let minusodd = document.getElementById('minusodd')
	let table = document.getElementById('table')
	let tbody = document.querySelector('tbody')
	let table2 = document.querySelector('table')
	let tbode = document.createElement('tbody')

	tbody.remove()
	table2.append(tbode)
	for(let i = 1; i < main.length; i++){
		

		let tr = document.createElement('tr')
		let th = document.createElement('th')
		let th2 = document.createElement('th')
		let th3 = document.createElement('th')
		


		
		let txt = document.createTextNode(main[i][0].author) ;
		let sing = document.createTextNode(i + ") " +main[i][0].name);
		let album = document.createTextNode(main[i][0].album);

		tbode.append(tr)
		tr.append(th)
		th.append(sing)
		tr.append(th2)
		th2.append(txt)
		tr.append(th3)
		th3.append(album)
	}
	if(oddprev % 2 === 0) {
		++oddprev
		minusodd.style.display = 'none';
		table.style.display = 'block'
	}
	else {
		++oddprev
		minusodd.style.display = 'block';
		table.style.display = 'none'
	}
}

function addlove() {
	document.querySelector('.notif-suc').style.display = 'block';
	setTimeout(function() {document.querySelector('.notif-suc').style.display = 'block';}, 2000)

	lovi.push(main[audioCou][0])

	jsonmus = JSON.stringify(lovi);
	localStorage.setItem("lovemusics", jsonmus);

}
function lovelist() {
	lovemus = localStorage.getItem("lovemusics");
	lovi = JSON.parse(lovemus);


	let minusodd = document.getElementById('minusodd')
	let table = document.getElementById('table')
	let tbody = document.querySelector('tbody')
	let table2 = document.querySelector('table')
	let tbode = document.createElement('tbody')
	let button = document.createElement('button')
	let findButton = document.querySelector('.run-butt')

	if(document.body.contains(findButton)){
		findButton.remove()
	}
	button.setAttribute('class', 'run-butt')
	button.innerHTML = 'Run This Playlist';
	button.setAttribute('onclick', 'maintolove()')
	
	table.prepend(button)

	
	tbody.remove()
	table2.append(tbode)
	for(let j = 1; j < lovi.length; j++){

		let tr = document.createElement('tr')
		let th = document.createElement('th')
		let th2 = document.createElement('th')
		let th3 = document.createElement('th')
		
		let txt = document.createTextNode(lovi[j].author) ;
		let sing = document.createTextNode(j + ") " +lovi[j].name);
		let album = document.createTextNode(lovi[j].album);

		tbode.append(tr)
		tr.append(th)
		th.append(sing)
		tr.append(th2)
		th2.append(txt)
		tr.append(th3)
		th3.append(album)
	}
	if(oddlove % 2 === 0) {
		++oddlove
		minusodd.style.display = 'none';
		table.style.display = 'block'
	}
	else {
		++oddlove
		minusodd.style.display = 'block';
		table.style.display = 'none'
	}
}
function maintolove() {
	main = lovi;
}