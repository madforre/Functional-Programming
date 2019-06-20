// 커링은 본체에 있는 함수를 들고 있다가 원하는 시점에 평가하는 기법임.
// 함수가 함수를 대신 실행하거나 함수가 함수를 리턴하도록 조합해나가는 것이 함수형 프로그래밍임.
// 커리함수는 이러한 함수형 프로그래밍의 특징을 잘 보여줌.

// 함수를 값으로 들고 있다가, 원하는 시점에 평가한다.


function _curry(fn) { // 필요한 인자를 채워나가다가, 모든 인자의 갯수가 채워지면 함수 본체를 실행하는 기법을 의미한다.
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(a, b); };
    }
}

var add = _curry(function(a, b) {
    return a + b;
});

var add10 = add(10);
var add5 = add(5);
console.log( add10(5) );
console.log( add(5)(3) );
console.log( add5(3) );
console.log( add(10)(3) );
console.log( add(1, 2) );

var sub = _curry(function(a, b) {
    return a - b;
});

console.log("--------curry sub--------")

console.log( sub(10, 5) );

var sub10 = sub(10);
console.log( sub10(5) ); // 표현상 좋지 않다. sub10 이면 10을 빼는 것 같잖아?

console.log("--------curryr sub--------")
// curryr, 동일한 동작인데 오른쪽부터 인자를 적용해나가는 curry right함수를 만들어보자!

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
    }
}

var subr = _curryr(function(a, b) {
    return a - b;
});

console.log( subr(10, 5) );

var subr10 = subr(10);
console.log( subr10(5) );

console.log( subr(10,5) )



// 2. _get 만들어 좀 더 간단하게 하기

// curryr 을 통해 평가 순서를 뒤집어서 
var _get = _curryr(function(obj, key) {
    return obj == null ? underfined : obj[key];
}) // 일반적으로 오브젝트에서 키를 호출 했을 때 키가 없으면 에러가 나지만
// _get을 사용하면 에러가 나지않는다.


/* 필요한 함수 및 데이터 */

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


console.log(_get('name')(user[2]));


function _map(list, mapper) {
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
    }
    return new_list;
}

function _filter(users, f) {

    var new_list = [];
    for (var i = 0; i < users.length; i++ ) {
        if (f(users[i])) {
            new_list.push(users[i]);
        }
    }
    return new_list;
}

console.log(
    _map(
        _filter(users, function(user) { return user.age >= 30; }),
        _get('name'))); // _map 에서 mapper 함수로 _get('name')이 들어가네요!!
        // 그럼 맵 돌릴 떄 반복문 내에서 new_list.push( _get('name')(list[i]) ); 이런 식으로 순회하겠지?!

console.log(
    _map(
        _filter(users, function(user) { return user.age < 30; }),
        _get('age'))); // get 을 사용하니 원래코드보다 훨씬 간결해졌다.
        // 맵에서 사용될 iter 함수로 get 을 대신 쓸 수 있다!!!