/* eslint-disable */

Array.prototype.clone = () => {
    let generated = []
    for (let index = 0; index < this.length; index++) {
        generated.push(this[index])
    }
    return generated
}

/* eslint-enable */
