document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const startBtn = document.getElementById('start');
    const resultDiv = document.getElementById('result');

    let startTime, endTime;

    startBtn.addEventListener('click', function() {
        startTime = Date.now();
        inputText.disabled = true;
        startBtn.disabled = true;
        resultDiv.textContent = 'Началась игра...';

        setTimeout(function() {
            endTime = Date.now();
            inputText.disabled = false;
            startBtn.disabled = false;
            resultDiv.textContent = `Время: ${endTime - startTime} мс`;
            const speed = inputText.value.length / (endTime - startTime) * 1000; // Скорость в символах в секунду
            resultDiv.innerHTML += `<br>Скорость печати: ${speed.toFixed(2)} симв/с`;
        }, 5000); // Задержка в 5 секунд для имитации игры
    });
});
