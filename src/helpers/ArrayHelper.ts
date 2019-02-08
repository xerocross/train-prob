export default {
    contains (arr: any[], elt: any, equalFunction: (x: any, y: any) => boolean) {
        return (this.indexOf(arr, elt, equalFunction) > -1);
    },
    indexOf  (arr: any[], elt: any, equalFunction: (x: any, y: any) => boolean) {
        for (let i = 0; i < arr.length; i++) {
            if (equalFunction(arr[i], elt)) {
                return i;
            }
        }
        return -1;
    },
    shallowClone (arr: any[]) {
        const clone = [];
        for (let i = 0; i < arr.length; i++) {
            clone[i] = arr[i];
        }
        return clone;
    },
};
