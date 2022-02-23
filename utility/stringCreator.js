const stringMaker=(length)=> {
    for (var s=''; s.length < length; s += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random()*62|0)){}
    return s;
}

export default stringMaker