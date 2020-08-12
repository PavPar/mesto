/*
Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:

    Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. 
        Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. 
        Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
    
    Содержит публичный метод, который отвечает за отрисовку всех элементов. 
    Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.

У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
*/
export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._itemsArr = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }


    //Отрискова всех элементов содержищхся в itemsArr
    renderItems() {
        this.clear();
        this._itemsArr.forEach(item => {
            this._container.appendChild(this._renderer(item));
        });
    }

    //Добавление отдельного элемента
    addItem(item) {
        this._itemsArr.push(item);
        this._container.insertBefore(this._renderer(item), this._container.firstChild);
    }

    //Очистка контейнира
    clear() {
        this._container.innerHtml = "";
    }
}