var users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'AZ', age: 28 },
    { id: 4, name: 'QW', age: 30 },
    { id: 5, name: 'ER', age: 27 },
    { id: 6, name: 'TY', age: 22 },
    { id: 7, name: 'GH', age: 25 },
    { id: 8, name: 'AS', age: 29 }
];

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]) 
    }
    return list;
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function(val) {
        new_list.push(mapper(val));
    });
    return new_list;
}

function _filter(list, f) {
    var new_list = [];
    _each(list, function(val) {
        if (f(val)) new_list.push(val);
    });
    return new_list;
}

var slice = Array.prototype.slice; // slice는 array만 사용 가능하다. each 와 map 처럼 배열이 아닌 유사배열이라도 사용 할 수 있게 만드려면,
function _rest(list, num) {
    return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0];
        list = _rest(list);
    }
    _each(list, function(list_val) {
        memo = iter(memo, list_val);
    });
    return memo;
}

var _get = _curryr(function(obj, key) {
    return obj == null ? underfined : obj[key];
})

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
    }
}


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


function _go(args) {
    var fns = _rest(arguments); // arguments에서 첫 번째 값을 제외한 애들이 fns가 되야함. 즉 함수들을 모은 ArrayLike가 만들어짐.
    return _pipe.apply(null, fns)(args); // 유사 배열들이나 배열들을 처음들어온 args를 토대로 순차적으로 실행한다.
}

_go(1, // go는 pipe의 즉시실행 버젼이라고 보면 된다.
    function(a) { return a + 1; },
    function(a) { return a + 2; },
    function(a) { return a * a; },
    console.log);


console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30; }),
        _get('age')));

console.log(
    _map(
        _filter(users, function(user) { return user.age < 30; }),
        _get('age')));

_go(users,
    function(users) {
        return _filter(users, function(user) {
            return user.age >= 30;
        });
    },
    function(users) {
        return _map(users, _get('age'));
    },
    console.log
);

강의 9분 40초 째.