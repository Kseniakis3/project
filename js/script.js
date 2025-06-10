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
        console.error('Ошибка: Не найдены элементы прелоадера или контента');
        return;
    }

    // Плавное скрытие прелоадера
    preloaderElement.style.opacity = '0';
    setTimeout(() => {
        preloaderElement.style.display = 'none';
        contentElement.style.display = 'block';
        contentElement.classList.add('show');
        console.log('Контент отображён');
        // Проверка видимости контента
        if (window.getComputedStyle(contentElement).display === 'none') {
            console.error('Ошибка: Контент всё ещё скрыт, проверьте CSS');
        }
    }, 1000);
}

// Функция для загрузки данных из JSON
async function fetchCardsData() {
    try {
        // Загрузка данных из data.json
        const response = await fetch('/data/data.json'); // Если в папке data/, замените на '/data/data.json'
        if (!response.ok) {
            throw new Error(`Ошибка загрузки JSON: ${response.status}`);
        }
        const data = await response.json();
        console.log('Данные из JSON загружены:', data);
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error);
        return null;
    }
}

// Функция для динамического вывода блока карточек
async function renderDynamicCards() {
    // Переменная для контейнера динамического блока
    const dynamicCardsContainer = document.getElementById('dynamic-cards');

    // Проверка наличия контейнера
    if (!dynamicCardsContainer) {
        console.error('Ошибка: Контейнер для динамических карточек не найден');
        return;
    }

    // Получение данных из JSON
    const cardsData = await fetchCardsData();
    if (!cardsData) {
        console.error('Ошибка: Данные карточек не загружены');
        return;
    }

    // Создание заголовка и списка
    const titleElement = document.createElement('h3');
    titleElement.classList.add('dynamic-cards__title');
    titleElement.textContent = 'Список разделов';
    const listElement = document.createElement('ul');
    listElement.classList.add('dynamic-cards__list');

    // Вывод элементов с помощью for...in
    for (let cardId in cardsData) {
        const itemElement = document.createElement('li');
        itemElement.classList.add('dynamic-cards__item');

        const itemTitle = document.createElement('div');
        itemTitle.classList.add('dynamic-cards__item-title');
        itemTitle.textContent = cardsData[cardId].title;

        const itemDescription = document.createElement('p');
        itemDescription.classList.add('dynamic-cards__item-description');
        itemDescription.textContent = cardsData[cardId].description;

        itemElement.appendChild(itemTitle);
        itemElement.appendChild(itemDescription);
        listElement.appendChild(itemElement);
    }

    // Добавление в контейнер
    dynamicCardsContainer.appendChild(titleElement);
    dynamicCardsContainer.appendChild(listElement);
    console.log('Динамический блок карточек выведен');
}

// Функция для вывода заголовков карточек
function loadCardTitles() {
    // Переменная для списка заголовков
    const titlesList = document.getElementById('card-titles');

    // Проверка наличия списка
    if (!titlesList) {
        console.error('Ошибка: Список заголовков не найден');
        return;
    }

    // Переменная для всех заголовков карточек
    const titleElements = document.querySelectorAll('.card__title');

    // Проверка наличия заголовков
    if (titleElements.length === 0) {
        console.error('Ошибка: Заголовки карточек не найдены');
        return;
    }

    // Формирование массива заголовков
    const cardTitles = Array.from(titleElements).map(element => element.textContent);

    // Очистка списка
    titlesList.innerHTML = '';

    // Вывод заголовков с помощью forEach
    cardTitles.forEach(title => {
        const listItem = document.createElement('li');
        listItem.classList.add('card-titles__item');
        listItem.textContent = title;
        titlesList.appendChild(listItem);
    });

    console.log('Заголовки карточек загружены:', cardTitles);
}

// Функция для обработки кликов и наведения на карточки
function handleCardClick() {
    // Переменная для хранения всех карточек
    const cards = document.querySelectorAll('.card');

    // Проверка наличия карточек
    if (cards.length === 0) {
        console.error('Ошибка: Карточки не найдены');
        return;
    }

    // Добавление слушателей для каждой карточки
    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            console.log(`Выбрана карточка: ${this.dataset.section}`);
        });

        card.addEventListener('mouseover', function() {
            console.log(`Наведение на карточку: ${this.dataset.section}`);
        });
    });
}

// Функция для обработки кликов по навигации
function handleLinksClick() {
    // Переменная для ссылок навигации
    const links = document.querySelectorAll('.links-link');

    // Проверка наличия ссылок
    if (links.length === 0) {
        console.error('Ошибка: Ссылки навигации не найдены');
        return;
    }

    // Добавление слушателей для ссылок
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            links.forEach(l => l.classList.remove('links-link--active'));
            this.classList.add('links-link--active');
            console.log(`Выбран пункт навигации: ${this.dataset.page}`);
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
        { id: 'philosophy', title: 'Древняя философия', category: 'ancient' },
        { id: 'rome', title: 'Римская империя', category: 'ancient' },
        { id: 'greece', title: 'Искусство Древней Греции', category: 'ancient' },
        { id: 'byzantine', title: 'Византийская империя', category: 'medieval' },
        { id: 'crusades', title: 'Крестовые походы', category: 'medieval' },
        { id: 'renaissance', title: 'Ренессанс', category: 'modern' },
        { id: 'discoveries', title: 'Великие географические открытия', category: 'modern' },
        { id: 'french-revolution', title: 'Французская революция', category: 'modern' },
        { id: 'industrial-revolution', title: 'Промышленная революция', category: 'classic' }
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
            if (!['all', 'ancient', 'medieval', 'modern', 'classic'].includes(selectedCategory)) {
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

// Функция для инициализации Swiper
function initSwiper() {
    // Проверка наличия Swiper
    if (!window.Swiper) {
        console.error('Ошибка: Swiper не загружен');
        return;
    }

    // Проверка наличия контейнера карусели
    const swiperContainer = document.querySelector('.cards__carousel');
    if (!swiperContainer) {
        console.error('Ошибка: Контейнер карусели (.cards__carousel) не найден');
        return;
    }

    // Проверка наличия кнопок навигации
    const prevButton = swiperContainer.querySelector('.swiper-button-prev');
    const nextButton = swiperContainer.querySelector('.swiper-button-next');
    const pagination = swiperContainer.querySelector('.swiper-pagination');
    console.log('Кнопки навигации:', { prevButton: !!prevButton, nextButton: !!nextButton, pagination: !!pagination });

    // Инициализация карусели
    const swiper = new Swiper('.cards__carousel', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1200: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 1,
            }
        }
    });

    // Проверка инициализации
    console.log('Swiper инициализирован:', swiper);

    // Добавление отладки для навигации
    if (prevButton) {
        prevButton.addEventListener('click', () => console.log('Нажата кнопка "Назад"'));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => console.log('Нажата кнопка "Вперёд"'));
    }
}

// Функция для обработки формы с LocalStorage
function handleSearchForm() {
    // Переменные для формы и поля ввода
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Проверка наличия элементов
    if (!searchForm || !searchInput) {
        console.error('Ошибка: Форма или поле поиска не найдены');
        return;
    }

    // Восстановление данных из localStorage
    const savedSearch = localStorage.getItem('searchQuery');
    if (savedSearch) {
        searchInput.value = savedSearch;
        console.log('Восстановлен поисковый запрос:', savedSearch);
    }

    // Обработка отправки формы
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            localStorage.setItem('searchQuery', query);
            console.log('Поисковый запрос сохранён:', query);
            alert(`Поиск: ${query}`);
        } else {
            console.warn('Поисковый запрос пустой');
        }
    });
}

// Основная функция
document.addEventListener('DOMContentLoaded', () => {
    console.log('Скрипт успешно загружен');
    try {
        // Инициализация всех функций
        setTimeout(showContent, 3000);
        initSwiper();
        loadCardTitles();
        renderDynamicCards();
        handleCardClick();
        handleLinksClick();
        loadArticles();
        filterArticles();
        handleArticleClick();
        handleScrollTop();
        handleSearchForm();
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
    }
});