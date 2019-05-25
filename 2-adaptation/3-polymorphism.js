// Array 에는 사실 이미 내장된 filter, map 함수가 있었다?!

console.log(
    [1, 2, 3].map(function(val) {
        return val * 2;
    })
);

console.log(
    [1, 2, 3, 4].filter(function(val) {
        return val % 2;
    })
);

// 그런데 얘네들은 메서드임. 객체지향 프로그래밍입니다.
// 차이가 무엇이냐? Array 에 속하는 메서드이기 때문에 Array에서만 사용할 수 있는 메서드임.

// Array Like 객체 : $('div') 제이쿼리는 Array Like 객체입니당. 비슷한 예로는?
// console.log( document.querySelectorAll('*') ); 찍어보면 모든 태그가 배열처럼 보여진다.
// 사실 이것은 배열이 아닌 유사 배열 객체이다.

// 아래처럼 콘솔찍어보면 에러날 것임. 왜냐? map은 Array의 메서드이지 함수가 아니기 때문임!!!!
// 함수가 기준이 아니라 객체가 기준인 객체지향 프로그래밍임.
// 즉 미리 만들어둔 함수를 사용하는 함수형 프로그래밍이 아닙니다.
// console.log(
//     document.querySelectorAll('*').map(function(node) {
//         return node.nodeName;
//     })
// );

// 그렇다면 우리가 만들어둔 map 함수를 사용하면 제대로 동작할까???

function _map(list, mapper) {

    var new_list = [];
    _each(list, function(val) {
        new_list.push(mapper(val));
    });
    return new_list;
}

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]) 
    }
    return list;
}

// console.log(
//     _map(document.querySelectorAll('*'), function(node) {
//         return node.nodeName;
//     })
// );

// js 파일이라서 좀 그렇지만 html 로 해보면 될거임. 제대로 작동함.
// 들어오는 인자가 length 가 있고 해당하는 키마다 값이 있으면 사용이 가능한 _map 함수를 이용한 함수형 프로그래밍입니다.
// 즉 배열이 아닌 유사배열이더라도 작동한다!!


// 함수형 프로그래밍에서는 함수가 어떤 역할을 하는지에 따라 이름을 갖는 것이 중요하다.
// 단순히 역할을 수행한 다음에 돌려주는 콜백함수가 아닌, predi, iter, mapper 등 각각의 역할에 맞는 보조함수의 이름을
// 따로 불러주는 것이 좋다.
// 내부 다형성을 가지는 predi, iter, mapper 보조함수들.

// 역할들을 책임지는 보조함수들!! 단순한 콜백이라고 보지말고 각각의 역할에 맞는 이름을 따로 불러주자!!
// 조건이라던지 반복이라던지 역할을 책임지는 함수들임. 얘네들한테 위임하잖아.

// 내부에서 데이터를 살펴보는게 아니라 역할을 위임하기 때문에 
// 데이터형에 있어서 굉장히 자유롭고, 다형성을 높이는데 유리합니다.

// 외부 다형성을 가지는 애들은 array_like, arguments, document.querySelectorAll