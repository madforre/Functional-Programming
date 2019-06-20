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

var temp_users = [];

// 1. 명령형 코드
console.log('------- 1. 명령형 코드 -------')

    // 1. 30세 이상인 users를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++ ) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

    // 2. 30세 이상인 users의 names를 수집한다.
var names = [];
for (var i = 0; i < temp_users.length; i++ ) {
    names.push(temp_users[i].name)
}
console.log(names);

    // 3. 30세 미만인 users들을 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++ ) {
    if (users[i].age < 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

    // 4. 30세 미만인 users의 ages를 수집한다.
var ages = [];
for (var i = 0; i < temp_users.length; i++ ) {
    ages.push(temp_users[i].age);
}
console.log(ages);

console.log('-------------------------------')

// 2. _filter, _map으로 리팩토링
function _filter(users, f) {
    // 필터와 같은 함수를 응용형 함수라고 한다. 함수를 인자로 받음.
    // 함수가 함수를 받아서 원하는 시점에 해당 함수가 알고 있는 인자를
    // 적용하는 것을 응용형 프로그래밍, 또는 적용형 프로그래밍이라고 한다.

    // 고차함수라고도 부른다. 함수를 인자로 받거나 함수를 리턴하거나
    // 함수로 받은 인자를 함수내에서 실행하는 함수들을 고차함수라고 부른다.
    var new_list = [];
    for (var i = 0; i < users.length; i++ ) {
        // 함수형 프로그래밍은 추상화의 단위에 함수를 이용한다.
        // 어떤 조건일 때 필터링 할지를 함수에게 위임한다.
        if (f(users[i])) {
            new_list.push(users[i]);
        }
    }
    return new_list;
}

console.log(
    // 루프를 돌 때 받아둔 함수의 조건에 만족하게끔 실행된다.
    // 즉 인자로 받은 함수가 원하는 시점에 평가된다!!!
    _filter(users, function(user) { return user.age >= 30; }))

console.log(
    // 받은 인자인 함수에게 조건 역할을 위임을 하였다.
    _filter(users, function(user) { return user.age < 30; }));

console.log(
    // 이번에는 원하는 배열 자체를 넣어볼까요??
    _filter([1,2,3,4], function(num) { return num % 2;}));

console.log(
    // 와우! 굉장히 재활용성이 높은 함수가 되었어요!
    _filter([1,2,3,4], function(num) { return !(num % 2);}));


function _map(list, mapper) {
    // 데이터 형이 어떻게 생겼는지 보이지 않는다!! 이것이
    // 함수형 프로그래밍의 또다른 중요한 특성이다!!
    // 다형성이 높고 관심사가 완전히 분리되었다.
    // 재사용성이 극대화됨.
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        // mapper로 수집할 데이터 키를 설정한다.
        new_list.push(mapper(list[i]));
    }
    return new_list;
}

var over_30 = _filter(users, function(user) { return user.age >= 30; });
console.log(over_30);

var names = _map(over_30, function(user) {
    return user.name;
});
console.log(names);

var under_30 = _filter(users, function(user) { return user.age < 30; });
console.log(under_30);

var ages = _map(under_30, function(user) {
    return user.age;
});
console.log(ages);

// 필터와 맵은 재사용성이 높은 함수가 되었습니다.
// 반드시 users가 아니여도 다 사용가능한 함수가 되었음.
// 아래처럼 어떤 값이나 맵핑을 할 수 있는 함수가 되었네용
console.log(_map([1,2,3], function(num) { return num * 2}));


console.log(
    _map(
        // 요렇게 코드를 작성하면
        // 중간에 변화를 줄 수 없기 때문에 보다 안정성 높은 코드가 완성가능하다.
        _filter(users, function(user) { return user.age >= 30; }),
        function(user) { return user.name }));

console.log(
    _map(
        _filter(users, function(user) { return user.age < 30; }),
        function(user) { return user.age }));

// 추후 filter와 map의 루프 중복을 제거하는 코드인 each를 만들어볼 것이다.