const m = new Map()
m.set("a",1);
m.set(1,"b")
console.log(JSON.stringify(Array.from(m)))