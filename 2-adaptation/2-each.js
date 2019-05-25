// 원하는 시점에 해당 함수가 알고 있는 인자를 적용하는 것을
// 응용형 프로그래밍, 또는 적용형 프로그래밍이라고 한다.

// 고차함수라고도 부른다. 함수를 인자로 받거나 함수를 리턴하거나
// 함수로 받은 인자를 함수내에서 실행하는 함수들을 고차함수라고 부른다.


// 함수형 프로그래밍은 추상화의 단위에 함수를 이용한다.
// 어떤 조건일 때 필터링 할지를 함수에게 위임한다.
function _filter(list, f) {
    var new_list = [];
    // 반복문을 _each로 위임을 하였음.
    // 코드가 좀더 간결해졌다.
    _each(list, function(val) {
        if (f(val)) new_list.push(val);
    });
    return new_list;
}

function _map(list, mapper) {

    var new_list = [];
    // 좀더 단순해지고 오류를 내지않고 실수가 줄어들었다. ( 반복문을 each로 위임했음 )
    // 명령적인 코드가 점점 숨게되고 보다 선언적인 코드 표현이 된다.
    _each(list, function(val) {
        new_list.push(mapper(val));
    });
    return new_list;
}

// 하는 일은 생각보다 단순함.
// for문을 돌면서 반복하는 로직을 위임하는 함수가 each임.
// map과 filter의 반복문에서 사용되겠지?
function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]) 
    }
    return list;
}


console.log(_filter([1,2,3,4], function(num) { return num % 2;}));
console.log(_map([1,2,3], function(num) { return num * 2}));