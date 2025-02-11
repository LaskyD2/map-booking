
export const sortSource = (data) => {
    const Hotels = Object.keys(data);
    let combinedArray = [];
    Hotels.forEach((hotel) => {
        Object.keys(data[hotel]).forEach((source) => {
            combinedArray = [...new Set([...combinedArray, ...data[hotel][source]])];

        })
    })

    // console.log(combinedArray)
    return combinedArray;
}
