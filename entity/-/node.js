"use strict";
var exports = void 0;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;
//mam.ts
;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//mol/ambient/ambient.ts
;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));
//mol/delegate/delegate.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));
//mol/owning/owning.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//mol/fail/fail.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//mol/fail/hidden/hidden.ts
;
"use strict";
//mol/type/writable/writable.ts
;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));
//mol/func/name/name.ts
;
"use strict";
var $;
(function ($) {
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
        toJSON() {
            return this.toString();
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));
//mol/object2/object2.ts
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//mol/object/object.ts
;
"use strict";
var $;
(function ($) {
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: val => val[$.$mol_dev_format_body],
        body: val => val[$.$mol_dev_format_body](),
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    function $mol_dev_format_span(style, ...content) {
        return $mol_dev_format_element('span', {
            ...style,
        }, ...content);
    }
    $.$mol_dev_format_span = $mol_dev_format_span;
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
})($ || ($ = {}));
//mol/dev/format/format.ts
;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//mol/const/const.ts
;
"use strict";
var $;
(function ($) {
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));
//mol/wire/cursor/cursor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub extends Object {
        data = [];
        static get [Symbol.species]() {
            return Array;
        }
        sub_from = 0;
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.pop();
            this.data.pop();
            if (this.data.length === this.sub_from)
                this.reap();
        }
        reap() { }
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        fresh() { }
        complete() { }
        get incompleted() {
            return false;
        }
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant);
            }
        }
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));
//mol/wire/pub/pub.ts
;
"use strict";
//mol/wire/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    $.$mol_wire_affected = [];
})($ || ($ = {}));
//mol/wire/wire.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0;
        cursor = $mol_wire_cursor.stale;
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
                this.data.pop();
                this.data.pop();
            }
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.final;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let tail = 0;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.data.length - 2, cursor);
                    this.data.pop();
                    this.data.pop();
                }
                else {
                    ++tail;
                }
            }
            for (; tail; --tail) {
                this.data.pop();
                this.data.pop();
            }
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/pub/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));
//mol/after/timeout/timeout.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//mol/after/frame/frame.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));
//mol/promise/like/like.ts
;
"use strict";
var $;
(function ($) {
    const handled = new WeakSet();
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_frame(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        [Symbol.toStringTag];
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '<>';
        }
        constructor(id, task, host, args) {
            super();
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
            this[Symbol.toStringTag] = id;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_auto({
                    [$mol_dev_format_head]: () => $mol_dev_format_shade(cursor),
                    [$mol_dev_format_body]: () => $mol_dev_format_native(this),
                })
                : $mol_dev_format_shade($mol_dev_format_native(this), cursor), $mol_dev_format_auto(this.cache));
        }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    const put = (res) => {
                        if (this.cache === result)
                            this.put(res);
                        return res;
                    };
                    result = Object.assign(result.then(put, put), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result) && !handled.has(result)) {
                    result = Object.assign(result.finally(() => {
                        if (this.cache === result)
                            this.absorb();
                    }), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        async async() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    await new Promise(() => { });
                }
            }
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    sub.destructor();
                };
            });
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));
//mol/wire/fiber/fiber.ts
;
"use strict";
var $;
(function ($) {
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));
//mol/guid/guid.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_key_store = new WeakMap();
    function $mol_key(value) {
        if (typeof value === 'bigint')
            return value.toString() + 'n';
        if (typeof value === 'symbol')
            return value.description;
        if (!value)
            return JSON.stringify(value);
        if (typeof value !== 'object' && typeof value !== 'function')
            return JSON.stringify(value);
        return JSON.stringify(value, (field, value) => {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return value.description;
            if (!value)
                return value;
            if (typeof value !== 'object' && typeof value !== 'function')
                return value;
            if (Array.isArray(value))
                return value;
            const proto = Reflect.getPrototypeOf(value);
            if (!proto)
                return value;
            if (Reflect.getPrototypeOf(proto) === null)
                return value;
            if ('toJSON' in value)
                return value;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Uint8Array)
                return [...value];
            let key = $.$mol_key_store.get(value);
            if (key)
                return key;
            key = $mol_guid();
            $.$mol_key_store.set(value, key);
            return key;
        });
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));
//mol/key/key.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && left.stack === right.stack;
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap([[right, true]]);
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, left.byteOffset, left.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));
//mol/compare/deep/deep.ts
;
"use strict";
var $;
(function ($) {
    function $mol_log3_area_lazy(event) {
        const self = this;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));
//mol/log3/log3.ts
;
"use strict";
var $;
(function ($) {
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = `${this.uri}#${this.row}:${this.col}/${this.length}`;
        }
        static unknown = $mol_span.begin('?');
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));
//mol/span/span.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));
//mol/tree2/to/string/string.ts
;
"use strict";
var $;
(function ($) {
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(type, value, kids, span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(this.struct(type, []).insert(value, ...path.slice(1)));
                }
                return this.clone(sub);
            }
            else if (typeof type === 'number') {
                const sub = this.kids.slice();
                sub[type] = (sub[type] || this.list([]))
                    .insert(value, ...path.slice(1));
                return this.clone(sub.filter(Boolean));
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .map(item => item.insert(value, ...path.slice(1)))
                    .filter(Boolean);
                return this.clone(kids);
            }
        }
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => {
                let handle = belt[child.type] || belt[''];
                if (!handle || handle === Object.prototype[child.type]) {
                    handle = (input, belt, context) => [
                        input.clone(input.hack(belt, context), context.span)
                    ];
                }
                try {
                    return handle(child, belt, context);
                }
                catch (error) {
                    error.message += `\n${child.clone([])}${child.span}`;
                    $mol_fail_hidden(error);
                }
            }));
        }
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));
//mol/tree2/tree2.ts
;
"use strict";
var $;
(function ($) {
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));
//mol/error/syntax/syntax.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));
//mol/tree2/from/string/string.ts
;
"use strict";
var $;
(function ($) {
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            return $mol_tree2.data(String.fromCharCode(...buf), [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
})($ || ($ = {}));
//mol/tree2/from/json/json.ts
;
"use strict";
var $;
(function ($) {
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));
//mol/term/color/color.ts
;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { time: new Date().toISOString(), ...event };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));
//mol/log3/log3.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host)
                        break reuse;
                    if (existen.task !== task)
                        break reuse;
                    if (!$mol_compare_deep(existen.args, args))
                        break reuse;
                    return existen;
                }
                const next = new $mol_wire_task(`${host?.[Symbol.toStringTag] ?? host}.${task.name}<#>`, task, host, args);
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Non idempotency`,
                        existen,
                        next,
                        hint: 'Ignore it',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));
//mol/wire/task/task.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));
//mol/wire/method/method.ts
;
"use strict";
//mol/type/tail/tail.ts
;
"use strict";
//mol/type/foot/foot.ts
;
"use strict";
var $;
(function ($) {
    const catched = new WeakMap();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.get(error))
            return false;
        catched.set(error, true);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));
//mol/fail/catch/catch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        console.error(error);
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));
//mol/fail/log/log.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '<>';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = `${prefix}.${field}`;
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '<>';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = `${prefix}.${task.name}<${key_str.replace(/^"|"$/g, "'")}>`;
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        resync(args) {
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            const prev = this.cache;
            if ($mol_owning_check(this, prev)) {
                prev.destructor();
            }
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                ;
                (this.host ?? this.task)[this.field()].delete($mol_key(this.args[0]));
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));
//mol/wire/atom/atom.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));
//mol/wire/solo/solo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));
//mol/wire/plex/plex.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem = $mol_wire_solo;
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));
//mol/mem/mem.ts
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//mol/dom/context/context.ts
;
"use strict";
//node/node.ts
;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        const mod = target.require('module');
        if (mod.builtinModules.indexOf(name) >= 0)
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        const path = target.require('path');
        const fs = target.require('fs');
        let dir = path.resolve('.');
        const suffix = `./node_modules/${name}`;
        const $$ = $;
        while (!fs.existsSync(path.join(dir, suffix))) {
            const parent = path.resolve(dir, '..');
            if (parent === dir) {
                $$.$mol_exec('.', 'npm', 'install', '--omit=dev', '--no-save', name);
                try {
                    $$.$mol_exec('.', 'npm', 'install', '--omit=dev', '--no-save', '@types/' + name);
                }
                catch { }
                break;
            }
            else {
                dir = parent;
            }
        }
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);
//node/node.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));
//mol/env/env.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));
//mol/env/env.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_exec(dir, command, ...args) {
        let [app, ...args0] = command.split(' ');
        args = [...args0, ...args];
        this.$mol_log3_come({
            place: '$mol_exec',
            dir: $node.path.relative('', dir),
            message: 'Run',
            command: `${app} ${args.join(' ')}`,
        });
        var res = $node['child_process'].spawnSync(app, args, {
            cwd: $node.path.resolve(dir),
            shell: true,
            env: this.$mol_env(),
        });
        if (res.status || res.error)
            return $mol_fail(res.error || new Error(res.stderr.toString()));
        if (!res.stdout)
            res.stdout = Buffer.from([]);
        return res;
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));
//mol/exec/exec.node.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));
//mol/dom/context/context.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/solid/solid.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));
//mol/mem/persist/persist.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));
//mol/wire/probe/probe.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));
//mol/mem/cached/cached.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                const fiber = temp(self, args);
                return fiber.sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));
//mol/wire/sync/sync.ts
;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        static native() {
            return this.$.$mol_dom_context.navigator.storage ?? {
                persisted: async () => false,
                persist: async () => false,
                estimate: async () => ({}),
                getDirectory: async () => null,
            };
        }
        static persisted(next, cache) {
            $mol_mem_persist();
            if (cache)
                return Boolean(next);
            const native = this.native();
            if (next && !$mol_mem_cached(() => this.persisted())) {
                native.persist().then(actual => {
                    setTimeout(() => this.persisted(actual, 'cache'), 5000);
                    if (actual)
                        this.$.$mol_log3_done({ place: `$mol_storage`, message: `Persist: Yes` });
                    else
                        this.$.$mol_log3_fail({ place: `$mol_storage`, message: `Persist: No` });
                });
            }
            return next ?? $mol_wire_sync(native).persisted();
        }
        static estimate() {
            return $mol_wire_sync(this.native() ?? {}).estimate();
        }
        static dir() {
            return $mol_wire_sync(this.native()).getDirectory();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage, "native", null);
    __decorate([
        $mol_mem
    ], $mol_storage, "persisted", null);
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));
//mol/storage/storage.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//mol/state/local/local.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));
//mol/action/action.ts
;
"use strict";
var $;
(function ($) {
    class $gd_core_entity extends $mol_object {
        constructor(id) {
            super();
            if (id)
                this.id = $mol_const(id);
        }
        static factory(id) {
            return new this(id);
        }
        static add(data) {
            const id = data?.id ?? this.create_id();
            const entity = this.factory(id);
            entity.data(data);
            const t = this;
            t.ids([...t.ids(), id]);
            return entity;
        }
        static ids(next) {
            return this.$.$mol_state_local.value(this.name, next) ?? [];
        }
        static search(data) {
            return this.ids();
        }
        static remove(id) {
            this.ids(this.ids().filter(target_id => id !== target_id));
        }
        static create_id(group = '') {
            return $mol_guid();
        }
        rep() {
            return this.constructor;
        }
        id() {
            return this.rep().create_id();
        }
        defaults() {
            return {};
        }
        data(patch) {
            const id = this.id();
            if (patch === null)
                this.rep().remove(id);
            const next = patch ? { ...this.defaults(), ...patch } : (patch === null ? patch : undefined);
            return (this.$.$mol_state_local.value(id, next) ?? null);
        }
        remove() { this.data(null); }
        refresh() { this.data(false); }
        draft(next) {
            return next ?? null;
        }
        value(field, value) {
            const data = this.draft() ?? this.data();
            if (value === undefined)
                return data?.[field];
            const next = { ...data, [field]: value };
            this.draft(next);
            try {
                const result = this.data(next)?.[field];
                this.draft(null);
                return result;
            }
            catch (e) {
                if ($mol_fail_catch(e))
                    this.draft(null);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $gd_core_entity.prototype, "id", null);
    __decorate([
        $mol_mem
    ], $gd_core_entity.prototype, "data", null);
    __decorate([
        $mol_mem
    ], $gd_core_entity.prototype, "draft", null);
    __decorate([
        $mol_mem_key
    ], $gd_core_entity.prototype, "value", null);
    __decorate([
        $mol_mem_key
    ], $gd_core_entity, "factory", null);
    __decorate([
        $mol_mem
    ], $gd_core_entity, "ids", null);
    __decorate([
        $mol_mem_key
    ], $gd_core_entity, "search", null);
    __decorate([
        $mol_action
    ], $gd_core_entity, "create_id", null);
    $.$gd_core_entity = $gd_core_entity;
})($ || ($ = {}));
//gd/core/entity/entity.ts
;
"use strict";
var $;
(function ($) {
    $.$gd_kit_id = {
        type_object: '00100000-0000-0000-0000-000000000000',
        type_type: '00200000-0000-0000-0000-000000000000',
        type_prop: '00400000-0000-0000-0000-000000000000',
        type_tenant: '00500000-0000-0000-0000-000000000000',
        type_user: '00300000-0000-0000-0000-000000000000',
        type_commit: '00600000-0000-0000-0000-000000000000',
        type_branch: '00700000-0000-0000-0000-000000000000',
        type_scope: '01000000-0000-0000-0000-000000000000',
        type_session: '06700000-0000-0000-0000-000000000000',
        type_i18n: '13600000-0000-0000-0000-000000000000',
        type_lang: '14400000-0000-0000-0000-000000000000',
        type_agent: '00050000-0000-0000-0000-000000000000',
        type_output: '05400000-0000-0000-0000-000000000000',
        theme: 'e1478557-5160-456f-a586-e284e48a0ea8',
        bot_web: '17200000-0000-0000-0000-000000000000',
        theme2: 'c6c924e6-664b-436d-9de1-59730ac90de1',
        type_tag: '2b419c71-978c-4e2c-8280-652e759d32c4',
        type_workspace: '55772590-1749-47f2-b38c-1bdbec65a5f2',
        form_answer: 'bc7243fe-6ae7-4ba1-a172-312e9c03bace',
        form_question: 'c154a5c7-8fc4-44fd-a34d-c4a8b6d442a3',
        virtual_neural_net: 'eba1d14b-08fa-4e6b-b613-f31c916815a5',
        klass_optional: 'bfc2114b-b756-4599-b44c-dde075b06fcf',
        klass_unsaved: 'e62b4693-14f4-4a68-8037-d7f8dcca8bbd',
        klass: '08900000-0000-0000-0000-000000000000',
        calc_regexp: '08700000-0000-0000-0000-000000000000',
        calc_get_date: '5ab53245-3c70-4c12-a9de-d2c171620226',
        calc_extract_date: '1f608ed6-8d96-44ab-97f5-c845ac878312',
        calc: '06000000-0000-0000-0000-000000000000',
        calc_make_web_bot_name: '13900000-0000-0000-0000-000000000000',
        skill: 'a8761103-4220-4554-a4f2-2c460be496d5',
        reaction: 'a08c4699-17fd-452a-be21-bdd804cd4de5',
        by_default: '11200000-0000-0000-0000-000000000000',
        default_node: '05800000-0000-0000-0000-000000000000',
        trigger_phrase: '7389874f-9136-496e-8f61-49a1864fcf33',
        type_button: '8db2d1ce-2605-44a9-946b-b8202cd0fb0a',
        type_description: '4cdb6622-8499-4171-aefe-3ffe1825cf33',
        type_form: '2d47d787-0d1e-44ca-a1c8-fe696da5abb1',
        prop_stop: '06100000-0000-0000-0000-000000000000',
        prop_input: '06300000-0000-0000-0000-000000000000',
        prop_debug: '1fabd0e2-d1a8-492a-b4c0-fa2c877bea22',
        prop_markdown: '0c48dd92-1294-47d4-98a5-4601250661e2',
        prop_button_click: 'bb73cf77-6d25-483e-b2e7-9655081e96f1',
        service_core: '04900000-0000-0000-0000-000000000000',
        service_db_wmd: '00080000-0000-0000-0000-000000000000',
        service_db_rmd: '00090000-0000-0000-0000-000000000000',
        service_db_rbd: '00140000-0000-0000-0000-000000000000',
        service_db_wbd: '00110000-0000-0000-0000-000000000000',
        service_olap: '07600000-0000-0000-0000-000000000000',
        service_ui: '01580000-0000-0000-0000-000000000000',
        service_new_chat: 'ab00732a-1deb-402f-888a-dcb850ab1f12',
        service_new_lk: '8ef1422d-2255-40b3-a5ea-ce4dfa6cf857',
        service_new_oper: 'cb927d14-8c15-4e96-8ffb-d2aaf051fb16',
        lang_ru: '26631415-62e6-4829-a2ba-bfc82ba43e78',
        lang_en: '6ef5958c-ee1b-4208-91e9-129d0416ea2b',
        calc_output: '05400000-0000-0000-0000-000000000000',
        calc_init: 'efb3f404-bd3b-4ae9-856b-1c401caab58f',
        output_json: 'c9f052a1-9f27-4ba8-8a6b-f703b57b10da',
        app_config_param_url: '3fa16e3a-0865-4636-86e7-7a59c5e49ab3',
        type_channel: '02400000-0000-0000-0000-000000000000',
        channel_voice: '2e56024e-9bae-4596-9299-b4faee7740e6',
        tts_profile: '3686b0b6-8b6a-4ae0-af3e-00531eb2ff8b',
        tts_profile_type: '3bdd1a23-72b3-4cff-9c8f-7a5790e4cb80',
        tts_profile_prop: 'd1223022-44ca-4d68-b142-b5d77f4923a9',
        stt_profile_type: 'b96785af-1177-4896-8f97-cabc33e1bdd1',
        stt_profile_prop: 'b00ebaf8-3621-4f40-b420-91712fa610bb',
        avatar_default: '1ee1ff6f-a485-4b1d-a410-3ff9a0341b77',
        avatar_type: '1dc93a0a-d5f3-4381-99e0-e2ab8a057729',
        avatar_prop: 'd70768f9-4371-422b-9cac-0a9beec58e1b',
        avatar_model: '257b6c93-68b4-48b9-9aab-fa139742d6ec',
        avatar_scene_model: '13be1c08-c1de-4254-b2ad-a19bcb737d66',
        text_all: '08000000-0000-0000-0000-000000000000',
        text_one: '08100000-0000-0000-0000-000000000000',
        text_per: '08200000-0000-0000-0000-000000000000',
    };
    function reversed_map() {
        const result = {};
        for (const [name, id] of Object.entries(this.$gd_kit_id)) {
            result[id] = name;
        }
        return result;
    }
    let cache = undefined;
    function $gd_kit_id_name_by_type(id) {
        if (!cache)
            cache = reversed_map.call(this);
        const name = cache[id];
        if (name === undefined) {
            throw new Error(`type id ${id} not found in $gd_kit_id`);
        }
        return name;
    }
    function $gd_kit_id_named_to_ids(obj) {
        const result = {};
        for (const [name, val] of Object.entries(obj)) {
            const id = this.$gd_kit_id[name];
            if (id === undefined) {
                throw new Error(`Key ${name} not preset in $gd_kit_id`);
            }
            result[id] = val;
        }
        return result;
    }
    $.$gd_kit_id_named_to_ids = $gd_kit_id_named_to_ids;
    function $gd_kit_id_pick_by_type(obj, id) {
        const name = $gd_kit_id_name_by_type.call(this, id);
        const item = obj[name];
        if (item === undefined) {
            throw new Error(`Not found by name '${name}' (id: ${id})`);
        }
        return item;
    }
    $.$gd_kit_id_pick_by_type = $gd_kit_id_pick_by_type;
})($ || ($ = {}));
//gd/kit/id.ts
;
var $node = $node || {} ; $node[ "/gd/kit/logo.svg" ] = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC41ODg1IDEzLjE3MDdDMTQuNTYzMyAxMy42MTA0IDE1LjA5MSAxMy45MzgxIDE1LjUwNyAxNC4yMjA3QzE2LjI3MyAxNC43NDExIDE4LjcxODMgMTYuMDY1NSAxOS4zOTM5IDE2LjE5NjNDMTkuNDE4IDE1LjgyMjkgMTkuMDI3NyAxNS4wMDM2IDE4Ljg3MTEgMTQuNzM2OUMxOC4wNTkyIDEzLjM1MzMgMTYuMjY5OCAxMi43NDgzIDE0LjU4ODUgMTMuMTcwN1pNMjUuNjU5OSAwSDI0LjAyMzRDMjMuODkzMSAwLjA1MTgyNDMgMjIuNjU0NiAwLjEwNTY5OSAyMi4zNzA5IDAuMTM3MzA4QzE5LjcxMzUgMC40MzM2NCAxNy42NTg3IDAuOTgwNDkxIDE1LjIxMTYgMS45ODQyNEMxNC43OTkyIDIuMTUzNDMgMTIuOTk1OSAyLjk3NjgxIDEyLjc5NDggMy4xNzkwMkMxMi43NTU3IDQuMDc5MTIgMTIuODQ0MyA1LjA1OTYxIDEyLjY0NjEgNS44NjY3N0MxMi4yNDk3IDcuNDgwNDQgMTEuMjIzOSA4LjU4MjI2IDExLjc4MDUgMTAuMzM3NEMxMS45NTI2IDEwLjg4MDEgMTIuNTM3NCAxMS43NzUxIDEyLjk5MTggMTEuOTYzNEMxMy4xODAxIDExLjkyODkgMTMuNjMyMSAxMS43MjkxIDEzLjgyODggMTEuNjU3M0MxNi4wMDE5IDEwLjg2NDUgMTguMjk0IDEwLjYxMjEgMjAuMTI1NyAxMi4xNjk5QzIxLjk3MzcgMTMuNzQxNSAyMy41NTU1IDE3LjE1MTQgMjMuOTU3MiAxNy41MzQ2QzI3LjMyODIgMTcuMDYyOSAyOC4wMjI0IDEyLjg2NzEgMjkuMDI4MSA5Ljk3MDg1QzI5LjU4NTEgOC4zNjY4IDI5Ljk4NzEgNi43MjI2IDMwLjY5MjkgNS4zMDI0NEMzMS4wNDk2IDQuNTg0OCAzMS40NTcgMy45NTE3MiAzMS44NDc4IDMuMjc5OUMzMi4xMDYyIDIuODM1NDYgMzMuMDY3NSAxLjczOTYgMzMuMTE2OSAxLjM3MDI3QzMyLjQ2NSAxLjA1NDg5IDMwLjQyMDIgMC41ODgwNDEgMjkuNjM3NCAwLjQ0MjczM0MyOC45OTA4IDAuMzIyNzMyIDI4LjM2MjcgMC4yMjY1MzggMjcuNzEyMyAwLjE0OTgzNkMyNy4zNDkgMC4xMDY5ODYgMjUuODMxOSAwLjA1NDMwMzggMjUuNjU5OSAwWk0yNC4wMjQ1IDUwSDI1LjY1ODdDMjUuNzc2MiA0OS45NjE1IDI3LjE5MjYgNDkuOTAzIDI3LjQ3NzMgNDkuODc0OUMyOS45OTk0IDQ5LjYyNTQgMzIuOTk0NSA0OC44NjU2IDM1LjI1MjggNDcuNzk0OEMzNS44MzQyIDQ3LjUxOTIgMzYuMDI4MSA0Ny40OTUgMzYuMjY5NCA0Ni44NTUxQzM2Ljg0MTkgNDUuMzM3MSAzNi4wNjcgNDMuNDk5NyAzNS4yMzkzIDQyLjM2NjRDMzQuMTYxOCA0MC44OTExIDMyLjU5OTYgMzkuODMzMiAzMS4xOTIyIDM4LjU0MDJDMzAuNzUzNyAzOC4xMzc0IDI5LjUwNzUgMzYuOTczNiAyOS4xOTc3IDM2LjU5NzhDMjguNjA3MiAzNS44ODE5IDI4LjE4MDcgMzUuMDUwOCAyNy41MzI0IDM0LjMyNjNDMjYuOTE2MyAzMy42Mzc5IDI1LjgzOTMgMzIuOTY4NiAyNC44MTU1IDMzLjcxNTJDMjQuMjAwNyAzNC4xNjM1IDIzLjkyNDggMzUuNTc5MSAyMy41MDQ3IDM2LjM0MjhDMjEuNDM1MSA0MC4xMDU0IDE5LjkyNDIgNDIuMzUyMSAxNi45NDI3IDQ1LjUyNDJDMTYuNDI3MiA0Ni4wNzI2IDE1Ljg3ODkgNDYuNDc4NiAxNS43NTg5IDQ3LjI5MzdDMTUuNzMxMyA0Ny40ODA4IDE1LjY4NTMgNDguMDY1MyAxNS43Njg1IDQ4LjIwODFDMTUuOTU4MSA0OC40NzAxIDE4Ljk3NzEgNDkuMjg1NSAxOS41ODU3IDQ5LjQxMTdDMjAuMjkxMiA0OS41NTgyIDIwLjk4NSA0OS42OTAzIDIxLjcyMSA0OS43ODY0QzIyLjAyODUgNDkuODI2NSAyMy45NTc1IDQ5Ljk3MjggMjQuMDI0NSA1MFpNMTMuMjI3MSA0Ny4wNTQ3QzEzLjIyOCA0Ni42MzE2IDEzLjE2NTkgNDYuMTYyNCAxMy4xNTgxIDQ1LjcxMzRDMTMuMTM0OCA0NC4zODQ4IDEzLjE0NjIgNDIuODg5MiAxMy4wNzI3IDQxLjYwNTdDMTIuOTY3IDM5Ljc2MjkgMTMuMzUwOSAzOC4zNDk3IDE0LjAwOTcgMzYuOTYxOEMxNC44MzE3IDM1LjIyOTggMTcuMjA5IDMwLjkzNzUgMTcuNDYzIDI5LjE4MzdDMTcuMjUyNSAyOS4wMDAxIDE1LjQ5NDQgMjguMzY4MiAxNS4wNDkzIDI4LjIzMjNDMTQuMTM5IDI3Ljk1NDMgMTMuMjIwMSAyNy43ODcyIDEyLjE0NjEgMjcuNzY4MkM5LjkyMTg5IDI3LjcyODkgNy43Mjc4IDI3Ljg3MzkgNS41MjUzNCAyNy43NDMyQzQuNTMxMDQgMjcuNjg0MyAzLjU4NzAxIDI3LjQ4NDUgMi43MDA1MiAyNy4yMkMyLjMwNSAyNy4xMDE5IDAuNTA2OCAyNi4yNjI3IDAuMDg0MjUwNCAyNi43NDczQy0wLjA5NjkzNiAyNi45NTUgMC4zMjg4NTIgMjkuMzA2MyAwLjQwMzE5NiAyOS43MDJDMS4xODkxNSAzMy44ODQxIDMuMjY4MDcgMzguMTQwMiA1LjgwMzUzIDQxLjA2MjlDNy40ODMxNiA0Mi45OTkyIDguOTkwODggNDQuMzgyNiAxMS4xMTU5IDQ1LjgxMjJDMTEuNDY1NiA0Ni4wNDc1IDEyLjgxOCA0Ni45Mjk1IDEzLjIyNzEgNDcuMDU0N1pNMzIuMDc3NCAxOS4xODM3VjE5LjMyOTVDMzIuMDc3NCAyMS4xNDk5IDMzLjQwMDMgMjIuMjEzMiAzNS4yNDM0IDIyLjIxMDFDMzcuMzY1OCAyMi4yMDY0IDQwLjQ1NjggMjAuNjAxMyA0Mi4wOTM2IDE5LjgyNDNDNDMuMTc0OSAxOS4zMTEgNDUuODAzNCAxNy45OTIgNDYuOTQxIDE3LjcyNzVDNDcuMzkyNCAxNy42MjI1IDQ4LjQ3NiAxNy40MjEyIDQ4LjcyNzcgMTcuMTcyQzQ4LjY2MyAxNi42MzggNDcuNjk1IDE0LjUxMzQgNDcuNDIwMyAxMy45NDg4QzQ2LjUxNyAxMi4wOTI2IDQ1LjExODYgOS45Nzg1OSA0My43ODgxIDguNTE0MDZDNDMuNTc5OSA4LjI4NDk1IDQzLjYyMDIgOC4yNjEyMiA0My4wMDk0IDguNTIxODJDNDIuNzMyNCA4LjY0MDAxIDQyLjQ3MzkgOC43NTE4OCA0Mi4yMjA1IDguODY3ODdDNDEuNzE1MyA5LjA5OTA0IDQxLjIxNzMgOS4zNTU1MSA0MC43MTYgOS42MzcyMUMzOC43ODI1IDEwLjcyMzcgMzQuMDY1NyAxMy41ODAxIDMyLjk4NjMgMTUuNTI4NkMzMi41MDI3IDE2LjQwMTQgMzIuMDc3NCAxNy45NTA0IDMyLjA3NzQgMTkuMTgzN1pNNS4zNTEwMiAxNS4wNDAyTDMuNjg4MzMgMTQuOTgwMkMzLjIyMDI5IDE0Ljk0NTIgMi41NDk5NCAxNC44MjQ2IDIuMTEzMTYgMTQuODM5MUMxLjI1Mzk1IDE2Ljc3OTQgMC41OTU3NjMgMTguOTQyNCAwLjI2MDEwOSAyMS4xMTg3QzAuMTg1ODQ0IDIxLjYwMDIgLTAuMDU0MzA4OCAyMy4yMDEyIDAuMDExMTk1MyAyMy42MTUyQzMuNjA4NiAyMy42OTU3IDYuMDUwODIgMjMuNDcxNiA5LjUzODEzIDIzLjE0QzEyLjkyMTkgMjIuODE4MyAxMy43NDM5IDIzLjE1MzIgMTcuMTM0MSAyMS45MjYyQzE3LjA1ODQgMjEuMjk1IDE1LjU3MzggMTkuMjA5MyAxNS4xODc1IDE4LjcwOTNDMTQuMzg1OCAxNy42NzEyIDEzLjYwNjMgMTYuODAyOSAxMi44MjUxIDE1Ljg4MDRDMTIuMjk5MSAxNS4yNTkxIDExLjk4MjEgMTQuNzI1OSAxMS4zNTk3IDE0LjEzODJDMTEuMTc1OSAxMy45NjQ2IDExLjE3NTQgMTQuMDM2NSAxMC45MjM0IDE0LjExNzdDOS4xMjM1MiAxNC42OTc5IDcuMzU3MDUgMTUuMDUzNiA1LjM1MTAyIDE1LjA0MDJaTTUwIDI1LjY2NjZWMjQuNjcyNUw0OC4yNDg3IDI1LjQ3OTdDNDYuMzk0NSAyNi4yOTk0IDQ0LjQ4MTggMjcuMDQ1MyA0Mi4zOTUxIDI3LjM1MTZDNDAuOTM5MiAyNy41NjUyIDM5LjIwMSAyNy43Nzk5IDM3LjY2MjYgMjcuNzQxM0MzNi4wNjkyIDI3LjcwMTMgMzQuOTI0OCAyNi42ODQ3IDMzLjU5MzMgMjcuOTU5MkMzMy43MzY5IDI4LjM0OTggMzQuNjA1NSAyOC45ODQgMzQuOTcwNiAyOS4xOTU5QzM1LjUyOTIgMjkuNTIwMiAzNi4xODM0IDI5Ljc2NzEgMzYuODMyMiAyOS45OTE3QzM5LjI5NCAzMC44NDM3IDQxLjUwMjUgMzIuMzM0IDQzLjk4NDIgMzMuMzk0NUM0NC44MTQ4IDMzLjc0OTUgNDcuMDQ5NiAzNC42MTg4IDQ4LjA3NTIgMzQuNTc3MUM0OC40MTY5IDM0LjEzMjEgNDkuMjI4IDMxLjE4NTEgNDkuMzk0IDMwLjQ2ODZDNDkuNTY0IDI5LjczNDggNDkuNjk4NiAyOC45Mzk2IDQ5Ljc5ODggMjguMTYwNkM0OS44NTEyIDI3Ljc1MzggNDkuODkwMyAyNy4zNjg5IDQ5LjkyMjYgMjYuOTQ5NEM0OS45Mzk4IDI2LjcyNDUgNDkuOTY0NyAyNS43ODI3IDUwIDI1LjY2NjZaTTMyLjExMzMgMTMuMjc2MUMzMi4yMjU1IDEzLjIyNzggMzIuNTI1NyAxMi45MzYyIDMyLjY5MTUgMTIuODE0QzMzLjkxODQgMTEuOTA5OSAzNS44NTA0IDEwLjgyMjQgMzcuMTcwMiAxMC4xMjA3QzM4LjA0OTUgOS42NTMyNiAzOC45NDMyIDkuMTkxMDYgMzkuODYyNiA4LjcyODIzQzQwLjMxNTcgOC41MDAxNSA0MC43OTI1IDguMjY1OTggNDEuMjQyMyA4LjA2OTI0QzQxLjQ5NyA3Ljk1Nzg2IDQyLjUyNjUgNy41NTA2NCA0Mi42ODk3IDcuNDM0NDFDNDIuNTU2NSA2LjkyOTUzIDM5LjY4NzUgNC43NTIxIDM4Ljk2MzUgNC4yNzA0N0MzNy42MzA4IDMuMzg0MDUgMzYuMDA5MiAyLjQ1NjA3IDM0LjQ1NjQgMS44NTkyOUMzNC4yODE4IDEuNzkyMTggMzQuMjc2OSAxLjgzODk3IDM0LjE4NDcgMS45NDQxNkMzMy42NTUzIDIuNTQ4MDMgMzMuMzk2MSAzLjExNTY4IDMzLjExMjQgMy45MDU5M0MzMi44MjY3IDQuNzAxNSAzMi41OTcyIDUuNzc4MDkgMzIuNDgxOSA2LjcxMDQ0QzMyLjQwNzIgNy4zMTQ2OCAzMi4wNTM3IDEyLjU0NjEgMzIuMTEzMyAxMy4yNzYxWk0yLjYzNTUyIDEzLjgxNzFDNC45MTAzIDEzLjg4ODYgNy4yMDk3MyAxNC4wNDMxIDkuNDI4MDggMTMuNDA5OUM5Ljg1NDQ5IDEzLjI4ODIgMTAuMTQzMiAxMy4xMzU1IDEwLjU0NzUgMTMuMDA4MkMxMC41Mzk4IDEyLjg4NjcgMTAuMTI3OCAxMi4xNTgyIDEwLjA0MTkgMTEuOTU5OEM5Ljg4MjYyIDExLjU5MjQgOS43NDEwNiAxMS4xOTYzIDkuNjY0MTkgMTAuNzU2NEM5LjQ4Mzg4IDkuNzI0MjEgOS43Mjc4NiA4Ljk1NTMxIDEwLjExODQgOC4yMDM0M0MxMC40NzQ5IDcuNTE3MTQgMTAuODE4MiA2Ljg4NTg0IDExLjE1MDggNi4xMTc2QzExLjM0OTggNS42NTc5MSAxMS44MzMgNC4yNjc0NyAxMS44OTczIDMuNzE1MzNDMTEuNDk3OSAzLjgxNTUxIDkuNDMyOTQgNS4zOTg5NyA5LjA1Njk2IDUuNzE2MDRDNy4zMjY5NCA3LjE3NTE1IDUuNzIyMTYgOC44Mjk0IDQuNDE0MTMgMTAuNzU0MUM0LjE0NTQ2IDExLjE0OTUgMi42NTczNiAxMy40NTIxIDIuNjM1NTIgMTMuODE3MVpNNDEuNDA0MyA0My44MzY5QzQxLjg0MjYgNDMuNjI1NiA0My43NjExIDQxLjUzODcgNDQuMTg5OCA0MS4wMTRDNDQuNjIxOCA0MC40ODU0IDQ2LjM5ODUgMzguMTkzOSA0Ni41MTU1IDM3LjY3ODhDNDYuMDczNyAzNy41NDA0IDQ1LjY5NDMgMzcuMzcyNSA0NS4yMzIxIDM3LjI0NTlDNDMuOTQ5OCAzNi44OTQ5IDQyLjI4MTUgMzYuNTQxMyA0MS4xMzY3IDM2LjE4MjRDMzkuMzI0MiAzNS42MTQzIDM3LjI0MjMgMzQuMjkxNyAzNi4zNDM1IDM0LjA2ODhDMzYuNDE3NCAzNC41MjY0IDM3LjQ1MzUgMzUuOTY4MSAzNy43MzA3IDM2LjQwMzVDMzguMjA1OCAzNy4xNDk2IDM4LjY5NzYgMzcuODk0OSAzOS4xNDA2IDM4LjY5NzZDNDAuMTAwNyA0MC40MzcxIDQwLjcxNTkgNDEuODczIDQxLjQwNDMgNDMuODM2OVpNMzcuNTE4OCA0Ni42MjFDMzcuOTMyMSA0Ni40NjQ1IDM5LjY2IDQ1LjI4NTEgNDAuMDAxNiA0NC45ODU0QzQwLjA5NDkgNDQuMzU2NCAzOC45MzM4IDQyLjMyMzIgMzguNjI1NyA0MS44MDgyQzM4LjA0MDUgNDAuODI5OCAzNy40MjgzIDM5Ljk2NTUgMzYuNzIxNyAzOS4xNjM1QzM1LjM5MzQgMzcuNjU1OSAzMy43OTE4IDM1LjcyODQgMzEuNDEwNCAzNS4zNTU2QzMxLjQ1NjcgMzUuNzA3NSAzMi4wNTkgMzYuNDE5OSAzMi4zMjQ5IDM2LjY3ODZDMzIuNzIyOCAzNy4wNjU5IDMzLjEyNzEgMzcuMzY4MSAzMy41MDczIDM3LjcxMThDMzQuMTc5MiAzOC4zMTk0IDM0Ljk4NDQgMzkuMzEzMSAzNS42MDU0IDQwLjA0NzNDMzYuOTQ3NCA0MS42MzM5IDM3Ljc3NzcgNDIuMjE3NCAzNy43MzU3IDQ0LjU3NzNDMzcuNzI5NCA0NC45MjkxIDM3LjY5NzEgNDUuMjgyNCAzNy42NTQ4IDQ1LjYyMjdDMzcuNjE3MSA0NS45MjUyIDM3LjUyOTkgNDYuMzI3OCAzNy41MTg4IDQ2LjYyMVpNMTUuMjgxNyA0NC4zMzYzQzE1LjcwNDIgNDQuMjY5IDE1Ljk4OTggNDMuNzg4MiAxNi4yMTY5IDQzLjQ4NTdDMTYuNDcyMSA0My4xNDU1IDE2LjczOTEgNDIuNzk5MSAxNi45OTM3IDQyLjQ4MzJDMTcuNDk3NyA0MS44NTc2IDE3Ljk4MjIgNDEuMTAzNyAxOC40NjczIDQwLjM5OTVDMTguOTA3NCAzOS43NjA1IDE5LjM4NDggMzguODI2NyAxOS43MTAzIDM4LjA4NzdDMTkuOTAwMiAzNy42NTY2IDIwLjU3OTIgMzUuOTQxOCAyMC42MTQ0IDM1LjQ2ODJDMjAuMzUyMyAzNS40NTY3IDE5LjY1NzcgMzUuODYwNSAxOS40Mzg3IDM2LjAwNTVDMTkuMDgzOSAzNi4yNDA1IDE4Ljc5NyAzNi41MDU5IDE4LjQ4MDEgMzYuODI4MUMxNy45NDE3IDM3LjM3NTUgMTcuMzYzMSAzOC4xOTkgMTYuOTQyNCAzOC44NDg4QzE1LjgxODcgNDAuNTgzOCAxNS4zMDU2IDQxLjc4MjggMTUuMjgxNyA0NC4zMzYzWk00MS42MjI0IDIzLjEzQzQxLjg5MiAyMy4yMzU2IDQyLjE0MDMgMjMuMjc1MyA0Mi40NzU5IDIzLjI3NThDNDMuODcwMSAyMy4yNzc4IDQ1LjY1MDUgMjIuNDc2MSA0Ni42NzYyIDIxLjk4MzZDNDcuMjc3IDIxLjY5NTEgNDcuOTA1NCAyMS4zNjY5IDQ4LjQ2MDQgMjEuMDI4OEM0OS4xMzE2IDIwLjYxOTkgNDkuNTcyOCAyMC4yNjc3IDQ5LjM0MDQgMTkuMjkwNUM0OC41ODM5IDE5LjM4NzEgNDQuMjU2IDIxLjMyMzkgNDMuMTM2NSAyMS43NDM0QzQyLjM0MjEgMjIuMDQxIDQxLjYwMzMgMjIuMDQyMiA0MS42MjI0IDIzLjEzWiIgZmlsbD0iIzUwRTA0MCIvPgo8L3N2Zz4K"

;
var $node = $node || {} ; $node[ "/gd/kit/placeholder.svg" ] = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTEgNTExIj4KICA8ZyBmaWxsPSIjNkM5MUNGIiBzdHJva2U9IiM2QzkxQ0YiPgogICAgPHBhdGggZD0iTTQ4Ny41IDI0aC00NjRDMTAuNSAyNCAwIDM0LjUgMCA0Ny41djMwNGMwIDEzIDEwLjUgMjMuNSAyMy41IDIzLjVoMTU4TDE3MCA0MTZoLTM0LjNjLTQgMC03LjUgMy40LTcuNSA3LjVzMy40IDcuNSA3LjUgNy41aDEzNmM0IDAgNy41LTMuNCA3LjUtNy41cy0zLjQtNy41LTcuNS03LjVoLTg2bDExLjctNDFoNzQuM2M0IDAgNy41LTMuNCA3LjUtNy41cy0zLjQtNy41LTcuNS03LjVoLTI0OGMtNC43IDAtOC41LTMuOC04LjUtOC41di0zMDRjMC00LjcgMy44LTguNSA4LjUtOC41aDQ2NGM0LjcgMCA4LjUgMy44IDguNSA4LjV2MzA0YzAgNCAzLjQgNy41IDcuNSA3LjVzNy41LTMuNCA3LjUtNy41di0zMDRjMC0xMy0xMC41LTIzLjUtMjMuNS0yMy41eiIvPgogICAgPHBhdGggZD0iTTQ3MS41IDU2aC00MzJjLTQgMC03LjUgMy40LTcuNSA3LjV2MjcyYzAgNCAzLjQgNy41IDcuNSA3LjVoMjMyYzQgMCA3LjUtMy40IDcuNS03LjVzLTMuNC03LjUtNy41LTcuNUg0N1YxMzVoNDE3djMyLjVjMCA0IDMuNCA3LjUgNy41IDcuNXM3LjUtMy40IDcuNS03LjV2LTEwNGMwLTQtMy40LTcuNS03LjUtNy41ek00NyAxMjBWNzFoNDE3djQ5SDQ3eiIvPgogICAgPHBhdGggZD0iTTM5MS41IDg4aC0yNDBjLTQgMC03LjUgMy40LTcuNSA3LjVzMy40IDcuNSA3LjUgNy41aDI0MGM0IDAgNy41LTMuNCA3LjUtNy41cy0zLjQtNy41LTcuNS03LjV6TTQzOS41IDg4aC0xNmMtNCAwLTcuNSAzLjQtNy41IDcuNXMzLjQgNy41IDcuNSA3LjVoMTZjNCAwIDcuNS0zLjQgNy41LTcuNXMtMy40LTcuNS03LjUtNy41ek03MS41IDg4Yy0yIDAtNCAuOC01LjMgMi4yLTEuNCAxLjQtMi4yIDMuMy0yLjIgNS4zcy44IDQgMi4yIDUuM2MxLjQgMS40IDMuMyAyLjIgNS4zIDIuMnM0LS44IDUuMy0yLjJjMS40LTEuNCAyLjItMy4zIDIuMi01LjNzLS44LTQtMi4yLTUuM2MtMS40LTEuNC0zLjMtMi4yLTUuMy0yLjJ6TTk1LjUgODhjLTIgMC00IC44LTUuMyAyLjItMS40IDEuNC0yLjIgMy4zLTIuMiA1LjNzLjggNCAyLjIgNS4zYzEuNCAxLjQgMy4zIDIuMiA1LjMgMi4yczQtLjggNS4zLTIuMmMxLjQtMS40IDIuMi0zLjMgMi4yLTUuM3MtLjgtNC0yLjItNS4zYy0xLjQtMS40LTMuMy0yLjItNS4zLTIuMnpNMTE5LjUgODhjLTIgMC00IC44LTUuMyAyLjItMS40IDEuNC0yLjIgMy4zLTIuMiA1LjNzLjggNCAyLjIgNS4zYzEuNCAxLjQgMy4zIDIuMiA1LjMgMi4yczQtLjggNS4zLTIuMmMxLjQtMS40IDIuMi0zLjMgMi4yLTUuM3MtLjgtNC0yLjItNS4zYy0xLjQtMS40LTMuMy0yLjItNS4zLTIuMnpNNDU1LjUgMTkyaC0xMzZjLTEzIDAtMjMuNSAxMC41LTIzLjUgMjMuNXYyNDhjMCAxMyAxMC41IDIzLjUgMjMuNSAyMy41aDEzNmMxMyAwIDIzLjUtMTAuNSAyMy41LTIzLjV2LTI0OGMwLTEzLTEwLjUtMjMuNS0yMy41LTIzLjV6TTMxMSAyMzloMTUzdjMzSDMxMXYtMzN6bTAgNDhoMTUzdjE1M0gzMTFWMjg3em04LjUtODBoMTM2YzQuNyAwIDguNSAzLjggOC41IDguNXY4LjVIMzExdi04LjVjMC00LjcgMy44LTguNSA4LjUtOC41em0xMzYgMjY1aC0xMzZjLTQuNyAwLTguNS0zLjgtOC41LTguNVY0NTVoMTUzdjguNWMwIDQuNy0zLjggOC41LTguNSA4LjV6Ii8+CiAgICA8cGF0aCBkPSJNNDE1LjUgMjQ4aC04OGMtNCAwLTcuNSAzLjQtNy41IDcuNXMzLjQgNy41IDcuNSA3LjVoODhjNCAwIDcuNS0zLjQgNy41LTcuNXMtMy40LTcuNS03LjUtNy41ek00NDcuNSAyNDhoLThjLTQgMC03LjUgMy40LTcuNSA3LjVzMy40IDcuNSA3LjUgNy41aDhjNCAwIDcuNS0zLjQgNy41LTcuNXMtMy40LTcuNS03LjUtNy41ek04Ny41IDE2MEM3OSAxNjAgNzIgMTY3IDcyIDE3NS41djEwNGMwIDguNSA3IDE1LjUgMTUuNSAxNS41aDEyMGM4LjUgMCAxNS41LTcgMTUuNS0xNS41di0xMDRjMC04LjUtNy0xNS41LTE1LjUtMTUuNWgtMTIwem03MS4zIDY3LjVMMjA4IDE4NHY4N2wtNDkuMi00My41em0tMTEuMy0xMEw5OS4zIDE3NWg5Ni40bC00OC4yIDQyLjV6TTg3IDI3MXYtODdsNDkuMiA0My41TDg3IDI3MXptNjAuNS0zMy41bDQ4LjIgNDIuNUg5OS4zbDQ4LjItNDIuNXpNMjU1LjUgMTc1aDE4NGM0IDAgNy41LTMuNCA3LjUtNy41cy0zLjQtNy41LTcuNS03LjVoLTE4NGMtNCAwLTcuNSAzLjQtNy41IDcuNXMzLjQgNy41IDcuNSA3LjV6TTI3MS41IDIwMGgtMTZjLTQgMC03LjUgMy40LTcuNSA3LjVzMy40IDcuNSA3LjUgNy41aDE2YzQgMCA3LjUtMy40IDcuNS03LjVzLTMuNC03LjUtNy41LTcuNXpNMjcxLjUgMjQwaC0xNmMtNCAwLTcuNSAzLjQtNy41IDcuNXMzLjQgNy41IDcuNSA3LjVoMTZjNCAwIDcuNS0zLjQgNy41LTcuNXMtMy40LTcuNS03LjUtNy41ek0yNzEuNSAyODBoLTE2Yy00IDAtNy41IDMuNC03LjUgNy41czMuNCA3LjUgNy41IDcuNWgxNmM0IDAgNy41LTMuNCA3LjUtNy41cy0zLjQtNy41LTcuNS03LjV6TTQzMS41IDMwNGgtODhjLTguNSAwLTE1LjUgNy0xNS41IDE1LjV2NTZjMCA4LjUgNyAxNS41IDE1LjUgMTUuNWg4OGM4LjUgMCAxNS41LTcgMTUuNS0xNS41di01NmMwLTguNS03LTE1LjUtMTUuNS0xNS41em0tMzAgNDMuNUw0MzIgMzI4djM5bC0zMC41LTE5LjV6bS0xNC05TDM1Ni43IDMxOWg2MS42bC0zMC44IDE5LjZ6TTM0MyAzNjd2LTM5bDMwLjUgMTkuNUwzNDMgMzY3em00NC41LTEwLjZsMzAuOCAxOS42aC02MS42bDMwLjgtMTkuNnpNNDM5LjUgNDA4aC0xMDRjLTQgMC03LjUgMy40LTcuNSA3LjVzMy40IDcuNSA3LjUgNy41aDEwNGM0IDAgNy41LTMuNCA3LjUtNy41cy0zLjQtNy41LTcuNS03LjV6Ii8+CiAgPC9nPgo8L3N2Zz4K"

;
"use strict";
var $;
(function ($) {
    function $mol_crypto_uuid() {
        throw new Error('Unsupported platform');
    }
    $.$mol_crypto_uuid = $mol_crypto_uuid;
})($ || ($ = {}));
//mol/crypto/uuid/uuid.ts
;
"use strict";
var $;
(function ($) {
    function $mol_crypto_uuid_node() {
        return this.$node.crypto.randomUUID();
    }
    $.$mol_crypto_uuid_node = $mol_crypto_uuid_node;
    $.$mol_crypto_uuid = $mol_crypto_uuid_node;
})($ || ($ = {}));
//mol/crypto/uuid/uuid.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_time_base {
        static patterns = {};
        static formatter(pattern) {
            if (this.patterns[pattern])
                return this.patterns[pattern];
            var tokens = Object.keys(this.patterns)
                .sort()
                .reverse()
                .map((token) => token.replace(/([-+*.\[\]()\^])/g, '\\$1'));
            var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
            var funcs = [];
            pattern.replace(lexer, (str, text, token) => {
                if (text)
                    funcs.push(() => text);
                if (token)
                    funcs.push(this.patterns[token]);
                return str;
            });
            return this.patterns[pattern] = (arg) => {
                return funcs.reduce((res, func) => res + func(arg), '');
            };
        }
        toString(pattern) {
            const Base = this.constructor;
            const formatter = Base.formatter(pattern);
            return formatter(this);
        }
    }
    $.$mol_time_base = $mol_time_base;
})($ || ($ = {}));
//mol/time/base/base.ts
;
"use strict";
var $;
(function ($) {
    class $mol_time_duration extends $mol_time_base {
        constructor(config = 0) {
            super();
            if (typeof config === 'number') {
                this.second = config / 1000;
                return;
            }
            if (typeof config === 'string') {
                if (config === 'Z') {
                    this.hour = 0;
                    this.minute = 0;
                    return;
                }
                duration: {
                    const parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                    const found = parser.exec(config);
                    if (!found)
                        break duration;
                    if (found[1])
                        this.year = Number(found[1]);
                    if (found[2])
                        this.month = Number(found[2]);
                    if (found[3])
                        this.day = Number(found[3]);
                    if (found[4])
                        this.hour = Number(found[4]);
                    if (found[5])
                        this.minute = Number(found[5]);
                    if (found[6])
                        this.second = Number(found[6]);
                    return;
                }
                offset: {
                    var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                    var found = parser.exec(config);
                    if (!found)
                        break offset;
                    if (found[1])
                        this.hour = Number(found[1]);
                    if (found[2])
                        this.minute = Number(found[2]);
                    return;
                }
                throw new Error(`Can not parse time duration (${config})`);
            }
            this.year = config.year || 0;
            this.month = config.month || 0;
            this.day = config.day || 0;
            this.hour = config.hour || 0;
            this.minute = config.minute || 0;
            this.second = config.second || 0;
        }
        year = 0;
        month = 0;
        day = 0;
        hour = 0;
        minute = 0;
        second = 0;
        summ(config) {
            const duration = new $mol_time_duration(config);
            return new $mol_time_duration({
                year: this.year + duration.year,
                month: this.month + duration.month,
                day: this.day + duration.day,
                hour: this.hour + duration.hour,
                minute: this.minute + duration.minute,
                second: this.second + duration.second,
            });
        }
        mult(numb) {
            return new $mol_time_duration({
                year: this.year && this.year * numb,
                month: this.month && this.month * numb,
                day: this.day && this.day * numb,
                hour: this.hour && this.hour * numb,
                minute: this.minute && this.minute * numb,
                second: this.second && this.second * numb,
            });
        }
        count(config) {
            const duration = new $mol_time_duration(config);
            return this.valueOf() / duration.valueOf();
        }
        valueOf() {
            var day = this.year * 365 + this.month * 30.4 + this.day;
            var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
            return second * 1000;
        }
        toJSON() { return this.toString(); }
        toString(pattern = 'P#Y#M#DT#h#m#s') {
            return super.toString(pattern);
        }
        [Symbol.toPrimitive](mode) {
            return mode === 'number' ? this.valueOf() : this.toString();
        }
        static patterns = {
            '#Y': (duration) => {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': (duration) => {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': (duration) => {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': (duration) => {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': (duration) => {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': (duration) => {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
        };
    }
    $.$mol_time_duration = $mol_time_duration;
})($ || ($ = {}));
//mol/time/duration/duration.ts
;
"use strict";
var $;
(function ($) {
    let $mol_time_moment_weekdays;
    (function ($mol_time_moment_weekdays) {
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["monday"] = 0] = "monday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["tuesday"] = 1] = "tuesday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["wednesday"] = 2] = "wednesday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["thursday"] = 3] = "thursday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["friday"] = 4] = "friday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["saturday"] = 5] = "saturday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["sunday"] = 6] = "sunday";
    })($mol_time_moment_weekdays = $.$mol_time_moment_weekdays || ($.$mol_time_moment_weekdays = {}));
    function numb(str, max) {
        const numb = Number(str);
        if (numb < max)
            return numb;
        $mol_fail(new Error(`Wrong time component ${str}`));
    }
    class $mol_time_moment extends $mol_time_base {
        constructor(config = new Date) {
            super();
            if (typeof config === 'number')
                config = new Date(config);
            if (typeof config === 'string') {
                const parsed = /^(?:(\d\d?\d?\d?)(?:-?(\d\d?)(?:-?(\d\d?))?)?)?(?:[T ](?:(\d\d?)(?::?(\d\d?)(?::?(\d\d?(?:\.\d+)?))?)?)?(Z|[\+\-]\d\d?(?::?(?:\d\d?)?)?)?)?$/.exec(config);
                if (!parsed)
                    throw new Error(`Can not parse time moment (${config})`);
                if (parsed[1])
                    this.year = numb(parsed[1], 9999);
                if (parsed[2])
                    this.month = numb(parsed[2], 13) - 1;
                if (parsed[3])
                    this.day = numb(parsed[3], 32) - 1;
                if (parsed[4])
                    this.hour = numb(parsed[4], 60);
                if (parsed[5])
                    this.minute = numb(parsed[5], 60);
                if (parsed[6])
                    this.second = numb(parsed[6], 60);
                if (parsed[7])
                    this.offset = new $mol_time_duration(parsed[7]);
                return;
            }
            if (config instanceof Date) {
                this.year = config.getFullYear();
                this.month = config.getMonth();
                this.day = config.getDate() - 1;
                this.hour = config.getHours();
                this.minute = config.getMinutes();
                this.second = config.getSeconds() + config.getMilliseconds() / 1000;
                const offset = -config.getTimezoneOffset();
                this.offset = new $mol_time_duration({
                    hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                    minute: offset % 60
                });
                return;
            }
            this.year = config.year;
            this.month = config.month;
            this.day = config.day;
            this.hour = config.hour;
            this.minute = config.minute;
            this.second = config.second;
            this.offset = config.offset == null ? config.offset : new $mol_time_duration(config.offset);
        }
        year;
        month;
        day;
        hour;
        minute;
        second;
        offset;
        get weekday() {
            return (this.native.getDay() + 6) % 7;
        }
        _native;
        get native() {
            if (this._native)
                return this._native;
            const utc = this.toOffset('Z');
            return this._native = new Date(Date.UTC(utc.year ?? 0, utc.month ?? 0, (utc.day ?? 0) + 1, utc.hour ?? 0, utc.minute ?? 0, utc.second != undefined ? Math.floor(utc.second) : 0, utc.second != undefined ? Math.floor((utc.second - Math.floor(utc.second)) * 1000) : 0));
        }
        _normal;
        get normal() {
            if (this._normal)
                return this._normal;
            const moment = new $mol_time_moment(this.native);
            return this._normal = new $mol_time_moment({
                year: this.year === undefined ? undefined : moment.year,
                month: this.month === undefined ? undefined : moment.month,
                day: this.day === undefined ? undefined : moment.day,
                hour: this.hour === undefined ? undefined : moment.hour,
                minute: this.minute === undefined ? undefined : moment.minute,
                second: this.second === undefined ? undefined : moment.second,
                offset: this.offset === undefined ? undefined : moment.offset,
            });
        }
        merge(config) {
            const moment = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: moment.year === undefined ? this.year : moment.year,
                month: moment.month === undefined ? this.month : moment.month,
                day: moment.day === undefined ? this.day : moment.day,
                hour: moment.hour === undefined ? this.hour : moment.hour,
                minute: moment.minute === undefined ? this.minute : moment.minute,
                second: moment.second === undefined ? this.second : moment.second,
                offset: moment.offset === undefined ? this.offset : moment.offset,
            });
        }
        shift(config) {
            const duration = new $mol_time_duration(config);
            const moment = new $mol_time_moment().merge({
                year: this.year,
                month: this.month,
                day: this.day,
                hour: this.hour ?? 0,
                minute: this.minute ?? 0,
                second: this.second ?? 0,
                offset: this.offset ?? 0
            });
            const second = moment.second + (duration.second ?? 0);
            const native = new Date(moment.year + (duration.year ?? 0), moment.month + (duration.month ?? 0), moment.day + 1 + (duration.day ?? 0), moment.hour + (duration.hour ?? 0), moment.minute + (duration.minute ?? 0), Math.floor(second), (second - Math.floor(second)) * 1000);
            if (isNaN(native.valueOf()))
                throw new Error('Wrong time');
            return new $mol_time_moment({
                year: this.year === undefined ? undefined : native.getFullYear(),
                month: this.month === undefined ? undefined : native.getMonth(),
                day: this.day === undefined ? undefined : native.getDate() - 1,
                hour: this.hour === undefined ? undefined : native.getHours(),
                minute: this.minute === undefined ? undefined : native.getMinutes(),
                second: this.second === undefined ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
                offset: this.offset,
            });
        }
        mask(config) {
            const mask = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: mask.year === undefined ? undefined : this.year,
                month: mask.month === undefined ? undefined : this.month,
                day: mask.day === undefined ? undefined : this.day,
                hour: mask.hour === undefined ? undefined : this.hour,
                minute: mask.minute === undefined ? undefined : this.minute,
                second: mask.second === undefined ? undefined : this.second,
                offset: mask.offset === undefined ? undefined : this.offset,
            });
        }
        toOffset(config = new $mol_time_moment().offset) {
            const duration = new $mol_time_duration(config);
            const offset = this.offset || new $mol_time_moment().offset;
            let with_time = new $mol_time_moment('T00:00:00').merge(this);
            const moment = with_time.shift(duration.summ(offset.mult(-1)));
            return moment.merge({ offset: duration });
        }
        valueOf() { return this.native.getTime(); }
        toJSON() { return this.toString(); }
        toString(pattern = 'YYYY-MM-DDThh:mm:ss.sssZ') {
            return super.toString(pattern);
        }
        [Symbol.toPrimitive](mode) {
            return mode === 'number' ? this.valueOf() : this.toString();
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_accent(this.toString('YYYY-MM-DD hh:mm:ss.sss Z')));
        }
        static patterns = {
            'YYYY': (moment) => {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': (moment) => {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': (moment) => {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': (pattern => (moment) => {
                if (moment.month == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { month: 'long' })),
            'DD Month': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['DD'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Month'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'long' })),
            'D Month': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['D'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Month'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' })),
            'Mon': (pattern => (moment) => {
                if (moment.month == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { month: 'short' })),
            'DD Mon': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['DD'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Mon'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short' })),
            'D Mon': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['D'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Mon'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' })),
            '-MM': (moment) => {
                if (moment.month == null)
                    return '';
                return '-' + $mol_time_moment.patterns['MM'](moment);
            },
            'MM': (moment) => {
                if (moment.month == null)
                    return '';
                return String(100 + moment.month + 1).slice(1);
            },
            'M': (moment) => {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': (pattern => (moment) => {
                if (moment.day == null)
                    return '';
                if (moment.month == null)
                    return '';
                if (moment.year == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { weekday: 'long' })),
            'WD': (pattern => (moment) => {
                if (moment.day == null)
                    return '';
                if (moment.month == null)
                    return '';
                if (moment.year == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { weekday: 'short' })),
            '-DD': (moment) => {
                if (moment.day == null)
                    return '';
                return '-' + $mol_time_moment.patterns['DD'](moment);
            },
            'DD': (moment) => {
                if (moment.day == null)
                    return '';
                return String(100 + moment.day + 1).slice(1);
            },
            'D': (moment) => {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': (moment) => {
                if (moment.hour == null)
                    return '';
                return 'T' + $mol_time_moment.patterns['hh'](moment);
            },
            'hh': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(100 + moment.hour).slice(1);
            },
            'h': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return ':' + $mol_time_moment.patterns['mm'](moment);
            },
            'mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(100 + moment.minute).slice(1);
            },
            'm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': (moment) => {
                if (moment.second == null)
                    return '';
                return ':' + $mol_time_moment.patterns['ss'](moment);
            },
            'ss': (moment) => {
                if (moment.second == null)
                    return '';
                return String(100 + moment.second | 0).slice(1);
            },
            's': (moment) => {
                if (moment.second == null)
                    return '';
                return String(moment.second | 0);
            },
            '.sss': (moment) => {
                if (moment.second == null)
                    return '';
                if (moment.second === (moment.second | 0))
                    return '';
                return '.' + $mol_time_moment.patterns['sss'](moment);
            },
            'sss': (moment) => {
                if (moment.second == null)
                    return '';
                const millisecond = (moment.second - Math.trunc(moment.second)).toFixed(3);
                return millisecond.slice(2);
            },
            'Z': (moment) => {
                const offset = moment.offset;
                if (!offset)
                    return '';
                let hour = offset.hour;
                let sign = '+';
                if (hour < 0) {
                    sign = '-';
                    hour = -hour;
                }
                return sign + String(100 + hour).slice(1) + ':' + String(100 + offset.minute).slice(1);
            }
        };
    }
    $.$mol_time_moment = $mol_time_moment;
})($ || ($ = {}));
//mol/time/moment/moment.ts
;
"use strict";
//gd/kit/entity/e.ts
;
"use strict";
var $;
(function ($) {
    const str = () => ('00000000000000000' + (Math.random() * 0xffffffffffffffff).toString(16)).slice(-16);
    class $gd_kit_entity extends $gd_core_entity {
        static create_uuid() {
            const a = str();
            const b = str();
            return a.slice(0, 8) + '-' + a.slice(8, 12) + '-4' + a.slice(13) + '-a' + b.slice(1, 4) + '-' + b.slice(4);
        }
        static create_id(group = '') {
            const is_secure = this.$.$mol_dom_context.isSecureContext;
            return is_secure ? this.$.$mol_crypto_uuid() : this.create_uuid();
        }
        static created_at(group = '') {
            return new Date().toISOString();
        }
        title(next) {
            return next;
        }
        created_at(next) {
            return next ?? new this.$.$mol_time_moment;
        }
    }
    __decorate([
        $mol_mem
    ], $gd_kit_entity.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $gd_kit_entity.prototype, "created_at", null);
    __decorate([
        $mol_action
    ], $gd_kit_entity, "create_id", null);
    __decorate([
        $mol_action
    ], $gd_kit_entity, "created_at", null);
    $.$gd_kit_entity = $gd_kit_entity;
})($ || ($ = {}));
//gd/kit/entity/entity.ts

//# sourceMappingURL=node.js.map
