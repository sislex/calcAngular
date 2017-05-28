import {Component} from '@angular/core';

@Component({
    selector: 'app-calc',
    templateUrl: './calc.component.html',
    styleUrls: ['./calc.component.css']
})
export class CalcComponent {
    private arr = []; // Массив ВСЕХ чисел введённых в одном примере
    private screen_info: string = null; // Отображение вводимых данных
    // viewAct: string = null; // Отображение полностью всего примера
    // private act: string = null; // Проверка на нахождение действий(+-*/)
    // private comma: boolean = false; // Проверка на нахождении в числе запятой
    private simbol: string; // Последний символ в последнем элементе массива "arr"
    private characters: string; // Последний элемент в массиве "arr"
    private answer = ''; // Ответ
    private buttonsList: [string] = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
    ];
    private numbersList: [string] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    private symbolsList: [string] = ['+', '-', '*', '/'];

    constructor() {}

    // Очищаю ВЕСЬ массив с числами и вывожу пример на экран (в данном случае пустоту).
    private funcClear() {
        this.arr = [];
        this.example();
        this.simbol = '';
    }

    // Удаляю последний элемнт в последнем элементе массива,
    // Если последний элемент пустой, то удаляю последний элемент. Вывожу пример на экран
    private deleteLastCharacter() {
        if (this.arr.length > 0) {
            this.arr[this.arr.length - 1] = this.arr[this.arr.length - 1].substr(0, this.arr[this.arr.length - 1].length - 1);
            if (this.arr[this.arr.length - 1] === '') {
                this.arr.pop();
            }
            this.example();
        }
    }

    private addSymbol(button: string) {
        if (this.numbersList.indexOf(button) !== -1) {
            this.addNumber(button);
        } else if (this.symbolsList.indexOf(button) !== -1) {
            this.addAct(button);
        } else if (button === '.') {
            this.addComma();
        }else if (button === '=') {
            this.funcAnswer();
        }
    }

    // Добавляю цифры
    private addNumber(number) {
        if (((this.arr.length === 0) && (this.arr[0] === undefined)) || ((this.arr.length === 1) && (this.arr[0] === '0'))) {
            this.arr[0] = number;
        }else if ((this.arr.length === 1) && (this.arr[0] === '-0')) {
            this.deleteLastCharacter();
            this.arr[this.arr.length - 1] += number;
        }else {
            this.arr[this.arr.length - 1] += number;
        }
        this.example();
    }

    // Добавляю точку для дробных значений
    private addComma() {
        let comma = '';
        if (this.arr.length > 0) {
            for (let i = 0; i < this.arr[this.arr.length - 1].length; i++) {
                if (this.arr[this.arr.length - 1][i] === '.') {
                    comma = '.';
                }
            }
            this.poisk();
        }

        if ((this.arr.length === 0) && (this.arr[0] === undefined)) {
            this.arr[0] = '0.';
        }else if (
            (comma !== '.') && (this.symbolsList.indexOf(this.simbol) !== -1)
        ) {
            this.arr[this.arr.length - 1] += '0.';
        }else if (
            (comma !== '.') && (this.symbolsList.indexOf(this.simbol) === -1)
        ) {
            this.arr[this.arr.length - 1] += '.';
        }
        this.example();
    }

    // Добавляю арифметические действия
    private addAct(act) {
        if (this.arr.length > 0) {
            this.poisk();
        }
        if ((this.arr.length === 0) && (this.arr[0] === undefined) && (act === '-')) {
            this.arr[0] = '-';
        }else if (
            ((this.arr.length === 1) && (this.simbol === '-') && (act === '+'))
        ) {
            this.deleteLastCharacter();
        } else if (this.numbersList.indexOf(this.simbol) !== -1) {// тут нужна проверка на число
            this.arr.push(act);
        }else if (
            (this.symbolsList.indexOf(this.simbol) === -1) && (this.arr.length > 1)
        ) {
            this.deleteLastCharacter();
            this.arr.push(act);
        }
        this.example();
    }

    // Вывод ответа
    private funcAnswer() {
        this.answer = '';
        if (this.arr.length > 0) {
            this.poisk();
            for (let i = 0; i < this.arr.length; i++) {
                this.answer += this.arr[i];
            }
            if (this.simbol !== '.') {
                if (this.symbolsList.indexOf(this.simbol) !== -1) {
                    this.answer = this.answer.substr(0, this.answer.length - 1);
                }
                this.answer = (Math.round(eval(this.answer) * 1000000000000) / 1000000000000).toString();
                this.arr = [this.answer];
                this.example();
                this.simbol = '';
            }
        }
    }

    // Поиск последненго символа в последнем числе массива
    private poisk() {
        this.characters = this.arr[this.arr.length - 1];
        this.simbol = this.characters[this.characters.length - 1];
    }

    // Построение всего примера из массива чисел
    private example() {
        this.screen_info = '';
        for (let i = 0; i < this.arr.length; i++) {
            this.screen_info += this.arr[i];
        }
    }
}
