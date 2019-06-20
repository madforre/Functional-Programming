function _curry(fn) { // 필요한 인자를 채워나가다가, 모든 인자의 갯수가 채워지면 함수 본체를 실행하는 기법 - 커링
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(a, b); };
    }
}

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
    }
}

var _get = _curryr(function(obj, key) {
    return obj == null ? underfined : obj[key];
})

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

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]) 
    }
    return list;
}

function add(a, b) {
    return a + b;
}