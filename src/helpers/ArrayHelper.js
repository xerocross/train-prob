"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    contains: function (arr, elt, equalFunction) {
        return (this.indexOf(arr, elt, equalFunction) > -1);
    },
    indexOf: function (arr, elt, equalFunction) {
        for (var i = 0; i < arr.length; i++) {
            if (equalFunction(arr[i], elt)) {
                return i;
            }
        }
        return -1;
    },
    shallowClone: function (arr) {
        var clone = [];
        for (var i = 0; i < arr.length; i++) {
            clone[i] = arr[i];
        }
        return clone;
    }
};
