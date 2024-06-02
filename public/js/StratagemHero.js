let currentArrows = []; 
let arrows100 = [];
let timerId; 
let timeLeft = 20;
let correctAnswers = 0; 
let resetTimerAndCounter = false;
const arrows = ['🢁', '🢃', '🢀', '🢂'];
const container = document.getElementById('arrowsContainer');



document.getElementById('generateButton').addEventListener('click', function() {
    resetTimerAndCounter = true; 
    generateArrows(); 
});
document.addEventListener('keydown', function(event) {
    
    if (keyToArrow[event.key]) {
        event.preventDefault();
    
    const key = event.key; 
    const pressedArrow = keyToArrow[key];
    checkArrow(pressedArrow);
    }
});

function updateTimer() {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timerId); 
        alert('Time Left!'); 
    } else {
        document.getElementById('timerDisplay').textContent = `Remaining time: ${timeLeft} seconds`;
    }
}


function generateArrows() {
    container.innerHTML = ''; 

    currentArrows = []; 
    
    for (let i = 0; i < Math.floor(Math.random() * (7 - 4 + 1) + 4); i++) {
        const randomIndex = Math.floor(Math.random() * arrows.length); 
        const arrow = arrows[randomIndex]; 
        currentArrows.push(arrow); 

        const arrowElement = document.createElement('span'); 
        arrowElement.textContent = arrow; 
        arrowElement.id = i;
        container.appendChild(arrowElement); 


    }

   
    if (!timerId) {
        timerId = setInterval(updateTimer, 1000);
    }
    if (resetTimerAndCounter) {
        
        if (timerId) {
            clearInterval(timerId);
        }

        
        correctAnswers = 0;
        
        document.getElementById('correctAnswersDisplay').textContent = `Correct answers: ${correctAnswers}`;

        timeLeft = 20; 
        timerId = setInterval(updateTimer, 1000); 
        
        resetTimerAndCounter = false;
    }
    if(document.getElementById('destroy')){
    document.getElementById('destroy').remove();
    document.getElementById('generateButtonContainer').remove();
    }
}



const keyToArrow = {
    "ArrowUp": "🢁",
    "ArrowDown": "🢃",
    "ArrowLeft": "🢀",
    "ArrowRight": "🢂",
    'w': "🢁",
    's': "🢃",
    'a': "🢀",
    'd': "🢂",
    'W': "🢁",
    'S': "🢃",
    'A': "🢀",
    'D': "🢂"
};

function checkArrow(pressedArrow) {
    const index = document.getElementById('arrowsContainer').querySelectorAll('.green').length;

    const expectedArrow = currentArrows[index]; 
    console.log('pressedArrow:', pressedArrow);
    console.log('expectedArrow:', expectedArrow);
    const arrowElements = document.querySelectorAll('#arrowsContainer span');
        

    if (pressedArrow === expectedArrow) {
        console.log(index);
        if (index !== -1) {
            arrowElements[index].className = 'green';
            
        }
        if (currentArrows.length-1 == index) {
            correctAnswers++;
            document.getElementById('correctAnswersDisplay').textContent = `Correct answers: ${correctAnswers}`;
            timeLeft+=5;
            document.getElementById('timerDisplay').textContent = `Remaining time: ${timeLeft} seconds`
            generateArrows();
        }
    }
    else if(index > 0) {
        arrowElements[index -1].className = '';
        
    }
    console.log(currentArrows.length-1 == index);
}