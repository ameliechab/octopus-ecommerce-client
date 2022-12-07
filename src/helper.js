const chooseRandom = (array, num) => {
    // deep copy stringify transform into Json, parse transform into object js
    const copyArray = JSON.parse(JSON.stringify(array))
    if(array.length <= num) return array
    for (let i = 0; i < array.length - num; i++) {
        let randomIndex = Math.floor(Math.random() * copyArray.length)
        copyArray.splice(randomIndex,1)
        console.log(copyArray,copyArray.length,randomIndex)
    }
    return copyArray;
};

  export default chooseRandom;
