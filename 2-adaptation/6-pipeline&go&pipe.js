// 파이프라인 만들기

// 함수들을 인자로 받아서 이 함수들을 연속적으로 실행해주는 함수이다.
// 함수를 리턴하는 함수임. 두개의 함수를 연속적으로 실행.

// 파이프는 결국엔 리듀스임. 파이프에서 보다 추상화된 버젼이 리듀스임.
// 파이프는 좀더 특화된 함수임.

function _pipe() {
    var fns = arguments;
    return function(arg) { // 나중에 실행될 함수를 리턴함.
        return _reduce(fns, function(arg, fn) {
            return fn(arg); // 모든 함수를 돌면서 인자를 적용한 결과를 리턴함. 리턴한 결과는 다시 메모가 됨. 그걸 또 다시 다음 fn에 적용하는 것을 반복.
        }, arg)
    }
}

var f1 = _pipe( // 함수를 다루는 함수. 인자로 함수를 받는 함수.
    function(a) { return a + 1; },
    function(a) { return a * 2; },
    function(a) { return a * a; });

console.log( f1(1) );

// 파이프 함수는 함수를 리턴하는 함수였다. 이제 go 를 만들어보자.


// go 는 즉시실행되는 함수이다. 첫번째 인자로는 함수를 받고, 두번째 인자로는 arg를 받아서 결과를 리턴하는 함수임.


function _go() {
    var fns = _rest(arguments); // arguments에서 첫 번째 값을 제외한 애들이 fns가 되야함. 즉 함수들을 모은 ArrayLike가 만들어짐.
    return _pipe.apply(null, fns)(args);
}



_go(1,
    function(a) { return a + 1; },
    function(a) { return a + 2; },
    function(a) { return a * a; },
    console.log);