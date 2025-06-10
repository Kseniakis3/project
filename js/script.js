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
    // Переменные для элементов прелоадера и контента
    const preloaderElement = document.getElementById('preloader');
    const contentElement = document.getElementById('content');

    // Проверка наличия элементов
    if (!preloaderElement || !contentElement) {
        console.error('Ошибка: Не найдены элементы preloader или content');
        return;
    }

    // Плавное скрытие прелоадера
    preloaderElement.style.opacity = '0';
    setTimeout(() => {
        preloaderElement.style.display = 'none';
        contentElement.style.display = 'block';
        contentElement.classList.add('show');
        console.log('Контент отображен');
    }, 500);
}

// Функция для вывода заголовков карточек разделов
function loadSectionTitles() {
    // Переменная для списка заголовков
    const titlesList = document.getElementById('section-titles');

    // Проверка наличия списка
    if (!titlesList) {
        console.error('Ошибка: Список заголовков не найден');
        return;
    }

    // Переменная для всех заголовков карточек
    const titleElements = document.querySelectorAll('.section-card__title');

    // Проверка наличия заголовков
    if (titleElements.length === 0) {
        console.error('Ошибка: Заголовки карточек не найдены');
        return;
    }

    // Формирование массива заголовков
    const sectionTitles = Array.from(titleElements).map(element => element.textContent);

    // Очистка списка
    titlesList.innerHTML = '';

    // Вывод заголовков с помощью forEach
    sectionTitles.forEach(title => {
        const listItem = document.createElement('li');
        listItem.classList.add('section-titles__item');
        listItem.textContent = title;
        titlesList.appendChild(listItem);
    });

    console.log('Заголовки разделов загружены:', sectionTitles);
}

// Функция для обработки кликов и наведения на карточки разделов
function handleCardClick() {
    // Переменная для хранения всех карточек
    const sectionCards = document.querySelectorAll('.section-card');

    // Проверка наличия карточек
    if (sectionCards.length === 0) {
        console.error('Ошибка: Карточки разделов не найдены');
        return;
    }

    // Добавление слушателей для каждой карточки
    sectionCards.forEach(card => {
        card.addEventListener('click', function() {
            sectionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            console.log(`Выбран раздел: ${this.dataset.section}`);
        });

        card.addEventListener('mouseover', function() {
            console.log(`Наведение на раздел: ${this.dataset.section}`);
        });
    });
}

// Функция для обработки кликов по навигации
function handleNavigationClick() {
    // Переменная для ссылок навигации
    const navLinks = document.querySelectorAll('.navigation__link');

    // Проверка наличия ссылок
    if (navLinks.length === 0) {
        console.error('Ошибка: Ссылки навигации не найдены');
        return;
    }

    // Добавление слушателей для ссылок
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
function loadArticles(filterCategory = 'all') {
    // Переменная для списка статей
    const articlesList = document.getElementById('articles-list');

    // Проверка наличия списка
    if (!articlesList) {
        console.error('Ошибка: Список статей не найден');
        return;
    }

    // Массив статей с категориями
    const articlesData = [
        { id: 'east', title: 'Цивилизации Древнего Востока', category: 'ancient' },
        { id: 'philosophy', title: 'Античная философия', category: 'ancient' },
        { id: 'rome', title: 'Римская империя', category: 'ancient' },
        { id: 'greece', title: 'Древнегреческое искусство', category: 'ancient' },
        { id: 'byzantine', title: 'Византийская империя', category: 'medieval' },
        { id: 'crusades', title: 'Крестовые походы', category: 'medieval' },
        { id: 'renaissance', title: 'Эпоха Возрождения', category: 'modern' },
        { id: 'discoveries', title: 'Великие географические открытия', category: 'modern' },
        { id: 'french-revolution', title: 'Французская революция', category: 'modern' },
        { id: 'industrial-revolution', title: 'Промышленная революция', category: 'contemporary' }
    ];

    // Очистка списка
    articlesList.innerHTML = '';

    // Фильтрация и отображение статей
    articlesData.forEach(article => {
        // Проверка категории для фильтрации
        if (filterCategory === 'all' || article.category === filterCategory) {
            const listItem = document.createElement('li');
            listItem.classList.add('articles__item');
            const link = document.createElement('a');
            link.href = '#';
            link.classList.add('articles__link');
            link.dataset.article = article.id;
            link.textContent = article.title;
            listItem.appendChild(link);
            articlesList.appendChild(listItem);
        }
    });

    console.log(`Список статей загружен с фильтром: ${filterCategory}`);
}

// Функция для фильтрации статей по категориям
function filterArticles() {
    // Переменная для кнопок фильтрации
    const filterButtons = document.querySelectorAll('.articles__filter-button');

    // Проверка наличия кнопок
    if (filterButtons.length === 0) {
        console.error('Ошибка: Кнопки фильтрации не найдены');
        return;
    }

    // Добавление слушателей для кнопок
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаление активного класса у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавление активного класса текущей кнопке
            this.classList.add('active');

            // Получение категории для фильтра
            const selectedCategory = this.dataset.filter;

            // Проверка корректности категории
            if (!['all', 'ancient', 'medieval', 'modern', 'contemporary'].includes(selectedCategory)) {
                console.error('Ошибка: Неверная категория фильтра');
                return;
            }

            // Загрузка отфильтрованного списка
            loadArticles(selectedCategory);
            console.log(`Применён фильтр: ${selectedCategory}`);
        });
    });
}

// Функция для обработки кликов по статьям
function handleArticleClick() {
    // Переменная для списка статей
    const articlesList = document.getElementById('articles-list');

    // Проверка наличия списка
    if (!articlesList) {
        console.error('Ошибка: Список статей не найден');
        return;
    }

    // Делегирование событий для ссылок
    articlesList.addEventListener('click', event => {
        if (event.target.classList.contains('articles__link')) {
            event.preventDefault();
            console.log(`Выбрана статья: ${event.target.dataset.article}`);
        }
    });
}

// Функция для обработки кнопки скролла вверх
function handleScrollTop() {
    // Переменная для кнопки скролла
    const scrollTopButton = document.getElementById('scroll-top');

    // Проверка наличия кнопки
    if (!scrollTopButton) {
        console.error('Ошибка: Кнопка скролла не найдена');
        return;
    }

    // Слушатель клика для плавного скролла
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log('Скролл к началу страницы');
    });

    // Слушатель прокрутки для показа/скрытия кнопки
    window.addEventListener('scroll', () => {
        // Проверка позиции прокрутки
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
}

// Основная функция
document.addEventListener('DOMContentLoaded', () => {
    console.log('Скрипт успешно загружен!');
    try {
        // Инициализация всех динамических функций
        setTimeout(showContent, 3000);
        loadSectionTitles();
        handleCardClick();
        handleNavigationClick();
        loadArticles();
        filterArticles();
        handleArticleClick();
        handleScrollTop();
    } catch (error) {
        console.error('Ошибка при инициализации скрипта:', error);
    }
});