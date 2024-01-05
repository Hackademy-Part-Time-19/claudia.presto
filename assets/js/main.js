(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
	breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Header.
	if ($banner.length > 0
		&& $header.hasClass('alt')) {

		$window.on('resize', function () { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom: $header.outerHeight(),
			terminate: function () { $header.removeClass('alt'); },
			enter: function () { $header.addClass('alt'); },
			leave: function () { $header.removeClass('alt'); }
		});

	}

	// Menu.
	var $menu = $('#menu');

	$menu._locked = false;

	$menu._lock = function () {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function () {
			$menu._locked = false;
		}, 350);

		return true;

	};

	$menu._show = function () {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function () {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function () {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menu
		.appendTo($body)
		.on('click', function (event) {

			event.stopPropagation();

			// Hide.
			$menu._hide();

		})
		.find('.inner')
		.on('click', '.close', function (event) {

			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			// Hide.
			$menu._hide();

		})
		.on('click', function (event) {
			event.stopPropagation();
		})
		.on('click', 'a', function (event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			window.setTimeout(function () {
				window.location.href = href;
			}, 350);

		});

	$body
		.on('click', 'a[href="#menu"]', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();

		})
		.on('keydown', function (event) {

			// Hide on escape.
			if (event.keyCode == 27)
				$menu._hide();

		});
})(jQuery);


function vaiAlCatalogo() {
	let nome = document.getElementById("nome").value;
	let categoria = document.getElementById("categoria").value;
	let prezzo = document.getElementById("prezzo").value;

	window.location.href = `catalogo.html?prezzo=${prezzo}&nome=${nome}&categoria=${categoria}`;

}
window.addEventListener("load", function () {

	if (window.location.href.includes("catalogo.html")) {
		let url = new URL(window.location.href);
		let nome = url.searchParams.get("nome");
		let categoria = url.searchParams.get("categoria");
		let prezzo = url.searchParams.get("prezzo");
		let limiteInferiore;
		let limiteSuperiore;
		if (prezzo == "0-100") {
			limiteInferiore = 0;
			limiteSuperiore = 100;
		}
		else if (prezzo == "100-200") {
			limiteInferiore = 101;
			limiteSuperiore = 200;
		}
		else if (prezzo == "200-500") {
			limiteInferiore = 201
			limiteSuperiore = 500;
		}
		else if (prezzo == "500") {
			limiteInferiore = 501;
			limiteSuperiore = Infinity;
		}

		filtraProdottiCatalogo(nome, limiteInferiore, limiteSuperiore, categoria);
	}
	else {
		console.log("Non sono nel catalogo");
	}
});



function filtraProdottiCatalogo(nome, limiteInferiore, limiteSuperiore, categoria) {
	fetch("https://fakestoreapi.com/products")
		.then((response) => response.json())
		.then((data) => {
			let prodotti = data
			
			for (let i = 0; i < prodotti.length; i++) {

				let prodotto = prodotti[i];
				document.getElementById("containerProdotti").innerHTML +=
					`<article>
			<a href="#" class="image"><img src="${prodotti[i].image}" alt="Elettronica"></a>
			<h3 class="major" id="Nome">${prodotti[i].title}</h3>
			<p id="Descrizione">${prodotti[i].description}</p>
			<p id="Prezzo">€ ${prodotti[i].price}<br></p>
			<a href="#" class="special">Acquista</a>
		</article>`
			}
		})
		.catch(error => {
			console.log(error)
			
		})
		
		prodotti = data.filter((prodotto) => {
	
			if (limiteSuperiore != undefined && nome != "" && categoria != "") {
				return prodotto.price >= limiteInferiore && prodotto.price < limiteSuperiore && prodotto.title.startswith(nome) && prodotto.category == categoria;

			} else if (limiteSuperiore == undefined && nome != "" && categoria != "") {
				return prodotto.price >= limiteInferiore && prodotto.title.startswith(nome) && prodotto.category == categoria;

			} else if (limiteSuperiore == undefined && nome == "" && categoria != "") {
				return prodotto.price >= limiteInferiore && prodotto.category == categoria;

			} else if (limiteSuperiore = undefined && nome != "" && categoria == "") {
				return prodotto.price >= limiteInferiore && prodotto.title.startswith(nome);

			} else if (limiteSuperiore != undefined && nome == "" && categoria != "") {
				return prodotto.price >= limiteInferiore && prodotto.price < limiteSuperiore && prodotto.category == categoria;
			}
		})
	
	data = data.filter(function (prodotto) {
		return prodotto.category == categoria &&
			prodotto.title.startsWithh(nome) && prodotto.prezzo
	})

}
