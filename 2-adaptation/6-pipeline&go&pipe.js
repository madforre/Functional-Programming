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
        // fns, fn <<< pipe 함수 라면.


        memo = iter(memo, list_val);

        
        // arg = iter(arg, fn)
        
        // arg2 = iter(arg, f1)
        // arg2 = f1(arg)

        // arg3 = iter(arg2, f2)
        // arg3 = f2(arg2) 

        // ...

        // end <<< 함수 순차적으로 다 돌고난 후 memo 리턴.
        
    });
    return memo;
}

var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
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


function _go(arg) {
    var fns = _rest(arguments); // arguments에서 첫 번째 값을 제외한 애들이 fns가 되야함. 즉 함수들을 모은 ArrayLike가 만들어짐.
    return _pipe.apply(null, fns)(arg); // 유사 배열들이나 배열들을 처음들어온 args를 토대로 순차적으로 실행한다.
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
    console.log);


console.log(_map([1,2,3], function(val) { return val * 2 })); // curryr 적용 전

var _map = _curryr(_map),
    _filter = _curryr(_filter);

console.log(
    _map( function(val){ return val * 2 } )( [1,2,3]) ) ; // curryr 적용 후. 같은 결과를 낸다.

// mapper list 함수 리턴한다.

// 근데 매퍼는 채워졌죠?

// 그럼 
// function(list){ return _map(list, function(v){ return v * 2}) }; 
// 를 리턴하겠지.

// 함수를 리턴했으니 인자로 list를 넣어서 실행하면.
// curryr 적용하기 전이랑 똑같은 결과를 도출해낸다.


// 따라서 위 _go 를 아래처럼 더 깔끔하게 바꿀 수 있다.


_go(users, // curryr 을 사용하면 이 코드를 매우 간결하게 만들 수 있음. 인자로 배열 객체를 받았죠?
    _filter(function(user) { // 인자 평가 순서 바꿔서 맵퍼를 먼저 받음.
        return user.age >= 30; // fn(arg) 리턴한 결과를 users라는 메모에 저장하겠지.
    }), // 파이프 함수는 리듀스 함수에 인자가 (arg, fn)인 iter 로 받고 루프 돌 때마다 리턴을 fn(arg)로 하여 메모에 누적.
    // 필터함수(curryr이_적용되어서_위임함수를_먼저인자로넣어_실행할수있음)(다음엔_users인자를_가진_함수를_실행한다.)가 되겠지.
    _map(_get('name')), // 뒤에는 (users) 가 붙겠지. curryr 이 적용된.
    // function(users) { // 리스트를 먼저 받는 형식이였지. 맵퍼가 아니라.
    //     return _map(users, _get('age'));
    // },
    console.log);

_go(users, // 화살표 함수로도 표현해보기
    _filter(user => user.age < 30),
    _map(user => user.name),
    console.log);

_go(users, // 좀더 간단하게.
    _filter(user => user.age < 30), // curryr를 통해 만든 필터. 인자를 하나만 넘겼을 경우에, 인자가 오른쪽에서부터
                                    // 적용된 또다른 함수를 리턴하게 되고, go 라는 함수는 함수들을 받아서 함수들을 연속적으로 실행하면서
                                    // 인자들을 하나씩 꺼내서 그걸 그 다음함수에 전달하는 식으로, 함수가 함수를 실행하고 함수가 함수를 리턴하는 식으로
                                    // 프로그래밍을 하는 것이 함수형 프로그래밍이다.
    _map(_get('age')),
    console.log);

// curryr 을 통해서 필터와 맵을 