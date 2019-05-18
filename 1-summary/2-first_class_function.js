function add() {

}

/* 일급 함수 */
var f1 = function(a) { return a * a; };
console.log(f1);

// 변수에 함수를 담을 수 있다.
var f2 = add;
console.log(f2);

// 함수를 인자로 받을 수 있다.
function f3(f) {
    return f();
}

f3(function() { return 10; });

console.log(f3(function() { return 10; }));
console.log(f3(function() { return 20; }));

// 일급 함수의 이러한 특징들을 이용하여
// 순수 함수들과 조합성을 높여나가는 것이 함수형 프로그래밍이다.

// 언제 평가해도 상관없는 순수함수들을 많이 만들고,
// 그 순수 함수들을 값으로 들고 다니면서 필요한 시점에
// 평가를 하는 방식이 함수형 프로그래밍이다.

/* add_maker */
// 클로저와 일급함수가 함께 사용된 예제이다.
function add_maker(a) {
    // a로 받은 인자는 이 컨텍스트에서 외부 컨텍스트로 접근이 가능해진다.
    return function(b) {
        return a + b;
    }
}

var add10 = add_maker(10);

console.log( add10(20) );

var add5 = add_maker(5); // 이 함수는 어느 시점에 평가를 하던 상관이 없는 순수 함수이다.
var add15 = add_maker(15);

console.log( add5(10) );
console.log( add15(10) );
console.log( add10(20) );


// 함수들을 원하는 인자로 받아서 자신이 원하는대로 로직을 평가하는 함수.
function f4(f1, f2, f3) {
    return f3(f1() + f2());
}

// 아래는 순수함수들을 조합하여 출력한다.
console.log(f4(
    function() { return 2; },
    function() { return 1; },
    function(a) { return a * a;}
))

// 순수함수로 평가할 때 유리해지는 것은
// 비동기나 동시성이 필요할 때 원하는 시점에 평가를 한다거나
// for문을 이용할 때 받아둔 함수를 원하는 형태로 실행하는 등등.. 이다.