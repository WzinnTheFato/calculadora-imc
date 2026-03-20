// ================= IMC =================
function calcular() {
    const pesoInput = document.getElementById('peso').value.replace(',', '.');
    const alturaInput = document.getElementById('altura').value.replace(',', '.');

    const peso = parseFloat(pesoInput);
    const altura = parseFloat(alturaInput);

    const resultado = document.getElementById('resultado');

    // validação forte
    if (!peso || !altura || peso <= 0 || altura <= 0) {
        resultado.style.color = "#ff4d4d";
        resultado.innerHTML = "⚠️ Insira peso e altura válidos (maiores que 0)";
        return;
    }

    const imc = (peso / (altura * altura)).toFixed(2);
    let classificacao = '';

    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 25) classificacao = 'Peso ideal';
    else if (imc < 30) classificacao = 'Sobrepeso';
    else if (imc < 35) classificacao = 'Obesidade I';
    else if (imc < 40) classificacao = 'Obesidade II';
    else classificacao = 'Obesidade Severa';

    resultado.style.color = "#00f7ff";
    resultado.innerHTML = `Seu IMC é ${imc} <br> ${classificacao}`;
}
