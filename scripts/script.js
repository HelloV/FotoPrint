/*Функция, скрывающая/открывающая окно входа в систему.*/
function popup(wind){
	switch(wind){
		/*При передаче 'dark' скрывается/открывается затемняющий общий div.*/
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
		/*При передаче 'reg' скрывается/открывается окно регистрации,
		 при этом открываю/закрывая окно входа в систему.*/
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

/*Функция, закрывающая большие изображения на странице 'devices'. Вешается на крестик.*/
function closeImage(){
	var popup = document.getElementsByClassName('imageDark')[0];
	popup.style.display = "none";
}

/*Функция, ответственная за верификацию форм. Сейчас там всего несколько проверок на пустые поля для галочки. 
Если будете развивать идею, то нужно добавить верификацию e-mail'а, сравнение логинов пользователей
 с записанными в базу (которую тоже создадите) и т.д.*/
function verifyForm(elem){
	var result = true;
	var message = "";
	if(elem.parentNode.parentNode.className == "login")
		var form = document.forms.login;
	else if(elem.parentNode.parentNode.className == "reg")
		var form = document.forms.reg;
	var name = form.elements.name;
	var password = form.elements.password;
	/*Проверка на пустой логин.*/
	if(name.value.length == 0){
		message += "Слишком короткое имя\n";
		result = false;
	}
	/*Проверка на пустой пароль.*/
	if(password.value.length == 0){
		message += "Не введён пароль\n";
		result = false;
	}
	if(message)
			alert(message);
	return result;
}

/*Функция, вызывающаяся при входе в систему.*/
function done(elem){
	if(verifyForm(elem)){
		popup('dark');
		var value = elem.parentNode.parentNode.querySelector("input[name='name']").value;
		/*Выводится строка приветствия.*/
		if(value.toLowerCase() == "вадян" || value.toLowerCase() == "vadyan")
			document.getElementsByClassName('hello')[0].innerHTML = "Эээх Вадян, Вадян...";
		else document.getElementsByClassName('hello')[0].innerHTML = "Добро пожаловать,<br>" + value + " !";
		/*Заменяется кнопка входа на кнопку выхода.*/
		document.querySelector('.enter').style.display = "none";
		document.querySelector('.exit').style.display = "inline-block";
		/*Очищаются поля форм.*/
		elem.parentNode.parentNode.querySelector("input[name='name']").value="";
		elem.parentNode.parentNode.querySelector("input[name='password']").value="";
		if(elem.parentNode.parentNode.className == "reg"){
			document.forms.reg.elements.email.value = "";
			document.forms.reg.elements.fio.value = "";
			document.querySelector("input[value='male']").checked = true;
		}
		/*Логин пользователя заносится в хранилище, чтобы выводить его на других страницах.*/
		localStorage["login"] = value;
	}
}

/*Функция, вызывающаяся при нажатии на кнопке 'Выйти'. Возвращает исходную надпись и кнопку входа.*/
function exit(){
	document.getElementsByClassName('hello')[0].innerHTML = "Вы ещё не готовы.";
	document.querySelector('.enter').style.display = "inline-block";
	document.querySelector('.exit').style.display = "none";
	/*Логин стирается из хранилища.*/
	localStorage.removeItem('login');
}

/*Функция вызывается при нажатии на изображение нужного устройства на странице 'devices'.
Отмечает данное изображение галочкой и выводит ответственный за данное устройство блок.*/
function check(elem){
	var masFig = document.querySelectorAll('.preview figcaption');
	var masDiv = document.querySelectorAll('.mainInfo>div');
	/*Убираем все галки с других устройств. Т.о. всегда отмечено только одно.*/
	for(var i = 0; i < masFig.length; i++)
		if(masFig[i].parentNode.parentNode != elem)
			masFig[i].style.opacity = '0';
	/*И скрываем все блоки с галереей и кнопкой загрузки.*/
	for(var i = 0; i < masDiv.length; i++)
		masDiv[i].style.display = 'none';
	/*Отображаем блок, ответственный за данный девайс.*/
	var text = elem.getElementsByTagName('h2')[0].innerHTML;
	document.getElementsByClassName('mainInfo')[0].style.display = 'block';
	document.getElementsByClassName('step2')[0].style.opacity = "1";
	document.getElementsByClassName('step2')[0].innerHTML = 'Шаг 2. Загрузите нужные фотографии для печати ( ' + text + ' )';
	document.querySelector('.mainInfo>div.main' + elem.className).style.display = 'block';
	var computedStyle = getComputedStyle(elem.querySelector("figcaption"), "");
	/*При повторном щелчке по уже выбранному устройству, убираем с него галку и скрываем его блок.
	 Т.о. остаётся только Шаг1 (ну и Шаг3, если изображения уже загружены).*/
	if(computedStyle.opacity == "1"){
		document.getElementsByClassName('mainInfo')[0].style.display = 'none';
		elem.querySelector("figcaption").style.opacity = "0";
		/*Стираем сведения из хранилища о выбранном устройстве, т.к. не отмечено ни одно.*/
		localStorage.removeItem("checkedDevice");
		localStorage.removeItem("step2");
	/*В случае, если этот девайс не был отмечен.*/
	}else{ 
		elem.querySelector("figcaption").style.opacity = "1";
		/*Запоминаем отмеченный девайс и заголовок*/
		localStorage["checkedDevice"] = elem.className;
		localStorage["step2"] = document.getElementsByClassName('step2')[0].innerHTML;
	}
}

function selectNewPhotos(elem) {
	for(var i = 0; i < elem.files.length; i++){
		switch(elem.parentNode.className){
			case "mainFlash":
				miniFlash.push(elem.files[i].name);
				break;
			case "mainMicro":
				miniMicro.push(elem.files[i].name);
				break;
			case "mainHard":
				miniHard.push(elem.files[i].name);
				break;
			case "mainCloud":
				miniCloud.push(elem.files[i].name);
				break;
			case "mainInternet":
				miniInternet.push(elem.files[i].name);
				break;
		}
	}
	load(elem.parentNode.getElementsByClassName('button')[2], elem.files.length);
}


/*Имена временных фотографий, а точнее их миниатюр. Их размеры после нижнего подчёркивания используются далее для их отображения.
Костыль, конечно, но в моём случае это работало и большего не требовалось, чтобы как-то заморачиваться.
Когда добавите работу с проводником, удалите эти изображения.*/
var miniFlash = [];
var miniMicro = [];
var miniHard = [];
var miniCloud = [];
var miniInternet=[];

/*Функция, загружающая вышеуказанные миниатюры фотографий при нажатии на кнопку 'Загрузить'. 
Эту функцию придётся полностью поменять при работе с проводником.*/
function load(elem, count){
	/*В зависимости от отмеченного устройства идёт вставка фотографий с именами, хранящимися в соответствующем массиве.*/
	switch(elem.parentNode.parentNode.className){
	case "mainFlash": 
		for(var i = miniFlash.length-count; i < miniFlash.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniFlash[i] + "'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
		break;

	case "mainMicro": 
		for(var i = miniMicro.length-count; i < miniMicro.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniMicro[i] + "'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
		break;

	case "mainHard": 
		for(var i = miniHard.length-count; i < miniHard.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniHard[i] + "'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
		break;

	case "mainCloud": 
		for(var i = miniCloud.length-count; i < miniCloud.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniCloud[i] + "'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
		break;

	case "mainInternet": 
		for(var i = miniInternet.length-count; i < miniInternet.length; i++){
			var figure = document.createElement("figure");
			figure.onclick = showButtons;
			figure.innerHTML = "<img src='images/kitty/mini/" + miniInternet[i] + "'>";
			var gallery = elem.parentNode.parentNode.getElementsByClassName('gallery')[0];
			gallery.appendChild(figure);
		}
	}
	/*Сохраняются выбранные фотографии.*/
	saveInfo();
	/*Отображаем Шаг3.*/
	document.getElementsByClassName('step3')[0].style.opacity = '1';
	document.getElementsByClassName('next')[0].style.opacity = '1';
}

/*Функция, отображающая кнопки 'Удалить' и 'Просмотреть' при нажатии на любую фотографию на странице 'devices'.*/
function showButtons(){
	var buttons = this.parentNode.parentNode.getElementsByClassName('dop');
	var figures = document.querySelectorAll('.gallery figure');
	/*Если нажатие производится по уже выделенной фотографии...*/
	if(this.classList.contains('chosen')){
		/*Прячем кнопки.*/
		for(var i = 0;i < buttons.length; i++)
			buttons[i].style.display = 'none';
		/*Правим форматирование.*/
		this.parentNode.parentNode.getElementsByClassName('buttons')[0].style.paddingTop = '300px';
		this.style.border = '3px solid #4C2A2A';
		/*Удаляем класс 'chosen', по наличии которого программа распознаёт выделено ли изображение.*/
		this.classList.remove('chosen');
		/*И удаляем данное изображение из хранилища.*/
		localStorage.removeItem('chosenImage');
	/*Если нажатие производится по изображению, ранее не выделенному...*/
	}else{
		/*Отображаем кнопки.*/
		for(var i = 0;i < buttons.length; i++)
			buttons[i].style.display = 'block';
		/*Правим форматирование.*/
		this.parentNode.parentNode.getElementsByClassName('buttons')[0].style.paddingTop = '178px';
		this.style.border = '3px solid red';
		/*Добавляем класс.*/
		this.classList.add('chosen');
		/*Извлекаем из данного изображения его имя.*/
		var firstIndex = this.getElementsByTagName('img')[0].src.lastIndexOf('/')+1;
		var lastIndex = this.getElementsByTagName('img')[0].src.lastIndexOf('.');
		var currentSrc = this.getElementsByTagName('img')[0].src.slice(firstIndex, lastIndex);
		/*И т.к. изображений с одним и тем же именем может быть несколько (при повторном нажатии кнопки 'Загрузить')
		запоминаем его номер по счёту среди изображений с тем же именем.*/
		var number = 1;
		var currentIndex = 0;
		var images = this.parentNode.getElementsByTagName('img');
		while(!images[currentIndex].parentNode.classList.contains('chosen')){
			currentIndex++;
		}
		for(var i = 0; i < currentIndex; i++)
			if(images[i].src.slice(firstIndex, lastIndex) == currentSrc)
				number++;
		/*Сохраняем имя выбранного изображения и его номер. Это пригодится при перезагрузке страницы, чтобы выделить его.*/
		localStorage['chosenImage'] = currentSrc + "_" + number;
	}
	/*И наконец снимаем выделение с прочих изображений, т.к. выделено может быть в один момент времени только одно.*/
	for(var i = 0; i< figures.length; i++)
		if(figures[i] != this){
			figures[i].style.border = '3px solid #4C2A2A';
			figures[i].classList.remove('chosen');
		}
}

/*Функция, удаляющая изображение из галереи на странице 'devices' при нажатии на кнопку 'Удалить'.*/
function deleteImage(){
	var image = document.getElementsByClassName('chosen')[0];
	image.parentNode.removeChild(image);
	saveInfo();
	/*Скрываем шаг3, если удалены все изображения*/
	var images = document.querySelectorAll('.gallery img');
	if(images.length == 0){
		document.getElementsByClassName('step3')[0].style.opacity = '0';
		document.getElementsByClassName('next')[0].style.opacity = '0';
	}
}
/*Функция, отображающая увеличенную версию изображения при щелчке по кнопке 'Просмотреть' на странице 'devices'.
На 100% состоит из костылей;) Поэтому Вам придётся её переделать.*/
function showImage(){
	var smallSrc = document.getElementsByClassName('chosen')[0].getElementsByTagName('img')[0].src;
	/*Высота миниатюры читаются из её названия (это упоминалось выше).*/
	var smallHeight = smallSrc.slice(smallSrc.lastIndexOf('x')+1,smallSrc.lastIndexOf('.'));
	var bigSrc = smallSrc.slice(smallSrc.lastIndexOf('/')+1,smallSrc.lastIndexOf('_'));
	var div = document.getElementsByClassName('show')[0];
	div.getElementsByTagName('img')[0].src = "images/kitty/" + bigSrc + ".jpg";
	div.parentNode.style.display = 'block';
	/*В зависимости от высоты миниатюры подбирается окно соответствующих размеров,
	 т.к. есть фото обычные, есть вертикальные, а есть широкоформатные.
	 Это сработает, ясное дело, только для моих демонстрационных примеров. 
	 Я долго тупил здесь и так и не придумал стиль, который будет достаточно
	  элегантно отображать фотографии любых размеров, поэтому задал фиксированные размеры.
	  Так что, Вадян, используй магию CSS и сделай всё нормально.*/
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

/*Функция, вызывающаяся при каждом изменении списка загруженных фотографий на странице 'devices',
 а именно при загрузке их или удалении конкретного изображения. Фиксирует этот список.*/
function saveInfo(){
	var srcs = [];
	var galleries = document.querySelectorAll('.gallery');
	/*сохраняем в локальное хранилище 5 строк с именами фотографий из соответствующих галлерей*/
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
	/*Сохраняем в локальное хранилище все выбранные фотографии, чтобы загрузить их на следующей странице*/
	var bigImages = document.querySelectorAll('.gallery img');
	var bigSrcs = [];
	for(var i = 0; i < bigImages.length; i++)
			bigSrcs[i] = bigImages[i].src.slice(bigImages[i].src.lastIndexOf('/')+1,bigImages[i].src.lastIndexOf('_'));
	localStorage["selectedImgs"] = bigSrcs;
}

/*Функция, запоминающая выбранные изображения и их количество на странице 'gallery'.
 Нужно для отображения их при уходе/возврата, перезагрузке страницы.
 Реализация, как и в функции showButtons().*/
function saveGalleryInfo(){
	var images = document.querySelectorAll('.finalGallery img');
	var srcs = "";
	for(var i = 0; i < images.length; i++){
		var currentSrc = images[i].src.slice(images[i].src.lastIndexOf('/')+1,images[i].src.lastIndexOf('.'));
		var number = 1;
		for( var j = 0; j < i; j++)
			if(images[j].src.slice(images[j].src.lastIndexOf('/')+1,images[j].src.lastIndexOf('.')) == currentSrc)
					number++;
		if(images[i].parentNode.classList.contains('selected')){
			srcs += currentSrc + "_" + number + ",";
			/*Сохраняем кол-во выбранных изображений*/
			var value = images[i].parentNode.parentNode.getElementsByTagName('input')[0].value;
			localStorage["count_" + currentSrc + "_" + number] = value;
		}
	}
	srcs = srcs.slice(0,srcs.lastIndexOf(','));
	/*Сохраняем помимо имени ещё и его номер среди схожих изображений.*/
	localStorage["gallerySelected"] = srcs;
}

/*Самая массивная функция, ответственная за действия, предпринимаемые при входе на соответствующую страницу (событие window.onload).*/
function loadInfo(elem){
	/*Для всех страниц, в зависимости от того зафиксирован ли логин в хранилище, отображаем или нет окно привествия.*/
	if(localStorage['login']){
		var value = localStorage['login'];
		if(value.toLowerCase() == "вадян" || value.toLowerCase() == "vadyan")
			document.getElementsByClassName('hello')[0].innerHTML = "Эээх Вадян, Вадян...";
		else document.getElementsByClassName('hello')[0].innerHTML = "Добро пожаловать,<br>" + value + " !";
		document.querySelector('.enter').style.display = "none";
		document.querySelector('.exit').style.display = "inline-block";
	}

	switch(elem){
		/*Для страницы 'gallery'.*/
		case 'gallery': 
			/*Загружаем фотографии, выбранные на предыдущей странице.*/
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
			/*Добавляем в окно групп выбранные ранее группы.*/
			var view = document.getElementsByClassName('viewWindow')[0];
			for(var i = 0; i < localStorage["groupCounter"];i++)
				if(localStorage['group' + (i+1)])
					addGroup.call(view, i+1);
			/*Отмечаем ранее отмеченные фотографии.*/
			var images = document.querySelectorAll('.finalGallery img');
			if(localStorage['gallerySelected'])
					var gallerySelected = localStorage['gallerySelected'].split(',');
			for(var i = 0; i < images.length; i++){
				var currentSrc = images[i].src.slice(images[i].src.lastIndexOf('/')+1,images[i].src.lastIndexOf('.')); 
				var number = 1;
				for(var z = 0; z < i; z++)
					if(images[z].src.slice(images[z].src.lastIndexOf('/')+1,images[z].src.lastIndexOf('.')) == currentSrc)
						number++;
				if(localStorage["count_" + currentSrc + "_" + number])
					images[i].parentNode.parentNode.getElementsByTagName('input')[0].value = localStorage["count_" + currentSrc + "_" + number];
				if(localStorage['gallerySelected']){
					for(var j = 0; j < gallerySelected.length; j++)
						if((currentSrc == gallerySelected[j].slice(0,gallerySelected[j].lastIndexOf('_'))) 
							&& (number == gallerySelected[j].slice(gallerySelected[j].lastIndexOf('_')+1)))
							selectImage.call(images[i].parentNode);
				}
			}
			/*Добавляем кнопку "Далее", если есть хотя бы одна группа.*/ 
			var empty = true;
			for(var i = 1; i <= localStorage["groupCounter"]; i++)
				if(localStorage["group" + i]){
					empty = false;
					break;
				}
			if(!empty)
				showNext();
			break;
		/*Для страницы 'devices'.*/
		case 'devices':
			/*Отображаем ранее выбранный девайс и соответствующий ему блок.*/
			if(localStorage["checkedDevice"]){
				document.querySelector('.' + localStorage["checkedDevice"] + ' figcaption').style.opacity = "1";
				document.getElementsByClassName('mainInfo')[0].style.display = 'block';
				document.getElementsByClassName('step2')[0].innerHTML = localStorage["step2"];
				document.querySelector('.mainInfo>div.main' + localStorage["checkedDevice"]).style.display = 'block';
			}
			/*Отображаем Шаг3 при наличии загруженных фотографий.*/
			if(localStorage["selectedImgs"]){
				document.getElementsByClassName('step3')[0].style.opacity = '1';
				document.getElementsByClassName('next')[0].style.opacity = '1';
			}
			/*Отображаем все ранее выведенные изображения по всем блокам.*/
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
			/*Выделяем изображение, которое было выделено до ухода со страницы, отображаем кнопки для него и прочее.*/
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
		/*Для страницы 'total'.*/
		case 'total':
			/*Вставляем на страницу квитанцию, со всеми сохранёнными группами.*/
			var blank = document.getElementsByClassName('blank')[0];
			for(var i = 0; i < localStorage["groupCounter"];i++)
				/*addGroup() вызывается в контексте blank, что заставляет её добавлять группы именно в квитанцию.*/
				if(localStorage['group' + (i+1)])
					addGroup.call(blank, i+1);
	}
}

/*Функция, отображающая окошко со счётчиком и ставящее галочку на изображении, при нажатии на изображение на странице 'gallery'.*/
function selectImage(){
	var computedStyle = getComputedStyle(this.querySelector("figcaption"), "");
	/*При нажатии по уже выбранному изображению...*/
	if(computedStyle.opacity == "1"){
		/*Удаляем класс.*/
		this.classList.remove('selected');
		/*Снимаем галочку.*/
		this.querySelector("figcaption").style.opacity = "0";
		/*Прячем счётчик*/
		this.parentNode.getElementsByClassName('counter')[0].classList.add('fadeOut');
		this.parentNode.getElementsByClassName('counter')[0].classList.remove('fadeIn');
		/*При отсутствии выделенных фотографий прячем кнопку 'Настройки' и Шаг5 (если ещё не активен Шаг6).*/
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
	/*При нажатии по ранее не отмеченному изображению...*/
	}else{ 
		/*Добавляем класс.*/
		this.classList.add('selected');
		/*Отображаем галочку.*/
		this.querySelector("figcaption").style.opacity = "1";
		/*Отображаем счётчик.*/
		this.parentNode.getElementsByClassName('counter')[0].classList.add('fadeIn');
		this.parentNode.getElementsByClassName('counter')[0].classList.remove('fadeOut');
		/*Отображаем кнопку 'Настройки' и Шаг5 (если ещё не активен Шаг6).*/
		document.querySelector('.buttons .settings').style.opacity = "1";
		if(!document.getElementsByClassName('step5')[0].classList.contains('step6'))
			document.getElementsByClassName('step5')[0].style.opacity = "1";
	}
	/*Фиксируем выделенные фотографии.*/
	saveGalleryInfo();
}

/*Функция, вешающаяся на кнопки счётчика и меняющаяся его значение, в зависимости от нажатой кнопки (+ или -).*/
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
	/*Фиксируем изменившееся кол-во выбранных фотографий.*/
	saveGalleryInfo();
}

/*Функция, вешаящаяся на кнопку 'Очистить'.*/
function reset(){
	var figs = document.querySelectorAll('figcaption');
	var counters = document.getElementsByClassName('counter');
	/*Снимаем галки с изображений и убираем счётчики.*/
	for(var i = 0; i < figs.length; i++){
		var computedStyle = getComputedStyle(figs[i],"");
		if(computedStyle.opacity == "1"){
			figs[i].style.opacity = "0";
			figs[i].parentNode.classList.remove('selected');
			counters[i].classList.add('fadeOut');
			counters[i].classList.remove('fadeIn');
		}
	}
	/*Убираем кнопку настроек и прячем Шаг5, если не отображён Шаг6.*/
	document.querySelector('.buttons .settings').style.opacity = "0";
	if(!document.getElementsByClassName('step5')[0].classList.contains('step6'))
		document.getElementsByClassName('step5')[0].style.opacity = "0";
}

/*Функция, добавляющая группу с номером i в окно просмотра групп или в квитанцию (в зависимости от контекста).*/
function addGroup(i){
		/*Создаём div по информации из хранилища.*/
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
		/*Вставляем сформированный div в соответствующее место, в зависимости от того, что в this.*/
		if(this.classList.contains('viewWindow'))
			this.getElementsByClassName('groups')[0].appendChild(group);
		else if(this.classList.contains('blank'))
			this.insertBefore(group, this.getElementsByClassName('cost')[0]);
}

/*Функция, открывающая окно настроек.*/
function runSettings(){
	var settings = document.getElementsByClassName('settingsWindow')[0];
	settings.parentNode.style.display = "block";
}

/*Функция, открывающая окно просмотра групп.*/
function viewGroups(){
	var view = document.getElementsByClassName('viewWindow')[0];
	view.parentNode.style.display = "block";
}

/*Функция, закрывающая окно настроек.*/
function closeSettings(){
	var settings = document.getElementsByClassName('settingsWindow')[0];
	settings.parentNode.style.display = "none";
}

/*Функция, закрывающая окно просмотра групп.*/
function closeView(){
	var view = document.getElementsByClassName('viewWindow')[0];
	view.parentNode.style.display = "none";
}

/*Функция, отображающая Шаг6 и кнопку 'Далее'.*/
function showNext(){
	document.getElementsByClassName('step5')[0].classList.add('step6');
	document.getElementsByClassName('step6')[0].innerHTML = 'Шаг 6. Выберите новую группу, либо нажмите "Далее"';
	document.getElementsByClassName('next')[0].style.opacity = "1";
}

/*Функция, прячущая Шаг6 и кнопку 'Далее'.*/
function disableNext(){
	document.getElementsByClassName('step5')[0].classList.remove('step6');
	document.getElementsByClassName('step5')[0].innerHTML = 'Шаг 5. Нажмите кнопку "Настройки"';
	document.getElementsByClassName('next')[0].style.opacity = "0";
}

/*Удаляем всю информацию, которую можно сохранить на странице 'devices'.*/
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

/*Удаляем всю информацию, которую можно сохранить на странице 'gallery'.*/
function clearGalleryInfo(){
	/*Очистка выделенных фотографий и их счётчиков.*/
	var images = document.querySelectorAll('.finalGallery img');
	for(var i = 0; i < images.length; i++){
		var currentSrc = images[i].src.slice(images[i].src.lastIndexOf('/')+1,images[i].src.lastIndexOf('.')); 
		var number = 1;
		for(var z = 0; z < i; z++)
			if(images[z].src.slice(images[z].src.lastIndexOf('/')+1,images[z].src.lastIndexOf('.')) == currentSrc)
				number++;
		localStorage.removeItem("count_" + currentSrc + "_" + number);
	}
	localStorage.removeItem('gallerySelected');
	/*Очистка групп.*/
	for(var i = 0; i < localStorage["groupCounter"]; i++)
		localStorage.removeItem("group" + (i+1));
	localStorage.removeItem("groupCounter");
}

/*Функция, возвращая страницу в исходное состояние (как при первом входе на неё). 
Вешается на специальную кнопку в верхнем правом углу страницы 'devices'.*/
function refreshDevices(){
	/*Чистим хранилище.*/
	clearInfo();
	/*Перезагружаем страницу.*/
	location.reload();
}

/*Как refreshDevices(), только для страницы 'gallery'.*/
function refreshGallery(){
	clearGalleryInfo();
	location.reload();
}

/*Функция, вызывающаяся при принятии настроек для очередной группы фотографий.*/
function saveGroup(){
	/*Увеличиваем счётчик групп на 1.*/
	if(localStorage["groupCounter"])
		localStorage["groupCounter"] = parseInt(localStorage["groupCounter"]) + 1;
	else localStorage["groupCounter"] = 1;
	/*Записываем все фотографии этой группы в переменную info.*/
	var info = "";
	var figures = document.getElementsByTagName('figure');
	for(var i = 0; i < figures.length; i++)
		if(figures[i].classList.contains('selected')){
			var firstIndex = figures[i].getElementsByTagName('img')[0].src.lastIndexOf('/')+1;
			var lastIndex = figures[i].getElementsByTagName('img')[0].src.lastIndexOf('.');
			info += figures[i].getElementsByTagName('img')[0].src.slice(firstIndex,lastIndex);
			info += "_" + figures[i].parentNode.querySelector('.counter input').value + ", ";
		}
	/*Добавляем в info выбранные настройки.*/
	var form = document.forms.settings;
	info += form.elements.aspect.value + " ";
	info += form.elements.paper.value + " ";
	info += form.elements.urgent.checked;
	/*Сохраняем info в хранилище.*/
	localStorage['group' + localStorage["groupCounter"]] = info;
	/*Добавляем группу в окно просмотра групп, вызывая addGroup() в контексте view.*/
	var view = document.getElementsByClassName('viewWindow')[0];
	addGroup.call(view, localStorage["groupCounter"]);
	/*Отображаем кнопку 'Далее' и Шаг6.*/
	var computedStyle = getComputedStyle(document.getElementsByClassName('next')[0],"");
	if(computedStyle.opacity == "0")
		showNext();
}

/*Функция, удаляющая группу из окна просмотра групп. Вешается на крестик.*/
function deleteGroup(elem){
	/*Получаем номер группы, по которой щёлкнули.*/
	var header = elem.parentNode.getElementsByTagName('h4')[0].innerHTML;
	var number = header.slice(header.indexOf('#')+1);
	/*Удаляем div.*/
	elem.parentNode.parentNode.removeChild(elem.parentNode);
	/*И удаляем данную группу из хранилища.*/
	localStorage.removeItem('group' + number);
	/*Если групп не осталось, то прячем кнопку 'Далее' и меняем Шаг6 на Шаг5.*/
	var empty = true;
	for(var i = 1; i <= localStorage["groupCounter"]; i++)
		if(localStorage["group" + i]){
			empty = false;
			break;
		}
	if(empty)
		disableNext();
}