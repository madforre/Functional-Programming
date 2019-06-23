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

var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
    }
}

var _map = _curryr(_map),
    _filter = _curryr(_filter);

// 수업 시작

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]) 
    }
    return list;
}

// _each(null, console.log); // null 을 넣으면 에러가 난다.
// each 함수 내부에서 length를 참조하고자 할 때,
// 리스트가 null 이기 때문에 에러가 난다.

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

function _pipe() {
    var fns = arguments;
    return function(arg) { 
        return _reduce(fns, function(arg, fn) {
            return fn(arg);
        }, arg)
    }
}

function _go(arg) {
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}


// 아래의 get 함수인 경우, obj가 null이면 undefined로 바꿔주어 에러가 안난다.
var _get = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
})

var _length = _get('length');

function _each(list, iter) { // each의 외부 다형성 높이기. null 넣어도 에러 안나게.
    for (var i = 0, len = _length(list); i < len; i++) {
        iter(list[i]);
    }
    return list;
}

_each(null, console.log); // null 을 넣어도 에러가 안닌디.
// 이렇게 사용하면 _each를 사용하는 함수들도 에러가 나지 않고 빈 배열을 리턴할 것이다.
// ex) 맵, 필터

// 함수형 프로그래밍 진영에서는
// 언제 어디서 undefined나 잘못된 어떤 값이 들어와도, 특별히 에러가 나지 않고
// 흘려보낼 수 있는 전략을 많이 취합니다.

// 함수형 프로그래밍에서는 예외적인 데이터가 들어와도
// 에러가 나지 않도록 하는 기법을 사용합니다.
// 이러한 기법은 언더스코어에서도 동일하게 구현이 되어 있습니다.

// 실제로 데이터 형이 무엇인지를 체크한다거나 try catch를 하지 않고
// 흘려보내는 등으로 많이 처리한다.

// 언더스코어 같은 경우에는 실제로 트라이 캐치 같은 함수가 템플릿 만드는 부분 뺴고는
// 한번도 나오지 않습니다.

// 무엇을 리턴하던지간에 왠만하면 에러를 내지 않고,
// 그럴싸한 답들을 유도해내도록 코드가 고려되어 있다.
// 형체크를 단단하게 하지 않고, try catch 같은걸 하지 않는다고 해서
// 사용하는게 불안하다고 생각할 수도 있습니다.

// 시퀄라이즈 같은 ORM을 사용한다면? 그런 데이터를 다루는 내부 코드들을 보면
// 언더스코어나 로대쉬를 사용하는게 대부분이다.
// 이런 방법으로 데이터를 다루는 것은 안전합니다.
// 데이터를 다루는 라이브러리들도 코어에 언더스코어를 둘 정도로, 
// 굉장히 실용적이고 에러를 내지않고 정확하게 데이터를 다룰 수 있는 방법입니다.

// 데이터를 주로 다루는 ORM같은 라이브러리 등에서 형체크를 안하고 흘려보내는 식의 패러다임을
// 코어에 가지고 있다는 것은 굉장히 재밌는 점으로 시사된다.

_go([1, 2, 3, 4],
    _filter(function(v) { return v % 2}),
    _map(function(v) { return v * v}),
    console.log);

_go(null, // null 을 넣어도 에러가 나지 않고, 빈 배열을 리턴하는 식으로 동작한다.
    _filter(function(v) { return v % 2}),
    _map(function(v) { return v * v}),
    console.log);

// _keys 만들기 - _is_object 인지 검사하여 null 에러 안나게.

console.log(Object.keys({ name: 'ID', age: 33 })); // Object.keys는 키만 뽑아주는 함수임.
console.log(Object.keys([1, 2, 3, 4])); // 배열도 Object이기 때문에 키를 뽑아줌.
console.log( Object.keys(10) ); // 쌩 숫자가 들어가면 키가 없다고 나온다.

// console.log( Object.keys(null) ); // Object.keys에서 인자로 null을 넣으면 에러가 난다.
// 이를 변경해보자.

function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}

console.log(_keys(null));
console.log(_keys(false));


// _each의 외부 다형성을 조오옴더 높이기.

// _each({ // 빈 배열 리턴될거임.
//     13: 'ID',
//     19: 'HD',
//     29: 'YD'
// }, function(name) {
//     console.log(name);
// })

function _is_object(obj) {
    return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
    return _is_object(obj) ? Object.keys(obj) : [];
}


function _each(list, iter) { // each를 좀 더 발전시키자.
    var keys = _keys(list); // 배열이 들어와도 keys가 뽑힐거고, 아니여도 뽑히게 된다.
    for (var i = 0, len = keys.length; i < len; i++) { // 무조건 올바른 배열이 리턴된다.
        iter(list[keys[i]]); // 루프가 아무런 문제 없이 흘러간다 ~
    }
    return list;
}

_each({ // each 의 다형성을 높여주었으므로, 이 코드 뿐만 아니라, map, filter에도 
        // 다형성이 높아져 적용된다.
    13: 'ID',
    19: 'HD',
    29: 'YD'
}, function(name) {
    console.log(name);
})


console.log( _map({ // 인자의 데이터형이 무엇이냐에 따라 내부 동작을 다 지원하도록
    // 최대한 다형성이 높게 끔 작성을 하고, 인자가 하나 들어온다면
    // 함수를 리턴한다는 식으로 프로그래밍을 많이 합니다.
    // 어떠한 데이터가 들어오던지, 코드가 흘러가도록 만듭니다.
    // 함수형 프로그래밍 ㅇㅇ 다양한 부분에서 유리한 점이 많이 생긴다.
    13: 'ID',
    19: 'HD',
    29: 'YD'
}, function(name) {
    return name.toLowerCase();
}) );

_go({
    13: 'AW',
    19: 'SD',
    29: 'YR'
    },
    _map(function(name) {
        return name.toLowerCase();
    }),
    console.log)

_go(users, // users가 null 이더라도 에러가 나지않고, 문제없이 코드가 흘러갑니다.
    _map(function(user) {
        return user.name;
    }),
    _map(function(name) {
        return name.toLowerCase();
    }),
    console.log)

// 형을 굉장히 엄격하게 체크하면서 프로그래밍하는 방식도 있지만,
// 이렇게 다형성을 극대화 시키면서 프로그래밍 하는 방법도 있습니다.

// 이런 개발 방식에서는 개발자가 map 함수를 쓰면서 map 에 집어넣을 데이터가
// 어떻게 생겼는지를 개발자가 알기 때문에 보조함수를 통해서
// 다양한 데이터를 처리하게끔 한다.

_go({
    1: users[0],
    3: users[2], // 돌림직한 데이터가 어떻게 생겼던지 상관없음.
    5: users[4]
    },
    _map(function(user) { // 개발자가 원하는 속성을 선택을 할 수 있다.
        return user.name.toLowerCase(); // 데이터가 무엇인지 안다면, 입맛대로 데이터를 처리 가능.
    }), // 즉 어떠한 데이터건 간에 다양하게 처리가 가능하다는 것!
    console.log)

// 데이터가 무엇이냐에 따라서 보조함수를 마음껏 변경할 수 있기 때문에.
// 개발자가 데이터를 알고있다면 보조함수로 다양한 데이터를 원하는 대로 처리할 수 있음.
// 다형성!!

// 지금까지 명령형 코드에서 어떻게 선언형 코드로 전환해왔는가. 에 대해 알아보았다.

// 이제 컬렉션 중심 위주의 함수형 프로그래밍에 대해서 알아볼 것이다.