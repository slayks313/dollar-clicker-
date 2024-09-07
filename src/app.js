const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $openWindowButton = document.querySelector('#openWindowButton');
const $modal = document.querySelector('#modal');
const $closeButton1 = document.querySelector('.close1');
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
function showFakeLoadingScreen(duration) {
    const loadingScreen = document.getElementById('fakeLoadingScreen');
    const loadingBar = document.getElementById('loadingBar');
    loadingScreen.style.display = 'flex'; // Показать экран загрузки

    let progress = 0;
    const interval = 100; // Частота обновления (в миллисекундах)
    const increment = (interval / duration) * 100; // Шаг заполнения
    
    const loadingInterval = setInterval(() => {
        progress += increment;
        loadingBar.style.width = progress + '%'; // Увеличиваем ширину полоски

        if (progress >= 100) {
            clearInterval(loadingInterval); // Остановить, когда загрузка завершена
            loadingScreen.style.display = 'none'; // Скрыть экран после окончания
        }
    }, interval);
}

// Пример вызова с временем 3 секунды
showFakeLoadingScreen(1000);


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
if ($closeButton1) {
    $closeButton1.addEventListener('click', () => {
        $modal.style.display = 'none';
    });
}
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


// Get modal elements
const taskModal = document.getElementById("taskModal");
const taskButton = document.getElementById("taskButton");
const closeTaskModal = document.getElementById("closeTaskModal");

// Open the task modal
taskButton.onclick = function() {
    taskModal.style.display = "block";
}

// Close the task modal
closeTaskModal.onclick = function() {
    taskModal.style.display = "none";
}

// Function to complete tasks and add coins
function completeTask(amount) {
    let score = parseInt(document.getElementById('score').innerText);
    score += amount;
    document.getElementById('score').innerText = score;
    alert("Вы получили " + amount + " монет!");
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == taskModal) {
        taskModal.style.display = "none";
    }
}
// Хранение информации о выполненных заданиях


function completeTask(amount, taskId) {
    // Проверка, было ли задание выполнено
    if (!completedTasks[taskId]) {
        let score = parseInt(document.getElementById('score').innerText);
        score += amount;
        document.getElementById('score').innerText = score;

        // Обновляем статус выполнения задания
        completedTasks[taskId] = true;

        // Скрываем кнопку выполнения задания
        document.getElementById(taskId).querySelector('button').disabled = true;
        alert("Вы получили " + amount + " монет!");
    } else {
        alert("Задание уже выполнено.");
    }
}
// Сохранение состояния выполнения задания
function setTaskCompleted(taskId, value) {
    localStorage.setItem(taskId, value);
}

// Получение состояния выполнения задания
function getTaskCompleted(taskId) {
    return localStorage.getItem(taskId) === 'true';
}
// Хранение информации о выполненных заданиях (загружаем из localStorage)


function completeTask(amount, taskId) {
    // Проверка, было ли задание выполнено
    if (!completedTasks[taskId]) {
        let score = parseInt(document.getElementById('score').innerText);
        score += amount;
        document.getElementById('score').innerText = score;

        // Обновляем статус выполнения задания
        completedTasks[taskId] = true;
        setTaskCompleted(taskId, true);  // Сохраняем статус в localStorage

        // Скрываем кнопку выполнения задания
        document.getElementById(taskId).querySelector('button').disabled = true;
        alert("Вы получили " + amount + " монет!");
    } else {
        alert("Задание уже выполнено.");
    }
}
window.addEventListener('load', function() {
    // Проверяем выполненные задания при загрузке страницы
    if (getTaskCompleted('task1')) {
        document.getElementById('task1').querySelector('button').disabled = true;
    }
    if (getTaskCompleted('task2')) {
        document.getElementById('task2').querySelector('button').disabled = true;
    }


});
// Хранение информации о выполненных заданиях
let completedTasks = {
    task1: getTaskCompleted('task1'),
    task2: getTaskCompleted('task2'),
    task3: getTaskCompleted('task3'),
    task4: getTaskCompleted('task4'),
    task5: getTaskCompleted('task5')
};

// Функция для проверки выполнения задания
function checkTasks() {
    let score = getScore();
    let clicks = getClickerCount(); // Пример получения количества кликов (если у вас есть счетчик кликов)

    // Проверка задания 1: накопить 5000$
    if (!completedTasks.task1 && score >= 5000) {
        completeTask(5000, 'task1');
    }

    // Проверка задания 2: накопить 10000$
    if (!completedTasks.task2 && score >= 10000) {
        completeTask(10000, 'task2');
    }

    // Проверка задания 3: совершить 100 кликов
    if (!completedTasks.task3 && clicks >= 10000) {
        completeTask(10000, 'task3');
    }

    // Проверка задания 4: накопить 20000$
    if (!completedTasks.task4 && score >= 20000) {
        completeTask(20000, 'task4');
    }

    // Проверка задания 5: накопить 50000$
    if (!completedTasks.task5 && score >= 50000) {
        completeTask(50000, 'task5');
    }
}

// Функция для выполнения задания
function completeTask(amount, taskId) {
    if (!completedTasks[taskId]) {
        let score = getScore();
        score += amount;
        setScore(score);

        // Обновляем статус выполнения задания
        completedTasks[taskId] = true;
        setTaskCompleted(taskId, true);

        // Отключаем кнопку выполнения задания
        document.getElementById(taskId).querySelector('button').disabled = true;
        alert("Вы выполнили задание и получили " + amount + " монет!");
    }else {
        alert("Задание выполнено")
    }
}

// Запуск проверки заданий каждые 2 секунды
setInterval(checkTasks, 2000);

// Сохранение состояния выполнения задания
function setTaskCompleted(taskId, value) {
    localStorage.setItem(taskId, value);
}

// Получение состояния выполнения задания
function getTaskCompleted(taskId) {
    return localStorage.getItem(taskId) === 'true';
}

// Открытие модального окна с подарками
const giftButton = document.getElementById('giftButton');
const giftModal = document.getElementById('giftModal');
const closeGiftModal = document.getElementById('closeGiftModal');

// Проверяем, скрыта ли кнопка подарков
function checkAllGiftsClaimed() {
    let allGiftsClaimed = true;
    for (let i = 1; i <= 7; i++) {
        if (!claimedGifts[`day${i}`]) {
            allGiftsClaimed = false;
            break;
        }
    }

    // Если все подарки получены, скрываем кнопку открытия окна с подарками
    if (allGiftsClaimed) {
        giftButton.style.display = 'none';
    }
}

// Открытие окна с подарками
giftButton.onclick = function() {
    giftModal.style.display = 'block';
}

// Закрытие окна с подарками
closeGiftModal.onclick = function() {
    giftModal.style.display = 'none';
}

// Хранение информации о полученных подарках
let claimedGifts = {
    day1: getGiftClaimed('day1'),
    day2: getGiftClaimed('day2'),
    day3: getGiftClaimed('day3'),
    day4: getGiftClaimed('day4'),
    day5: getGiftClaimed('day5'),
    day6: getGiftClaimed('day6'),
    day7: getGiftClaimed('day7')
};

// Проверка и получение подарков
function claimGift(day, amount) {
    const today = new Date().getDate();
    const lastClaimed = localStorage.getItem('lastClaimedDay') || 0;

    // Проверяем, что подарок еще не был получен сегодня
    if (lastClaimed != today) {
        let score = getScore();
        score += amount;
        setScore(score);
        claimedGifts[`day${day}`] = true;
        setGiftClaimed(`day${day}`, true);
        localStorage.setItem('lastClaimedDay', today); // Сохраняем день, когда был получен последний подарок

        document.getElementById(`day${day}`).querySelector('button').disabled = true;
        alert(`Вы получили ${amount} монет за День ${day}!`);

        // Проверяем, все ли подарки собраны после каждого получения
        checkAllGiftsClaimed();
    } else {
        alert("Вы уже получили подарок сегодня.");
    }
}

// Сохранение статуса полученных подарков
function setGiftClaimed(day, value) {
    localStorage.setItem(day, value);
}

// Получение статуса полученных подарков
function getGiftClaimed(day) {
    return localStorage.getItem(day) === 'true';
}

// При загрузке страницы проверяем, какие подарки были уже получены
window.addEventListener('load', function() {
    for (let i = 1; i <= 7; i++) {
        if (claimedGifts[`day${i}`]) {
            document.getElementById(`day${i}`).querySelector('button').disabled = true;
        }
    }

    // Проверяем, все ли подарки получены при загрузке
    checkAllGiftsClaimed();
});




