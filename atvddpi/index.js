const ctx = document.getElementById("chartjs");

const totalAlunos = document.getElementById("total");
const selectregion = document.querySelector("select");
const coletaBar = document.getElementsByClassName('coleta')[0];
const indefinidoBar = document.getElementsByClassName('indefinido')[0];
const queimaBar = document.getElementsByClassName('queima')[0];
const enterraBar = document.getElementsByClassName('enterra')[0];
const publicoBar = document.getElementsByClassName('publico')[0];
const outroBar = document.getElementsByClassName('outro')[0];

//graphix pizza//

const slice1 = document.getElementsByClassName("slice1")[0];
const slice2 = document.getElementsByClassName("slice2")[0];
const slice3 = document.getElementsByClassName("slice3")[0];

//guaphix circle//

let circle1 = document.getElementsByClassName("circle1")[0];
let circle2 = document.getElementsByClassName("circle2")[0];
let circle3 = document.getElementsByClassName("circle3")[0];

let lixo = {
    norderste: {
        publico: 0,
        privado: 0,
    },
    sudeste: {
        publico: 0,
        privado: 0,
    },
    centrooeste: {
        publico: 0,
        privado: 0,
    },
    sul: {
        publico: 0,
        privado: 0,
    },
    norte: {
        publico: 0,
        privado: 0,
    }
}


let coleta = 0;
let indefinido = 0;
let queima = 0;
let enterra = 0;
let publico = 0;
let outro = 0;
let size = 1;
let count = 0;
let csvFilePath = "./dataCsv.csv";
let data;
let type = "Nordeste";  
    let count_energia = 0;
    let energia_renovavel = 0;
    let energia_publica = 0;
    let energia_gerador = 0;
    let agua_poco = 0;
    let agua_inex = 0;
    let agua_pub = 0;
const bars = [coletaBar, indefinidoBar, queimaBar, enterraBar, publicoBar, outroBar];



bars.forEach(element => {
    element.addEventListener("mouseenter", ()=>{
        element.children[0].classList.add("actived");
    })
    element.addEventListener("mouseleave", ()=>{
        element.children[0].classList.remove("actived")

    })
});



selectregion.addEventListener("change", (e) => {
    coleta = 0;
    indefinido = 0;
    count_energia = 0;
    queima = 0;
    enterra = 0;
    publico = 0;
    outro = 0;
    count = 0;
    energia_renovavel = 0;
    energia_publica = 0;
    energia_gerador = 0;
    type = e.target.value;
    agua_poco = 0;
    agua_inex = 0;
    agua_pub = 0;
    agua_count = 0;
    data.forEach(element => {
        if (element.NO_REGIAO == type) {
            count++;
            if (element.IN_LIXO_ENTERRA == 1) {
                enterra++;
            }
            if (element.IN_LIXO_OUTROS == 1) {
                outro++;
            }
            if (element.IN_LIXO_QUEIMA == 1) {
                queima++;
            }
            if (element.IN_LIXO_DESTINO_FINAL_PUBLICO == 1) {
                publico++;
            }
            if (element.IN_LIXO_SERVICO_COLETA == 1) {
                coleta++;
            }
            if (element.IN_TRATAMENTO_LIXO_INEXISTENTE == 1) {
                indefinido++;
            }
            if (element.IN_ENERGIA_GERADOR == 1 || element.IN_ENERGIA_GERADOR_FOSSIL == 1) {
                energia_gerador++;
                count_energia++;
            }
            if (element.IN_ENERGIA_REDE_PUBLICA == 1) {
                count_energia++;
                energia_publica++;
            }
            if (element.IN_ENERGIA_RENOVAVEL == 1) {
                count_energia++;
                energia_renovavel++;
            }
            if(element.IN_AGUA_POTAVEL == 1){
                if(element.IN_AGUA_POCO_ARTESIANO == 1){
                    agua_poco++;
                    agua_count++;
                }
                
                if(element.IN_AGUA_REDE_PUBLICA == 1){
                    agua_pub++;
                    agua_count++;
                }
                if(element.IN_AGUA_INEXISTENTE == 1){
                    agua_count++;
                    agua_inex++;
                }
            }
        }
    }
    );
    let percent_renov = energia_renovavel / count_energia;
    let percent_pub = energia_publica / count_energia;
    let percent_gerador = energia_gerador / count_energia;
   
    let percent_agua_poco = agua_poco / agua_count * 60;
    let percent_agua_pub = agua_pub / agua_count * 60;
    let percent_agua_inex = agua_inex / agua_count * 60;


    circle1.style.width = circle1.style.height = 40 + percent_agua_poco + "%";
    circle2.style.width = circle2.style.height = 40 + percent_agua_pub + "%";
    circle3.style.width = circle3.style.height = 40 + percent_agua_inex + "%";
    percent_agua_poco = agua_poco / agua_count * 100;
    percent_agua_pub = agua_pub / agua_count * 100;
    percent_agua_inex = agua_inex / agua_count * 100;

    circle1.children[0].innerHTML = percent_agua_poco.toFixed(2) + "%";
    circle2.children[0].innerHTML = percent_agua_pub.toFixed(2) + "%";
    circle3.children[0].innerHTML = percent_agua_inex.toFixed(2) + "%";

    percent_gerador = percent_gerador * 360;
    percent_pub = percent_pub * 360;
    percent_renov = percent_renov * 360;
    console.log(percent_gerador , percent_pub , percent_renov )
    slice1.style.transform = `rotate(0deg)`
    slice2.style.transform = `rotate(${percent_pub}deg)`
    slice3.style.transform = `rotate(${percent_pub + percent_gerador}deg)`
    slice1.style.background = `conic-gradient(from 0deg, #5A6ACF ${percent_pub}deg, transparent 0 360deg) `;
    slice2.style.background = `conic-gradient(from 0deg, #8593ED ${percent_gerador}deg , transparent 0 360deg) `;
    slice3.style.background = `conic-gradient(from 0deg, #C7CEFF ${percent_renov}deg , transparent 0 360deg)`;


    totalAlunos.innerHTML = "total de escolas computadas: " + count;
    coletaBar.style.height = ((coleta / count) * 120) + "px";
    coletaBar.children[0].children[0].innerHTML = "quantidade:" + coleta;
    indefinidoBar.style.height =((indefinido / count) * 120)+ "px";
    indefinidoBar.children[0].children[0].innerHTML = "quantidade:" + indefinido;
    queimaBar.style.height = ((queima / count ) * 120) + "px";
    queimaBar.children[0].children[0].innerHTML = "quantidade:" + queima;
    enterraBar.style.height = ((enterra / count )) + "px";
    enterraBar.children[0].children[0].innerHTML = "quantidade:" + enterra;
    publicoBar.style.height = ((publico / count ) * 120) + "px";
    publicoBar.children[0].children[0].innerHTML = "quantidade:" + publico;
    outroBar.style.height = ((outro / count ) * 120) + "px";
    outroBar.children[0].children[0].innerHTML = "quantidade:" + outro;
})




Papa.parse(csvFilePath, {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: function (results) {
        // The converted JSON data will be in results.data
        data = results.data;
        totalAlunos.innerHTML = "total de escolas computadas: " + data.length;
        size = data.length;

        data.forEach(element =>{
            if(element.NO_REGIAO == "Nordeste"){
                if(element.IN_LIXO_DESTINO_FINAL_PUBLICO == "1"){
                    lixo.norderste.publico += 1;
                }
                if(element.IN_LIXO_SERVICO_COLETA){
                    lixo.norderste.privado += 1;
                }
            }
            if(element.NO_REGIAO == "Centro-Oeste"){
                if(element.IN_LIXO_DESTINO_FINAL_PUBLICO == "1"){
                    lixo.centrooeste.publico += 1;
                }
                if(element.IN_LIXO_SERVICO_COLETA){
                    lixo.centrooeste.privado += 1;
                }
            }
            if(element.NO_REGIAO == "Sul"){
                if(element.IN_LIXO_DESTINO_FINAL_PUBLICO == "1"){
                    lixo.sul.publico += 1;
                }
                if(element.IN_LIXO_SERVICO_COLETA){
                    lixo.sul.privado += 1;
                }
            }
            if(element.NO_REGIAO == "Norte"){
                if(element.IN_LIXO_DESTINO_FINAL_PUBLICO == "1"){
                    lixo.norte.publico += 1;
                }
                if(element.IN_LIXO_SERVICO_COLETA){
                    lixo.norte.privado += 1;
                }
            }
            if(element.NO_REGIAO == "Sudeste"){
                if(element.IN_LIXO_DESTINO_FINAL_PUBLICO == "1"){
                    lixo.sudeste.publico += 1;
                }
                if(element.IN_LIXO_SERVICO_COLETA){
                    lixo.sudeste.privado += 1;
                }
            }
        })
        const mixedChart = new Chart(ctx, {
            data: {
                datasets: [{
                    type: 'line',
                    label: 'Bar Dataset',
                    backgroundColor: "#E6E8EC",
                    data: [lixo.norderste.privado, lixo.sudeste.privado, lixo.centrooeste.privado, lixo.sul.privado,lixo.norte.privado]
                }, {
                    type: 'line',
                    label: 'Line Dataset',
                    data: [lixo.norderste.publico, lixo.sudeste.publico, lixo.centrooeste.publico, lixo.sul.publico,lixo.norte.publico],
                    backgroundColor: "#5A6ACF",
                }],
                labels: ['nordeste', 'sudeste', 'centro-oeste', 'sul', 'norte']
            },
        });
    }
});
