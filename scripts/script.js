function popup(wind){
	switch(wind){
		case 'dark':
			var popup = document.getElementsByClassName('loginDark')[0];
			var computedStyle = getComputedStyle(popup, "");
			if(computedStyle.display == "none"){
				popup.style.display = "block";
				popup.getElementsByClassName('login')[0].style.display = "block";
			}
			else{
				popup.style.display = "none";
				popup.getElementsByClassName('reg')[0].style.display = "none";
			}
			break;
		case 'reg':
			var popup = document.getElementsByClassName('reg')[0];
			var computedStyle = getComputedStyle(popup, "");
			if(computedStyle.display == "none"){
				popup.style.display = "block";
				popup.previousElementSibling.style.display = "none";
			}
			else{
				popup.style.display = "none";
				popup.previousElementSibling.style.display = "block";
			}
			break;
	}
}	
function closeImage(){
	var popup = document.getElementsByClassName('imageDark')[0];
	popup.style.display = "none";
}
function verifyForm(elem){
	var result = true;
	var message = "";
	if(elem.parentNode.parentNode.className == "login")
		var form = document.forms.login;
	else if(elem.parentNode.parentNode.className == "reg")
		var form = document.forms.reg;
	var name = form.elements.name;
	var password = form.elements.password;
	if(name.value.length == 0){
		message += "Слишком короткое имя\n";
		result = false;
	}
	if(password.value.length == 0){
		message += "Не введён пароль\n";
		result = false;
	}
	if(message)
			alert(message);
	return result;
}
function done(elem){
	if(verifyForm(elem)){
		popup('dark');
		var value = elem.parentNode.parentNode.querySelector("input[name='name']").value;
		if(value.toLowerCase() == "вадян" || value.toLowerCase() == "vadyan")
			document.getElementsByClassName('hello')[0].innerHTML = "Эээх Вадян, Вадян...";
		else document.getElementsByClassName('hello')[0].innerHTML = "Добро пожаловать,<br>" + value + " !";
		document.querySelector('.enter').style.display = "none";
		document.querySelector('.exit').style.display = "inline-block";
		elem.parentNode.parentNode.querySelector("input[name='name']").value="";
		elem.parentNode.parentNode.querySelector("input[name='password']").value="";
		if(elem.parentNode.parentNode.className == "reg"){
			document.forms.reg.elements.email.value = "";
			document.forms.reg.elements.fio.value = "";
			document.querySelector("input[value='male']").checked = true;
		}
		localStorage["login"] = value;
	}
}
function exit(){
	document.getElementsByClassName('hello')[0].innerHTML = "Вы ещё не готовы.";
	document.querySelector('.enter').style.display = "inline-block";
	document.querySelector('.exit').style.display = "none";
	localStorage.removeItem('login');
}
function check(elem){
	var masFig = document.querySelectorAll('.preview figcaption');
	var masDiv = document.querySelectorAll('.mainInfo>div');
	for(var i = 0; i < masFig.length; i++)
		if(masFig[i].parentNode.parentNode != elem)
			masFig[i].style.opacity = '0';
	for(var i = 0; i < masDiv.length; i++)
		masDiv[i].style.display = 'none';
	var text = elem.getElementsByTagName('h2')[0].innerHTML;
	document.getElementsByClassName('mainInfo')[0].style.display = 'block';
	document.getElementsByClassName('step2')[0].style.opacity = "1";
	document.getElementsByClassName('step2')[0].innerHTML = 'Шаг 2. Загрузите нужные фотографии для печати ( ' + text + ' )';
	document.querySelector('.mainInfo>div.main' + elem.className).style.display = 'block';
	//Запоминаем отмеченный девайс и заголовок
	var computedStyle = getComputedStyle(elem.querySelector("figcaption"), "");
	if(computedStyle.opacity == "1"){
		document.getElementsByClassName('mainInfo')[0].style.display = 'none';
		elem.querySelector("figcaption").style.opacity = "0";
		localStorage.removeItem("checkedDevice");
		localStorage.removeItem("step2");
	}else{ 
		elem.querySelector("figcaption").style.opacity = "1";
		localStorage["checkedDevice"] = elem.className;
		localStorage["step2"] = document.getElementsByClassName('step2')[0].innerHTML;
	}
}
var miniFlash = ["IMG_5763_180x135","IMG_5761_180x240","IMG_5719_180x135",
				 "IMG_5717_180x240","IMG_5713_180x135", "IMG_5709_180x135"];
var miniMicro = ["FSCN0612_180x135","FSCN0442_180x135","FSCN0439_180x135",
				 "FSCN0418_180x135","FSCN0413_180x135"];
var miniHard = ["FSCN0408_180x135","FSCN0326_180x135","FSCN0167_180x101",
				"FSCN0118_180x101","FSCN0114_180x135","DSCN2292_180x101",
				"DSCN2078_180x101","DSCN1926_180x101"];
var miniCloud = ["DSCN1912_180x101","DSCN1860_180x101", "DSCN1385_180x101",
				 "DSCN1220_180x101","DSCN1169_180x101"];
var miniInternet=["DSCN1154_180x101", "DSCN1144_180x101","DSCN0655_180x135",
			 	  "DSCN1125_180x101"];
function load(elem){
	/*Типа фотографии загружаются, пишите это на Шарпе, если это нужно.
	 Здесь я просто загружаю несколько фотографий своего котейки, 
	 чтобы было понятно, как это будет выглядеть. Стоит отметить, 
	 что здесь версии фоток, полученные через инет-приложение, 
	 так что по идее это тоже надо будет учесть,
	  дабы не грузить несколько Мб на каждую фотку.*/
	switch(elem.parentNode.parentNode.className){
	case "mainFlash": 
		for(var i = 0; i < miniFlash.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniFlash[i] + ".jpg'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
		break;

	case "mainMicro": 
		for(var i = 0; i < miniMicro.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniMicro[i] + ".jpg'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
		break;

	case "mainHard": 
		for(var i = 0; i < miniHard.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniHard[i] + ".jpg'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
		break;

	case "mainCloud": 
		for(var i = 0; i < miniCloud.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniCloud[i] + ".jpg'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
		break;

	case "mainInternet": 
		for(var i = 0; i < miniInternet.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniInternet[i] + ".jpg'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
	}
	saveInfo();
	document.getElementsByClassName('step3')[0].style.opacity = '1';
	document.getElementsByClassName('next')[0].style.opacity = '1';
}
function showButtons(){
	var buttons = this.parentNode.parentNode.getElementsByClassName('dop');
	var figures = document.querySelectorAll('.gallery figure');
	if(this.classList.contains('chosen')){
		for(var i = 0;i < buttons.length; i++)
			buttons[i].style.display = 'none';
		this.parentNode.parentNode.getElementsByClassName('buttons')[0].style.paddingTop = '300px';
		this.style.border = '3px solid #4C2A2A';
		this.classList.remove('chosen');
		localStorage.removeItem('chosenImage');
	}else{
		for(var i = 0;i < buttons.length; i++)
			buttons[i].style.display = 'block';
		this.parentNode.parentNode.getElementsByClassName('buttons')[0].style.paddingTop = '178px';
		this.style.border = '3px solid red';
		this.classList.add('chosen');
		var firstIndex = this.getElementsByTagName('img')[0].src.lastIndexOf('/')+1;
		var lastIndex = this.getElementsByTagName('img')[0].src.lastIndexOf('.');
		var currentSrc = this.getElementsByTagName('img')[0].src.slice(firstIndex, lastIndex);
		var number = 1;
		var currentIndex = 0;
		var images = this.parentNode.getElementsByTagName('img');
		while(!images[currentIndex].parentNode.classList.contains('chosen')){
			currentIndex++;
		}
		for(var i = 0; i < currentIndex; i++)
			if(images[i].src.slice(firstIndex, lastIndex) == currentSrc)
				number++;
		localStorage['chosenImage'] = currentSrc + "_" + number;
	}
	for(var i = 0; i< figures.length; i++)
		if(figures[i] != this){
			figures[i].style.border = '3px solid #4C2A2A';
			figures[i].classList.remove('chosen');
		}
}
function deleteImage(){
	var image = document.getElementsByClassName('chosen')[0];
	image.parentNode.removeChild(image);
	saveInfo();
	//Скрываем шаг 3, если удалены все изображения
	var images = document.querySelectorAll('.gallery img');
	if(images.length == 0){
		document.getElementsByClassName('step3')[0].style.opacity = '0';
		document.getElementsByClassName('next')[0].style.opacity = '0';
	}
}
function showImage(){
	var smallSrc = document.getElementsByClassName('chosen')[0].getElementsByTagName('img')[0].src;
	var smallHeight = smallSrc.slice(smallSrc.lastIndexOf('x')+1,smallSrc.lastIndexOf('.'));
	var bigSrc = smallSrc.slice(smallSrc.lastIndexOf('/')+1,smallSrc.lastIndexOf('_'));
	var div = document.getElementsByClassName('show')[0];
	div.getElementsByTagName('img')[0].src = "images/kitty/" + bigSrc + ".jpg";
	div.parentNode.style.display = 'block';
	/*Сделано для демонстрации, другие размеры будут смотреться отвратно*/
	if(smallHeight == "240"){
		div.style.height = "820px";
		div.style.width = "618px";
	}
	else if(smallHeight == "135"){
		div.style.height = "auto";
		div.style.width = "960px";
	}
	else if(smallHeight == "101"){
		div.style.height = "auto";
		div.style.width = "960px";
	}
}
function saveInfo(){
	//сохраняем в локальное хранилище 5 строк с именами фотографий малых размеров из соответствующих галлерей
	var srcs = [];
	var galleries = document.querySelectorAll('.gallery');
	for(var i = 0; i < galleries.length; i++){
		var imgs = galleries[i].getElementsByTagName('img');
		for(var j = 0; j < imgs.length; j++)
			srcs[j] = imgs[j].src.slice(imgs[j].src.lastIndexOf('/')+1,imgs[j].src.lastIndexOf('.'));
		switch(galleries[i].parentNode.className){
			case "mainFlash":
				localStorage["flash"] = srcs;
				break;
			case "mainMicro":
				localStorage["micro"] = srcs;
				break;
			case "mainHard":
				localStorage["hard"] = srcs;
				break;
			case "mainCloud":
				localStorage["cloud"] = srcs;
				break;
			case "mainInternet":
				localStorage["internet"] = srcs;
		}	
		srcs.splice(0,srcs.length);
	}	
	//Сохраняем в локальное хранилище все выбранные фотографии, чтобы загрузить их на следующей странице
	var bigImages = document.querySelectorAll('.gallery img');
	var bigSrcs = [];
	for(var i = 0; i < bigImages.length; i++)
			bigSrcs[i] = bigImages[i].src.slice(bigImages[i].src.lastIndexOf('/')+1,bigImages[i].src.lastIndexOf('_'));
	localStorage["selectedImgs"] = bigSrcs;
}
function saveGalleryInfo(){
	var images = document.querySelectorAll('.finalGallery img');
	var srcs = "";
	for(var i = 0; i < images.length; i++)
		if(images[i].parentNode.classList.contains('selected')){
			var currentSrc = images[i].src.slice(images[i].src.lastIndexOf('/')+1,images[i].src.lastIndexOf('.'));
			var number = 1;
			for( var j = 0; j < i; j++)
				if(images[j].src.slice(images[j].src.lastIndexOf('/')+1,images[j].src.lastIndexOf('.')) == currentSrc)
					number++;
			srcs += currentSrc + "_" + number + ",";
		}
	srcs = srcs.slice(0,srcs.lastIndexOf(','));
	localStorage["gallerySelected"] = srcs;

}
function loadInfo(elem){
	//просмотр содержимого локального хранилища
	/*alert("flash: " + localStorage["flash"] + "\nmicro: " + localStorage["micro"] + "\nhard: " + 
		localStorage["hard"] + "\ncloud: " + localStorage["cloud"] + "\ninternet: " + 
		localStorage["internet"] + "\nselectedImgs: " + localStorage["selectedImgs"] + 
		"\nstep2: " + localStorage["step2"] + "\ncheckedDevice: " + localStorage["checkedDevice"]);*/
	if(localStorage['login']){
		var value = localStorage['login'];
		if(value.toLowerCase() == "вадян" || value.toLowerCase() == "vadyan")
			document.getElementsByClassName('hello')[0].innerHTML = "Эээх Вадян, Вадян...";
		else document.getElementsByClassName('hello')[0].innerHTML = "Добро пожаловать,<br>" + value + " !";
		document.querySelector('.enter').style.display = "none";
		document.querySelector('.exit').style.display = "inline-block";
	}
	switch(elem){
		case 'gallery': 
		//Загружаем фотографии, выбранные на предыдущей странице
			var selectedImgs = localStorage["selectedImgs"].split(',');
			for(var i = 0; i < selectedImgs.length; i++){
				var image = document.createElement("div");
				image.classList.add('image');
				var figure = document.createElement("figure");
				figure.onclick = selectImage;
				figure.innerHTML = "<img src='images/kitty/medium/" + selectedImgs[i] + ".jpg'><figcaption></figcaption>";
				var counterDiv = document.createElement("div");
				counterDiv.classList.add('counter');
				counterDiv.innerHTML = "<a href='#' class='button' onclick='changeValue(this)'>+</a><input type='text' value='1' disabled><a href='#' class='button' onclick='changeValue(this)'>-</a>"
				var gallery = document.getElementsByClassName('finalGallery')[0];
				image.appendChild(figure);
				image.appendChild(counterDiv);
				gallery.appendChild(image);
			}
			//Добавляем в окно групп выбранные ранее группы
			var view = document.getElementsByClassName('viewWindow')[0];
			for(var i = 0; i < localStorage["groupCounter"];i++)
				if(localStorage['group' + (i+1)])
					addGroup.call(view, i+1);
			//Отмечаем ранее отмеченные фотографии
			if(localStorage['gallerySelected']){
				var images = document.querySelectorAll('.finalGallery img');
				var gallerySelected = localStorage['gallerySelected'].split(',');
				for(var i = 0; i < images.length; i++){
					var currentSrc = images[i].src.slice(images[i].src.lastIndexOf('/')+1,images[i].src.lastIndexOf('.')); 
					var number = 1;
					for(var z = 0; z < i; z++)
						if(images[z].src.slice(images[z].src.lastIndexOf('/')+1,images[z].src.lastIndexOf('.')) == currentSrc)
							number++;
					for(var j = 0; j < gallerySelected.length; j++)
						if((currentSrc == gallerySelected[j].slice(0,gallerySelected[j].lastIndexOf('_'))) 
							&& (number == gallerySelected[j].slice(gallerySelected[j].lastIndexOf('_')+1)))
							selectImage.call(images[i].parentNode);
				}
			}
			//Добавляем кнопку "Далее", если есть хотя бы одна группа 
			var empty = true;
			for(var i = 1; i <= localStorage["groupCounter"]; i++)
				if(localStorage["group" + i]){
					empty = false;
					break;
				}
			if(!empty)
				showNext();
			break;
		case 'devices':
			if(localStorage["checkedDevice"]){
				document.querySelector('.' + localStorage["checkedDevice"] + ' figcaption').style.opacity = "1";
				document.getElementsByClassName('mainInfo')[0].style.display = 'block';
				document.getElementsByClassName('step2')[0].innerHTML = localStorage["step2"];
				document.querySelector('.mainInfo>div.main' + localStorage["checkedDevice"]).style.display = 'block';
			}
			if(localStorage["selectedImgs"]){
				document.getElementsByClassName('step3')[0].style.opacity = '1';
				document.getElementsByClassName('next')[0].style.opacity = '1';
			}
			var galleries = document.querySelectorAll('.gallery');
			var savedImages = [];
			for(var i = 0; i < galleries.length; i++){
				switch(galleries[i].parentNode.className){
					case "mainFlash":
						if(localStorage["flash"])
							savedImages = localStorage["flash"].split(',');
						break;
					case "mainMicro":
						if(localStorage["micro"])
							savedImages = localStorage["micro"].split(',');
						break;
					case "mainHard":
						if(localStorage["hard"])
							savedImages = localStorage["hard"].split(',');
						break;
					case "mainCloud":
						if(localStorage["cloud"])
							savedImages = localStorage["cloud"].split(',');
						break;
					case "mainInternet":
						if(localStorage["internet"])
							savedImages = localStorage["internet"].split(',');
				}	
				for(var j = 0; j < savedImages.length; j++){
					var figure = document.createElement("figure");
					figure.innerHTML = "<img src='images/kitty/mini/" + savedImages[j] + ".jpg'>";
					figure.onclick = showButtons;
					galleries[i].appendChild(figure);
				}
				savedImages.splice(0,savedImages.length);
			}
			if(localStorage["checkedDevice"] && localStorage["chosenImage"]){
				var images = document.querySelectorAll('.main' + localStorage['checkedDevice'] +' img');
				for(var i = 0; i < images.length; i++){
					var currentSrc = images[i].src.slice(images[i].src.lastIndexOf('/')+1,images[i].src.lastIndexOf('.')); 
					var number = 1;
					for(var z = 0; z < i; z++)
						if(images[z].src.slice(images[z].src.lastIndexOf('/')+1,images[z].src.lastIndexOf('.')) == currentSrc)
							number++;
					if((currentSrc == localStorage['chosenImage'].slice(0,localStorage['chosenImage'].lastIndexOf('_'))) 
						&& (number == localStorage['chosenImage'].slice(localStorage['chosenImage'].lastIndexOf('_')+1)))
						showButtons.call(images[i].parentNode);
				}
			}
			break;
		case 'total':
			var blank = document.getElementsByClassName('blank')[0];
			for(var i = 0; i < localStorage["groupCounter"];i++)
				if(localStorage['group' + (i+1)])
					addGroup.call(blank, i+1);
	}
}
function selectImage(){
	var computedStyle = getComputedStyle(this.querySelector("figcaption"), "");
	if(computedStyle.opacity == "1"){
		this.classList.remove('selected');
		this.querySelector("figcaption").style.opacity = "0";
		this.parentNode.getElementsByClassName('counter')[0].classList.add('fadeOut');
		this.parentNode.getElementsByClassName('counter')[0].classList.remove('fadeIn');
		var figs = document.querySelectorAll('figcaption');
		var empty = true;
		for(var i = 0; i < figs.length; i++){
			var computedStyle = getComputedStyle(figs[i], "");
			if(computedStyle.opacity == "1"){
				empty = false;
				break;
			}
		}
		if(empty){
			document.querySelector('.buttons .settings').style.opacity = "0";
			if(!document.getElementsByClassName('step5')[0].classList.contains('step6'))
				document.getElementsByClassName('step5')[0].style.opacity = "0";
		}
	}else{ 
		this.classList.add('selected');
		this.querySelector("figcaption").style.opacity = "1";
		this.parentNode.getElementsByClassName('counter')[0].classList.add('fadeIn');
		this.parentNode.getElementsByClassName('counter')[0].classList.remove('fadeOut');
		this.parentNode.querySelector('.counter input').value = "1";
		document.querySelector('.buttons .settings').style.opacity = "1";
		if(!document.getElementsByClassName('step5')[0].classList.contains('step6'))
			document.getElementsByClassName('step5')[0].style.opacity = "1";
	}
	saveGalleryInfo();
}
function changeValue(elem){
	var value = elem.parentNode.getElementsByTagName('input')[0].value;
	switch(elem.innerHTML){
		case '+':
			elem.parentNode.getElementsByTagName('input')[0].value = parseInt(value) + 1;
			break;
		case '-':
			if(value != 1)
				elem.parentNode.getElementsByTagName('input')[0].value = parseInt(value) - 1;
	}
}
function reset(){
	var figs = document.querySelectorAll('figcaption');
	var counters = document.getElementsByClassName('counter');
	for(var i = 0; i < figs.length; i++)
		if(figs[i].style.opacity == "1"){
			figs[i].style.opacity = "0";
			figs[i].parentNode.classList.remove('selected');
			counters[i].classList.add('fadeOut');
			counters[i].classList.remove('fadeIn');
		}
	document.querySelector('.buttons .settings').style.opacity = "0";
	if(!document.getElementsByClassName('step5')[0].classList.contains('step6'))
		document.getElementsByClassName('step5')[0].style.opacity = "0";
	localStorage.removeItem('gallerySelected');
}
function runSettings(){
	var settings = document.getElementsByClassName('settingsWindow')[0];
	settings.parentNode.style.display = "block";
}
function viewGroups(){
	var view = document.getElementsByClassName('viewWindow')[0];
	view.parentNode.style.display = "block";
}
function addGroup(i){
		var group = document.createElement("div");
		group.className = "group";
		/*# является распознавательным знаком в функции deleteGroup()*/
		group.innerHTML = "<h4>Группа #" + i + "</h4><a href='#' class='deleteButton' onclick='deleteGroup(this)'>X</a>";
		var ul = document.createElement("ul");
		var info = localStorage["group" + i];
		var fotosMas = info.slice(0,info.lastIndexOf(',')).split(',');
		var fotos = [];
		var numbers = [];
		var fotosStr = "";
		for(var j = 0; j < fotosMas.length; j++){
			fotos[j] = fotosMas[j].slice(0,fotosMas[j].lastIndexOf('_'));
			numbers[j] = fotosMas[j].slice(fotosMas[j].lastIndexOf('_')+1);
			fotos[j] += " (" + numbers[j] + "шт.)"; 
		}
		fotosStr = fotos.join(',');
		var properties = info.slice(info.lastIndexOf(',')+2).split(' '); 
		var aspect = properties[0];
		switch(properties[1]){
			case 'gloss':
				paper = "Глянцевая";
				break;
			case 'mat':
				paper = "Матовая";
				break;
			case 'semigloss':
				paper = "Полуглянцевая";
				break;
			case 'supergloss':
				paper = "Суперглянцевая";
				break;
			case 'satin':
				paper = "Сатин";
		}
		switch(properties[2]){
			case 'true':
				urgent = "Да";
				break;
			case 'false':
				urgent = "Нет";
		}
		ul.innerHTML = "<li><span>Фотографии:</span> " + fotosStr 
		+ "</li><li><span>Формат:</span> " + aspect +
		 "</li><li><span>Тип фотобумаги:</span> " + paper +
		  "</li><li><span>Срочная печать:</span> " + urgent + "</li>";
		group.appendChild(ul);
		if(this.classList.contains('viewWindow'))
			this.getElementsByClassName('groups')[0].appendChild(group);
		else if(this.classList.contains('blank'))
			this.insertBefore(group, this.getElementsByClassName('cost')[0]);
}
function closeSettings(){
	var settings = document.getElementsByClassName('settingsWindow')[0];
	settings.parentNode.style.display = "none";
}
function closeView(){
	var view = document.getElementsByClassName('viewWindow')[0];
	view.parentNode.style.display = "none";
}
function showNext(){
	document.getElementsByClassName('step5')[0].classList.add('step6');
	document.getElementsByClassName('step6')[0].innerHTML = 'Шаг 6. Выберите новую группу, либо нажмите "Далее"';
	document.getElementsByClassName('next')[0].style.opacity = "1";
}
function disableNext(){
	document.getElementsByClassName('step5')[0].classList.remove('step6');
	document.getElementsByClassName('step5')[0].innerHTML = 'Шаг 5. Нажмите кнопку "Настройки"';
	document.getElementsByClassName('next')[0].style.opacity = "0";
}
function clearInfo(){
	localStorage.removeItem("flash");
	localStorage.removeItem("micro");
	localStorage.removeItem("hard");
	localStorage.removeItem("cloud");
	localStorage.removeItem("internet");
	localStorage.removeItem("selectedImgs");
	localStorage.removeItem("step2");
	localStorage.removeItem("checkedDevice");
	localStorage.removeItem("chosenImage");
}
function clearGalleryInfo(){
	localStorage.removeItem('gallerySelected');
	for(var i = 0; i < localStorage["groupCounter"]; i++)
		localStorage.removeItem("group" + (i+1));
	localStorage.removeItem("groupCounter");
}
function refreshDevices(){
	clearInfo();
	location.reload();
}
function refreshGallery(){
	clearGalleryInfo();
	location.reload();
}
function saveGroup(){
	if(localStorage["groupCounter"])
		localStorage["groupCounter"] = parseInt(localStorage["groupCounter"]) + 1;
	else localStorage["groupCounter"] = 1;
	var info = "";
	var figures = document.getElementsByTagName('figure');
	for(var i = 0; i < figures.length; i++)
		if(figures[i].classList.contains('selected')){
			var firstIndex = figures[i].getElementsByTagName('img')[0].src.lastIndexOf('/')+1;
			var lastIndex = figures[i].getElementsByTagName('img')[0].src.lastIndexOf('.');
			info += figures[i].getElementsByTagName('img')[0].src.slice(firstIndex,lastIndex);
			info += "_" + figures[i].parentNode.querySelector('.counter input').value + ", ";
		}
	var form = document.forms.settings;
	info += form.elements.aspect.value + " ";
	info += form.elements.paper.value + " ";
	info += form.elements.urgent.checked;
	localStorage['group' + localStorage["groupCounter"]] = info;
	var view = document.getElementsByClassName('viewWindow')[0];
	addGroup.call(view, localStorage["groupCounter"]);
	var computedStyle = getComputedStyle(document.getElementsByClassName('next')[0],"");
	if(computedStyle.opacity == "0")
		showNext();
}
function deleteGroup(elem){
	var header = elem.parentNode.getElementsByTagName('h4')[0].innerHTML;
	var number = header.slice(header.indexOf('#')+1);
	elem.parentNode.parentNode.removeChild(elem.parentNode);
	localStorage.removeItem('group' + number);
	var empty = true;
	for(var i = 1; i <= localStorage["groupCounter"]; i++)
		if(localStorage["group" + i]){
			empty = false;
			break;
		}
	if(empty)
		disableNext();
}