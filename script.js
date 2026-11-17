// Funciones de Lógica JavaScript
function esPalindromo(str) {
    let limpia = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let reverso = limpia.split('').reverse().join('');
    return limpia === reverso ? `"${str}" ES un palíndromo.` : `"${str}" NO es un palíndromo.`;
}

function mayorNumero(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) return "Introduce números válidos.";
    if (num1 > num2) return `${num1} es mayor que ${num2}.`;
    if (num2 > num1) return `${num2} es mayor que ${num1}.`;
    return `${num1} y ${num2} son iguales.`;
}

function extraerVocales(str) {
    let vocales = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
    let resultado = [];
    str = str.toLowerCase();
    for (let char of str) {
        if (vocales.includes(char) && !resultado.includes(char)) {
            resultado.push(char);
        }
    }
    return resultado.length > 0 ? `Vocales encontradas: ${resultado.join(', ')}` : 'No se encontraron vocales.';
}

function contarVocales(str) {
    let conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    str = str.toLowerCase();
    for (let char of str) {
        let norm = char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (norm in conteo) conteo[norm]++;
    }
    let res = `Conteo de vocales:\n`;
    let total = 0;
    for (let v in conteo) {
        res += `- ${v.toUpperCase()}: ${conteo[v]}\n`;
        total += conteo[v];
    }
    res += `Total de vocales: ${total}`;
    return res;
}

// Control de interfaz y formularios
function mostrarEjercicio(id) {
    document.querySelectorAll('.ejercicio-form').forEach(f => f.style.display = 'none');
    if (id === 'ajax') {
        document.getElementById('ajaxSection').style.display = 'block';
    } else {
        document.getElementById(id + 'Form').style.display = 'block';
    }
}

function ejecutarPalindromo(e) {
    e.preventDefault();
    let val = document.getElementById('cadena').value;
    alert(esPalindromo(val));
}
function ejecutarMayor(e) {
    e.preventDefault();
    let n1 = document.getElementById('num1').value;
    let n2 = document.getElementById('num2').value;
    alert(mayorNumero(n1, n2));
}
function ejecutarVocales(e) {
    e.preventDefault();
    let f = document.getElementById('fraseVocales').value;
    alert(extraerVocales(f));
}
function ejecutarContar(e) {
    e.preventDefault();
    let f = document.getElementById('fraseContar').value;
    alert(contarVocales(f));
}

// Lógica de AJAX
document.addEventListener("DOMContentLoaded", function () {
    const inputUrl = document.getElementById("recurso");
    const btnCargar = document.getElementById("enviar");
    const divContenidos = document.getElementById("contenidos");
    const divEstados = document.getElementById("estados");
    const divCabeceras = document.getElementById("cabeceras");
    const divCodigo = document.getElementById("codigo");

    // Mostrar por defecto la URL de la propia página
    inputUrl.value = window.location.href;

    btnCargar.addEventListener("click", function () {
        let url = inputUrl.value;
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            let estadoTexto = "";
            switch (xhr.readyState) {
                case 0: estadoTexto = "0: Petición no iniciada (UNSENT)"; break;
                case 1: estadoTexto = "1: Conexión establecida (OPENED)"; break;
                case 2: estadoTexto = "2: Petición recibida (HEADERS_RECEIVED)"; break;
                case 3: estadoTexto = "3: Procesando petición (LOADING)"; break;
                case 4: estadoTexto = "4: Petición finalizada (DONE)"; break;
            }
            divEstados.innerHTML += `<p>${estadoTexto}</p>`;

            if (xhr.readyState === 4) {
                divCodigo.innerHTML = `<strong>Código:</strong> ${xhr.status} - ${xhr.statusText}`;
                if (xhr.status === 200 || xhr.status === 0) {
                    divContenidos.innerText = xhr.responseText;
                    divCabeceras.innerText = xhr.getAllResponseHeaders();
                } else {
                    divContenidos.innerHTML = `<span style="color:red;">Error HTTP: ${xhr.status}</span>`;
                }
            }
        };

        divEstados.innerHTML = "";
        divCabeceras.innerHTML = "";
        divCodigo.innerHTML = "";
        divContenidos.innerHTML = "Cargando contenido...";

        xhr.open("GET", url, true);
        xhr.send(null);
    });

    mostrarEjercicio('palindromo'); // Mostrar por defecto
});