function vaiAlCatalogo() {
    let nome = document.getElementById("nome").value;
    let prezzo = document.getElementById("prezzo").value;
    let categoria = document.getElementById("categoria").value;
    window.location.href = `catalogo.html?nome=${nome}&prezzo=${prezzo}&categoria=${categoria}`;
}

window.addEventListener("load", function () {
    console.log("Pagina caricata");
    if (window.location.href.includes("catalogo.html")) {
        console.log("Sono nella pagina catalogo.html");
        let url = new URL(window.location.href);

        let nome = url.searchParams.get("nome");
        let prezzo = url.searchParams.get("prezzo");
        let categoria = url.searchParams.get("categoria");
        let limiteInferiorePrezzo;
        let limiteSuperiorePrezzo;

        if (prezzo == "") {
            limiteInferiorePrezzo = "";
            limiteSuperiorePrezzo = "";
        } else if (prezzo == "0-100") {
            limiteInferiorePrezzo = 0;
            limiteSuperiorePrezzo = 100;
        } else if (prezzo == "100-200") {
            limiteInferiorePrezzo = 100;
            limiteSuperiorePrezzo = 200;
        } else if (prezzo == "200-500") {
            limiteInferiorePrezzo = 200;
            limiteSuperiorePrezzo = 500;
        } else if (prezzo == "500") {
            limiteInferiorePrezzo = 500;
            limiteSuperiorePrezzo = Infinity;
        }

        filtraProdottiCatalogo(nome, limiteInferiorePrezzo, limiteSuperiorePrezzo, categoria);

    } else {
        console.log("Non sono nella pagina catalogo.html");
    }
});

function filtraProdottiCatalogo(nome, limiteInferiorePrezzo, limiteSuperiorePrezzo, categoria) {
    fetch("https://fakestoreapi.com/products")
        .then((Response) => Response.json())
        .then((data) => {

            let prodotti = data;

            let prodottiFiltrati = prodotti.filter((prodotto) => {
                return (!limiteSuperiorePrezzo || (prodotto.price >= limiteInferiorePrezzo && prodotto.price <= limiteSuperiorePrezzo)) &&
                    (!nome || prodotto.title.includes(nome)) &&
                    (!categoria || prodotto.category === categoria);
            });
            visualizzaProdotti(prodottiFiltrati);
        })
        .catch((err) => console.log(err));
}

function visualizzaProdotti(prodotti) {
    let container = document.getElementById("containerProdotti");
    container.innerHTML = ""; 
    for (let i = 0; i < prodotti.length; i++) {
        let prodotto = prodotti[i];
        container.innerHTML += `<article>
		<a href="#" class="image"><img src="${prodotti[i].image}" alt="Elettronica" style="width: 100%; height: 350px; object-fit: contain;"></a>
		<h3 class="major" id="Nome">${prodotti[i].title}</h3>
        <div style="overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
                line-clamp: 2;
                -webkit-box-orient: vertical;
                		<p id="Descrizione">${prodotti[i].description}</p> </div>
		<p id="Prezzo">€ ${prodotti[i].price}<br></p>
		<a href="#" class="special">Acquista</a> 
        </article>`;
    };
}
	






