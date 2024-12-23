function copyrightDate() {
	let year = new Date().getFullYear();
	document.getElementById("copyrightYear").innerHTML = '&copy; ' + year;
	updateCS(year);
}

var slideIndex = 1;
showSlides(slideIndex);
slideIndex++;
setInterval(function() {
showSlides(slideIndex);
	slideIndex++;
}, 5000);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("slides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1
	}
	if (n < 1) {
		slideIndex = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className += " active";
}

function updateCS(year) {
	const years = [2015, 2019, 2018, 2019, 2019, 2019, 2020, 2022];
	for (let i = 0; i < years.length; i++) {
		years[i] = year - years[i];
	}
	for (let i = 0; i < years.length; i++) {
		if (screen.width < 600) {
			var el = document.getElementById("csm" + i);
			el.innerHTML = years[i];
		}
		else {
			var el = document.getElementById("cs" + i);
			el.innerHTML = years[i];
		}
		
	}
}

function expand(id) {
	var x = document.getElementById(id);
	if (x.className.indexOf("show") == -1) {
		x.className += " show";
	} else { 
		x.className = x.className.replace(" show", "");
	}
	x = document.getElementById(id + "Button");
	if (x.className.indexOf("shiftLeft") == -1) {
		x.className = x.className.replace(" shiftRight", "");
		x.className += " shiftLeft";
	} else { 
		x.className = x.className.replace(" shiftLeft", "");
		x.className += " shiftRight";
	}
	if (id == 'experience') {
		currentSlide(1);
	}
}

function toggleActive() {
	var x = document.getElementById("hamburger");
  if (x.className.indexOf("is-active") == -1) {
		x.className += " is-active";
	} else { 
		x.className = x.className.replace(" is-active", "");
	}
	var x = document.getElementById("menuOptions");
  if (x.className.indexOf("show") == -1) {
		x.className += " show";
	} else { 
		x.className = x.className.replace(" show", "");
		x.clasName += " hide";
	}
}
