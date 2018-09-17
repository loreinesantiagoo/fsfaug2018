const hello = function(name) {
	console.log('Hello ', name);
}

const mkHello = function(name) {
	const c = function() {
		console.log(']]] Hello ', name);
	}
	return (c)
}

hello('Fred')
hello('Barney')

const greetFred = mkHello('Fred')
const greetBarney = mkHello('Barney')

console.log(typeof greetFred)

greetFred()
greetBarney()
