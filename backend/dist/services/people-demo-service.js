"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.getPeople = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return [
            {
                id: 'zg6j7glicrg88pyy',
                name: 'Bobby',
                favourite_color: {
                    name: 'Pickle Green',
                    code: '#b9df8d'
                },
                age: 28
            },
            {
                id: 'wzarts0vlqq6m5hy',
                name: 'Amy',
                favourite_color: {
                    name: 'Sea Blue',
                    code: '#147fc6'
                },
                age: 17
            },
            {
                id: 'm08dkxyqfr65ju88',
                name: 'Tim',
                favourite_color: {
                    name: 'Desert Orange',
                    code: '#d48602'
                },
                age: 31
            },
            {
                id: 'nmmoz0ym8vr77rx1',
                name: 'Isabella',
                favourite_color: {
                    name: 'Cold Red',
                    code: '#d82349'
                },
                age: 38
            },
            {
                id: '7ciktfybixf8fsqi',
                name: 'Kate',
                favourite_color: {
                    name: 'Dandelion Yellow',
                    code: '#f9e06d'
                },
                age: 16
            }
        ];
    });
};
