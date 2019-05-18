/* 순수 함수 */
function add(a, b) {
    // 조합성을 강조시킬 수 있다.
    // 언제 평가되든 상관없기 때문에 개발자가 평가 시점을 다룰 수 있다.
    // 함수자체를 다른 함수의 인자로 넘긴다던지 
    // 서로 다른, 전혀 다른 공간이나 쓰레드에서 실행해도
    // 항상 동일한 결과를 리턴하기 때문에
    // 굉장히 안전하고 다루기 쉬운 함수가 된다.
    return a + b;
}

console.log( add(10,5) );

console.log("------------------------");
// c 가 상수로 존재한다면 add2도 순수 함수로 볼 수 있다.
var c = 10;
function add2(a, b) {
    // 평가되는 시점에 따라서 달라진다.
    // c가 변경되기 전이냐, 변경된 후냐에 따라 값이 달라지기 때문에
    // 순수함수가 아닌 함수는 평가 시점이 굉장히 중요하다.
    // 추후에 c가 변경된다고 가정하면 순수함수가 아니게 된다.
    return a + b + c;
}

console.log( add(10, 2) );

/* !순수함수 */
console.log("------------------------");
// c 가 달라지면 add 함수의 리턴값도 달라지므로 순수함수가 아니게 된다.
c = 20;

console.log( add(10, 2) );

console.log("------------------------");
// 원래 z 의 값이 add3 의 파라미터 y 값에 따라 바뀌게 된다.
// 즉 외부의 z에 add3 함수가 관여를 하므로 부수효과가 있고, 순수함수가 아니다.
var z = 20;
function add3 (x, y) {
    z = y;
    return x + y;
}
console.log('c: ', c);
console.log( add3(20, 30) );
console.log('c: ', c);

console.log("------------------------");
// add4 를 한번 실행하고 나면, obj1 의 value 값이 변경된다.
// 이렇게 코딩하는 것이 문제가 아니지만, 이 함수는 순수함수가 아니다.
// 왜?? 외부의 상태 즉 obj1 값에 영향을 주기 때문이다. (즉 부수 효과가 있기 때문.)
var obj1 = { val: 10 };
function add4(obj, b) {
    obj.val += b;
}
console.log(obj1.val);
add4(obj1, 20);
console.log(obj1.val);

console.log("------------------------");
/* 다시 순수 함수 */
var obj1 = { val: 10 };
function add5(obj, b) {
    // 값을 참조하기만 할 뿐이고, 외부 상태도 변경하고 있지 않다.
    // 인자로 받은 값 역시 변경되지 않는다. 새로운 객체를 리턴하는 방식이므로
    // 순수함수이다.
    return { val: obj.val + b }
}

console.log( obj1.val );
var obj2 = add5 (obj1, 20);
console.log( obj1.val ); // 외부 객체의 val 값이 변하지 않는 것을 확인할 수 있다. 즉 순수함수.
console.log( obj2.val );