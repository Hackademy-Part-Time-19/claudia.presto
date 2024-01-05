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



function filtraProdottiCatalogo(nome, limiteInferiore, limiteSuperiore, categoria){
	fetch("https://fakestoreapi.com/products")
		.then((response) => response.json())
		.then((data) => {
		console.log(data);
		listafiltrata = data.filter((prodotto) => {

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
	for (let i = 0; i < data.length; i++) {
		console.log("Sono entrato nel ciclo")
		let divProdotto =
			document.getElementById("cardContainer")
		let immagine = data[i].image;
		let nome = data[i].title;
		let descrizione = data[i].description;
		let prezzo = data[i].price;
		divProdotto.innerHTML += `<div id="cardContainer">
				<section id="elettronica" class="wrapper alt style1">
					<div class="inner">
						<h2 class="major">Il meglio dell'Elettronica</h2>
						<section class="features">
							<article id="1">
								<a href="#" class="image"><img src="${immagine}" alt="Elettronica"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="2">
								<a href="#" class="image"><img src="${immagine}" alt="Elettronica"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="3">
								<a href="#" class="image"><img src="${immagine}" alt="Elettronica"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="4">
								<a href="#" class="image"><img src="${immagine}" alt="Elettronica"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="5">
								<a href="#" class="image"><img src="${immagine}" alt="Elettronica"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="6">
								<a href="#" class="image"><img src="${immagine}" alt="Elettronica"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>

						</section>
					</div>
				</section>

				<section id="gioielli" class="wrapper alt style1">
					<div class="inner">
						<h2 class="major">Gioielli</h2>
						<section class="features">
							<article id="7">
								<a href="#" class="image"><img src="${immagine}" alt="Gioielli"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="8">
								<a href="#" class="image"><img src="${immagine}" alt="Gioielli"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="9">
								<a href="#" class="image"><img src="${immagine}" alt="Gioielli"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="10">
								<a href="#" class="image"><img src="${immagine}" alt="Gioielli"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="11">
								<a href="#" class="image"><img src="${immagine}" alt="Gioielli"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="12">
								<a href="#" class="image"><img src="${immagine}" alt="Gioielli"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>

					</div>
				</section>
				<section id="modaDonna" class="wrapper alt style1">
					<div class="inner">
						<h2 class="major">Moda donna</h2>
						<section class="features">
							<article id="13">
								<a href="#" class="image"><img src="${immagine}" alt="Moda donna"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="14">
								<a href="#" class="image"><img src="${immagine}" alt="Moda donna"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="15">
								<a href="#" class="image"><img src="${immagine}" alt="Moda donna"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="16">
								<a href="#" class="image"><img src="${immagine}" alt="Moda donna"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="17">
								<a href="#" class="image"><img src="${immagine}" alt="Moda donna"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="18">
								<a href="#" class="image"><img src="${immagine}" alt="Moda donna"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>

					</div>
				</section>
				<section id="modaUomo" class="wrapper alt style1">
					<div class="inner">
						<h2 class="major">Moda uomo</h2>
						<section class="features">
							<article id="19">
								<a href="#" class="image"><img src="${immagine}" alt="Moda uomo"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="20">
								<a href="#" class="image"><img src="${immagine}" alt="Moda uomo"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="21">
								<a href="#" class="image"><img src="${immagine}" alt="Moda uomo"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="22">
								<a href="#" class="image"><img src="${immagine}" alt="Moda uomo"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="23">
								<a href="#" class="image"><img src="${immagine}" alt="Moda uomo"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>
							</article>
							<article id="24">
								<a href="#" class="image"><img src="${immagine}" alt="Moda uomo"></a>
								<h3 class="major" id="Nome">${nome}</h3>
								<p id="Descrizione">${descrizione}</p>
								<p id="Prezzo">${prezzo}<br></p>
								<a href="#" class="special">Acquista</a>

					</div>
				</section>


	</section>
</div>`
	}
})
			.catch (error => {
	console.log(error)
})
	}
