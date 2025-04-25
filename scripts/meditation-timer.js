// Meditation Timer Functionality
document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-meditation');
    const pauseButton = document.getElementById('pause-meditation');
    const resetButton = document.getElementById('reset-meditation');
    const timeButtons = document.querySelectorAll('.time-selector button');
    
    let timer;
    let timeLeft = 300; // Default 5 minutes in seconds
    let isRunning = false;
    
    // Initialize timer display
    updateTimerDisplay(timeLeft);
    
    // Start button click handler
    if (startButton) {
        startButton.addEventListener('click', function() {
            if (!isRunning) {
                startTimer();
            }
        });
    }
    
    // Pause button click handler
    if (pauseButton) {
        pauseButton.addEventListener('click', function() {
            if (isRunning) {
                pauseTimer();
            }
        });
    }
    
    // Reset button click handler
    if (resetButton) {
        resetButton.addEventListener('click', resetTimer);
    }
    
    // Time selector buttons
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeLeft = parseInt(this.dataset.time);
            resetTimer();
        });
    });
    
    function startTimer() {
        isRunning = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        
        timer = setInterval(function() {
            timeLeft--;
            updateTimerDisplay(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                timerComplete();
            }
        }, 1000);
    }
    
    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
    
    function resetTimer() {
        pauseTimer();
        updateTimerDisplay(timeLeft);
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
    
    function updateTimerDisplay(seconds) {
        timerDisplay.textContent = formatTime(seconds);
        
        // Visual feedback when time is running low
        if (seconds <= 60) {
            timerDisplay.classList.add('warning');
        } else {
            timerDisplay.classList.remove('warning');
        }
    }
    
    function timerComplete() {
        timerDisplay.textContent = "00:00";
        timerDisplay.classList.add('complete');
        
        // Play completion sound (would need audio file in production)
        // new Audio('sounds/meditation-bell.mp3').play();
        
        // Show completion message
        alert("Meditation session complete! Well done!");
        
        // Reset after a delay
        setTimeout(function() {
            timerDisplay.classList.remove('complete');
            resetTimer();
        }, 3000);
    }
});

// Format seconds as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
