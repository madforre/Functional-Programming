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

function _curry(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(a, b); };
    }
}

function _curryr(fn) {
    return function(a, b) {
        return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
    }
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function(val) {
        new_list.push(mapper(val));
    });
    return new_list;
}
var _map = _curryr(_map);

function _filter(list, predi) {
    var new_list = [];
    _each(list, function(val) {
        if (predi(val)) new_list.push(val);
    });
    return new_list;
}
var _filter = _curryr(_filter);

var _get = _curryr(function(obj, key) {
    return obj == null ? underfined : obj[key];
});

var add = _curry(function(a, b) {
    return a + b;
});

var subr = _curryr(function(a, b) {
    return a - b;
});

function _rest(list, num) {
    var slice = Array.prototype.slice; // Array 만 사용 가능한 것을 유사배열도 가능하게 만들었다.
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

function _identity(val) {
    return val;
}

var _values = _map(_identity);

function _pluck(data, key) {
    return _map(data, _get(key));
}

function _negate(func) {
    return function(val) {
        return !func(val);
    }
}

function _reject(data, predi) {
    return _filter(data, _negate(predi));
}

function _find(list, predi) { 
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        var val = list[keys[i]];
        if (predi(val)) return val; // 조건에 만족하는, 첫번째 걸리는 놈의 값을 리턴함.
    }
}

function _find_index(list, predi) { 
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        if (predi(list[keys[i]])) return i;
    }
    return -1;
}

function _some(data, predi) {
    return _find_index(data, predi || _identity) != -1;
}

function _every(data, predi) {
    return _find_index(data, _negate(predi || _identity)) == -1;
}
