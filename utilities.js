const Util = {

}
function randomWeights(num) {
    let arr = [];
    arr.push(0);
    for (let i = 0; i < num - 1; i++) {
        let rand = int(noise(i / num) * 10000);
        arr.push(rand);
    }

    arr.sort();
    return arr;
}

function probPick(arr) {
    let num = int(random(10000));
    for (let i = 0; i < arr.length; i++) {
        if (num < arr[i]) {
            return i - 1;
        }
    }
    return arr.length - 1;
}

function imgName(seed) {
    const date = new Date();
    const [month, day, year] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
    ];
    return `${month + 1}.${day}.${year}.${seed}`;
}


