// 리듀스 (리스트, 이터, 시작하는 메모 값)
// array 로 숫자를 하나 뽑아 낸다거나, 객체를 하나 만들어 낸다거나 할 때 사용. 
// 하나로 값을 축약해 나갈 수 있음.
// 복잡하거나 어려운 로직은 단순하게 구현할 수 있게끔 도와줍니다.
// 개발자가 고민을 덜하게 하고, 조금 어려운 로직을 만들 때, 잘 작동할 것이라는 확신을 주는 함수이다.
// 코드에 선언적인 부분만 있기 때문에, 단순하고 심플해서 문제를 풀어야 할 때 사용하면 좋은 리듀스 함수.

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]) 
    }
    return list;
}

// rest 함수
var slice = Array.prototype.slice; // slice는 array만 사용 가능하다. each 와 map 처럼 배열이 아닌 유사배열이라도 사용 할 수 있게 만드려면,
function _rest(list, num) {
    return slice.call(list, num || 1);
}

// _reduce 만들기

function _reduce(list, iter, memo) {
    if (arguments.length == 2) { // 이 로직이 없으면 add 함수를 예로 들자면, undefined 에 숫자를 더하는 것이므로 NaN가 나올 것이다. ( 원하는 값이 안나옴. )
        memo = list[0];
        list = _rest(list); // 첫 인덱스를 메모로 빼줬으니 그 이후 인덱스부터의 값들을 리스트로 재 할당한다.
    }
    _each(list, function(list_val) {
        memo = iter(memo, list_val);
    });
    return memo;
}

console.log(
    _reduce([1, 2, 3], function(a, b) {
    return a + b;
}, ));
// 결과가 6이 나오는 함수임. _rest함수를 이용했으므로 Arraylike 도 잘라줄 수 있다. 쌩 slice는 배열만 처리해서 안댐.

console.log(_reduce([1, 2, 3, 4], function(a, b) {
    return a + b})); // 받은 iter 를 연속적으로 적용하면서 메모라는 결과로 축약해나간다.