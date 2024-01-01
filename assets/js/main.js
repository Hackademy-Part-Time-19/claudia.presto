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
	
	window.addEventListener("load", function () {
		let page = window.location.href.includes("catalogo.html")
			? "catalogo.html"
			: "prodotto.html";

		if (window.location.href.includes(page)) {
			let url = new URL(window.location.href);
			let nome = url.searchParams.get("nomeArticolo");
			let prezzo = url.searchParams.get("prezzo");
			let categoria = url.searchParams.get("categoria");

			let prezzoMin = 0;
			let prezzoMax = Infinity;

			if (prezzo === "") {
				prezzoMin === "";
				prezzoMax === "";
			} else if (prezzo === "0-100") {
				prezzoMin = 0;
				prezzoMax = 100;
			} else if (prezzo === "100-200") {
				prezzoMin = 100;
				prezzoMax = 200;
			} else if (prezzo === "200-300") {
				prezzoMin = 200;
				prezzoMax = 300;
			} else if (prezzo === "300") {
				prezzoMin = 300;
				prezzoMax = Infinity;
			}
			filtraCatalogo(nome, prezzoMin, prezzoMax, categoria);
		} else if (window.location.href.includes("PagProdotto.html")) {
			let url = new URL(window.location.href);
			let idProdotto = url.searchParams.get("idProdotto");
			ottieniProdotto(idProdotto);
		} else {
			console.log("non sono nel catalogo");
		}
	});

	function filtraCatalogo(nome, prezzoMin, prezzoMax, categoria) {
		fetch("https://fakestoreapi.com/products")
			.then((response) => response.json())
			.then((data) => {
				document.getElementById("EffetoCaricamento").style.display = "none";
				let prodotti = data;
				console.log(prodotti)


				let prodottiFiltrati = prodotti.filter((prodotto) => {
					return (!prezzoMax || (prodotto.price >= prezzoMin && prodotto.price <= prezzoMax)) &&
						(!nome || prodotto.title.includes(nome)) &&
						(!categoria || prodotto.category === categoria);
				})
				visualizzaProdotti(prodottiFiltrati);
			}).catch((error) =>
				console.log(error));

	};
	function vaiAlCatalogo() {
		let nome = document.getElementById("Nome").value;
		let prezzo = document.getElementById("Prezzo").value;
		let categoria = document.getElementById("Categoria").value;
		window.location.href = `catalogo.html?&categoria=${categoria}&prezzo=${prezzo}&nome=${nome}`;
	  };
	 
	  

	

})(jQuery);