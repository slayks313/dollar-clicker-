const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $openWindowButton = document.querySelector('#openWindowButton');
const $modal = document.querySelector('#modal');
const $closeButton = document.querySelector('.close');
const $indicators = document.querySelectorAll('.indicator'); 
const $changeBackgroundButton = document.getElementById('changeBackgroundButton');

let clickValue = getClickValue(); 
let upgradeCosts = [10000, 20000, 30000, 40000, 50000]; 
let upgradesBought = getUpgradesBought(); 
let clickerCount = getClickerCount();  
let clickerCost = getClickerCost();  
let backgroundChanged = getBackgroundChanged();  // Состояние фона загружаем из localStorage

function start() {
    setScore(getScore());
    setImage();
    updateUpgradeButtonText();
    updateIndicators(); 
    setInitialBackground(); // Устанавливаем начальный фон
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) || 0;
}

function setClickValue(value) {
    localStorage.setItem('clickValue', value);
}

function getClickValue() {
    return Number(localStorage.getItem('clickValue')) || 1; 
}

function setUpgradesBought(value) {
    localStorage.setItem('upgradesBought', value);
}

function getUpgradesBought() {
    return Number(localStorage.getItem('upgradesBought')) || 0;
}

function setClickerCount(value) {
    localStorage.setItem('clickerCount', value);
}

function getClickerCount() {
    return Number(localStorage.getItem('clickerCount')) || 1; 
}

function setClickerCost(value) {
    localStorage.setItem('clickerCost', value);
}

function getClickerCost() {
    return Number(localStorage.getItem('clickerCost')) || 50; 
}

function setBackgroundChanged(value) {
    localStorage.setItem('backgroundChanged', value);
}

function getBackgroundChanged() {
    return localStorage.getItem('backgroundChanged') === 'true';
}

function addOne(event) {
    setScore(getScore() + clickValue * clickerCount); 
    setImage();

    const rect = $circle.getBoundingClientRect();

    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = `+${clickValue * clickerCount}`;
    
    plusOne.style.left = `${event.pageX - rect.left}px`;
    plusOne.style.top = `${event.pageY - rect.top}px`;

    $circle.parentElement.appendChild(plusOne);

    setTimeout(() => {
        plusOne.remove();
    }, 2000);
}

function setImage() {
    const score = getScore();
    if (score >= 100000) {
        $circle.setAttribute('src', './img/1dollar.jpg');
    }else if (score >= 50000) {
        $circle.setAttribute('src', './img/libcent.png');
    }else if (score >= 25000) {
        $circle.setAttribute('src', './img/50cent.htm');
    } else if (score >= 5000) {
    $circle.setAttribute('src', './img/25cent.jpg');

     } else  if (score >= 2500) {
        $circle.setAttribute('src', './img/cent10.jpg');
    } else if (score >= 500) {
        $circle.setAttribute('src', './img/cent5.jpg');
    } 
}

function updateUpgradeButtonText() {
    if (upgradesBought < upgradeCosts.length) {
        document.getElementById('upgradeButton').innerText = `Улучшить клики`;
    } else {
        document.getElementById('upgradeButton').innerText = 'max';
        document.getElementById('upgradeButton').disabled = true;
    }
}

function updateIndicators() {
    for (let i = 0; i < $indicators.length; i++) {
        if (i < upgradesBought) {
            $indicators[i].classList.add('active');
        } else {
            $indicators[i].classList.remove('active');
        }
    }
}

// Устанавливаем начальный фон при загрузке страницы
function setInitialBackground() {
    const bodyElement = document.body;
    if (backgroundChanged) {
        bodyElement.classList.add('background-2');
    } else {
        bodyElement.classList.add('background-1');
    }
}

// Логика для изменения обоев при нажатии на кнопку
if ($changeBackgroundButton) {
    $changeBackgroundButton.addEventListener('click', function() {
        const bodyElement = document.body;
        if (backgroundChanged) {
            bodyElement.classList.remove('background-2');
            bodyElement.classList.add('background-1');
        } else {
            bodyElement.classList.remove('background-1');
            bodyElement.classList.add('background-2');
        }
        backgroundChanged = !backgroundChanged;
        setBackgroundChanged(backgroundChanged);
    });
}

// Открытие модального окна
if ($openWindowButton) {
    $openWindowButton.addEventListener('click', () => {
        $modal.style.display = 'block';
    });
}

// Закрытие модального окна
if ($closeButton) {
    $closeButton.addEventListener('click', () => {
        $modal.style.display = 'none';
    });
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', (event) => {
    if ($modal && event.target == $modal) {
        $modal.style.display = 'none';
    }
});

window.addEventListener('load', start);

if ($circle) {
    $circle.addEventListener('click', addOne);
}

const upgradeButton = document.getElementById('upgradeButton');
if (upgradeButton) {
    upgradeButton.addEventListener('click', () => {
        const score = getScore();
        if (upgradesBought < upgradeCosts.length && score >= upgradeCosts[upgradesBought]) {
            setScore(score - upgradeCosts[upgradesBought]);
            upgradesBought++;
            setUpgradesBought(upgradesBought);
            clickValue *= 2;
            setClickValue(clickValue);
            updateUpgradeButtonText();
            updateIndicators();
        } else if (upgradesBought >= upgradeCosts.length) {
            alert("Все улучшения куплены!");
        } else {
            alert("Недостаточно денег для улучшения!");
        }
    });
}

// Логика для покупки нового кликера
const buyClickerButton = document.getElementById('buyClickerButton');
if (buyClickerButton) {
    buyClickerButton.addEventListener('click', function() {
        const score = getScore();
        if (score >= clickerCost) {
            setScore(score - clickerCost);
            clickerCount++;
            setClickerCount(clickerCount);
            clickerCost *= 2;
            setClickerCost(clickerCost);
            alert('Вы купили новый кликер! Теперь каждый клик приносит ' + (clickValue * clickerCount) + ' очков.');
        } else {
            alert('Недостаточно средств для покупки кликера!');
        }
    });
}

