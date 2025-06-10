// Алгоритм для функции handleCardClick:
// 1. Найти все элементы с классом .section-card и сохранить в переменную cards.
// 2. Проверить, существуют ли карточки:
//    - Если нет, вывести ошибку в консоль и завершить выполнение.
// 3. Для каждой карточки добавить два слушателя событий:
//    - Слушатель click:
//      - Удалить класс .active у всех карточек.
//      - Добавить класс .active к текущей карточке.
//      - Вывести в консоль название раздела (data-section).
//    - Слушатель mouseover:
//      - Вывести в консоль сообщение о наведении с data-section.
// Блок-схема: images/diagram.png.

// Функция для управления прелоадером
function showContent() {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    if (!preloader || !content) {
        console.error('Ошибка: Не найдены элементы preloader или content');
        return;
    }

    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        content.style.display = 'block';
        content.classList.add('show');
        console.log('Контент отображен');
    }, 500);
}

// Функция для обработки кликов и наведения на карточки разделов
function handleCardClick() {
    // Переменная для хранения всех карточек
    const cards = document.querySelectorAll('.section-card');

    // Проверка наличия карточек
    if (cards.length === 0) {
        console.error('Ошибка: Карточки разделов не найдены');
        return;
    }

    // Добавление слушателей для каждой карточки
    cards.forEach(card => {
        // Слушатель для клика
        card.addEventListener('click', function() {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            console.log(`Выбран раздел: ${this.dataset.section}`);
        });

        // Слушатель для наведения
        card.addEventListener('mouseover', function() {
            console.log(`Наведение на раздел: ${this.dataset.section}`);
        });
    });
}

// Функция для обработки кликов по навигации
function handleNavigationClick() {
    const navLinks = document.querySelectorAll('.navigation__link');

    if (navLinks.length === 0) {
        console.error('Ошибка: Ссылки навигации не найдены');
        return;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            navLinks.forEach(l => l.classList.remove('navigation__link--active'));
            this.classList.add('navigation__link--active');
            console.log(`Выбран пункт навигации: ${this.dataset.nav}`);
        });
    });
}

// Функция для динамической загрузки списка статей
function loadArticles() {
    const articlesList = document.getElementById('articles-list');

    if (!articlesList) {
        console.error('Ошибка: Список статей не найден');
        return;
    }

    const articles = [
        { id: 'east', title: 'Цивилизации Древнего Востока' },
        { id: 'philosophy', title: 'Античная философия' },
        { id: 'rome', title: 'Римская империя' },
        { id: 'greece', title: 'Древнегреческое искусство' },
        { id: 'byzantine', title: 'Византийская империя' },
        { id: 'crusades', title: 'Крестовые походы' },
        { id: 'renaissance', title: 'Эпоха Возрождения' },
        { id: 'discoveries', title: 'Великие географические открытия' },
        { id: 'french-revolution', title: 'Французская революция' },
        { id: 'industrial-revolution', title: 'Промышленная революция' }
    ];

    articlesList.innerHTML = '';
    articles.forEach(article => {
        const li = document.createElement('li');
        li.classList.add('articles__item');
        const a = document.createElement('a');
        a.href = '#';
        a.classList.add('articles__link');
        a.dataset.article = article.id;
        a.textContent = article.title;
        li.appendChild(a);
        articlesList.appendChild(li);
    });

    console.log('Список статей загружен динамически');
}

// Функция для обработки кликов по статьям
function handleArticleClick() {
    const articlesList = document.getElementById('articles-list');

    if (!articlesList) {
        console.error('Ошибка: Список статей не найден');
        return;
    }

    articlesList.addEventListener('click', event => {
        if (event.target.classList.contains('articles__link')) {
            event.preventDefault();
            console.log(`Выбрана статья: ${event.target.dataset.article}`);
        }
    });
}

// Основная функция
document.addEventListener('DOMContentLoaded', () => {
    console.log('Скрипт успешно загружен!');
    try {
        setTimeout(showContent, 3000);
        handleCardClick();
        handleNavigationClick();
        loadArticles();
        handleArticleClick();
    } catch (error) {
        console.error('Ошибка при инициализации скрипта:', error);
    }
});