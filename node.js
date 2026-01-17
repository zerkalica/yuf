#!/usr/bin/env node
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
    function $mol_offline() { }
    $.$mol_offline = $mol_offline;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    try {
        $mol_offline();
    }
    catch (error) {
        console.error(error);
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const mod = require('module');
    const internals = mod.builtinModules;
    function $node_internal_check(name) {
        if (name.startsWith('node:'))
            return true;
        return internals.includes(name);
    }
    $.$node_internal_check = $node_internal_check;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const path = require('path');
    const mod = require('module');
    const localRequire = mod.createRequire(path.join(process.cwd(), 'package.json'));
    function $node_autoinstall(name) {
        try {
            localRequire.resolve(name);
        }
        catch {
            this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', name], dir: '.' });
            try {
                this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', '@types/' + name], dir: '.' });
            }
            catch (e) {
                if (this.$mol_promise_like(e))
                    this.$mol_fail_hidden(e);
                this.$mol_fail_log(e);
            }
        }
    }
    $.$node_autoinstall = $node_autoinstall;
})($ || ($ = {}));

;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        if ($.$node_internal_check(name))
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        $.$node_autoinstall(name);
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

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

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

;
"use strict";

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
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
        [Symbol.dispose]() {
            this.destructor();
        }
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

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

;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));

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

;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
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
            this.data.length = end;
            if (end === this.sub_from)
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
                this.data[i].absorb(quant, this.data[i + 1]);
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

;
"use strict";

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
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
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
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            return null;
        },
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
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
    class Stack extends Array {
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

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
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
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
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
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

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
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
            this.plan_task = new $mol_after_tick(() => {
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
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
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
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
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
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
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
        async async_raw() {
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
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

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
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
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
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
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

;
"use strict";
var $;
(function ($) {
    function $mol_log3_area_lazy(event) {
        const self = this.$;
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
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
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

;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));

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
            return this.update($mol_maybe(value), ...path)[0];
        }
        update(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.flatMap((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.update(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(...this.struct(type, []).update(value, ...path.slice(1)));
                }
                return [this.clone(sub)];
            }
            else if (typeof type === 'number') {
                const ins = (this.kids[type] || this.list([]))
                    .update(value, ...path.slice(1));
                return [this.clone([
                        ...this.kids.slice(0, type),
                        ...ins,
                        ...this.kids.slice(type + 1),
                    ])];
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .flatMap(item => item.update(value, ...path.slice(1)));
                return [this.clone(kids)];
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
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
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
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
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
        if (json.toString !== Object.prototype.toString) {
            return $mol_tree2.data(json.toString(), [], span);
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

;
"use strict";
var $;
(function ($) {
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
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
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_run_error extends $mol_error_mix {
    }
    $.$mol_run_error = $mol_run_error;
    $.$mol_run_spawn = (...args) => $node['child_process'].spawn(...args);
    $.$mol_run_spawn_sync = (...args) => $node['child_process'].spawnSync(...args);
    class $mol_run extends $mol_object {
        static async_enabled() {
            return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC']);
        }
        static spawn(options) {
            const sync = !this.async_enabled() || !Boolean($mol_wire_auto());
            const env = options.env ?? this.$.$mol_env();
            return $mol_wire_sync(this).spawn_async({ ...options, sync, env });
        }
        static spawn_async({ dir, sync, timeout, command, env }) {
            const args_raw = typeof command === 'string' ? command.split(' ') : command;
            const [app, ...args] = args_raw;
            const opts = { shell: true, cwd: dir, env };
            const log_object = {
                place: `${this}.spawn()`,
                message: 'Run',
                command: args_raw.join(' '),
                dir: $node.path.relative('', dir),
            };
            if (sync) {
                this.$.$mol_log3_come({
                    hint: 'Run inside fiber',
                    ...log_object
                });
                let error;
                let res;
                try {
                    res = this.$.$mol_run_spawn_sync(app, args, opts);
                    error = res.error;
                }
                catch (err) {
                    error = err;
                }
                if (!res || error || res.status) {
                    throw new $mol_run_error(this.error_message(res), { ...log_object, status: res?.status, signal: res?.signal }, ...(error ? [error] : []));
                }
                return res;
            }
            let sub;
            try {
                sub = this.$.$mol_run_spawn(app, args, {
                    ...opts,
                    stdio: ['pipe', 'inherit', 'inherit'],
                });
            }
            catch (error) {
                throw new $mol_run_error(this.error_message(undefined), log_object, error);
            }
            const pid = sub.pid ?? 0;
            this.$.$mol_log3_come({
                ...log_object,
                pid,
            });
            let timeout_kill = false;
            let timer;
            const std_data = [];
            const error_data = [];
            const add = (std_chunk, error_chunk) => {
                if (std_chunk)
                    std_data.push(std_chunk);
                if (error_chunk)
                    error_data.push(error_chunk);
                if (!timeout)
                    return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM';
                    timeout_kill = true;
                    add();
                    sub.kill(signal);
                }, timeout);
            };
            add();
            sub.stdout?.on('data', data => add(data));
            sub.stderr?.on('data', data => add(undefined, data));
            const result_promise = new Promise((done, fail) => {
                const close = (error, status = null, signal = null) => {
                    if (!timer && timeout)
                        return;
                    clearTimeout(timer);
                    timer = undefined;
                    const res = {
                        pid,
                        signal,
                        get stdout() { return Buffer.concat(std_data); },
                        get stderr() { return Buffer.concat(error_data); }
                    };
                    if (error || status || timeout_kill)
                        return fail(new $mol_run_error(this.error_message(res) + (timeout_kill ? ', timeout' : ''), { ...log_object, pid, status, signal, timeout_kill }, ...error ? [error] : []));
                    this.$.$mol_log3_done({
                        ...log_object,
                        pid,
                    });
                    done(res);
                };
                sub.on('disconnect', () => close(new Error('Disconnected')));
                sub.on('error', err => close(err));
                sub.on('exit', (status, signal) => close(null, status, signal));
            });
            return Object.assign(result_promise, { destructor: () => {
                    clearTimeout(timer);
                    sub.kill('SIGKILL');
                } });
        }
        static error_message(res) {
            return res?.stderr.toString() || res?.stdout.toString() || 'Run error';
        }
    }
    $.$mol_run = $mol_run;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_attach(id, text) {
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        const elid = `$mol_style_attach:${id}`;
        let el = doc.getElementById(elid);
        if (!el) {
            el = doc.createElement('style');
            el.id = elid;
            doc.head.appendChild(el);
        }
        if (el.innerHTML != text)
            el.innerHTML = text;
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise extends Promise {
        done;
        fail;
        constructor(executor) {
            let done;
            let fail;
            super((d, f) => {
                done = d;
                fail = f;
                executor?.(d, f);
            });
            this.done = done;
            this.fail = fail;
        }
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_promise_blocker extends $mol_promise {
        static [Symbol.toStringTag] = '$mol_promise_blocker';
    }
    $.$mol_promise_blocker = $mol_promise_blocker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return `${value}%`; }
        static px(value) { return `${value}px`; }
        static mm(value) { return `${value}mm`; }
        static cm(value) { return `${value}cm`; }
        static Q(value) { return `${value}Q`; }
        static in(value) { return `${value}in`; }
        static pc(value) { return `${value}pc`; }
        static pt(value) { return `${value}pt`; }
        static cap(value) { return `${value}cap`; }
        static ch(value) { return `${value}ch`; }
        static em(value) { return `${value}em`; }
        static rem(value) { return `${value}rem`; }
        static ex(value) { return `${value}ex`; }
        static ic(value) { return `${value}ic`; }
        static lh(value) { return `${value}lh`; }
        static rlh(value) { return `${value}rlh`; }
        static vh(value) { return `${value}vh`; }
        static vw(value) { return `${value}vw`; }
        static vi(value) { return `${value}vi`; }
        static vb(value) { return `${value}vb`; }
        static vmin(value) { return `${value}vmin`; }
        static vmax(value) { return `${value}vmax`; }
        static deg(value) { return `${value}deg`; }
        static rad(value) { return `${value}rad`; }
        static grad(value) { return `${value}grad`; }
        static turn(value) { return `${value}turn`; }
        static s(value) { return `${value}s`; }
        static ms(value) { return `${value}ms`; }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static linear_gradient(value) {
            return new $mol_style_func('linear-gradient', value);
        }
        static radial_gradient(value) {
            return new $mol_style_func('radial-gradient', value);
        }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name, defaultValue) {
            return new $mol_style_func('var', defaultValue ? [name, defaultValue] : name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
        static linear(...breakpoints) {
            return new $mol_style_func("linear", breakpoints.map((e) => Array.isArray(e)
                ? String(e[0]) +
                    " " +
                    (typeof e[1] === "number" ? e[1] + "%" : e[1].toString())
                : String(e)));
        }
        static cubic_bezier(x1, y1, x2, y2) {
            return new $mol_style_func('cubic-bezier', [x1, y1, x2, y2]);
        }
        static steps(value, step_position) {
            return new $mol_style_func('steps', [value, step_position]);
        }
        static blur(value) {
            return new $mol_style_func('blur', value ?? "");
        }
        static brightness(value) {
            return new $mol_style_func('brightness', value ?? "");
        }
        static contrast(value) {
            return new $mol_style_func('contrast', value ?? "");
        }
        static drop_shadow(color, x_offset, y_offset, blur_radius) {
            return new $mol_style_func("drop-shadow", blur_radius
                ? [color, x_offset, y_offset, blur_radius]
                : [color, x_offset, y_offset]);
        }
        static grayscale(value) {
            return new $mol_style_func('grayscale', value ?? "");
        }
        static hue_rotate(value) {
            return new $mol_style_func('hue-rotate', value ?? "");
        }
        static invert(value) {
            return new $mol_style_func('invert', value ?? "");
        }
        static opacity(value) {
            return new $mol_style_func('opacity', value ?? "");
        }
        static sepia(value) {
            return new $mol_style_func('sepia', value ?? "");
        }
        static saturate(value) {
            return new $mol_style_func('saturate', value ?? "");
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_prop(prefix, keys) {
        const record = keys.reduce((rec, key) => {
            rec[key] = $mol_style_func.vary(`--${prefix}_${key}`);
            return rec;
        }, {});
        return record;
    }
    $.$mol_style_prop = $mol_style_prop;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_key_store = new WeakMap();
    const TypedArray = Object.getPrototypeOf(Uint8Array);
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
            if (value instanceof TypedArray)
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

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
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
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
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
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
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

;
"use strict";
var $;
(function ($) {
    $.$mol_mem = $mol_wire_solo;
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_arg extends $mol_object {
        prefix;
        static prolog = '';
        static separator = ' ';
        static href(next) {
            return next || process.argv.slice(2).join(' ');
        }
        static href_normal() {
            return this.link({});
        }
        static dict(next) {
            if (next !== void 0)
                this.href(this.make_link(next));
            var href = this.href();
            var chunks = href.split(' ');
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static value(key, next) {
            if (next === void 0)
                return this.dict()[key] ?? null;
            this.href(this.link({ [key]: next }));
            return next;
        }
        static link(next) {
            const params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make_link(params);
        }
        static make_link(next) {
            const chunks = [];
            for (const key in next) {
                if (next[key] !== null) {
                    chunks.push([key, next[key]].map(encodeURIComponent).join('='));
                }
            }
            return chunks.join(' ');
        }
        static go(next) {
            this.href(this.link(next));
        }
        static commit() { }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            const prefix = this.prefix;
            const dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    __decorate([
        $mol_action
    ], $mol_state_arg, "go", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));

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

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_persist = $mol_wire_solid;
})($ || ($ = {}));

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

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

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

;
"use strict";
var $;
(function ($) {
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12);
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) {
                buf[pos++] = code;
            }
            else if (code < 0x800) {
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) {
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else {
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let file_modes;
    (function (file_modes) {
        file_modes[file_modes["create"] = $node.fs.constants.O_CREAT] = "create";
        file_modes[file_modes["exists_truncate"] = $node.fs.constants.O_TRUNC] = "exists_truncate";
        file_modes[file_modes["exists_fail"] = $node.fs.constants.O_EXCL] = "exists_fail";
        file_modes[file_modes["read_only"] = $node.fs.constants.O_RDONLY] = "read_only";
        file_modes[file_modes["write_only"] = $node.fs.constants.O_WRONLY] = "write_only";
        file_modes[file_modes["read_write"] = $node.fs.constants.O_RDWR] = "read_write";
        file_modes[file_modes["append"] = $node.fs.constants.O_APPEND] = "append";
    })(file_modes || (file_modes = {}));
    function mode_mask(modes) {
        return modes.reduce((res, mode) => res | file_modes[mode], 0);
    }
    class $mol_file_transaction_node extends $mol_file_transaction {
        descr() {
            $mol_wire_solid();
            return $node.fs.openSync(this.path(), mode_mask(this.modes()));
        }
        write({ buffer, offset = 0, length, position = null }) {
            if (Array.isArray(buffer)) {
                return $node.fs.writevSync(this.descr(), buffer, position ?? undefined);
            }
            if (typeof buffer === 'string') {
                return $node.fs.writeSync(this.descr(), buffer, position);
            }
            length = length ?? buffer.byteLength;
            return $node.fs.writeSync(this.descr(), buffer, offset, length, position);
        }
        truncate(size) {
            $node.fs.ftruncateSync(this.descr());
        }
        read() {
            return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()));
        }
        flush() {
            $node.fs.fsyncSync(this.descr());
        }
        close() {
            $node.fs.closeSync(this.descr());
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_transaction_node.prototype, "descr", null);
    $.$mol_file_transaction_node = $mol_file_transaction_node;
    $.$mol_file_transaction = $mol_file_transaction_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            if (!this.root()) {
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            this.changed.add(file);
            if (!this.watching)
                return;
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        static watch_debounce() { return 500; }
        static flush() {
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            this.flush();
            this.watching = false;
            this.changed.add(this.absolute(path));
        }
        static unwatched(side_effect, affected_dir) {
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        buffer(next) {
            let readed = new Uint8Array();
            if (next === undefined) {
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        watcher() {
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function $mol_file_node_buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    $.$mol_file_node_buffer_normalize = $mol_file_node_buffer_normalize;
    class $mol_file_node extends $mol_file {
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher(reset) {
            const path = this.path();
            const root = this.root();
            if (!root && !this.exists())
                return super.watcher();
            let watcher;
            try {
                watcher = $node.fs.watch(path);
            }
            catch (error) {
                if (!(error instanceof Error))
                    error = new Error('Unknown watch error', { cause: error });
                error.message += '\n' + path;
                if (root || error.code !== 'ENOENT') {
                    this.$.$mol_fail_log(error);
                }
                return super.watcher();
            }
            watcher.on('change', (type, name) => {
                if (!name)
                    return;
                const path = $node.path.join(this.path(), name.toString());
                this.constructor.changed_add(type, path);
            });
            watcher.on('error', e => this.$.$mol_fail_log(e));
            let destructed = false;
            watcher.on('close', () => {
                if (!destructed)
                    setTimeout(() => $mol_wire_async(this).watcher(null), 500);
            });
            return {
                destructor() {
                    destructed = true;
                    watcher.close();
                }
            };
        }
        info(path) {
            try {
                return stat_convert($node.fs.statSync(path));
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    if (error.code === 'ENOENT')
                        return null;
                    error.message += '\n' + path;
                    this.$.$mol_fail_hidden(error);
                }
            }
            return null;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path, { recursive: true });
                return null;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'EEXIST')
                        return null;
                    e.message += '\n' + path;
                    this.$.$mol_fail_hidden(e);
                }
            }
        }
        copy(to) {
            $node.fs.copyFileSync(this.path(), to);
        }
        drop() {
            $node.fs.unlinkSync(this.path());
        }
        read() {
            const path = this.path();
            try {
                return $mol_file_node_buffer_normalize($node.fs.readFileSync(path));
            }
            catch (error) {
                if (!$mol_promise_like(error)) {
                    error.message += '\n' + path;
                }
                $mol_fail_hidden(error);
            }
        }
        write(buffer) {
            const path = this.path();
            try {
                $node.fs.writeFileSync(path, buffer);
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    error.message += '\n' + path;
                }
                return this.$.$mol_fail_hidden(error);
            }
        }
        kids() {
            const path = this.path();
            try {
                const kids = $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
                return kids;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'ENOENT')
                        return [];
                    e.message += '\n' + path;
                }
                $mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor
                .relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        readable(opts) {
            const { Readable } = $node['node:stream'];
            const stream = $node.fs.createReadStream(this.path(), {
                flags: 'r',
                autoClose: true,
                start: opts?.start,
                end: opts?.end,
                encoding: 'binary',
            });
            return Readable.toWeb(stream);
        }
        writable(opts) {
            const { Writable } = $node['node:stream'];
            const stream = $node.fs.createWriteStream(this.path(), {
                flags: 'w+',
                autoClose: true,
                start: opts?.start,
                encoding: 'binary',
            });
            return Writable.toWeb(stream);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "info", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "copy", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "drop", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "read", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "write", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node.prototype, "readable", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "writable", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local_node extends $mol_state_local {
        static dir() {
            const base = process.env.XDG_DATA_HOME || ($node.os.homedir() + '/.local/share');
            return $mol_file.absolute(base).resolve('./mol_state_local');
        }
        static value(key, next) {
            const file = this.dir().resolve(encodeURIComponent(key) + '.json');
            if (next === null) {
                file.exists(false);
                return null;
            }
            const arg = next === undefined ? undefined : JSON.stringify(next);
            return JSON.parse(file.text(arg) || 'null');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local_node, "dir", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local_node, "value", null);
    $.$mol_state_local_node = $mol_state_local_node;
    $.$mol_state_local = $mol_state_local_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function parse(theme) {
        if (theme === 'true')
            return true;
        if (theme === 'false')
            return false;
        return null;
    }
    function $mol_lights(next) {
        const arg = parse(this.$mol_state_arg.value('mol_lights'));
        const base = this.$mol_media.match('(prefers-color-scheme: light)');
        if (next === undefined) {
            return arg ?? this.$mol_state_local.value('$mol_lights') ?? base;
        }
        else {
            if (arg === null) {
                this.$mol_state_local.value('$mol_lights', next === base ? null : next);
            }
            else {
                this.$mol_state_arg.value('mol_lights', String(next));
            }
            return next;
        }
    }
    $.$mol_lights = $mol_lights;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_theme = $mol_style_prop('mol_theme', [
        'back',
        'hover',
        'card',
        'current',
        'special',
        'text',
        'control',
        'shade',
        'line',
        'focus',
        'field',
        'image',
        'spirit',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\n:where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$mol_theme_dark\"], :where([mol_theme=\"$mol_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$mol_theme_light\"], :where([mol_theme=\"$mol_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n} }\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$mol_theme_dark\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$mol_theme_light\"] ) [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach('$mol_theme_lights', `:root { --mol_theme_back: oklch( ${$$.$mol_lights() ? 92 : 20}% .01 var(--mol_theme_hue) ) }`);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_gap = $mol_style_prop('mol_gap', [
        'page',
        'block',
        'text',
        'round',
        'space',
        'blur',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_page: 3rem;\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[String(Elem)] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[String(Elem)] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                if (typeof node[key] === 'string')
                    node[key] = props[key];
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element?.shadowRoot) {
                element = element.shadowRoot.activeElement;
            }
            while (element) {
                parents.push(element);
                const parent = element.parentNode;
                if (parent instanceof ShadowRoot)
                    element = parent.host;
                else
                    element = parent;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr = Reflect.getOwnPropertyDescriptor(obj, name)) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (next) {
                if (next === undefined && store.has(this))
                    return store.get(this);
                const val = task.call(this, next) ?? next;
                store.set(this, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is required for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === undefined) {
                continue;
            }
            else if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events, passive = false) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_error_message(error) {
        return String((error instanceof Error ? error.message : null) || error) || 'Unknown';
    }
    $.$mol_error_message = $mol_error_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
            if (typeof val === 'number') {
                style.setProperty(kebab(name), `${val}px`);
            }
            else {
                style.setProperty(kebab(name), val);
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (val === el[key])
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform, scale, translate, rotate;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n}\t\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: system-ui, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\t/* background: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text); */\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n\toverscroll-behavior: contain; /** Disable navigation gestures **/\n}\n\n@media print {\n\t[mol_view_root] {\n\t\theight: auto;\n\t}\n}\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"], [mol_view_error=\"$mol_promise_blocker\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n@keyframes mol_view_wait {\n\tfrom {\n\t\topacity: .25;\n\t}\n\t20% {\n\t\topacity: .75;\n\t}\n\tto {\n\t\topacity: .25;\n\t}\n}\n\n:where([mol_view][mol_view_error=\"$mol_promise_blocker\"]),\n:where([mol_view][mol_view_error=\"Promise\"]) {\n\tbackground: var(--mol_theme_hover);\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        static roots() {
            return [...$mol_dom.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])')].map((node, index) => {
                const name = node.getAttribute('mol_view_root');
                const View = this.$[name];
                if (!View) {
                    $mol_fail_log(new Error(`Autobind unknown view class`, { cause: { name } }));
                    return null;
                }
                const view = View.Root(index);
                view.dom_node(node);
                return view;
            }).filter($mol_guard_defined);
        }
        static auto() {
            const roots = this.roots();
            if (!roots.length)
                return;
            for (const root of roots) {
                try {
                    root.dom_tree();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
            }
            try {
                document.title = roots[0].title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            descr: try {
                const descr = roots[0].hint();
                if (!descr)
                    break descr;
                const head = $mol_dom.document.head;
                let node = head.querySelector('meta[name="description"]');
                if (node)
                    node.content = descr;
                else
                    head.append($mol_jsx("meta", { name: "description", content: descr }));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        title() {
            return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
        }
        hint() {
            return '';
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return [];
        }
        sub_visible() {
            return this.sub();
        }
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null;
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom };
            }
        }
        dom_id() {
            return this.toString().replace(/</g, '(').replace(/>/g, ')').replaceAll(/"/g, "'");
        }
        dom_node_external(next) {
            const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            return node;
        }
        dom_node(next) {
            $mol_wire_solid();
            const node = this.dom_node_external(next);
            $mol_dom_render_attributes(node, this.attr_static());
            const events = this.event_async();
            $mol_dom_render_events(node, events);
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                const mol_view_error = $mol_promise_like(error)
                    ? error.constructor[Symbol.toStringTag] ?? 'Promise'
                    : error.name || error.constructor.name;
                $mol_dom_render_attributes(node, { mol_view_error });
                if ($mol_promise_like(error))
                    break render;
                try {
                    ;
                    node.innerText = this.$.$mol_error_message(error).replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            const attr = this.attr();
            const style = this.style();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return [];
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                if (current.constructor.name !== classes.at(-1)?.name) {
                    classes.push(current.constructor);
                }
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        static _view_names;
        static view_names(suffix) {
            let cache = Reflect.getOwnPropertyDescriptor(this, '_view_names')?.value;
            if (!cache)
                cache = this._view_names = new Map;
            const cached = cache.get(suffix);
            if (cached)
                return cached;
            const names = [];
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            for (const Class of this.view_classes()) {
                if (suffix in Class.prototype)
                    names.push(this.$.$mol_func_name(Class) + suffix2);
                else
                    break;
            }
            cache.set(suffix, names);
            return names;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (!(owner?.host instanceof $mol_view))
                return names;
            const suffix = owner.task.name.trim();
            const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
            names.push(...owner.host.constructor.view_names(suffix));
            for (let prefix of owner.host.view_names_owned()) {
                names.push(prefix + suffix2);
            }
            return names;
        }
        view_names() {
            const names = new Set();
            for (let name of this.view_names_owned())
                names.add(name);
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (name)
                    names.add(name);
            }
            return names;
        }
        theme(next) {
            return next;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                mol_theme: this.theme(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return { ...$mol_wire_async(this.event()) };
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        *view_find(check, path = []) {
            if (path.length === 0 && check(this))
                return yield [this];
            try {
                const checked = new Set();
                const sub = this.sub();
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (!check(item))
                        continue;
                    checked.add(item);
                    yield [...path, this, item];
                }
                for (const item of sub) {
                    if (!(item instanceof $mol_view))
                        continue;
                    if (checked.has(item))
                        continue;
                    yield* item.view_find(check, [...path, this]);
                }
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            try {
                this.dom_final();
            }
            finally {
                view.dom_node().scrollIntoView({ block: align });
            }
        }
        bring() {
            const win = this.$.$mol_dom_context;
            if (win.parent !== win.self && !win.document.hasFocus())
                return;
            new this.$.$mol_after_timeout(0, () => {
                this.focused(true);
            });
        }
        destructor() {
            const node = $mol_wire_probe(() => this.dom_node());
            if (!node)
                return;
            const events = $mol_wire_probe(() => this.event_async());
            if (!events)
                return;
            for (let event_name in events) {
                node.removeEventListener(event_name, events[event_name]);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_id", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "event_async", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "roots", null);
    __decorate([
        $mol_mem
    ], $mol_view, "auto", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_plugin extends $mol_view {
        dom_node_external(next) {
            return next ?? $mol_owning_get(this).host.dom_node();
        }
        render() {
            this.dom_node_actual();
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));

;
	($.$mol_scroll) = class $mol_scroll extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		event_scroll(next){
			if(next !== undefined) return next;
			return null;
		}
		scroll_top(next){
			if(next !== undefined) return next;
			return 0;
		}
		scroll_left(next){
			if(next !== undefined) return next;
			return 0;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		event(){
			return {...(super.event()), "scroll": (next) => (this.event_scroll(next))};
		}
	};
	($mol_mem(($.$mol_scroll.prototype), "event_scroll"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_top"));
	($mol_mem(($.$mol_scroll.prototype), "scroll_left"));


;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^(--)?[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix of Object.keys(val).reverse()) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type of Object.keys(types).reverse()) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name of Object.keys(attrs).reverse()) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media') {
                    const media = config[key];
                    for (let query of Object.keys(media).reverse()) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else if (key === '@starting-style') {
                    const styles = config[key];
                    rules.push('}\n');
                    make_class(prefix, path, styles);
                    rules.push(`${key} {\n`);
                }
                else if (key[0] === '[' && key[key.length - 1] === ']') {
                    const attr = key.slice(1, -1);
                    const vals = config[key];
                    for (let val of Object.keys(vals).reverse()) {
                        make_class(selector(prefix, path) + ':where([' + attr + '=' + JSON.stringify(val) + '])', [], vals[val]);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            display: 'grid',
            overflow: 'auto',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
            },
            outline: 'none',
            align: {
                self: 'stretch',
                items: 'flex-start',
            },
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    gridArea: '1/1',
                },
            },
            '::before': {
                display: 'none',
            },
            '::after': {
                display: 'none',
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            '@media': {
                'print': {
                    overflow: 'hidden',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_book2) = class $mol_book2 extends ($.$mol_scroll) {
		pages_deep(){
			return [];
		}
		pages(){
			return (this.pages_deep());
		}
		Placeholder(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		placeholders(){
			return [(this.Placeholder())];
		}
		menu_title(){
			return "";
		}
		sub(){
			return [...(this.pages()), ...(this.placeholders())];
		}
		minimal_width(){
			return 0;
		}
		Gap(id){
			const obj = new this.$.$mol_view();
			(obj.title) = () => ("");
			return obj;
		}
	};
	($mol_mem(($.$mol_book2.prototype), "Placeholder"));
	($mol_mem_key(($.$mol_book2.prototype), "Gap"));


;
"use strict";
var $;
(function ($) {
    $.$mol_layer = $mol_style_prop('mol_layer', [
        'hover',
        'focus',
        'speck',
        'float',
        'popup',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/layer/layer.css", ":root {\n\t--mol_layer_hover: 1;\n\t--mol_layer_focus: 2;\n\t--mol_layer_speck: 3;\n\t--mol_layer_float: 4;\n\t--mol_layer_popup: 5;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_book2 extends $.$mol_book2 {
            pages_deep() {
                let result = [];
                for (const subpage of this.pages()) {
                    if (subpage instanceof $mol_book2)
                        result = [...result, ...subpage.pages_deep()];
                    else
                        result.push(subpage);
                }
                return result;
            }
            title() {
                return this.pages_deep().map(page => {
                    try {
                        return page?.title();
                    }
                    catch (error) {
                        $mol_fail_log(error);
                    }
                }).reverse().filter(Boolean).join(' | ');
            }
            menu_title() {
                return this.pages_deep()[0]?.title() || this.title();
            }
            sub() {
                const placeholders = this.placeholders();
                const next = this.pages_deep().filter(Boolean);
                const prev = $mol_mem_cached(() => this.sub())?.filter(page => !placeholders.includes(page)) ?? [];
                for (let i = 1; i; ++i) {
                    const p = prev[prev.length - i];
                    const n = next[next.length - i];
                    if (!n)
                        break;
                    if (p === n)
                        continue;
                    new this.$.$mol_after_tick(() => {
                        const b = this.dom_node();
                        const p = n.dom_node();
                        b.scroll({
                            left: p.offsetLeft + p.offsetWidth - b.offsetWidth,
                            behavior: 'smooth',
                        });
                    });
                    break;
                }
                return [...next, ...placeholders];
            }
            bring() {
                const pages = this.pages_deep();
                if (pages.length)
                    pages[pages.length - 1].bring();
                else
                    super.bring();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "pages_deep", null);
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "sub", null);
        $$.$mol_book2 = $mol_book2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/book2/book2.view.css", "[mol_book2] {\n\tdisplay: flex;\n\tflex-flow: row nowrap;\n\talign-items: stretch;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n\t/* transform: translateZ(0); */\n\ttransition: none;\n\tscroll-snap-type: x mandatory;\n\t/* padding: 0 1px;\n\tscroll-padding: 0 1px;\n\tgap: 1px; */\n}\n\n[mol_book2] > * {\n/* \tflex: none; */\n\tscroll-snap-stop: always;\n\tscroll-snap-align: end;\n\tposition: relative;\n\tmin-height: 100%;\n\tmax-height: 100%;\n\tmax-width: 100%;\n\tflex-shrink: 0;\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_field);\n}\n\n[mol_book2] > *:not(:first-of-type):before,\n[mol_book2] > *:not(:last-of-type)::after {\n\tcontent: '';\n\tposition: absolute;\n\ttop: 1.5rem;\n\twidth: 3px;\n\theight: 1rem;\n\tbackground: linear-gradient(\n\t\tto bottom,\n\t\tvar(--mol_theme_special) 0%,\n\t\tvar(--mol_theme_special) 14%,\n\t\ttransparent 15%,\n\t\ttransparent 42%,\n\t\tvar(--mol_theme_special) 43%,\n\t\tvar(--mol_theme_special) 57%,\n\t\ttransparent 58%,\n\t\ttransparent 85%,\n\t\tvar(--mol_theme_special) 86%,\n\t\tvar(--mol_theme_special) 100%\n\t);\n\topacity: .5;\n\tz-index: var(--mol_layer_speck);\n}\n[mol_book2] > *:not(:first-of-type):before {\n\tleft: -3px;\n}\n[mol_book2] > *:not(:last-of-type)::after {\n\tright: -3px;\n}\n\n:where([mol_book2]) > * {\n\tbackground-color: var(--mol_theme_card);\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_back); */\n}\n\n[mol_book2] > [mol_book2] {\n\tdisplay: contents;\n}\n\n[mol_book2] > *:first-child {\n\tscroll-snap-align: start;\n}\n\n[mol_book2] > [mol_view] {\n\ttransform: none; /* prevent content clipping */\n}\n\n[mol_book2_placeholder] {\n\tflex: 1 1 0;\n\tbackground: none;\n}\n\n[mol_book2_gap] {\n\tbackground: none;\n\tflex-grow: 1;\n\tscroll-snap-align: none;\n\tmargin-right: -1px;\n\tbox-shadow: none;\n}\n\n[mol_book2_gap]::before,\n[mol_book2_gap]::after {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_theme_auto) = class $mol_theme_auto extends ($.$mol_plugin) {
		dark(){
			return "$mol_theme_dark";
		}
		theme(){
			return (this.dark());
		}
		light(){
			return "$mol_theme_light";
		}
		attr(){
			return {"mol_theme": (this.theme())};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_theme_auto extends $.$mol_theme_auto {
            theme() {
                return this.$.$mol_lights() ? this.light() : this.dark();
            }
        }
        $$.$mol_theme_auto = $mol_theme_auto;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_hotkey) = class $mol_hotkey extends ($.$mol_plugin) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		key(){
			return {};
		}
		mod_ctrl(){
			return false;
		}
		mod_alt(){
			return false;
		}
		mod_shift(){
			return false;
		}
	};
	($mol_mem(($.$mol_hotkey.prototype), "keydown"));


;
"use strict";
var $;
(function ($) {
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_hotkey extends $.$mol_hotkey {
            key() {
                return super.key();
            }
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                if (this.mod_ctrl() !== (event.ctrlKey || event.metaKey))
                    return;
                if (this.mod_alt() !== event.altKey)
                    return;
                if (this.mod_shift() !== event.shiftKey)
                    return;
                const handle = this.key()[name];
                if (handle)
                    handle(event);
            }
        }
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
	($.$mol_page) = class $mol_page extends ($.$mol_view) {
		tabindex(){
			return -1;
		}
		Logo(){
			return null;
		}
		title_content(){
			return [(this.Logo()), (this.title())];
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("h1");
			(obj.sub) = () => ((this.title_content()));
			return obj;
		}
		tools(){
			return [];
		}
		Tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.tools()));
			return obj;
		}
		head(){
			return [(this.Title()), (this.Tools())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (64);
			(obj.dom_name) = () => ("header");
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		body_scroll_top(next){
			return (this.Body().scroll_top(next));
		}
		body(){
			return [];
		}
		Body_content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		body_content(){
			return [(this.Body_content())];
		}
		Body(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ((this.body_content()));
			return obj;
		}
		foot(){
			return [];
		}
		Foot(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("footer");
			(obj.sub) = () => ((this.foot()));
			return obj;
		}
		dom_name(){
			return "article";
		}
		attr(){
			return {...(super.attr()), "tabIndex": (this.tabindex())};
		}
		sub(){
			return [
				(this.Head()), 
				(this.Body()), 
				(this.Foot())
			];
		}
	};
	($mol_mem(($.$mol_page.prototype), "Title"));
	($mol_mem(($.$mol_page.prototype), "Tools"));
	($mol_mem(($.$mol_page.prototype), "Head"));
	($mol_mem(($.$mol_page.prototype), "Body_content"));
	($mol_mem(($.$mol_page.prototype), "Body"));
	($mol_mem(($.$mol_page.prototype), "Foot"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem } = $mol_style_unit;
        const { hsla, blur } = $mol_style_func;
        $mol_style_define($mol_page, {
            display: 'flex',
            flex: {
                basis: 'auto',
                direction: 'column',
            },
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: per(100),
            maxHeight: per(100),
            boxSizing: 'border-box',
            color: $mol_theme.text,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 'none',
                position: 'relative',
                margin: 0,
                minHeight: rem(4),
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 2,
                '@media': {
                    'print': {
                        box: {
                            shadow: [[0, `1px`, 0, 0, hsla(0, 0, 0, .25)]],
                        },
                    },
                },
            },
            Title: {
                minHeight: rem(2),
                margin: 0,
                padding: $mol_gap.text,
                gap: $mol_gap.text,
                wordBreak: 'normal',
                textShadow: '0 0',
                font: {
                    size: 'inherit',
                    weight: 'normal',
                },
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
            Tools: {
                flex: {
                    basis: 'auto',
                    grow: 0,
                    shrink: 1,
                },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                '@media': {
                    'print': {
                        display: 'none',
                    },
                },
            },
            Body: {
                flex: {
                    grow: 1000,
                    shrink: 1,
                    basis: per(100),
                },
            },
            Body_content: {
                padding: $mol_gap.block,
                minHeight: 0,
                minWidth: 0,
                flex: {
                    direction: 'column',
                    shrink: 1,
                    grow: 1,
                },
                justify: {
                    self: 'stretch',
                },
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: 'none',
                margin: 0,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                box: {
                    shadow: [
                        [0, `-0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                        [0, `0.5rem`, `0.5rem`, `-0.5rem`, hsla(0, 0, 0, .25)],
                    ],
                },
                zIndex: 1,
                padding: $mol_gap.block,
                ':empty': {
                    display: 'none',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_ghost) = class $mol_ghost extends ($.$mol_view) {
		Sub(){
			const obj = new this.$.$mol_view();
			return obj;
		}
	};
	($mol_mem(($.$mol_ghost.prototype), "Sub"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_ghost extends $.$mol_ghost {
            dom_node_external(next) {
                return this.Sub().dom_node(next);
            }
            dom_node_actual() {
                this.dom_node();
                const node = this.Sub().dom_node_actual();
                const attr = this.attr();
                const style = this.style();
                const fields = this.field();
                $mol_dom_render_attributes(node, attr);
                $mol_dom_render_styles(node, style);
                $mol_dom_render_fields(node, fields);
                return node;
            }
            dom_tree() {
                const Sub = this.Sub();
                const node = Sub.dom_tree();
                try {
                    this.dom_node_actual();
                    this.auto();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                return node;
            }
            title() {
                return this.Sub().title();
            }
            minimal_width() {
                return this.Sub().minimal_width();
            }
            minimal_height() {
                return this.Sub().minimal_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_ghost.prototype, "dom_node_actual", null);
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_follower) = class $mol_follower extends ($.$mol_ghost) {
		transform(){
			return "";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		align(){
			return [-.5, -.5];
		}
		offset(){
			return [0, 0];
		}
		style(){
			return {...(super.style()), "transform": (this.transform())};
		}
	};
	($mol_mem(($.$mol_follower.prototype), "Anchor"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_follower extends $.$mol_follower {
            pos() {
                const self_rect = this.view_rect();
                const prev = $mol_wire_probe(() => this.pos());
                const anchor_rect = this.Anchor()?.view_rect();
                if (!anchor_rect)
                    return null;
                const offset = this.offset();
                const align = this.align();
                const left = Math.floor((prev?.left ?? 0)
                    - (self_rect?.left ?? 0)
                    + (self_rect?.width ?? 0) * align[0]
                    + (anchor_rect?.left ?? 0)
                    + offset[0] * (anchor_rect?.width ?? 0));
                const top = Math.floor((prev?.top ?? 0)
                    - (self_rect?.top ?? 0)
                    + (self_rect?.height ?? 0) * align[1]
                    + (anchor_rect?.top ?? 0)
                    + offset[1] * (anchor_rect?.height ?? 0));
                return { left, top };
            }
            transform() {
                const pos = this.pos();
                if (!pos)
                    return 'scale(0)';
                const { left, top } = pos;
                return `translate( ${left}px, ${top}px )`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "pos", null);
        __decorate([
            $mol_mem
        ], $mol_follower.prototype, "transform", null);
        $$.$mol_follower = $mol_follower;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/follower/follower.view.css", "[mol_follower] {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\ttransition: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_pop) = class $mol_pop extends ($.$mol_view) {
		bubble(){
			return null;
		}
		Anchor(){
			return null;
		}
		bubble_offset(){
			return [0, 1];
		}
		bubble_align(){
			return [0, 0];
		}
		bubble_content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		Bubble(){
			const obj = new this.$.$mol_pop_bubble();
			(obj.content) = () => ((this.bubble_content()));
			(obj.height_max) = () => ((this.height_max()));
			return obj;
		}
		Follower(){
			const obj = new this.$.$mol_follower();
			(obj.offset) = () => ((this.bubble_offset()));
			(obj.align) = () => ((this.bubble_align()));
			(obj.Anchor) = () => ((this.Anchor()));
			(obj.Sub) = () => ((this.Bubble()));
			return obj;
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		align_vert(){
			return "";
		}
		align_hor(){
			return "";
		}
		align(){
			return "bottom_center";
		}
		prefer(){
			return "vert";
		}
		auto(){
			return [(this.bubble())];
		}
		sub(){
			return [(this.Anchor())];
		}
		sub_visible(){
			return [(this.Anchor()), (this.Follower())];
		}
	};
	($mol_mem(($.$mol_pop.prototype), "Bubble"));
	($mol_mem(($.$mol_pop.prototype), "Follower"));
	($mol_mem(($.$mol_pop.prototype), "showed"));
	($.$mol_pop_bubble) = class $mol_pop_bubble extends ($.$mol_view) {
		content(){
			return [];
		}
		height_max(){
			return 9999;
		}
		sub(){
			return (this.content());
		}
		style(){
			return {...(super.style()), "maxHeight": (this.height_max())};
		}
		attr(){
			return {
				...(super.attr()), 
				"tabindex": 0, 
				"popover": "manual"
			};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_pop extends $.$mol_pop {
            showed(next = false) {
                this.focused();
                return next;
            }
            sub_visible() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Follower()] : [],
                ];
            }
            height_max() {
                const viewport = this.$.$mol_window.size();
                const rect_bubble = this.view_rect();
                const align = this.align_vert();
                if (align === 'bottom')
                    return (viewport.height - rect_bubble.bottom);
                if (align === 'top')
                    return rect_bubble.top;
                return 0;
            }
            align() {
                switch (this.prefer()) {
                    case 'hor': return `${this.align_hor()}_${this.align_vert()}`;
                    case 'vert': return `${this.align_vert()}_${this.align_hor()}`;
                    default: return this.prefer();
                }
            }
            align_vert() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.top > viewport.height / 2 ? 'top' : 'bottom';
            }
            align_hor() {
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                const viewport = this.$.$mol_window.size();
                return rect_pop.left > viewport.width / 2 ? 'left' : 'right';
            }
            bubble_offset() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [0, 0];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                if ([...tags][0] === hor) {
                    return [
                        { left: 0, center: .5, right: 1 }[hor],
                        { top: 1, center: .5, bottom: 0 }[vert],
                    ];
                }
                else {
                    return [
                        { left: 1, center: .5, right: 0 }[hor],
                        { top: 0, center: .5, bottom: 1 }[vert],
                    ];
                }
            }
            bubble_align() {
                const tags = new Set(this.align().split('_'));
                if (tags.has('suspense'))
                    return [-.5, -.5];
                const hor = tags.has('right') ? 'right' : tags.has('left') ? 'left' : 'center';
                const vert = tags.has('bottom') ? 'bottom' : tags.has('top') ? 'top' : 'center';
                return [
                    { left: -1, center: -.5, right: 0, suspense: -.5 }[hor],
                    { top: -1, center: -.5, bottom: 0, suspense: -.5 }[vert],
                ];
            }
            bubble() {
                if (!this.showed())
                    return;
                this.Bubble().dom_node().showPopover?.();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "height_max", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_vert", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_hor", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_offset", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble_align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "bubble", null);
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/pop.view.css", "@keyframes mol_pop_show {\n\tfrom {\n\t\topacity: 0;\n\t}\n}\n\n[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop_bubble] {\n\tborder: none;\n\tpadding: 0;\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: 0 0 1rem hsla(0,0%,0%,.5);\n\tborder-radius: var(--mol_gap_round);\n\tposition: fixed;\n\tz-index: var(--mol_layer_popup);\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\t/* overflow: hidden;\n\toverflow-y: scroll;\n\toverflow-y: overlay; */\n\tword-break: normal;\n\twidth: max-content;\n\t/* height: max-content; */\n\tflex-direction: column;\n\tmax-width: calc( 100vw - var(--mol_gap_page) );\n\tmax-height: 80vw;\n\tcontain: paint;\n\ttransition-property: opacity;\n\t/* Safari ios layer fix, https://t.me/mam_mol/170017 */\n\ttransform: translateZ(0);\n\tanimation: mol_pop_show .1s ease-in;\n}\n\n:where( [mol_pop_bubble] > * ) {\n\tbackground: var(--mol_theme_card);\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_nav) = class $mol_nav extends ($.$mol_plugin) {
		event_key(next){
			if(next !== undefined) return next;
			return null;
		}
		cycle(next){
			if(next !== undefined) return next;
			return false;
		}
		mod_ctrl(){
			return false;
		}
		mod_shift(){
			return false;
		}
		mod_alt(){
			return false;
		}
		keys_x(next){
			if(next !== undefined) return next;
			return [];
		}
		keys_y(next){
			if(next !== undefined) return next;
			return [];
		}
		current_x(next){
			if(next !== undefined) return next;
			return null;
		}
		current_y(next){
			if(next !== undefined) return next;
			return null;
		}
		event_up(next){
			if(next !== undefined) return next;
			return null;
		}
		event_down(next){
			if(next !== undefined) return next;
			return null;
		}
		event_left(next){
			if(next !== undefined) return next;
			return null;
		}
		event_right(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.event_key(next))};
		}
	};
	($mol_mem(($.$mol_nav.prototype), "event_key"));
	($mol_mem(($.$mol_nav.prototype), "cycle"));
	($mol_mem(($.$mol_nav.prototype), "keys_x"));
	($mol_mem(($.$mol_nav.prototype), "keys_y"));
	($mol_mem(($.$mol_nav.prototype), "current_x"));
	($mol_mem(($.$mol_nav.prototype), "current_y"));
	($mol_mem(($.$mol_nav.prototype), "event_up"));
	($mol_mem(($.$mol_nav.prototype), "event_down"));
	($mol_mem(($.$mol_nav.prototype), "event_left"));
	($mol_mem(($.$mol_nav.prototype), "event_right"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (!event)
                    return event;
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $mol_keyboard_code.up: return this.event_up(event);
                    case $mol_keyboard_code.down: return this.event_down(event);
                    case $mol_keyboard_code.left: return this.event_left(event);
                    case $mol_keyboard_code.right: return this.event_right(event);
                    case $mol_keyboard_code.pageUp: return this.event_up(event);
                    case $mol_keyboard_code.pageDown: return this.event_down(event);
                }
            }
            event_up(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_string) = class $mol_string extends ($.$mol_view) {
		selection_watcher(){
			return null;
		}
		error_report(){
			return null;
		}
		disabled(){
			return false;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.value(next));
		}
		hint(){
			return "";
		}
		hint_visible(){
			return (this.hint());
		}
		spellcheck(){
			return true;
		}
		autocomplete_native(){
			return "";
		}
		selection_end(){
			return 0;
		}
		selection_start(){
			return 0;
		}
		keyboard(){
			return "text";
		}
		enter(){
			return "go";
		}
		length_max(){
			return +Infinity;
		}
		type(next){
			if(next !== undefined) return next;
			return "text";
		}
		event_change(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return false;
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_hotkey();
			(obj.mod_ctrl) = () => ((this.submit_with_ctrl()));
			(obj.key) = () => ({"enter": (next) => (this.submit(next))});
			return obj;
		}
		dom_name(){
			return "input";
		}
		enabled(){
			return true;
		}
		minimal_height(){
			return 40;
		}
		autocomplete(){
			return false;
		}
		selection(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		auto(){
			return [(this.selection_watcher()), (this.error_report())];
		}
		field(){
			return {
				...(super.field()), 
				"disabled": (this.disabled()), 
				"value": (this.value_changed()), 
				"placeholder": (this.hint_visible()), 
				"spellcheck": (this.spellcheck()), 
				"autocomplete": (this.autocomplete_native()), 
				"selectionEnd": (this.selection_end()), 
				"selectionStart": (this.selection_start()), 
				"inputMode": (this.keyboard()), 
				"enterkeyhint": (this.enter())
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"maxlength": (this.length_max()), 
				"type": (this.type())
			};
		}
		event(){
			return {...(super.event()), "input": (next) => (this.event_change(next))};
		}
		plugins(){
			return [(this.Submit())];
		}
	};
	($mol_mem(($.$mol_string.prototype), "value"));
	($mol_mem(($.$mol_string.prototype), "type"));
	($mol_mem(($.$mol_string.prototype), "event_change"));
	($mol_mem(($.$mol_string.prototype), "submit"));
	($mol_mem(($.$mol_string.prototype), "Submit"));
	($mol_mem(($.$mol_string.prototype), "selection"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                const el = this.dom_node();
                const from = el.selectionStart;
                const to = el.selectionEnd;
                try {
                    el.value = this.value_changed(el.value);
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                    $mol_fail_hidden(error);
                }
                if (to === null)
                    return;
                el.selectionEnd = to;
                el.selectionStart = from;
                this.selection_change(next);
            }
            error_report() {
                try {
                    if (this.focused())
                        this.value();
                }
                catch (error) {
                    const el = this.dom_node();
                    if (error instanceof Error) {
                        el.setCustomValidity(error.message);
                        el.reportValidity();
                    }
                }
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
                if (to !== from && el.selectionEnd === el.selectionStart) {
                    el.selectionEnd = to;
                }
            }
            selection_start() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionStart == null)
                    return undefined;
                return this.selection()[0];
            }
            selection_end() {
                const el = this.dom_node();
                if (!this.focused())
                    return undefined;
                if (el.selectionEnd == null)
                    return undefined;
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_action
        ], $mol_string.prototype, "event_change", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "error_report", null);
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tposition: relative;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_svg) = class $mol_svg extends ($.$mol_view) {
		dom_name(){
			return "svg";
		}
		dom_name_space(){
			return "http://www.w3.org/2000/svg";
		}
		font_size(){
			return 16;
		}
		font_family(){
			return "";
		}
		style_size(){
			return {};
		}
	};


;
"use strict";
var $;
(function ($) {
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_root) = class $mol_svg_root extends ($.$mol_svg) {
		view_box(){
			return "0 0 100 100";
		}
		aspect(){
			return "xMidYMid";
		}
		dom_name(){
			return "svg";
		}
		attr(){
			return {
				...(super.attr()), 
				"viewBox": (this.view_box()), 
				"preserveAspectRatio": (this.aspect())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_svg_path) = class $mol_svg_path extends ($.$mol_svg) {
		geometry(){
			return "";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.geometry())};
		}
	};


;
"use strict";

;
	($.$mol_icon) = class $mol_icon extends ($.$mol_svg_root) {
		path(){
			return "";
		}
		Path(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.path()));
			return obj;
		}
		view_box(){
			return "0 0 24 24";
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
		sub(){
			return [(this.Path())];
		}
	};
	($mol_mem(($.$mol_icon.prototype), "Path"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1em;\n\theight: 1.5em;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_icon_close) = class $mol_icon_close extends ($.$mol_icon) {
		path(){
			return "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
		}
	};


;
"use strict";

;
	($.$mol_speck) = class $mol_speck extends ($.$mol_view) {
		value(){
			return null;
		}
		theme(){
			return "$mol_theme_accent";
		}
		sub(){
			return [(this.value())];
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .75rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.2rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .75rem;\n\tvertical-align: sub;\n\tpadding: 0 .2rem;\n\tposition: absolute;\n\tz-index: var(--mol_layer_speck);\n\ttext-align: center;\n\tline-height: .9;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\tuser-select: none;\n\tbox-shadow: 0 0 3px rgba(0,0,0,.5);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_button) = class $mol_button extends ($.$mol_view) {
		event_activate(next){
			if(next !== undefined) return next;
			return null;
		}
		activate(next){
			return (this.event_activate(next));
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		event_key_press(next){
			if(next !== undefined) return next;
			return null;
		}
		key_press(next){
			return (this.event_key_press(next));
		}
		disabled(){
			return false;
		}
		tab_index(){
			return 0;
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		error(){
			return "";
		}
		enabled(){
			return true;
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		event(){
			return {
				...(super.event()), 
				"click": (next) => (this.activate(next)), 
				"dblclick": (next) => (this.clicks(next)), 
				"keydown": (next) => (this.key_press(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"disabled": (this.disabled()), 
				"role": "button", 
				"tabindex": (this.tab_index()), 
				"title": (this.hint_safe())
			};
		}
		sub(){
			return [(this.title())];
		}
		Speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ((this.error()));
			return obj;
		}
	};
	($mol_mem(($.$mol_button.prototype), "event_activate"));
	($mol_mem(($.$mol_button.prototype), "clicks"));
	($mol_mem(($.$mol_button.prototype), "event_key_press"));
	($mol_mem(($.$mol_button.prototype), "click"));
	($mol_mem(($.$mol_button.prototype), "event_click"));
	($mol_mem(($.$mol_button.prototype), "status"));
	($mol_mem(($.$mol_button.prototype), "Speck"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const error = this.status()?.[0];
                if (!error)
                    return '';
                if ($mol_promise_like(error)) {
                    return $mol_fail_hidden(error);
                }
                return this.$.$mol_error_message(error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\t-webkit-user-select: none;\n\tborder-radius: var(--mol_gap_round);\n\tbackground: transparent;\n\tcolor: inherit;\n}\n\n[mol_button]:where(:not(:disabled)):hover {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_button]:focus {\n\toutline: none;\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_button_typed) = class $mol_button_typed extends ($.$mol_button) {
		minimal_height(){
			return 40;
		}
		minimal_width(){
			return 40;
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n\tmin-width: 2.5rem;\n\tmin-height: 2.5rem;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus-visible {\n\tbox-shadow: inset 0 0 0 100vmax var(--mol_theme_hover);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_button_minor) = class $mol_button_minor extends ($.$mol_button_typed) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor] {\n\tcolor: var(--mol_theme_control);\n}\n\n[mol_button_minor][disabled] {\n\tcolor: var(--mol_theme_shade);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_list) = class $mol_list extends ($.$mol_view) {
		gap_before(){
			return 0;
		}
		Gap_before(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_before())});
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		gap_after(){
			return 0;
		}
		Gap_after(){
			const obj = new this.$.$mol_view();
			(obj.style) = () => ({"paddingTop": (this.gap_after())});
			return obj;
		}
		rows(){
			return [
				(this.Gap_before()), 
				(this.Empty()), 
				(this.Gap_after())
			];
		}
		render_visible_only(){
			return true;
		}
		render_over(){
			return 0.1;
		}
		sub(){
			return (this.rows());
		}
		item_height_min(id){
			return 1;
		}
		item_width_min(id){
			return 1;
		}
		view_window_shift(next){
			if(next !== undefined) return next;
			return 0;
		}
		view_window(){
			return [0, 0];
		}
	};
	($mol_mem(($.$mol_list.prototype), "Gap_before"));
	($mol_mem(($.$mol_list.prototype), "Empty"));
	($mol_mem(($.$mol_list.prototype), "Gap_after"));
	($mol_mem(($.$mol_list.prototype), "view_window_shift"));


;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = this.$mol_dom_context.CSS?.supports('overflow-anchor:auto') ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                const next = (rows.length === 0) ? [this.Empty()] : rows;
                const prev = $mol_mem_cached(() => this.sub());
                const [start, end] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                if (prev && $mol_mem_cached(() => prev[start] !== next[start])) {
                    const index = $mol_mem_cached(() => next.indexOf(prev[start])) ?? -1;
                    if (index >= 0)
                        this.view_window_shift(index - start);
                }
                return next;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                const shift = this.view_window_shift();
                this.view_window_shift(0);
                min += shift;
                max += shift;
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = this.item_height_min(min);
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                if (anchoring && (top < limit_top) && (bottom < limit_bottom) && (max < kids.length)) {
                    min2 = max;
                    top2 = bottom;
                }
                if ((bottom > limit_bottom) && (top > limit_top) && (min > 0)) {
                    max2 = min;
                    bottom2 = top;
                }
                while (anchoring && ((top2 > limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= this.item_height_min(min2);
                }
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += this.item_height_min(max2);
                    ++max2;
                }
                return [min2, max2];
            }
            item_height_min(index) {
                try {
                    return this.sub()[index]?.minimal_height() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            row_width_min(index) {
                try {
                    return this.sub()[index]?.minimal_width() ?? 0;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 0;
                }
            }
            gap_before() {
                let gap = 0;
                const skipped = this.view_window()[0];
                for (let i = 0; i < skipped; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            gap_after() {
                let gap = 0;
                const from = this.view_window()[1];
                const to = this.sub().length;
                for (let i = from; i < to; ++i)
                    gap += this.item_height_min(i);
                return gap;
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                let height = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    height += this.item_height_min(i);
                return height;
            }
            minimal_width() {
                let width = 0;
                const len = this.sub().length;
                for (let i = 0; i < len; ++i)
                    width = Math.max(width, this.item_width_min(i));
                return width;
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_width", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\tmin-height: 1.5rem;\n\t/* will-change: contents; */\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_paragraph) = class $mol_paragraph extends ($.$mol_view) {
		line_height(){
			return 24;
		}
		letter_width(){
			return 7;
		}
		width_limit(){
			return +Infinity;
		}
		row_width(){
			return 0;
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
	($.$mol_dimmer) = class $mol_dimmer extends ($.$mol_paragraph) {
		parts(){
			return [];
		}
		string(id){
			return "";
		}
		haystack(){
			return "";
		}
		needle(){
			return "";
		}
		sub(){
			return (this.parts());
		}
		Low(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
		High(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.string(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_dimmer.prototype), "Low"));
	($mol_mem_key(($.$mol_dimmer.prototype), "High"));


;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    class $mol_regexp extends RegExp {
        groups;
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static vary(sources) {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, '', groups);
        }
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_search) = class $mol_search extends ($.$mol_pop) {
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"escape": (next) => (this.clear(next))});
			return obj;
		}
		nav_components(){
			return [];
		}
		nav_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.nav_focused(next)));
			return obj;
		}
		suggests_showed(next){
			if(next !== undefined) return next;
			return false;
		}
		query(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_search_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		keyboard(){
			return "search";
		}
		enter(){
			return "search";
		}
		bring(){
			return (this.Query().bring());
		}
		Query(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.query(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.keyboard) = () => ((this.keyboard()));
			(obj.enter) = () => ((this.enter()));
			return obj;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_search_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		anchor_content(){
			return [(this.Query()), (this.Clear())];
		}
		menu_items(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_items()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		suggest_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		suggest_label(id){
			return "";
		}
		Suggest_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.suggest_label(id)));
			(obj.needle) = () => ((this.query()));
			return obj;
		}
		suggest_content(id){
			return [(this.Suggest_label(id))];
		}
		suggests(){
			return [];
		}
		plugins(){
			return [
				...(super.plugins()), 
				(this.Hotkey()), 
				(this.Nav())
			];
		}
		showed(next){
			return (this.suggests_showed(next));
		}
		align_hor(){
			return "right";
		}
		Anchor(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.anchor_content()));
			return obj;
		}
		bubble_content(){
			return [(this.Bubble_pane())];
		}
		Suggest(id){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.suggest_select(id, next)));
			(obj.sub) = () => ((this.suggest_content(id)));
			return obj;
		}
	};
	($mol_mem(($.$mol_search.prototype), "clear"));
	($mol_mem(($.$mol_search.prototype), "Hotkey"));
	($mol_mem(($.$mol_search.prototype), "nav_focused"));
	($mol_mem(($.$mol_search.prototype), "Nav"));
	($mol_mem(($.$mol_search.prototype), "suggests_showed"));
	($mol_mem(($.$mol_search.prototype), "query"));
	($mol_mem(($.$mol_search.prototype), "submit"));
	($mol_mem(($.$mol_search.prototype), "Query"));
	($mol_mem(($.$mol_search.prototype), "Clear_icon"));
	($mol_mem(($.$mol_search.prototype), "Clear"));
	($mol_mem(($.$mol_search.prototype), "Menu"));
	($mol_mem(($.$mol_search.prototype), "Bubble_pane"));
	($mol_mem_key(($.$mol_search.prototype), "suggest_select"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest_label"));
	($mol_mem(($.$mol_search.prototype), "Anchor"));
	($mol_mem_key(($.$mol_search.prototype), "Suggest"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_search extends $.$mol_search {
            anchor_content() {
                return [
                    this.Query(),
                    ...this.query() ? [this.Clear()] : [],
                ];
            }
            suggests_showed(next = true) {
                this.query();
                if (!this.focused())
                    return false;
                return next;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.query(next);
                this.Query().focused(true);
            }
            nav_components() {
                return [
                    this.Query(),
                    ...this.menu_items(),
                ];
            }
            nav_focused(component) {
                if (!this.focused())
                    return null;
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.suggests_showed()) {
                    this.ensure_visible(component, "center");
                    component.focused(true);
                }
                return component;
            }
            suggest_label(key) {
                return key;
            }
            menu_items() {
                return this.suggests().map((suggest) => this.Suggest(suggest));
            }
            suggest_select(id, event) {
                this.query(id);
                this.Query().selection([id.length, id.length]);
                this.Query().focused(true);
            }
            clear(event) {
                this.query('');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "anchor_content", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "suggests_showed", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "nav_focused", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "menu_items", null);
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_anchor] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_query] {\n\tflex-grow: 1;\n}\n\n[mol_search_menu] {\n\tmin-height: .75rem;\n\tdisplay: flex;\n}\n\n[mol_search_suggest] {\n\ttext-align: left;\n}\n\n[mol_search_suggest_label_high] {\n\tcolor: var(--mol_theme_shade);\n\ttext-shadow: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_check) = class $mol_check extends ($.$mol_button_minor) {
		checked(next){
			if(next !== undefined) return next;
			return false;
		}
		aria_checked(){
			return "false";
		}
		aria_role(){
			return "checkbox";
		}
		Icon(){
			return null;
		}
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		label(){
			return [(this.Title())];
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_check_checked": (this.checked()), 
				"aria-checked": (this.aria_checked()), 
				"role": (this.aria_role())
			};
		}
		sub(){
			return [(this.Icon()), (this.label())];
		}
	};
	($mol_mem(($.$mol_check.prototype), "checked"));
	($mol_mem(($.$mol_check.prototype), "Title"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\t/* align-items: flex-start; */\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: left;\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check extends $.$mol_check {
            click(next) {
                if (next?.defaultPrevented)
                    return;
                this.checked(!this.checked());
                if (next)
                    next.preventDefault();
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
            aria_checked() {
                return String(this.checked());
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_chevron) = class $mol_icon_chevron extends ($.$mol_icon) {
		path(){
			return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
		}
	};


;
"use strict";

;
	($.$mol_check_expand) = class $mol_check_expand extends ($.$mol_check) {
		level_style(){
			return "0px";
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return false;
		}
		Icon(){
			const obj = new this.$.$mol_icon_chevron();
			return obj;
		}
		level(){
			return 0;
		}
		style(){
			return {...(super.style()), "paddingLeft": (this.level_style())};
		}
		checked(next){
			return (this.expanded(next));
		}
		enabled(){
			return (this.expandable());
		}
	};
	($mol_mem(($.$mol_check_expand.prototype), "expanded"));
	($mol_mem(($.$mol_check_expand.prototype), "Icon"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n\tmin-width: 20px;\n}\n\n:where([mol_check_expand][disabled]) [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n\tmargin-left: -0.375rem;\n}\n[mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n:where([mol_check_checked]) [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-left: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_expander) = class $mol_expander extends ($.$mol_list) {
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return true;
		}
		label(){
			return [(this.title())];
		}
		Trigger(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this.expanded(next)));
			(obj.expandable) = () => ((this.expandable()));
			(obj.label) = () => ((this.label()));
			return obj;
		}
		Tools(){
			return null;
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Trigger()), (this.Tools())]);
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
		rows(){
			return [(this.Label()), (this.Content())];
		}
	};
	($mol_mem(($.$mol_expander.prototype), "expanded"));
	($mol_mem(($.$mol_expander.prototype), "Trigger"));
	($mol_mem(($.$mol_expander.prototype), "Label"));
	($mol_mem(($.$mol_expander.prototype), "Content"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_expander extends $.$mol_expander {
            rows() {
                return [
                    this.Label(),
                    ...this.expanded() ? [this.Content()] : []
                ];
            }
            expandable() {
                return this.content().length > 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_expander.prototype, "rows", null);
        $$.$mol_expander = $mol_expander;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/expander/expander.view.css", "[mol_expander] {\n\tflex-direction: column;\n}\n\n[mol_expander_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_expander_trigger] {\n\tflex: auto;\n\tposition: relative;\n}\n");
})($ || ($ = {}));

;
	($.$mol_tag_tree) = class $mol_tag_tree extends ($.$mol_list) {
		tag_list(){
			return [];
		}
		item_list(){
			return [];
		}
		item_title(id){
			return "";
		}
		tag_expanded(id, next){
			if(next !== undefined) return next;
			return false;
		}
		tag_name(id){
			return "";
		}
		tag_path(id){
			return [];
		}
		Tag_tree(id){
			const obj = new this.$.$mol_tag_tree();
			(obj.ids_tags) = () => ((this.ids_tags()));
			(obj.path) = () => ((this.tag_path(id)));
			(obj.Item) = (id) => ((this.Item(id)));
			(obj.item_title) = (id) => ((this.item_title(id)));
			(obj.tag_expanded) = (id, next) => ((this.tag_expanded(id, next)));
			(obj.tag_name) = (id) => ((this.tag_name(id)));
			return obj;
		}
		path(){
			return [];
		}
		ids_tags(){
			return {};
		}
		ids(){
			return [];
		}
		tags(){
			return [];
		}
		levels_expanded(){
			return 0;
		}
		sub(){
			return [...(this.tag_list()), ...(this.item_list())];
		}
		Item(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.item_title(id))]);
			return obj;
		}
		Tag(id){
			const obj = new this.$.$mol_expander();
			(obj.expandable) = () => (true);
			(obj.expanded) = (next) => ((this.tag_expanded(id, next)));
			(obj.title) = () => ((this.tag_name(id)));
			(obj.content) = () => ([(this.Tag_tree(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_tag_tree.prototype), "tag_expanded"));
	($mol_mem_key(($.$mol_tag_tree.prototype), "Tag_tree"));
	($mol_mem_key(($.$mol_tag_tree.prototype), "Item"));
	($mol_mem_key(($.$mol_tag_tree.prototype), "Tag"));


;
"use strict";
var $;
(function ($) {
    function $mol_compare_text(item = (item) => String(item)) {
        return (a, b) => {
            const text_a = item(a).trim().toLowerCase();
            const text_b = item(b).trim().toLowerCase();
            const parts_a = text_a.split(/(\d+)/);
            const parts_b = text_b.split(/(\d+)/);
            const count = Math.max(parts_a.length, parts_b.length);
            for (let i = 0; i < count; ++i) {
                const part_a = parts_a[i] || '';
                const part_b = parts_b[i] || '';
                const diff = Number(part_a) - Number(part_b);
                if (diff)
                    return diff;
                if (part_a > part_b)
                    return 1;
                if (part_a < part_b)
                    return -1;
            }
            return parts_a.length - parts_b.length;
        };
    }
    $.$mol_compare_text = $mol_compare_text;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_tag_tree extends $.$mol_tag_tree {
            ids() {
                const prefix = this.path().join('/');
                const ids_tags = this.ids_tags();
                return Object.keys(ids_tags).filter(id => ids_tags[id].some((tag) => tag.startsWith(prefix)));
            }
            item_list() {
                const path = this.path();
                const grouped = new Set(this.tags().flatMap(tag => this.Tag_tree(tag).ids()));
                return this.ids()
                    .filter(id => !grouped.has(id))
                    .sort($mol_compare_text())
                    .map(id => this.Item([...path, id]));
            }
            tags() {
                const stat = new Map();
                const ids_tags = this.ids_tags();
                const ids = this.ids();
                const prefix = this.path().join('/');
                for (let id of ids) {
                    for (let tag of ids_tags[id]) {
                        if (prefix && !tag.startsWith(prefix + '/'))
                            continue;
                        tag = tag.slice(prefix.length).replace(/^\//, '');
                        stat.set(tag, (stat.get(tag) ?? 0) + 1);
                    }
                }
                for (let [tag, count] of stat) {
                    if (count < 2)
                        stat.delete(tag);
                    if (count > ids.length - 2)
                        stat.delete(tag);
                }
                const prefixes = [...new Set([...stat.keys()].map(tag => tag.replace(/\/.*/, '')))].sort($mol_compare_text());
                return prefixes;
            }
            tag_list() {
                return this.tags().map(tag => this.Tag([tag]));
            }
            tag_path(id) {
                return [...this.path(), id];
            }
            tag_expanded(id, next) {
                return next ?? this.tag_expanded_default(id);
            }
            tag_expanded_default(id) {
                return this.levels_expanded() >= id.length;
            }
            tag_name(id) {
                return id;
            }
            item_title(id) {
                return id.at(-1);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_tag_tree.prototype, "ids", null);
        __decorate([
            $mol_mem
        ], $mol_tag_tree.prototype, "item_list", null);
        __decorate([
            $mol_mem
        ], $mol_tag_tree.prototype, "tags", null);
        __decorate([
            $mol_mem
        ], $mol_tag_tree.prototype, "tag_list", null);
        __decorate([
            $mol_mem_key
        ], $mol_tag_tree.prototype, "tag_expanded", null);
        $$.$mol_tag_tree = $mol_tag_tree;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/tag/tree/tree.view.css", "[mol_tag_tree_tag_content] {\n\tpadding-left: var(--mol_gap_block);\n    margin-left: var(--mol_gap_block);\n    box-shadow: inset 1px 0 0 0 var(--mol_theme_line);\n}\n\n[mol_tag_tree_item] {\n\tpadding: var(--mol_gap_text);\n\tpadding-left: 0;\n}\n\n[mol_tag_tree_tag_trigger_icon] {\n    margin-left: -1rem;\n    margin-right: -0.25rem;\n}\n");
})($ || ($ = {}));

;
	($.$mol_link) = class $mol_link extends ($.$mol_view) {
		uri_toggle(){
			return "";
		}
		hint(){
			return "";
		}
		hint_safe(){
			return (this.hint());
		}
		target(){
			return "_self";
		}
		file_name(){
			return "";
		}
		current(){
			return false;
		}
		relation(){
			return "";
		}
		event_click(next){
			if(next !== undefined) return next;
			return null;
		}
		click(next){
			return (this.event_click(next));
		}
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		uri_off(){
			return "";
		}
		uri_native(){
			return null;
		}
		external(){
			return false;
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri_toggle()), 
				"title": (this.hint_safe()), 
				"target": (this.target()), 
				"download": (this.file_name()), 
				"mol_link_current": (this.current()), 
				"rel": (this.relation())
			};
		}
		sub(){
			return [(this.title())];
		}
		arg(){
			return {};
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$mol_link.prototype), "event_click"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        minHeight: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
        },
        ':focus': {
            outline: 'none',
        },
        ':focus-visible': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));

;
	($.$mol_app_demo_menu) = class $mol_app_demo_menu extends ($.$mol_page) {
		filter(next){
			if(next !== undefined) return next;
			return "";
		}
		Filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.filter(next)));
			return obj;
		}
		ids_tags(){
			return {};
		}
		levels_expanded_default(){
			return 0;
		}
		levels_expanded(){
			return (this.levels_expanded_default());
		}
		Tree(){
			const obj = new this.$.$mol_tag_tree();
			(obj.Item) = (id) => ((this.Option(id)));
			(obj.ids_tags) = () => ((this.ids_tags()));
			(obj.levels_expanded) = () => ((this.levels_expanded()));
			return obj;
		}
		option_arg(id){
			return {};
		}
		option_title(id){
			return "";
		}
		Option_title(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.option_title(id)));
			(obj.needle) = () => ((this.filter()));
			return obj;
		}
		names(){
			return [];
		}
		widget_tags(id){
			return [];
		}
		widget_aspects(id){
			return [];
		}
		widget_title(id){
			return "";
		}
		search_start(next){
			if(next !== undefined) return next;
			return null;
		}
		body(){
			return [(this.Filter()), (this.Tree())];
		}
		Option(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.option_arg(id)));
			(obj.sub) = () => ([(this.Option_title(id))]);
			return obj;
		}
	};
	($mol_mem(($.$mol_app_demo_menu.prototype), "filter"));
	($mol_mem(($.$mol_app_demo_menu.prototype), "Filter"));
	($mol_mem(($.$mol_app_demo_menu.prototype), "Tree"));
	($mol_mem_key(($.$mol_app_demo_menu.prototype), "Option_title"));
	($mol_mem(($.$mol_app_demo_menu.prototype), "search_start"));
	($mol_mem_key(($.$mol_app_demo_menu.prototype), "Option"));


;
"use strict";
var $;
(function ($) {
    class $mol_state_session extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.sessionStorage;
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
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const compare_names = (a, b) => {
            if (a[0] === '$' && b[0] !== '$')
                return 1;
            if (a[0] !== '$' && b[0] === '$')
                return -1;
            if (a > b)
                return 1;
            if (a < b)
                return -1;
            return 0;
        };
        class $mol_app_demo_menu extends $.$mol_app_demo_menu {
            filter(next) {
                return this.$.$mol_state_session.value('filter', next === '' ? null : next) ?? super.filter();
            }
            option_arg(id) {
                return { 'demo': id.at(-1)?.replace(/^\$*/, '') };
            }
            option_title(path_id) {
                const id = path_id.at(-1);
                return id.replace('_demo_', '/').replace('_demo', '');
            }
            search_start(event) {
                this.Filter().Query().bring();
                event?.preventDefault();
            }
            filter_last_word_completed() {
                return /[^\s]+\s+$/.test(this.filter());
            }
            filter_words() {
                const filter = this.filter().trim();
                const words = filter !== '' ? filter.split(/\s+/) : [];
                return [...new Set(words)].map(word => word.toLowerCase());
            }
            ids_tags() {
                const result = {};
                for (const name of this.names_filtered()) {
                    let aspects = this.widget_aspects(name);
                    result[name] = result[name] ?? [];
                    for (const tag of aspects) {
                        result[name].push(tag);
                    }
                }
                return result;
            }
            tags_filtered() {
                return [...new Set(this.names_filtered().flatMap(name => this.widget_tags(name)))]
                    .map(tag => tag.trim().toLowerCase())
                    .filter(tag => tag !== '')
                    .sort(compare_names);
            }
            filter_suggests() {
                const filter_words = this.filter_words();
                if (filter_words.length === 0)
                    return this.tags_filtered();
                const filtered_names = this.names_filtered();
                if (filtered_names.length <= 1)
                    return [];
                const tags = this.tags_filtered();
                const filter_last_word = filter_words.slice(-1)[0];
                const filter_last_word_completed = this.filter_last_word_completed();
                const suggests = [];
                for (const tag of tags) {
                    if (filter_words.includes(tag))
                        continue;
                    if (filter_last_word_completed) {
                        suggests.push(`${filter_words.join(' ')} ${tag}`);
                    }
                    else if (tag.indexOf(filter_last_word) === 0 &&
                        (filter_last_word.length < tag.length)) {
                        suggests.push(`${filter_words.slice(0, -1).join(' ')} ${tag}`);
                    }
                }
                return suggests;
            }
            levels_expanded() {
                if (this.filter_words().length)
                    return 99;
                return super.levels_expanded();
            }
            names_filtered() {
                const words = this.filter_words();
                return this.names().filter($mol_match_text(this.filter(), name => [
                    name,
                    ...this.widget_aspects(name),
                    ...this.widget_tags(name),
                ]));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "filter", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "filter_last_word_completed", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "filter_words", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "ids_tags", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "tags_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "filter_suggests", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_menu.prototype, "names_filtered", null);
        $$.$mol_app_demo_menu = $mol_app_demo_menu;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/app/demo/menu/menu.view.css", "[mol_app_demo_menu] {\n\tflex: 0 0 18rem;\n}\n\n[mol_app_demo_menu_selector] {\n\tdisplay: flex;\n\tflex-wrap: nowrap;\n\tgap: 0;\n}\n\n[mol_app_demo_menu_tools] {\n\tpadding: 0;\n}\n\n[mol_app_demo_menu_themes] {\n\tflex: none;\n}\n\n[mol_app_demo_menu_filter] {\n\talign-self: stretch;\n\tflex-grow: 0;\n\tflex-shrink: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_script) = class $mol_icon_script extends ($.$mol_icon) {
		path(){
			return "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2H8C6.3,2 5,3.3 5,5V16H16V17C16,17.6 16.4,18 17,18H18V5C18,4.4 18.4,4 19,4C19.6,4 20,4.4 20,5V6H22V5C22,3.3 20.7,2 19,2Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_script_text) = class $mol_icon_script_text extends ($.$mol_icon) {
		path(){
			return "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z";
		}
	};


;
"use strict";

;
	($.$mol_link_source) = class $mol_link_source extends ($.$mol_link) {
		Icon(){
			const obj = new this.$.$mol_icon_script_text();
			return obj;
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_link_source_hint"));
		}
		sub(){
			return [(this.Icon())];
		}
	};
	($mol_mem(($.$mol_link_source.prototype), "Icon"));


;
"use strict";

;
	($.$mol_check_icon) = class $mol_check_icon extends ($.$mol_check) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/icon/icon.view.css", "[mol_check_icon]:where([mol_check_checked]) {\n\tcolor: var(--mol_theme_current);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_icon_brightness_4) = class $mol_icon_brightness_4 extends ($.$mol_icon) {
		path(){
			return "M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z";
		}
	};


;
"use strict";

;
	($.$mol_lights_toggle) = class $mol_lights_toggle extends ($.$mol_check_icon) {
		Lights_icon(){
			const obj = new this.$.$mol_icon_brightness_4();
			return obj;
		}
		lights(next){
			if(next !== undefined) return next;
			return false;
		}
		Icon(){
			return (this.Lights_icon());
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_lights_toggle_hint"));
		}
		checked(next){
			return (this.lights(next));
		}
	};
	($mol_mem(($.$mol_lights_toggle.prototype), "Lights_icon"));
	($mol_mem(($.$mol_lights_toggle.prototype), "lights"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_lights_toggle extends $.$mol_lights_toggle {
            lights(next) {
                return this.$.$mol_lights(next);
            }
        }
        $$.$mol_lights_toggle = $mol_lights_toggle;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_information) = class $mol_icon_information extends ($.$mol_icon) {
		path(){
			return "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_information_outline) = class $mol_icon_information_outline extends ($.$mol_icon) {
		path(){
			return "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_forum) = class $mol_icon_forum extends ($.$mol_icon) {
		path(){
			return "M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_forum_outline) = class $mol_icon_forum_outline extends ($.$mol_icon) {
		path(){
			return "M15,4V11H5.17L4,12.17V4H15M16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12V3A1,1 0 0,0 16,2M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_open_in_new) = class $mol_icon_open_in_new extends ($.$mol_icon) {
		path(){
			return "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z";
		}
	};


;
"use strict";

;
	($.$mol_embed_native) = class $mol_embed_native extends ($.$mol_scroll) {
		uri(next){
			if(next !== undefined) return next;
			return "about:config";
		}
		title(){
			return "";
		}
		Fallback(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.uri()));
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		uri_change(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "iframe";
		}
		window(){
			return null;
		}
		attr(){
			return {...(super.attr()), "src": (this.uri())};
		}
		sub(){
			return [(this.Fallback())];
		}
		message(){
			return {"hashchange": (next) => (this.uri_change(next))};
		}
	};
	($mol_mem(($.$mol_embed_native.prototype), "uri"));
	($mol_mem(($.$mol_embed_native.prototype), "Fallback"));
	($mol_mem(($.$mol_embed_native.prototype), "uri_change"));


;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = new $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_native extends $.$mol_embed_native {
            window() {
                $mol_wire_solid();
                this.uri_resource();
                return $mol_wire_sync(this).load(this.dom_node_actual());
            }
            load(frame) {
                return new Promise((done, fail) => {
                    frame.onload = () => {
                        try {
                            if (frame.contentWindow.location.href === 'about:blank') {
                                return;
                            }
                        }
                        catch { }
                        done(frame.contentWindow);
                    };
                    frame.onerror = (event) => {
                        fail(typeof event === 'string' ? new Error(event) : event.error || event);
                    };
                });
            }
            uri_resource() {
                return this.uri().replace(/#.*/, '');
            }
            message_listener() {
                return new $mol_dom_listener($mol_dom_context, 'message', $mol_wire_async(this).message_receive);
            }
            sub_visible() {
                this.window();
                return super.sub_visible();
            }
            message_receive(event) {
                if (!event)
                    return;
                if (event.source !== this.window())
                    return;
                if (!Array.isArray(event.data))
                    return;
                this.message()[event.data[0]]?.(event);
            }
            uri_change(event) {
                this.$.$mol_wait_timeout(1000);
                this.uri(event.data[1]);
            }
            auto() {
                return [
                    this.message_listener(),
                    this.window(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "window", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "uri_resource", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "message_listener", null);
        $$.$mol_embed_native = $mol_embed_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/native/native.view.css", "[mol_embed_native] {\n\tmin-width: 0;\n\tmin-height: 0;\n\tmax-width: 100%;\n\tmax-height: 100vh;\n\tobject-fit: cover;\n\tdisplay: flex;\n\tflex: 1 1 auto;\n\tobject-position: top left;\n\tborder-radius: var(--mol_gap_round);\n\taspect-ratio: 4/3;\n\tborder: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_frame) = class $mol_frame extends ($.$mol_embed_native) {
		allow(){
			return "";
		}
		html(){
			return null;
		}
		attr(){
			return {
				"tabindex": (this.tabindex()), 
				"allow": (this.allow()), 
				"src": (this.uri()), 
				"srcdoc": (this.html())
			};
		}
		fullscreen(){
			return true;
		}
		accelerometer(){
			return true;
		}
		autoplay(){
			return true;
		}
		encription(){
			return true;
		}
		gyroscope(){
			return true;
		}
		pip(){
			return true;
		}
		clipboard_read(){
			return true;
		}
		clipboard_write(){
			return true;
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_frame extends $.$mol_frame {
            window() {
                return super.window();
            }
            allow() {
                return [
                    ...this.fullscreen() ? ['fullscreen'] : [],
                    ...this.accelerometer() ? ['accelerometer'] : [],
                    ...this.autoplay() ? ['autoplay'] : [],
                    ...this.encription() ? ['encrypted-media'] : [],
                    ...this.gyroscope() ? ['gyroscope'] : [],
                    ...this.pip() ? ['picture-in-picture'] : [],
                    ...this.clipboard_read() ? [`clipboard-read ${this.uri()}`] : [],
                    ...this.clipboard_write() ? [`clipboard-write ${this.uri()}`] : [],
                ].join('; ');
            }
        }
        $$.$mol_frame = $mol_frame;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_frame, {
        border: {
            style: 'none',
        },
        maxHeight: $mol_style_unit.vh(100),
    });
})($ || ($ = {}));

;
	($.$mol_chat) = class $mol_chat extends ($.$mol_link) {
		Icon(){
			const obj = new this.$.$mol_icon_forum_outline();
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$mol_chat_title"));
		}
		standalone(){
			return "";
		}
		Standalone_icon(){
			const obj = new this.$.$mol_icon_open_in_new();
			return obj;
		}
		Esternal(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.standalone()));
			(obj.sub) = () => ([(this.Standalone_icon())]);
			return obj;
		}
		Close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Close(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"mol_chat": null});
			(obj.sub) = () => ([(this.Close_icon())]);
			return obj;
		}
		embed(){
			return "";
		}
		Embed(){
			const obj = new this.$.$mol_frame();
			(obj.uri) = () => ((this.embed()));
			return obj;
		}
		Page(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.title()));
			(obj.tools) = () => ([(this.Esternal()), (this.Close())]);
			(obj.Body) = () => ((this.Embed()));
			return obj;
		}
		seed(){
			return "";
		}
		opened(){
			return false;
		}
		arg(){
			return {"mol_chat": ""};
		}
		hint(){
			return (this.title());
		}
		sub(){
			return [(this.Icon())];
		}
		pages(){
			return [(this.Page())];
		}
	};
	($mol_mem(($.$mol_chat.prototype), "Icon"));
	($mol_mem(($.$mol_chat.prototype), "Standalone_icon"));
	($mol_mem(($.$mol_chat.prototype), "Esternal"));
	($mol_mem(($.$mol_chat.prototype), "Close_icon"));
	($mol_mem(($.$mol_chat.prototype), "Close"));
	($mol_mem(($.$mol_chat.prototype), "Embed"));
	($mol_mem(($.$mol_chat.prototype), "Page"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chat extends $.$mol_chat {
            opened() {
                return this.$.$mol_state_arg.value('mol_chat') !== null;
            }
            pages() {
                return this.opened() ? [this.Page()] : [];
            }
            standalone() {
                const seed = this.seed();
                const origin = new URL(this.$.$mol_state_arg.href()).origin;
                return `https://talks.hyoo.ru/#!chat=${seed}`;
            }
            embed() {
                const seed = this.seed();
                const lights = String(this.$.$mol_lights());
                const embed = this.$.$mol_state_arg.href();
                return `https://talks.hyoo.ru/#!chat=${encodeURIComponent(seed)}/mol_lights=${lights}`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_chat.prototype, "standalone", null);
        __decorate([
            $mol_mem
        ], $mol_chat.prototype, "embed", null);
        $$.$mol_chat = $mol_chat;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chat/chat.view.css", "[mol_chat_page] {\n\tflex: 1 0 30rem;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_settings) = class $mol_icon_settings extends ($.$mol_icon) {
		path(){
			return "M12,15.5C10.07,15.5 8.5,13.93 8.5,12C8.5,10.07 10.07,8.5 12,8.5C13.93,8.5 15.5,10.07 15.5,12C15.5,13.93 13.93,15.5 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
		}
	};


;
"use strict";

;
	($.$mol_app_demo_detail) = class $mol_app_demo_detail extends ($.$mol_page) {
		readme(next){
			if(next !== undefined) return next;
			return false;
		}
		readme_icon(){
			const obj = new this.$.$mol_icon_information_outline();
			return obj;
		}
		Readme(){
			const obj = new this.$.$mol_check_icon();
			(obj.checked) = (next) => ((this.readme(next)));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_app_demo_detail_Readme_hint")));
			(obj.Icon) = () => ((this.readme_icon()));
			return obj;
		}
		chat_pages(){
			return (this.Chat().pages());
		}
		chat_seed(){
			return "0_0";
		}
		Chat(){
			const obj = new this.$.$mol_chat();
			(obj.seed) = () => ((this.chat_seed()));
			return obj;
		}
		edit_hint(){
			return (this.$.$mol_locale.text("$mol_app_demo_detail_edit_hint"));
		}
		Edit_speck(){
			const obj = new this.$.$mol_speck();
			(obj.value) = () => ("β");
			return obj;
		}
		Edit_icon(){
			const obj = new this.$.$mol_icon_settings();
			return obj;
		}
		edit_uri(){
			return "";
		}
		Edit(){
			const obj = new this.$.$mol_link();
			(obj.hint) = () => ((this.edit_hint()));
			(obj.sub) = () => ([(this.Edit_speck()), (this.Edit_icon())]);
			(obj.uri) = () => ((this.edit_uri()));
			return obj;
		}
		close_hint(){
			return (this.$.$mol_locale.text("$mol_app_demo_detail_close_hint"));
		}
		Close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		close_arg(){
			return {"demo": null};
		}
		Close(){
			const obj = new this.$.$mol_link();
			(obj.hint) = () => ((this.close_hint()));
			(obj.sub) = () => ([(this.Close_icon())]);
			(obj.arg) = () => ((this.close_arg()));
			return obj;
		}
		Demo(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		description(){
			return "";
		}
		tools(){
			return [
				(this.Readme()), 
				(this.Chat()), 
				(this.Edit()), 
				(this.Close())
			];
		}
		body(){
			return [(this.Demo())];
		}
	};
	($mol_mem(($.$mol_app_demo_detail.prototype), "readme"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "readme_icon"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "Readme"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "Chat"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "Edit_speck"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "Edit_icon"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "Edit"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "Close_icon"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "Close"));
	($mol_mem(($.$mol_app_demo_detail.prototype), "Demo"));


;
"use strict";

;
	($.$mol_example) = class $mol_example extends ($.$mol_view) {
		tags(){
			return [];
		}
		aspects(){
			return [];
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/example/example.view.css", "[mol_example] {\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_example_small) = class $mol_example_small extends ($.$mol_example) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/example/small/small.view.css", "[mol_example_small] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\talign-content: flex-start;\n\tjustify-content: flex-start;\n\tflex: 0 0 auto;\n\tbox-sizing: border-box;\n\tmax-width: 100%;\n\tgap: var(--mol_gap_block);\n}\n\n[mol_example_small] > * {\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_example_large) = class $mol_example_large extends ($.$mol_example) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/example/large/large.view.css", "[mol_example_large] {\n\tflex: 1 1 auto;\n\tflex-direction: column;\n\tbackground: var(--mol_theme_back);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n\tmax-width: 100%;\n\tmax-height: 100%;\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_stack) = class $mol_stack extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/stack/stack.view.css", "[mol_stack] {\n\tdisplay: grid;\n\t/* width: max-content; */\n\t/* height: max-content; */\n\talign-items: flex-start;\n\tjustify-items: flex-start;\n}\n\n[mol_stack] > * {\n\tgrid-area: 1/1;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_text_code_token) = class $mol_text_code_token extends ($.$mol_dimmer) {
		type(){
			return "";
		}
		attr(){
			return {...(super.attr()), "mol_text_code_token_type": (this.type())};
		}
	};
	($.$mol_text_code_token_link) = class $mol_text_code_token_link extends ($.$mol_text_code_token) {
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		type(){
			return "code-link";
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri()), 
				"target": "_blank"
			};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { hsla } = $mol_style_func;
        $mol_style_define($mol_text_code_token, {
            display: 'inline',
            textDecoration: 'none',
            '@': {
                mol_text_code_token_type: {
                    'code-keyword': {
                        color: hsla(0, 70, 60, 1),
                    },
                    'code-field': {
                        color: hsla(300, 70, 50, 1),
                    },
                    'code-tag': {
                        color: hsla(330, 70, 50, 1),
                    },
                    'code-global': {
                        color: hsla(30, 80, 50, 1),
                    },
                    'code-decorator': {
                        color: hsla(180, 40, 50, 1),
                    },
                    'code-punctuation': {
                        color: hsla(0, 0, 50, 1),
                    },
                    'code-string': {
                        color: hsla(90, 40, 50, 1),
                    },
                    'code-number': {
                        color: hsla(55, 65, 45, 1),
                    },
                    'code-call': {
                        color: hsla(270, 60, 50, 1),
                    },
                    'code-link': {
                        color: hsla(210, 60, 50, 1),
                    },
                    'code-comment-inline': {
                        opacity: .5,
                    },
                    'code-comment-block': {
                        opacity: .5,
                    },
                    'code-docs': {
                        opacity: .75,
                    },
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code_line) = class $mol_text_code_line extends ($.$mol_paragraph) {
		numb(){
			return 0;
		}
		token_type(id){
			return "";
		}
		token_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		token_uri(id){
			return "";
		}
		text(){
			return "";
		}
		minimal_height(){
			return 24;
		}
		numb_showed(){
			return true;
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		Numb(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.numb())]);
			return obj;
		}
		Token(id){
			const obj = new this.$.$mol_text_code_token();
			(obj.type) = () => ((this.token_type(id)));
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			return obj;
		}
		Token_link(id){
			const obj = new this.$.$mol_text_code_token_link();
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			(obj.uri) = () => ((this.token_uri(id)));
			return obj;
		}
		find_pos(id){
			return null;
		}
	};
	($mol_mem(($.$mol_text_code_line.prototype), "Numb"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token_link"));


;
"use strict";
var $;
(function ($) {
    class $mol_syntax2 {
        lexems;
        constructor(lexems) {
            this.lexems = lexems;
            for (let name in lexems) {
                this.rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            const parts = '(' + this.rules.map(rule => rule.regExp.source).join(')|(') + ')';
            this.regexp = RegExp(`([\\s\\S]*?)(?:(${parts})|$(?![^]))`, 'gmu');
        }
        rules = [];
        regexp;
        tokenize(text, handle) {
            let end = 0;
            lexing: while (end < text.length) {
                const start = end;
                this.regexp.lastIndex = start;
                var found = this.regexp.exec(text);
                end = this.regexp.lastIndex;
                if (start === end)
                    throw new Error('Empty token');
                var prefix = found[1];
                if (prefix)
                    handle('', prefix, [prefix], start);
                var suffix = found[2];
                if (!suffix)
                    continue;
                let offset = 4;
                for (let rule of this.rules) {
                    if (found[offset - 1]) {
                        handle(rule.name, suffix, found.slice(offset, offset + rule.size), start + prefix.length);
                        continue lexing;
                    }
                    offset += rule.size + 1;
                }
                $mol_fail(new Error('$mol_syntax2 is broken'));
            }
        }
        parse(text, handlers) {
            this.tokenize(text, (name, ...args) => handlers[name](...args));
        }
    }
    $.$mol_syntax2 = $mol_syntax2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_syntax2_md_flow = new $mol_syntax2({
        'quote': /^((?:(?:[>"] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'spoiler': /^((?:(?:[\?] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'header': /^([#=]+)(\s+)(.*?)$([\n\r]*)/,
        'list': /^((?:(?: ?([*+-])|(?:\d+[\.\)])+) +(?:[^]*?)$(?:\r?\n?)(?:  (?:[^]*?)$(?:\r?\n?))*)+)((?:\r?\n)*)/,
        'code': /^(```\s*)([\w.-]*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?: |\t)(?:[^]*?)$\r?\n?)+)([\n\r]*)/,
        'table': /((?:^\|.+?$\r?\n?)+)([\n\r]*)/,
        'grid': /((?:^ *! .*?$\r?\n?)+)([\n\r]*)/,
        'cut': /^--+$((?:\r?\n)*)/,
        'block': /^(.*?)$((?:\r?\n)*)/,
    });
    $.$mol_syntax2_md_line = new $mol_syntax2({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*|\/\/(?!\s)(.+?)\/\//,
        'code': /```(.+?)```|;;(.+?);;|`(.+?)`/,
        'insert': /\+\+(.+?)\+\+/,
        'delete': /~~(.+?)~~|--(.+?)--/,
        'embed': /""(?:(.*?)\\)?(.*?)""/,
        'link': /\\\\(?:(.*?)\\)?(.*?)\\\\/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
        'text-link': /\[(.*?(?:\[[^\[\]]*?\][^\[\]]*?)*)\]\((.*?)\)/,
        'text-link-http': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
    });
    $.$mol_syntax2_md_code = new $mol_syntax2({
        'code-indent': /\t+/,
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/,
        'code-link': /(?:\w+:\/\/|#)\S+?(?=\s|\\\\|""|$)/,
        'code-comment-inline': /\/\/.*?(?:$|\/\/)|- \\(?!\\).*|#!? .*/,
        'code-string': /(?:".*?"|'.*?'|`.*?`| ?\\\\.+?\\\\|\/.+?\/[dygimsu]*(?!\p{Letter})|[ \t]*\\[^\n]*)/u,
        'code-number': /[+-]?(?:\d*\.)?\d+\w*/,
        'code-call': /\.?\w+ *(?=\()/,
        'code-sexpr': /\((\w+ )/,
        'code-field': /(?:(?:\.|::|->)\w+|[\w-]+\??\s*:(?!\/\/|:))/,
        'code-keyword': /\b(throw|readonly|unknown|keyof|typeof|never|from|class|struct|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|val|let|const|for|do|while|until|in|out|of|new|if|then|else|switch|case|this|return|async|await|yield|try|catch|break|continue|get|set|public|private|protected|string|boolean|number|null|undefined|true|false|void|int|float|ref)\b/,
        'code-global': /[$]+\w*|\b[A-Z][a-z0-9]+[A-Z]\w*/,
        'code-word': /\w+/,
        'code-decorator': /@\s*\S+/,
        'code-tag': /<\/?[\w-]+\/?>?|&\w+;/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>~!\?@#%&\*_\+\\\/\|;:\.,\^]+?/,
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code_line extends $.$mol_text_code_line {
            maximal_width() {
                return this.text().length * this.letter_width();
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            tokens(path) {
                const tokens = [];
                const text = (path.length > 0)
                    ? this.tokens(path.slice(0, path.length - 1))[path[path.length - 1]].found.slice(1, -1)
                    : this.text();
                this.syntax().tokenize(text, (name, found, chunks) => {
                    if (name === 'code-sexpr') {
                        tokens.push({ name: 'code-punctuation', found: '(', chunks: [] });
                        tokens.push({ name: 'code-call', found: chunks[0], chunks: [] });
                    }
                    else {
                        tokens.push({ name, found, chunks });
                    }
                });
                return tokens;
            }
            sub() {
                return [
                    ...this.numb_showed() ? [this.Numb()] : [],
                    ...this.row_content([])
                ];
            }
            row_content(path) {
                const content = this.tokens(path).map((t, i) => this.Token([...path, i]));
                return content.length ? content : ['\n'];
            }
            Token(path) {
                return this.token_type(path) === 'code-link' ? this.Token_link(path) : super.Token(path);
            }
            token_type(path) {
                return this.tokens([...path.slice(0, path.length - 1)])[path[path.length - 1]].name;
            }
            token_content(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                switch (token.name) {
                    case 'code-string': return [
                        token.found[0],
                        ...this.row_content(path),
                        token.found[token.found.length - 1],
                    ];
                    default: return [token.found];
                }
            }
            token_text(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                return token.found;
            }
            token_uri(path) {
                const uri = this.token_text(path);
                return this.uri_resolve(uri);
            }
            *view_find(check, path = []) {
                if (check(this, this.text())) {
                    yield [...path, this];
                }
            }
            find_pos(offset) {
                return this.find_token_pos([offset]);
            }
            find_token_pos([offset, ...path]) {
                for (const [index, token] of this.tokens(path).entries()) {
                    if (token.found.length >= offset) {
                        const token = this.Token([...path, index]);
                        return { token, offset };
                    }
                    else {
                        offset -= token.found.length;
                    }
                }
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "row_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_pos", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_token_pos", null);
        $$.$mol_text_code_line = $mol_text_code_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($mol_text_code_line, {
            display: 'block',
            position: 'relative',
            font: {
                family: 'monospace',
            },
            Numb: {
                textAlign: 'right',
                color: $mol_theme.shade,
                width: rem(3),
                margin: {
                    left: rem(-4),
                },
                display: 'inline-block',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                position: 'absolute',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_blob = ($node.buffer?.Blob ?? $mol_dom_context.Blob);
})($ || ($ = {}));

;
	($.$mol_icon_clipboard) = class $mol_icon_clipboard extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3";
		}
	};


;
"use strict";

;
	($.$mol_icon_clipboard_outline) = class $mol_icon_clipboard_outline extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z";
		}
	};


;
"use strict";

;
	($.$mol_button_copy) = class $mol_button_copy extends ($.$mol_button_minor) {
		text(){
			return (this.title());
		}
		text_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.text())], {"type": "text/plain"});
			return obj;
		}
		html(){
			return "";
		}
		html_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.html())], {"type": "text/html"});
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_clipboard_outline();
			return obj;
		}
		title(){
			return "";
		}
		blobs(){
			return [(this.text_blob()), (this.html_blob())];
		}
		data(){
			return {};
		}
		sub(){
			return [(this.Icon()), (this.title())];
		}
	};
	($mol_mem(($.$mol_button_copy.prototype), "text_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "html_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "Icon"));


;
"use strict";
var $;
(function ($) {
    const mapping = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '&': '&amp;',
    };
    function $mol_html_encode(text) {
        return text.replace(/[&<">]/gi, str => mapping[str]);
    }
    $.$mol_html_encode = $mol_html_encode;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button_copy extends $.$mol_button_copy {
            data() {
                return Object.fromEntries(this.blobs().map(blob => [blob.type, blob]));
            }
            html() {
                return $mol_html_encode(this.text());
            }
            attachments() {
                return [new ClipboardItem(this.data())];
            }
            click(event) {
                const cb = $mol_wire_sync(this.$.$mol_dom_context.navigator.clipboard);
                cb.writeText?.(this.text());
                cb.write?.(this.attachments());
                if (cb.writeText === undefined && cb.write === undefined) {
                    throw new Error("doesn't support copy to clipoard");
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "html", null);
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "attachments", null);
        $$.$mol_button_copy = $mol_button_copy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code) = class $mol_text_code extends ($.$mol_stack) {
		sidebar_showed(){
			return false;
		}
		render_visible_only(){
			return false;
		}
		row_numb(id){
			return 0;
		}
		row_theme(id){
			return "";
		}
		row_text(id){
			return "";
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		highlight(){
			return "";
		}
		Row(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => ((this.sidebar_showed()));
			(obj.numb) = () => ((this.row_numb(id)));
			(obj.theme) = () => ((this.row_theme(id)));
			(obj.text) = () => ((this.row_text(id)));
			(obj.syntax) = () => ((this.syntax()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		rows(){
			return [(this.Row("0"))];
		}
		Rows(){
			const obj = new this.$.$mol_list();
			(obj.render_visible_only) = () => ((this.render_visible_only()));
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		text_export(){
			return "";
		}
		Copy(){
			const obj = new this.$.$mol_button_copy();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_code_Copy_hint")));
			(obj.text) = () => ((this.text_export()));
			return obj;
		}
		attr(){
			return {...(super.attr()), "mol_text_code_sidebar_showed": (this.sidebar_showed())};
		}
		text(){
			return "";
		}
		text_lines(){
			return [];
		}
		find_pos(id){
			return null;
		}
		uri_base(){
			return "";
		}
		row_themes(){
			return [];
		}
		sub(){
			return [(this.Rows()), (this.Copy())];
		}
	};
	($mol_mem_key(($.$mol_text_code.prototype), "Row"));
	($mol_mem(($.$mol_text_code.prototype), "Rows"));
	($mol_mem(($.$mol_text_code.prototype), "Copy"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code extends $.$mol_text_code {
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            text_lines() {
                return (this.text() ?? '').split('\n');
            }
            rows() {
                return this.text_lines().map((_, index) => this.Row(index + 1));
            }
            row_text(index) {
                return this.text_lines()[index - 1];
            }
            row_numb(index) {
                return index;
            }
            find_pos(offset) {
                for (const [index, line] of this.text_lines().entries()) {
                    if (line.length >= offset) {
                        return this.Row(index + 1).find_pos(offset);
                    }
                    else {
                        offset -= line.length + 1;
                    }
                }
                return null;
            }
            sub() {
                return [
                    this.Rows(),
                    ...this.sidebar_showed() ? [this.Copy()] : []
                ];
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                try {
                    const url = new URL(uri, this.uri_base());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            text_export() {
                return this.text() + '\n';
            }
            row_theme(row) {
                return this.row_themes()[row - 1];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "text_lines", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "row_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "find_pos", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "uri_resolve", null);
        $$.$mol_text_code = $mol_text_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px } = $mol_style_unit;
        $mol_style_define($mol_text_code, {
            whiteSpace: 'pre-wrap',
            font: {
                family: 'monospace',
            },
            Rows: {
                padding: $mol_gap.text,
                minWidth: 0,
            },
            Row: {
                font: {
                    family: 'inherit',
                },
            },
            Copy: {
                alignSelf: 'flex-start',
                justifySelf: 'flex-start',
            },
            '@': {
                'mol_text_code_sidebar_showed': {
                    true: {
                        $mol_text_code_line: {
                            margin: {
                                left: rem(1.75),
                            },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_float) = class $mol_float extends ($.$mol_view) {
		style(){
			return {...(super.style()), "minHeight": "auto"};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: var(--mol_layer_float);\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n\tbackground: linear-gradient( var(--mol_theme_card), var(--mol_theme_card) ), var(--mol_theme_back);\n\tbox-shadow: 0 0 .5rem hsla(0,0%,0%,.25);\n}\n\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_grid) = class $mol_grid extends ($.$mol_view) {
		rows(){
			return [];
		}
		Table(){
			const obj = new this.$.$mol_grid_table();
			(obj.sub) = () => ((this.rows()));
			return obj;
		}
		head_cells(){
			return [];
		}
		cells(id){
			return [];
		}
		cell_content(id){
			return [];
		}
		cell_content_text(id){
			return (this.cell_content(id));
		}
		cell_content_number(id){
			return (this.cell_content(id));
		}
		col_head_content(id){
			return [];
		}
		cell_level(id){
			return 0;
		}
		cell_expanded(id, next){
			if(next !== undefined) return next;
			return false;
		}
		needle(){
			return "";
		}
		cell_value(id){
			return "";
		}
		Cell_dimmer(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.needle()));
			(obj.haystack) = () => ((this.cell_value(id)));
			return obj;
		}
		row_height(){
			return 32;
		}
		row_ids(){
			return [];
		}
		row_id(id){
			return null;
		}
		col_ids(){
			return [];
		}
		records(){
			return {};
		}
		record(id){
			return null;
		}
		hierarchy(){
			return null;
		}
		hierarchy_col(){
			return "";
		}
		minimal_width(){
			return 0;
		}
		sub(){
			return [(this.Head()), (this.Table())];
		}
		Head(){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.head_cells()));
			return obj;
		}
		Row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.minimal_height) = () => ((this.row_height()));
			(obj.minimal_width) = () => ((this.minimal_width()));
			(obj.cells) = () => ((this.cells(id)));
			return obj;
		}
		Cell(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		cell(id){
			return null;
		}
		Cell_text(id){
			const obj = new this.$.$mol_grid_cell();
			(obj.sub) = () => ((this.cell_content_text(id)));
			return obj;
		}
		Cell_number(id){
			const obj = new this.$.$mol_grid_number();
			(obj.sub) = () => ((this.cell_content_number(id)));
			return obj;
		}
		Col_head(id){
			const obj = new this.$.$mol_float();
			(obj.dom_name) = () => ("th");
			(obj.sub) = () => ((this.col_head_content(id)));
			return obj;
		}
		Cell_branch(id){
			const obj = new this.$.$mol_check_expand();
			(obj.level) = () => ((this.cell_level(id)));
			(obj.label) = () => ((this.cell_content(id)));
			(obj.expanded) = (next) => ((this.cell_expanded(id, next)));
			return obj;
		}
		Cell_content(id){
			return [(this.Cell_dimmer(id))];
		}
	};
	($mol_mem(($.$mol_grid.prototype), "Table"));
	($mol_mem_key(($.$mol_grid.prototype), "cell_expanded"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_dimmer"));
	($mol_mem(($.$mol_grid.prototype), "Head"));
	($mol_mem_key(($.$mol_grid.prototype), "Row"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_text"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_number"));
	($mol_mem_key(($.$mol_grid.prototype), "Col_head"));
	($mol_mem_key(($.$mol_grid.prototype), "Cell_branch"));
	($.$mol_grid_table) = class $mol_grid_table extends ($.$mol_list) {};
	($.$mol_grid_row) = class $mol_grid_row extends ($.$mol_view) {
		cells(){
			return [];
		}
		sub(){
			return (this.cells());
		}
	};
	($.$mol_grid_cell) = class $mol_grid_cell extends ($.$mol_view) {
		minimal_height(){
			return 40;
		}
	};
	($.$mol_grid_number) = class $mol_grid_number extends ($.$mol_grid_cell) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            cell_content_text(id) {
                return this.cell_content(id).map(val => typeof val === 'object' ? JSON.stringify(val) : val);
            }
            records() {
                return [];
            }
            record(id) {
                return this.records()[id];
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return true;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
            sub() {
                this.head_cells();
                this.rows();
                return super.sub();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/grid/grid.view.css", "[mol_grid] {\n\tdisplay: block;\n\tflex: 0 1 auto;\n\tposition: relative;\n\toverflow-x: auto;\n}\n\n[mol_grid_gap] {\n\tposition: absolute;\n\tpadding: .1px;\n\ttop: 0;\n\ttransform: translateZ(0);\n}\n\n[mol_grid_table] {\n\tborder-spacing: 0;\n\tdisplay: table-row-group;\n\tposition: relative;\n}\n\n[mol_grid_table] > * {\n\tdisplay: table-row;\n\ttransition: none;\n}\n\n[mol_grid_head] > *,\n[mol_grid_table] > * > * {\n\tdisplay: table-cell;\n\tpadding: var(--mol_gap_text);\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tbox-shadow: inset 2px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_row]:where(:first-child) > * {\n\tbox-shadow: inset 2px 0 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > * > *:where(:first-child) {\n\tbox-shadow: inset 0px 2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > * {\n\tbox-shadow: inset 2px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_head] > *:where(:first-child) {\n\tbox-shadow: inset 0px -2px 0 -1px var(--mol_theme_line);\n}\n\n[mol_grid_table] > [mol_grid_row]:where(:first-child) > *:where(:first-child) {\n\tbox-shadow: none;\n}\t\n\n[mol_grid_head] {\n\tdisplay: table-row;\n\ttransform: none !important;\n}\n\n/* [mol_grid_cell_number] {\n\ttext-align: right;\n} */\n\n[mol_grid_col_head] {\n\tfont-weight: inherit;\n\ttext-align: inherit;\n\tdisplay: table-cell;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_grid_cell_dimmer] {\n\tdisplay: inline-block;\n\tvertical-align: inherit;\n}\n");
})($ || ($ = {}));

;
	($.$mol_image) = class $mol_image extends ($.$mol_view) {
		uri(){
			return "";
		}
		title(){
			return "";
		}
		loading(){
			return "lazy";
		}
		decoding(){
			return "async";
		}
		cors(){
			return null;
		}
		natural_width(){
			return 0;
		}
		natural_height(){
			return 0;
		}
		load(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "img";
		}
		attr(){
			return {
				...(super.attr()), 
				"src": (this.uri()), 
				"title": (this.hint()), 
				"alt": (this.title()), 
				"loading": (this.loading()), 
				"decoding": (this.decoding()), 
				"crossOrigin": (this.cors()), 
				"width": (this.natural_width()), 
				"height": (this.natural_height())
			};
		}
		event(){
			return {"load": (next) => (this.load(next))};
		}
		minimal_width(){
			return 16;
		}
		minimal_height(){
			return 16;
		}
	};
	($mol_mem(($.$mol_image.prototype), "load"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_image extends $.$mol_image {
            natural_width(next) {
                const dom = this.dom_node();
                if (dom.naturalWidth)
                    return dom.naturalWidth;
                const found = this.uri().match(/\bwidth=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            natural_height(next) {
                const dom = this.dom_node();
                if (dom.naturalHeight)
                    return dom.naturalHeight;
                const found = this.uri().match(/\bheight=(\d+)/);
                return found ? Number(found[1]) : null;
            }
            load() {
                this.natural_width(null);
                this.natural_height(null);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_width", null);
        __decorate([
            $mol_mem
        ], $mol_image.prototype, "natural_height", null);
        $$.$mol_image = $mol_image;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/image/image.view.css", "[mol_image] {\n\tborder-radius: var(--mol_gap_round);\n\toverflow: hidden;\n\tflex: 0 1 auto;\n\tmax-width: 100%;\n\tobject-fit: cover;\n\theight: fit-content;\n}\n");
})($ || ($ = {}));

;
	($.$mol_link_iconed) = class $mol_link_iconed extends ($.$mol_link) {
		icon(){
			return "";
		}
		Icon(){
			const obj = new this.$.$mol_image();
			(obj.uri) = () => ((this.icon()));
			(obj.title) = () => ("");
			return obj;
		}
		title(){
			return (this.uri());
		}
		sub(){
			return [(this.Icon())];
		}
		content(){
			return [(this.title())];
		}
		host(){
			return "";
		}
	};
	($mol_mem(($.$mol_link_iconed.prototype), "Icon"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link_iconed extends $.$mol_link_iconed {
            icon() {
                return `https://favicon.yandex.net/favicon/${this.host()}?color=0,0,0,0&size=32&stub=1`;
            }
            host() {
                const base = this.$.$mol_state_arg.href();
                const url = new URL(this.uri(), base);
                return url.hostname;
            }
            title() {
                const uri = this.uri();
                const host = this.host();
                const suffix = (host ? uri.split(this.host(), 2)[1] : uri)?.replace(/^[\/\?#!]+/, '');
                return decodeURIComponent(suffix || host).replace(/^\//, ' ');
            }
            sub() {
                return [
                    ...this.host() ? [this.Icon()] : [],
                    ...this.content() ? [' ', ...this.content()] : [],
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "icon", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "host", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "title", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "sub", null);
        $$.$mol_link_iconed = $mol_link_iconed;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/link/iconed/iconed.view.css", "[mol_link_iconed] {\n\talign-items: baseline;\n\tdisplay: inline-flex;\n\tpadding: var(--mol_gap_text);\n}\n\n[mol_link_iconed_icon] {\n\tbox-shadow: none;\n\theight: 1.5em;\n\twidth: 1em;\n\tflex: 0 0 auto;\n\tdisplay: inline-block;\n\talign-self: normal;\n\tvertical-align: top;\n\tborder-radius: 0;\n\tobject-fit: scale-down;\n\topacity: .75;\n}\n\n[mol_theme=\"$mol_theme_dark\"] [mol_link_iconed_icon] {\n\tfilter: var(--mol_theme_image);\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_youtube) = class $mol_icon_youtube extends ($.$mol_icon) {
		path(){
			return "M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z";
		}
	};


;
"use strict";

;
	($.$mol_embed_service) = class $mol_embed_service extends ($.$mol_check) {
		active(next){
			if(next !== undefined) return next;
			return false;
		}
		title(){
			return "";
		}
		video_preview(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.video_preview()));
			return obj;
		}
		Hint(){
			const obj = new this.$.$mol_icon_youtube();
			return obj;
		}
		video_embed(){
			return "";
		}
		Frame(){
			const obj = new this.$.$mol_frame();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.video_embed()));
			return obj;
		}
		uri(){
			return "";
		}
		video_id(){
			return "";
		}
		checked(next){
			return (this.active(next));
		}
		sub(){
			return [
				(this.Image()), 
				(this.Hint()), 
				(this.Frame())
			];
		}
	};
	($mol_mem(($.$mol_embed_service.prototype), "active"));
	($mol_mem(($.$mol_embed_service.prototype), "Image"));
	($mol_mem(($.$mol_embed_service.prototype), "Hint"));
	($mol_mem(($.$mol_embed_service.prototype), "Frame"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_service extends $.$mol_embed_service {
            sub() {
                return this.active()
                    ? [this.Frame()]
                    : [this.Image(), this.Hint()];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_service.prototype, "sub", null);
        $$.$mol_embed_service = $mol_embed_service;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/service/service.view.css", "[mol_embed_service] {\n\tpadding: 0;\n\tmax-width: 100%;\n}\n\n[mol_embed_service_image] {\n\tflex: auto 1 1;\n\twidth: 100vw;\n}\n\n[mol_embed_service_frame] {\n\twidth: 100vw;\n}\n\n[mol_embed_service_hint] {\n\tposition: absolute;\n    left: 50%;\n    top: 50%;\n    width: 50%;\n    height: 50%;\n    opacity: 0.3;\n    transform: translate(-50%, -50%);\n}\n\n[mol_embed_service]:hover [mol_embed_service_hint] {\n\topacity: .6;\n}\n");
})($ || ($ = {}));

;
	($.$mol_embed_youtube) = class $mol_embed_youtube extends ($.$mol_embed_service) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_youtube extends $.$mol_embed_youtube {
            video_embed() {
                return `https://www.youtube.com/embed/${encodeURIComponent(this.video_id())}?autoplay=1&loop=1`;
            }
            video_id() {
                return this.uri().match(/^https\:\/\/www\.youtube\.com\/(?:embed\/|shorts\/|watch\?v=)([^\/&?#]+)/)?.[1]
                    ?? this.uri().match(/^https\:\/\/youtu\.be\/([^\/&?#]+)/)?.[1]
                    ?? 'about:blank';
            }
            video_preview() {
                return `https://i.ytimg.com/vi/${this.video_id()}/sddefault.jpg`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_preview", null);
        $$.$mol_embed_youtube = $mol_embed_youtube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_rutube) = class $mol_embed_rutube extends ($.$mol_embed_service) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_rutube extends $.$mol_embed_rutube {
            video_embed() {
                return `https://rutube.ru/play/embed/${encodeURIComponent(this.video_id())}`;
            }
            video_id() {
                return this.uri().match(/^https:\/\/rutube.ru\/video\/([^\/&?#]+)/)?.[1] ?? 'about:blank';
            }
            video_preview() {
                return `https://rutube.ru/api/video/${this.video_id()}/thumbnail/?redirect=1`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_rutube.prototype, "video_preview", null);
        $$.$mol_embed_rutube = $mol_embed_rutube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_vklive) = class $mol_embed_vklive extends ($.$mol_embed_service) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_vklive extends $.$mol_embed_vklive {
            video_embed() {
                return `https://live.vkvideo.ru/app/embed/${this.channel_id()}/${this.video_id()}`;
            }
            channel_id() {
                return this.uri().match(/^https:\/\/live\.vkvideo\.ru\/([^\/&?#]+)/)?.[1] ?? '';
            }
            video_id() {
                return this.uri().match(/^https:\/\/live\.vkvideo\.ru\/[^\/&?#]+\/record\/([^\/&?#]+)/)?.[1] ?? '';
            }
            video_preview() {
                return `https://images.live.vkvideo.ru/public_video_stream/record/${this.video_id()}/preview`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "channel_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_vklive.prototype, "video_preview", null);
        $$.$mol_embed_vklive = $mol_embed_vklive;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_embed_any) = class $mol_embed_any extends ($.$mol_view) {
		title(){
			return "";
		}
		uri(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Object(){
			const obj = new this.$.$mol_embed_native();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Youtube(){
			const obj = new this.$.$mol_embed_youtube();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Rutube(){
			const obj = new this.$.$mol_embed_rutube();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		Vklive(){
			const obj = new this.$.$mol_embed_vklive();
			(obj.title) = () => ((this.title()));
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
	};
	($mol_mem(($.$mol_embed_any.prototype), "Image"));
	($mol_mem(($.$mol_embed_any.prototype), "Object"));
	($mol_mem(($.$mol_embed_any.prototype), "Youtube"));
	($mol_mem(($.$mol_embed_any.prototype), "Rutube"));
	($mol_mem(($.$mol_embed_any.prototype), "Vklive"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_any extends $.$mol_embed_any {
            type() {
                try {
                    const uri = this.uri();
                    if (/\b(png|gif|jpg|jpeg|jfif|webp|svg)\b/.test(uri))
                        return 'image';
                    if (/^https:\/\/www\.youtube\.com\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/youtu\.be\//.test(uri))
                        return 'youtube';
                    if (/^https:\/\/rutube\.ru\//.test(uri))
                        return 'rutube';
                    if (/^https:\/\/live\.vkvideo\.ru\//.test(uri))
                        return 'vklive';
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 'image';
                }
                return 'object';
            }
            sub() {
                switch (this.type()) {
                    case 'image': return [this.Image()];
                    case 'youtube': return [this.Youtube()];
                    case 'rutube': return [this.Rutube()];
                    case 'vklive': return [this.Vklive()];
                    default: return [this.Object()];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "type", null);
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "sub", null);
        $$.$mol_embed_any = $mol_embed_any;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text) = class $mol_text extends ($.$mol_list) {
		auto_scroll(){
			return null;
		}
		block_content(id){
			return [];
		}
		uri_resolve(id){
			return "";
		}
		quote_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		list_type(id){
			return "-";
		}
		list_text(id){
			return "";
		}
		header_level(id){
			return 1;
		}
		header_arg(id){
			return {};
		}
		pre_text(id){
			return "";
		}
		pre_themes(id){
			return [];
		}
		code_sidebar_showed(){
			return true;
		}
		pre_sidebar_showed(){
			return (this.code_sidebar_showed());
		}
		table_head_cells(id){
			return [];
		}
		table_rows(id){
			return [];
		}
		table_cells(id){
			return [];
		}
		table_cell_text(id){
			return "";
		}
		grid_rows(id){
			return [];
		}
		grid_cells(id){
			return [];
		}
		grid_cell_text(id){
			return "";
		}
		line_text(id){
			return "";
		}
		line_type(id){
			return "";
		}
		line_content(id){
			return [];
		}
		code_syntax(){
			return null;
		}
		link_uri(id){
			return "";
		}
		link_host(id){
			return "";
		}
		spoiler_label(id){
			return "";
		}
		Spoiler_label(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.spoiler_label(id)));
			return obj;
		}
		spoiler_content(id){
			return "";
		}
		Spoiler_content(id){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.spoiler_content(id)));
			return obj;
		}
		uri_base(){
			return "";
		}
		text(){
			return "";
		}
		param(){
			return "";
		}
		flow_tokens(){
			return [];
		}
		block_text(id){
			return "";
		}
		auto(){
			return [(this.auto_scroll())];
		}
		Paragraph(id){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
		Quote(id){
			const obj = new this.$.$mol_text();
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.quote_text(id)));
			(obj.highlight) = () => ((this.highlight()));
			(obj.auto_scroll) = () => (null);
			return obj;
		}
		List(id){
			const obj = new this.$.$mol_text_list();
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.type) = () => ((this.list_type(id)));
			(obj.text) = () => ((this.list_text(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		item_index(id){
			return 0;
		}
		Header(id){
			const obj = new this.$.$mol_text_header();
			(obj.minimal_height) = () => (40);
			(obj.level) = () => ((this.header_level(id)));
			(obj.content) = () => ((this.block_content(id)));
			(obj.arg) = () => ((this.header_arg(id)));
			return obj;
		}
		Pre(id){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.pre_text(id)));
			(obj.row_themes) = () => ((this.pre_themes(id)));
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.sidebar_showed) = () => ((this.pre_sidebar_showed()));
			return obj;
		}
		Cut(id){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("hr");
			return obj;
		}
		Table(id){
			const obj = new this.$.$mol_grid();
			(obj.head_cells) = () => ((this.table_head_cells(id)));
			(obj.rows) = () => ((this.table_rows(id)));
			return obj;
		}
		Table_row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.table_cells(id)));
			return obj;
		}
		Table_cell(id){
			const obj = new this.$.$mol_text();
			(obj.auto_scroll) = () => (null);
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.table_cell_text(id)));
			return obj;
		}
		Grid(id){
			const obj = new this.$.$mol_grid();
			(obj.rows) = () => ((this.grid_rows(id)));
			return obj;
		}
		Grid_row(id){
			const obj = new this.$.$mol_grid_row();
			(obj.cells) = () => ((this.grid_cells(id)));
			return obj;
		}
		Grid_cell(id){
			const obj = new this.$.$mol_text();
			(obj.auto_scroll) = () => (null);
			(obj.highlight) = () => ((this.highlight()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.text) = () => ((this.grid_cell_text(id)));
			return obj;
		}
		String(id){
			const obj = new this.$.$mol_dimmer();
			(obj.dom_name) = () => ("span");
			(obj.needle) = () => ((this.highlight()));
			(obj.haystack) = () => ((this.line_text(id)));
			return obj;
		}
		Span(id){
			const obj = new this.$.$mol_text_span();
			(obj.dom_name) = () => ("span");
			(obj.type) = () => ((this.line_type(id)));
			(obj.sub) = () => ((this.line_content(id)));
			return obj;
		}
		Code_line(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => (false);
			(obj.highlight) = () => ((this.highlight()));
			(obj.text) = () => ((this.line_text(id)));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.syntax) = () => ((this.code_syntax()));
			return obj;
		}
		Link(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ((this.line_content(id)));
			return obj;
		}
		Link_http(id){
			const obj = new this.$.$mol_link_iconed();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.content) = () => ([(this.link_host(id))]);
			return obj;
		}
		Embed(id){
			const obj = new this.$.$mol_embed_any();
			(obj.uri) = () => ((this.link_uri(id)));
			(obj.title) = () => ((this.line_text(id)));
			return obj;
		}
		Spoiler(id){
			const obj = new this.$.$mol_expander();
			(obj.label) = () => ([(this.Spoiler_label(id))]);
			(obj.content) = () => ([(this.Spoiler_content(id))]);
			return obj;
		}
	};
	($mol_mem_key(($.$mol_text.prototype), "Spoiler_label"));
	($mol_mem_key(($.$mol_text.prototype), "Spoiler_content"));
	($mol_mem_key(($.$mol_text.prototype), "Paragraph"));
	($mol_mem_key(($.$mol_text.prototype), "Quote"));
	($mol_mem_key(($.$mol_text.prototype), "List"));
	($mol_mem_key(($.$mol_text.prototype), "Header"));
	($mol_mem_key(($.$mol_text.prototype), "Pre"));
	($mol_mem_key(($.$mol_text.prototype), "Cut"));
	($mol_mem_key(($.$mol_text.prototype), "Table"));
	($mol_mem_key(($.$mol_text.prototype), "Table_row"));
	($mol_mem_key(($.$mol_text.prototype), "Table_cell"));
	($mol_mem_key(($.$mol_text.prototype), "Grid"));
	($mol_mem_key(($.$mol_text.prototype), "Grid_row"));
	($mol_mem_key(($.$mol_text.prototype), "Grid_cell"));
	($mol_mem_key(($.$mol_text.prototype), "String"));
	($mol_mem_key(($.$mol_text.prototype), "Span"));
	($mol_mem_key(($.$mol_text.prototype), "Code_line"));
	($mol_mem_key(($.$mol_text.prototype), "Link"));
	($mol_mem_key(($.$mol_text.prototype), "Link_http"));
	($mol_mem_key(($.$mol_text.prototype), "Embed"));
	($mol_mem_key(($.$mol_text.prototype), "Spoiler"));
	($.$mol_text_header) = class $mol_text_header extends ($.$mol_paragraph) {
		arg(){
			return {};
		}
		content(){
			return [];
		}
		Link(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.arg()));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_header_Link_hint")));
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		level(){
			return 1;
		}
		sub(){
			return [(this.Link())];
		}
	};
	($mol_mem(($.$mol_text_header.prototype), "Link"));
	($.$mol_text_span) = class $mol_text_span extends ($.$mol_paragraph) {
		type(){
			return "";
		}
		dom_name(){
			return "span";
		}
		attr(){
			return {...(super.attr()), "mol_text_type": (this.type())};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text extends $.$mol_text {
            flow_tokens() {
                const tokens = [];
                this.$.$mol_syntax2_md_flow.tokenize(this.text(), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            block_type(index) {
                return this.flow_tokens()[index].name;
            }
            rows() {
                return this.flow_tokens().map(({ name }, index) => {
                    switch (name) {
                        case 'quote': return this.Quote(index);
                        case 'spoiler': return this.Spoiler(index);
                        case 'header': return this.Header(index);
                        case 'list': return this.List(index);
                        case 'code': return this.Pre(index);
                        case 'code-indent': return this.Pre(index);
                        case 'table': return this.Table(index);
                        case 'grid': return this.Grid(index);
                        case 'cut': return this.Cut(index);
                        default: return this.Paragraph(index);
                    }
                });
            }
            param() {
                return this.toString().replace(/^.*?[\)>]\./, '').replace(/[(<>)]/g, '');
            }
            header_level(index) {
                return this.flow_tokens()[index].chunks[0].length;
            }
            header_arg(index) {
                return {
                    [this.param()]: this.block_text(index)
                };
            }
            list_type(index) {
                return this.flow_tokens()[index].chunks[1] ?? '';
            }
            item_index(index) {
                return this.flow_tokens().slice(0, index).filter(token => token.name === 'block').length + 1;
            }
            pre_text(index) {
                const token = this.flow_tokens()[index];
                return (token.chunks[2] ?? token.chunks[0].replace(/^(\t| (?:\+\+|--|\*\*|  ) )/gm, '')).replace(/[\n\r]*$/, '');
            }
            pre_themes(index) {
                const token = this.flow_tokens()[index];
                const names = {
                    ' ** ': '$mol_theme_accent',
                    ' ++ ': '$mol_theme_current',
                    ' -- ': '$mol_theme_special',
                };
                return token.chunks[0].split('\n')
                    .map(line => names[line.match(/^ (?:\+\+|--|\*\*|  ) /gm)?.[0] ?? ''] ?? null);
            }
            quote_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[>"] /mg, '');
            }
            list_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^([-*+]|(?:\d+[\.\)])+) ?/mg, '').replace(/^  ?/mg, '');
            }
            cell_content(indexBlock) {
                return this.flow_tokens()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(row => row && !/\|--/.test(row))
                    .map((row, rowId) => {
                    return row.split(/\|/g)
                        .filter(cell => cell)
                        .map((cell, cellId) => cell.trim());
                });
            }
            table_rows(blockId) {
                return this.cell_content(blockId)
                    .slice(1)
                    .map((row, rowId) => this.Table_row({ block: blockId, row: rowId + 1 }));
            }
            table_head_cells(blockId) {
                return this.cell_content(blockId)[0]
                    .map((cell, cellId) => this.Table_cell({ block: blockId, row: 0, cell: cellId }));
            }
            table_cells(id) {
                return this.cell_content(id.block)[id.row]
                    .map((cell, cellId) => this.Table_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            table_cell_text(id) {
                return this.cell_content(id.block)[id.row][id.cell];
            }
            grid_content(indexBlock) {
                return [...this.flow_tokens()[indexBlock].chunks[0].match(/(?:^! .*?$\r?\n?)+(?:^ +! .*?$\r?\n?)*/gm)]
                    .map((row, rowId) => {
                    const cells = [];
                    for (const line of row.trim().split(/\r?\n/)) {
                        const [_, indent, content] = /^( *)! (.*)/.exec(line);
                        const col = Math.ceil(indent.length / 2);
                        cells[col] = (cells[col] ? cells[col] + '\n' : '') + content;
                    }
                    return cells;
                });
            }
            grid_rows(blockId) {
                return this.grid_content(blockId)
                    .map((row, rowId) => this.Grid_row({ block: blockId, row: rowId }));
            }
            grid_cells(id) {
                return this.grid_content(id.block)[id.row]
                    .map((cell, cellId) => this.Grid_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            grid_cell_text(id) {
                return this.grid_content(id.block)[id.row][id.cell];
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_base_abs() {
                return new URL(this.uri_base(), $mol_dom_context.document.location.href);
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                if (/^#\!/.test(uri)) {
                    const params = {};
                    for (const chunk of uri.slice(2).split(this.$.$mol_state_arg.separator)) {
                        if (!chunk)
                            continue;
                        const vals = chunk.split('=').map(decodeURIComponent);
                        params[vals.shift()] = vals.join('=');
                    }
                    return this.$.$mol_state_arg.link(params);
                }
                try {
                    const url = new URL(uri, this.uri_base_abs());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            code_syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            block_text(index) {
                const token = this.flow_tokens()[index];
                switch (token.name) {
                    case 'header': return token.chunks[2];
                    default: return token.chunks[0];
                }
            }
            block_content(index) {
                return this.line_content([index]);
            }
            line_tokens(path) {
                const tokens = [];
                this.$.$mol_syntax2_md_line.tokenize(this.line_text(path), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            line_token(path) {
                const tokens = this.line_tokens(path.slice(0, path.length - 1));
                return tokens[path[path.length - 1]];
            }
            line_type(path) {
                return this.line_token(path).name;
            }
            line_text(path) {
                if (path.length === 1)
                    return this.block_text(path[0]);
                const { name, found, chunks } = this.line_token(path);
                switch (name) {
                    case 'link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    case 'text-link': return chunks[0] || chunks[1].replace(/^.*?\/\/|\/.*$/g, '');
                    default: return (chunks[0] || chunks[1] || chunks[2]) ?? found;
                }
            }
            line_content(path) {
                return this.line_tokens(path).map(({ name, chunks }, index) => {
                    const path2 = [...path, index];
                    switch (name) {
                        case 'embed': return this.Embed(path2);
                        case 'link': return this.Link(path2);
                        case 'text-link-http': return this.Link_http(path2);
                        case 'text-link': return this.Link(path2);
                        case 'image-link': return this.Embed(path2);
                        case 'code': return this.Code_line(path2);
                        case '': return this.String(path2);
                        default: return this.Span(path2);
                    }
                });
            }
            link_uri(path) {
                const token = this.line_token(path);
                const uri = this.uri_resolve(token.chunks[1] ?? token.found);
                if (!uri)
                    throw new Error('Bad link');
                return uri;
            }
            link_host(path) {
                return this.link_uri(path).replace(/^.*?\/\/|\/.*$/g, '');
            }
            auto_scroll() {
                for (const [index, token] of this.flow_tokens().entries()) {
                    if (token.name !== 'header')
                        continue;
                    const header = this.Header(index);
                    if (!header.Link().current())
                        continue;
                    new $mol_after_tick(() => this.ensure_visible(header));
                }
            }
            spoiler_rows(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^[\?] /mg, '').split('\n');
            }
            spoiler_label(index) {
                return this.spoiler_rows(index)[0];
            }
            spoiler_content(index) {
                return this.spoiler_rows(index).slice(1).join('\n');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "flow_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_type", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "rows", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "param", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_level", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_arg", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_themes", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "quote_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "list_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "cell_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_head_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cell_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "grid_cell_text", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "uri_base_abs", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "uri_resolve", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_token", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_host", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "auto_scroll", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_label", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "spoiler_content", null);
        $$.$mol_text = $mol_text;
        class $mol_text_header extends $.$mol_text_header {
            dom_name() {
                return 'h' + this.level();
            }
        }
        $$.$mol_text_header = $mol_text_header;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/text/text.view.css", "[mol_text] {\n\tline-height: 1.5em;\n\tbox-sizing: border-box;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 0 0 auto;\n\ttab-size: 4;\n}\n\n[mol_text_paragraph] {\n\tpadding: var(--mol_gap_text);\n\toverflow: auto;\n\toverflow-x: overlay;\n\tmax-width: 100%;\n\tdisplay: block;\n\tmax-width: 60rem;\n\tbreak-inside: avoid;\n}\n\n[mol_text_spoiler_label_paragraph] {\n\tpadding: 0;\n}\n\n[mol_text_span] {\n\tdisplay: inline;\n}\n\n[mol_text_string] {\n\tdisplay: inline;\n\tflex: 0 1 auto;\n\twhite-space: normal;\n}\n\n[mol_text_quote] {\n\tmargin: var(--mol_gap_block);\n\tpadding: var(--mol_gap_block);\n\tbackground: var(--mol_theme_card);\n\tbox-shadow: 0 0 0 1px var(--mol_theme_back);\n\tbreak-inside: avoid;\n}\n\n[mol_text_header] {\n\tdisplay: block;\n\ttext-shadow: 0 0;\n\tfont-weight: normal;\n\tbreak-after: avoid;\n}\n\n* + [mol_text_header] {\n\tmargin-top: 0.75rem;\n}\n\nh1[mol_text_header] {\n\tfont-size: 1.5rem;\n}\n\nh2[mol_text_header] {\n\tfont-size: 1.5rem;\n\tfont-style: italic;\n}\n\nh3[mol_text_header] {\n\tfont-size: 1.25rem;\n}\n\nh4[mol_text_header] {\n\tfont-size: 1.25em;\n\tfont-style: italic;\n}\n\nh5[mol_text_header] {\n\tfont-size: 1rem;\n}\n\nh6[mol_text_header] {\n\tfont-size: 1rem;\n\tfont-style: italic;\n}\n\n[mol_text_header_link] {\n\tcolor: inherit;\n}\n\n[mol_text_table] {\n\tbreak-inside: avoid;\n}\n\n[mol_text_table_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: baseline;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_grid] {\n\tbreak-inside: avoid;\n}\n\n[mol_text_grid_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: top;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_cut] {\n\tborder: none;\n\twidth: 100%;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_text_link_http],\n[mol_text_link] {\n\tpadding: 0;\n\tdisplay: inline;\n\twhite-space: nowrap;\n}\n\n[mol_text_link_icon] + [mol_text_embed] {\n\tmargin-left: -1.5rem;\n}\n\n[mol_text_embed_youtube] {\n\tdisplay: inline;\n}\n\n[mol_text_embed_youtube_image],\n[mol_text_embed_youtube_frame],\n[mol_text_embed_object] {\n\tobject-fit: contain;\n\tobject-position: center;\n\twidth: 100vw;\n\tmax-height: calc( 100vh - 6rem );\n}\n[mol_text_embed_object_fallback] {\n\tpadding: 0;\n}\n[mol_text_embed_image] {\n\tobject-fit: contain;\n\tobject-position: center;\n\tdisplay: inline;\n\t/* max-height: calc( 100vh - 6rem ); */\n\tvertical-align: top;\n}\n\n[mol_text_pre] {\n\twhite-space: pre;\n\toverflow-x: auto;\n\toverflow-x: overlay;\n\ttab-size: 2;\n\tbreak-inside: avoid;\n}\n\n[mol_text_code_line] {\n\tdisplay: inline-block;\n}\n\n[mol_text_type=\"strong\"] {\n\ttext-shadow: 0 0;\n\tfilter: contrast(1.5);\n}\n\n[mol_text_type=\"emphasis\"] {\n\tfont-style: italic;\n}\n\n[mol_text_type=\"insert\"] {\n\tcolor: var(--mol_theme_special);\n}\n\n[mol_text_type=\"delete\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"remark\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"quote\"] {\n\tfont-style: italic;\n}\n");
})($ || ($ = {}));

;
	($.$mol_text_list) = class $mol_text_list extends ($.$mol_text) {
		type(){
			return "";
		}
		auto_scroll(){
			return null;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_type": (this.type())};
		}
		Paragraph(id){
			const obj = new this.$.$mol_text_list_item();
			(obj.index) = () => ((this.item_index(id)));
			(obj.sub) = () => ((this.block_content(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_text_list.prototype), "Paragraph"));
	($.$mol_text_list_item) = class $mol_text_list_item extends ($.$mol_paragraph) {
		index(){
			return 0;
		}
		attr(){
			return {...(super.attr()), "mol_text_list_item_index": (this.index())};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/list/list.view.css", "[mol_text_list] {\r\n\tpadding-left: 1.75rem;\r\n}\r\n\r\n[mol_text_list_item] {\r\n\tcontain: none;\r\n\tdisplay: list-item;\r\n}\r\n\r\n[mol_text_list_item]::before {\r\n\tcontent: attr( mol_text_list_item_index ) \".\";\r\n\twidth: 1.25rem;\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\tmargin-left: -1.75rem;\r\n\ttext-align: end;\r\n}\r\n\r\n[mol_text_list_type=\"-\"] > [mol_text_list_item]::before,\r\n[mol_text_list_type=\"*\"] > [mol_text_list_item]::before {\r\n\tcontent: \"•\";\r\n}\r\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_app_demo_readme) = class $mol_app_demo_readme extends ($.$mol_page) {
		source_link(){
			return "";
		}
		source_hint(){
			return (this.$.$mol_locale.text("$mol_app_demo_readme_source_hint"));
		}
		Source_link(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ((this.source_link()));
			(obj.hint) = () => ((this.source_hint()));
			return obj;
		}
		Close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		close(next){
			if(next !== undefined) return next;
			return null;
		}
		Close(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_app_demo_readme_Close_hint")));
			(obj.sub) = () => ([(this.Close_icon())]);
			(obj.click) = (next) => ((this.close(next)));
			return obj;
		}
		readme(){
			return "";
		}
		uri_base(next){
			if(next !== undefined) return next;
			return "";
		}
		Not_found_caption(){
			return (this.$.$mol_locale.text("$mol_app_demo_readme_Not_found_caption"));
		}
		readme_link_template(){
			return "https://raw.githubusercontent.com/{repo}/HEAD/{module}/readme.md";
		}
		source_link_template(){
			return "https://github.com/{repo}/tree/HEAD/{module}";
		}
		repo(){
			return "";
		}
		module(){
			return [];
		}
		title(){
			return (this.$.$mol_locale.text("$mol_app_demo_readme_title"));
		}
		opened(next){
			if(next !== undefined) return next;
			return false;
		}
		tools(){
			return [(this.Source_link()), (this.Close())];
		}
		Readme(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.readme()));
			(obj.uri_base) = () => ((this.uri_base()));
			return obj;
		}
		Not_found(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Not_found_caption())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_app_demo_readme.prototype), "Source_link"));
	($mol_mem(($.$mol_app_demo_readme.prototype), "Close_icon"));
	($mol_mem(($.$mol_app_demo_readme.prototype), "close"));
	($mol_mem(($.$mol_app_demo_readme.prototype), "Close"));
	($mol_mem(($.$mol_app_demo_readme.prototype), "uri_base"));
	($mol_mem(($.$mol_app_demo_readme.prototype), "opened"));
	($mol_mem(($.$mol_app_demo_readme.prototype), "Readme"));
	($mol_mem(($.$mol_app_demo_readme.prototype), "Not_found"));


;
"use strict";
var $;
(function ($) {
    let $mol_rest_code;
    (function ($mol_rest_code) {
        $mol_rest_code[$mol_rest_code["Continue"] = 100] = "Continue";
        $mol_rest_code[$mol_rest_code["Switching protocols"] = 101] = "Switching protocols";
        $mol_rest_code[$mol_rest_code["Processing"] = 102] = "Processing";
        $mol_rest_code[$mol_rest_code["OK"] = 200] = "OK";
        $mol_rest_code[$mol_rest_code["Created"] = 201] = "Created";
        $mol_rest_code[$mol_rest_code["Accepted"] = 202] = "Accepted";
        $mol_rest_code[$mol_rest_code["Non-Authoritative Information"] = 203] = "Non-Authoritative Information";
        $mol_rest_code[$mol_rest_code["No Content"] = 204] = "No Content";
        $mol_rest_code[$mol_rest_code["Reset Content"] = 205] = "Reset Content";
        $mol_rest_code[$mol_rest_code["Partial Content"] = 206] = "Partial Content";
        $mol_rest_code[$mol_rest_code["Multi Status"] = 207] = "Multi Status";
        $mol_rest_code[$mol_rest_code["Already Reported"] = 208] = "Already Reported";
        $mol_rest_code[$mol_rest_code["IM Used"] = 226] = "IM Used";
        $mol_rest_code[$mol_rest_code["Multiple Choices"] = 300] = "Multiple Choices";
        $mol_rest_code[$mol_rest_code["Moved Permanently"] = 301] = "Moved Permanently";
        $mol_rest_code[$mol_rest_code["Found"] = 302] = "Found";
        $mol_rest_code[$mol_rest_code["See Other"] = 303] = "See Other";
        $mol_rest_code[$mol_rest_code["Not Modified"] = 304] = "Not Modified";
        $mol_rest_code[$mol_rest_code["Use Proxy"] = 305] = "Use Proxy";
        $mol_rest_code[$mol_rest_code["Temporary Redirect"] = 307] = "Temporary Redirect";
        $mol_rest_code[$mol_rest_code["Bad Request"] = 400] = "Bad Request";
        $mol_rest_code[$mol_rest_code["Unauthorized"] = 401] = "Unauthorized";
        $mol_rest_code[$mol_rest_code["Payment Required"] = 402] = "Payment Required";
        $mol_rest_code[$mol_rest_code["Forbidden"] = 403] = "Forbidden";
        $mol_rest_code[$mol_rest_code["Not Found"] = 404] = "Not Found";
        $mol_rest_code[$mol_rest_code["Method Not Allowed"] = 405] = "Method Not Allowed";
        $mol_rest_code[$mol_rest_code["Not Acceptable"] = 406] = "Not Acceptable";
        $mol_rest_code[$mol_rest_code["Proxy Authentication Required"] = 407] = "Proxy Authentication Required";
        $mol_rest_code[$mol_rest_code["Request Timeout"] = 408] = "Request Timeout";
        $mol_rest_code[$mol_rest_code["Conflict"] = 409] = "Conflict";
        $mol_rest_code[$mol_rest_code["Gone"] = 410] = "Gone";
        $mol_rest_code[$mol_rest_code["Length Required"] = 411] = "Length Required";
        $mol_rest_code[$mol_rest_code["Precondition Failed"] = 412] = "Precondition Failed";
        $mol_rest_code[$mol_rest_code["Request Entity Too Large"] = 413] = "Request Entity Too Large";
        $mol_rest_code[$mol_rest_code["Request URI Too Long"] = 414] = "Request URI Too Long";
        $mol_rest_code[$mol_rest_code["Unsupported Media Type"] = 415] = "Unsupported Media Type";
        $mol_rest_code[$mol_rest_code["Requested Range Not Satisfiable"] = 416] = "Requested Range Not Satisfiable";
        $mol_rest_code[$mol_rest_code["Expectation Failed"] = 417] = "Expectation Failed";
        $mol_rest_code[$mol_rest_code["Teapot"] = 418] = "Teapot";
        $mol_rest_code[$mol_rest_code["Unprocessable Entity"] = 422] = "Unprocessable Entity";
        $mol_rest_code[$mol_rest_code["Locked"] = 423] = "Locked";
        $mol_rest_code[$mol_rest_code["Failed Dependency"] = 424] = "Failed Dependency";
        $mol_rest_code[$mol_rest_code["Upgrade Required"] = 426] = "Upgrade Required";
        $mol_rest_code[$mol_rest_code["Precondition Required"] = 428] = "Precondition Required";
        $mol_rest_code[$mol_rest_code["Too Many Requests"] = 429] = "Too Many Requests";
        $mol_rest_code[$mol_rest_code["Request Header Fields Too Large"] = 431] = "Request Header Fields Too Large";
        $mol_rest_code[$mol_rest_code["Unavailable For Legal Reasons"] = 451] = "Unavailable For Legal Reasons";
        $mol_rest_code[$mol_rest_code["Internal Server Error"] = 500] = "Internal Server Error";
        $mol_rest_code[$mol_rest_code["Not Implemented"] = 501] = "Not Implemented";
        $mol_rest_code[$mol_rest_code["Bad Gateway"] = 502] = "Bad Gateway";
        $mol_rest_code[$mol_rest_code["Service Unavailable"] = 503] = "Service Unavailable";
        $mol_rest_code[$mol_rest_code["Gateway Timeout"] = 504] = "Gateway Timeout";
        $mol_rest_code[$mol_rest_code["HTTP Version Not Supported"] = 505] = "HTTP Version Not Supported";
        $mol_rest_code[$mol_rest_code["Insufficient Storage"] = 507] = "Insufficient Storage";
        $mol_rest_code[$mol_rest_code["Loop Detected"] = 508] = "Loop Detected";
        $mol_rest_code[$mol_rest_code["Not Extended"] = 510] = "Not Extended";
        $mol_rest_code[$mol_rest_code["Network Authentication Required"] = 511] = "Network Authentication Required";
        $mol_rest_code[$mol_rest_code["Network Read Timeout Error"] = 598] = "Network Read Timeout Error";
        $mol_rest_code[$mol_rest_code["Network Connect Timeout Error"] = 599] = "Network Connect Timeout Error";
    })($mol_rest_code = $.$mol_rest_code || ($.$mol_rest_code = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object {
        native;
        request;
        status() {
            const types = ['unknown', 'inform', 'success', 'redirect', 'wrong', 'failed'];
            return types[Math.floor(this.native.status / 100)];
        }
        code() {
            return this.native.status;
        }
        ok() {
            return this.native.ok;
        }
        message() {
            return $mol_rest_code[this.code()] || `HTTP Error ${this.code()}`;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const mime = this.mime() || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            return $mol_wire_sync(this.native).json();
        }
        blob() {
            return $mol_wire_sync(this.native).blob();
        }
        buffer() {
            return $mol_wire_sync(this.native).arrayBuffer();
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch_request extends $mol_object {
        native;
        response_async() {
            const controller = new AbortController();
            let done = false;
            const request = new Request(this.native, { signal: controller.signal });
            const promise = fetch(request).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    if (!done && !controller.signal.aborted)
                        controller.abort();
                },
            });
        }
        response() {
            return this.$.$mol_fetch_response.make({
                native: $mol_wire_sync(this).response_async(),
                request: this
            });
        }
        success() {
            const response = this.response();
            if (response.status() === 'success')
                return response;
            throw new Error(response.message(), { cause: response });
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_request.prototype, "response", null);
    $.$mol_fetch_request = $mol_fetch_request;
    class $mol_fetch extends $mol_object {
        static request(input, init) {
            return this.$.$mol_fetch_request.make({
                native: new Request(input, init)
            });
        }
        static response(input, init) {
            return this.request(input, init).response();
        }
        static success(input, init) {
            return this.request(input, init).success();
        }
        static stream(input, init) {
            return this.success(input, init).stream();
        }
        static text(input, init) {
            return this.success(input, init).text();
        }
        static json(input, init) {
            return this.success(input, init).json();
        }
        static blob(input, init) {
            return this.success(input, init).blob();
        }
        static buffer(input, init) {
            return this.success(input, init).buffer();
        }
        static xml(input, init) {
            return this.success(input, init).xml();
        }
        static xhtml(input, init) {
            return this.success(input, init).xhtml();
        }
        static html(input, init) {
            return this.success(input, init).html();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "request", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_demo_readme_not_found_error extends Error {
            module;
            constructor(module) {
                super('Readme not found');
                this.module = module;
            }
        }
        $$.$mol_app_demo_readme_not_found_error = $mol_app_demo_readme_not_found_error;
        class $mol_app_demo_readme extends $.$mol_app_demo_readme {
            close() {
                this.opened(false);
            }
            link(template, repo, module) {
                return template.replace('{repo}', repo).replace('{module}', module.join('/'));
            }
            uri_base(next = '') {
                $mol_wire_solid();
                return next;
            }
            source_link() {
                return this.link(this.source_link_template(), this.repo(), this.module());
            }
            readme() {
                let module = this.module();
                while (module.length) {
                    try {
                        const link = this.link(this.readme_link_template(), this.repo(), module);
                        const text = this.$.$mol_fetch.text(link);
                        this.uri_base(this.link(this.source_link_template(), this.repo(), module));
                        return text;
                    }
                    catch (error) {
                        if (error instanceof Promise)
                            $mol_fail_hidden(error);
                        module = module.slice(0, -1);
                    }
                }
                throw new $mol_app_demo_readme_not_found_error(module);
            }
            body() {
                try {
                    this.readme();
                    return [this.Readme()];
                }
                catch (err) {
                    if (err instanceof Promise)
                        $mol_fail_hidden(err);
                    return [this.Not_found()];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_app_demo_readme.prototype, "uri_base", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_readme.prototype, "source_link", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_readme.prototype, "readme", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo_readme.prototype, "body", null);
        $$.$mol_app_demo_readme = $mol_app_demo_readme;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_status) = class $mol_status extends ($.$mol_view) {
		message(){
			return "";
		}
		status(){
			return (this.title());
		}
		minimal_height(){
			return 24;
		}
		minimal_width(){
			return 0;
		}
		sub(){
			return [(this.message())];
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_status extends $.$mol_status {
            message() {
                try {
                    return this.status() ?? null;
                }
                catch (error) {
                    if (error instanceof Promise)
                        $mol_fail_hidden(error);
                    $mol_fail_log(error);
                    return error.message;
                }
            }
        }
        $$.$mol_status = $mol_status;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/status/status.view.css", "[mol_status] {\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tdisplay: block;\n\tflex-shrink: 1;\n\tword-wrap: break-word;\n}\n\n[mol_status]:not([mol_view_error=\"Promise\"]) {\n\tcolor: var(--mol_theme_focus);\n}\n\n[mol_status]:not([mol_view_error=\"Promise\"]):empty {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_app_demo) = class $mol_app_demo extends ($.$mol_book2) {
		detail_title(){
			return "$mol";
		}
		Theme(){
			const obj = new this.$.$mol_theme_auto();
			return obj;
		}
		Search_start(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({"F": (next) => (this.search_start(next))});
			(obj.mod_ctrl) = () => (true);
			return obj;
		}
		menu_title(){
			return (this.$.$mol_locale.text("$mol_app_demo_menu_title"));
		}
		names(){
			return [];
		}
		widget_tags(id){
			return [];
		}
		widget_aspects(id){
			return [];
		}
		widget_title(id){
			return "";
		}
		search_start(next){
			return (this.Menu().search_start(next));
		}
		sources_uri(){
			return "https://github.com/hyoo-ru/mam_mol/";
		}
		Sources(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ((this.sources_uri()));
			return obj;
		}
		Lights(){
			const obj = new this.$.$mol_lights_toggle();
			return obj;
		}
		tools(){
			return [(this.Sources()), (this.Lights())];
		}
		chat_seed(id){
			return "p9zx0v_nsmx1d";
		}
		chat_pages(id){
			return (this.Detail(id).chat_pages());
		}
		detail_description(){
			return "";
		}
		edit_uri(){
			return "";
		}
		readme_page(next){
			if(next !== undefined) return next;
			return false;
		}
		Demo(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		repo(){
			return "";
		}
		module(){
			return [];
		}
		detail_empty_prefix(){
			return (this.$.$mol_locale.text("$mol_app_demo_detail_empty_prefix"));
		}
		selected(){
			return "";
		}
		detail_empty_postfix(){
			return (this.$.$mol_locale.text("$mol_app_demo_detail_empty_postfix"));
		}
		editor_title(){
			return (this.detail_title());
		}
		meta_bundle_base(){
			return "";
		}
		repo_dict(){
			return {};
		}
		plugins(){
			return [(this.Theme()), (this.Search_start())];
		}
		demo_block_list(){
			return ["$mol_example_small", "$mol_example_large"];
		}
		Menu(){
			const obj = new this.$.$mol_app_demo_menu();
			(obj.title) = () => ((this.menu_title()));
			(obj.names) = () => ((this.names()));
			(obj.widget_tags) = (id) => ((this.widget_tags(id)));
			(obj.widget_aspects) = (id) => ((this.widget_aspects(id)));
			(obj.widget_title) = (id) => ((this.widget_title(id)));
			(obj.tools) = () => ((this.tools()));
			return obj;
		}
		Detail(id){
			const obj = new this.$.$mol_app_demo_detail();
			(obj.chat_seed) = () => ((this.chat_seed(id)));
			(obj.title) = () => ((this.detail_title()));
			(obj.description) = () => ((this.detail_description()));
			(obj.edit_uri) = () => ((this.edit_uri()));
			(obj.readme) = (next) => ((this.readme_page(next)));
			(obj.Demo) = () => ((this.Demo()));
			return obj;
		}
		Readme_page(){
			const obj = new this.$.$mol_app_demo_readme();
			(obj.repo) = () => ((this.repo()));
			(obj.opened) = (next) => ((this.readme_page(next)));
			(obj.module) = () => ((this.module()));
			return obj;
		}
		Detail_empty_message(){
			const obj = new this.$.$mol_status();
			(obj.sub) = () => ([
				(this.detail_empty_prefix()), 
				(this.selected()), 
				(this.detail_empty_postfix())
			]);
			return obj;
		}
	};
	($mol_mem(($.$mol_app_demo.prototype), "Theme"));
	($mol_mem(($.$mol_app_demo.prototype), "Search_start"));
	($mol_mem(($.$mol_app_demo.prototype), "Sources"));
	($mol_mem(($.$mol_app_demo.prototype), "Lights"));
	($mol_mem(($.$mol_app_demo.prototype), "readme_page"));
	($mol_mem(($.$mol_app_demo.prototype), "Demo"));
	($mol_mem(($.$mol_app_demo.prototype), "Menu"));
	($mol_mem_key(($.$mol_app_demo.prototype), "Detail"));
	($mol_mem(($.$mol_app_demo.prototype), "Readme_page"));
	($mol_mem(($.$mol_app_demo.prototype), "Detail_empty_message"));


;
"use strict";
var $;
(function ($) {
    function $mol_func_is_class(func) {
        return Object.getOwnPropertyDescriptor(func, 'prototype')?.writable === false;
    }
    $.$mol_func_is_class = $mol_func_is_class;
})($ || ($ = {}));

;
	($.$mol_app_demo_main) = class $mol_app_demo_main extends ($.$mol_page) {
		Lights(){
			const obj = new this.$.$mol_lights_toggle();
			return obj;
		}
		project_uri(){
			return "https://github.com/eigenmethod/mol/tree/master/";
		}
		Project(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ((this.project_uri()));
			return obj;
		}
		description(){
			return "";
		}
		Description(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.description()));
			(obj.uri_base) = () => ((this.project_uri()));
			return obj;
		}
		minimal_width(){
			return 400;
		}
		title(){
			return "$mol libs for web ui";
		}
		tools(){
			return [(this.Lights()), (this.Project())];
		}
		body(){
			return [(this.Description())];
		}
	};
	($mol_mem(($.$mol_app_demo_main.prototype), "Lights"));
	($mol_mem(($.$mol_app_demo_main.prototype), "Project"));
	($mol_mem(($.$mol_app_demo_main.prototype), "Description"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_demo_main extends $.$mol_app_demo_main {
            description() {
                return $mol_file.relative('mol/readme.md').text();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_app_demo_main.prototype, "description", null);
        $$.$mol_app_demo_main = $mol_app_demo_main;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_app_demo extends $.$mol_app_demo {
            component_name(name) {
                return name.split('_demo')?.[0] ?? name;
            }
            detail_title() {
                const selected = this.selected();
                return selected ? this.component_name(selected) : super.title();
            }
            detail_description() {
                return this.Demo().title();
            }
            names() {
                const next = [];
                for (const name in this.$) {
                    const ctor = this.$[name];
                    if (typeof ctor !== 'function')
                        continue;
                    if (!$mol_func_is_class(ctor))
                        continue;
                    if (!(ctor.prototype instanceof $mol_example))
                        continue;
                    if (this.demo_block_list().includes(name))
                        continue;
                    next.push(name);
                }
                return next.sort();
            }
            widget_tags(name) {
                const component_name = this.component_name(name);
                const tags = this.Widget(name).tags().map(tag => tag.toLowerCase());
                if (tags.length === 0) {
                    console.warn(`Demo widget without tags: ${name}`);
                    return [component_name];
                }
                else {
                    return [...tags, component_name];
                }
            }
            widget_title(name) {
                return this.Widget(name).title();
            }
            widget_aspects(name) {
                return this.Widget(name).aspects();
            }
            selected() {
                let value = $mol_state_arg.value('demo') || '';
                if (value && !value.startsWith('$'))
                    value = '$' + value;
                return value;
            }
            readme_page(next) {
                return $mol_state_session.value('readme', next) ?? false;
            }
            selected_class_name() {
                return this.selected();
            }
            Widget(name) {
                return new this.$[name];
            }
            names_demo() {
                const selected = this.selected();
                return [selected];
            }
            pages() {
                let sub = [];
                sub.push(this.Menu());
                const selected = this.selected();
                if (!selected)
                    return sub;
                sub.push(this.Detail(selected));
                const readme_page = this.readme_page();
                if (readme_page)
                    sub.push(this.Readme_page());
                sub.push(...this.chat_pages(selected));
                return sub;
            }
            Demo() {
                return this.Widget(this.selected());
            }
            logo_uri() {
                return $mol_file.relative('/mol/logo/logo.svg').path();
            }
            meta_bundle_base() {
                return this.$.$mol_state_arg.make_link({});
            }
            repo_dict() {
                const meta_uri = new URL('web.meta.tree', this.meta_bundle_base()).toString();
                const str = this.$.$mol_fetch.text(meta_uri);
                const tree = this.$.$mol_tree2_from_string(str);
                const dict = {};
                tree.kids.forEach(meta => {
                    const packs = meta.select('pack');
                    packs.kids.forEach(pack => {
                        const module_name = meta.value === '/' ? pack.kids[0]?.type :
                            [...meta.value.split('/').slice(1), pack.kids[0]?.type].join('_');
                        const repo = pack.kids[0]?.kids[0]?.kids[0]?.value
                            .split('.git')[0].split('/').slice(-2).join('/');
                        if (!repo)
                            throw new Error(`${this}.repo_dict(): Pack node "${pack.toString()}" does not contain a valid git url`);
                        dict[module_name] = repo;
                    });
                });
                return dict;
            }
            name_parse(name) {
                const split = name.replace(/\$/, '').split('_');
                const repos = this.repo_dict();
                const keys = split.map((_, index) => split.slice(0, -1 - index).join('_'));
                const key = keys.find(key => key in repos);
                if (!key)
                    throw new Error(`${this}.name_parse("${name}"): Key "${key}" not found`);
                const repo = repos[key];
                const module = split.slice(key.split('_').length);
                return { repo, module };
            }
            repo() {
                return this.name_parse($mol_state_arg.value('demo')).repo;
            }
            module() {
                return this.name_parse(this.selected()).module;
            }
            chat_link() {
                return $mol_state_arg.make_link({ demo: this.selected() });
            }
            edit_uri() {
                const source = encodeURIComponent(`$${''}my_app ${this.selected()}`);
                const pack = encodeURIComponent(this.$.$mol_state_arg.make_link({}));
                return `https://studio.hyoo.ru/#!pack=${pack}/source=${source}/preview`;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "component_name", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "names", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "widget_tags", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "widget_title", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "widget_aspects", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "Widget", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "names_demo", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "meta_bundle_base", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "repo_dict", null);
        __decorate([
            $mol_mem_key
        ], $mol_app_demo.prototype, "name_parse", null);
        __decorate([
            $mol_mem
        ], $mol_app_demo.prototype, "edit_uri", null);
        $$.$mol_app_demo = $mol_app_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/app/demo/demo.view.css", "\n[mol_app_demo_main],\n[mol_app_demo_detail],\n[mol_app_empty_message] {\n\tflex: 1000 0 40rem;\n}\n\n[mol_app_demo_nav_table] {\n\twidth: 100%;\n\tbox-sizing: border-box;\n}\n\n[mol_app_demo_nav_row] {\n\tdisplay: flex;\n}\n\n[mol_app_demo_nav_option] {\n\tpadding: 0 .5rem 0 0;\n\tdisplay: flex;\n\tflex: 1;\n\talign-items: center;\n\tbox-shadow: none;\n}\n\n[mol_app_demo_nav_expand] {\n\talign-self: stretch;\n\talign-items: center;\n\tpadding-right: .25rem;\n}\n\n[mol_app_demo_nav_content] {\n\tflex-grow: 1;\n}\n\n[mol_app_demo_list] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-content: flex-start;\n\talign-items: flex-start;\n}\n\n[mol_app_demo_screen] {\n\tmax-height: 45%;\n}\n\n[mol_app_demo_detail_body] {\n\tdisplay: flex;\n\talign-items: stretch;\n\tjustify-content: flex-start;\n\tflex-direction: column;\n}\n\n[mol_app_demo_detail_list] {\n\tflex: 1 0 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[mol_app_demo_page_close] {\n\tcolor: inherit;\n\talign-items: center;\n\tpadding: 1rem;\n}\n\n[mol_app_demo_welcome] {\n\tflex: 1 1 auto;\n}\n\n[mol_app_demo_option_link] {\n\tpadding: 0;\n}\n\n[mol_app_demo_sample_large] {\n\tbox-sizing: border-box;\n}\n\n[mol_app_demo_detail_empty_message] {\n\tmargin: auto;\n}\n\n[mol_app_demo_chat] {\n\tflex: none;\n}\n\n[mol_app_demo_readme] {\n\tflex: 1 0 40rem;\n}\n\n[mol_app_demo_readme_not_found] {\n\tdisplay: flex;\n\tflex: 1 0;\n\talign-items: center;\n\tjustify-content: center;\n\tfont-size: 2rem;\n\tcolor: var(--mol_theme_shade);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$yuf_chess_position_x = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    $.$yuf_chess_position_y = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const x_name_index = $.$yuf_chess_position_x.reduce((acc, name, index) => {
        acc[name] = index;
        return acc;
    }, {});
    const y_name_index = $.$yuf_chess_position_y.reduce((acc, name, index) => {
        acc[name] = index;
        return acc;
    }, {});
    function $yuf_chess_position_pack(id) {
        return [x_name_index[id[0]] ?? 0, y_name_index[id[1]] ?? 0];
    }
    $.$yuf_chess_position_pack = $yuf_chess_position_pack;
    function $yuf_chess_position_color(id) {
        const [x, y] = $yuf_chess_position_pack(id);
        return Boolean((x + y) % 2) ? 'b' : 'w';
    }
    $.$yuf_chess_position_color = $yuf_chess_position_color;
})($ || ($ = {}));

;
	($.$mol_icon_chess_bishop) = class $mol_icon_chess_bishop extends ($.$mol_icon) {
		path(){
			return "M19,22H5V20H19V22M17.16,8.26C18.22,9.63 18.86,11.28 19,13C19,15.76 15.87,18 12,18C8.13,18 5,15.76 5,13C5,10.62 7.33,6.39 10.46,5.27C10.16,4.91 10,4.46 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.46 13.84,4.91 13.54,5.27C14.4,5.6 15.18,6.1 15.84,6.74L11.29,11.29L12.71,12.71L17.16,8.26Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_chess_king) = class $mol_icon_chess_king extends ($.$mol_icon) {
		path(){
			return "M19,22H5V20H19V22M17,10C15.58,10 14.26,10.77 13.55,12H13V7H16V5H13V2H11V5H8V7H11V12H10.45C9.35,10.09 6.9,9.43 5,10.54C3.07,11.64 2.42,14.09 3.5,16C4.24,17.24 5.57,18 7,18H17A4,4 0 0,0 21,14A4,4 0 0,0 17,10Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_chess_knight) = class $mol_icon_chess_knight extends ($.$mol_icon) {
		path(){
			return "M19,22H5V20H19V22M13,2V2C11.75,2 10.58,2.62 9.89,3.66L7,8L9,10L11.06,8.63C11.5,8.32 12.14,8.44 12.45,8.9C12.47,8.93 12.5,8.96 12.5,9V9C12.8,9.59 12.69,10.3 12.22,10.77L7.42,15.57C6.87,16.13 6.87,17.03 7.43,17.58C7.69,17.84 8.05,18 8.42,18H17V6A4,4 0 0,0 13,2Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_chess_pawn) = class $mol_icon_chess_pawn extends ($.$mol_icon) {
		path(){
			return "M19 22H5V20H19V22M16 18H8L10.18 10H8V8H10.72L10.79 7.74C10.1 7.44 9.55 6.89 9.25 6.2C8.58 4.68 9.27 2.91 10.79 2.25C12.31 1.58 14.08 2.27 14.74 3.79C15.41 5.31 14.72 7.07 13.2 7.74L13.27 8H16V10H13.82L16 18Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_chess_queen) = class $mol_icon_chess_queen extends ($.$mol_icon) {
		path(){
			return "M18,3A2,2 0 0,1 20,5C20,5.81 19.5,6.5 18.83,6.82L17,13.15V18H7V13.15L5.17,6.82C4.5,6.5 4,5.81 4,5A2,2 0 0,1 6,3A2,2 0 0,1 8,5C8,5.5 7.82,5.95 7.5,6.3L10.3,9.35L10.83,5.62C10.33,5.26 10,4.67 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.67 13.67,5.26 13.17,5.62L13.7,9.35L16.47,6.29C16.18,5.94 16,5.5 16,5A2,2 0 0,1 18,3M5,20H19V22H5V20Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_chess_rook) = class $mol_icon_chess_rook extends ($.$mol_icon) {
		path(){
			return "M5,20H19V22H5V20M17,2V5H15V2H13V5H11V2H9V5H7V2H5V8H7V18H17V8H19V2H17Z";
		}
	};


;
"use strict";

;
	($.$yuf_chess_piece) = class $yuf_chess_piece extends ($.$mol_icon) {
		color(){
			return "w";
		}
		Bishop(){
			const obj = new this.$.$mol_icon_chess_bishop();
			return obj;
		}
		King(){
			const obj = new this.$.$mol_icon_chess_king();
			return obj;
		}
		Knight(){
			const obj = new this.$.$mol_icon_chess_knight();
			return obj;
		}
		Pawn(){
			const obj = new this.$.$mol_icon_chess_pawn();
			return obj;
		}
		Queen(){
			const obj = new this.$.$mol_icon_chess_queen();
			return obj;
		}
		Rook(){
			const obj = new this.$.$mol_icon_chess_rook();
			return obj;
		}
		attr(){
			return {...(super.attr()), "yuf_chess_piece_color": (this.color())};
		}
		type(){
			return "p";
		}
		icons(){
			return {
				"b": (this.Bishop()), 
				"k": (this.King()), 
				"n": (this.Knight()), 
				"p": (this.Pawn()), 
				"q": (this.Queen()), 
				"r": (this.Rook())
			};
		}
	};
	($mol_mem(($.$yuf_chess_piece.prototype), "Bishop"));
	($mol_mem(($.$yuf_chess_piece.prototype), "King"));
	($mol_mem(($.$yuf_chess_piece.prototype), "Knight"));
	($mol_mem(($.$yuf_chess_piece.prototype), "Pawn"));
	($mol_mem(($.$yuf_chess_piece.prototype), "Queen"));
	($mol_mem(($.$yuf_chess_piece.prototype), "Rook"));


;
"use strict";
var $;
(function ($) {
    function $yuf_chess_piece_color(v) {
        return v === 'r' || v === 'n' || v === 'b' || v === 'q' || v === 'k' || v === 'b' || v === 'p' ? 'b' : 'w';
    }
    $.$yuf_chess_piece_color = $yuf_chess_piece_color;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_chess_piece extends $.$yuf_chess_piece {
            color() {
                return $yuf_chess_piece_color(this.type()) ?? 'w';
            }
            path() {
                return this.icons()[this.type().toLowerCase()].path();
            }
        }
        $$.$yuf_chess_piece = $yuf_chess_piece;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem, px, em, per, vw, vh, s } = $mol_style_unit;
    const { calc, hsla, vary, steps } = $mol_style_func;
    $mol_style_define($yuf_chess_piece, {
        color: 'white',
        '@': {
            yuf_chess_piece_color: {
                b: {
                    color: 'black',
                },
            },
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$yuf_chess_fen_default = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    function $yuf_chess_fen_parts(fen) {
        const [_, positions_str, side, castles, enpass, half_move_count, move_count,] = fen.match(/((?:[rnbqkp,1-8]+\/){7}[rnbqkp,1-8]+)\s+(b|w)\s+(?:([kq,a-h]{1,4})|\-)\s+(?:([a-h][36])|\-)\s+(\d{1,3})\s(\d{1,4})/i) ?? [];
        const figure_count = {
            r: 0, n: 0, b: 0, q: 0, k: 0, p: 0,
            R: 0, N: 0, B: 0, Q: 0, K: 0, P: 0,
        };
        const positions = positions_str?.split('/').map(row_data => row_data.split('').reduce((acc, symbol) => {
            let repeats = Number(symbol);
            if (Number.isNaN(repeats))
                repeats = 0;
            for (let j = 0; j < repeats; j++)
                acc.push(null);
            if (repeats)
                return acc;
            acc.push((symbol + (figure_count[symbol] || '0')));
            figure_count[symbol]++;
            return acc;
        }, [])) ?? [];
        return {
            positions,
            side: side,
            castles: castles?.split(''),
            enpass: (enpass ?? null),
            halfmove_count: half_move_count ? Number(half_move_count) : null,
            move_count: move_count ? Number(move_count) : null,
        };
    }
    $.$yuf_chess_fen_parts = $yuf_chess_fen_parts;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $yuf_chess_position_update(positions, move) {
        const [from_x, from_y] = $yuf_chess_position_pack(move.from);
        const [to_x, to_y] = $yuf_chess_position_pack(move.to);
        const piece_type = (positions[from_y][from_x]?.[0] ?? null);
        if ((piece_type === 'p' || piece_type === 'P') && from_x !== to_x && from_y !== to_y && !positions[to_y][to_x]) {
            const shift_y = to_y > from_y ? -1 : 1;
            positions[to_y + shift_y][to_x] = null;
        }
        const promotion_type = !move.promotion ? null : piece_type === 'p'
            ? move.promotion
            : move.promotion.toUpperCase();
        const existing_piece_indices = !promotion_type ? null
            : positions.map(row => row.find(cell => cell?.[0] === promotion_type)?.[1] ?? null)
                .map(index => index !== null ? Number(index) : null);
        const promotion_index = existing_piece_indices
            ? ([0, 1, 2, 3].find(i => !existing_piece_indices?.includes(i)) ?? 0)
            : 0;
        positions[to_y][to_x] = promotion_type
            ? `${promotion_type}${promotion_index}`
            : positions[from_y][from_x];
        positions[from_y][from_x] = null;
        if ((piece_type === 'k' || piece_type === 'K') && Math.abs(to_x - from_x) === 2 && from_y === to_y) {
            const sign = to_x > from_x ? 1 : -1;
            let rook_from_x = to_x;
            do {
                rook_from_x += sign;
                const rook = positions[to_y][rook_from_x]?.[0];
                if (rook === 'r' || rook === 'R') {
                    const rook_to_x = to_x - sign;
                    positions[to_y][rook_to_x] = positions[from_y][rook_from_x];
                    positions[from_y][rook_from_x] = null;
                    break;
                }
            } while (rook_from_x >= 0 && rook_from_x <= 7);
        }
        return positions;
    }
    $.$yuf_chess_position_update = $yuf_chess_position_update;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_chess_model extends $mol_object {
        checkers() { return []; }
        moves_str(next) { return next || ''; }
        fen_initial() { return ''; }
        fen_initial_normalized() { return this.fen_initial() || this.$.$yuf_chess_fen_default; }
        moves_str_separator() { return '~'; }
        moves(next) {
            const sep = this.moves_str_separator();
            if (next) {
                this.moves_str(next.map(move => `${move.from}${move.to}${move.promotion ?? ''}${move.score ? `-${move.score}` : ''}`).join(sep));
                return next;
            }
            return this.moves_str()?.trim().split(sep)
                .map(str => {
                const [_, from, to, promotion, score] = str.match(/([a-h][1-8])([a-h][1-8])([rnbq])?(\d+)?/) ?? [];
                if (!from || !to)
                    return null;
                return {
                    from,
                    to,
                    promotion,
                    score: score ? Number(score) : null
                };
            })
                .filter($mol_guard_defined) ?? [];
        }
        user_score() {
            const index = this.enemy_active() ? -1 : -2;
            return this.moves().at(index)?.score;
        }
        score(move) {
            const valid = this.legal(move.from)?.[move.to];
            if (!valid)
                return null;
            const current = this.tops().find(best => best.from === move.from && best.to === move.to);
            return current?.score ?? 1;
        }
        enemy_active() { return this.active_color() === this.enemy_color(); }
        best() {
            if (this.status())
                return null;
            return this.tops()[0] ?? null;
        }
        started_at(reset) {
            if (reset === null)
                this.moves([]);
            return Date.now();
        }
        reset() { this.started_at(null); }
        move_enrich(move) {
            const promotion = move.promotion ?? this.legal(move.from)?.[move.to]?.[0] ?? null;
            const score = move.score ?? this.score(move);
            if (!score)
                return null;
            const color = this.active_color();
            return { ...move, promotion, score, color };
        }
        move_suggest(move) {
            if (!move)
                return null;
            const normalized = this.move_enrich(move);
            if (normalized)
                this.move_push(normalized);
            return normalized;
        }
        move_push(move) {
            this.moves([...this.moves(), move]);
        }
        positions() {
            const positions = this.fen_initial_parts().positions.map(row => row.slice());
            let moves = this.moves();
            for (const move of moves) {
                $yuf_chess_position_update(positions, move);
            }
            return positions;
        }
        undo() {
            this.moves(this.moves().slice(0, -2));
        }
        level(next) { return next ?? 'easy'; }
        levels() {
            return [
                'easy',
                'medium',
                'hard',
                'hardest',
                'nightmare'
            ];
        }
        tops() {
            return [];
        }
        fen_initial_parts() {
            return $yuf_chess_fen_parts(this.fen_initial_normalized());
        }
        move_color(move_count = 0) {
            const side_initial = this.fen_initial_parts().side;
            if ((move_count % 2) === 0)
                return side_initial;
            return side_initial === 'w' ? 'b' : 'w';
        }
        active_color() {
            return this.move_color(this.moves().length);
        }
        enemy_color() { return 'b'; }
        your_color() { return this.enemy_color() === 'b' ? 'w' : 'b'; }
        piece_type(id) {
            return (this.piece_id(id)?.[0] ?? null);
        }
        piece_color(id) {
            const current_type = this.piece_type(id);
            return current_type ? $yuf_chess_piece_color(current_type) : null;
        }
        piece_id(id) {
            const [x, y] = this.$.$yuf_chess_position_pack(id);
            const positions = this.positions();
            return positions[y][x];
        }
        legal(pos) {
            return null;
        }
        check_position() { return null; }
        status() {
            return null;
        }
        selected(next) {
            this.moves();
            try {
                if (this.status())
                    return null;
            }
            catch (e) {
                this.$.$mol_fail_log(e);
            }
            if (this.move_suggest())
                return null;
            if (next && !this.legal(next))
                return null;
            return next ?? this.check_position();
        }
        hilited(target) {
            const selected = this.selected();
            const legal = selected ? this.legal(selected) : null;
            return Boolean(legal?.[target]) || selected === target;
        }
        select(next) {
            const prev = this.selected();
            const pos_type = this.piece_type(next);
            const pos_color = this.piece_color(next);
            const active_color = this.active_color();
            if (!prev && (!pos_type || pos_color !== active_color))
                return null;
            if (!prev || (pos_color && pos_color === active_color)) {
                return this.selected(next === prev ? null : next);
            }
            this.move_suggest({ from: prev, to: next });
            this.selected(null);
        }
        bot_move_player() {
            const best = this.enemy_active() ? this.best() : null;
            if (!best)
                return null;
            this.move_suggest(best);
            return null;
        }
        replic_player() {
            const info = this.move_suggest();
            if (!info)
                return null;
            $mol_wire_sync(console).log(info.color, 'moves to', info.from, info.to, 'score', info.score);
            this.$.$mol_wait_timeout(1000);
            this.move_suggest(null);
            return null;
        }
        auto() {
            this.replic_player();
            this.bot_move_player();
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "moves_str", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "moves", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "enemy_active", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "started_at", null);
    __decorate([
        $mol_action
    ], $yuf_chess_model.prototype, "move_enrich", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "move_suggest", null);
    __decorate([
        $mol_action
    ], $yuf_chess_model.prototype, "move_push", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "positions", null);
    __decorate([
        $mol_action
    ], $yuf_chess_model.prototype, "undo", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "level", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "levels", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "tops", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "fen_initial_parts", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "active_color", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "status", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "selected", null);
    __decorate([
        $mol_mem_key
    ], $yuf_chess_model.prototype, "hilited", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "bot_move_player", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model.prototype, "replic_player", null);
    $.$yuf_chess_model = $yuf_chess_model;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_chess_model_stockfish extends $yuf_chess_model {
        url() {
            return 'yuf/chess/model/stockfish/engine/stockfish-nnue-16-single.js';
        }
        worker() {
            const worker = new Worker(this.url());
            worker.onmessage = (e) => this.on_message(e.data);
            worker.onerror = (e) => this.promise?.fail(new $mol_error_mix(e.message || e.error, e));
            return worker;
        }
        data(next) {
            return next ?? [];
        }
        promise = null;
        async send_raw(cmd) {
            let current;
            do {
                current = this.promise;
                try {
                    await current;
                }
                catch (e) { }
            } while (current !== this.promise);
            const promise = this.promise = new $mol_promise();
            const handler = setTimeout(() => promise.done([]), this.deadline());
            const done = promise.done;
            promise.done = (val) => {
                clearTimeout(handler);
                done.call(promise, val);
            };
            this.$.$mol_log3_rise({
                place: '$yuf_chess_model_stockfish.send()',
                message: cmd,
            });
            this.worker().postMessage(cmd);
            this.worker().postMessage('isready');
            return promise;
        }
        messages = [];
        on_message(raw) {
            this.messages.push(raw);
            if (raw !== 'readyok')
                return;
            this.promise?.done(this.messages);
            this.messages = [];
        }
        deadline() { return 15000; }
        async send_safe(cmd) {
            let res;
            while (!(res = (await this.send_raw(cmd))).includes('readyok')) {
                this.$.$mol_log3_warn({
                    place: '$yuf_chess_model_stockfish.send_safe()',
                    message: 'slow response',
                    hint: 'low cpu, bad connection?',
                    cmd,
                });
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            return res;
        }
        send(cmd) { return $mol_wire_sync(this).send_safe(cmd); }
        started_at(reset) {
            this.send('ucinewgame');
            return super.started_at(reset);
        }
        position() {
            this.started_at();
            const moves = this.moves().map(move => move.from + move.to + (move.promotion ?? ''));
            const position = `position fen ${this.fen_initial_normalized()}${moves.length ? ` moves ${moves.join(' ')}` : ''}`;
            this.send(position);
            return position;
        }
        depth() {
            const l = this.level();
            const depth = (this.levels().indexOf(l) + 1) || 1;
            return depth * 4;
        }
        tops() {
            $mol_wire_solid();
            this.position();
            const out = this.send(`go depth ${this.depth() + (this.enemy_active() ? 0 : 2)}`);
            const moves = {};
            let move = null;
            for (const raw of out) {
                const info = raw.match(/^info.* (?:score (?:(cp|mate) (\d+))|(lowerbound|upperbound)).* pv( [a-h][1-8][a-h][1-8][rnbq]?)+/);
                if (info) {
                    let score_raw = Number(info[1]);
                    if (Number.isNaN(score_raw))
                        score_raw = 0;
                    const mate = info[1] === 'mate';
                    const bad = score_raw < 0;
                    const best = raw.match(/([a-h][1-8])([a-h][1-8])([rnbq])?/);
                    if (!best?.[1]) {
                        throw new Error(`${raw} cant extract moves`);
                    }
                    move = {
                        from: best[1],
                        to: best[2],
                        score: bad ? (mate ? 2 : 3) : (mate ? 5 : 4),
                        promotion: (best[3] || null)
                    };
                }
                const best = raw.match(/^bestmove ([a-h][1-8])([a-h][1-8])([rnbq])?/);
                if (best) {
                    move = {
                        from: best[1],
                        to: best[2],
                        score: moves[best[1] + best[2] + (best[3] ?? '')]?.score || 5,
                        promotion: (best[3] || null)
                    };
                }
                if (!move)
                    continue;
                moves[move.from + move.to + (move.promotion ?? '')] = move;
            }
            const scores = Object.values(moves);
            scores.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
            return scores;
        }
        legal_all() {
            this.position();
            return this.send(`go perft 2`).reduce((acc, raw) => {
                const match = raw.match(/^([a-h][1-8])([a-h][1-8])([rnbq])?/);
                if (!match)
                    return acc;
                const move = {
                    from: match[1],
                    to: match[2],
                    promotion: match[3],
                };
                let level = acc[move.from];
                if (!level)
                    level = acc[move.from] = {};
                if (!level[move.to])
                    level[move.to] = [];
                if (move.promotion)
                    level[move.to]?.push(move.promotion);
                return acc;
            }, {});
        }
        check_position() {
            try {
                const positions = Object.keys(this.legal_all());
                if (positions.length !== 1)
                    return null;
                if (this.piece_id(positions[0])?.[0]?.toUpperCase() !== 'K')
                    return null;
                return positions[0];
            }
            catch (e) {
                if ($mol_promise_like(e))
                    return null;
                this.$.$mol_fail_log(e);
                return null;
            }
        }
        legal(pos) { return this.legal_all()[pos]; }
        status() {
            if (Object.keys(this.legal_all()).length > 0)
                return null;
            return this.checkers().length ? 'checkmate' : 'draw';
        }
        debug_info() {
            if (!this.moves().length)
                return {
                    fen: this.fen_initial_normalized(),
                    checkers: []
                };
            this.position();
            const raw = this.send(`d`);
            const fen = raw.map(raw => raw.match(/^Fen: (.+)/)?.[1]).find($mol_guard_defined);
            if (!fen)
                throw new Error('Required fen', { cause: { chess_engine_response: raw } });
            const checkers = raw.map(raw => raw.match(/^Checkers:((?: [a-h][1-8])+)/)?.[1].split(' ')).find($mol_guard_defined) ?? [];
            return { fen, checkers };
        }
        checkers() { return this.debug_info().checkers; }
    }
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "worker", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "data", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "started_at", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "position", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "depth", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "tops", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "legal_all", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "check_position", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "status", null);
    __decorate([
        $mol_mem
    ], $yuf_chess_model_stockfish.prototype, "debug_info", null);
    $.$yuf_chess_model_stockfish = $yuf_chess_model_stockfish;
})($ || ($ = {}));

;
	($.$mol_icon_undo) = class $mol_icon_undo extends ($.$mol_icon) {
		path(){
			return "M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_restart) = class $mol_icon_restart extends ($.$mol_icon) {
		path(){
			return "M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_lightbulb) = class $mol_icon_lightbulb extends ($.$mol_icon) {
		path(){
			return "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_lightbulb_question) = class $mol_icon_lightbulb_question extends ($.$mol_icon) {
		path(){
			return "M8 2C4.1 2 1 5.1 1 9C1 11.4 2.2 13.5 4 14.7V17C4 17.6 4.4 18 5 18H11C11.6 18 12 17.6 12 17V14.7C13.8 13.4 15 11.3 15 9C15 5.1 11.9 2 8 2M5 21C5 21.6 5.4 22 6 22H10C10.6 22 11 21.6 11 21V20H5V21M20.5 14.5V16H19V14.5H20.5M18.5 9.5H17V9C17 7.3 18.3 6 20 6S23 7.3 23 9C23 10 22.5 10.9 21.7 11.4L21.4 11.6C20.8 12 20.5 12.6 20.5 13.3V13.5H19V13.3C19 12.1 19.6 11 20.6 10.4L20.9 10.2C21.3 9.9 21.5 9.5 21.5 9C21.5 8.2 20.8 7.5 20 7.5S18.5 8.2 18.5 9V9.5Z";
		}
	};


;
"use strict";

;
	($.$mol_pick) = class $mol_pick extends ($.$mol_pop) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_enabled(){
			return true;
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_content(){
			return [(this.title())];
		}
		hint(){
			return "";
		}
		Trigger(){
			const obj = new this.$.$mol_check();
			(obj.minimal_width) = () => (40);
			(obj.minimal_height) = () => (40);
			(obj.enabled) = () => ((this.trigger_enabled()));
			(obj.checked) = (next) => ((this.showed(next)));
			(obj.clicks) = (next) => ((this.clicks(next)));
			(obj.sub) = () => ((this.trigger_content()));
			(obj.hint) = () => ((this.hint()));
			return obj;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		Anchor(){
			return (this.Trigger());
		}
	};
	($mol_mem(($.$mol_pick.prototype), "keydown"));
	($mol_mem(($.$mol_pick.prototype), "clicks"));
	($mol_mem(($.$mol_pick.prototype), "Trigger"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_pick extends $.$mol_pick {
            keydown(event) {
                if (!this.trigger_enabled())
                    return;
                if (event.defaultPrevented)
                    return;
                if (event.keyCode === $mol_keyboard_code.escape) {
                    if (!this.showed())
                        return;
                    event.preventDefault();
                    this.showed(false);
                }
            }
        }
        $$.$mol_pick = $mol_pick;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pick/pick.view.css", "[mol_pick_trigger] {\n\talign-items: center;\n\tflex-grow: 1;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_dots_vertical) = class $mol_icon_dots_vertical extends ($.$mol_icon) {
		path(){
			return "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
		}
	};


;
"use strict";

;
	($.$mol_select) = class $mol_select extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		event_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		option_label(id){
			return "";
		}
		filter_pattern(next){
			if(next !== undefined) return next;
			return "";
		}
		Option_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.option_label(id)));
			(obj.needle) = () => ((this.filter_pattern()));
			return obj;
		}
		option_content(id){
			return [(this.Option_label(id))];
		}
		no_options_message(){
			return (this.$.$mol_locale.text("$mol_select_no_options_message"));
		}
		nav_components(){
			return [];
		}
		option_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		nav_cycle(next){
			if(next !== undefined) return next;
			return true;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.option_focused(next)));
			(obj.cycle) = (next) => ((this.nav_cycle(next)));
			return obj;
		}
		menu_content(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_content()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		filter_hint(){
			return (this.$.$mol_locale.text("$mol_select_filter_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		dictionary(next){
			if(next !== undefined) return next;
			return {};
		}
		options(){
			return [];
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		option_label_default(){
			return "";
		}
		Option_row(id){
			const obj = new this.$.$mol_button_minor();
			(obj.enabled) = () => ((this.enabled()));
			(obj.event_click) = (next) => ((this.event_select(id, next)));
			(obj.sub) = () => ((this.option_content(id)));
			return obj;
		}
		No_options(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.no_options_message())]);
			return obj;
		}
		plugins(){
			return [...(super.plugins()), (this.Nav())];
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_select_hint"));
		}
		bubble_content(){
			return [(this.Filter()), (this.Bubble_pane())];
		}
		Filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.filter_pattern(next)));
			(obj.hint) = () => ((this.filter_hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		Trigger_icon(){
			const obj = new this.$.$mol_icon_dots_vertical();
			return obj;
		}
	};
	($mol_mem_key(($.$mol_select.prototype), "event_select"));
	($mol_mem(($.$mol_select.prototype), "filter_pattern"));
	($mol_mem_key(($.$mol_select.prototype), "Option_label"));
	($mol_mem(($.$mol_select.prototype), "option_focused"));
	($mol_mem(($.$mol_select.prototype), "nav_cycle"));
	($mol_mem(($.$mol_select.prototype), "Nav"));
	($mol_mem(($.$mol_select.prototype), "Menu"));
	($mol_mem(($.$mol_select.prototype), "Bubble_pane"));
	($mol_mem(($.$mol_select.prototype), "submit"));
	($mol_mem(($.$mol_select.prototype), "dictionary"));
	($mol_mem(($.$mol_select.prototype), "value"));
	($mol_mem_key(($.$mol_select.prototype), "Option_row"));
	($mol_mem(($.$mol_select.prototype), "No_options"));
	($mol_mem(($.$mol_select.prototype), "Filter"));
	($mol_mem(($.$mol_select.prototype), "Trigger_icon"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_select extends $.$mol_select {
            filter_pattern(next) {
                this.focused();
                return next || '';
            }
            open() {
                this.showed(true);
            }
            options() {
                return Object.keys(this.dictionary());
            }
            options_filtered() {
                let options = this.options();
                options = options.filter($mol_match_text(this.filter_pattern(), (id) => [this.option_label(id)]));
                const index = options.indexOf(this.value());
                if (index >= 0)
                    options = [...options.slice(0, index), ...options.slice(index + 1)];
                return options;
            }
            option_label(id) {
                const value = this.dictionary()[id];
                return (value == null ? id : value) || this.option_label_default();
            }
            option_rows() {
                return this.options_filtered().map((option) => this.Option_row(option));
            }
            option_focused(component) {
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.showed()) {
                    component.focused(true);
                }
                return component;
            }
            event_select(id, event) {
                this.value(id);
                this.showed(false);
                event?.preventDefault();
            }
            nav_components() {
                if (this.options().length > 1 && this.Filter()) {
                    return [this.Filter(), ...this.option_rows()];
                }
                else {
                    return this.option_rows();
                }
            }
            trigger_content() {
                return [
                    ...this.option_content(this.value()),
                    this.Trigger_icon(),
                ];
            }
            menu_content() {
                return [
                    ...this.option_rows(),
                    ...(this.options_filtered().length === 0) ? [this.No_options()] : []
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "option_focused", null);
        $$.$mol_select = $mol_select;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/select/select.view.css", "[mol_select] {\n\tdisplay: flex;\n\tword-break: normal;\n\talign-self: flex-start;\n}\n\n[mol_select_option_row] {\n\tmin-width: 100%;\n\tpadding: 0;\n\tjustify-content: flex-start;\n}\n\n[mol_select_filter] {\n\tflex: 1 0 auto;\n\talign-self: stretch;\n}\n\n[mol_select_option_label] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tmin-height: 1.5em;\n\tdisplay: block;\n\twhite-space: nowrap;\n}\n\n[mol_select_clear_option_content] {\n\tpadding: .5em 1rem .5rem 0;\n\ttext-align: left;\n\tbox-shadow: var(--mol_theme_line);\n\tflex: 1 0 auto;\n}\n\n[mol_select_no_options] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tdisplay: block;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_select_trigger] {\n\tpadding: 0;\n\tflex: 1 1 auto;\n\tdisplay: flex;\n}\n\n[mol_select_trigger] > * {\n\tmargin-right: -1rem;\n}\n\n[mol_select_trigger] > *:last-child {\n\tmargin-right: 0;\n}\n\n[mol_select_menu] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n");
})($ || ($ = {}));

;
	($.$yuf_chess_cell) = class $yuf_chess_cell extends ($.$mol_button) {
		id(){
			return "";
		}
		color(){
			return "w";
		}
		hilited(){
			return false;
		}
		Sub(){
			return null;
		}
		minimal_width(){
			return 36;
		}
		minimal_height(){
			return 36;
		}
		attr(){
			return {
				...(super.attr()), 
				"yuf_chess_cell_id": (this.id()), 
				"yuf_chess_cell_color": (this.color()), 
				"yuf_chess_cell_hilite": (this.hilited())
			};
		}
		sub(){
			return [(this.Sub())];
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_chess_cell extends $.$yuf_chess_cell {
        }
        $$.$yuf_chess_cell = $yuf_chess_cell;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { vary } = $mol_style_func;
    $mol_style_define($yuf_chess_cell, {
        minWidth: '2.25rem',
        minHeight: '2.25rem',
        background: {
            color: vary('--yuf_chess_cell_white'),
        },
        border: { radius: 0 },
        $mol_icon: {
            width: '100%',
            height: '100%',
        },
        '@': {
            yuf_chess_cell_color: {
                b: {
                    background: {
                        color: vary('--yuf_chess_cell_black'),
                    },
                    '@': {
                        yuf_chess_cell_hilite: {
                            true: {
                                background: {
                                    color: 'color-mix(in hsl, var(--yuf_chess_cell_hilite), var(--yuf_chess_cell_black) 50%)',
                                },
                            }
                        },
                    }
                },
                w: {
                    '@': {
                        yuf_chess_cell_hilite: {
                            true: {
                                background: {
                                    color: 'color-mix(in hsl, var(--yuf_chess_cell_hilite), var(--yuf_chess_cell_white) 50%)',
                                },
                            }
                        },
                    }
                }
            },
        }
    });
})($ || ($ = {}));

;
	($.$mol_transit) = class $mol_transit extends ($.$mol_ghost) {
		animation_name_style(){
			return "";
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		style(){
			return {"animationName": (this.animation_name_style())};
		}
		event(){
			return {"animationend": (next) => (this.reset(next))};
		}
	};
	($mol_mem(($.$mol_transit.prototype), "reset"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_transit extends $.$mol_transit {
            view_rect_prev(reset) {
                return this.view_rect();
            }
            reset(next) {
                this.animation_stylesheet(null);
            }
            animation_name() {
                return 'mol_transit_aniation_' + $mol_key(this).slice(1, -1);
            }
            animation_name_style() {
                return this.animation_stylesheet() ? this.animation_name() : '';
            }
            animation_stylesheet(next) {
                const rect_next = this.view_rect();
                const rect_prev = $mol_mem_cached(() => this.view_rect_prev()) ?? null;
                this.view_rect_prev();
                if (next !== undefined)
                    return next;
                if (!rect_prev || !rect_next)
                    return null;
                const dx = Math.round(rect_prev.left - rect_next.left);
                const dy = Math.round(rect_prev.top - rect_next.top);
                const sx = rect_prev.width / rect_next.width;
                const sy = rect_prev.width / rect_next.width;
                const prev = $mol_mem_cached(() => this.animation_stylesheet());
                if (prev)
                    return prev;
                const name = this.animation_name();
                const el = $mol_style_attach(`${this.dom_id()}.animation()`, `
				@keyframes ${name} {
					from {
						transform: translate( ${dx}px, ${dy}px ) scale( ${sx}, ${sy} )
					}
					to {
						transform: translate(0,0) scale(1,1)
					}
				}
			`);
                if (el)
                    Object.assign(el, {
                        destructor() {
                            el.remove();
                        }
                    });
                return el;
            }
            auto() {
                this.animation_stylesheet();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_transit.prototype, "view_rect_prev", null);
        __decorate([
            $mol_memo.method
        ], $mol_transit.prototype, "animation_name", null);
        __decorate([
            $mol_mem
        ], $mol_transit.prototype, "animation_name_style", null);
        __decorate([
            $mol_mem
        ], $mol_transit.prototype, "animation_stylesheet", null);
        $$.$mol_transit = $mol_transit;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_transit, {
            transition: 'none',
            animation: {
                duration: `.25s`,
                timingFunction: `ease-out`,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_chess_board) = class $yuf_chess_board extends ($.$mol_view) {
		level_easy(){
			return (this.$.$mol_locale.text("$yuf_chess_board_level_easy"));
		}
		level_medium(){
			return (this.$.$mol_locale.text("$yuf_chess_board_level_medium"));
		}
		level_hard(){
			return (this.$.$mol_locale.text("$yuf_chess_board_level_hard"));
		}
		level_hardest(){
			return (this.$.$mol_locale.text("$yuf_chess_board_level_hardest"));
		}
		level_nightmare(){
			return (this.$.$mol_locale.text("$yuf_chess_board_level_nightmare"));
		}
		level(next){
			return (this.model().level(next));
		}
		moves_str(next){
			if(next !== undefined) return next;
			return "";
		}
		pending(){
			return false;
		}
		move_title(){
			return (this.$.$mol_locale.text("$yuf_chess_board_move_title"));
		}
		active_title(){
			return (this.move_title());
		}
		active_value(){
			return (this.active_value_white());
		}
		Active_field(){
			const obj = new this.$.$yuf_chess_board_label();
			(obj.pending) = () => ((this.pending()));
			(obj.title) = () => ((this.active_title()));
			(obj.content) = () => ([(this.active_value())]);
			return obj;
		}
		score_value(next){
			if(next !== undefined) return next;
			return "";
		}
		Score_field(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.score_value())]);
			return obj;
		}
		undo_title(){
			return (this.$.$mol_locale.text("$yuf_chess_board_undo_title"));
		}
		undo_icon(){
			const obj = new this.$.$mol_icon_undo();
			return obj;
		}
		undo_event(next){
			if(next !== undefined) return next;
			return null;
		}
		undo_enabled(){
			return false;
		}
		Undo(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.undo_title()));
			(obj.sub) = () => ([(this.undo_icon())]);
			(obj.click) = (next) => ((this.undo_event(next)));
			(obj.enabled) = () => ((this.undo_enabled()));
			return obj;
		}
		reset_title(){
			return (this.$.$mol_locale.text("$yuf_chess_board_reset_title"));
		}
		reset_enabled(){
			return false;
		}
		Reset_icon(){
			const obj = new this.$.$mol_icon_restart();
			return obj;
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		Reset(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.reset_title()));
			(obj.enabled) = () => ((this.reset_enabled()));
			(obj.sub) = () => ([(this.Reset_icon())]);
			(obj.click) = (next) => ((this.reset(next)));
			return obj;
		}
		help_title(){
			return (this.$.$mol_locale.text("$yuf_chess_board_help_title"));
		}
		help_enabled(){
			return false;
		}
		Help_icon(){
			const obj = new this.$.$mol_icon_lightbulb_question();
			return obj;
		}
		help(next){
			if(next !== undefined) return next;
			return null;
		}
		Help(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.help_title()));
			(obj.enabled) = () => ((this.help_enabled()));
			(obj.sub) = () => ([(this.Help_icon())]);
			(obj.click) = (next) => ((this.help(next)));
			return obj;
		}
		level_title(){
			return (this.$.$mol_locale.text("$yuf_chess_board_level_title"));
		}
		Level(){
			const obj = new this.$.$mol_select();
			(obj.Filter) = () => (null);
			(obj.value) = (next) => ((this.level(next)));
			(obj.enabled) = () => ((this.help_enabled()));
			(obj.dictionary) = () => ((this.levels()));
			(obj.hint) = () => ((this.level_title()));
			return obj;
		}
		toolbar_bottom(){
			return [];
		}
		toolbar_content(){
			return [
				(this.Active_field()), 
				(this.Score_field()), 
				(this.Undo()), 
				(this.Reset()), 
				(this.Help()), 
				(this.Level()), 
				...(this.toolbar_bottom())
			];
		}
		Toolbar(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (40);
			(obj.sub) = () => ((this.toolbar_content()));
			return obj;
		}
		gameover(){
			return "";
		}
		ruler_enabled(){
			return true;
		}
		y_name(id){
			return "";
		}
		Y_rule(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.y_name(id))]);
			return obj;
		}
		left(){
			return [(this.Y_rule("0"))];
		}
		Left(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.left()));
			return obj;
		}
		cell_id(id){
			return "";
		}
		cell_hint(id){
			return "";
		}
		cell_color(id){
			return "";
		}
		hilited(id){
			return false;
		}
		move_enabled(id){
			return true;
		}
		click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Cell_piece(id){
			return null;
		}
		Cell(id){
			const obj = new this.$.$yuf_chess_cell();
			(obj.id) = () => ((this.cell_id(id)));
			(obj.hint) = () => ((this.cell_hint(id)));
			(obj.color) = () => ((this.cell_color(id)));
			(obj.hilited) = () => ((this.hilited(id)));
			(obj.enabled) = () => ((this.move_enabled(id)));
			(obj.click) = (next) => ((this.click(id, next)));
			(obj.Sub) = () => ((this.Cell_piece(id)));
			return obj;
		}
		cells(){
			return [(this.Cell("0"))];
		}
		right(){
			return [];
		}
		Right(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.right()));
			return obj;
		}
		x_name(id){
			return "";
		}
		X_rule(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.x_name(id))]);
			return obj;
		}
		bottom(){
			return [(this.X_rule("0"))];
		}
		Bottom(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.bottom()));
			return obj;
		}
		fields_content(){
			return [
				(this.Left()), 
				...(this.cells()), 
				(this.Right()), 
				(this.Bottom())
			];
		}
		Fields(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({"yuf_chess_board_gameover": (this.gameover()), "yuf_chess_board_ruler": (this.ruler_enabled())});
			(obj.sub) = () => ((this.fields_content()));
			return obj;
		}
		rows(){
			return [(this.Toolbar()), (this.Fields())];
		}
		piece_type(id){
			return "p";
		}
		active_value_black(){
			return (this.$.$mol_locale.text("$yuf_chess_board_active_value_black"));
		}
		active_value_white(){
			return (this.$.$mol_locale.text("$yuf_chess_board_active_value_white"));
		}
		win_title(){
			return (this.$.$mol_locale.text("$yuf_chess_board_win_title"));
		}
		draw_title(){
			return (this.$.$mol_locale.text("$yuf_chess_board_draw_title"));
		}
		levels(){
			return {
				"easy": (this.level_easy()), 
				"medium": (this.level_medium()), 
				"hard": (this.level_hard()), 
				"hardest": (this.level_hardest()), 
				"nightmare": (this.level_nightmare())
			};
		}
		model(){
			const obj = new this.$.$yuf_chess_model();
			(obj.moves_str) = (next) => ((this.moves_str(next)));
			return obj;
		}
		sub(){
			return (this.rows());
		}
		Piece(id){
			const obj = new this.$.$yuf_chess_board_piece();
			(obj.type) = () => ((this.piece_type(id)));
			return obj;
		}
	};
	($mol_mem(($.$yuf_chess_board.prototype), "moves_str"));
	($mol_mem(($.$yuf_chess_board.prototype), "Active_field"));
	($mol_mem(($.$yuf_chess_board.prototype), "score_value"));
	($mol_mem(($.$yuf_chess_board.prototype), "Score_field"));
	($mol_mem(($.$yuf_chess_board.prototype), "undo_icon"));
	($mol_mem(($.$yuf_chess_board.prototype), "undo_event"));
	($mol_mem(($.$yuf_chess_board.prototype), "Undo"));
	($mol_mem(($.$yuf_chess_board.prototype), "Reset_icon"));
	($mol_mem(($.$yuf_chess_board.prototype), "reset"));
	($mol_mem(($.$yuf_chess_board.prototype), "Reset"));
	($mol_mem(($.$yuf_chess_board.prototype), "Help_icon"));
	($mol_mem(($.$yuf_chess_board.prototype), "help"));
	($mol_mem(($.$yuf_chess_board.prototype), "Help"));
	($mol_mem(($.$yuf_chess_board.prototype), "Level"));
	($mol_mem(($.$yuf_chess_board.prototype), "Toolbar"));
	($mol_mem_key(($.$yuf_chess_board.prototype), "Y_rule"));
	($mol_mem(($.$yuf_chess_board.prototype), "Left"));
	($mol_mem_key(($.$yuf_chess_board.prototype), "click"));
	($mol_mem_key(($.$yuf_chess_board.prototype), "Cell"));
	($mol_mem(($.$yuf_chess_board.prototype), "Right"));
	($mol_mem_key(($.$yuf_chess_board.prototype), "X_rule"));
	($mol_mem(($.$yuf_chess_board.prototype), "Bottom"));
	($mol_mem(($.$yuf_chess_board.prototype), "Fields"));
	($mol_mem(($.$yuf_chess_board.prototype), "model"));
	($mol_mem_key(($.$yuf_chess_board.prototype), "Piece"));
	($.$yuf_chess_board_piece) = class $yuf_chess_board_piece extends ($.$mol_transit) {
		type(){
			return "p";
		}
		Icon(){
			const obj = new this.$.$yuf_chess_piece();
			(obj.type) = () => ((this.type()));
			return obj;
		}
		Sub(){
			return (this.Icon());
		}
	};
	($mol_mem(($.$yuf_chess_board_piece.prototype), "Icon"));
	($.$yuf_chess_board_label) = class $yuf_chess_board_label extends ($.$mol_view) {
		pending(){
			return false;
		}
		title(){
			return "";
		}
		label(){
			return [(this.title())];
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (24);
			(obj.sub) = () => ((this.label()));
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (24);
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		rows(){
			return [(this.Label()), (this.Content())];
		}
		attr(){
			return {...(super.attr()), "yuf_chess_board_label_pending": (this.pending())};
		}
		sub(){
			return (this.rows());
		}
	};
	($mol_mem(($.$yuf_chess_board_label.prototype), "Label"));
	($mol_mem(($.$yuf_chess_board_label.prototype), "Content"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_chess_board extends $.$yuf_chess_board {
            active_value() {
                const model = this.model();
                const color = model.active_color();
                const status = model.status();
                return color === (status ? 'w' : 'b') ? this.active_value_black() : this.active_value_white();
            }
            fields_content() {
                if (this.ruler_enabled())
                    return super.fields_content();
                const Left = this.Left();
                const Right = this.Right();
                const Bottom = this.Bottom();
                return super.fields_content().filter(el => el !== Left && el !== Right && el !== Bottom);
            }
            active_title() {
                const model = this.model();
                const status = model.status();
                if (!status)
                    return this.move_title();
                return status ? this.win_title() : this.draw_title();
            }
            reset() { this.model().started_at(null); }
            user_score() { return this.model().user_score(); }
            score_value() {
                const score = this.user_score();
                if (!score)
                    return super.score_value();
                return '' + score;
            }
            toolbar_content() {
                const user_has_move = this.user_score();
                return super.toolbar_content().filter(el => el === this.Score_field() ? user_has_move : true);
            }
            help(e) {
                const model = this.model();
                const best = model.best();
                if (!best)
                    return;
                const next = model.selected() === best.from ? best.to : best.from;
                model.select(next);
            }
            undo_enabled() { return this.model().moves().length > 0 && !this.model().enemy_active(); }
            help_enabled() { return !this.model().enemy_active(); }
            reset_enabled() { return !this.model().enemy_active(); }
            gameover() {
                try {
                    if (!this.model().status())
                        return '';
                    return this.model().active_color();
                }
                catch (e) {
                    $mol_fail_log(e);
                    return $mol_wire_probe(() => this.gameover()) ?? '';
                }
            }
            cell_color(id) { return this.$.$yuf_chess_position_color(id); }
            cell_hint(id) { return this.model().piece_type(id) ?? ''; }
            cell_id(id) { return id; }
            ids() {
                return $yuf_chess_position_y.flatMap(y_name => $yuf_chess_position_x.map(x_name => `${x_name}${y_name}`));
            }
            cells() {
                return this.ids().map(position => this.Cell(position));
            }
            Cell_piece(position) {
                const piece_id = this.model().piece_id(position);
                return piece_id ? this.Piece(piece_id) : null;
            }
            undo_event(e) {
                e?.preventDefault();
                this.model().undo();
            }
            piece_type(piece) { return piece[0]; }
            hilited(target) {
                return this.model().hilited(target);
            }
            pending() { return !!this.model().move_suggest(); }
            click(current, e) {
                e && $mol_wire_sync(e).preventDefault();
                return this.model().select(current);
            }
            bottom() { return this.$.$yuf_chess_position_x.map(id => this.X_rule(id)); }
            x_name(id) { return id; }
            left() { return this.$.$yuf_chess_position_y.map(id => this.Y_rule(id + 'l')); }
            right() { return this.$.$yuf_chess_position_y.map(id => this.Y_rule(id + 'r')); }
            y_name(id) { return id.slice(0, -1); }
        }
        __decorate([
            $mol_mem
        ], $yuf_chess_board.prototype, "score_value", null);
        __decorate([
            $mol_mem
        ], $yuf_chess_board.prototype, "gameover", null);
        __decorate([
            $mol_mem
        ], $yuf_chess_board.prototype, "ids", null);
        __decorate([
            $mol_mem
        ], $yuf_chess_board.prototype, "cells", null);
        __decorate([
            $mol_mem_key
        ], $yuf_chess_board.prototype, "Cell_piece", null);
        __decorate([
            $mol_mem
        ], $yuf_chess_board.prototype, "bottom", null);
        __decorate([
            $mol_mem
        ], $yuf_chess_board.prototype, "left", null);
        __decorate([
            $mol_mem
        ], $yuf_chess_board.prototype, "right", null);
        $$.$yuf_chess_board = $yuf_chess_board;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("yuf/chess/board/board.view.css", ":root {\n\t--yuf_chess_board_round: .5rem;\n\t--yuf_chess_cell_round: .25rem;\n\t/* --yuf_chess_cell_border: rgb(113, 79, 33); */\n\t--yuf_chess_cell_white: #b5915f;\n\t--yuf_chess_cell_black: #7b3109;\n\t--yuf_chess_cell_hilite: #f41a03;\n}\n\n\n[yuf_chess_board_label_pending=\"true\"]:not([mol_view_error=\"Promise\"]) {\n\tanimation: mol_view_wait 1s steps(20,end) infinite;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { rem, px, em, per, vw, vh, vmin, s } = $mol_style_unit;
    const { calc, hsla, vary, steps } = $mol_style_func;
    $mol_style_define($yuf_chess_board_label, {
        flex: {
            direction: 'row',
            wrap: 'nowrap',
            grow: 1,
            shrink: 1,
        },
        gap: $mol_gap.space,
        padding: $mol_gap.text,
        Label: {
            minHeight: '1.5rem'
        },
        Content: {
            minHeight: '1.5rem'
        },
    });
    $mol_style_define($yuf_chess_board, {
        background: {
            color: $mol_theme.card,
        },
        border: { radius: vary('--yuf_chess_board_round') },
        display: 'flex',
        flex: {
            direction: 'column',
            grow: 0,
            shrink: 1,
            basis: '80vh',
        },
        Toolbar: {
            minHeight: '2.5rem',
            padding: {
                left: rem(1),
            },
        },
        Fields: {
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(8, 1fr)',
            alignItems: 'stretch',
            overflow: 'auto',
            aspectRatio: 1,
            padding: {
                bottom: 0
            },
            '@': {
                yuf_chess_board_gameover: {
                    'w': {
                        Cell: {
                            filter: 'grayscale(1)'
                        }
                    },
                    'b': {
                        Cell: {
                            filter: 'sepia(.75)'
                        }
                    }
                },
                yuf_chess_board_ruler: {
                    'true': {
                        gridTemplateColumns: '1.25rem repeat(8, 1fr) 1.25rem',
                    }
                }
            }
        },
        Left: {
            display: 'grid',
            gridTemplateColumns: 'auto',
            gridTemplateRows: 'repeat(8, 1fr)',
            gridColumnStart: '1',
            gridColumnEnd: '1',
            gridRowStart: '1',
            gridRowEnd: '9',
        },
        Right: {
            display: 'grid',
            gridTemplateColumns: 'auto',
            gridTemplateRows: 'repeat(8, 1fr)',
            gridColumnStart: '10',
            gridColumnEnd: '10',
            gridRowStart: '1',
            gridRowEnd: '9',
        },
        Bottom: {
            display: 'grid',
            gridTemplateRows: 'auto',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridColumnStart: '2',
            gridColumnEnd: '10',
            gridRowStart: '9',
            gridRowEnd: '9',
        },
        Cell: {
            transitionProperty: 'filter',
            transitionDuration: '1s',
            '@': {
                yuf_chess_cell_id: {
                    'h1': {
                        borderBottomRightRadius: vary('--yuf_chess_cell_round'),
                    },
                    'a1': {
                        borderBottomLeftRadius: vary('--yuf_chess_cell_round'),
                    },
                    'h8': {
                        borderTopRightRadius: vary('--yuf_chess_cell_round'),
                    },
                    'a8': {
                        borderTopLeftRadius: vary('--yuf_chess_cell_round'),
                    },
                },
            }
        },
        Score_field: {
            flex: {
                direction: 'column',
            },
            justifyContent: 'center',
            alignItems: 'center',
        },
        Y_rule: {
            flex: {
                direction: 'column',
            },
            justifyContent: 'center',
            alignItems: 'center',
        },
        X_rule: {
            flex: {
                direction: 'column',
            },
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
})($ || ($ = {}));

;
	($.$yuf_chess_demo) = class $yuf_chess_demo extends ($.$mol_example_small) {
		moves_str(next){
			if(next !== undefined) return next;
			return "";
		}
		chess_model(){
			const obj = new this.$.$yuf_chess_model_stockfish();
			(obj.moves_str) = (next) => ((this.moves_str(next)));
			return obj;
		}
		Chess_board(){
			const obj = new this.$.$yuf_chess_board();
			(obj.model) = () => ((this.chess_model()));
			return obj;
		}
		title(){
			return "Chess board";
		}
		sub(){
			return [(this.Chess_board())];
		}
		tags(){
			return [
				"drag", 
				"dragndrop", 
				"game", 
				"chess"
			];
		}
		aspects(){
			return ["Application"];
		}
	};
	($mol_mem(($.$yuf_chess_demo.prototype), "moves_str"));
	($mol_mem(($.$yuf_chess_demo.prototype), "chess_model"));
	($mol_mem(($.$yuf_chess_demo.prototype), "Chess_board"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_chess_demo extends $.$yuf_chess_demo {
            moves_str(next) {
                return this.$.$mol_state_arg.value(this.state_key('chess'), next === undefined ? next : (next || null)) ?? '';
            }
            auto() {
                this.chess_model().auto();
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_chess_demo.prototype, "moves_str", null);
        $$.$yuf_chess_demo = $yuf_chess_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_keyboard) = class $mol_icon_keyboard extends ($.$mol_icon) {
		path(){
			return "M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z";
		}
	};


;
"use strict";

;
	($.$yuf_keyboard_check) = class $yuf_keyboard_check extends ($.$mol_check_icon) {
		tabindex(){
			return -1;
		}
		attr(){
			return {...(super.attr()), "tabindex": (this.tabindex())};
		}
		Icon(){
			const obj = new this.$.$mol_icon_keyboard();
			return obj;
		}
		Input(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Target(next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem(($.$yuf_keyboard_check.prototype), "Icon"));
	($mol_mem(($.$yuf_keyboard_check.prototype), "Input"));
	($mol_mem(($.$yuf_keyboard_check.prototype), "Target"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_keyboard_check extends $.$yuf_keyboard_check {
            checked(next) {
                const target = this.Target();
                const input = this.Input();
                if (next)
                    this.Target(input);
                if (next === false)
                    this.Target(null);
                return next ?? (target === input);
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_keyboard_check.prototype, "checked", null);
        $$.$yuf_keyboard_check = $yuf_keyboard_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_keyboard_layout_en) = class $yuf_keyboard_layout_en extends ($.$mol_view) {
		lang_key(){
			return "\u0001lang";
		}
		before_space(){
			return [];
		}
		controls(){
			return [
				"\u0001⇑", 
				(this.lang_key()), 
				"\u0001,.;", 
				...(this.before_space()), 
				" ", 
				"\u0001⌫", 
				"\u0001◀", 
				"\u0001▶"
			];
		}
		alpha3_end(){
			return [
				",", 
				".", 
				"@"
			];
		}
		special_4_end(){
			return [
				" ", 
				"\u0001⌫", 
				"\u0001◀", 
				"\u0001▶"
			];
		}
		variants(){
			return {"": [
				(this.digits()), 
				(this.alpha_1()), 
				(this.alpha_2()), 
				(this.alpha_3()), 
				(this.controls())
			], "special": [
				(this.digits()), 
				(this.special_1()), 
				(this.special_2()), 
				(this.special_3()), 
				(this.special_4())
			]};
		}
		digits(){
			return [
				"1", 
				"2", 
				"3", 
				"4", 
				"5", 
				"6", 
				"7", 
				"8", 
				"9", 
				"0"
			];
		}
		alpha_1(){
			return [
				"Q", 
				"W", 
				"E", 
				"R", 
				"T", 
				"Y", 
				"U", 
				"I", 
				"O", 
				"P"
			];
		}
		alpha_2(){
			return [
				"A", 
				"S", 
				"D", 
				"F", 
				"G", 
				"H", 
				"J", 
				"K", 
				"L", 
				";"
			];
		}
		alpha_3(){
			return [
				"Z", 
				"X", 
				"C", 
				"V", 
				"B", 
				"N", 
				"M", 
				...(this.alpha3_end())
			];
		}
		special_1(){
			return [
				"!", 
				"@", 
				"#", 
				"$", 
				"%", 
				"^", 
				"&", 
				"*", 
				"(", 
				")"
			];
		}
		special_2(){
			return [
				"-", 
				"+", 
				"=", 
				"_", 
				"~", 
				"`", 
				"{", 
				"}", 
				"[", 
				"]"
			];
		}
		special_3(){
			return [
				"/", 
				"\\", 
				"|", 
				"'", 
				"\"", 
				"~", 
				"<", 
				">", 
				":", 
				";"
			];
		}
		special_4(){
			return [
				".", 
				",", 
				"\u0001abc", 
				"?", 
				...(this.special_4_end())
			];
		}
	};


;
"use strict";

;
	($.$yuf_keyboard_layout_ru) = class $yuf_keyboard_layout_ru extends ($.$yuf_keyboard_layout_en) {
		before_space(){
			return [
				"Х", 
				"Ъ", 
				"Э"
			];
		}
		alpha_1(){
			return [
				"Й", 
				"Ц", 
				"У", 
				"К", 
				"Е", 
				"Н", 
				"Г", 
				"Ш", 
				"Щ", 
				"З"
			];
		}
		alpha_2(){
			return [
				"Ф", 
				"Ы", 
				"В", 
				"А", 
				"П", 
				"Р", 
				"О", 
				"Л", 
				"Д", 
				"Ж"
			];
		}
		alpha_3(){
			return [
				"Я", 
				"Ч", 
				"С", 
				"М", 
				"И", 
				"Т", 
				"Ь", 
				"Б", 
				"Ю", 
				"Ё"
			];
		}
	};


;
"use strict";

;
	($.$yuf_keyboard_cell) = class $yuf_keyboard_cell extends ($.$mol_view) {
		width_mul(){
			return null;
		}
		start(next){
			if(next !== undefined) return next;
			return null;
		}
		end(next){
			if(next !== undefined) return next;
			return null;
		}
		abort(next){
			if(next !== undefined) return next;
			return null;
		}
		symbol(){
			return "";
		}
		title(){
			return (this.symbol());
		}
		input(next){
			if(next !== undefined) return next;
			return null;
		}
		upcase(){
			return true;
		}
		style(){
			return {...(super.style()), "--yuf_keyboard_cell_width_mul": (this.width_mul())};
		}
		event(){
			return {
				...(super.event()), 
				"pointerdown": (next) => (this.start(next)), 
				"pointerup": (next) => (this.end(next)), 
				"pointercancel": (next) => (this.abort(next))
			};
		}
		sub(){
			return [(this.title())];
		}
	};
	($mol_mem(($.$yuf_keyboard_cell.prototype), "start"));
	($mol_mem(($.$yuf_keyboard_cell.prototype), "end"));
	($mol_mem(($.$yuf_keyboard_cell.prototype), "abort"));
	($mol_mem(($.$yuf_keyboard_cell.prototype), "input"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_keyboard_cell extends $.$yuf_keyboard_cell {
            title() {
                let title = super.title().replaceAll('', '');
                if (!this.upcase())
                    title = title.toLowerCase();
                return title;
            }
            down_target = null;
            start(next) {
                if (!next)
                    return;
                next.preventDefault();
                this.dom_node().releasePointerCapture(next.pointerId);
                this.down_target = next.target;
            }
            end(next) {
                if (!next)
                    return;
                if (next.defaultPrevented)
                    return;
                if (this.down_target === next.target) {
                    this.input(new InputEvent('input', { data: this.symbol() }));
                }
                this.down_target = null;
            }
            abort(next) {
                if (!next)
                    return;
                if (next.defaultPrevented)
                    return;
                this.input(new InputEvent('input', { data: '' }));
            }
        }
        $$.$yuf_keyboard_cell = $yuf_keyboard_cell;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_keyboard_row) = class $yuf_keyboard_row extends ($.$mol_view) {
		cell_symbol(id){
			return "?";
		}
		cell_input(id, next){
			if(next !== undefined) return next;
			return null;
		}
		upcase(){
			return false;
		}
		width_mul(id){
			return null;
		}
		Cell(id){
			const obj = new this.$.$yuf_keyboard_cell();
			(obj.symbol) = () => ((this.cell_symbol(id)));
			(obj.input) = (next) => ((this.cell_input(id, next)));
			(obj.upcase) = () => ((this.upcase()));
			(obj.width_mul) = () => ((this.width_mul(id)));
			return obj;
		}
		cells(){
			return [(this.Cell("0"))];
		}
		layout(){
			return [];
		}
		input(next){
			if(next !== undefined) return next;
			return null;
		}
		max_buttons(){
			return 10;
		}
		lang_next(){
			return "en";
		}
		sub(){
			return (this.cells());
		}
	};
	($mol_mem_key(($.$yuf_keyboard_row.prototype), "cell_input"));
	($mol_mem_key(($.$yuf_keyboard_row.prototype), "Cell"));
	($mol_mem(($.$yuf_keyboard_row.prototype), "input"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_keyboard_row extends $.$yuf_keyboard_row {
            cells() {
                return this.layout().map((symbol, index) => this.Cell(index));
            }
            cell_symbol(col_index) {
                const title = this.layout()[col_index] ?? super.cell_symbol(col_index);
                if (title === 'lang')
                    return this.lang_next();
                return title;
            }
            cell_input(col_index, next) {
                if (!next)
                    return;
                this.input(next);
            }
            width_mul(col_index) {
                const title = this.cell_symbol(col_index);
                if (title !== ' ')
                    return super.width_mul(col_index);
                const diff = this.max_buttons() - this.layout().length + 1;
                return diff.toFixed(0);
            }
        }
        $$.$yuf_keyboard_row = $yuf_keyboard_row;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_keyboard_card) = class $yuf_keyboard_card extends ($.$mol_view) {
		Layout_en(){
			const obj = new this.$.$yuf_keyboard_layout_en();
			return obj;
		}
		Layout_ru(){
			const obj = new this.$.$yuf_keyboard_layout_ru();
			return obj;
		}
		max_buttons(){
			return 10;
		}
		row_layout(id){
			return [];
		}
		row_input(id, next){
			if(next !== undefined) return next;
			return null;
		}
		upcase(next){
			if(next !== undefined) return next;
			return false;
		}
		lang_next(){
			return "en";
		}
		Row(id){
			const obj = new this.$.$yuf_keyboard_row();
			(obj.max_buttons) = () => ((this.max_buttons()));
			(obj.layout) = () => ((this.row_layout(id)));
			(obj.input) = (next) => ((this.row_input(id, next)));
			(obj.upcase) = () => ((this.upcase()));
			(obj.lang_next) = () => ((this.lang_next()));
			return obj;
		}
		rows(){
			return [(this.Row("0"))];
		}
		layout(next){
			if(next !== undefined) return next;
			return "en";
		}
		variant(next){
			if(next !== undefined) return next;
			return "";
		}
		area(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		layouts(){
			return {"en": (this.Layout_en()), "ru": (this.Layout_ru())};
		}
		sub(){
			return (this.rows());
		}
	};
	($mol_mem(($.$yuf_keyboard_card.prototype), "Layout_en"));
	($mol_mem(($.$yuf_keyboard_card.prototype), "Layout_ru"));
	($mol_mem_key(($.$yuf_keyboard_card.prototype), "row_input"));
	($mol_mem(($.$yuf_keyboard_card.prototype), "upcase"));
	($mol_mem_key(($.$yuf_keyboard_card.prototype), "Row"));
	($mol_mem(($.$yuf_keyboard_card.prototype), "layout"));
	($mol_mem(($.$yuf_keyboard_card.prototype), "variant"));
	($mol_mem(($.$yuf_keyboard_card.prototype), "area"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_keyboard_card extends $.$yuf_keyboard_card {
            row_input(row_index, next) {
                if (!next)
                    return;
                this.input(next);
            }
            max_buttons() {
                const layouts = this.layouts();
                let max = super.max_buttons();
                for (const layout of Object.values(layouts)) {
                    const rows = layout.variants()[''];
                    if (!rows.length)
                        continue;
                    for (const row of rows) {
                        max = Math.max(max, row.length);
                    }
                }
                return max;
            }
            layout_ids() {
                return Object.keys(this.layouts());
            }
            layout_variants() {
                const layouts = this.layouts();
                const layout = layouts[this.layout()] ?? layouts[''];
                return layout.variants();
            }
            layout_switch() {
                this.layout(this.lang_next());
            }
            lang_next() {
                const layouts = this.layout_ids();
                let index = layouts.indexOf(this.layout()) + 1;
                if (index >= layouts.length)
                    index = 0;
                return layouts[index];
            }
            variant_next() {
                const variants = Object.keys(this.layout_variants());
                let index = variants.indexOf(this.variant()) + 1;
                if (index >= variants.length)
                    index = 0;
                return variants[index];
            }
            variant_switch() {
                this.variant(this.variant_next());
            }
            layout_rows() {
                return this.layout_variants()?.[this.variant()];
            }
            row_layout(row_index) {
                const rows = this.layout_rows();
                return rows[row_index];
            }
            rows() {
                return this.layout_rows().map((row, index) => this.Row(index));
            }
            reset() {
                this.variant('');
            }
            input(next) {
                if (!next)
                    return;
                let val = next.data;
                if (this.layout_ids().includes(val)) {
                    return this.layout_switch();
                }
                if (val === 'abc' || val === ',.;')
                    return this.variant_switch();
                if (val === '⇑') {
                    this.upcase(!this.upcase());
                    this.reset();
                    return;
                }
                const el = this.area().dom_node();
                const active = this.$.$mol_dom_context.document.activeElement;
                if (active !== el)
                    return;
                let sel_start = el.selectionStart ?? 0;
                let sel_end = el.selectionEnd ?? 0;
                let before = el.value.slice(0, sel_start);
                let sel = el.value.slice(sel_start, sel_end);
                let after = el.value.slice(sel_end);
                switch (val) {
                    case '◀':
                        el.selectionEnd = sel_start - 1;
                        this.reset();
                        return;
                    case '▶':
                        el.selectionStart = sel_end + 1;
                        this.reset();
                        return;
                    case '⌫':
                        if (!sel)
                            before = before.slice(0, -1);
                        val = '';
                        break;
                    case '↩':
                        $mol_dom.document.execCommand('undo');
                        return;
                    case '↪':
                        $mol_dom.document.execCommand('redo');
                        return;
                }
                if (!this.upcase())
                    val = val.toLowerCase();
                el.value = before + val + after;
                el.selectionStart = el.selectionEnd = before.length + val.length;
                el.dispatchEvent(next);
                this.reset();
                this.upcase(false);
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_keyboard_card.prototype, "max_buttons", null);
        __decorate([
            $mol_action
        ], $yuf_keyboard_card.prototype, "layout_switch", null);
        __decorate([
            $mol_mem
        ], $yuf_keyboard_card.prototype, "lang_next", null);
        __decorate([
            $mol_mem
        ], $yuf_keyboard_card.prototype, "variant_next", null);
        __decorate([
            $mol_action
        ], $yuf_keyboard_card.prototype, "variant_switch", null);
        $$.$yuf_keyboard_card = $yuf_keyboard_card;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_keyboard_card, {
            '--yuf_keyboard_button_width': '2.5rem',
            '--yuf_keyboard_button_height': 'var(--yuf_keyboard_button_width)',
            flex: {
                direction: 'column',
                wrap: 'wrap',
            },
            background: {
                color: $mol_theme.card,
            },
            border: {
                radius: $mol_gap.round,
            },
        });
        $mol_style_define($yuf_keyboard_row, {});
        $mol_style_define($yuf_keyboard_cell, {
            '--yuf_keyboard_cell_width_mul': '1',
            cursor: 'pointer',
            touchAction: 'none',
            transition: 'none',
            background: {
                color: $mol_theme.card,
            },
            ':hover': {
                background: {
                    color: $mol_theme.hover,
                },
            },
            align: {
                items: 'center',
            },
            justify: {
                content: 'center',
            },
            box: {
                shadow: [[0, 0, 0, `1px`, $mol_theme.line]],
            },
            width: `calc( var(--yuf_keyboard_button_width) * var(--yuf_keyboard_cell_width_mul) )`,
            height: $mol_style_func.vary('--yuf_keyboard_button_height'),
            border: {
                radius: $mol_gap.round,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_keyboard_field) = class $yuf_keyboard_field extends ($.$mol_view) {
		Control(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		keyboard_enabled(next){
			if(next !== undefined) return next;
			return false;
		}
		Trigger(){
			const obj = new this.$.$yuf_keyboard_check();
			(obj.checked) = (next) => ((this.keyboard_enabled(next)));
			return obj;
		}
		trigger_content(){
			return [(this.Trigger())];
		}
		First(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Control()), ...(this.trigger_content())]);
			return obj;
		}
		Layout_en(){
			const obj = new this.$.$yuf_keyboard_layout_en();
			return obj;
		}
		Layout_ru(){
			const obj = new this.$.$yuf_keyboard_layout_ru();
			return obj;
		}
		layouts(){
			return {"en": (this.Layout_en()), "ru": (this.Layout_ru())};
		}
		input_focused(next){
			return (this.Input().focused(next));
		}
		Input(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Keyboard(){
			const obj = new this.$.$yuf_keyboard_card();
			(obj.layouts) = () => ((this.layouts()));
			(obj.area) = () => ((this.Input()));
			return obj;
		}
		keyboard_content(){
			return [(this.Keyboard())];
		}
		trigger_enabled(){
			return false;
		}
		sub(){
			return [(this.First()), ...(this.keyboard_content())];
		}
	};
	($mol_mem(($.$yuf_keyboard_field.prototype), "Control"));
	($mol_mem(($.$yuf_keyboard_field.prototype), "keyboard_enabled"));
	($mol_mem(($.$yuf_keyboard_field.prototype), "Trigger"));
	($mol_mem(($.$yuf_keyboard_field.prototype), "First"));
	($mol_mem(($.$yuf_keyboard_field.prototype), "Layout_en"));
	($mol_mem(($.$yuf_keyboard_field.prototype), "Layout_ru"));
	($mol_mem(($.$yuf_keyboard_field.prototype), "Input"));
	($mol_mem(($.$yuf_keyboard_field.prototype), "Keyboard"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_keyboard_field extends $.$yuf_keyboard_field {
            static keyboard_enabled(next) {
                return next ?? false;
            }
            static target(next) {
                if (!this.keyboard_enabled())
                    return null;
                return next || null;
            }
            keyboard_enabled(next) {
                if (next)
                    this.input_focused(true);
                return this.$.$yuf_keyboard_field.keyboard_enabled(next);
            }
            target(next) {
                return this.$.$yuf_keyboard_field.target(next);
            }
            auto() {
                if (this.input_focused())
                    new $mol_after_frame(() => this.target(this.Input()));
            }
            trigger_content() {
                return this.trigger_enabled() ? super.trigger_content() : [];
            }
            keyboard_content() {
                return this.target() === this.Input() ? super.keyboard_content() : [];
            }
            Control() { return this.Input(); }
        }
        __decorate([
            $mol_mem
        ], $yuf_keyboard_field, "keyboard_enabled", null);
        __decorate([
            $mol_mem
        ], $yuf_keyboard_field, "target", null);
        $$.$yuf_keyboard_field = $yuf_keyboard_field;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_keyboard_field, {
            flex: {
                direction: 'column',
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_labeler) = class $mol_labeler extends ($.$mol_list) {
		label(){
			return [(this.title())];
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (32);
			(obj.sub) = () => ((this.label()));
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (24);
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		rows(){
			return [(this.Label()), (this.Content())];
		}
	};
	($mol_mem(($.$mol_labeler.prototype), "Label"));
	($mol_mem(($.$mol_labeler.prototype), "Content"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/labeler/labeler.view.css", "[mol_labeler] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: stretch;\n\tcursor: inherit;\n}\n\n[mol_labeler_label] {\n\tmin-height: 2rem;\n\tcolor: var(--mol_theme_shade);\n\tpadding: .5rem .75rem 0;\n\tgap: 0 var(--mol_gap_block);\n\tflex-wrap: wrap;\n}\n\n[mol_labeler_content] {\n\tdisplay: flex;\n\tpadding: var(--mol_gap_text);\n\tmin-height: 2.5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_form_field) = class $mol_form_field extends ($.$mol_labeler) {
		name(){
			return "";
		}
		bid(){
			return "";
		}
		Bid(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.bid())]);
			return obj;
		}
		control(){
			return null;
		}
		bids(){
			return [];
		}
		label(){
			return [(this.name()), (this.Bid())];
		}
		content(){
			return [(this.control())];
		}
	};
	($mol_mem(($.$mol_form_field.prototype), "Bid"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_form_field extends $.$mol_form_field {
            bid() {
                return this.bids().filter(Boolean)[0] ?? '';
            }
        }
        __decorate([
            $mol_mem
        ], $mol_form_field.prototype, "bid", null);
        $$.$mol_form_field = $mol_form_field;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/form/field/field.view.css", "[mol_form_field] {\n\talign-items: stretch;\n}\n\n[mol_form_field_bid] {\n\tcolor: var(--mol_theme_focus);\n\tdisplay: inline-block;\n\ttext-shadow: 0 0;\n}\n\n[mol_form_field_content] {\n\tborder-radius: var(--mol_gap_round);\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_eye) = class $mol_icon_eye extends ($.$mol_icon) {
		path(){
			return "M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z";
		}
	};


;
"use strict";

;
	($.$mol_password) = class $mol_password extends ($.$mol_view) {
		hint(){
			return "";
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		Pass(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ((this.type()));
			(obj.hint) = () => ((this.hint()));
			(obj.value) = (next) => ((this.value(next)));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		checked(next){
			if(next !== undefined) return next;
			return true;
		}
		Show_icon(){
			const obj = new this.$.$mol_icon_eye();
			return obj;
		}
		Show(){
			const obj = new this.$.$mol_check_icon();
			(obj.checked) = (next) => ((this.checked(next)));
			(obj.Icon) = () => ((this.Show_icon()));
			return obj;
		}
		content(){
			return [(this.Pass()), (this.Show())];
		}
		type(next){
			if(next !== undefined) return next;
			return "password";
		}
		sub(){
			return (this.content());
		}
	};
	($mol_mem(($.$mol_password.prototype), "value"));
	($mol_mem(($.$mol_password.prototype), "submit"));
	($mol_mem(($.$mol_password.prototype), "Pass"));
	($mol_mem(($.$mol_password.prototype), "checked"));
	($mol_mem(($.$mol_password.prototype), "Show_icon"));
	($mol_mem(($.$mol_password.prototype), "Show"));
	($mol_mem(($.$mol_password.prototype), "type"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_password extends $.$mol_password {
            checked(next) {
                this.type(next ? 'text' : 'password');
                return next ?? false;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_password.prototype, "checked", null);
        $$.$mol_password = $mol_password;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_button_major) = class $mol_button_major extends ($.$mol_button_minor) {
		theme(){
			return "$mol_theme_base";
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/major/major.view.css", "[mol_button_major] {\n\tbackground-color: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_row) = class $mol_row extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/row/row.view.css", "[mol_row] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\talign-content: flex-start;\n\tjustify-content: flex-start;\n\tpadding: var(--mol_gap_block);\n\tgap: var(--mol_gap_block);\n\tflex: 0 0 auto;\n\tbox-sizing: border-box;\n\tmax-width: 100%;\n}\n\n[mol_row] > * {\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$mol_form) = class $mol_form extends ($.$mol_list) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		form_invalid(){
			return (this.$.$mol_locale.text("$mol_form_form_invalid"));
		}
		form_fields(){
			return [];
		}
		body(){
			return (this.form_fields());
		}
		Body(){
			const obj = new this.$.$mol_list();
			(obj.sub) = () => ((this.body()));
			return obj;
		}
		submit_title(){
			return (this.$.$mol_locale.text("$mol_form_submit_title"));
		}
		submit_hint(){
			return "";
		}
		submit_activate(next){
			return (this.Submit().activate(next));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		Submit(){
			const obj = new this.$.$mol_button_major();
			(obj.title) = () => ((this.submit_title()));
			(obj.hint) = () => ((this.submit_hint()));
			(obj.click) = (next) => ((this.submit(next)));
			return obj;
		}
		result(next){
			if(next !== undefined) return next;
			return null;
		}
		Result(){
			const obj = new this.$.$mol_status();
			(obj.message) = () => ((this.result()));
			return obj;
		}
		buttons(){
			return [(this.Submit()), (this.Result())];
		}
		foot(){
			return (this.buttons());
		}
		Foot(){
			const obj = new this.$.$mol_row();
			(obj.sub) = () => ((this.foot()));
			return obj;
		}
		submit_allowed(){
			return true;
		}
		submit_blocked(){
			return false;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		save(next){
			if(next !== undefined) return next;
			return null;
		}
		message_done(){
			return (this.$.$mol_locale.text("$mol_form_message_done"));
		}
		errors(){
			return {"Form invalid": (this.form_invalid())};
		}
		rows(){
			return [(this.Body()), (this.Foot())];
		}
	};
	($mol_mem(($.$mol_form.prototype), "keydown"));
	($mol_mem(($.$mol_form.prototype), "Body"));
	($mol_mem(($.$mol_form.prototype), "submit"));
	($mol_mem(($.$mol_form.prototype), "Submit"));
	($mol_mem(($.$mol_form.prototype), "result"));
	($mol_mem(($.$mol_form.prototype), "Result"));
	($mol_mem(($.$mol_form.prototype), "Foot"));
	($mol_mem(($.$mol_form.prototype), "save"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/form/form.view.css", "[mol_form] {\r\n\tgap: var(--mol_gap_block);\r\n}\r\n\r\n[mol_form_body] {\r\n\tgap: var(--mol_gap_block);\r\n}");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_form extends $.$mol_form {
            form_fields() {
                return [...this.view_find(view => view instanceof $mol_form_field)]
                    .map(path => path[path.length - 1]);
            }
            submit_allowed() {
                return this.form_fields().every(field => !field.bid());
            }
            submit_blocked() {
                return !this.submit_allowed();
            }
            keydown(next) {
                if (next.ctrlKey && next.keyCode === $mol_keyboard_code.enter && !this.submit_blocked())
                    this.submit(next);
            }
            result(next) {
                if (next instanceof Error)
                    next = this.errors()[next.message] || next.message || this.form_invalid();
                return next ?? '';
            }
            buttons() {
                return [
                    this.Submit(),
                    ...this.result() ? [this.Result()] : [],
                ];
            }
            submit(next) {
                try {
                    if (!this.submit_allowed()) {
                        throw new Error('Form invalid');
                    }
                    this.save(next);
                }
                catch (e) {
                    if ($mol_promise_like(e))
                        $mol_fail_hidden(e);
                    $mol_fail_log(e);
                    this.result(e);
                    return false;
                }
                this.result(this.message_done());
                return true;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_form.prototype, "form_fields", null);
        __decorate([
            $mol_mem
        ], $mol_form.prototype, "submit_allowed", null);
        __decorate([
            $mol_mem
        ], $mol_form.prototype, "result", null);
        __decorate([
            $mol_mem
        ], $mol_form.prototype, "buttons", null);
        __decorate([
            $mol_action
        ], $mol_form.prototype, "submit", null);
        $$.$mol_form = $mol_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_keyboard_demo) = class $yuf_keyboard_demo extends ($.$mol_example_small) {
		username(next){
			if(next !== undefined) return next;
			return "";
		}
		Username(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.username(next)));
			return obj;
		}
		Username_keyboard(){
			const obj = new this.$.$yuf_keyboard_field();
			(obj.trigger_enabled) = () => (true);
			(obj.Input) = () => ((this.Username()));
			return obj;
		}
		Username_label(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Username");
			(obj.control) = () => ((this.Username_keyboard()));
			return obj;
		}
		Password_input(){
			return (this.Password().Pass());
		}
		password(next){
			if(next !== undefined) return next;
			return "";
		}
		Password(){
			const obj = new this.$.$mol_password();
			(obj.value) = (next) => ((this.password(next)));
			return obj;
		}
		Password_keyboard(){
			const obj = new this.$.$yuf_keyboard_field();
			(obj.Input) = () => ((this.Password_input()));
			(obj.Control) = () => ((this.Password()));
			return obj;
		}
		Password_label(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Password");
			(obj.control) = () => ((this.Password_keyboard()));
			return obj;
		}
		Form(){
			const obj = new this.$.$mol_form();
			(obj.body) = () => ([(this.Username_label()), (this.Password_label())]);
			return obj;
		}
		title(){
			return "Virtial keyboard";
		}
		sub(){
			return [(this.Form())];
		}
		tags(){
			return ["input", "button"];
		}
		aspects(){
			return ["Widget/Control"];
		}
	};
	($mol_mem(($.$yuf_keyboard_demo.prototype), "username"));
	($mol_mem(($.$yuf_keyboard_demo.prototype), "Username"));
	($mol_mem(($.$yuf_keyboard_demo.prototype), "Username_keyboard"));
	($mol_mem(($.$yuf_keyboard_demo.prototype), "Username_label"));
	($mol_mem(($.$yuf_keyboard_demo.prototype), "password"));
	($mol_mem(($.$yuf_keyboard_demo.prototype), "Password"));
	($mol_mem(($.$yuf_keyboard_demo.prototype), "Password_keyboard"));
	($mol_mem(($.$yuf_keyboard_demo.prototype), "Password_label"));
	($mol_mem(($.$yuf_keyboard_demo.prototype), "Form"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_keyboard_demo extends $.$yuf_keyboard_demo {
        }
        $$.$yuf_keyboard_demo = $yuf_keyboard_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_attachment) = class $mol_icon_attachment extends ($.$mol_icon) {
		path(){
			return "M7.5,18A5.5,5.5 0 0,1 2,12.5A5.5,5.5 0 0,1 7.5,7H18A4,4 0 0,1 22,11A4,4 0 0,1 18,15H9.5A2.5,2.5 0 0,1 7,12.5A2.5,2.5 0 0,1 9.5,10H17V11.5H9.5A1,1 0 0,0 8.5,12.5A1,1 0 0,0 9.5,13.5H18A2.5,2.5 0 0,0 20.5,11A2.5,2.5 0 0,0 18,8.5H7.5A4,4 0 0,0 3.5,12.5A4,4 0 0,0 7.5,16.5H17V18H7.5Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_upload) = class $mol_icon_upload extends ($.$mol_icon) {
		path(){
			return "M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z";
		}
	};


;
"use strict";

;
	($.$mol_button_open) = class $mol_button_open extends ($.$mol_button_minor) {
		Icon(){
			const obj = new this.$.$mol_icon_upload();
			return obj;
		}
		files(next){
			if(next !== undefined) return next;
			return [];
		}
		files_handled(next){
			return (this.files(next));
		}
		accept(){
			return "";
		}
		multiple(){
			return true;
		}
		Native(){
			const obj = new this.$.$mol_button_open_native();
			(obj.files) = (next) => ((this.files_handled(next)));
			(obj.accept) = () => ((this.accept()));
			(obj.multiple) = () => ((this.multiple()));
			return obj;
		}
		sub(){
			return [(this.Icon()), (this.Native())];
		}
	};
	($mol_mem(($.$mol_button_open.prototype), "Icon"));
	($mol_mem(($.$mol_button_open.prototype), "files"));
	($mol_mem(($.$mol_button_open.prototype), "Native"));
	($.$mol_button_open_native) = class $mol_button_open_native extends ($.$mol_view) {
		accept(){
			return "";
		}
		multiple(){
			return true;
		}
		picked(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "input";
		}
		files(next){
			if(next !== undefined) return next;
			return [];
		}
		attr(){
			return {
				"type": "file", 
				"accept": (this.accept()), 
				"multiple": (this.multiple())
			};
		}
		event(){
			return {"change": (next) => (this.picked(next))};
		}
	};
	($mol_mem(($.$mol_button_open_native.prototype), "picked"));
	($mol_mem(($.$mol_button_open_native.prototype), "files"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button_open extends $.$mol_button_open {
            files_handled(next) {
                try {
                    const files = this.files(next);
                    this.status([null]);
                    return files;
                }
                catch (error) {
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
            }
        }
        $$.$mol_button_open = $mol_button_open;
        class $mol_button_open_native extends $.$mol_button_open_native {
            dom_node() {
                return super.dom_node();
            }
            picked() {
                const files = this.dom_node().files;
                if (!files || !files.length)
                    return;
                this.files([...files]);
            }
        }
        $$.$mol_button_open_native = $mol_button_open_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/open/open.view.css", "[mol_button_open_native] {\n\tposition: absolute;\n\tleft: 0;\n\ttop: -100%;\n\twidth: 100%;\n\theight: 200%;\n\tcursor: pointer;\n\topacity: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_camera) = class $mol_icon_camera extends ($.$mol_icon) {
		path(){
			return "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z";
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    function codec_str_join({ containers, codecs }) {
        return containers.flatMap(container => codecs.map(codec => `${container}${codec ? `; codecs=${codec}` : ''}`));
    }
    class $yuf_camera_recorder extends $mol_object {
        stream() {
            return new MediaStream;
        }
        format() { return 'video'; }
        static codecs() {
            return {
                video: {
                    containers: ['video/webm', 'video/mp4'],
                    codecs: ['vp9', 'vp8', 'h264', 'avc1.42E01E']
                },
                audio: {
                    containers: ['audio/webm', 'audio/ogg', 'audio/mp4'],
                    codecs: ['opus', 'vorbis', 'aac', 'pcm']
                },
            };
        }
        static best_codec(format) {
            const codecs = this.codecs()[format];
            return codec_str_join(codecs).find(codec_str => MediaRecorder.isTypeSupported(codec_str));
        }
        mime_type() {
            return this.$.$yuf_camera_recorder.best_codec(this.format()) || $mol_fail(new Error('Supported codecs not found'));
        }
        bits_per_second() {
            return null;
        }
        audio_bits_per_second() {
            return null;
        }
        video_bits_per_second() {
            return null;
        }
        native() {
            const rec = new MediaRecorder(this.stream(), {
                mimeType: this.mime_type(),
                audioBitsPerSecond: this.audio_bits_per_second() ?? undefined,
                videoBitsPerSecond: this.video_bits_per_second() ?? undefined,
                bitsPerSecond: this.bits_per_second() ?? undefined,
            });
            rec.ondataavailable = e => this.chunks(e.data);
            rec.onresume = rec.onstop = rec.onpause = rec.onstart = () => this.status(null);
            rec.onerror = event => this.error_packed([event.error || new Error('Unknown', { cause: { event } })]);
            return rec;
        }
        status(next) {
            const native = this.native();
            const current = native.state;
            if (next === 'recording' && current === 'paused')
                native.resume();
            if (next === 'recording' && current === 'inactive')
                native.start(this.chunks_rate());
            if (next === 'paused' && current === 'recording') {
                this.flush();
                native.pause();
            }
            if (next === 'inactive' && (current === 'recording' || current === 'paused')) {
                this.flush();
                native.stop();
            }
            return native.state;
        }
        error_packed(next) {
            if (next === undefined)
                this.chunks();
            if (next === undefined)
                this.status();
            if (next?.[0] !== undefined)
                this.flush_end(next[0]);
            return next ?? null;
        }
        error(reset) {
            return this.error_packed(reset ? [reset] : reset)?.[0] ?? null;
        }
        chunks_rate() {
            return 100000;
        }
        chunks(next) {
            const prev = $mol_wire_probe(() => this.chunks()) ?? [];
            if (next === undefined)
                return prev;
            this.flush_end();
            return next === null ? [] : [...prev, next];
        }
        flush_promise = undefined;
        flush_end(status = null) {
            if (!$mol_promise_like(this.flush_promise))
                return;
            this.flush_promise.done();
            this.flush_promise = status;
        }
        flush() {
            const native = this.native();
            if (this.flush_promise === undefined && native.state === 'recording') {
                const err = new Error('MediaRecorder requestData timeout', { cause: { recorder: this } });
                new $mol_after_timeout(this.flush_timeout(), () => this.flush_end(err));
                this.flush_promise = new $mol_promise();
                native.requestData();
            }
            if ($mol_promise_like(this.flush_promise))
                $mol_fail_hidden(this.flush_promise);
            const res = this.flush_promise;
            this.flush_promise = undefined;
            return res ?? this.chunks();
        }
        flush_timeout() { return 5000; }
        destructor() {
            const native = $mol_wire_probe(() => this.native());
            if (!native)
                return;
            native.onerror = native.onpause = native.onresume = native.ondataavailable = native.onstart = native.onstop = null;
            try {
                this.chunks(null);
                native.stop();
            }
            catch (e) {
                $mol_fail_log(e);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_camera_recorder.prototype, "native", null);
    __decorate([
        $mol_mem
    ], $yuf_camera_recorder.prototype, "status", null);
    __decorate([
        $mol_mem
    ], $yuf_camera_recorder.prototype, "error_packed", null);
    __decorate([
        $mol_mem
    ], $yuf_camera_recorder.prototype, "chunks", null);
    __decorate([
        $mol_action
    ], $yuf_camera_recorder.prototype, "flush", null);
    $.$yuf_camera_recorder = $yuf_camera_recorder;
})($ || ($ = {}));

;
	($.$mol_icon_stop) = class $mol_icon_stop extends ($.$mol_icon) {
		path(){
			return "M18,18H6V6H18V18Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_pause) = class $mol_icon_pause extends ($.$mol_icon) {
		path(){
			return "M14,19H18V5H14M6,19H10V5H6V19Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_record) = class $mol_icon_record extends ($.$mol_icon) {
		path(){
			return "M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_record_rec) = class $mol_icon_record_rec extends ($.$mol_icon) {
		path(){
			return "M12.5,5A7.5,7.5 0 0,0 5,12.5A7.5,7.5 0 0,0 12.5,20A7.5,7.5 0 0,0 20,12.5A7.5,7.5 0 0,0 12.5,5M7,10H9A1,1 0 0,1 10,11V12C10,12.5 9.62,12.9 9.14,12.97L10.31,15H9.15L8,13V15H7M12,10H14V11H12V12H14V13H12V14H14V15H12A1,1 0 0,1 11,14V11A1,1 0 0,1 12,10M16,10H18V11H16V14H18V15H16A1,1 0 0,1 15,14V11A1,1 0 0,1 16,10M8,11V12H9V11";
		}
	};


;
"use strict";

;
	($.$yuf_camera_recorder_icon) = class $yuf_camera_recorder_icon extends ($.$mol_icon) {
		Inactive(){
			const obj = new this.$.$mol_icon_stop();
			return obj;
		}
		Paused(){
			const obj = new this.$.$mol_icon_pause();
			return obj;
		}
		Recording(){
			const obj = new this.$.$mol_icon_record_rec();
			return obj;
		}
		status(){
			return "";
		}
		status_icon(){
			return {
				"inactive": (this.Inactive()), 
				"paused": (this.Paused()), 
				"recording": (this.Recording())
			};
		}
	};
	($mol_mem(($.$yuf_camera_recorder_icon.prototype), "Inactive"));
	($mol_mem(($.$yuf_camera_recorder_icon.prototype), "Paused"));
	($mol_mem(($.$yuf_camera_recorder_icon.prototype), "Recording"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_camera_recorder_icon extends $.$yuf_camera_recorder_icon {
            path() {
                return this.status_icon()[this.status()]?.path() ?? super.path();
            }
        }
        $$.$yuf_camera_recorder_icon = $yuf_camera_recorder_icon;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_camera_recorder_button) = class $yuf_camera_recorder_button extends ($.$mol_button_minor) {
		error_packed(next){
			return (this.recorder().error_packed(next));
		}
		recording_status(next){
			return (this.recorder().status(next));
		}
		recorder_status_next(){
			return "";
		}
		Icon(){
			const obj = new this.$.$yuf_camera_recorder_icon();
			(obj.status) = () => ((this.recorder_status_next()));
			return obj;
		}
		recorder(){
			const obj = new this.$.$yuf_camera_recorder();
			return obj;
		}
		status_message(){
			return {
				"inactive": (this.$.$mol_locale.text("$yuf_camera_recorder_button_status_message_inactive")), 
				"paused": (this.$.$mol_locale.text("$yuf_camera_recorder_button_status_message_paused")), 
				"recording": (this.$.$mol_locale.text("$yuf_camera_recorder_button_status_message_recording"))
			};
		}
		sub(){
			return [(this.Icon())];
		}
	};
	($mol_mem(($.$yuf_camera_recorder_button.prototype), "Icon"));
	($mol_mem(($.$yuf_camera_recorder_button.prototype), "recorder"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_camera_recorder_button extends $.$yuf_camera_recorder_button {
            hint() {
                return this.status_message()[this.recording_status()] || this.status_message()['inactive'];
            }
            status(next) {
                if ($mol_promise_like(next?.[0]))
                    return next;
                return this.error_packed(next) ?? [];
            }
            recorder_status_next() {
                const cur = this.recording_status();
                if (cur === 'inactive' || cur === 'paused')
                    return 'recording';
                return 'paused';
            }
            recorder_status_next_grab() {
                return this.recorder_status_next();
            }
            click(e) {
                const next = this.recorder_status_next_grab();
                this.recording_status(next);
            }
        }
        __decorate([
            $mol_action
        ], $yuf_camera_recorder_button.prototype, "recorder_status_next_grab", null);
        $$.$yuf_camera_recorder_button = $yuf_camera_recorder_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.factory_caches = new WeakMap();
    function contexted(Factory) {
        let cache = $.factory_caches.get(this);
        if (!cache) {
            cache = new WeakMap();
            $.factory_caches.set(this, cache);
        }
        let Contexted = cache.get(Factory);
        if (Contexted)
            return Contexted;
        const t = this;
        Contexted = $mol_func_name_from(class extends Factory {
            static $ = t;
        }, Factory);
        cache.set(Factory, Contexted);
        return Contexted;
    }
    $.$mol_static = contexted;
    Object.defineProperty($, '$mol_static', {
        get() {
            const t = this;
            return new Proxy(contexted, {
                get(self, k) {
                    const val = t[k];
                    if (typeof val !== 'function' || t === $)
                        return val;
                    return contexted.call(t, val);
                },
            });
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_one = {};
    const cache = new WeakMap();
    function singletone(Origin) {
        const Contexted = this.$mol_static(Origin);
        let instance = cache.get(Contexted);
        if (instance)
            return instance;
        instance = new Contexted();
        instance[$mol_ambient_ref] = this;
        cache.set(Contexted, instance);
        return instance;
    }
    Object.defineProperty($, '$mol_one', {
        get() {
            const t = this;
            return new Proxy(singletone, {
                get(self, k) {
                    const val = t[k];
                    if (typeof val !== 'function')
                        return val;
                    return singletone.call(t, val);
                }
            });
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_canvas_host extends $mol_object {
        native() {
            const ctx = this.$.$mol_dom_context;
            return new ctx.OffscreenCanvas(4096, 4096);
        }
        context2D() {
            const context = this.native().getContext('2d');
            if (!context)
                throw new Error('Can\'t create canvas context');
            return context;
        }
        _render_task = null;
        render_task(next) {
            if (next)
                this._render_task = next;
            return this._render_task;
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_canvas_host.prototype, "native", null);
    $.$yuf_canvas_host = $yuf_canvas_host;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_canvas_blob extends $mol_object {
        host() { return this.$.$mol_one.$yuf_canvas_host; }
        context() { return this.host().context2D(); }
        cancel = null;
        render_task(next) { return this.host().render_task(next); }
        image_type() { return 'image/png'; }
        quality() { return .99; }
        render_options() {
            const context = this.context();
            return {
                context,
                canvas: context.canvas,
                type: this.image_type(),
                quality: this.quality(),
            };
        }
        async draw(opts) { }
        async snapshot(opts) {
            const { context, canvas, quality, type } = opts;
            if (this.dead)
                return new Blob();
            context.save();
            try {
                await this.draw(opts);
                const blob = this.dead ? new Blob() : await canvas.convertToBlob({ type, quality });
                context.restore();
                return blob;
            }
            catch (e) {
                context.restore();
                $mol_fail_hidden(e);
            }
        }
        async blob_async(opts) {
            let task;
            this.dead = false;
            this.cancel?.();
            do {
                task = this.render_task();
                try {
                    await task;
                }
                catch {
                }
                if (this.dead)
                    return new Blob();
            } while (task !== this.render_task());
            const promise = this.snapshot(opts);
            this.render_task(promise);
            return promise;
        }
        dead = false;
        blob() {
            return $mol_wire_sync(this).blob_async(this.render_options());
        }
        object_url() {
            return URL.createObjectURL(this.blob());
        }
        destructor() {
            this.dead = true;
            const url = $mol_wire_probe(() => this.object_url());
            if (url)
                URL.revokeObjectURL(url);
            this.cancel?.();
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_canvas_blob.prototype, "blob", null);
    __decorate([
        $mol_mem
    ], $yuf_canvas_blob.prototype, "object_url", null);
    $.$yuf_canvas_blob = $yuf_canvas_blob;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_canvas_image extends $yuf_canvas_blob {
        node() {
            return null;
        }
        static sizes(image) {
            if (image instanceof HTMLVideoElement)
                return [
                    image.videoWidth,
                    image.videoHeight,
                ];
            if (image instanceof SVGImageElement)
                return [
                    image.width.baseVal.value,
                    image.height.baseVal.value,
                ];
            return [
                image.width,
                image.height,
            ];
        }
        render_options() {
            const node = this.node();
            const [w, h] = $yuf_canvas_image.sizes(node);
            if (!w || !h)
                throw new Error('Camera window is zero size', { cause: { node } });
            return {
                ...super.render_options(),
                node,
            };
        }
        async draw({ context, canvas, node }) {
            const [w, h] = $yuf_canvas_image.sizes(node);
            canvas.width = w;
            canvas.height = h;
            context.fillStyle = 'rgb(255, 255, 255)';
            context.fillRect(0, 0, w, h);
            context.drawImage(node, 0, 0, w, h);
        }
    }
    $.$yuf_canvas_image = $yuf_canvas_image;
})($ || ($ = {}));

;
	($.$mol_video_player) = class $mol_video_player extends ($.$mol_view) {
		uri(){
			return "";
		}
		controls(){
			return true;
		}
		autoplay(){
			return true;
		}
		inline(){
			return true;
		}
		loop(){
			return false;
		}
		muted(){
			return false;
		}
		poster(){
			return "";
		}
		stream(){
			return null;
		}
		revolume(next){
			if(next !== undefined) return next;
			return null;
		}
		retime(next){
			if(next !== undefined) return next;
			return null;
		}
		redurate(next){
			if(next !== undefined) return next;
			return null;
		}
		playing_event(next){
			if(next !== undefined) return next;
			return null;
		}
		play_event(next){
			if(next !== undefined) return next;
			return null;
		}
		pause_event(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "video";
		}
		playing(next){
			if(next !== undefined) return next;
			return false;
		}
		play(){
			return null;
		}
		pause(){
			return null;
		}
		volume(next){
			if(next !== undefined) return next;
			return 0;
		}
		time(next){
			if(next !== undefined) return next;
			return 0;
		}
		duration(){
			return 0;
		}
		attr(){
			return {
				"src": (this.uri()), 
				"controls": (this.controls()), 
				"autoplay": (this.autoplay()), 
				"playsinline": (this.inline()), 
				"loop": (this.loop()), 
				"muted": (this.muted()), 
				"poster": (this.poster())
			};
		}
		field(){
			return {"srcObject": (this.stream())};
		}
		event(){
			return {
				"volumechange": (next) => (this.revolume(next)), 
				"timeupdate": (next) => (this.retime(next)), 
				"durationchange": (next) => (this.redurate(next)), 
				"playing": (next) => (this.playing_event(next)), 
				"play": (next) => (this.play_event(next)), 
				"pause": (next) => (this.pause_event(next))
			};
		}
	};
	($mol_mem(($.$mol_video_player.prototype), "revolume"));
	($mol_mem(($.$mol_video_player.prototype), "retime"));
	($mol_mem(($.$mol_video_player.prototype), "redurate"));
	($mol_mem(($.$mol_video_player.prototype), "playing_event"));
	($mol_mem(($.$mol_video_player.prototype), "play_event"));
	($mol_mem(($.$mol_video_player.prototype), "pause_event"));
	($mol_mem(($.$mol_video_player.prototype), "playing"));
	($mol_mem(($.$mol_video_player.prototype), "volume"));
	($mol_mem(($.$mol_video_player.prototype), "time"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_video_player extends $.$mol_video_player {
            dom_node() {
                return super.dom_node();
            }
            volume(next) {
                this.revolume();
                if (next === undefined) {
                    return this.dom_node().volume;
                }
                else {
                    return this.dom_node().volume = Math.max(0, Math.min(next, 1));
                }
            }
            time(next) {
                this.retime();
                if (next === undefined) {
                    return this.dom_node().currentTime;
                }
                else {
                    return this.dom_node().currentTime = Math.max(0, Math.min(next, this.duration()));
                }
            }
            duration() {
                this.redurate();
                return this.dom_node().duration;
            }
            playing(next) {
                const node = this.dom_node();
                this.playing_event();
                this.play_event();
                if (next === undefined)
                    return !node.paused;
                if (next && node.paused)
                    $mol_wire_sync(node).play();
                if (!next && !node.paused)
                    node.pause();
                return !node.paused;
            }
            play() {
                this.playing(true);
            }
            pause() {
                this.playing(false);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_video_player.prototype, "volume", null);
        __decorate([
            $mol_mem
        ], $mol_video_player.prototype, "time", null);
        __decorate([
            $mol_mem
        ], $mol_video_player.prototype, "duration", null);
        __decorate([
            $mol_mem
        ], $mol_video_player.prototype, "playing", null);
        $$.$mol_video_player = $mol_video_player;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/video/player/player.view.css", "[mol_video_player] {\n\tflex: 1 1 auto;\n}\n");
})($ || ($ = {}));

;
	($.$mol_video_camera) = class $mol_video_camera extends ($.$mol_video_player) {
		transform(){
			return "";
		}
		facing(){
			return "user";
		}
		aspect(){
			return 1;
		}
		size(){
			return 720;
		}
		width(){
			return (this.size());
		}
		height(){
			return (this.size());
		}
		brightness(){
			return 128;
		}
		sharpness(){
			return 2;
		}
		contrast(){
			return 32;
		}
		saturation(){
			return 64;
		}
		temperature(){
			return 4000;
		}
		torch(){
			return false;
		}
		controls(){
			return false;
		}
		style(){
			return {"transform": (this.transform())};
		}
		video_constraints(){
			return {
				"facingMode": (this.facing()), 
				"aspectRatio": (this.aspect()), 
				"width": {"ideal": (this.width())}, 
				"height": {"ideal": (this.height())}
			};
		}
		video_settings(){
			return {
				"brightness": (this.brightness()), 
				"sharpness": (this.sharpness()), 
				"contrast": (this.contrast()), 
				"saturation": (this.saturation()), 
				"advanced": [{"colorTemperature": (this.temperature())}, {"torch": (this.torch())}]
			};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_video_camera extends $.$mol_video_camera {
            stream_raw() {
                const stream = $mol_wire_sync(navigator.mediaDevices).getUserMedia({
                    video: this.video_constraints(),
                });
                return Object.assign(stream, {
                    destructor: () => stream.getTracks().forEach(track => track.stop())
                });
            }
            stream() {
                const settings = this.video_settings();
                const stream = this.stream_raw();
                for (const track of stream.getVideoTracks()) {
                    for (const param in settings) {
                        if (param === 'advanced') {
                            for (const constraint of settings.advanced) {
                                try {
                                    track.applyConstraints({ advanced: [constraint] });
                                }
                                catch (error) {
                                    $mol_fail_log(error);
                                }
                            }
                        }
                        else if (settings[param] !== null) {
                            try {
                                track.applyConstraints({ [param]: settings[param] });
                            }
                            catch (error) {
                                $mol_fail_log(error);
                            }
                        }
                    }
                }
                return stream;
            }
            dom_node_actual() {
                return super.dom_node_actual();
            }
            transform() {
                return this.facing() === 'user' ? 'scaleX(-1)' : '';
            }
        }
        __decorate([
            $mol_mem
        ], $mol_video_camera.prototype, "stream_raw", null);
        __decorate([
            $mol_mem
        ], $mol_video_camera.prototype, "stream", null);
        $$.$mol_video_camera = $mol_video_camera;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_camera_pane) = class $yuf_camera_pane extends ($.$mol_view) {
		recorder_status(){
			return (this.recorder().status());
		}
		recorder_error(){
			return (this.recorder().error());
		}
		image_type(){
			return "image/jpeg";
		}
		camera_node(){
			return (this.Camera().dom_safe());
		}
		stream(){
			return (this.Camera().stream());
		}
		facing(){
			return "environment";
		}
		desirable_width(){
			return 1280;
		}
		desirable_height(){
			return 720;
		}
		camera_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Camera(){
			const obj = new this.$.$yuf_camera_pane_video();
			(obj.facing) = () => ((this.facing()));
			(obj.width) = () => ((this.desirable_width()));
			(obj.height) = () => ((this.desirable_height()));
			(obj.click) = (next) => ((this.camera_click(next)));
			return obj;
		}
		status_text(){
			return "";
		}
		Status(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.status_text())]);
			return obj;
		}
		controls_main(){
			return [];
		}
		Video_status_button(){
			const obj = new this.$.$yuf_camera_recorder_button();
			(obj.recorder) = () => ((this.recorder()));
			return obj;
		}
		video_controls(){
			return [(this.Video_status_button())];
		}
		close_hint(){
			return (this.$.$mol_locale.text("$yuf_camera_pane_close_hint"));
		}
		Close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		close_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Close(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.close_hint()));
			(obj.sub) = () => ([(this.Close_icon())]);
			(obj.click) = (next) => ((this.close_click(next)));
			return obj;
		}
		controls_close(){
			return [(this.Close())];
		}
		controls(){
			return [
				(this.Status()), 
				...(this.controls_main()), 
				...(this.video_controls()), 
				...(this.controls_close())
			];
		}
		Controls(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.controls()));
			return obj;
		}
		video_enabled(next){
			if(next !== undefined) return next;
			return false;
		}
		video_acceptable(){
			return true;
		}
		file_name_template(){
			return "\\cam-{{date}}.{{ext}}";
		}
		recorder(){
			const obj = new this.$.$yuf_camera_recorder();
			(obj.stream) = () => ((this.stream()));
			return obj;
		}
		canvas(){
			const obj = new this.$.$yuf_canvas_image();
			(obj.image_type) = () => ((this.image_type()));
			(obj.node) = () => ((this.camera_node()));
			return obj;
		}
		canvas_file(){
			return null;
		}
		files(next){
			if(next !== undefined) return next;
			return [];
		}
		status(next){
			if(next !== undefined) return next;
			return [];
		}
		saving_text(){
			return (this.$.$mol_locale.text("$yuf_camera_pane_saving_text"));
		}
		sub(){
			return [(this.Camera()), (this.Controls())];
		}
	};
	($mol_mem(($.$yuf_camera_pane.prototype), "camera_click"));
	($mol_mem(($.$yuf_camera_pane.prototype), "Camera"));
	($mol_mem(($.$yuf_camera_pane.prototype), "Status"));
	($mol_mem(($.$yuf_camera_pane.prototype), "Video_status_button"));
	($mol_mem(($.$yuf_camera_pane.prototype), "Close_icon"));
	($mol_mem(($.$yuf_camera_pane.prototype), "close_click"));
	($mol_mem(($.$yuf_camera_pane.prototype), "Close"));
	($mol_mem(($.$yuf_camera_pane.prototype), "Controls"));
	($mol_mem(($.$yuf_camera_pane.prototype), "video_enabled"));
	($mol_mem(($.$yuf_camera_pane.prototype), "recorder"));
	($mol_mem(($.$yuf_camera_pane.prototype), "canvas"));
	($mol_mem(($.$yuf_camera_pane.prototype), "files"));
	($mol_mem(($.$yuf_camera_pane.prototype), "status"));
	($.$yuf_camera_pane_video) = class $yuf_camera_pane_video extends ($.$mol_video_camera) {
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_safe(){
			return (this.dom_node());
		}
		event(){
			return {...(super.event()), "click": (next) => (this.click(next))};
		}
	};
	($mol_mem(($.$yuf_camera_pane_video.prototype), "click"));


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

;
"use strict";
var $;
(function ($) {
    class $mol_time_duration extends $mol_time_base {
        constructor(config = 0) {
            super();
            if (typeof config === 'number') {
                if (!Number.isFinite(config))
                    throw new RangeError(`Wrong ms count`);
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
                    const parser = /^(-?)P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                    const found = parser.exec(config);
                    if (!found)
                        break duration;
                    const sign = found[1] ? -1 : 1;
                    if (found[2])
                        this.year = sign * Number(found[2]);
                    if (found[3])
                        this.month = sign * Number(found[3]);
                    if (found[4])
                        this.day = sign * Number(found[4]);
                    if (found[5])
                        this.hour = sign * Number(found[5]);
                    if (found[6])
                        this.minute = sign * Number(found[6]);
                    if (found[7])
                        this.second = sign * Number(found[7]);
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
        get normal() {
            let second = this.second ?? 0;
            let minute = this.minute ?? 0;
            let hour = this.hour ?? 0;
            let day = this.day ?? 0;
            minute += Math.floor(second / 60);
            second = second % 60;
            hour += Math.floor(minute / 60);
            minute = minute % 60;
            day += Math.floor(hour / 24);
            hour = hour % 24;
            return new $mol_time_duration({
                year: this.year,
                month: this.month,
                day: day,
                hour: hour,
                minute: minute,
                second: second,
            });
        }
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
                return '.' + $mol_time_moment.patterns['sss'](moment);
            },
            'sss': (moment) => {
                if (moment.second == null)
                    return '';
                const millisecond = (moment.second - Math.trunc(moment.second)).toFixed(3);
                return millisecond.slice(2);
            },
        };
    }
    $.$mol_time_duration = $mol_time_duration;
})($ || ($ = {}));

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
            if (typeof config === 'number') {
                config = new Date(config);
                if (Number.isNaN(config.valueOf()))
                    throw new RangeError(`Wrong ms count`);
            }
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
            const second = Math.floor(this.second ?? 0);
            const current = new Date();
            const native = new Date(this.year ?? current.getFullYear(), this.month ?? (this.year === undefined ? current.getMonth() : 0), (this.day ?? (this.year === undefined && this.month === undefined ? current.getDate() - 1 : 0)) + 1, this.hour ?? 0, this.minute ?? 0, second, Math.floor(((this.second ?? 0) - second) * 1000));
            const offset = -native.getTimezoneOffset();
            shift: if (this.offset) {
                const target = this.offset.count('PT1m');
                if (target === offset)
                    break shift;
                native.setMinutes(native.getMinutes() + offset - target);
            }
            return this._native = native;
        }
        _normal;
        get normal() {
            if (this._normal)
                return this._normal;
            const moment = new $mol_time_moment(this.native).toOffset(this.offset);
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
                year: this.year ?? 0,
                month: this.month ?? 0,
                day: this.day ?? 0,
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
            let with_time = new $mol_time_moment('0001-01-01T00:00:00').merge(this);
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

;
"use strict";
var $;
(function ($) {
    class $mol_dom_event extends $mol_object {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        prevented(next) {
            if (next)
                this.native.preventDefault();
            return this.native.defaultPrevented;
        }
        static wrap(event) {
            return new this.$.$mol_dom_event(event);
        }
    }
    __decorate([
        $mol_action
    ], $mol_dom_event.prototype, "prevented", null);
    __decorate([
        $mol_action
    ], $mol_dom_event, "wrap", null);
    $.$mol_dom_event = $mol_dom_event;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_camera_pane extends $.$yuf_camera_pane {
            canvas_file() {
                this.camera_node();
                if (!this.visible())
                    return null;
                const video = this.video_enabled();
                const recorder = video ? this.recorder() : null;
                const chunks = recorder?.flush() ?? [this.canvas().blob()];
                const type = recorder?.mime_type().split(';')?.[0]?.trim() ?? this.image_type();
                if (!chunks.length || !chunks[0].size) {
                    throw new Error('No image recorded');
                }
                const ext = type.split('/')?.[1]?.trim() ?? 'mp4';
                const moment = new $mol_time_moment();
                const name = this.file_name_template()
                    .replace('{{date}}', moment.toString('YYYYMMDD_hhmmss'))
                    .replace('{{ext}}', ext);
                return new File(chunks, name, {
                    lastModified: moment.valueOf(),
                    type
                });
            }
            video_controls() {
                return this.video_acceptable() ? super.video_controls() : [];
            }
            visible(next) {
                if (next === undefined)
                    new $mol_after_timeout(0, () => this.visible(true));
                return next ?? false;
            }
            auto() {
                this.visible();
                this.video_enabled();
                try {
                    if (this.video_acceptable() && this.recorder().status() === 'recording') {
                        this.video_enabled(true);
                    }
                }
                catch (e) {
                    $mol_fail_log(e);
                }
                return super.auto();
            }
            camera_click(event) {
                event && $mol_dom_event.wrap(event).prevented(true);
                try {
                    const file = this.canvas_file();
                    this.files(file ? [file] : []);
                    this.status([null]);
                }
                catch (error) {
                    Promise.resolve().then(() => this.status([error]));
                    $mol_fail_hidden(error);
                }
                return null;
            }
            status_text() {
                const error = this.status()?.[0];
                if (!error)
                    return super.status_text();
                if ($mol_promise_like(error)) {
                    return this.saving_text();
                }
                $mol_fail_hidden(error);
            }
        }
        __decorate([
            $mol_action
        ], $yuf_camera_pane.prototype, "canvas_file", null);
        __decorate([
            $mol_mem
        ], $yuf_camera_pane.prototype, "visible", null);
        $$.$yuf_camera_pane = $yuf_camera_pane;
        class $yuf_camera_pane_video extends $.$yuf_camera_pane_video {
            dom_safe() {
                return this.dom_final() || this.dom_node();
            }
        }
        $$.$yuf_camera_pane_video = $yuf_camera_pane_video;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_camera_pane, {
            Camera: {
                maxWidth: '100%',
            },
            Status: {
                color: $mol_theme.text,
                padding: $mol_gap.text,
            },
            Controls: {
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: $mol_layer.popup,
                background: {
                    color: $mol_theme.card
                },
                opacity: .7,
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_camera_pick) = class $yuf_camera_pick extends ($.$mol_pick) {
		Trigger_icon(){
			const obj = new this.$.$mol_icon_camera();
			return obj;
		}
		files(next){
			if(next !== undefined) return next;
			return [];
		}
		cam_files(next){
			return (this.files(next));
		}
		close_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Camera(){
			const obj = new this.$.$yuf_camera_pane();
			(obj.files) = (next) => ((this.cam_files(next)));
			(obj.close_click) = (next) => ((this.close_click(next)));
			return obj;
		}
		trigger_content(){
			return [(this.Trigger_icon())];
		}
		bubble_content(){
			return [(this.Camera())];
		}
	};
	($mol_mem(($.$yuf_camera_pick.prototype), "Trigger_icon"));
	($mol_mem(($.$yuf_camera_pick.prototype), "files"));
	($mol_mem(($.$yuf_camera_pick.prototype), "close_click"));
	($mol_mem(($.$yuf_camera_pick.prototype), "Camera"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_camera_pick extends $.$yuf_camera_pick {
            close_click(event) {
                event && $mol_dom_event.wrap(event).prevented(true);
                this.showed(false);
            }
            cam_files(next) {
                const file = this.files(next);
                if (next)
                    this.showed(false);
                return file ?? null;
            }
        }
        $$.$yuf_camera_pick = $yuf_camera_pick;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_camera_pick, {
            Bubble: {
                width: '44rem',
                aspectRatio: 16 / 9,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_camera_off) = class $mol_icon_camera_off extends ($.$mol_icon) {
		path(){
			return "M1.2,4.47L2.5,3.2L20,20.72L18.73,22L16.73,20H4A2,2 0 0,1 2,18V6C2,5.78 2.04,5.57 2.1,5.37L1.2,4.47M7,4L9,2H15L17,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L16.33,14.5C16.76,13.77 17,12.91 17,12A5,5 0 0,0 12,7C11.09,7 10.23,7.24 9.5,7.67L5.82,4H7M7,12A5,5 0 0,0 12,17C12.5,17 13.03,16.92 13.5,16.77L11.72,15C10.29,14.85 9.15,13.71 9,12.28L7.23,10.5C7.08,10.97 7,11.5 7,12M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_close_circle) = class $mol_icon_close_circle extends ($.$mol_icon) {
		path(){
			return "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z";
		}
	};


;
"use strict";

;
	($.$yuf_attach) = class $yuf_attach extends ($.$mol_view) {
		item_drop(id, next){
			if(next !== undefined) return next;
			return null;
		}
		file(id){
			const obj = new this.$.File();
			return obj;
		}
		uploading(id){
			return false;
		}
		Item(id){
			const obj = new this.$.$yuf_attach_item();
			(obj.click) = (next) => ((this.item_drop(id, next)));
			(obj.file) = () => ((this.file(id)));
			(obj.uploading) = () => ((this.uploading(id)));
			return obj;
		}
		items_content(){
			return [(this.Item("0"))];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.items_content()));
			return obj;
		}
		attach_hint(){
			return (this.$.$mol_locale.text("$yuf_attach_attach_hint"));
		}
		attach_new(next){
			if(next !== undefined) return next;
			return null;
		}
		multiple(){
			return false;
		}
		accept(){
			return "";
		}
		enabled(){
			return true;
		}
		Add_icon(){
			const obj = new this.$.$mol_icon_attachment();
			return obj;
		}
		Add(){
			const obj = new this.$.$mol_button_open();
			(obj.hint) = () => ((this.attach_hint()));
			(obj.files) = (next) => ((this.attach_new(next)));
			(obj.multiple) = () => ((this.multiple()));
			(obj.accept) = () => ((this.accept()));
			(obj.enabled) = () => ((this.enabled()));
			(obj.Icon) = () => ((this.Add_icon()));
			return obj;
		}
		camera_pick_align(){
			return "center";
		}
		Camera_pick(){
			const obj = new this.$.$yuf_camera_pick();
			(obj.files) = (next) => ((this.attach_new(next)));
			(obj.align) = () => ((this.camera_pick_align()));
			return obj;
		}
		camera_content_inner(){
			return [(this.Camera_pick())];
		}
		camera_content(){
			return (this.camera_content_inner());
		}
		files(next){
			if(next !== undefined) return next;
			return {};
		}
		removing(id, next){
			if(next !== undefined) return next;
			return false;
		}
		ids(){
			return [];
		}
		serial_uploads(){
			return false;
		}
		sub(){
			return [
				(this.Content()), 
				(this.Add()), 
				...(this.camera_content())
			];
		}
	};
	($mol_mem_key(($.$yuf_attach.prototype), "item_drop"));
	($mol_mem_key(($.$yuf_attach.prototype), "file"));
	($mol_mem_key(($.$yuf_attach.prototype), "Item"));
	($mol_mem(($.$yuf_attach.prototype), "Content"));
	($mol_mem(($.$yuf_attach.prototype), "attach_new"));
	($mol_mem(($.$yuf_attach.prototype), "Add_icon"));
	($mol_mem(($.$yuf_attach.prototype), "Add"));
	($mol_mem(($.$yuf_attach.prototype), "Camera_pick"));
	($mol_mem(($.$yuf_attach.prototype), "files"));
	($mol_mem_key(($.$yuf_attach.prototype), "removing"));
	($.$yuf_attach_item) = class $yuf_attach_item extends ($.$mol_button_minor) {
		uploading_status(){
			return "upload";
		}
		image_title(){
			return "";
		}
		item_uri(){
			return "";
		}
		Image(){
			const obj = new this.$.$mol_image();
			(obj.title) = () => ((this.image_title()));
			(obj.uri) = () => ((this.item_uri()));
			return obj;
		}
		item_content(){
			return [(this.Image())];
		}
		Unknown_icon(){
			const obj = new this.$.$mol_icon_camera_off();
			return obj;
		}
		file_name(){
			return "";
		}
		Unknown(){
			const obj = new this.$.$yuf_attach_unknown();
			(obj.Icon) = () => ((this.Unknown_icon()));
			(obj.file_name) = () => ((this.file_name()));
			return obj;
		}
		unknown_content(){
			return [(this.Unknown())];
		}
		Remove_icon(){
			const obj = new this.$.$mol_icon_close_circle();
			return obj;
		}
		attr(){
			return {...(super.attr()), "yuf_attach_item_status": (this.uploading_status())};
		}
		file(){
			const obj = new this.$.File();
			return obj;
		}
		image_regexp(){
			return "^.*\\.(jpe?g|png|gif|webp)$";
		}
		is_image(){
			return false;
		}
		uploading(){
			return false;
		}
		sub(){
			return [
				...(this.item_content()), 
				...(this.unknown_content()), 
				(this.Remove_icon())
			];
		}
	};
	($mol_mem(($.$yuf_attach_item.prototype), "Image"));
	($mol_mem(($.$yuf_attach_item.prototype), "Unknown_icon"));
	($mol_mem(($.$yuf_attach_item.prototype), "Unknown"));
	($mol_mem(($.$yuf_attach_item.prototype), "Remove_icon"));
	($mol_mem(($.$yuf_attach_item.prototype), "file"));
	($.$yuf_attach_unknown) = class $yuf_attach_unknown extends ($.$mol_view) {
		Icon(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		file_name(){
			return "";
		}
		ext(){
			return (this.file_name());
		}
		Text(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.ext())]);
			return obj;
		}
		sub(){
			return [(this.Icon()), (this.Text())];
		}
	};
	($mol_mem(($.$yuf_attach_unknown.prototype), "Icon"));
	($mol_mem(($.$yuf_attach_unknown.prototype), "Text"));


;
"use strict";
var $;
(function ($) {
    class $yuf_url_object extends $mol_object {
        blob;
        url;
        constructor(blob, url = URL.createObjectURL(blob)) {
            super();
            this.blob = blob;
            this.url = url;
        }
        static from_blob(blob) { return new this(blob); }
        toString() { return this.url; }
        destructor() { URL.revokeObjectURL(this.url); }
    }
    __decorate([
        $mol_mem_key
    ], $yuf_url_object, "from_blob", null);
    $.$yuf_url_object = $yuf_url_object;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_attach, {
            Add_icon: {
                width: '100%',
                height: '100%',
            },
            Item: {
                width: '5rem',
                height: '5rem',
                border: {
                    radius: $mol_gap.round,
                },
                padding: 0,
            },
            gap: $mol_gap.block,
            Content: {
                gap: $mol_gap.block,
            },
            height: 'min-content',
            width: 'min-content',
            Add: {
                width: '5rem',
                height: '5rem',
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                padding: $mol_gap.space,
            },
            Camera_pick: {
                Trigger_icon: {
                    width: '100%',
                    height: '100%',
                },
                Trigger: {
                    width: '6rem',
                    height: '6rem',
                    background: {
                        color: $mol_theme.card,
                    },
                    border: {
                        radius: $mol_gap.round,
                    },
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    padding: $mol_gap.space,
                }
            }
        });
        $mol_style_define($yuf_attach_item, {
            background: {
                color: $mol_theme.card,
            },
            border: {
                radius: $mol_gap.round,
            },
            position: 'relative',
            Remove_icon: {
                position: 'absolute',
                zIndex: $mol_layer.float,
                right: '.25rem',
                top: '.25rem',
                width: '1rem',
                height: '1rem',
                color: $mol_theme.shade
            },
            Unknown_icon: {
                width: '100%',
                justifyContent: 'center',
                flex: {
                    basis: '4rem',
                    grow: 1,
                },
            },
            Image: {
                width: '100%',
                height: '100%',
                background: {
                    color: $mol_theme.card,
                }
            },
            '@': {
                yuf_attach_item_status: {
                    upload: {
                        animation: {
                            name: 'mol_view_wait',
                            duration: '1s',
                            timingFunction: {
                                prefix: () => '',
                                postfix: () => '',
                                name: 'steps',
                                value: '20, end'
                            },
                            iterationCount: 'infinite',
                        },
                    }
                }
            }
        });
        $mol_style_define($yuf_attach_unknown, {
            Image: {
                width: '100%',
                height: '100%',
                background: {
                    color: $mol_theme.card,
                }
            },
            padding: $mol_gap.block,
            flex: {
                direction: 'column',
                grow: 1,
            },
            justifyContent: 'space-between',
            alignItems: 'center',
            Text: {
                alignItems: 'center',
                justifyContent: 'center',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_attach extends $.$yuf_attach {
            enabled() {
                return this.serial_uploads() ? this.ids().length === 0 : true;
            }
            attach_new(files) {
                if (!this.enabled())
                    return;
                const next = {};
                for (const file of files) {
                    const id = $mol_guid();
                    next[id] = file;
                }
                this.files({
                    ...this.files(),
                    ...next
                });
            }
            file(id) { return this.files()[id]; }
            ids() {
                const files = this.files();
                return Object.keys(files).filter(id => files[id]);
            }
            uploading(id) {
                this.$.$mol_wait_timeout(1000);
                throw new Error('Implement upload');
            }
            items_content() {
                return this.ids().map(id => this.Item(id));
            }
            item_drop(id, event) {
                this.removing(id);
                const next = { ...this.files(), [id]: null };
                this.files(next);
            }
        }
        __decorate([
            $mol_action
        ], $yuf_attach.prototype, "attach_new", null);
        __decorate([
            $mol_mem
        ], $yuf_attach.prototype, "ids", null);
        __decorate([
            $mol_mem_key
        ], $yuf_attach.prototype, "uploading", null);
        __decorate([
            $mol_mem
        ], $yuf_attach.prototype, "items_content", null);
        $$.$yuf_attach = $yuf_attach;
        class $yuf_attach_item extends $.$yuf_attach_item {
            is_image() { return Boolean(this.file_name().match(new RegExp(this.image_regexp(), 'g'))); }
            item_uri() {
                return this.is_image() ? this.$.$yuf_url_object.from_blob(this.file()).url : '';
            }
            file_name() { return this.file()?.name ?? ''; }
            item_content() { return this.is_image() ? [this.Image()] : []; }
            unknown_content() { return this.is_image() ? [] : [this.Unknown()]; }
            uploading_status() {
                try {
                    return this.uploading() ? 'upload' : '';
                }
                catch (e) {
                    if ($mol_promise_like(e))
                        return 'upload';
                    return 'error';
                }
            }
            status(next) {
                try {
                    if (next)
                        return next;
                    this.uploading();
                    return [];
                }
                catch (e) {
                    if ($mol_promise_like(e))
                        return [];
                    return [e];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_attach_item.prototype, "status", null);
        $$.$yuf_attach_item = $yuf_attach_item;
        class $yuf_attach_unknown extends $.$yuf_attach_unknown {
            ext() { return this.file_name().match('\.([^.]+)$')?.[1] ?? ''; }
        }
        $$.$yuf_attach_unknown = $yuf_attach_unknown;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_blend) = class $yuf_blend extends ($.$mol_view) {
		direction(){
			return "left-right";
		}
		click(next){
			if(next !== undefined) return next;
			return null;
		}
		Back(){
			const obj = new this.$.$mol_view();
			(obj.event) = () => ({"click": (next) => (this.click(next))});
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		attr(){
			return {...(super.attr()), "yuf_blend_direction": (this.direction())};
		}
		sub(){
			return [(this.Back()), (this.Content())];
		}
	};
	($mol_mem(($.$yuf_blend.prototype), "click"));
	($mol_mem(($.$yuf_blend.prototype), "Back"));
	($mol_mem(($.$yuf_blend.prototype), "Content"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("yuf/blend/blend.view.css", "@keyframes yuf_blend_anim {\n  100% {\n    opacity: 1;\n\tleft: 0;\n  }\n}\n\n@keyframes yuf_blend_anim_reverse {\n  100% {\n    opacity: 1;\n\tright: 0;\n  }\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_blend, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: $mol_layer.speck,
            background: {
                color: 'transparent',
            },
            '@media': {
                print: {
                    display: 'none'
                }
            },
            Back: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: $mol_layer.float,
                background: {
                    color: '#00000030',
                },
            },
            Content: {
                position: 'relative',
                zIndex: $mol_layer.popup,
                top: 0,
                left: '-200px',
                opacity: 0,
                animation: 'yuf_blend_anim .3s forwards',
                height: '100%',
                pointerEvents: 'none',
                flex: {
                    shrink: 1,
                    grow: 1,
                },
                '>': {
                    $mol_view: {
                        pointerEvents: 'auto',
                        background: {
                            color: $mol_theme.back,
                        },
                    }
                }
            },
            '@': {
                yuf_blend_direction: {
                    'right-left': {
                        Content: {
                            left: 'auto',
                            right: '-200px',
                            justifyContent: 'end',
                            animation: 'yuf_blend_anim_reverse .3s forwards',
                        }
                    }
                }
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";

;
	($.$yuf_portal) = class $yuf_portal extends ($.$yuf_blend) {
		display(){
			return null;
		}
		bubbles(){
			return [];
		}
		showed(next){
			if(next !== undefined) return next;
			return false;
		}
		style(){
			return {...(super.style()), "display": (this.display())};
		}
		content(){
			return (this.bubbles());
		}
		popup_add(next){
			if(next !== undefined) return next;
			const obj = new this.$.$yuf_portal_popup();
			return obj;
		}
		popup_remove(next){
			if(next !== undefined) return next;
			const obj = new this.$.$yuf_portal_popup();
			return obj;
		}
		popups(next){
			if(next !== undefined) return next;
			return [];
		}
	};
	($mol_mem(($.$yuf_portal.prototype), "showed"));
	($mol_mem(($.$yuf_portal.prototype), "popup_add"));
	($mol_mem(($.$yuf_portal.prototype), "popup_remove"));
	($mol_mem(($.$yuf_portal.prototype), "popups"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_portal extends $.$yuf_portal {
            static current = null;
            destructor() {
                this.$.$yuf_portal.current = null;
            }
            showed(next) {
                return this.popups().some(popup => popup.showed(next));
            }
            display() {
                return !this.showed() ? 'none' : null;
            }
            click(e) {
                e && $mol_dom_event.wrap(e).prevented(true);
                this.showed(false);
            }
            popup_add(next) {
                this.popups([...this.popups(), next]);
                return next;
            }
            popup_remove(next) {
                this.popups(this.popups().filter(popup => popup !== next));
                return next;
            }
            bubbles() {
                this.$.$yuf_portal.current = this;
                return this.popups().filter(popup => popup.showed()).map(pop => pop.Bubble());
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_portal.prototype, "showed", null);
        __decorate([
            $mol_action
        ], $yuf_portal.prototype, "popup_add", null);
        __decorate([
            $mol_action
        ], $yuf_portal.prototype, "popup_remove", null);
        __decorate([
            $mol_mem
        ], $yuf_portal.prototype, "bubbles", null);
        $$.$yuf_portal = $yuf_portal;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_attach_demo) = class $yuf_attach_demo extends ($.$mol_example_small) {
		Portal(){
			const obj = new this.$.$yuf_portal();
			return obj;
		}
		item_drop(id){
			return (this.Filled().item_drop(id));
		}
		file(id){
			return (this.Filled().file(id));
		}
		uploading(id){
			return false;
		}
		Filled(){
			const obj = new this.$.$yuf_attach();
			(obj.multiple) = () => (true);
			(obj.uploading) = (id) => ((this.uploading(id)));
			return obj;
		}
		upload_name(id){
			return "";
		}
		Uploaded(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.upload_name(id))]);
			return obj;
		}
		uploads(){
			return [(this.Uploaded(id))];
		}
		Uploads(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.uploads()));
			return obj;
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Filled()), (this.Uploads())]);
			return obj;
		}
		title(){
			return "Attach with status track";
		}
		ids(next){
			if(next !== undefined) return next;
			return [];
		}
		sub(){
			return [(this.Portal()), (this.List())];
		}
		tags(){
			return [
				"file", 
				"image", 
				"upload"
			];
		}
		aspects(){
			return ["Widget/Control", "Type/File"];
		}
	};
	($mol_mem(($.$yuf_attach_demo.prototype), "Portal"));
	($mol_mem(($.$yuf_attach_demo.prototype), "Filled"));
	($mol_mem_key(($.$yuf_attach_demo.prototype), "Uploaded"));
	($mol_mem(($.$yuf_attach_demo.prototype), "Uploads"));
	($mol_mem(($.$yuf_attach_demo.prototype), "List"));
	($mol_mem(($.$yuf_attach_demo.prototype), "ids"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_attach_demo extends $.$yuf_attach_demo {
            uploading(id) {
                this.$.$mol_wait_timeout(1000);
                const file = this.file(id);
                this.ids([...this.ids(), file.name]);
                this.item_drop(id);
                return false;
            }
            uploads() {
                return this.ids().map(id => this.Uploaded(id));
            }
            upload_name(id) { return id; }
        }
        $$.$yuf_attach_demo = $yuf_attach_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_book2_catalog) = class $mol_book2_catalog extends ($.$mol_book2) {
		Menu_title(){
			return (this.Menu().Title());
		}
		menu_title(){
			return "";
		}
		Menu_tools(){
			return (this.Menu().Tools());
		}
		Menu_logo(){
			return null;
		}
		menu_head(){
			return [(this.Menu_title()), (this.Menu_tools())];
		}
		menu_filter(next){
			if(next !== undefined) return next;
			return "";
		}
		Menu_filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.menu_filter(next)));
			return obj;
		}
		Menu_links_empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		arg(id){
			return {};
		}
		menu_link_arg(id){
			return (this.arg(id));
		}
		spread_title(id){
			return "";
		}
		Menu_link_title(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.menu_filter()));
			(obj.haystack) = () => ((this.spread_title(id)));
			return obj;
		}
		menu_link_content(id){
			return [(this.Menu_link_title(id))];
		}
		Menu_link(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.menu_link_arg(id)));
			(obj.sub) = () => ((this.menu_link_content(id)));
			return obj;
		}
		menu_item_content(id){
			return [(this.Menu_link(id))];
		}
		Menu_item(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.menu_item_content(id)));
			return obj;
		}
		menu_links(){
			return [(this.Menu_item("0"))];
		}
		Menu_links(){
			const obj = new this.$.$mol_list();
			(obj.Empty) = () => ((this.Menu_links_empty()));
			(obj.rows) = () => ((this.menu_links()));
			return obj;
		}
		menu_body(){
			return [(this.Menu_filter()), (this.Menu_links())];
		}
		menu_foot(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.menu_title()));
			(obj.Logo) = () => ((this.Menu_logo()));
			(obj.tools) = () => ([...(this.menu_tools()), ...(this.addon_tools())]);
			(obj.head) = () => ((this.menu_head()));
			(obj.body) = () => ((this.menu_body()));
			(obj.foot) = () => ((this.menu_foot()));
			return obj;
		}
		spread_close_arg(){
			return {};
		}
		Spread_close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		param(){
			return "";
		}
		spread(next){
			if(next !== undefined) return next;
			return "";
		}
		spreads(){
			return {};
		}
		Spread(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Spread_default(){
			return null;
		}
		spread_ids(){
			return [];
		}
		menu_filter_enabled(){
			return false;
		}
		spread_ids_filtered(){
			return [];
		}
		spread_current(){
			return null;
		}
		menu_tools(){
			return [];
		}
		addon_tools(){
			return [];
		}
		pages(){
			return [(this.Menu())];
		}
		Spread_close(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.spread_close_arg()));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_book2_catalog_Spread_close_hint")));
			(obj.sub) = () => ([(this.Spread_close_icon())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_book2_catalog.prototype), "menu_filter"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_filter"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_links_empty"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_link_title"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_link"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_item"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_links"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Spread_close_icon"));
	($mol_mem(($.$mol_book2_catalog.prototype), "spread"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Spread"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Spread_close"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_book2_catalog extends $.$mol_book2_catalog {
            spread_current() {
                return this.spread() === '' ? this.Spread_default() : this.Spread(this.spread());
            }
            pages() {
                const spread = this.spread_current();
                return [
                    this.Menu(),
                    ...spread
                        ? spread instanceof $mol_book2
                            ? spread.pages_deep()
                            : [spread]
                        : [],
                ];
            }
            auto() {
                const spread = this.spread_current();
                if (spread instanceof $mol_book2)
                    spread.auto();
            }
            spread_ids() {
                return Object.keys(this.spreads());
            }
            menu_body() {
                return [
                    ...this.menu_filter_enabled() ? [this.Menu_filter()] : [],
                    this.Menu_links(),
                ];
            }
            menu_filter_enabled() {
                return this.spread_ids().length >= 10;
            }
            menu_links() {
                return this.spread_ids_filtered()
                    .map(spread => this.Menu_item(spread));
            }
            spread_ids_filtered() {
                return this.spread_ids()
                    .filter($mol_match_text(this.menu_filter(), spread => [this.spread_title(spread)]));
            }
            Spread(id) {
                return this.spreads()[id];
            }
            Spread_default() {
                return this.spreads()[''];
            }
            spread(next) {
                return this.$.$mol_state_arg.value(this.param(), next) ?? '';
            }
            arg(spread) {
                return { [this.param()]: spread || null };
            }
            spread_close_arg() {
                return { [this.param()]: null };
            }
            spread_title(spread) {
                const page = this.Spread(spread);
                return page instanceof $mol_book2
                    && page.menu_title()
                    || page.title()
                    || spread;
            }
            spread_current_book() {
                const spread = this.spread_current();
                return spread instanceof $mol_book2 ? spread : null;
            }
            placeholders() {
                const spread_placeholders = this.spread_current_book()?.placeholders() ?? [];
                return spread_placeholders.length ? spread_placeholders : super.placeholders();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "pages", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread_ids", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_body", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_links", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread_ids_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "placeholders", null);
        $$.$mol_book2_catalog = $mol_book2_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_book2_catalog, {
            Menu_filter: {
                flex: {
                    shrink: 0,
                    grow: 0,
                },
                alignSelf: 'stretch',
            },
            Menu_item: {
                align: {
                    items: 'flex-start',
                },
            },
            Menu_link: {
                flex: {
                    grow: 1,
                    shrink: 1,
                    wrap: 'wrap',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_link) = class $yuf_link extends ($.$mol_link) {
		link_arg(){
			return {};
		}
		Icon(){
			return null;
		}
		content(){
			return [(this.title())];
		}
		param_name(){
			return "";
		}
		param_value(){
			return "";
		}
		default(){
			return false;
		}
		unselectable(){
			return true;
		}
		arg(){
			return (this.link_arg());
		}
		sub(){
			return [(this.Icon()), ...(this.content())];
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_link extends $.$yuf_link {
            link_arg() {
                return {
                    [this.param_name()]: this.param_value()
                };
            }
            dict() {
                const self_args = this.arg();
                const dict = this.$.$mol_state_arg.dict();
                const result = {};
                for (let dict_key in dict) {
                    for (let self_key in self_args) {
                        if (!dict_key.startsWith(self_key)) {
                            result[dict_key] = dict[dict_key];
                        }
                    }
                }
                return result;
            }
            default_selected() {
                const args = this.$.$mol_state_arg;
                return this.default() && Object.keys(this.arg()).every(key => !args.value(key));
            }
            current() {
                return this.default_selected() || super.current();
            }
            click(e) {
                if ((this.default_selected() || !this.unselectable()) && this.current() && e) {
                    this.$.$mol_dom_event.wrap(e).prevented(true);
                }
                return super.click(e);
            }
            uri() {
                return this.$.$mol_state_arg.make_link({ ...this.dict(), ...this.arg() });
            }
            uri_off() {
                const result = { ...this.dict() };
                for (let key in this.arg())
                    result[key] = null;
                return this.$.$mol_state_arg.make_link(result);
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_link.prototype, "link_arg", null);
        __decorate([
            $mol_mem
        ], $yuf_link.prototype, "default_selected", null);
        __decorate([
            $mol_mem
        ], $yuf_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $yuf_link.prototype, "uri_off", null);
        $$.$yuf_link = $yuf_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_link, {
            gap: $mol_gap.block,
            ':active': {
                color: $mol_theme.text,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_link_close) = class $yuf_link_close extends ($.$yuf_link) {
		param_value(){
			return null;
		}
		hint(){
			return (this.$.$mol_locale.text("$yuf_link_close_hint"));
		}
		title(){
			return "";
		}
		Icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
	};
	($mol_mem(($.$yuf_link_close.prototype), "Icon"));


;
"use strict";

;
	($.$yuf_catalog) = class $yuf_catalog extends ($.$mol_book2_catalog) {
		param_base(){
			return "";
		}
		Spread_close(){
			const obj = new this.$.$yuf_link_close();
			(obj.link_arg) = () => ((this.spread_close_arg()));
			return obj;
		}
		menu_link_default(id){
			return false;
		}
		menu_link_hint(id){
			return null;
		}
		spread_default(){
			return "";
		}
		param_prefix(){
			return "";
		}
		param_suffix(){
			return "";
		}
		param(){
			return (this.param_base());
		}
		spread_close_content(){
			return [(this.Spread_close())];
		}
		Menu_link(id){
			const obj = new this.$.$yuf_link();
			(obj.arg) = () => ((this.arg(id)));
			(obj.unselectable) = () => (false);
			(obj.default) = () => ((this.menu_link_default(id)));
			(obj.content) = () => ((this.menu_link_content(id)));
			(obj.hint) = () => ((this.menu_link_hint(id)));
			return obj;
		}
	};
	($mol_mem(($.$yuf_catalog.prototype), "Spread_close"));
	($mol_mem_key(($.$yuf_catalog.prototype), "Menu_link"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_catalog extends $.$yuf_catalog {
            param_base() {
                return [
                    this.param_prefix(),
                    this.param_suffix(),
                ].filter(Boolean).join('_');
            }
            menu_link_default(id) {
                return this.spread_default() === id;
            }
            spread(next) {
                return super.spread(next) || this.spread_default();
            }
            spread_close_content() {
                const spread_default = this.spread_default();
                const current = this.spread();
                return current === spread_default || (spread_default && !current)
                    ? []
                    : super.spread_close_content();
            }
        }
        $$.$yuf_catalog = $yuf_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_array_lottery(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_array_lottery = $mol_array_lottery;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_unit extends $mol_object {
        'valueOf()';
        constructor(value) {
            super();
            if (value !== undefined)
                this['valueOf()'] = value;
        }
        prefix() {
            return '';
        }
        postfix() {
            return '';
        }
        [Symbol.toPrimitive](hint) {
            switch (hint) {
                case 'number': return this.valueOf();
                case 'string': return this.toString();
                default: return this.toString();
            }
        }
        valueOf() {
            return this['valueOf()'];
        }
        delimiter() {
            return ' ';
        }
        value_view() {
            return this.valueOf().toLocaleString();
        }
        toString() {
            return this.prefix() + this.value_view() + this.postfix();
        }
        static summ(a, b) {
            var Class = a.constructor;
            if (Class !== b.constructor)
                throw new Error(`Not same measure: ${Class} , ${b.constructor}`);
            return new Class(a.valueOf() + b.valueOf());
        }
        mult(m) {
            var Class = this.constructor;
            return new Class(this.valueOf() * m);
        }
    }
    $.$mol_unit = $mol_unit;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_unit_money extends $mol_unit {
    }
    $.$mol_unit_money = $mol_unit_money;
    class $mol_unit_money_usd extends $mol_unit_money {
        prefix() {
            return '$';
        }
    }
    $.$mol_unit_money_usd = $mol_unit_money_usd;
    class $mol_unit_money_rub extends $mol_unit_money {
        postfix() {
            return ' ₽';
        }
    }
    $.$mol_unit_money_rub = $mol_unit_money_rub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_stub_strings(prefix = '', count = 10, length = 10) {
        if (prefix.length >= length)
            return [];
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
        let strings = [];
        for (let i = 0; i < count; i++) {
            let text = prefix;
            for (let j = prefix.length; j < length; j++) {
                text += $mol_array_lottery(possible);
            }
            strings.push(text);
        }
        return strings;
    }
    $.$mol_stub_strings = $mol_stub_strings;
    function $mol_stub_code(length = 8) {
        var max = Math.pow(16, length);
        var min = Math.pow(16, length - 1);
        var value = min + Math.floor(Math.random() * (max - min));
        return value.toString(16).toUpperCase();
    }
    $.$mol_stub_code = $mol_stub_code;
    function $mol_stub_price(max = 1000) {
        var min = Math.floor(max / 16 / 16);
        var value = min + Math.floor(Math.random() * (max - min));
        return new $mol_unit_money_usd(value);
    }
    $.$mol_stub_price = $mol_stub_price;
    function $mol_stub_product_name() {
        var name = $mol_array_lottery([
            'Monitor 15"',
            'Monitor 17"',
            'Monitor 19"',
            'Graphics card',
            'Frame grabber card'
        ]);
        var port = $mol_array_lottery(['D-SUB', 'DVI', 'HDMI']);
        var resolution = $mol_array_lottery(['VGA', 'Full HD', '4K']);
        return [name, port, resolution].join(', ');
    }
    $.$mol_stub_product_name = $mol_stub_product_name;
    function $mol_stub_company_name_big() {
        var product = $mol_array_lottery(['Everything', 'Something', 'Anything', 'Nothing']);
        var type = $mol_array_lottery(['Company', 'Corporation', 'Holding']);
        return `A ${type} that makes ${product}`;
    }
    $.$mol_stub_company_name_big = $mol_stub_company_name_big;
    function $mol_stub_company_name_small() {
        return $mol_array_lottery(['ACME inc.', 'Dream Company', 'Just Company']);
    }
    $.$mol_stub_company_name_small = $mol_stub_company_name_small;
    function $mol_stub_company_name() {
        return $mol_array_lottery([$mol_stub_company_name_small, $mol_stub_company_name_big])();
    }
    $.$mol_stub_company_name = $mol_stub_company_name;
    function $mol_stub_person_name() {
        var first = $mol_array_lottery(['Ivan', 'Petr', 'Sidor', 'John', 'Sam']);
        var last = $mol_array_lottery(['Ivanov', 'Petrov', 'Sidorov', 'Johnson', 'Smith']);
        return `${first} ${last}`;
    }
    $.$mol_stub_person_name = $mol_stub_person_name;
    function $mol_stub_person_avatar(size = 80) {
        const id = Math.random().toString(16).slice(2);
        return `https://gravatar.com/avatar/${id}?d=robohash&s=${size}`;
    }
    $.$mol_stub_person_avatar = $mol_stub_person_avatar;
    function $mol_stub_city() {
        return $mol_array_lottery(['Moscow', 'London', 'Washington', 'Buenos Aires']);
    }
    $.$mol_stub_city = $mol_stub_city;
    function $mol_stub_time(maxShift = 60 * 24 * 365) {
        return new $mol_time_moment().shift({ minute: Math.round(Math.random() * maxShift) });
    }
    $.$mol_stub_time = $mol_stub_time;
    function $mol_stub_message(max_length) {
        const text = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.';
        return text.substring(0, Math.ceil(Math.random() * max_length - 5) + 5);
    }
    $.$mol_stub_message = $mol_stub_message;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_catalog_demo_user_model extends $mol_object {
        id() { return ''; }
        name() {
            return $mol_stub_person_name();
        }
        age() {
            return Math.ceil(5 + Math.random() * 70);
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_catalog_demo_user_model.prototype, "name", null);
    __decorate([
        $mol_mem
    ], $yuf_catalog_demo_user_model.prototype, "age", null);
    $.$yuf_catalog_demo_user_model = $yuf_catalog_demo_user_model;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_catalog_demo_user_store extends $mol_object {
        ids_all() {
            const prefix = this.friend_user_id();
            const ids = [];
            for (let i = 0; i < 20; i++) {
                let id = '' + (i + 1);
                if (prefix)
                    id = prefix + '-' + id;
                ids.push(id);
            }
            return ids;
        }
        ids() {
            return this.ids_all().filter(id => this.by_id(id).age() >= this.age_from());
        }
        age_from(next) {
            return next ?? 0;
        }
        by_id(id) {
            return this.$.$yuf_catalog_demo_user_model.make({
                id: $mol_const(id)
            });
        }
        friend_user_id() {
            return '';
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_catalog_demo_user_store.prototype, "ids_all", null);
    __decorate([
        $mol_mem
    ], $yuf_catalog_demo_user_store.prototype, "ids", null);
    __decorate([
        $mol_mem
    ], $yuf_catalog_demo_user_store.prototype, "age_from", null);
    __decorate([
        $mol_mem_key
    ], $yuf_catalog_demo_user_store.prototype, "by_id", null);
    $.$yuf_catalog_demo_user_store = $yuf_catalog_demo_user_store;
})($ || ($ = {}));

;
	($.$mol_icon_filter) = class $mol_icon_filter extends ($.$mol_icon) {
		path(){
			return "M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_face) = class $mol_icon_face extends ($.$mol_icon) {
		path(){
			return "M9,11.75C8.31,11.75 7.75,12.31 7.75,13C7.75,13.69 8.31,14.25 9,14.25C9.69,14.25 10.25,13.69 10.25,13C10.25,12.31 9.69,11.75 9,11.75M15,11.75C14.31,11.75 13.75,12.31 13.75,13C13.75,13.69 14.31,14.25 15,14.25C15.69,14.25 16.25,13.69 16.25,13C16.25,12.31 15.69,11.75 15,11.75M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,11.71 4,11.42 4.05,11.14C6.41,10.09 8.28,8.16 9.26,5.77C11.07,8.33 14.05,10 17.42,10C18.2,10 18.95,9.91 19.67,9.74C19.88,10.45 20,11.21 20,12C20,16.41 16.41,20 12,20Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_face_agent) = class $mol_icon_face_agent extends ($.$mol_icon) {
		path(){
			return "M18.72,14.76C19.07,13.91 19.26,13 19.26,12C19.26,11.28 19.15,10.59 18.96,9.95C18.31,10.1 17.63,10.18 16.92,10.18C13.86,10.18 11.15,8.67 9.5,6.34C8.61,8.5 6.91,10.26 4.77,11.22C4.73,11.47 4.73,11.74 4.73,12A7.27,7.27 0 0,0 12,19.27C13.05,19.27 14.06,19.04 14.97,18.63C15.54,19.72 15.8,20.26 15.78,20.26C14.14,20.81 12.87,21.08 12,21.08C9.58,21.08 7.27,20.13 5.57,18.42C4.53,17.38 3.76,16.11 3.33,14.73H2V10.18H3.09C3.93,6.04 7.6,2.92 12,2.92C14.4,2.92 16.71,3.87 18.42,5.58C19.69,6.84 20.54,8.45 20.89,10.18H22V14.67H22V14.69L22,14.73H21.94L18.38,18L13.08,17.4V15.73H17.91L18.72,14.76M9.27,11.77C9.57,11.77 9.86,11.89 10.07,12.11C10.28,12.32 10.4,12.61 10.4,12.91C10.4,13.21 10.28,13.5 10.07,13.71C9.86,13.92 9.57,14.04 9.27,14.04C8.64,14.04 8.13,13.54 8.13,12.91C8.13,12.28 8.64,11.77 9.27,11.77M14.72,11.77C15.35,11.77 15.85,12.28 15.85,12.91C15.85,13.54 15.35,14.04 14.72,14.04C14.09,14.04 13.58,13.54 13.58,12.91A1.14,1.14 0 0,1 14.72,11.77Z";
		}
	};


;
"use strict";

;
	($.$mol_filler) = class $mol_filler extends ($.$mol_paragraph) {
		filler_lines(){
			return [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", 
				"Donec a diam lectus. ", 
				"Sed sit amet ipsum mauris. ", 
				"Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. ", 
				"Donec et mollis dolor. ", 
				"Praesent et diam eget libero egestas mattis sit amet vitae augue. ", 
				"Nam tincidunt congue enim, ut porta lorem lacinia consectetur. ", 
				"Donec ut libero sed arcu vehicula ultricies a non tortor. ", 
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", 
				"Aenean ut gravida lorem. ", 
				"Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. ", 
				"Pellentesque auctor nisi id magna consequat sagittis. ", 
				"Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. ", 
				"Ut convallis libero in urna ultrices accumsan. ", 
				"Donec sed odio eros. ", 
				"Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. ", 
				"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ", 
				"In rutrum accumsan ultricies. ", 
				"Mauris vitae nisi at sem facilisis semper ac in est. ", 
				"Vivamus fermentum semper porta. ", 
				"Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. ", 
				"Maecenas convallis ullamcorper ultricies. ", 
				"Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. ", 
				"Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. ", 
				"Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. ", 
				"Fusce eget orci a orci congue vestibulum. ", 
				"Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. ", 
				"Curabitur venenatis pulvinar tellus gravida ornare. ", 
				"Sed et erat faucibus nunc euismod ultricies ut id justo. ", 
				"Nullam cursus suscipit nisi, et ultrices justo sodales nec. ", 
				"Fusce venenatis facilisis lectus ac semper. ", 
				"Aliquam at massa ipsum. ", 
				"Quisque bibendum purus convallis nulla ultrices ultricies. ", 
				"Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. ", 
				"Fusce vel volutpat elit. ", 
				"Nam sagittis nisi dui. ", 
				"Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. ", 
				"Etiam luctus porttitor lorem, sed suscipit est rutrum non. ", 
				"Curabitur lobortis nisl a enim congue semper. ", 
				"Aenean commodo ultrices imperdiet. ", 
				"Vestibulum ut justo vel sapien venenatis tincidunt. ", 
				"Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. ", 
				"Aliquam ut massa in turpis dapibus convallis. ", 
				"Praesent elit lacus, vestibulum at malesuada et, ornare et est. ", 
				"Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. ", 
				"Mauris ut placerat justo. ", 
				"Mauris in ultricies enim. ", 
				"Quisque nec est eleifend nulla ultrices egestas quis ut quam. ", 
				"Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. ", 
				"Cras quis ligula sem, vel elementum mi. ", 
				"Phasellus non ullamcorper urna. ", 
				"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ", 
				"In euismod ultrices facilisis. ", 
				"Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. ", 
				"Proin quis dictum nisl. ", 
				"Morbi id quam sapien, sed vestibulum sem. ", 
				"Duis elementum rutrum mauris sed convallis. ", 
				"Proin vestibulum magna mi. ", 
				"Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. ", 
				"Sed non tortor sodales quam auctor elementum. ", 
				"Donec hendrerit nunc eget elit pharetra pulvinar. ", 
				"Suspendisse id tempus tortor. ", 
				"Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. ", 
				"Donec vel. ", 
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", 
				"Donec a diam lectus. ", 
				"Sed sit amet ipsum mauris. ", 
				"Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. ", 
				"Donec et mollis dolor. ", 
				"Praesent et diam eget libero egestas mattis sit amet vitae augue. ", 
				"Nam tincidunt congue enim, ut porta lorem lacinia consectetur. ", 
				"Donec ut libero sed arcu vehicula ultricies a non tortor. ", 
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", 
				"Aenean ut gravida lorem. ", 
				"Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. ", 
				"Pellentesque auctor nisi id magna consequat sagittis. ", 
				"Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. ", 
				"Ut convallis libero in urna ultrices accumsan. ", 
				"Donec sed odio eros. ", 
				"Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. ", 
				"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ", 
				"In rutrum accumsan ultricies. ", 
				"Mauris vitae nisi at sem facilisis semper ac in est. ", 
				"Vivamus fermentum semper porta. ", 
				"Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. ", 
				"Maecenas convallis ullamcorper ultricies. ", 
				"Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. ", 
				"Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. ", 
				"Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. ", 
				"Fusce eget orci a orci congue vestibulum. ", 
				"Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. ", 
				"Curabitur venenatis pulvinar tellus gravida ornare. ", 
				"Sed et erat faucibus nunc euismod ultricies ut id justo. ", 
				"Nullam cursus suscipit nisi, et ultrices justo sodales nec. ", 
				"Fusce venenatis facilisis lectus ac semper. ", 
				"Aliquam at massa ipsum. ", 
				"Quisque bibendum purus convallis nulla ultrices ultricies. ", 
				"Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. ", 
				"Fusce vel volutpat elit. ", 
				"Nam sagittis nisi dui. ", 
				"Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. ", 
				"Etiam luctus porttitor lorem, sed suscipit est rutrum non. ", 
				"Curabitur lobortis nisl a enim congue semper. ", 
				"Aenean commodo ultrices imperdiet. ", 
				"Vestibulum ut justo vel sapien venenatis tincidunt. ", 
				"Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. ", 
				"Aliquam ut massa in turpis dapibus convallis. ", 
				"Praesent elit lacus, vestibulum at malesuada et, ornare et est. ", 
				"Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. ", 
				"Mauris ut placerat justo. ", 
				"Mauris in ultricies enim. ", 
				"Quisque nec est eleifend nulla ultrices egestas quis ut quam. ", 
				"Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. ", 
				"Cras quis ligula sem, vel elementum mi. ", 
				"Phasellus non ullamcorper urna. ", 
				"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ", 
				"In euismod ultrices facilisis. ", 
				"Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. ", 
				"Proin quis dictum nisl. ", 
				"Morbi id quam sapien, sed vestibulum sem. ", 
				"Duis elementum rutrum mauris sed convallis. ", 
				"Proin vestibulum magna mi. ", 
				"Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. ", 
				"Sed non tortor sodales quam auctor elementum. ", 
				"Donec hendrerit nunc eget elit pharetra pulvinar. ", 
				"Suspendisse id tempus tortor. ", 
				"Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. ", 
				"Donec vel. "
			];
		}
		min_symbols(){
			return 7000;
		}
		sub(){
			return (this.filler_lines());
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/filler/filler.view.css", "[mol_filler] {\n\ttext-align: left;\n\tpadding: var(--mol_gap_text);\n\tflex-shrink: 0;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_filler extends $.$mol_filler {
            filler_lines() {
                const lines = [];
                let len_cur = 0;
                while (len_cur < this.min_symbols()) {
                    const line = this.$.$mol_array_lottery(super.filler_lines());
                    len_cur += line.length;
                    lines.push(line);
                }
                return lines;
            }
        }
        $$.$mol_filler = $mol_filler;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_chevron_left) = class $mol_icon_chevron_left extends ($.$mol_icon) {
		path(){
			return "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_chevron_right) = class $mol_icon_chevron_right extends ($.$mol_icon) {
		path(){
			return "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
		}
	};


;
"use strict";

;
	($.$mol_number) = class $mol_number extends ($.$mol_view) {
		precision(){
			return 1;
		}
		event_dec(next){
			if(next !== undefined) return next;
			return null;
		}
		event_inc(next){
			if(next !== undefined) return next;
			return null;
		}
		event_dec_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		event_inc_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({
				"down": (next) => (this.event_dec(next)), 
				"up": (next) => (this.event_inc(next)), 
				"pageDown": (next) => (this.event_dec_boost(next)), 
				"pageUp": (next) => (this.event_inc_boost(next))
			});
			return obj;
		}
		dec_enabled(){
			return (this.enabled());
		}
		dec_icon(){
			const obj = new this.$.$mol_icon_chevron_left();
			return obj;
		}
		Dec(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this.event_dec(next)));
			(obj.enabled) = () => ((this.dec_enabled()));
			(obj.sub) = () => ([(this.dec_icon())]);
			return obj;
		}
		type(){
			return "text";
		}
		value_string(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		string_enabled(){
			return (this.enabled());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		String(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ((this.type()));
			(obj.keyboard) = () => ("decimal");
			(obj.value) = (next) => ((this.value_string(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.string_enabled()));
			(obj.submit) = (next) => ((this.submit(next)));
			return obj;
		}
		inc_enabled(){
			return (this.enabled());
		}
		inc_icon(){
			const obj = new this.$.$mol_icon_chevron_right();
			return obj;
		}
		Inc(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this.event_inc(next)));
			(obj.enabled) = () => ((this.inc_enabled()));
			(obj.sub) = () => ([(this.inc_icon())]);
			return obj;
		}
		precision_view(){
			return (this.precision());
		}
		precision_change(){
			return (this.precision());
		}
		boost(){
			return 10;
		}
		value_min(){
			return -Infinity;
		}
		value_max(){
			return +Infinity;
		}
		value(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		enabled(){
			return true;
		}
		plugins(){
			return [(this.Hotkey())];
		}
		sub(){
			return [
				(this.Dec()), 
				(this.String()), 
				(this.Inc())
			];
		}
	};
	($mol_mem(($.$mol_number.prototype), "event_dec"));
	($mol_mem(($.$mol_number.prototype), "event_inc"));
	($mol_mem(($.$mol_number.prototype), "event_dec_boost"));
	($mol_mem(($.$mol_number.prototype), "event_inc_boost"));
	($mol_mem(($.$mol_number.prototype), "Hotkey"));
	($mol_mem(($.$mol_number.prototype), "dec_icon"));
	($mol_mem(($.$mol_number.prototype), "Dec"));
	($mol_mem(($.$mol_number.prototype), "value_string"));
	($mol_mem(($.$mol_number.prototype), "submit"));
	($mol_mem(($.$mol_number.prototype), "String"));
	($mol_mem(($.$mol_number.prototype), "inc_icon"));
	($mol_mem(($.$mol_number.prototype), "Inc"));
	($mol_mem(($.$mol_number.prototype), "value"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/number/number.css", "[mol_number] {\n\tdisplay: flex;\n\tflex: 0 1 auto;\n\tposition: relative;\n\talign-items: stretch;\n\tmax-width: 100%;\n}\n\n[mol_number_string] {\n\tappearance: textfield;\n\tflex: 1 1 7rem;\n\twidth: 7rem;\n}\n\n[mol_number_string]::-webkit-inner-spin-button {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_number extends $.$mol_number {
            value_limited(val) {
                if (Number.isNaN(val))
                    return this.value(val);
                if (val === undefined)
                    return this.value();
                const min = this.value_min();
                const max = this.value_max();
                if (val < min)
                    return this.value(min);
                if (val > max)
                    return this.value(max);
                return this.value(val);
            }
            event_dec(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change());
                next?.preventDefault();
            }
            event_inc(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change());
                next?.preventDefault();
            }
            event_dec_boost(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change() * this.boost());
                next?.preventDefault();
            }
            event_inc_boost(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change() * this.boost());
                next?.preventDefault();
            }
            round(val) {
                if (Number.isNaN(val))
                    return '';
                if (val === 0)
                    return '0';
                if (!val)
                    return '';
                const precision_view = this.precision_view();
                if (!precision_view)
                    return val.toFixed();
                if (precision_view >= 1) {
                    return (val / precision_view).toFixed();
                }
                else {
                    const fixed_number = Math.log10(1 / precision_view);
                    return val.toFixed(Math.ceil(fixed_number));
                }
            }
            value_string(next) {
                const current = this.round(this.value_limited());
                if (next === undefined)
                    return current;
                const precision = this.precision_view();
                if (precision - Math.floor(precision) === 0)
                    next = next.replace(/[.,]/g, '');
                next = (this.value_min() < 0 && next.startsWith('-') ? '-' : '')
                    + next.replace(/,/g, '.').replace(/[^\d\.]/g, '').replace(/^0{2,}/, '0');
                let dot_pos = next.indexOf('.');
                if (dot_pos !== -1) {
                    const prev = $mol_wire_probe(() => this.value_string()) ?? '';
                    const dot_pos_prev = prev.indexOf('.');
                    if (dot_pos_prev === dot_pos)
                        dot_pos = next.lastIndexOf('.');
                    const frac = next.slice(dot_pos + 1).replace(/\./g, '');
                    next = (next.slice(0, dot_pos) || '0').replace(/\./g, '') + '.' + frac;
                }
                if (Number.isNaN(Number(next)))
                    return next;
                if (next.endsWith('.'))
                    return next;
                if (next.endsWith('-'))
                    return next;
                this.value_limited(Number(next || Number.NaN));
                return next;
            }
            dec_enabled() {
                return this.enabled() && (!((this.value() || 0) <= this.value_min()));
            }
            inc_enabled() {
                return this.enabled() && (!((this.value() || 0) >= this.value_max()));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "value_string", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "dec_enabled", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "inc_enabled", null);
        $$.$mol_number = $mol_number;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_catalog_demo) = class $yuf_catalog_demo extends ($.$mol_example_large) {
		Calatog(){
			const obj = new this.$.$yuf_catalog_demo_catalog();
			(obj.param_prefix) = () => ((this.param()));
			return obj;
		}
		title(){
			return "Catalog of pages";
		}
		param(){
			return "app";
		}
		sub(){
			return [(this.Calatog())];
		}
		tags(){
			return [
				"app", 
				"page", 
				"menu", 
				"navigation", 
				"transition", 
				"multipage"
			];
		}
		aspects(){
			return ["Navigation", "Widget/Layout"];
		}
	};
	($mol_mem(($.$yuf_catalog_demo.prototype), "Calatog"));
	($.$yuf_catalog_demo_catalog) = class $yuf_catalog_demo_catalog extends ($.$yuf_catalog) {
		Users(){
			const obj = new this.$.$yuf_catalog_demo_user_catalog();
			(obj.param_prefix) = () => ((this.param()));
			(obj.addon_tools) = () => ([...(this.spread_close_content())]);
			return obj;
		}
		Foods(){
			const obj = new this.$.$yuf_catalog_demo_foods();
			(obj.param_prefix) = () => ((this.param()));
			(obj.addon_tools) = () => ([...(this.spread_close_content())]);
			return obj;
		}
		param_suffix(){
			return "catalog";
		}
		menu_title(){
			return "Catalog";
		}
		spreads(){
			return {"users": (this.Users()), "foods": (this.Foods())};
		}
	};
	($mol_mem(($.$yuf_catalog_demo_catalog.prototype), "Users"));
	($mol_mem(($.$yuf_catalog_demo_catalog.prototype), "Foods"));
	($.$yuf_catalog_demo_foods) = class $yuf_catalog_demo_foods extends ($.$yuf_catalog) {
		Pizza(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🍕 Pizzas");
			(obj.tools) = () => ([...(this.spread_close_content())]);
			(obj.body) = () => ([(this.Empty())]);
			return obj;
		}
		Hot_dogs(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🌭 Hot Dogs");
			(obj.tools) = () => ([...(this.spread_close_content())]);
			(obj.body) = () => ([(this.Empty())]);
			return obj;
		}
		Fries(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("🍟 Fries");
			(obj.tools) = () => ([...(this.spread_close_content())]);
			(obj.body) = () => ([(this.Empty())]);
			return obj;
		}
		param_suffix(){
			return "foods";
		}
		menu_title(){
			return "Foods with default selected pizza";
		}
		spread_default(){
			return "pizza";
		}
		Empty(){
			const obj = new this.$.$mol_status();
			return obj;
		}
		spreads(){
			return {
				"pizza": (this.Pizza()), 
				"hot_dogs": (this.Hot_dogs()), 
				"fries": (this.Fries())
			};
		}
	};
	($mol_mem(($.$yuf_catalog_demo_foods.prototype), "Pizza"));
	($mol_mem(($.$yuf_catalog_demo_foods.prototype), "Hot_dogs"));
	($mol_mem(($.$yuf_catalog_demo_foods.prototype), "Fries"));
	($mol_mem(($.$yuf_catalog_demo_foods.prototype), "Empty"));
	($.$yuf_catalog_demo_user_catalog) = class $yuf_catalog_demo_user_catalog extends ($.$yuf_catalog) {
		by_id(id){
			return (this.store().by_id(id));
		}
		spread_ids(){
			return (this.store().ids());
		}
		age_from(next){
			if(next !== undefined) return next;
			return 10;
		}
		friend_user_id(){
			return "";
		}
		Filter_enable_icon(){
			const obj = new this.$.$mol_icon_filter();
			return obj;
		}
		filter_param_name(){
			return "filter";
		}
		Filter_enable(){
			const obj = new this.$.$yuf_link();
			(obj.sub) = () => ([(this.Filter_enable_icon())]);
			(obj.param_name) = () => ((this.filter_param_name()));
			return obj;
		}
		Age_enable_icon(){
			const obj = new this.$.$mol_icon_face_agent();
			return obj;
		}
		age_param_name(){
			return "age";
		}
		Age_enable(){
			const obj = new this.$.$yuf_link();
			(obj.sub) = () => ([(this.Age_enable_icon())]);
			(obj.param_name) = () => ((this.age_param_name()));
			return obj;
		}
		Filter_page(){
			const obj = new this.$.$yuf_catalog_demo_user_filter();
			(obj.close_param_name) = () => ((this.filter_param_name()));
			(obj.age_from) = (next) => ((this.age_from(next)));
			(obj.title) = () => ("Filter");
			return obj;
		}
		age_enabled(){
			return false;
		}
		param_suffix(){
			return "users";
		}
		param(){
			return "user";
		}
		menu_title(){
			return "Users";
		}
		Content(){
			const obj = new this.$.$mol_filler();
			return obj;
		}
		Empty(){
			const obj = new this.$.$mol_status();
			return obj;
		}
		store(){
			const obj = new this.$.$yuf_catalog_demo_user_store();
			(obj.age_from) = (next) => ((this.age_from(next)));
			(obj.friend_user_id) = () => ((this.friend_user_id()));
			return obj;
		}
		menu_filter_enabled(){
			return false;
		}
		menu_tools(){
			return [(this.Filter_enable()), (this.Age_enable())];
		}
		filter_content(){
			return [(this.Filter_page())];
		}
		Menu_link(id){
			const obj = new this.$.$yuf_catalog_demo_user_link();
			(obj.arg) = () => ((this.arg(id)));
			(obj.age_enabled) = () => ((this.age_enabled()));
			(obj.model) = () => ((this.by_id(id)));
			(obj.default) = () => ((this.menu_link_default(id)));
			return obj;
		}
		Spread(id){
			const obj = new this.$.$yuf_catalog_demo_user_info();
			(obj.model) = () => ((this.by_id(id)));
			(obj.param_base) = () => ((this.param()));
			(obj.addon_tools) = () => ([(this.Spread_close())]);
			return obj;
		}
	};
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "age_from"));
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "Filter_enable_icon"));
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "Filter_enable"));
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "Age_enable_icon"));
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "Age_enable"));
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "Filter_page"));
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "Content"));
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "Empty"));
	($mol_mem(($.$yuf_catalog_demo_user_catalog.prototype), "store"));
	($mol_mem_key(($.$yuf_catalog_demo_user_catalog.prototype), "Menu_link"));
	($mol_mem_key(($.$yuf_catalog_demo_user_catalog.prototype), "Spread"));
	($.$yuf_catalog_demo_user_info) = class $yuf_catalog_demo_user_info extends ($.$mol_book2) {
		name(){
			return (this.model().name());
		}
		age(){
			return (this.model().age());
		}
		id(){
			return (this.model().id());
		}
		menu_title(){
			return "User {id}";
		}
		Age_enable_icon(){
			const obj = new this.$.$mol_icon_face_agent();
			return obj;
		}
		age_param_name(){
			return "age";
		}
		Age_enable(){
			const obj = new this.$.$yuf_link();
			(obj.sub) = () => ([(this.Age_enable_icon())]);
			(obj.param_name) = () => ((this.age_param_name()));
			return obj;
		}
		addon_tools(){
			return [];
		}
		Name(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Name");
			(obj.content) = () => ([(this.name())]);
			return obj;
		}
		Age(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Age");
			(obj.content) = () => ([(this.age())]);
			return obj;
		}
		age_content(){
			return [(this.Age())];
		}
		friends_name(){
			return "Friends";
		}
		Friends_enable(){
			const obj = new this.$.$yuf_link();
			(obj.sub) = () => ([(this.friends_name())]);
			(obj.param_name) = () => ((this.friends_param_name()));
			return obj;
		}
		Info(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.menu_title()));
			(obj.tools) = () => ([(this.Age_enable()), ...(this.addon_tools())]);
			(obj.body) = () => ([
				(this.Name()), 
				...(this.age_content()), 
				(this.Friends_enable())
			]);
			return obj;
		}
		friends_param_name(){
			return (this.Friends().param_base());
		}
		friends_title(){
			return "Friends of {id}";
		}
		Friends_close(){
			const obj = new this.$.$yuf_link_close();
			(obj.param_name) = () => ((this.friends_param_name()));
			return obj;
		}
		Friends(){
			const obj = new this.$.$yuf_catalog_demo_user_catalog();
			(obj.param_prefix) = () => ((this.param_base()));
			(obj.friend_user_id) = () => ((this.id()));
			(obj.menu_title) = () => ((this.friends_title()));
			(obj.addon_tools) = () => ([(this.Friends_close())]);
			return obj;
		}
		friends_content(){
			return [(this.Friends())];
		}
		param_base(){
			return "";
		}
		model(){
			const obj = new this.$.$yuf_catalog_demo_user_model();
			return obj;
		}
		pages(){
			return [(this.Info()), ...(this.friends_content())];
		}
	};
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "Age_enable_icon"));
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "Age_enable"));
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "Name"));
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "Age"));
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "Friends_enable"));
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "Info"));
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "Friends_close"));
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "Friends"));
	($mol_mem(($.$yuf_catalog_demo_user_info.prototype), "model"));
	($.$yuf_catalog_demo_user_filter) = class $yuf_catalog_demo_user_filter extends ($.$mol_page) {
		close_param_name(){
			return "";
		}
		Filter_close(){
			const obj = new this.$.$yuf_link_close();
			(obj.param_name) = () => ((this.close_param_name()));
			return obj;
		}
		age_from(next){
			if(next !== undefined) return next;
			return 10;
		}
		Age(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.age_from(next)));
			return obj;
		}
		Age_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ("Age from");
			(obj.control) = () => ((this.Age()));
			return obj;
		}
		Form(){
			const obj = new this.$.$mol_form();
			(obj.body) = () => ([(this.Age_field())]);
			(obj.buttons) = () => ([]);
			return obj;
		}
		theme(){
			return "$mol_theme_special";
		}
		tools(){
			return [(this.Filter_close())];
		}
		body(){
			return [(this.Form())];
		}
	};
	($mol_mem(($.$yuf_catalog_demo_user_filter.prototype), "Filter_close"));
	($mol_mem(($.$yuf_catalog_demo_user_filter.prototype), "age_from"));
	($mol_mem(($.$yuf_catalog_demo_user_filter.prototype), "Age"));
	($mol_mem(($.$yuf_catalog_demo_user_filter.prototype), "Age_field"));
	($mol_mem(($.$yuf_catalog_demo_user_filter.prototype), "Form"));
	($.$yuf_catalog_demo_user_link) = class $yuf_catalog_demo_user_link extends ($.$yuf_link) {
		name(){
			return (this.model().name());
		}
		age(){
			return (this.model().age());
		}
		Name(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Name");
			(obj.content) = () => ([(this.name())]);
			return obj;
		}
		Age(){
			const obj = new this.$.$mol_labeler();
			(obj.title) = () => ("Age");
			(obj.content) = () => ([(this.age())]);
			return obj;
		}
		age_content(){
			return [(this.Age())];
		}
		model(){
			const obj = new this.$.$yuf_catalog_demo_user_model();
			return obj;
		}
		age_enabled(){
			return false;
		}
		sub(){
			return [(this.Name()), ...(this.age_content())];
		}
	};
	($mol_mem(($.$yuf_catalog_demo_user_link.prototype), "Name"));
	($mol_mem(($.$yuf_catalog_demo_user_link.prototype), "Age"));
	($mol_mem(($.$yuf_catalog_demo_user_link.prototype), "model"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_catalog_demo_user_catalog extends $.$yuf_catalog_demo_user_catalog {
            filter_param_name() {
                return this.param_base() + '_' + super.filter_param_name();
            }
            age_param_name() {
                return this.param_base() + '_' + super.age_param_name();
            }
            param() {
                return `${this.param_base()}_${super.param()}`;
            }
            age_from(next) {
                return Number(this.$.$mol_state_arg.value(this.param_base() + '_age_from', next === undefined ? next : !next ? null : String(next)));
            }
            filter_enabled() {
                return this.$.$mol_state_arg.value(this.filter_param_name()) !== null;
            }
            pages() {
                return [
                    ...super.pages(),
                    ...this.filter_enabled() ? this.filter_content() : [],
                ];
            }
            age_enabled() {
                return this.$.$mol_state_arg.value(this.age_param_name()) !== null;
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_catalog_demo_user_catalog.prototype, "age_from", null);
        $$.$yuf_catalog_demo_user_catalog = $yuf_catalog_demo_user_catalog;
        class $yuf_catalog_demo_user_info extends $.$yuf_catalog_demo_user_info {
            age_param_name() {
                return this.param_base() + '_' + super.age_param_name();
            }
            age_enabled() {
                return this.$.$mol_state_arg.value(this.age_param_name()) !== null;
            }
            age_content() {
                return this.age_enabled() ? super.age_content() : [];
            }
            menu_title() { return super.menu_title().replace('{id}', this.id()); }
            friends_content() {
                return this.$.$mol_state_arg.value(this.friends_param_name()) !== null ? super.friends_content() : [];
            }
            friends_title() {
                return super.friends_title().replace('{id}', this.id());
            }
        }
        $$.$yuf_catalog_demo_user_info = $yuf_catalog_demo_user_info;
        class $yuf_catalog_demo_user_link extends $.$yuf_catalog_demo_user_link {
            age_content() {
                return this.age_enabled() ? super.age_content() : [];
            }
        }
        $$.$yuf_catalog_demo_user_link = $yuf_catalog_demo_user_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_catalog_demo_user_catalog, {
            Menu: {
                flex: {
                    basis: '22rem'
                }
            },
        });
        $mol_style_define($yuf_catalog_demo_user_link, {
            justifyContent: 'space-between',
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_eye_off) = class $mol_icon_eye_off extends ($.$mol_icon) {
		path(){
			return "M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z";
		}
	};


;
"use strict";

;
	($.$yuf_check_icon2) = class $yuf_check_icon2 extends ($.$mol_check_icon) {
		icon_disabled(){
			return false;
		}
		hint_checked(){
			return "";
		}
		hint_unchecked(){
			return "";
		}
		Icon_checked(){
			const obj = new this.$.$mol_icon_eye();
			return obj;
		}
		Icon_unchecked(){
			const obj = new this.$.$mol_icon_eye_off();
			return obj;
		}
	};
	($mol_mem(($.$yuf_check_icon2.prototype), "Icon_checked"));
	($mol_mem(($.$yuf_check_icon2.prototype), "Icon_unchecked"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_check_icon2 extends $.$yuf_check_icon2 {
            hint() {
                return this.checked() ? this.hint_checked() : this.hint_unchecked();
            }
            Icon() {
                if (this.icon_disabled())
                    return null;
                return this.checked() ? this.Icon_checked() : this.Icon_unchecked();
            }
        }
        $$.$yuf_check_icon2 = $yuf_check_icon2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_check_icon2, {
            '@': {
                mol_check_checked: {
                    true: {
                        color: 'inherit',
                    }
                }
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_password) = class $yuf_password extends ($.$mol_password) {
		Show(){
			const obj = new this.$.$yuf_password_check();
			(obj.checked) = (next) => ((this.checked(next)));
			return obj;
		}
	};
	($mol_mem(($.$yuf_password.prototype), "Show"));
	($.$yuf_password_check) = class $yuf_password_check extends ($.$yuf_check_icon2) {
		tab_index(){
			return -1;
		}
		attr(){
			return {...(super.attr()), "tabIndex": (this.tab_index())};
		}
		Icon_checked(){
			const obj = new this.$.$mol_icon_eye();
			return obj;
		}
		Icon_unchecked(){
			const obj = new this.$.$mol_icon_eye_off();
			return obj;
		}
	};
	($mol_mem(($.$yuf_password_check.prototype), "Icon_checked"));
	($mol_mem(($.$yuf_password_check.prototype), "Icon_unchecked"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_password, {
            flex: {
                shrink: 1,
                grow: 1,
            },
            Show: {
                position: 'relative',
                zIndex: $mol_layer.speck,
                cursor: 'pointer',
                margin: {
                    left: '-3rem',
                },
                $mol_icon: {
                    width: '1.5rem',
                },
                color: $mol_theme.control,
                ':hover': {
                    zIndex: $mol_layer.speck,
                    boxShadow: 'none',
                    color: $mol_theme.text,
                },
                ':focus': {
                    zIndex: $mol_layer.speck,
                    boxShadow: 'none',
                },
            },
            Pass: {
                order: '-1',
                padding: {
                    right: '3rem',
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_form_bid) = class $yuf_form_bid extends ($.$mol_view) {
		required_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_required_msg"));
		}
		pattern_not_match_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_pattern_not_match_msg"));
		}
		min_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_min_msg"));
		}
		max_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_max_msg"));
		}
		rows_max_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_rows_max_msg"));
		}
		json_invalid_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_json_invalid_msg"));
		}
		ip4_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_ip4_msg"));
		}
		ip4_mask_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_ip4_mask_msg"));
		}
		latin_digits_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_latin_digits_msg"));
		}
		value_in_range_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_value_in_range_msg"));
		}
		value(id){
			return null;
		}
		value_empty(id){
			return false;
		}
		value_date(id){
			const obj = new this.$["$mol_time_moment|string"]();
			return obj;
		}
		params_min_date(){
			return {};
		}
		params_max_date(){
			return {};
		}
		params_min(){
			return {};
		}
		params_max(){
			return {};
		}
		params_max_rows(){
			return {};
		}
		params_limits(){
			return {};
		}
		params_pattern(){
			return {};
		}
		pattern_val(id){
			return "";
		}
		rows_max_val(id){
			return null;
		}
		min_val(id){
			return null;
		}
		max_val(id){
			return null;
		}
		min_date_val(id){
			const obj = new this.$["$mol_time_moment|null"]();
			return obj;
		}
		max_date_val(id){
			const obj = new this.$["$mol_time_moment|null"]();
			return obj;
		}
		required(id){
			return (this.required_msg());
		}
		pattern(id){
			return (this.pattern_not_match_msg());
		}
		str_min_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_str_min_msg"));
		}
		str_max_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_str_max_msg"));
		}
		date_min_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_date_min_msg"));
		}
		date_max_msg(){
			return (this.$.$mol_locale.text("$yuf_form_bid_date_max_msg"));
		}
		min(id){
			return (this.min_msg());
		}
		max(id){
			return (this.max_msg());
		}
		rows_max(id){
			return (this.rows_max_msg());
		}
		json_invalid(id){
			return (this.json_invalid_msg());
		}
		ip4(id){
			return (this.ip4_msg());
		}
		ip4_mask(id){
			return (this.ip4_msg());
		}
		ip4_mask_required(id){
			return (this.ip4_mask_msg());
		}
		latin_digits(id){
			return (this.latin_digits_msg());
		}
		latin_digits_alpha(id){
			return (this.latin_digits_msg());
		}
		value_in_range(id, next){
			if(next !== undefined) return next;
			return (this.value_in_range_msg());
		}
		value_limits(id){
			return [];
		}
	};
	($mol_mem_key(($.$yuf_form_bid.prototype), "value_date"));
	($mol_mem_key(($.$yuf_form_bid.prototype), "min_date_val"));
	($mol_mem_key(($.$yuf_form_bid.prototype), "max_date_val"));
	($mol_mem_key(($.$yuf_form_bid.prototype), "value_in_range"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_form_bid extends $.$yuf_form_bid {
            value_str(field) {
                const val = this.value(field);
                if (typeof val !== 'string')
                    throw new Error('Not a string', { cause: { field } });
                return val;
            }
            value_bool(field) {
                const val = this.value(field);
                if (typeof val !== 'boolean')
                    throw new Error('Not a boolean', { cause: { field } });
                return val;
            }
            value_number(field) {
                const val = this.value(field);
                if (typeof val !== 'number')
                    throw new Error('Not a number', { cause: { field } });
                return val;
            }
            list_string(field) {
                const val = this.value(field);
                if (Array.isArray(val))
                    throw new Error('Not an array', { cause: { field } });
                return val;
            }
            dictionary_bool(field) {
                const val = this.value(field);
                if (Array.isArray(val) || !val || typeof val !== 'object')
                    throw new Error('Not an object', { cause: { field } });
                return val;
            }
            format(key, str) {
                return str.replace(/{([\d\w_]+)}/g, (_, val) => this[val]?.(key) || '0');
            }
            value_date(field) {
                const value = this.value(field);
                if (value instanceof this.$.$mol_time_moment || typeof value === 'string')
                    return value;
                throw new Error('Not a date', { cause: { value } });
            }
            min_msg_formatted(field) {
                if (typeof this.value(field) === 'string')
                    return this.str_min_msg();
                return this.min_msg();
            }
            max_msg_formatted(field) {
                if (typeof this.value(field) === 'string')
                    return this.str_max_msg();
                return this.max_msg();
            }
            value_empty(field) {
                const val = this.value(field);
                if (typeof val === 'string' || Array.isArray(val))
                    return val.length === 0;
                if (typeof val === 'number')
                    return Number.isNaN(val);
                return val === null || val === undefined;
            }
            min_date(field) {
                const val = this.value_date(field);
                const limit = this.min_date_val(field);
                if (!limit)
                    return '';
                if (val.toString() >= limit.toString())
                    return '';
                return this.format(field, this.date_min_msg());
            }
            max_date(field) {
                const val = this.value_date(field);
                const limit = this.max_date_val(field);
                if (!limit)
                    return '';
                if (val.toString() <= limit.toString())
                    return '';
                return this.format(field, this.date_max_msg());
            }
            min_str(field) {
                const val = this.value_str(field);
                const limit = this.min_val(field);
                if (!limit)
                    return '';
                if (val.length >= limit)
                    return '';
                return this.format(field, this.str_min_msg());
            }
            max_str(field) {
                const val = this.value_str(field);
                const limit = this.max_val(field);
                if (!limit)
                    return '';
                if (val.length <= limit)
                    return '';
                return this.format(field, this.str_max_msg());
            }
            min_number(field) {
                const val = this.value_number(field);
                const limit = this.min_val(field);
                if (limit === null || limit === undefined)
                    return '';
                if (val >= limit)
                    return '';
                return this.format(field, this.min_msg());
            }
            max_number(field) {
                const val = this.value_number(field);
                const limit = this.max_val(field);
                if (limit === null || limit === undefined)
                    return '';
                if (val <= limit)
                    return '';
                return this.format(field, this.max_msg());
            }
            min(field) {
                if (this.value_empty(field))
                    return '';
                const val = this.value(field);
                if (val instanceof $mol_time_moment)
                    return this.min_date(field);
                if (typeof val === 'number')
                    return this.min_number(field);
                return this.min_str(field);
            }
            max(field) {
                if (this.value_empty(field))
                    return '';
                const val = this.value(field);
                if (val instanceof $mol_time_moment)
                    return this.max_date(field);
                if (typeof val === 'number')
                    return this.max_number(field);
                return this.max_str(field);
            }
            required(field) {
                const val = this.value(field);
                if (typeof val === 'boolean')
                    return '';
                if (typeof val === 'number' && !Number.isNaN(val))
                    return '';
                if (typeof val === 'string' && val)
                    return '';
                if (Array.isArray(val) && val.length)
                    return '';
                if (!Array.isArray(val) && val && typeof val === 'object' && Object.keys(val).length)
                    return '';
                return this.format(field, this.required_msg());
            }
            min_val(field) {
                return this.params_min()[field] ?? null;
            }
            max_val(field) {
                return this.params_max()[field] ?? null;
            }
            rows_max_val(field) {
                return this.params_max_rows()[field] ?? null;
            }
            pattern_val(field) {
                return this.params_pattern()[field] ?? super.pattern_val(field);
            }
            min_date_val(field) {
                const val = this.params_min_date()[field];
                return typeof val === 'string' ? new $mol_time_moment(val) : val;
            }
            max_date_val(field) {
                const val = this.params_max_date()[field];
                return typeof val === 'string' ? new $mol_time_moment(val) : val;
            }
            pattern(field) {
                if (this.value_empty(field))
                    return '';
                const pattern = this.pattern_val(field);
                const regex = new RegExp(`^(?:${pattern})$`);
                const str = this.value_str(field);
                if (str.match(regex))
                    return '';
                return this.format(field, this.pattern_not_match_msg());
            }
            rows_max(field) {
                if (this.value_empty(field))
                    return '';
                const val = this.value_str(field);
                const rows = val.split('\n').length;
                const max = this.rows_max_val(field);
                if (max === null || rows <= max)
                    return '';
                return this.format(field, this.rows_max_msg());
            }
            json_invalid(field) {
                if (this.value_empty(field))
                    return '';
                const val = this.value_str(field);
                try {
                    if (val)
                        JSON.parse(val);
                    return '';
                }
                catch (e) {
                    return this.json_invalid_msg().replace('{error}', e.message);
                }
            }
            ip4(field, flag) {
                if (this.value_empty(field))
                    return '';
                const val = this.value_str(field);
                const match = val.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d{1,4}))?(?:\/(\d{1,2}))?$/);
                if (match) {
                    const [_, ip_str, port, mask] = match;
                    const parts = ip_str.split('.').map(Number);
                    const msk = Number(mask || 0);
                    if (parts.every(num => num <= 255)
                        && Number(port || 0) < 65535
                        && (flag ? (msk >= (flag === 'mask-allowed' ? 0 : 1) && msk <= 32) : msk === 0))
                        return '';
                }
                return flag === 'mask-required' ? this.ip4_mask_msg() : this.ip4_msg();
            }
            ip4_mask(field) {
                return this.ip4(field, 'mask-allowed');
            }
            ip4_mask_required(field) {
                return this.ip4(field, 'mask-required');
            }
            latin_digits(field) {
                if (this.value_empty(field))
                    return '';
                const val = this.value_str(field);
                if (val.match(/^[\w\d]+$/))
                    return '';
                return this.format(field, this.latin_digits_msg());
            }
            latin_digits_alpha(field) {
                if (this.value_empty(field))
                    return '';
                const val = this.value_str(field);
                if (val.match(/^[\w\d\-\.\;\!]+$/))
                    return '';
                return this.format(field, this.latin_digits_msg());
            }
            value_limits(field) {
                return this.params_limits()[field] ?? super.value_limits(field);
            }
            value_in_range(field) {
                if (this.value_empty(field))
                    return '';
                const val = this.value_number(field);
                const ranges = this.value_limits(field);
                let range;
                for (const [min, max] of ranges) {
                    range = [min, max];
                    if (val >= min && val <= max)
                        return '';
                }
                return super.value_in_range(field).replace('{range}', range?.join(' - ') ?? '-');
            }
        }
        __decorate([
            $mol_mem_key
        ], $yuf_form_bid.prototype, "value_date", null);
        __decorate([
            $mol_mem_key
        ], $yuf_form_bid.prototype, "min", null);
        __decorate([
            $mol_mem_key
        ], $yuf_form_bid.prototype, "max", null);
        __decorate([
            $mol_mem_key
        ], $yuf_form_bid.prototype, "required", null);
        __decorate([
            $mol_mem_key
        ], $yuf_form_bid.prototype, "min_date_val", null);
        __decorate([
            $mol_mem_key
        ], $yuf_form_bid.prototype, "max_date_val", null);
        $$.$yuf_form_bid = $yuf_form_bid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_login_form) = class $yuf_login_form extends ($.$mol_form) {
		value_str(id, next){
			if(next !== undefined) return next;
			return "";
		}
		required(id){
			return (this.Bid().required(id));
		}
		min(id){
			return (this.Bid().min(id));
		}
		max(id){
			return (this.Bid().max(id));
		}
		login_label(){
			return (this.$.$mol_locale.text("$yuf_login_form_login_label"));
		}
		login(next){
			if(next !== undefined) return next;
			return "";
		}
		submit_activate_fork(next){
			return (this.submit_activate(next));
		}
		Login(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.login(next)));
			(obj.submit) = (next) => ((this.submit_activate_fork(next)));
			return obj;
		}
		Login_field(){
			const obj = new this.$.$mol_form_field();
			(obj.bids) = () => ([
				(this.required("login")), 
				(this.min("login")), 
				(this.max("login"))
			]);
			(obj.name) = () => ((this.login_label()));
			(obj.control) = () => ((this.Login()));
			return obj;
		}
		password_label(){
			return (this.$.$mol_locale.text("$yuf_login_form_password_label"));
		}
		password(next){
			if(next !== undefined) return next;
			return "";
		}
		Password(){
			const obj = new this.$.$yuf_password();
			(obj.value) = (next) => ((this.password(next)));
			(obj.submit) = (next) => ((this.submit_activate_fork(next)));
			return obj;
		}
		Password_field(){
			const obj = new this.$.$mol_form_field();
			(obj.bids) = () => ([
				(this.required("password")), 
				(this.min("password")), 
				(this.max("password"))
			]);
			(obj.name) = () => ((this.password_label()));
			(obj.control) = () => ((this.Password()));
			return obj;
		}
		form_fields_end(){
			return [];
		}
		login_error(){
			return (this.$.$mol_locale.text("$yuf_login_form_login_error"));
		}
		unknown_error(){
			return (this.$.$mol_locale.text("$yuf_login_form_unknown_error"));
		}
		enter(next){
			if(next !== undefined) return next;
			return null;
		}
		Bid(){
			const obj = new this.$.$yuf_form_bid();
			(obj.value) = (id) => ((this.value_str(id)));
			return obj;
		}
		form_fields(){
			return [
				(this.Login_field()), 
				(this.Password_field()), 
				...(this.form_fields_end())
			];
		}
		submit_title(){
			return (this.$.$mol_locale.text("$yuf_login_form_submit_title"));
		}
	};
	($mol_mem_key(($.$yuf_login_form.prototype), "value_str"));
	($mol_mem(($.$yuf_login_form.prototype), "login"));
	($mol_mem(($.$yuf_login_form.prototype), "Login"));
	($mol_mem(($.$yuf_login_form.prototype), "Login_field"));
	($mol_mem(($.$yuf_login_form.prototype), "password"));
	($mol_mem(($.$yuf_login_form.prototype), "Password"));
	($mol_mem(($.$yuf_login_form.prototype), "Password_field"));
	($mol_mem(($.$yuf_login_form.prototype), "enter"));
	($mol_mem(($.$yuf_login_form.prototype), "Bid"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_login_form extends $.$yuf_login_form {
            value_str(field) {
                return this[field]();
            }
            login_focus() {
                new $mol_after_timeout(100, () => {
                    this.Login().focused(true);
                });
            }
            auto() {
                this.login_focus();
                return super.auto();
            }
            save(next) {
                try {
                    this.enter({
                        login: this.login(),
                        password: this.password(),
                    });
                }
                catch (e) {
                    if ($mol_promise_like(e))
                        $mol_fail_hidden(e);
                    if (e instanceof Error
                        && e.cause instanceof $mol_fetch_response
                        && (e.cause.code() === 401 || e.cause.code() === 403)) {
                        const msg = this.login_error();
                        if (!e.message.startsWith(msg))
                            e.message = msg + ': ' + e.message;
                    }
                    $mol_fail_hidden(e);
                }
            }
            submit_activate_fork(e) {
                return $mol_wire_async(this).submit_activate(e);
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_login_form.prototype, "login_focus", null);
        $$.$yuf_login_form = $yuf_login_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px, per } = $mol_style_unit;
        $mol_style_define($yuf_login_form, {
            Result: {
                padding: 0,
            },
            Foot: {
                flex: {
                    direction: 'column',
                }
            },
            Submit: {
                flex: {
                    grow: 1,
                },
                justifyContent: 'center',
                gap: $mol_gap.text,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_login_form_demo) = class $yuf_login_form_demo extends ($.$mol_example_small) {
		enter(next){
			if(next !== undefined) return next;
			return null;
		}
		login(){
			return (this.Login_form().login());
		}
		password(){
			return (this.Login_form().password());
		}
		Login_form(){
			const obj = new this.$.$yuf_login_form();
			(obj.enter) = (next) => ((this.enter(next)));
			return obj;
		}
		title(){
			return "Login form example";
		}
		sub(){
			return [(this.Login_form())];
		}
		tags(){
			return ["form", "login"];
		}
		aspects(){
			return ["Widget/Control"];
		}
	};
	($mol_mem(($.$yuf_login_form_demo.prototype), "enter"));
	($mol_mem(($.$yuf_login_form_demo.prototype), "Login_form"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_login_form_demo extends $.$yuf_login_form_demo {
            enter(e) {
                this.$.$mol_wait_timeout(5000);
                console.log('Logged:', this.login(), this.password());
            }
        }
        $$.$yuf_login_form_demo = $yuf_login_form_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_calendar) = class $mol_icon_calendar extends ($.$mol_icon) {
		path(){
			return "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_calendar_today) = class $mol_icon_calendar_today extends ($.$mol_icon) {
		path(){
			return "M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z";
		}
	};


;
"use strict";

;
	($.$mol_format) = class $mol_format extends ($.$mol_string) {
		mask(id){
			return "";
		}
		allow(){
			return "0123456789";
		}
		hint(){
			return (this.mask("0"));
		}
		keyboard(){
			return "numeric";
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_format extends $.$mol_format {
            selection([from, to] = [0, 0]) {
                const prev = $mol_wire_probe(() => this.selection());
                if (!prev)
                    return [0, 100];
                if (from !== to)
                    return [from, to];
                const allow = this.allow();
                const value = this.value_changed();
                const filtered = [...value].filter(letter => allow.includes(letter)).join('');
                const mask = this.mask(filtered);
                if ((prev?.[0] ?? 0) >= from)
                    return [from, to];
                const lastAllow = (value.length - [...value].reverse().findIndex(letter => allow.includes(letter))) % (value.length + 1);
                if (lastAllow < from) {
                    from = to = lastAllow;
                }
                while (mask[from] && mask[from] !== '_') {
                    ++from;
                    ++to;
                }
                return [from, to];
            }
            value_changed(next) {
                const allow = this.allow();
                const normalize = (val) => {
                    val = [...val].filter(letter => allow.includes(letter)).join('');
                    const letters = [...val].reverse();
                    return this.mask(val).replace(/_/gu, () => letters.pop() ?? '_') + letters.reverse().join('');
                };
                if (next !== undefined) {
                    next = normalize(next);
                    if ([...next].filter(letter => allow.includes(letter)).join('')) {
                        if (next.includes('_'))
                            return next;
                    }
                    else {
                        next = '';
                    }
                }
                return normalize(this.value(next));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_format.prototype, "selection", null);
        __decorate([
            $mol_mem
        ], $mol_format.prototype, "value_changed", null);
        $$.$mol_format = $mol_format;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/format/format.view.css", "[mol_format] {\n\tfont-family: monospace;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_trash_can) = class $mol_icon_trash_can extends ($.$mol_icon) {
		path(){
			return "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_trash_can_outline) = class $mol_icon_trash_can_outline extends ($.$mol_icon) {
		path(){
			return "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z";
		}
	};


;
"use strict";

;
	($.$mol_hor) = class $mol_hor extends ($.$mol_view) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_hor extends $.$mol_hor {
            minimal_width() {
                let min = 0;
                for (const view of this.sub()) {
                    if (!(view instanceof $mol_view))
                        continue;
                    min += view.minimal_width();
                }
                return min;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_hor.prototype, "minimal_width", null);
        $$.$mol_hor = $mol_hor;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_hor, {
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flex: {
            grow: 1,
            shrink: 0,
            basis: 'auto',
        },
    });
})($ || ($ = {}));

;
	($.$mol_calendar) = class $mol_calendar extends ($.$mol_list) {
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (24);
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		head(){
			return [(this.Title())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		weekdays(){
			return [];
		}
		Weekdays(){
			const obj = new this.$.$mol_hor();
			(obj.sub) = () => ((this.weekdays()));
			return obj;
		}
		weekend(id){
			return false;
		}
		weekday(id){
			return "";
		}
		week_days(id){
			return [];
		}
		day_ghost(id){
			return false;
		}
		day_holiday(id){
			return false;
		}
		day_selected(id){
			return false;
		}
		day_today(id){
			return false;
		}
		day_theme(id){
			return null;
		}
		day_text(id){
			return "";
		}
		day_content(id){
			return [(this.day_text(id))];
		}
		sub(){
			return [(this.Head()), (this.Weekdays())];
		}
		weeks(){
			return [];
		}
		weeks_count(){
			return 6;
		}
		Weekday(id){
			const obj = new this.$.$mol_calendar_day();
			(obj.holiday) = () => ((this.weekend(id)));
			(obj.sub) = () => ([(this.weekday(id))]);
			return obj;
		}
		Week(id){
			const obj = new this.$.$mol_hor();
			(obj.sub) = () => ((this.week_days(id)));
			return obj;
		}
		Day(id){
			const obj = new this.$.$mol_calendar_day();
			(obj.ghost) = () => ((this.day_ghost(id)));
			(obj.holiday) = () => ((this.day_holiday(id)));
			(obj.selected) = () => ((this.day_selected(id)));
			(obj.today) = () => ((this.day_today(id)));
			(obj.theme) = () => ((this.day_theme(id)));
			(obj.sub) = () => ((this.day_content(id)));
			return obj;
		}
		month_string(){
			return "";
		}
		month_moment(){
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
	};
	($mol_mem(($.$mol_calendar.prototype), "Title"));
	($mol_mem(($.$mol_calendar.prototype), "Head"));
	($mol_mem(($.$mol_calendar.prototype), "Weekdays"));
	($mol_mem_key(($.$mol_calendar.prototype), "Weekday"));
	($mol_mem_key(($.$mol_calendar.prototype), "Week"));
	($mol_mem_key(($.$mol_calendar.prototype), "Day"));
	($mol_mem(($.$mol_calendar.prototype), "month_moment"));
	($.$mol_calendar_day) = class $mol_calendar_day extends ($.$mol_view) {
		holiday(){
			return false;
		}
		ghost(){
			return false;
		}
		selected(){
			return false;
		}
		today(){
			return false;
		}
		theme(){
			return null;
		}
		minimal_height(){
			return 24;
		}
		minimal_width(){
			return 36;
		}
		attr(){
			return {
				"mol_calendar_holiday": (this.holiday()), 
				"mol_calendar_ghost": (this.ghost()), 
				"mol_calendar_selected": (this.selected()), 
				"mol_calendar_today": (this.today()), 
				"mol_theme": (this.theme())
			};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_calendar extends $.$mol_calendar {
            month_moment() {
                const moment = new $mol_time_moment(this.month_string() || undefined);
                return new $mol_time_moment({ year: moment.year, month: moment.month });
            }
            title() {
                return this.month_moment().toString('Month YYYY');
            }
            day_first() {
                return this.month_moment().merge({ day: 0 });
            }
            day_last() {
                return this.day_first().shift('P1M');
            }
            day_draw_from() {
                let weekday = this.day_first().weekday;
                return this.day_first().shift({ day: -weekday });
            }
            weekdays() {
                const next = [];
                for (let index = 0; index < 7; ++index) {
                    next.push(this.Weekday(index));
                }
                return next;
            }
            weekday(index) {
                return this.day_draw_from().shift({ day: index }).toString('WD');
            }
            weekend(index) {
                return [5, 6].indexOf(index) >= 0;
            }
            sub() {
                return [
                    ...super.sub(),
                    ...this.weeks(),
                ];
            }
            weeks() {
                const weeks = [];
                let count = this.weeks_count();
                for (let i = 0; i < count; ++i) {
                    weeks.push(this.Week(i));
                }
                return weeks;
            }
            week_days(index) {
                const days = [];
                let start = this.day_draw_from().shift({ day: index * 7 });
                for (let i = 0; i < 7; ++i) {
                    days.push(this.Day(start.shift({ day: i }).toString('YYYY-MM-DD')));
                }
                return days;
            }
            day_text(day) {
                return new $mol_time_moment(day).toString("D");
            }
            day_holiday(day) {
                return this.weekend(new $mol_time_moment(day).weekday);
            }
            today() {
                return new $mol_time_moment();
            }
            day_today(day) {
                return this.today().toString('YYYY-MM-DD') === day;
            }
            day_ghost(day) {
                return new $mol_time_moment(day).toString('YYYY-MM') !== this.day_first().toString('YYYY-MM');
            }
            day_theme(day) {
                return this.day_selected(day) ? '$mol_theme_current' : super.day_theme(day);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "month_moment", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "day_first", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "day_last", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "day_draw_from", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "weekdays", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "weekday", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "weeks", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "week_days", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "day_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "day_holiday", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "today", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "day_today", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "day_ghost", null);
        $$.$mol_calendar = $mol_calendar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/calendar/calendar.view.css", "[mol_calendar] {\n\tdisplay: table;\n\tfont-family: monospace;\n}\n\n[mol_calendar_head] {\n\tdisplay: table-caption;\n\tbackground: inherit;\n}\n\n[mol_calendar_title] {\n\tjustify-content: center;\n}\n\n[mol_calendar_weekdays] ,\n[mol_calendar_week] {\n\tdisplay: table-row;\n\tpadding: 0;\n}\n\n[mol_calendar_day] {\n\tdisplay: table-cell;\n\tpadding: .25rem .5rem;\n\ttext-align: center;\n\tword-break: normal;\n\tbox-shadow: none;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_calendar_weekday] {\n\tcolor: var(--mol_theme_shade);\n\tborder-bottom: 1px solid var(--mol_theme_line);\n}\n\n[mol_calendar_holiday] {\n\tcolor: var(--mol_theme_special);\n}\n\n[mol_calendar_today] {\n\tfont-weight: bolder;\n}\n\n[mol_calendar_ghost] {\n\topacity: .2;\n}\n");
})($ || ($ = {}));

;
	($.$mol_date) = class $mol_date extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		today_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Today_icon(){
			const obj = new this.$.$mol_icon_calendar_today();
			return obj;
		}
		Today(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_date_Today_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.today_click(next)));
			(obj.sub) = () => ([(this.Today_icon())]);
			return obj;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.Input().value_changed(next));
		}
		input_mask(id){
			return "";
		}
		Input(){
			const obj = new this.$.$mol_format();
			(obj.value) = (next) => ((this.value(next)));
			(obj.mask) = (id) => ((this.input_mask(id)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_trash_can_outline();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_date_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		input_content(){
			return [
				(this.Today()), 
				(this.Input()), 
				(this.Clear())
			];
		}
		Input_row(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.input_content()));
			return obj;
		}
		month_moment(){
			return (this.value_moment());
		}
		day_selected(id){
			return false;
		}
		day_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Calendar_title(){
			return (this.Calendar().Title());
		}
		prev_hint(){
			return (this.$.$mol_locale.text("$mol_date_prev_hint"));
		}
		prev(next){
			if(next !== undefined) return next;
			return null;
		}
		Prev_icon(){
			const obj = new this.$.$mol_icon_chevron_left();
			return obj;
		}
		Prev(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.prev_hint()));
			(obj.click) = (next) => ((this.prev(next)));
			(obj.sub) = () => ([(this.Prev_icon())]);
			return obj;
		}
		next_hint(){
			return (this.$.$mol_locale.text("$mol_date_next_hint"));
		}
		next(next){
			if(next !== undefined) return next;
			return null;
		}
		Next_icon(){
			const obj = new this.$.$mol_icon_chevron_right();
			return obj;
		}
		Next(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.next_hint()));
			(obj.click) = (next) => ((this.next(next)));
			(obj.sub) = () => ([(this.Next_icon())]);
			return obj;
		}
		Calendar_tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Prev()), 
				(this.Calendar_title()), 
				(this.Next())
			]);
			return obj;
		}
		Calendar(){
			const obj = new this.$.$mol_date_calendar();
			(obj.enabled) = () => ((this.enabled()));
			(obj.month_moment) = () => ((this.month_moment()));
			(obj.day_selected) = (id) => ((this.day_selected(id)));
			(obj.day_click) = (id, next) => ((this.day_click(id, next)));
			(obj.head) = () => ([(this.Calendar_tools())]);
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_calendar();
			return obj;
		}
		bubble_content(){
			return [(this.Input_row()), (this.Calendar())];
		}
		value_number(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		value_moment(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
	};
	($mol_mem(($.$mol_date.prototype), "today_click"));
	($mol_mem(($.$mol_date.prototype), "Today_icon"));
	($mol_mem(($.$mol_date.prototype), "Today"));
	($mol_mem(($.$mol_date.prototype), "value"));
	($mol_mem(($.$mol_date.prototype), "Input"));
	($mol_mem(($.$mol_date.prototype), "clear"));
	($mol_mem(($.$mol_date.prototype), "Clear_icon"));
	($mol_mem(($.$mol_date.prototype), "Clear"));
	($mol_mem(($.$mol_date.prototype), "Input_row"));
	($mol_mem_key(($.$mol_date.prototype), "day_click"));
	($mol_mem(($.$mol_date.prototype), "prev"));
	($mol_mem(($.$mol_date.prototype), "Prev_icon"));
	($mol_mem(($.$mol_date.prototype), "Prev"));
	($mol_mem(($.$mol_date.prototype), "next"));
	($mol_mem(($.$mol_date.prototype), "Next_icon"));
	($mol_mem(($.$mol_date.prototype), "Next"));
	($mol_mem(($.$mol_date.prototype), "Calendar_tools"));
	($mol_mem(($.$mol_date.prototype), "Calendar"));
	($mol_mem(($.$mol_date.prototype), "Icon"));
	($mol_mem(($.$mol_date.prototype), "value_number"));
	($mol_mem(($.$mol_date.prototype), "value_moment"));
	($.$mol_date_calendar) = class $mol_date_calendar extends ($.$mol_calendar) {
		day_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		Day_button(id){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.day_text(id)));
			(obj.event_click) = (next) => ((this.day_click(id, next)));
			(obj.minimal_height) = () => (24);
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		day_content(id){
			return [(this.Day_button(id))];
		}
	};
	($mol_mem_key(($.$mol_date_calendar.prototype), "day_click"));
	($mol_mem_key(($.$mol_date_calendar.prototype), "Day_button"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_date extends $.$mol_date {
            trigger_content() {
                return [this.value() || this.Icon()];
            }
            input_mask(val) {
                return val.length > 8 ? '____-__-__ __:__' : '____-__-__ ';
            }
            input_content() {
                return [
                    this.Today(),
                    this.Input(),
                    ...this.value() ? [this.Clear()] : [],
                ];
            }
            value(val) {
                const moment = this.value_moment();
                if (val === undefined)
                    return moment?.toString('YYYY-MM-DD hh:mm') ?? '';
                const moment2 = val && $mol_try(() => new $mol_time_moment(val)) || null;
                if (moment2 instanceof Error)
                    return val;
                this.value_moment(moment2);
                return val;
            }
            value_moment(next) {
                const stamp = this.value_number();
                if (next === undefined) {
                    return isNaN(stamp) ? null : new $mol_time_moment(stamp);
                }
                this.value_number(next?.valueOf() ?? NaN);
                return next;
            }
            value_number(next) {
                const value = this.value();
                if (next === undefined) {
                    if (!value)
                        return NaN;
                    const moment = $mol_try(() => new $mol_time_moment(value));
                    if (moment instanceof Error)
                        return NaN;
                    return moment.valueOf() ?? NaN;
                }
                const moment = $mol_try(() => new $mol_time_moment(next));
                this.value(moment.toString(value.length > 12 ? 'YYYY-MM-DD hh:mm' : 'YYYY-MM-DD'));
                return next;
            }
            value_moment_today() {
                return this.value()
                    ? new $mol_time_moment().mask(this.value())
                    : new $mol_time_moment();
            }
            clear() {
                this.value('');
                this.Input().focused(true);
                this.Input().selection([0, 0]);
            }
            month_moment(next) {
                if (next)
                    return next;
                let moment = $mol_try(() => new $mol_time_moment(this.value_changed().replace(/\D+$/, '')).mask('0000-00'));
                if (moment instanceof Error || !moment.year)
                    return new $mol_time_moment().mask('0000-00');
                if (moment.month === undefined) {
                    moment = moment.merge({ month: 0 });
                }
                return moment;
            }
            day_selected(day) {
                return this.value_moment()?.toString('YYYY-MM-DD') === day;
            }
            day_click(day) {
                const moment = new $mol_time_moment(day);
                this.value_moment(this.value_moment()?.merge(moment) ?? moment);
                this.showed(false);
            }
            prev() {
                this.month_moment(this.month_moment().shift({ month: -1 }));
            }
            next() {
                this.month_moment(this.month_moment().shift({ month: +1 }));
            }
            today_click() {
                this.value_moment(this.value_moment_today());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "value", null);
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "value_moment", null);
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "value_number", null);
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "value_moment_today", null);
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "month_moment", null);
        $$.$mol_date = $mol_date;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/date/date.view.css", "/* [mol_date_bubble] {\n\tpadding: .5rem;\n} */\n\n[mol_date_input] {\n\tflex-shrink: 0;\n}\n\n[mol_date_prev] ,\n[mol_date_next] {\n\tflex-grow: 1;\n}\n[mol_date_prev] {\n\tjustify-content: flex-end;\n}\n\n[mol_date_calendar_title] {\n\tpadding: var(--mol_gap_text);\n}\n\n[mol_date_calendar_day] {\n\tpadding: 0;\n}\n\n[mol_date_calendar_day_button] {\n\twidth: 100%;\n\t/* padding: .25rem .5rem; */\n\tjustify-content: center;\n\tcursor: pointer;\n\tcolor: inherit;\n}\n");
})($ || ($ = {}));

;
	($.$yuf_date_range) = class $yuf_date_range extends ($.$mol_view) {
		from_align(){
			return "bottom_right";
		}
		from(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
		From(){
			const obj = new this.$.$yuf_date_range_date();
			(obj.align) = () => ((this.from_align()));
			(obj.value_moment) = (next) => ((this.from(next)));
			return obj;
		}
		separator(){
			return "-";
		}
		Separator(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.separator())]);
			return obj;
		}
		to_align(){
			return "bottom_left";
		}
		to(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
		To(){
			const obj = new this.$.$yuf_date_range_date();
			(obj.align) = () => ((this.to_align()));
			(obj.value_moment) = (next) => ((this.to(next)));
			return obj;
		}
		sub(){
			return [
				(this.From()), 
				(this.Separator()), 
				(this.To())
			];
		}
	};
	($mol_mem(($.$yuf_date_range.prototype), "from"));
	($mol_mem(($.$yuf_date_range.prototype), "From"));
	($mol_mem(($.$yuf_date_range.prototype), "Separator"));
	($mol_mem(($.$yuf_date_range.prototype), "to"));
	($mol_mem(($.$yuf_date_range.prototype), "To"));
	($.$yuf_date_range_date) = class $yuf_date_range_date extends ($.$mol_date) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_date_range, {
            From: {
                Bubble: {
                    margin: {
                        left: '-.25rem'
                    }
                },
            },
            To: {
                Bubble: {
                    margin: {
                        right: '-.25rem'
                    }
                },
            },
            Separator: {
                height: '2.5rem',
                alignItems: 'center',
            },
        });
        $mol_style_define($yuf_date_range_date, {
            Bubble: {
                maxWidth: '19rem',
            },
            Trigger: {
                padding: $mol_gap.block,
                '@': {
                    mol_check_checked: {
                        true: {
                            color: $mol_theme.current
                        }
                    }
                }
            },
            Input: {
                flex: {
                    basis: '5rem'
                }
            },
            Calendar: {
                Day: {
                    padding: 0
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_date_range_demo) = class $yuf_date_range_demo extends ($.$mol_example_small) {
		Current(){
			const obj = new this.$.$yuf_date_range();
			return obj;
		}
		title(){
			return "Date range";
		}
		sub(){
			return [(this.Current())];
		}
		tags(){
			return [
				"time", 
				"datepicker", 
				"format", 
				"range"
			];
		}
		aspects(){
			return ["Widget/Control/Button/Picker", "Type/Date"];
		}
	};
	($mol_mem(($.$yuf_date_range_demo.prototype), "Current"));


;
"use strict";

;
	($.$yuf_bug_log_prepend) = class $yuf_bug_log_prepend extends ($.$mol_example_small) {
		log_row(id){
			return "";
		}
		Log(id){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (40);
			(obj.sub) = () => ([(this.log_row(id))]);
			return obj;
		}
		rows(){
			return [(this.Log("0"))];
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		title(){
			return "Test app";
		}
		sub(){
			return [(this.List())];
		}
		tags(){
			return [
				"app", 
				"list", 
				"demo", 
				"bug", 
				"geizenbug", 
				"log", 
				"prepend"
			];
		}
		aspects(){
			return ["Bug"];
		}
	};
	($mol_mem_key(($.$yuf_bug_log_prepend.prototype), "Log"));
	($mol_mem(($.$yuf_bug_log_prepend.prototype), "List"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_bug_log_prepend extends $.$yuf_bug_log_prepend {
            logs(next) {
                const prev = $mol_wire_probe(() => this.logs()) ?? this.make_rows(50);
                return [...prev, ...next ?? []];
            }
            make_rows(count = 1) {
                const result = [];
                let str_len = Number(this.$.$mol_state_arg.value('str_len') || 0) || 1000;
                if (Number.isNaN(str_len))
                    str_len = 500;
                for (let i = 0; i < count; i++) {
                    result.push(new Date().toISOString() + ': ' + $mol_stub_message(str_len) + i);
                }
                return result;
            }
            log_add() {
                this.logs(this.make_rows(1));
                let ms = Number(this.$.$mol_state_arg.value('log_delay') || 0) || 1000;
                if (Number.isNaN(ms))
                    ms = 1000;
                this.$.$mol_state_time.now(ms);
                return null;
            }
            indices() {
                return this.logs().map((_, index) => index).reverse();
            }
            rows() {
                return this.indices().map((index) => this.Log(index));
            }
            log_row(index) {
                return this.logs()[index];
            }
            auto() {
                this.log_add();
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_bug_log_prepend.prototype, "logs", null);
        __decorate([
            $mol_mem
        ], $yuf_bug_log_prepend.prototype, "log_add", null);
        __decorate([
            $mol_mem
        ], $yuf_bug_log_prepend.prototype, "indices", null);
        __decorate([
            $mol_mem
        ], $yuf_bug_log_prepend.prototype, "rows", null);
        $$.$yuf_bug_log_prepend = $yuf_bug_log_prepend;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_bug_log_prepend, {
            Log: {
                padding: $mol_gap.block,
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_bug_catalog_flash) = class $yuf_bug_catalog_flash extends ($.$mol_example_small) {
		Main(){
			const obj = new this.$.$yuf_bug_catalog_flash_catalog();
			return obj;
		}
		title(){
			return "Test app";
		}
		sub(){
			return [(this.Main())];
		}
		tags(){
			return [
				"app", 
				"list", 
				"demo", 
				"bug", 
				"geizenbug", 
				"catalog", 
				"refresh"
			];
		}
		aspects(){
			return ["Bug"];
		}
	};
	($mol_mem(($.$yuf_bug_catalog_flash.prototype), "Main"));
	($.$yuf_bug_catalog_flash_catalog) = class $yuf_bug_catalog_flash_catalog extends ($.$mol_book2_catalog) {
		last_event(next){
			if(next !== undefined) return next;
			return null;
		}
		Shuffle(){
			const obj = new this.$.$mol_button_major();
			(obj.sub) = () => (["Shuffle"]);
			(obj.click) = (next) => ((this.last_event(next)));
			return obj;
		}
		last_event2(next){
			if(next !== undefined) return next;
			return null;
		}
		Shuffle2(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => (["Shfl+reset scroll"]);
			(obj.click) = (next) => ((this.last_event2(next)));
			return obj;
		}
		title(){
			return "Main";
		}
		addon_tools(){
			return [(this.Shuffle()), (this.Shuffle2())];
		}
		Menu_links(){
			const obj = new this.$.$mol_list();
			(obj.item_height_min) = (id) => (232);
			(obj.Empty) = () => ((this.Menu_links_empty()));
			(obj.rows) = () => ((this.menu_links()));
			return obj;
		}
	};
	($mol_mem(($.$yuf_bug_catalog_flash_catalog.prototype), "last_event"));
	($mol_mem(($.$yuf_bug_catalog_flash_catalog.prototype), "Shuffle"));
	($mol_mem(($.$yuf_bug_catalog_flash_catalog.prototype), "last_event2"));
	($mol_mem(($.$yuf_bug_catalog_flash_catalog.prototype), "Shuffle2"));
	($mol_mem(($.$yuf_bug_catalog_flash_catalog.prototype), "Menu_links"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_bug_catalog_flash_catalog extends $.$yuf_bug_catalog_flash_catalog {
            ids() {
                const ids = [];
                let val = Number(this.$.$mol_state_arg.value('ids_max') || 50);
                if (Number.isNaN(val) || !val)
                    val = 50;
                for (let i = 0; i <= val; i++) {
                    ids.push($mol_guid());
                }
                return ids;
            }
            ids_get() {
                const result = [];
                const ids = this.ids();
                const min = Math.floor(ids.length / 2);
                const max = min + Math.floor((ids.length - min) * Math.random());
                const indices = new Set();
                for (let i = 0; i < max; i++) {
                    let index;
                    do {
                        index = Math.floor(Math.random() * ids.length);
                    } while (indices.has(index));
                    indices.add(index);
                    result.push(ids[index]);
                }
                return result;
            }
            last_event2(e) {
                if (!e)
                    return null;
                new $mol_after_frame(this.body_scroll_top);
                return this.last_event(e);
            }
            body_scroll_top = $mol_wire_async(() => this.Menu().body_scroll_top(0));
            spread_ids() {
                this.last_event();
                return this.ids_get();
            }
            spread_title(id) {
                return $mol_stub_message(300);
            }
        }
        __decorate([
            $mol_memo.method
        ], $yuf_bug_catalog_flash_catalog.prototype, "ids", null);
        __decorate([
            $mol_action
        ], $yuf_bug_catalog_flash_catalog.prototype, "ids_get", null);
        __decorate([
            $mol_mem
        ], $yuf_bug_catalog_flash_catalog.prototype, "last_event2", null);
        __decorate([
            $mol_mem
        ], $yuf_bug_catalog_flash_catalog.prototype, "spread_ids", null);
        __decorate([
            $mol_memo.method
        ], $yuf_bug_catalog_flash_catalog.prototype, "spread_title", null);
        $$.$yuf_bug_catalog_flash_catalog = $yuf_bug_catalog_flash_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_bug_catalog_flash, {});
        $mol_style_define($yuf_bug_catalog_flash_catalog, {
            Menu: {
                flex: {
                    basis: '30rem'
                }
            },
            Menu_item: {
                padding: $mol_gap.block,
            },
            Menu_link: {
                minHeight: '232px',
                background: {
                    color: $mol_theme.card
                }
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_lights_toggle) = class $yuf_lights_toggle extends ($.$mol_check) {
		Icon(){
			const obj = new this.$.$mol_icon_brightness_4();
			return obj;
		}
		hint(){
			return (this.$.$mol_locale.text("$yuf_lights_toggle_hint"));
		}
	};
	($mol_mem(($.$yuf_lights_toggle.prototype), "Icon"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_lights_toggle extends $.$yuf_lights_toggle {
            checked(next) {
                return this.$.$mol_lights(next);
            }
        }
        $$.$yuf_lights_toggle = $yuf_lights_toggle;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_content_duplicate) = class $mol_icon_content_duplicate extends ($.$mol_icon) {
		path(){
			return "M11,17H4A2,2 0 0,1 2,15V3A2,2 0 0,1 4,1H16V3H4V15H11V13L15,16L11,19V17M19,21V7H8V13H6V7A2,2 0 0,1 8,5H19A2,2 0 0,1 21,7V21A2,2 0 0,1 19,23H8A2,2 0 0,1 6,21V19H8V21H19Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_content_save) = class $mol_icon_content_save extends ($.$mol_icon) {
		path(){
			return "M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_content_save_all) = class $mol_icon_content_save_all extends ($.$mol_icon) {
		path(){
			return "M17,7V3H7V7H17M14,17A3,3 0 0,0 17,14A3,3 0 0,0 14,11A3,3 0 0,0 11,14A3,3 0 0,0 14,17M19,1L23,5V17A2,2 0 0,1 21,19H7C5.89,19 5,18.1 5,17V3A2,2 0 0,1 7,1H19M1,7H3V21H17V23H3A2,2 0 0,1 1,21V7Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_download) = class $mol_icon_download extends ($.$mol_icon) {
		path(){
			return "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z";
		}
	};


;
"use strict";

;
	($.$mol_button_download) = class $mol_button_download extends ($.$mol_button_minor) {
		Icon(){
			const obj = new this.$.$mol_icon_download();
			return obj;
		}
		title(){
			return "";
		}
		blob(){
			return null;
		}
		uri(){
			return "";
		}
		file_name(){
			return "blob.bin";
		}
		sub(){
			return [(this.Icon()), (this.title())];
		}
	};
	($mol_mem(($.$mol_button_download.prototype), "Icon"));


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button_download extends $.$mol_button_download {
            uri() {
                return URL.createObjectURL(this.blob());
            }
            click() {
                const a = $mol_jsx("a", { href: this.uri(), download: this.file_name() });
                a.click();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_download.prototype, "uri", null);
        $$.$mol_button_download = $mol_button_download;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";

;
	($.$yuf_button_close) = class $yuf_button_close extends ($.$mol_button_minor) {
		Icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		hint(){
			return (this.$.$mol_locale.text("$yuf_button_close_hint"));
		}
		sub(){
			return [(this.Icon())];
		}
	};
	($mol_mem(($.$yuf_button_close.prototype), "Icon"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$yuf_theme = $mol_style_prop('yuf_theme', [
        'accent',
        'back_soft',
        'control_hover',
        'accept',
        'decline',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("yuf/theme/theme.css", "[mol_button_typed]:active {\n    color: inherit;\n}\n\n:root {\n\t--mol_theme_hue: 240deg;\n\t--mol_theme_hue_spread: 90deg;\n\tcolor-scheme: dark light;\n}\n\n:where([mol_theme]) {\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n\tbackground-color: var(--mol_theme_back);\n}\n\t\n:root, [mol_theme=\"$yuf_theme_dark\"], :where([mol_theme=\"$yuf_theme_dark\"]) [mol_theme]  {\n\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n\t--mol_theme_spirit: hsl( 0deg, 0%, 0%, .75 );\n\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 10% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 20%, .25 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 8%, .25 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 80% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 60%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 65% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 60%, 65% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 60%, 65% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 60%, 65% );\n\n\t--yuf_theme_back_soft: #f5f5f5;\n\t--yuf_theme_accept: #176323;\n\t--yuf_theme_decline: #631723;\n} @supports( color: oklch( 0% 0 0deg ) ) {\n:root, [mol_theme=\"$yuf_theme_dark\"], :where([mol_theme=\"$yuf_theme_dark\"]) [mol_theme]  {\n\t\n\t--mol_theme_back: oklch( 20% .03 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 30% .05 var(--mol_theme_hue) / .25 );\n\t--mol_theme_field: oklch( 15% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_hover: oklch( 70% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 80% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 60% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 80% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 70% .1 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 70% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 70% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n\t--yuf_theme_back_soft: #f5f5f5;\n\t--yuf_theme_accept: #176323;\n\t--yuf_theme_decline: #631723;\n} }\n\n[mol_theme=\"$yuf_theme_light\"], :where([mol_theme=\"$yuf_theme_light\"]) [mol_theme] {\n\t\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n\t--mol_theme_spirit: hsl( 0deg, 0%, 100%, .75 );\n\t\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 20%, 92% );\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 50%, 100%, .5 );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, 100%, .75 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0%, 0% );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 40%, 1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .25 );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, 40% );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 80%, 30% );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ), 80%, 30% );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ), 80%, 30% );\n\n\t--yuf_theme_back_soft: #f5f5f5;\n\t--yuf_theme_accept: #176323;\n\t--yuf_theme_decline: #631723;\n} @supports( color: oklch( 0% 0 0deg ) ) {\n[mol_theme=\"$yuf_theme_light\"], :where([mol_theme=\"$yuf_theme_light\"]) [mol_theme] {\n\t--mol_theme_back: oklch( 92% .01 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 99% .01 var(--mol_theme_hue) / .5 );\n\t--mol_theme_field: oklch( 100% 0 var(--mol_theme_hue) / .5 );\n\t--mol_theme_hover: oklch( 50% 0 var(--mol_theme_hue) / .1 );\n\t\n\t--mol_theme_text: oklch( 20% 0 var(--mol_theme_hue) );\n\t--mol_theme_shade: oklch( 60% 0 var(--mol_theme_hue) );\n\t--mol_theme_line: oklch( 50% 0 var(--mol_theme_hue) / .25 );\n\t--mol_theme_focus: oklch( 60% .2 calc( var(--mol_theme_hue) + 180deg ) );\n\t\n\t--mol_theme_control: oklch( 40% .15 var(--mol_theme_hue) );\n\t--mol_theme_current: oklch( 50% .2 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_special: oklch( 50% .2 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\n\t--yuf_theme_back_soft: #f5f5f5;\n\t--yuf_theme_accept: #176323;\n\t--yuf_theme_decline: #631723;\n} }\n\n:where( :root, [mol_theme=\"$yuf_theme_dark\"] ) [mol_theme=\"$yuf_theme_base\"] {\n\t--mol_theme_back: oklch( 25% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 35% .1 var(--mol_theme_hue) / .25 );\n}\n:where( [mol_theme=\"$yuf_theme_light\"] ) [mol_theme=\"$yuf_theme_base\"] {\n\t--mol_theme_back: oklch( 85% .075 var(--mol_theme_hue) );\n\t--mol_theme_card: oklch( 98% .03 var(--mol_theme_hue) / .25 );\n}\n\n:where( :root, [mol_theme=\"$yuf_theme_dark\"] ) [mol_theme=\"$yuf_theme_current\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$yuf_theme_light\"] ) [mol_theme=\"$yuf_theme_current\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) - var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$yuf_theme_dark\"] ) [mol_theme=\"$yuf_theme_special\"] {\n\t--mol_theme_back: oklch( 25% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 35% .1 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n:where( [mol_theme=\"$yuf_theme_light\"] ) [mol_theme=\"$yuf_theme_special\"] {\n\t--mol_theme_back: oklch( 85% .05 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + var(--mol_theme_hue_spread) ) / .25 );\n}\n\n:where( :root, [mol_theme=\"$yuf_theme_dark\"] ) [mol_theme=\"$yuf_theme_accent\"] {\n\t--mol_theme_back: oklch( 35% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 45% .15 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n:where( [mol_theme=\"$yuf_theme_light\"] ) [mol_theme=\"$yuf_theme_accent\"] {\n\t--mol_theme_back: oklch( 83% .1 calc( var(--mol_theme_hue) + 180deg ) );\n\t--mol_theme_card: oklch( 98% .03 calc( var(--mol_theme_hue) + 180deg ) / .25 );\n}\n\n");
})($ || ($ = {}));

;
	($.$yuf_theme_plugin) = class $yuf_theme_plugin extends ($.$mol_theme_auto) {
		light(){
			return "$yuf_theme_light";
		}
		dark(){
			return "$yuf_theme_dark";
		}
	};


;
"use strict";

;
	($.$mol_textarea) = class $mol_textarea extends ($.$mol_stack) {
		clickable(next){
			if(next !== undefined) return next;
			return false;
		}
		sidebar_showed(){
			return false;
		}
		press(next){
			if(next !== undefined) return next;
			return null;
		}
		hover(next){
			if(next !== undefined) return next;
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		enabled(){
			return true;
		}
		spellcheck(){
			return true;
		}
		length_max(){
			return +Infinity;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		bring(){
			return (this.Edit().bring());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return true;
		}
		Edit(){
			const obj = new this.$.$mol_textarea_edit();
			(obj.value) = (next) => ((this.value(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.enabled()));
			(obj.spellcheck) = () => ((this.spellcheck()));
			(obj.length_max) = () => ((this.length_max()));
			(obj.selection) = (next) => ((this.selection(next)));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.submit_with_ctrl) = () => ((this.submit_with_ctrl()));
			return obj;
		}
		row_numb(id){
			return 0;
		}
		highlight(){
			return "";
		}
		syntax(){
			const obj = new this.$.$mol_syntax2();
			return obj;
		}
		View(){
			const obj = new this.$.$mol_text_code();
			(obj.text) = () => ((this.value()));
			(obj.render_visible_only) = () => (false);
			(obj.row_numb) = (id) => ((this.row_numb(id)));
			(obj.sidebar_showed) = () => ((this.sidebar_showed()));
			(obj.highlight) = () => ((this.highlight()));
			(obj.syntax) = () => ((this.syntax()));
			return obj;
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_textarea_clickable": (this.clickable()), 
				"mol_textarea_sidebar_showed": (this.sidebar_showed())
			};
		}
		event(){
			return {"keydown": (next) => (this.press(next)), "pointermove": (next) => (this.hover(next))};
		}
		sub(){
			return [(this.Edit()), (this.View())];
		}
		symbols_alt(){
			return {
				"comma": "<", 
				"period": ">", 
				"dash": "−", 
				"equals": "≈", 
				"graveAccent": "́", 
				"forwardSlash": "÷", 
				"E": "€", 
				"V": "✔", 
				"X": "×", 
				"C": "©", 
				"P": "§", 
				"H": "₽", 
				"key0": "°", 
				"key8": "•", 
				"key2": "@", 
				"key3": "#", 
				"key4": "$", 
				"key6": "^", 
				"key7": "&", 
				"bracketOpen": "[", 
				"bracketClose": "]", 
				"slashBack": "|"
			};
		}
		symbols_alt_ctrl(){
			return {"space": " "};
		}
		symbols_alt_shift(){
			return {
				"V": "✅", 
				"X": "❌", 
				"O": "⭕", 
				"key1": "❗", 
				"key4": "💲", 
				"key7": "❓", 
				"comma": "«", 
				"period": "»", 
				"semicolon": "“", 
				"quoteSingle": "”", 
				"dash": "—", 
				"equals": "≠", 
				"graveAccent": "̱", 
				"bracketOpen": "{", 
				"bracketClose": "}"
			};
		}
	};
	($mol_mem(($.$mol_textarea.prototype), "clickable"));
	($mol_mem(($.$mol_textarea.prototype), "press"));
	($mol_mem(($.$mol_textarea.prototype), "hover"));
	($mol_mem(($.$mol_textarea.prototype), "value"));
	($mol_mem(($.$mol_textarea.prototype), "selection"));
	($mol_mem(($.$mol_textarea.prototype), "submit"));
	($mol_mem(($.$mol_textarea.prototype), "Edit"));
	($mol_mem(($.$mol_textarea.prototype), "syntax"));
	($mol_mem(($.$mol_textarea.prototype), "View"));
	($.$mol_textarea_edit) = class $mol_textarea_edit extends ($.$mol_string) {
		dom_name(){
			return "textarea";
		}
		enter(){
			return "enter";
		}
		field(){
			return {...(super.field()), "scrollTop": 0};
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_textarea extends $.$mol_textarea {
            indent_inc() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    let end = start + rows[i].length;
                    if (end >= from && start <= to) {
                        if (to === from || start !== to) {
                            rows[i] = '\t' + rows[i];
                            to += 1;
                            end += 1;
                        }
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from + 1, to]);
            }
            indent_dec() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    const end = start + rows[i].length;
                    if (end >= from && start <= to && rows[i].startsWith('\t')) {
                        rows[i] = rows[i].slice(1);
                        to -= 1;
                        if (start < from)
                            from -= 1;
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from, to]);
            }
            symbol_insert(event) {
                const symbol = event.shiftKey
                    ? this.symbols_alt_shift()[$mol_keyboard_code[event.keyCode]]
                    : event.ctrlKey
                        ? this.symbols_alt_ctrl()[$mol_keyboard_code[event.keyCode]]
                        : this.symbols_alt()[$mol_keyboard_code[event.keyCode]];
                if (!symbol)
                    return;
                event.preventDefault();
                document.execCommand('insertText', false, symbol);
            }
            clickable(next) {
                if (!this.enabled())
                    return true;
                return next ?? false;
            }
            hover(event) {
                this.clickable(event.ctrlKey);
            }
            press(event) {
                if (event.altKey) {
                    this.symbol_insert(event);
                }
                else {
                    switch (event.keyCode) {
                        case !event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_inc();
                            break;
                        case event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_dec();
                            break;
                        default: return;
                    }
                    event.preventDefault();
                }
            }
            row_numb(index) {
                return index;
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_textarea.prototype, "clickable", null);
        $$.$mol_textarea = $mol_textarea;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/textarea/textarea.view.css", "[mol_textarea] {\n\tflex: 1 0 auto;\n\tflex-direction: column;\n\tvertical-align: top;\n\tmin-height: max-content;\n\twhite-space: pre-wrap;\n\tword-break: break-word;\n\tborder-radius: var(--mol_gap_round);\n\tfont-family: monospace;\n\tposition: relative;\n\ttab-size: 4;\n}\n\n[mol_textarea_view] {\n\tpointer-events: none;\n\twhite-space: inherit;\n\tfont-family: inherit;\n\ttab-size: inherit;\n\tuser-select: none;\n}\n\n[mol_textarea_view_copy] {\n\tpointer-events: all;\n}\n\n[mol_textarea_clickable] > [mol_textarea_view] {\n\tpointer-events: all;\n\tuser-select: auto;\n}\n\n[mol_textarea_clickable] > [mol_textarea_edit] {\n\tuser-select: none;\n}\n\n[mol_textarea_edit] {\n\tfont-family: inherit;\n\tpadding: var(--mol_gap_text);\n\tcolor: transparent !important;\n\tcaret-color: var(--mol_theme_text);\n\tresize: none;\n\ttext-align: inherit;\n\twhite-space: inherit;\n\tborder-radius: inherit;\n\toverflow-anchor: none;\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\ttab-size: inherit;\n}\n\n[mol_textarea_sidebar_showed] [mol_textarea_edit] {\n\tleft: 1.75rem;\n\twidth: calc( 100% - 1.75rem );\n}\n\n[mol_textarea_edit]:hover + [mol_textarea_view] {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_textarea_edit]:focus + [mol_textarea_view] {\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$yuf_textarea) = class $yuf_textarea extends ($.$mol_textarea) {};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_textarea, {
            flex: {
                basis: '20rem',
                shrink: 1,
                grow: 1,
            },
            minHeight: '5rem',
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_localizer_settings_form) = class $yuf_localizer_settings_form extends ($.$mol_form) {
		app_url_name(){
			return (this.$.$mol_locale.text("$yuf_localizer_settings_form_app_url_name"));
		}
		app_url_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_settings_form_app_url_hint"));
		}
		projects_urls_str(next){
			if(next !== undefined) return next;
			return "";
		}
		App_url(){
			const obj = new this.$.$yuf_textarea();
			(obj.hint) = () => ((this.app_url_hint()));
			(obj.value) = (next) => ((this.projects_urls_str(next)));
			return obj;
		}
		App_url_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.app_url_name()));
			(obj.control) = () => ((this.App_url()));
			return obj;
		}
		langs_name(){
			return (this.$.$mol_locale.text("$yuf_localizer_settings_form_langs_name"));
		}
		langs_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_settings_form_langs_hint"));
		}
		langs_available_str(next){
			if(next !== undefined) return next;
			return "";
		}
		Langs(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.langs_hint()));
			(obj.value) = (next) => ((this.langs_available_str(next)));
			return obj;
		}
		Langs_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.langs_name()));
			(obj.control) = () => ((this.Langs()));
			return obj;
		}
		locales_data_name(){
			return (this.$.$mol_locale.text("$yuf_localizer_settings_form_locales_data_name"));
		}
		locales_data_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_settings_form_locales_data_hint"));
		}
		locales_str(next){
			if(next !== undefined) return next;
			return "";
		}
		Locales_data(){
			const obj = new this.$.$yuf_textarea();
			(obj.hint) = () => ((this.locales_data_hint()));
			(obj.value) = (next) => ((this.locales_str(next)));
			return obj;
		}
		Locales_data_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.locales_data_name()));
			(obj.control) = () => ((this.Locales_data()));
			return obj;
		}
		buttons(){
			return [];
		}
		locales(next){
			if(next !== undefined) return next;
			return {};
		}
		body(){
			return [
				(this.App_url_field()), 
				(this.Langs_field()), 
				(this.Locales_data_field())
			];
		}
	};
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "projects_urls_str"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "App_url"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "App_url_field"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "langs_available_str"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "Langs"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "Langs_field"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "locales_str"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "Locales_data"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "Locales_data_field"));
	($mol_mem(($.$yuf_localizer_settings_form.prototype), "locales"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function split(str) {
            return str.split(/[\n\t,]/).map(str => str.trim()).filter(Boolean);
        }
        class $yuf_localizer_settings_form extends $.$yuf_localizer_settings_form {
            locales_str(next) {
                return JSON.stringify(this.locales(next === undefined ? next : JSON.parse(next)) || '{}', null, '\t');
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_localizer_settings_form.prototype, "locales_str", null);
        $$.$yuf_localizer_settings_form = $yuf_localizer_settings_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_localizer_settings_form, {
            Locales_data: {
                flex: {
                    shrink: 1,
                }
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_localizer_settings_page) = class $yuf_localizer_settings_page extends ($.$mol_page) {
		addon_tools(){
			return [];
		}
		projects_urls_str(next){
			if(next !== undefined) return next;
			return "";
		}
		langs_available_str(next){
			if(next !== undefined) return next;
			return "";
		}
		locales(next){
			if(next !== undefined) return next;
			return {};
		}
		Form(){
			const obj = new this.$.$yuf_localizer_settings_form();
			(obj.projects_urls_str) = (next) => ((this.projects_urls_str(next)));
			(obj.langs_available_str) = (next) => ((this.langs_available_str(next)));
			(obj.locales) = (next) => ((this.locales(next)));
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$yuf_localizer_settings_page_title"));
		}
		tools(){
			return [...(this.addon_tools())];
		}
		body(){
			return [(this.Form())];
		}
	};
	($mol_mem(($.$yuf_localizer_settings_page.prototype), "projects_urls_str"));
	($mol_mem(($.$yuf_localizer_settings_page.prototype), "langs_available_str"));
	($mol_mem(($.$yuf_localizer_settings_page.prototype), "locales"));
	($mol_mem(($.$yuf_localizer_settings_page.prototype), "Form"));


;
"use strict";
var $;
(function ($) {
    $.$yuf_theme_gap = $mol_style_prop('yuf_theme_gap', [
        'round_s',
        'page_s',
        'page_m',
        'page_l',
        'page_xl',
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("yuf/theme/gap/gap.css", ":root {\n\t--mol_gap_round: .625rem;\n\t--mol_gap_block: .625rem;\n\t\n\t--yuf_theme_gap_round_s: .3125rem;\n\t--yuf_theme_gap_page_s: 14rem;\n\t--yuf_theme_gap_page_m: 20rem;\n\t--yuf_theme_gap_page_l: 26rem;\n\n\t--yuf_theme_gap_page_xl: calc( 100vw - var(--yuf_theme_gap_page_l) );\n}\n\n@media (max-width: 480px) {\n\t:root {\n\t\t--yuf_theme_gap_page_m: 100vw;\n\t\t--yuf_theme_gap_page_l: 100vw;\n\t\t--yuf_theme_gap_page_xl: 100vw;\n\t}\n}\n\n/* 481-767 Low resolution Tablets and iPads */\n@media (min-width: 481px) and (max-width: 767px) {\n\t:root {\n\t\t--yuf_theme_gap_page_xl: 100vw;\n\t\t--yuf_theme_gap_page_m: 100vw;\n\t}\n}\n\n/*\t768-1024 Tablets iPads (Portrait) */\n\n@media (min-width: 768px) and (max-width: 1024px) {\n\t:root {\n\t\t--yuf_theme_gap_page_xl: calc( 100vw - var(--yuf_theme_gap_page_l) );\n\t}\n}\n");
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_localizer_settings_page, {
            flex: {
                basis: $yuf_theme_gap.page_l
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $yuf_dict_degrease(dict) {
        for (let key in dict) {
            if (dict[key] == null)
                delete dict[key];
        }
        return dict;
    }
    $.$yuf_dict_degrease = $yuf_dict_degrease;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_data_setup(value, config) {
        return Object.assign(value, {
            config,
            Value: null
        });
    }
    $.$mol_data_setup = $mol_data_setup;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_data_error extends $mol_error_mix {
    }
    $.$mol_data_error = $mol_data_error;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_data_dict(sub) {
        return $mol_data_setup((val) => {
            if (Object.getPrototypeOf(val) !== Object.prototype) {
                return $mol_fail(new $mol_data_error(`${val} is not an Object`));
            }
            const res = {};
            for (const field in val) {
                try {
                    res[field] = sub(val[field]);
                }
                catch (error) {
                    if (error instanceof Promise)
                        return $mol_fail_hidden(error);
                    error.message = `[${JSON.stringify(field)}] ${error.message}`;
                    return $mol_fail(error);
                }
            }
            return res;
        }, sub);
    }
    $.$mol_data_dict = $mol_data_dict;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_data_string = (val) => {
        if (typeof val === 'string')
            return val;
        return $mol_fail(new $mol_data_error(`${val} is not a string`));
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function pass(data) {
        return data;
    }
    function $mol_error_fence(task, fallback, loading = pass) {
        try {
            return task();
        }
        catch (error) {
            let normalized;
            try {
                normalized = $mol_promise_like(error) ? loading(error) : fallback(error);
            }
            catch (sub_error) {
                normalized = $mol_promise_like(sub_error) ? sub_error : new $mol_error_mix(sub_error.message, { error }, sub_error);
            }
            if (normalized instanceof Error || $mol_promise_like(normalized)) {
                $mol_fail_hidden(normalized);
            }
            return normalized;
        }
    }
    $.$mol_error_fence = $mol_error_fence;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_localizer_key_model extends $mol_object {
        id() { return ''; }
        text_actual() {
            return null;
        }
        text_main() {
            return null;
        }
        text_stored(next) { return next ?? ''; }
        text_push_serial = $mol_wire_async((next) => this.text_push(next));
        text_push(next) {
            this.$.$mol_wait_timeout(200);
            return this.text_stored(next);
        }
        text(next) {
            if (next === undefined)
                return this.text_stored();
            this.text_push_serial(next);
            return next ?? '';
        }
        is_changed() { return this.text() && this.text_actual() !== this.text(); }
        is_new() {
            return Boolean(this.text_main()) && !this.text_actual();
        }
        is_not_used() {
            return this.text_main() === null && Boolean(this.text_actual());
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_localizer_key_model.prototype, "text", null);
    $.$yuf_localizer_key_model = $yuf_localizer_key_model;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const dict = $mol_data_dict;
    const str = $mol_data_string;
    const langs_dto = dict(str);
    class $yuf_localizer_file_model extends $mol_object {
        url() {
            return '';
        }
        id() { return ''; }
        main() { return null; }
        data(next) {
            return next ?? {};
        }
        data_own(key) {
            const data = this.data();
            const keys = key === 'changed' ? Object.keys(data) : this.keys();
            const result = {};
            for (const key of keys) {
                const val = data[key];
                result[key] = val || '';
            }
            return result;
        }
        fetcher() { return this.$.$mol_static.$mol_fetch; }
        actual() {
            $mol_wire_solid();
            const lang_id = this.id();
            let url = this.url();
            if (!url)
                return {};
            const response = $mol_error_fence(() => this.fetcher().success(url), e => e.message === $mol_rest_code[$mol_rest_code['Not Found']] ? null : e);
            if (!response)
                return {};
            const res = $mol_error_fence(() => langs_dto(response.json()), e => new $mol_error_mix(e instanceof TypeError ? 'Invalid json' : e.message, { lang_id, url }, e));
            return res;
        }
        data_cut_equal_actual() {
            const actual = this.actual();
            const local = this.data();
            const patch = {};
            let delete_count = 0;
            for (let key in local) {
                if (local[key] && local[key] === actual[key]) {
                    delete_count++;
                    patch[key] = null;
                }
            }
            if (delete_count)
                this.data(patch);
            return null;
        }
        data_cut_equal_actual_once() {
            return this.data_cut_equal_actual();
        }
        keys() {
            this.data_cut_equal_actual_once();
            return Object.keys({ ...this.main()?.actual(), ...this.actual() });
        }
        keys_filtered(params) {
            const kf = params.keys_filter;
            const keys = [];
            const map = {};
            for (const key of this.keys()) {
                const row = this.item(key);
                if (kf === 'is_new' && !row.is_new())
                    continue;
                if (kf === 'is_not_used' && !row.is_not_used())
                    continue;
                if (kf === 'empty' && row.text())
                    continue;
                if (kf === 'changed' && !row.is_changed())
                    continue;
                if (params.mode !== 'dupes') {
                    keys.push(key);
                    continue;
                }
                const val = this.key_text(key);
                if (map[val] === undefined) {
                    map[val] = key;
                    continue;
                }
                if (map[val] !== null)
                    keys.push(map[val]);
                map[val] = null;
                keys.push(key);
            }
            return keys.sort();
        }
        keys_changed() {
            const local = this.data();
            const actual = this.actual();
            return Object.keys(local).filter(key => local[key] !== actual[key]);
        }
        key_text(key, next) {
            if (next)
                next = next.trim();
            const actual = this.actual();
            const text_actual = actual[key];
            if (next && next === text_actual)
                next == null;
            const local = this.data();
            if (next === undefined)
                return local[key] ?? text_actual ?? '';
            const text_local = this.data({ [key]: next })[key];
            return text_local ?? text_actual ?? '';
        }
        item(id) {
            return this.$.$yuf_localizer_key_model.make({
                id: $mol_const(id),
                text_main: () => (this.main() ?? this).key_text(id),
                text_actual: () => this.actual()[id] ?? null,
                text_stored: next => this.key_text(id, next)
            });
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_localizer_file_model.prototype, "data", null);
    __decorate([
        $mol_mem_key
    ], $yuf_localizer_file_model.prototype, "data_own", null);
    __decorate([
        $mol_mem
    ], $yuf_localizer_file_model.prototype, "actual", null);
    __decorate([
        $mol_action
    ], $yuf_localizer_file_model.prototype, "data_cut_equal_actual", null);
    __decorate([
        $mol_mem
    ], $yuf_localizer_file_model.prototype, "data_cut_equal_actual_once", null);
    __decorate([
        $mol_mem
    ], $yuf_localizer_file_model.prototype, "keys", null);
    __decorate([
        $mol_mem_key
    ], $yuf_localizer_file_model.prototype, "keys_filtered", null);
    __decorate([
        $mol_mem
    ], $yuf_localizer_file_model.prototype, "keys_changed", null);
    __decorate([
        $mol_mem_key
    ], $yuf_localizer_file_model.prototype, "key_text", null);
    __decorate([
        $mol_mem_key
    ], $yuf_localizer_file_model.prototype, "item", null);
    $.$yuf_localizer_file_model = $yuf_localizer_file_model;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_localizer_project_model extends $mol_object {
        url() {
            return '';
        }
        lang_template() {
            return 'web.locale={lang}.json';
        }
        lang_main() {
            return 'en';
        }
        lang_url(lang) {
            const url = this.url().replace(/\/+$/, '');
            if (!url)
                return '';
            return url + '/' + this.lang_template().replace('{lang}', lang);
        }
        model_main() {
            return this.file(this.lang_main());
        }
        data(next) {
            return next ?? {};
        }
        lang_data(lang, next) {
            const prev = this.data();
            if (next === undefined)
                return prev[lang] ?? {};
            return this.data({
                [lang]: next ? $yuf_dict_degrease({ ...prev[lang], ...next }) : null
            })[lang] ?? {};
        }
        file(lang) {
            return this.$.$yuf_localizer_file_model.make({
                id: $mol_const(lang),
                url: () => this.lang_url(lang),
                data: next => this.lang_data(lang, next),
                main: () => lang === this.lang_main() ? null : this.model_main(),
            });
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_localizer_project_model.prototype, "model_main", null);
    __decorate([
        $mol_mem
    ], $yuf_localizer_project_model.prototype, "data", null);
    __decorate([
        $mol_mem_key
    ], $yuf_localizer_project_model.prototype, "lang_data", null);
    __decorate([
        $mol_mem_key
    ], $yuf_localizer_project_model.prototype, "file", null);
    $.$yuf_localizer_project_model = $yuf_localizer_project_model;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_localizer_project_store extends $mol_object {
        static locales(next) {
            return this.$.$mol_state_local.value(`${this}.locales()`, next) ?? {};
        }
        locales(next) {
            return this.$.$yuf_localizer_project_store.locales(next) ?? {};
        }
        locales_patchable(next) {
            const prev = this.locales();
            if (next === undefined)
                return prev ?? {};
            return this.locales(!next ? next : $yuf_dict_degrease({ ...prev, ...next })) ?? {};
        }
        project(url) {
            return this.$.$yuf_localizer_project_model.make({
                url: $mol_const(url),
                data: next => this.locales_patchable(next),
            });
        }
    }
    __decorate([
        $mol_mem_key
    ], $yuf_localizer_project_store.prototype, "project", null);
    __decorate([
        $mol_mem
    ], $yuf_localizer_project_store, "locales", null);
    $.$yuf_localizer_project_store = $yuf_localizer_project_store;
})($ || ($ = {}));

;
	($.$mol_icon_refresh) = class $mol_icon_refresh extends ($.$mol_icon) {
		path(){
			return "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z";
		}
	};


;
"use strict";

;
	($.$yuf_localizer_key_form) = class $yuf_localizer_key_form extends ($.$mol_form) {
		title(){
			return (this.model().id());
		}
		text(next){
			return (this.model().text(next));
		}
		is_new(){
			return (this.model().is_new());
		}
		is_not_used(){
			return (this.model().is_not_used());
		}
		text_actual(){
			return (this.model().text_actual());
		}
		lang_code(){
			return "";
		}
		text_name(){
			return (this.lang_code());
		}
		Reset_icon(){
			const obj = new this.$.$mol_icon_refresh();
			return obj;
		}
		reset_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_key_form_reset_hint"));
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		Reset(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.Reset_icon())]);
			(obj.hint) = () => ((this.reset_hint()));
			(obj.click) = (next) => ((this.reset(next)));
			return obj;
		}
		reset_content(){
			return [(this.Reset())];
		}
		text_edit_enabled(){
			return false;
		}
		Text(){
			const obj = new this.$.$mol_string();
			(obj.enabled) = () => ((this.text_edit_enabled()));
			(obj.value) = (next) => ((this.text(next)));
			return obj;
		}
		Text_field(){
			const obj = new this.$.$yuf_localizer_key_form_field();
			(obj.name) = () => ((this.text_name()));
			(obj.reset_content) = () => ((this.reset_content()));
			(obj.control) = () => ((this.Text()));
			return obj;
		}
		is_new_text(){
			return (this.$.$mol_locale.text("$yuf_localizer_key_form_is_new_text"));
		}
		is_not_used_text(){
			return (this.$.$mol_locale.text("$yuf_localizer_key_form_is_not_used_text"));
		}
		model(){
			const obj = new this.$.$yuf_localizer_key_model();
			return obj;
		}
		autofocus(){
			return false;
		}
		rows(){
			return [(this.Body())];
		}
		body(){
			return [(this.Text_field())];
		}
	};
	($mol_mem(($.$yuf_localizer_key_form.prototype), "Reset_icon"));
	($mol_mem(($.$yuf_localizer_key_form.prototype), "reset"));
	($mol_mem(($.$yuf_localizer_key_form.prototype), "Reset"));
	($mol_mem(($.$yuf_localizer_key_form.prototype), "Text"));
	($mol_mem(($.$yuf_localizer_key_form.prototype), "Text_field"));
	($mol_mem(($.$yuf_localizer_key_form.prototype), "model"));
	($.$yuf_localizer_key_form_field) = class $yuf_localizer_key_form_field extends ($.$mol_form_field) {
		reset_content(){
			return [];
		}
		label(){
			return [
				(this.name()), 
				(this.Bid()), 
				...(this.reset_content())
			];
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_localizer_key_form extends $.$yuf_localizer_key_form {
            text_name() {
                return [
                    this.lang_code(),
                    this.is_new() ? this.is_new_text() : '',
                    this.is_not_used() ? this.is_not_used_text() : '',
                ].filter(Boolean).join(', ');
            }
            text_edit_enabled() {
                return !this.is_not_used();
            }
            reset() {
                this.model().text(null);
            }
            reset_hint() {
                return super.reset_hint().replace('{prev}', this.model().text_actual() || '\'\'');
            }
            reset_content() {
                return this.model().is_changed() ? super.reset_content() : [];
            }
            focus_first() {
                if (!this.autofocus())
                    return null;
                this.Text().bring();
                return null;
            }
            auto() {
                this.focus_first();
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_localizer_key_form.prototype, "text_name", null);
        __decorate([
            $mol_mem
        ], $yuf_localizer_key_form.prototype, "focus_first", null);
        $$.$yuf_localizer_key_form = $yuf_localizer_key_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_localizer_key_form, {
            padding: 0,
            Reset: {
                margin: {
                    top: '-.5rem',
                    bottom: '-.5rem'
                }
            }
        });
        $mol_style_define($yuf_localizer_key_form_field, {
            Label: {
                gap: 0
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_localizer_page) = class $yuf_localizer_page extends ($.$mol_page) {
		locale_key(){
			return "";
		}
		addon_tools(){
			return [];
		}
		locale_by_lang_code(id){
			const obj = new this.$.$yuf_localizer_key_model();
			return obj;
		}
		autofocus(id){
			return false;
		}
		lang_code_id(id){
			return "";
		}
		Form(id){
			const obj = new this.$.$yuf_localizer_key_form();
			(obj.model) = () => ((this.locale_by_lang_code(id)));
			(obj.autofocus) = () => ((this.autofocus(id)));
			(obj.lang_code) = () => ((this.lang_code_id(id)));
			return obj;
		}
		forms(){
			return [(this.Form(id))];
		}
		lang_code(){
			return "";
		}
		langs_available(){
			return [];
		}
		project(){
			return null;
		}
		title(){
			return (this.locale_key());
		}
		tools(){
			return [...(this.addon_tools())];
		}
		body(){
			return [...(this.forms())];
		}
	};
	($mol_mem_key(($.$yuf_localizer_page.prototype), "locale_by_lang_code"));
	($mol_mem_key(($.$yuf_localizer_page.prototype), "Form"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_localizer_page extends $.$yuf_localizer_page {
            langs() {
                const lang = this.lang_code();
                const available = this.langs_available();
                return [lang, ...available.filter(src => src !== lang)];
            }
            forms() {
                if (!this.project())
                    return [];
                return this.langs().map(lang_code => this.Form(lang_code));
            }
            locale_by_lang_code(lang_code) {
                return this.project().file(lang_code).item(this.locale_key());
            }
            lang_code_id(lang_code) {
                return lang_code;
            }
            autofocus(lang_code) {
                return lang_code === this.lang_code();
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_localizer_page.prototype, "forms", null);
        $$.$yuf_localizer_page = $yuf_localizer_page;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_localizer_page, {
            flex: {
                basis: '32rem'
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_localizer_catalog) = class $yuf_localizer_catalog extends ($.$yuf_catalog) {
		selected_project_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_selected_project_hint"));
		}
		projects_urls(){
			return [];
		}
		project_url(next){
			if(next !== undefined) return next;
			return "";
		}
		Selected_project(){
			const obj = new this.$.$mol_select();
			(obj.Trigger_icon) = () => (null);
			(obj.hint) = () => ((this.selected_project_hint()));
			(obj.options) = () => ((this.projects_urls()));
			(obj.value) = (next) => ((this.project_url(next)));
			return obj;
		}
		version(){
			return "";
		}
		Lights(){
			const obj = new this.$.$yuf_lights_toggle();
			(obj.hint) = () => ((this.version()));
			return obj;
		}
		Settings_icon(){
			const obj = new this.$.$mol_icon_settings();
			return obj;
		}
		settings_check_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_settings_check_hint"));
		}
		settings_checked(next){
			if(next !== undefined) return next;
			return false;
		}
		Settings_check(){
			const obj = new this.$.$mol_check_icon();
			(obj.Icon) = () => ((this.Settings_icon()));
			(obj.hint) = () => ((this.settings_check_hint()));
			(obj.checked) = (next) => ((this.settings_checked(next)));
			return obj;
		}
		Foot_tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Lights()), (this.Settings_check())]);
			return obj;
		}
		selected_lang_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_selected_lang_hint"));
		}
		langs_available(){
			return [];
		}
		lang_code(next){
			if(next !== undefined) return next;
			return "en";
		}
		Selected_lang(){
			const obj = new this.$.$mol_select();
			(obj.hint) = () => ((this.selected_lang_hint()));
			(obj.options) = () => ((this.langs_available()));
			(obj.value) = (next) => ((this.lang_code(next)));
			return obj;
		}
		key_filter_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_key_filter_hint"));
		}
		all_msg(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_all_msg"));
		}
		is_new_msg(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_is_new_msg"));
		}
		empty_msg(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_empty_msg"));
		}
		changed_msg(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_changed_msg"));
		}
		is_not_used_msg(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_is_not_used_msg"));
		}
		keys_filter(next){
			if(next !== undefined) return next;
			return "";
		}
		Keys_filter(){
			const obj = new this.$.$mol_select();
			(obj.hint) = () => ((this.key_filter_hint()));
			(obj.Filter) = () => (null);
			(obj.dictionary) = () => ({
				"": (this.all_msg()), 
				"is_new": (this.is_new_msg()), 
				"empty": (this.empty_msg()), 
				"changed": (this.changed_msg()), 
				"is_not_used": (this.is_not_used_msg())
			});
			(obj.value) = (next) => ((this.keys_filter(next)));
			return obj;
		}
		Dupes_icon(){
			const obj = new this.$.$mol_icon_content_duplicate();
			return obj;
		}
		dupes_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_dupes_hint"));
		}
		dupes_only(next){
			if(next !== undefined) return next;
			return false;
		}
		Dupes(){
			const obj = new this.$.$mol_check_icon();
			(obj.Icon) = () => ((this.Dupes_icon()));
			(obj.hint) = () => ((this.dupes_hint()));
			(obj.checked) = (next) => ((this.dupes_only(next)));
			return obj;
		}
		Save_trigger_icon(){
			const obj = new this.$.$mol_icon_content_save_all();
			return obj;
		}
		diff_to_clipboard_enabled(){
			return false;
		}
		locale_file_all_name_tpl(){
			return "{app}_{time}.locales.json";
		}
		locale_file_all_name(){
			return (this.locale_file_all_name_tpl());
		}
		locale_file_all_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_locale_file_all_hint"));
		}
		Locale_file_all_download(){
			const obj = new this.$.$mol_button_download();
			(obj.blob) = () => ((this.locale_file_blob("all")));
			(obj.enabled) = () => ((this.diff_to_clipboard_enabled()));
			(obj.file_name) = () => ((this.locale_file_all_name()));
			(obj.title) = () => ((this.locale_file_all_hint()));
			return obj;
		}
		locale_copypaste_all_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_locale_copypaste_all_hint"));
		}
		Locale_copypaste_all(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ((this.locale_copypaste_all_hint()));
			(obj.enabled) = () => ((this.diff_to_clipboard_enabled()));
			(obj.text) = () => ((this.locale_file_json("all")));
			return obj;
		}
		locale_file_blob(id){
			return null;
		}
		locale_file_whole_name_tpl(){
			return "{app}_{time}.locale={lang}.json";
		}
		locale_file_whole_name(){
			return (this.locale_file_whole_name_tpl());
		}
		locale_file_whole_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_locale_file_whole_hint"));
		}
		Locale_file_whole_download(){
			const obj = new this.$.$mol_button_download();
			(obj.blob) = () => ((this.locale_file_blob("whole")));
			(obj.file_name) = () => ((this.locale_file_whole_name()));
			(obj.title) = () => ((this.locale_file_whole_hint()));
			return obj;
		}
		locale_copypaste_hint(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_locale_copypaste_hint"));
		}
		locale_file_json(id){
			return "";
		}
		Locale_copypaste(){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ((this.locale_copypaste_hint()));
			(obj.text) = () => ((this.locale_file_json("whole")));
			return obj;
		}
		Save_content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([
				(this.Locale_file_all_download()), 
				(this.Locale_copypaste_all()), 
				(this.Locale_file_whole_download()), 
				(this.Locale_copypaste())
			]);
			return obj;
		}
		Save(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ((this.$.$mol_locale.text("$yuf_localizer_catalog_Save_hint")));
			(obj.trigger_content) = () => ([(this.Save_trigger_icon())]);
			(obj.bubble_content) = () => ([(this.Save_content())]);
			return obj;
		}
		description_title(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_description_title"));
		}
		description(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_description"));
		}
		Description_list(){
			const obj = new this.$.$mol_text();
			(obj.text) = () => ((this.description()));
			return obj;
		}
		Description_page(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.description_title()));
			(obj.body) = () => ([(this.Description_list())]);
			return obj;
		}
		settings_close(next){
			if(next !== undefined) return next;
			return null;
		}
		Settings_close(){
			const obj = new this.$.$yuf_button_close();
			(obj.click) = (next) => ((this.settings_close(next)));
			return obj;
		}
		val_str(id, next){
			if(next !== undefined) return next;
			return "";
		}
		locales(next){
			return (this.projects().locales(next));
		}
		locale_key(id){
			return "";
		}
		project(){
			return null;
		}
		setup_needed(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_setup_needed"));
		}
		not_found_keys(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_not_found_keys"));
		}
		empty_content(){
			return [(this.setup_needed()), (this.not_found_keys())];
		}
		Menu_title(){
			return (this.Menu().Title());
		}
		Menu_tools(){
			return (this.Menu().Tools());
		}
		select_key(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({
				"up": (next) => (this.select_key("prev", next)), 
				"down": (next) => (this.select_key("next", next)), 
				"left": (next) => (this.select_key("prev", next)), 
				"right": (next) => (this.select_key("next", next))
			});
			return obj;
		}
		Theme(){
			const obj = new this.$.$yuf_theme_plugin();
			return obj;
		}
		menu_title(){
			return (this.$.$mol_locale.text("$yuf_localizer_catalog_menu_title"));
		}
		param_prefix(){
			return "app";
		}
		param_suffix(){
			return "localizer";
		}
		menu_foot(){
			return [(this.Selected_project()), (this.Foot_tools())];
		}
		menu_tools(){
			return [
				(this.Selected_lang()), 
				(this.Keys_filter()), 
				(this.Dupes()), 
				(this.Save())
			];
		}
		placeholders(){
			return [(this.Description_page())];
		}
		Settings(){
			const obj = new this.$.$yuf_localizer_settings_page();
			(obj.addon_tools) = () => ([(this.Settings_close())]);
			(obj.projects_urls_str) = (next) => ((this.val_str("projects", next)));
			(obj.langs_available_str) = (next) => ((this.val_str("langs", next)));
			(obj.locales) = (next) => ((this.locales(next)));
			return obj;
		}
		projects(){
			const obj = new this.$.$yuf_localizer_project_store();
			return obj;
		}
		Spread(id){
			const obj = new this.$.$yuf_localizer_page();
			(obj.locale_key) = () => ((this.locale_key(id)));
			(obj.langs_available) = () => ((this.langs_available()));
			(obj.lang_code) = () => ((this.lang_code()));
			(obj.project) = () => ((this.project()));
			(obj.addon_tools) = () => ([(this.Spread_close())]);
			return obj;
		}
		Menu_link(id){
			const obj = new this.$.$yuf_link();
			(obj.arg) = () => ((this.arg(id)));
			(obj.default) = () => ((this.menu_link_default(id)));
			(obj.hint) = () => ((this.menu_link_hint(id)));
			(obj.content) = () => ((this.menu_link_content(id)));
			return obj;
		}
		item_theme_not_used(){
			return "not_used";
		}
		item_theme_new(){
			return "new";
		}
		item_theme_changed(){
			return "changed";
		}
		Menu_links_empty(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.empty_content()));
			return obj;
		}
		Menu(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.menu_title()));
			(obj.Logo) = () => ((this.Menu_logo()));
			(obj.tools) = () => ([...(this.menu_tools()), ...(this.addon_tools())]);
			(obj.head) = () => ((this.menu_head()));
			(obj.body) = () => ((this.menu_body()));
			(obj.foot) = () => ((this.menu_foot()));
			(obj.plugins) = () => ([
				...(this.$.$mol_page.prototype.plugins.call(obj)), 
				(this.Hotkey()), 
				(this.Theme())
			]);
			return obj;
		}
	};
	($mol_mem(($.$yuf_localizer_catalog.prototype), "project_url"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Selected_project"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Lights"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Settings_icon"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "settings_checked"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Settings_check"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Foot_tools"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "lang_code"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Selected_lang"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "keys_filter"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Keys_filter"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Dupes_icon"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "dupes_only"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Dupes"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Save_trigger_icon"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Locale_file_all_download"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Locale_copypaste_all"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Locale_file_whole_download"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Locale_copypaste"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Save_content"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Save"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Description_list"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Description_page"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "settings_close"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Settings_close"));
	($mol_mem_key(($.$yuf_localizer_catalog.prototype), "val_str"));
	($mol_mem_key(($.$yuf_localizer_catalog.prototype), "select_key"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Hotkey"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Theme"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Settings"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "projects"));
	($mol_mem_key(($.$yuf_localizer_catalog.prototype), "Spread"));
	($mol_mem_key(($.$yuf_localizer_catalog.prototype), "Menu_link"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Menu_links_empty"));
	($mol_mem(($.$yuf_localizer_catalog.prototype), "Menu"));
	($.$yuf_localizer_catalog_link) = class $yuf_localizer_catalog_link extends ($.$yuf_link) {
		unselectable(){
			return true;
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_localizer_catalog extends $.$yuf_localizer_catalog {
            val_str(key, next) {
                return this.$.$mol_state_arg.value(`${this.param_base()}_${key}`, next === undefined || next ? next : null) ?? '';
            }
            param() {
                return `${this.param_base()}_langkey`;
            }
            lang_code(next) {
                return this.val_str('lang', next) || super.lang_code();
            }
            project_url(next) {
                const urls = this.projects_urls();
                const prev = this.val_str('project');
                if (!urls.includes(prev))
                    next = null;
                return this.val_str('project', next) || urls?.[0] || '';
            }
            mode(next) {
                return this.val_str('mode', next) || null;
            }
            dupes_only(next) {
                return this.mode(next ? 'dupes' : next === false ? null : undefined) === 'dupes';
            }
            keys_filter(next) {
                return this.val_str('keys', next);
            }
            projects_urls() {
                const str = this.val_str('projects') ?? '';
                return str.split(/[\n\t]/).map(str => str.match(/^(?:https?)?:?(\/+[^#&?]+)/)?.[1]?.replace(/\/+(?:[\w\d]+\.[\w\d]+)?$/, '')?.trim() ?? '').filter(Boolean);
            }
            lang_main() {
                return this.project()?.lang_main() ?? 'en';
            }
            langs_available() {
                const lang_main = this.lang_main();
                const str = this.val_str('langs') ?? '';
                return [
                    lang_main,
                    ...str.split(/[\s,~]/).map(str => str.trim()).filter(str => str && str !== lang_main)
                ];
            }
            project() {
                return this.project_url() ? this.projects().project(this.project_url()) : null;
            }
            lang() {
                const code = this.lang_code();
                return !code ? null : this.project()?.file(code);
            }
            empty_content() {
                return this.project_url() ? [this.not_found_keys()] : [this.setup_needed()];
            }
            settings_checked_default() {
                return !this.project_url() || !this.langs_available().length;
            }
            settings_checked(next) {
                return next ?? this.settings_checked_default();
            }
            pages() {
                return this.settings_checked() ? [...super.pages(), this.Settings()] : super.pages();
            }
            locale_key(key) { return key; }
            spread_ids() {
                const keys_filter = this.keys_filter();
                const mode = this.mode();
                return this.lang()?.keys_filtered({ keys_filter, mode }) ?? [];
            }
            select_key(key) {
                if (this.settings_checked())
                    return null;
                const ids = this.spread_ids_filtered();
                const id = this.spread();
                const index = ids.indexOf(id);
                const direction = key === 'prev' ? -1 : 1;
                const next = Math.min(ids.length - 1, Math.max(0, index + direction));
                const id_next = this.spread(ids[next]);
                const item = this.Menu_item(id_next);
                this.Menu_links().ensure_visible(item);
            }
            settings_close() {
                return this.settings_checked(false);
            }
            diff_to_clipboard_enabled() {
                return $mol_error_fence(() => Boolean(this.lang()?.keys_changed().length), () => false);
            }
            placeholders() {
                return this.pages().length > 1 ? [] : super.placeholders();
            }
            spread_title(key) {
                const str = this.Spread(key).title();
                const item = this.lang()?.item(key);
                if (!item)
                    return str;
                let prefix = '';
                if (item.is_not_used())
                    prefix += '⚠️';
                else if (item.is_changed())
                    prefix += '☑️';
                else if (item.is_new())
                    prefix += '❓';
                if (prefix)
                    prefix += ' ';
                return prefix + str;
            }
            project_name_normalized(str) {
                const url = this.project_url()
                    .replace(/[^\w\d\s]/g, '_')
                    .replace(/_{2,}/g, '_')
                    .replace(/^_+(.*)_+/g, '$1')
                    .trim();
                const time = new $mol_time_moment().toString('YYYY-MM-DD_hh:mm:ss');
                return str.replace('{lang}', this.lang_code())
                    .replace('{time}', time)
                    .replace('{app}', url);
            }
            locale_file_all_name() {
                return this.project_name_normalized(this.locale_file_all_name_tpl());
            }
            locale_file_whole_name() {
                return this.project_name_normalized(this.locale_file_whole_name_tpl());
            }
            locale_file_json(key) {
                const data = key === 'all' ? this.projects().locales() : this.lang()?.data_own(key) ?? '';
                return JSON.stringify(data, null, '\t') || '{}';
            }
            locale_file_blob(key) {
                const str = this.locale_file_json(key);
                return new Blob([str], { type: 'application/json' });
            }
        }
        __decorate([
            $mol_mem_key
        ], $yuf_localizer_catalog.prototype, "val_str", null);
        __decorate([
            $mol_mem
        ], $yuf_localizer_catalog.prototype, "projects_urls", null);
        __decorate([
            $mol_mem
        ], $yuf_localizer_catalog.prototype, "langs_available", null);
        __decorate([
            $mol_action
        ], $yuf_localizer_catalog.prototype, "settings_checked_default", null);
        __decorate([
            $mol_mem
        ], $yuf_localizer_catalog.prototype, "settings_checked", null);
        __decorate([
            $mol_mem
        ], $yuf_localizer_catalog.prototype, "spread_ids", null);
        __decorate([
            $mol_action
        ], $yuf_localizer_catalog.prototype, "select_key", null);
        __decorate([
            $mol_mem_key
        ], $yuf_localizer_catalog.prototype, "locale_file_json", null);
        __decorate([
            $mol_mem_key
        ], $yuf_localizer_catalog.prototype, "locale_file_blob", null);
        $$.$yuf_localizer_catalog = $yuf_localizer_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_localizer_catalog, {
            Menu: {
                flex: {
                    basis: $yuf_theme_gap.page_l,
                },
                Title: {
                    gap: 0,
                },
                Foot: {
                    justifyContent: 'space-between',
                }
            },
            $mol_text_span: {
                '@': {
                    'mol_text_type': {
                        'emphasis': {
                            color: $mol_theme.current,
                        }
                    }
                }
            },
            Description_list: {
                flex: {
                    shrink: 1,
                },
            },
            Description_page: {
                flex: {
                    basis: $yuf_theme_gap.page_xl
                },
                Body_content: {
                    padding: 0,
                }
            },
            Menu_item: {
                padding: 0
            },
            Selected_project: {
                Trigger: {
                    flex: {
                        wrap: 'nowrap',
                    },
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                },
            },
            Selected_lang: {
                Trigger: {
                    width: '3rem',
                },
            },
            Keys_filter: {
                Trigger: {
                    minWidth: '7rem',
                },
            },
            Menu_link: {
                flex: {
                    wrap: 'wrap'
                },
                wordBreak: 'break-all',
                whiteSpace: 'break-spaces',
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_localizer_demo) = class $yuf_localizer_demo extends ($.$mol_example_large) {
		Localizer(){
			const obj = new this.$.$yuf_localizer_catalog();
			return obj;
		}
		title(){
			return "Localizer";
		}
		sub(){
			return [(this.Localizer())];
		}
		tags(){
			return [
				"locale", 
				"lang", 
				"translate", 
				"editor", 
				"catalog"
			];
		}
		aspects(){
			return ["Application"];
		}
	};
	($mol_mem(($.$yuf_localizer_demo.prototype), "Localizer"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_localizer_demo extends $.$yuf_localizer_demo {
        }
        $$.$yuf_localizer_demo = $yuf_localizer_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("yuf/localizer/demo/demo.view.css", "[mol_page_head] {\n\tz-index: unset;\n\tposition: unset;\n}\n");
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_locale_model extends $mol_object {
        lang(next) { return this.$.$mol_locale.lang(next); }
        langs_available() {
            return {
                ru: 'РУ',
                en: 'EN'
            };
        }
    }
    $.$yuf_locale_model = $yuf_locale_model;
})($ || ($ = {}));

;
	($.$yuf_locale_switch) = class $yuf_locale_switch extends ($.$mol_select) {
		langs_available(){
			return (this.model().langs_available());
		}
		lang(next){
			return (this.model().lang(next));
		}
		Filter(){
			return null;
		}
		model(){
			const obj = new this.$.$yuf_locale_model();
			return obj;
		}
		dictionary(){
			return (this.langs_available());
		}
		value(next){
			return (this.lang(next));
		}
	};
	($mol_mem(($.$yuf_locale_switch.prototype), "model"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_locale_switch, {
            Option: {
                '[mol_check_checked]': {
                    true: {
                        font: {
                            weight: 700,
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_catalog_app) = class $yuf_catalog_app extends ($.$yuf_catalog) {
		Placeholder_no_authorized(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		login_title(){
			return (this.$.$mol_locale.text("$yuf_catalog_app_login_title"));
		}
		login_body(){
			return [];
		}
		foot_first_content(){
			return [];
		}
		Foot_first(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.foot_first_content()));
			return obj;
		}
		version(){
			return "";
		}
		Lights(){
			const obj = new this.$.$yuf_lights_toggle();
			(obj.hint) = () => ((this.version()));
			return obj;
		}
		Locale_switch(){
			const obj = new this.$.$yuf_locale_switch();
			return obj;
		}
		foot_second_post(){
			return [];
		}
		foot_second_content(){
			return [
				(this.Lights()), 
				(this.Locale_switch()), 
				...(this.foot_second_post())
			];
		}
		Foot_second(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.foot_second_content()));
			return obj;
		}
		menu_foot_public(){
			return [(this.Foot_first()), (this.Foot_second())];
		}
		menu_links_no_authorized(){
			return [];
		}
		log_out_title(){
			return (this.$.$mol_locale.text("$yuf_catalog_app_log_out_title"));
		}
		logout_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Log_out(){
			const obj = new this.$.$mol_button_minor();
			(obj.sub) = () => ([(this.log_out_title())]);
			(obj.click) = (next) => ((this.logout_click(next)));
			return obj;
		}
		menu_links_authorized(){
			return [...(this.menu_links()), (this.Log_out())];
		}
		Theme(){
			const obj = new this.$.$yuf_theme_plugin();
			return obj;
		}
		logged(next){
			if(next !== undefined) return next;
			return false;
		}
		logout(next){
			if(next !== undefined) return next;
			return null;
		}
		enter(next){
			if(next !== undefined) return next;
			return null;
		}
		placeholders_page(){
			return [];
		}
		placeholders_no_authorized(){
			return [(this.Placeholder_no_authorized())];
		}
		Login(){
			const obj = new this.$.$mol_page();
			(obj.Logo) = () => ((this.Menu_logo()));
			(obj.title) = () => ((this.login_title()));
			(obj.body) = () => ((this.login_body()));
			(obj.foot) = () => ((this.menu_foot_public()));
			return obj;
		}
		menu_foot(){
			return [...(this.menu_foot_public())];
		}
		Menu_links(){
			const obj = new this.$.$mol_list();
			(obj.Empty) = () => ((this.Menu_links_empty()));
			(obj.rows) = () => ([...(this.menu_links_no_authorized()), ...(this.menu_links_authorized())]);
			return obj;
		}
		menu_filter_enabled(){
			return false;
		}
		plugins(){
			return [(this.Theme())];
		}
	};
	($mol_mem(($.$yuf_catalog_app.prototype), "Placeholder_no_authorized"));
	($mol_mem(($.$yuf_catalog_app.prototype), "Foot_first"));
	($mol_mem(($.$yuf_catalog_app.prototype), "Lights"));
	($mol_mem(($.$yuf_catalog_app.prototype), "Locale_switch"));
	($mol_mem(($.$yuf_catalog_app.prototype), "Foot_second"));
	($mol_mem(($.$yuf_catalog_app.prototype), "logout_click"));
	($mol_mem(($.$yuf_catalog_app.prototype), "Log_out"));
	($mol_mem(($.$yuf_catalog_app.prototype), "Theme"));
	($mol_mem(($.$yuf_catalog_app.prototype), "logged"));
	($mol_mem(($.$yuf_catalog_app.prototype), "logout"));
	($mol_mem(($.$yuf_catalog_app.prototype), "enter"));
	($mol_mem(($.$yuf_catalog_app.prototype), "Login"));
	($mol_mem(($.$yuf_catalog_app.prototype), "Menu_links"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_catalog_app extends $.$yuf_catalog_app {
            pages() {
                const logged = this.logged();
                if (logged)
                    return super.pages();
                return [this.Login()];
            }
            menu_links_authorized() {
                return this.logged() ? super.menu_links_authorized() : [];
            }
            menu_links_no_authorized() {
                return this.logged() ? [] : super.menu_links_no_authorized();
            }
            logout_click(e) {
                this.logout();
                this.$.$mol_wait_timeout(100);
                const arg = this.$.$mol_state_arg;
                const link = arg.link(this.spread_close_arg());
                arg.href(link);
            }
            placeholders() {
                if (this.spread())
                    return this.placeholders_page();
                if (!this.logged())
                    return this.placeholders_no_authorized();
                return super.placeholders();
            }
            login_title() {
                return [this.menu_title(), super.login_title()].filter(Boolean).join(' | ');
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_catalog_app.prototype, "pages", null);
        $$.$yuf_catalog_app = $yuf_catalog_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_catalog_app, {
            Menu: {
                flex: {
                    basis: '13rem',
                    grow: 0,
                    shrink: 0,
                },
                Foot: {
                    padding: $mol_gap.space,
                    flex: {
                        direction: 'column',
                    },
                }
            },
            Login: {
                flex: {
                    grow: 0,
                    basis: '16rem',
                },
                Foot: {
                    padding: $mol_gap.space,
                    flex: {
                        direction: 'column',
                    },
                }
            },
            Foot_second: {
                gap: $mol_gap.space,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_ws_socket extends $mol_object {
        id = $mol_guid();
        _native = null;
        url_debug() { return this.$.$mol_state_arg.value('ws_url'); }
        url() { return '/ws'; }
        protocols() { return []; }
        native() {
            if (this._native)
                return this._native;
            let url = this.url_debug() || this.url();
            if (!url.match(/^wss?\:/)) {
                url = this.$.$mol_dom_context.location.origin.replace('http', 'ws') + url;
            }
            const ws = this._native = new WebSocket(url, this.protocols());
            ws.onerror = e => this.onerror(e);
            ws.onclose = e => this.onclose(e);
            ws.onmessage = message => this.onmessage(message);
            ws.onopen = () => this.onopen();
            return ws;
        }
        send(data) { return this.native().send(data); }
        get readyState() { return this.native()?.readyState ?? WebSocket.CLOSED; }
        onerror(error) { }
        onclose(error) { }
        onmessage(e) { }
        onopen() { }
        destructor() {
            const ws = this._native;
            if (!ws)
                return;
            ws.onerror = null;
            ws.onclose = null;
            ws.onmessage = null;
            ws.onopen = null;
            const state = ws.readyState;
            if (state === WebSocket.CLOSED || state === WebSocket.CLOSING)
                return;
            try {
                ws.close();
            }
            catch (e) {
                $mol_fail_log(e);
            }
        }
    }
    $.$yuf_ws_socket = $yuf_ws_socket;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$yuf_ws_code = {
        1000: 'Normal closure',
        1001: 'Going away',
        1002: 'Protocol error',
        1003: 'Unsupported data',
        1005: 'No status rcvd',
        1006: 'Abnormal closure',
        1007: 'Unsupported invalid frame payload data',
        1008: 'Policy violation',
        1009: 'Message too big',
        1010: 'Mandatory extension',
        1011: 'Internal error',
        1012: 'Service restart',
        1013: 'Try again later',
        1014: 'Bad gateway',
        1015: 'TLS handshake',
        3000: 'Unauthorized',
        3003: 'Forbidden',
        3008: 'Timeout',
        4000: 'Application error',
    };
    function $yuf_ws_code_text(code) {
        return $.$yuf_ws_code[code] || ($.$yuf_ws_code[4000] + ' ' + code);
    }
    $.$yuf_ws_code_text = $yuf_ws_code_text;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_ws_host extends $mol_object {
        watchdog_deadline() { return 30000; }
        restart_delay() { return 3000; }
        ping_interval() { return 5000; }
        url() { return ''; }
        enabled() { return true; }
        id() { return $mol_wire_probe(() => this.ws())?.id ?? null; }
        protocols() { return []; }
        restarts() { }
        ws(reset) {
            this.restarts();
            if (!this.enabled())
                return null;
            return this.$.$yuf_ws_socket.make({
                url: () => this.url(),
                protocols: () => this.protocols(),
                onclose: e => this.on_close(e),
                onerror: e => this.on_error(e),
                onopen: () => this.on_open(),
                onmessage: e => this.on_message(e),
            });
        }
        restartable(event) {
            return event.type === 'error' || (event.type === 'close' && event.code !== 1000);
        }
        on_error(event) {
            const err = new Error($yuf_ws_code_text(event.code ?? 1006), { cause: { event, socket_id: this.id() } });
            this.opened(null);
            this.error(err);
        }
        on_close(event) {
            const delay = this.restart_delay();
            const restartable = delay && event && this.restartable(event);
            this.$.$mol_log3_rise({
                place: '$yuf_ws_host.on_close()',
                socket_id: this.id(),
                message: $yuf_ws_code_text(event.code),
                clean: event.wasClean,
                hint: restartable ? `reconnecting after ${delay} ms` : 'sleep',
            });
            this.opened(null);
            if (restartable)
                this.watchdog(null, delay);
        }
        on_open() {
            this.opened(null);
            this.error(null);
        }
        on_message(event) {
            const task = event.data;
            try {
                this.on_data(task);
            }
            catch (err) {
                if ($mol_promise_like(err))
                    $mol_fail_hidden(err);
                $mol_fail_log(err);
                this.error(err);
            }
        }
        send(data) {
            const ws = this.ws();
            if (ws?.readyState !== WebSocket.OPEN) {
                throw new Error('Socket not opened', { cause: ws });
            }
            return ws.send(data);
        }
        send_object(data) {
            return this.send(JSON.stringify(data));
        }
        is_ping(obj) { return false; }
        send_ping() { }
        send_pong() { }
        token_sended() { return null; }
        on_data(data) {
            if (this.watchdog_enabled())
                this.watchdog(null);
            const object = typeof data === 'string' ? JSON.parse(data) : null;
            if (!object)
                return;
            if (this.is_ping(object))
                return this.send_pong();
            this.message_add(object);
            this.on_object(object);
        }
        on_object(e) { }
        debug_messages = [];
        message_last_at(reset) { return Date.now(); }
        message_add(message) {
            if (!$mol_wire_probe(() => this.messages_grab()))
                return;
            this.debug_messages.push(message);
            this.message_last_at(null);
        }
        messages_grab() {
            this.message_last_at();
            const messages = this.debug_messages;
            this.debug_messages = [];
            return messages;
        }
        opened(reset) {
            return this.ws()?.readyState === WebSocket.OPEN;
        }
        heatbeat_enabled() { return true; }
        heartbeat() {
            const timeout = this.ping_interval();
            if (!timeout)
                return null;
            if (!this.opened())
                return null;
            this.send_ping();
            this.$.$mol_state_time.now(timeout);
            return null;
        }
        watchdog_enabled() { return true; }
        watchdog(reason, timeout = this.watchdog_deadline()) {
            if (!timeout)
                return null;
            if (!this.ws())
                return null;
            return new this.$.$mol_after_timeout(timeout, () => this.ws(null));
        }
        error_packed(error) {
            this.ws();
            return error ?? null;
        }
        error(error) {
            return this.error_packed(error ? [error] : error)?.[0] ?? null;
        }
        ready() {
            if (this.heatbeat_enabled())
                this.heartbeat();
            if (this.watchdog_enabled())
                this.watchdog();
            this.token_sended();
            return this.opened();
        }
        error_message() {
            try {
                this.ready();
                return this.error()?.message ?? '';
            }
            catch (e) {
                if (!$mol_promise_like(e))
                    return e.message ?? '';
            }
            return '';
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "ws", null);
    __decorate([
        $mol_action
    ], $yuf_ws_host.prototype, "send", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "message_last_at", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "messages_grab", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "opened", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "heartbeat", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "watchdog", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "error_packed", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "ready", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_host.prototype, "error_message", null);
    $.$yuf_ws_host = $yuf_ws_host;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_session extends $mol_object {
        client_id() { return this.$.$mol_dom_context.location.hostname; }
        token_key() { return `${this.client_id()}_token`; }
        token(next, op) {
            return this.$.$mol_state_local.value(this.token_key(), next === '' ? null : next) || null;
        }
        token_grab(reset) {
            return this.token(reset, reset === null ? 'refresh' : undefined);
        }
        user_id() { return null; }
        user_id_ensure() {
            const user_id = this.user_id();
            if (!user_id)
                throw new Error('Required user_id in session');
            return user_id;
        }
        logged() { return Boolean(this.token()); }
        logout() { return this.token(null, 'logout'); }
    }
    __decorate([
        $mol_action
    ], $yuf_session.prototype, "token_grab", null);
    __decorate([
        $mol_mem
    ], $yuf_session.prototype, "logged", null);
    $.$yuf_session = $yuf_session;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_promise extends $mol_promise {
        _value = undefined;
        _timer = null;
        id = $mol_guid();
        deadline(deadline = 30_000, error = new Error('Request Timeout')) {
            this._timer = new $mol_after_timeout(deadline, () => this.value(error));
        }
        resolved() {
            return this._value !== undefined;
        }
        value(next) {
            if (next === undefined) {
                if (this._value === undefined)
                    $mol_fail_hidden(this.catch(e => null));
                return this._value;
            }
            this._timer?.destructor();
            this._timer = null;
            this._value = next;
            if (next instanceof Error)
                return this.fail(next);
            this.done(next);
            return this._value;
        }
    }
    $.$yuf_promise = $yuf_promise;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_ws_statefull_channel extends $mol_object {
        host;
        signature;
        constructor(host, signature) {
            super();
            this.host = host;
            this.signature = signature;
        }
        ready() {
            return this.host.ready();
        }
        send_data(data, req_id, op) {
            if (data === undefined && !op)
                this.subscribed = true;
            this.host.send_object({
                ...this.signature,
                data,
                req_id,
                error: op === 'unsubscribe' ? null : undefined,
            });
        }
        deadline_timeout() { return this.host.deadline_timeout(); }
        response = null;
        subscribed = false;
        receive(message) {
            const data = message.data === undefined ? {} : message.data;
            if (this.response && (!message.req_id || this.response.id === message.req_id)) {
                return this.response.value(data);
            }
            try {
                this.data(data, 'cache');
            }
            catch (err) {
                if (err !== data)
                    $mol_fail_hidden(err);
            }
        }
        data(next, cache) {
            if (next !== undefined && cache === 'cache') {
                return next;
            }
            const prev = $mol_wire_probe(() => this.data());
            if (!this.response && (next !== undefined || prev === undefined)) {
                this.response = new $yuf_promise();
                const deadline = this.deadline_timeout();
                this.response.deadline(deadline, new Error($mol_rest_code[$mol_rest_code['Request Timeout']], { cause: { ...this.signature, deadline }
                }));
            }
            if (next !== undefined || this.ready()) {
                this.send_data(cache === 'refresh' ? undefined : next, this.response?.id);
            }
            const value = this.response ? this.response.value() : (prev ?? null);
            this.response = null;
            if (value instanceof Error)
                $mol_fail_hidden(value);
            return value;
        }
        destructor() {
            if (!this.subscribed)
                return;
            try {
                this.send_data(null, undefined, 'unsubscribe');
            }
            catch (e) {
                $mol_fail_log(e);
            }
        }
    }
    __decorate([
        $mol_action
    ], $yuf_ws_statefull_channel.prototype, "send_data", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_statefull_channel.prototype, "data", null);
    $.$yuf_ws_statefull_channel = $yuf_ws_statefull_channel;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_ws_statefull extends $yuf_ws_host {
        session() { return this.$.$mol_one.$yuf_session; }
        is_ping(msg) { return msg.type === 'ping'; }
        send_pong() { this.send_object({ type: 'pong' }); }
        send_ping() { this.send_object({ type: 'ping' }); }
        send_auth(token) { this.send_object({ type: 'auth', data: { token } }); }
        token_sended() {
            if (!this.opened())
                return null;
            const token = this.session().token();
            this.error(null);
            if (!token)
                return null;
            this.send_auth(token);
            return token;
        }
        message_signature({ type, query, device, id }) {
            return { type, id, query, device };
        }
        code_normalize(code) {
            return '' + code;
        }
        message(obj) {
            if (Array.isArray(obj))
                return null;
            if (!('type' in obj) && !('error' in obj))
                return null;
            if (obj.error === null)
                return null;
            const code = obj.error ? (this.code_normalize(obj.error) || obj.error) : null;
            if (!code)
                return obj;
            throw new Error(code, { cause: obj });
        }
        deadline_timeout() { return 10000; }
        channel(signature) {
            return new this.$.$yuf_ws_statefull_channel(this, signature);
        }
        data(signature, data, refresh) {
            return this.channel(signature).data(data, refresh);
        }
        restart_count(next) {
            return next ?? (($mol_wire_probe(() => this.restart_count()) ?? -1) + 1);
        }
        restarts_to_logout() { return 3; }
        ws(reset) {
            const count = this.restart_count(null);
            if (count >= this.restarts_to_logout())
                this.logout();
            return super.ws(reset);
        }
        logout() {
            new $mol_after_frame($mol_wire_async(() => {
                try {
                    this.session().logout();
                }
                catch (e) {
                    if ($mol_promise_like(e))
                        $mol_fail_hidden(e);
                    $mol_fail_log(e);
                }
            }));
        }
        on_object(obj) {
            const signature = this.message_signature(obj);
            const channel = signature.type ? $mol_wire_probe(() => this.channel(signature)) : null;
            try {
                this.restart_count(0);
                const message = this.message(obj);
                if (message)
                    channel?.receive(message);
            }
            catch (error) {
                if (error instanceof Error && this.auth_need(error)) {
                    this.logout();
                }
                if (!channel)
                    $mol_fail_hidden(error);
                const req_id = error instanceof Error && typeof error.cause === 'object'
                    ? (error.cause?.req_id ?? null)
                    : null;
                channel.receive({ data: error, req_id });
            }
        }
        auth_need(error) {
            return error.message === 'Unauthorized'
                || error.message === 'Forbidden'
                || error.message === 'AUTH_FAILED';
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_ws_statefull.prototype, "token_sended", null);
    __decorate([
        $mol_mem_key
    ], $yuf_ws_statefull.prototype, "channel", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_statefull.prototype, "restart_count", null);
    __decorate([
        $mol_mem
    ], $yuf_ws_statefull.prototype, "ws", null);
    $.$yuf_ws_statefull = $yuf_ws_statefull;
})($ || ($ = {}));

;
	($.$mol_icon_sync) = class $mol_icon_sync extends ($.$mol_icon) {
		path(){
			return "M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_sync_off) = class $mol_icon_sync_off extends ($.$mol_icon) {
		path(){
			return "M20,4H14V10L16.24,7.76C17.32,8.85 18,10.34 18,12C18,13 17.75,13.94 17.32,14.77L18.78,16.23C19.55,15 20,13.56 20,12C20,9.79 19.09,7.8 17.64,6.36L20,4M2.86,5.41L5.22,7.77C4.45,9 4,10.44 4,12C4,14.21 4.91,16.2 6.36,17.64L4,20H10V14L7.76,16.24C6.68,15.15 6,13.66 6,12C6,11 6.25,10.06 6.68,9.23L14.76,17.31C14.5,17.44 14.26,17.56 14,17.65V19.74C14.79,19.53 15.54,19.2 16.22,18.78L18.58,21.14L19.85,19.87L4.14,4.14L2.86,5.41M10,6.35V4.26C9.2,4.47 8.45,4.8 7.77,5.22L9.23,6.68C9.5,6.56 9.73,6.44 10,6.35Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_sync_alert) = class $mol_icon_sync_alert extends ($.$mol_icon) {
		path(){
			return "M11,13H13V7H11M21,4H15V10L17.24,7.76C18.32,8.85 19,10.34 19,12C19,14.61 17.33,16.83 15,17.65V19.74C18.45,18.85 21,15.73 21,12C21,9.79 20.09,7.8 18.64,6.36M11,17H13V15H11M3,12C3,14.21 3.91,16.2 5.36,17.64L3,20H9V14L6.76,16.24C5.68,15.15 5,13.66 5,12C5,9.39 6.67,7.17 9,6.35V4.26C5.55,5.15 3,8.27 3,12Z";
		}
	};


;
"use strict";

;
	($.$yuf_ws_icon) = class $yuf_ws_icon extends ($.$mol_icon_sync) {
		Error_icon(){
			const obj = new this.$.$mol_icon_sync_off();
			return obj;
		}
		Open_icon(){
			const obj = new this.$.$mol_icon_sync();
			return obj;
		}
		Connecting_icon(){
			const obj = new this.$.$mol_icon_sync_alert();
			return obj;
		}
		status(){
			return "";
		}
		status_icon(){
			return {
				"error": (this.Error_icon()), 
				"open": (this.Open_icon()), 
				"connecting": (this.Connecting_icon())
			};
		}
	};
	($mol_mem(($.$yuf_ws_icon.prototype), "Error_icon"));
	($mol_mem(($.$yuf_ws_icon.prototype), "Open_icon"));
	($mol_mem(($.$yuf_ws_icon.prototype), "Connecting_icon"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_ws_icon extends $.$yuf_ws_icon {
            path() {
                return this.status_icon()[this.status()]?.path() ?? super.path();
            }
        }
        $$.$yuf_ws_icon = $yuf_ws_icon;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_ws_status) = class $yuf_ws_status extends ($.$mol_view) {
		title_formatted(){
			return (this.title());
		}
		error_message(){
			return (this.ws().error_message());
		}
		reset_error(next){
			if(next !== undefined) return next;
			return null;
		}
		Ws_error(){
			const obj = new this.$.$mol_speck();
			(obj.event) = () => ({"click": (next) => (this.reset_error(next))});
			(obj.value) = () => ((this.error_message()));
			return obj;
		}
		ws_error_content(){
			return [(this.Ws_error())];
		}
		status(){
			return "error";
		}
		Icon(){
			const obj = new this.$.$yuf_ws_icon();
			(obj.status) = () => ((this.status()));
			return obj;
		}
		attr(){
			return {...(super.attr()), "title": (this.title_formatted())};
		}
		ws(){
			const obj = new this.$.$yuf_ws_host();
			return obj;
		}
		title(){
			return (this.$.$mol_locale.text("$yuf_ws_status_title"));
		}
		status_message(){
			return {
				"error": (this.$.$mol_locale.text("$yuf_ws_status_status_message_error")), 
				"open": (this.$.$mol_locale.text("$yuf_ws_status_status_message_open")), 
				"connecting": (this.$.$mol_locale.text("$yuf_ws_status_status_message_connecting"))
			};
		}
		sub(){
			return [...(this.ws_error_content()), (this.Icon())];
		}
	};
	($mol_mem(($.$yuf_ws_status.prototype), "reset_error"));
	($mol_mem(($.$yuf_ws_status.prototype), "Ws_error"));
	($mol_mem(($.$yuf_ws_status.prototype), "Icon"));
	($mol_mem(($.$yuf_ws_status.prototype), "ws"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_ws_status extends $.$yuf_ws_status {
            ws_error_content() {
                return this.error_message() ? super.ws_error_content() : [];
            }
            status() {
                const ws = this.ws();
                if (ws.error_message())
                    return 'error';
                if (ws.ready())
                    return 'open';
                return 'connecting';
            }
            reset_error(e) {
                e && $mol_dom_event.wrap(e)?.prevented(true);
                this.ws().error(null);
            }
            title_formatted() {
                const message = this.status_message()[this.status()] || this.status_message().error;
                return super.title().replace('{status}', message);
            }
        }
        $$.$yuf_ws_status = $yuf_ws_status;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class timeout_promise extends $mol_promise {
        task;
        succcess() {
            this.task = null;
            this.done();
        }
        destructor() {
            this.task?.destructor();
            this.task = null;
        }
    }
    function $yuf_wait_timeout_async(timeout) {
        const promise = new timeout_promise();
        promise.task = new this.$mol_after_timeout(timeout, () => promise.succcess());
        return promise;
    }
    $.$yuf_wait_timeout_async = $yuf_wait_timeout_async;
    class $yuf_wait_timeout_wrap extends $mol_object {
        timeout;
        constructor(timeout) {
            super();
            this.timeout = timeout;
        }
        destructor() {
            this.promise?.destructor();
        }
        promise = null;
        wait() {
            if (this.promise && !this.promise.task)
                return;
            this.promise?.destructor();
            this.promise = this.$.$yuf_wait_timeout_async(this.timeout);
            $mol_fail_hidden(this.promise);
        }
        static timeout(timeout) {
            return new $yuf_wait_timeout_wrap(timeout);
        }
    }
    __decorate([
        $mol_action
    ], $yuf_wait_timeout_wrap, "timeout", null);
    $.$yuf_wait_timeout_wrap = $yuf_wait_timeout_wrap;
    function $yuf_wait_timeout(timeout) {
        return this.$yuf_wait_timeout_wrap.timeout(timeout).wait();
    }
    $.$yuf_wait_timeout = $yuf_wait_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_entity2 extends $mol_object {
        factory() {
            return this.$.$yuf_entity2;
        }
        static active = {};
        static active_model(signature) {
            return this.active[JSON.stringify(signature)] ?? null;
        }
        propagate() {
            if (this.$.$yuf_entity2.prototype.mock === this.mock)
                return;
            this.factory().active[this.toString()] = this;
        }
        destructor() {
            this.draft(null);
            if (this.$.$yuf_entity2.prototype.mock === this.mock)
                return;
            delete this.factory().active[this.toString()];
        }
        static draft_creator_ids(next) {
            const key = `${this}.draft_creator_ids()`;
            const storage = this.$.$mol_state_local;
            const prev = storage.value(key);
            if (next === undefined)
                return prev ?? {};
            next = { ...prev, ...next };
            for (let k in next) {
                if (!next[k])
                    delete next[k];
            }
            return storage.value(key, next) ?? {};
        }
        static draft_id_create() { return $mol_guid(); }
        static draft_ids(creator_id, draft_ids) {
            const draft_creator_dict = this.draft_creator_ids(!draft_ids ? draft_ids : Object.fromEntries(draft_ids.map(draft_id => [draft_id || this.draft_id_create(), creator_id])));
            return Object.keys(draft_creator_dict).filter(id => draft_creator_dict[id] === creator_id);
        }
        static creator_id(draft_id, next) {
            return this.draft_creator_ids(next === null ? { [draft_id]: null } : undefined)[draft_id] ?? null;
        }
        static draft(id, next) {
            return this.$.$mol_state_local.value(`${this}.draft("${id}")`, next) ?? null;
        }
        is_draft(next, flag) {
            const id = this.id();
            const factory = this.factory();
            const is_draft = Boolean(factory.creator_id(id));
            if (next !== null)
                return is_draft;
            factory.creator_id(id, next);
            return flag === 'storage' ? is_draft : false;
        }
        draft(next, flag) {
            const id = this.id();
            const factory = this.factory();
            const prev = factory.draft(id);
            if (next === undefined)
                return prev;
            if (next || flag === 'fill') {
                const merged = this.merge(next ?? this.data() ?? this.defaults(), prev);
                return factory.draft(id, merged);
            }
            const result = factory.draft(id, next);
            this.is_draft(next, flag);
            if (flag === 'storage')
                return prev;
            return result;
        }
        _id = '';
        id() { return this._id; }
        defaults(raw) { return {}; }
        mock(prev) {
            return null;
        }
        mock_periodically() { return false; }
        draft_value(field, next) {
            const draft = this.draft(next === undefined ? undefined : { [field]: next })?.[field] ?? null;
            return draft === undefined ? this.value(field) : (draft ?? null);
        }
        value(field, next) {
            return this.data(next === undefined ? undefined : { [field]: next })?.[field] ?? this.defaults()[field];
        }
        actual(next, refresh) {
            return next ?? null;
        }
        data(next, cache) {
            let actual;
            if (next === undefined) {
                actual = this.is_draft() ? this.draft() : this.actual();
            }
            else if (cache) {
                actual = next;
            }
            else if (next === null) {
                actual = this.is_draft() ? this.draft(next, 'storage') : this.actual(next);
            }
            else {
                actual = this.actual_push_debounced(next);
            }
            if (actual === null)
                return null;
            if (actual instanceof Error)
                return actual;
            return this.defaults(this.merge(actual));
        }
        merge(actual, prev = $mol_wire_probe(() => this.data())) {
            if (this.defaults() instanceof Array) {
                if (actual instanceof Array)
                    return actual;
                return prev ?? [];
            }
            return { ...prev, ...actual };
        }
        debounce_timeout() { return 100; }
        patch_enabled() { return false; }
        actual_push_task() {
            const draft = this.draft();
            const is_creating = this.is_draft();
            if (!draft)
                return null;
            const debounce_timeout = this.debounce_timeout();
            if (debounce_timeout) {
                this.$.$yuf_wait_timeout(debounce_timeout);
            }
            const data = this.patch_enabled() ? draft : this.defaults(this.merge(draft));
            const actual = this.actual(data);
            const result = actual ? this.merge(actual, data) : null;
            if (!is_creating) {
                this.draft(null);
                return result;
            }
            const server_id = actual ? this.server_created_id(actual) : null;
            const id = this.id();
            if (!server_id || server_id === id) {
                this.resubscribe();
                return result;
            }
            this.$.$mol_log3_warn({
                place: `${this.constructor}.pushing`,
                message: 'server creates new id, entity is dead',
                name: this.toString(),
                hint: 'Avoid non-idempotent server API when creating entities',
            });
            this.draft(null, 'storage');
            return result;
        }
        resubscribe() {
            new $mol_after_frame($mol_wire_async(() => this.actual(null, 'refresh')));
            this.draft(null);
            this.data();
        }
        actual_push_debounced(next) {
            this.draft(next);
            return this.actual_push_task();
        }
        server_created_id(actual = this.data()) {
            return !Array.isArray(actual) ? actual.id || null : null;
        }
        remove() {
            this.data(null);
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_entity2.prototype, "is_draft", null);
    __decorate([
        $mol_mem_key
    ], $yuf_entity2.prototype, "draft_value", null);
    __decorate([
        $mol_mem_key
    ], $yuf_entity2.prototype, "value", null);
    __decorate([
        $mol_mem
    ], $yuf_entity2.prototype, "data", null);
    __decorate([
        $mol_mem
    ], $yuf_entity2.prototype, "actual_push_task", null);
    __decorate([
        $mol_action
    ], $yuf_entity2.prototype, "resubscribe", null);
    __decorate([
        $mol_action
    ], $yuf_entity2.prototype, "actual_push_debounced", null);
    __decorate([
        $mol_action
    ], $yuf_entity2.prototype, "server_created_id", null);
    __decorate([
        $mol_action
    ], $yuf_entity2.prototype, "remove", null);
    __decorate([
        $mol_mem_key
    ], $yuf_entity2, "draft_ids", null);
    __decorate([
        $mol_mem_key
    ], $yuf_entity2, "creator_id", null);
    $.$yuf_entity2 = $yuf_entity2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_ws_entity extends $yuf_entity2 {
        type() { return ''; }
        query() { return {}; }
        device() { return []; }
        signature() {
            const query = this.query();
            const device = this.device();
            let id = this.id() || undefined;
            if (id && device.includes(id))
                id = undefined;
            return {
                type: this.type(),
                id,
                query: Object.keys(query).length ? query : undefined,
                device: device.length ? device : undefined,
            };
        }
        ws() { return this.$.$mol_one.$yuf_ws_statefull; }
        actual(next, refresh) {
            this.propagate();
            return this.ws().data(this.signature(), next, refresh);
        }
        toString() { return JSON.stringify(this.signature()); }
    }
    __decorate([
        $mol_mem
    ], $yuf_ws_entity.prototype, "signature", null);
    $.$yuf_ws_entity = $yuf_ws_entity;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_entity2_store extends $yuf_entity2 {
        defaults(raw) {
            return [...raw ?? []];
        }
        ids(next, cache) {
            return (this.data(next, cache) ?? []);
        }
        id_remove(id) {
            const ids = $mol_wire_probe(() => this.ids());
            if (ids?.length)
                this.ids(ids.filter(cur => cur !== id), 'cache');
        }
        id_add(id) {
            const ids = this.ids();
            if (ids && !ids.includes(id))
                this.ids([id, ...ids], 'cache');
        }
        store_id() { return this.toString(); }
        draft_ids(next) {
            return this.$.$yuf_entity2.draft_ids(this.store_id(), next);
        }
        draft_id(next = '') {
            let id = this.draft_ids()?.[0];
            if (!id) {
                id = this.draft_ids([next])[0];
            }
            return id;
        }
        by_id(id) {
            throw new Error(`Implement ${this}.by_id()`);
        }
    }
    __decorate([
        $mol_action
    ], $yuf_entity2_store.prototype, "id_remove", null);
    __decorate([
        $mol_action
    ], $yuf_entity2_store.prototype, "id_add", null);
    __decorate([
        $mol_action
    ], $yuf_entity2_store.prototype, "draft_id", null);
    __decorate([
        $mol_mem_key
    ], $yuf_entity2_store.prototype, "by_id", null);
    $.$yuf_entity2_store = $yuf_entity2_store;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_ws_entity_store extends $yuf_entity2_store {
        type() { return ''; }
        query() { return {}; }
        device() {
            return this.id() ? [this.id()] : [];
        }
        signature() {
            const query = this.query();
            const device = this.device();
            return {
                type: this.type(),
                id: this.id() || undefined,
                query: Object.keys(query).length ? query : undefined,
                device: device.length ? device : undefined,
            };
        }
        ws() { return this.$.$mol_one.$yuf_ws_statefull; }
        actual(next, refresh) {
            this.propagate();
            return this.ws().data(this.signature(), next, refresh);
        }
        toString() { return JSON.stringify(this.signature()); }
    }
    __decorate([
        $mol_mem
    ], $yuf_ws_entity_store.prototype, "signature", null);
    $.$yuf_ws_entity_store = $yuf_ws_entity_store;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_data_record(sub) {
        return $mol_data_setup((val) => {
            let res = {};
            for (const field in sub) {
                try {
                    res[field] =
                        sub[field](val[field]);
                }
                catch (error) {
                    if (error instanceof Promise)
                        return $mol_fail_hidden(error);
                    error.message = `[${JSON.stringify(field)}] ${error.message}`;
                    return $mol_fail(error);
                }
            }
            return res;
        }, sub);
    }
    $.$mol_data_record = $mol_data_record;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$yuf_karaoke_model_data = $mol_data_record({
        title: $mol_data_string,
        audio_url: $mol_data_string,
        lyrics: $mol_data_string,
    });
    class $yuf_karaoke_model extends $yuf_ws_entity {
        type() {
            return 'karaoke';
        }
        defaults(raw) {
            return $.$yuf_karaoke_model_data({
                title: '',
                audio_url: '',
                lyrics: '',
                ...raw,
            });
        }
        title(next) {
            const a = this.value('title', next);
            return a;
        }
        audio_url(next) {
            return this.value('audio_url', next);
        }
        lyrics(next) {
            return this.value('lyrics', next);
        }
        lyrics_blob() {
            return new Blob([this.lyrics()], { type: 'text/vtt' });
        }
        lyrics_url() {
            return this.$.$yuf_url_object.from_blob(this.lyrics_blob()).url;
        }
    }
    __decorate([
        $mol_mem
    ], $yuf_karaoke_model.prototype, "lyrics_blob", null);
    __decorate([
        $mol_mem
    ], $yuf_karaoke_model.prototype, "lyrics_url", null);
    $.$yuf_karaoke_model = $yuf_karaoke_model;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_karaoke_store extends $yuf_ws_entity_store {
        type() { return 'karaokes'; }
        by_id(id) {
            return this.$.$yuf_karaoke_model.make({
                _id: id,
            });
        }
    }
    __decorate([
        $mol_mem_key
    ], $yuf_karaoke_store.prototype, "by_id", null);
    $.$yuf_karaoke_store = $yuf_karaoke_store;
})($ || ($ = {}));

;
	($.$mol_icon_edit) = class $mol_icon_edit extends ($.$mol_icon) {
		path(){
			return "M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_restore) = class $mol_icon_restore extends ($.$mol_icon) {
		path(){
			return "M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z";
		}
	};


;
"use strict";

;
	($.$mol_form_draft) = class $mol_form_draft extends ($.$mol_form) {
		reset_title(){
			return (this.$.$mol_locale.text("$mol_form_draft_reset_title"));
		}
		Reset_icon(){
			const obj = new this.$.$mol_icon_restore();
			return obj;
		}
		Reset(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.reset_title()));
			(obj.sub) = () => ([(this.Reset_icon())]);
			(obj.click) = (next) => ((this.reset(next)));
			return obj;
		}
		model(){
			const obj = new this.$.$mol_object2();
			return obj;
		}
		model_pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		changed(){
			return false;
		}
		state(next){
			if(next !== undefined) return next;
			return null;
		}
		state_pick(id, next){
			if(next !== undefined) return next;
			return null;
		}
		value(id, next){
			if(next !== undefined) return next;
			return null;
		}
		value_str(id, next){
			if(next !== undefined) return next;
			return "";
		}
		value_bool(id, next){
			if(next !== undefined) return next;
			return false;
		}
		value_number(id, next){
			if(next !== undefined) return next;
			return 0;
		}
		dictionary_bool(id, next){
			if(next !== undefined) return next;
			return {};
		}
		list_string(id, next){
			if(next !== undefined) return next;
			return [];
		}
		value_changed(id){
			return false;
		}
		reset(next){
			if(next !== undefined) return next;
			return null;
		}
		done(next){
			if(next !== undefined) return next;
			return null;
		}
		buttons(){
			return [(this.Submit()), (this.Reset())];
		}
	};
	($mol_mem(($.$mol_form_draft.prototype), "Reset_icon"));
	($mol_mem(($.$mol_form_draft.prototype), "Reset"));
	($mol_mem(($.$mol_form_draft.prototype), "model"));
	($mol_mem_key(($.$mol_form_draft.prototype), "model_pick"));
	($mol_mem(($.$mol_form_draft.prototype), "state"));
	($mol_mem_key(($.$mol_form_draft.prototype), "state_pick"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_str"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_bool"));
	($mol_mem_key(($.$mol_form_draft.prototype), "value_number"));
	($mol_mem_key(($.$mol_form_draft.prototype), "dictionary_bool"));
	($mol_mem_key(($.$mol_form_draft.prototype), "list_string"));
	($mol_mem(($.$mol_form_draft.prototype), "reset"));
	($mol_mem(($.$mol_form_draft.prototype), "done"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_wire_race(...tasks) {
        const results = tasks.map(task => {
            try {
                return task();
            }
            catch (error) {
                return error;
            }
        });
        const promises = results.filter(res => $mol_promise_like(res));
        if (promises.length)
            $mol_fail(Promise.race(promises));
        const error = results.find(res => res instanceof Error);
        if (error)
            $mol_fail(error);
        return results;
    }
    $.$mol_wire_race = $mol_wire_race;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function norm_string(val) {
            return String(val ?? '');
        }
        function norm_number(val) {
            return Number(val ?? 0);
        }
        function norm_bool(val) {
            return Boolean(val ?? false);
        }
        function normalize_val(prev, next) {
            switch (typeof prev) {
                case 'boolean': return String(next) === 'true';
                case 'number': return Number(next);
                case 'string': return String(next);
            }
            return next;
        }
        class $mol_form_draft extends $.$mol_form_draft {
            list_string(field, next) {
                return this.value(field, next)?.map(norm_string) ?? [];
            }
            dictionary_bool(field, next) {
                if (next) {
                    const prev = this.model_pick(field);
                    const normalized = {};
                    for (const key in next) {
                        if (next[key] || key in prev)
                            normalized[key] = next[key];
                    }
                    return this.value(field, normalized) ?? {};
                }
                return this.value(field) ?? {};
            }
            value_str(field, next) {
                return norm_string(this.value(field, next));
            }
            value_number(field, next) {
                return norm_number(this.value(field, next));
            }
            value_bool(field, next) {
                return norm_bool(this.value(field, next));
            }
            model_pick(field, next) {
                return this.model()[field](next);
            }
            state_pick(field, next) {
                return this.state(next === undefined ? next : { ...this.state(), [field]: next })[field];
            }
            value(field, next) {
                if (Array.isArray(next) && next.length === 0 && !this.model_pick(field))
                    next = null;
                return this.state_pick(field, next) ?? this.model_pick(field);
            }
            value_changed(field) {
                const prev = $mol_wire_probe(() => this.value_changed(field));
                try {
                    const next = this.state_pick(field);
                    const prev = this.model_pick(field);
                    const next_norm = normalize_val(prev, next);
                    return !$mol_compare_deep(next_norm, prev);
                }
                catch (e) {
                    $mol_fail_log(e);
                    return prev ?? false;
                }
            }
            state(next) {
                return this.$.$mol_state_local.value(`${this}.state()`, next) ?? {};
            }
            changed() {
                return Object.keys(this.state()).some(field => this.value_changed(field));
            }
            reset(next) {
                this.state(null);
            }
            result(next) {
                this.state();
                if (next instanceof Error)
                    next = this.errors()[next.message] || next.message || this.form_invalid();
                return next ?? '';
            }
            buttons() {
                return [
                    this.Submit(),
                    ...this.changed() ? [this.Reset()] : [],
                    ...this.result() ? [this.Result()] : [],
                ];
            }
            save(next) {
                const tasks = Object.entries(this.state()).map(([field, next]) => () => {
                    const prev = this.model_pick(field);
                    return {
                        field,
                        next: normalize_val(prev, next)
                    };
                });
                const normalized = $mol_wire_race(...tasks);
                $mol_wire_race(...normalized.map(({ field, next }) => () => this.model_pick(field, next)));
                this.reset();
                this.done(next);
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_form_draft.prototype, "list_string", null);
        __decorate([
            $mol_mem_key
        ], $mol_form_draft.prototype, "dictionary_bool", null);
        __decorate([
            $mol_mem_key
        ], $mol_form_draft.prototype, "value_str", null);
        __decorate([
            $mol_mem_key
        ], $mol_form_draft.prototype, "value_number", null);
        __decorate([
            $mol_mem_key
        ], $mol_form_draft.prototype, "value_bool", null);
        __decorate([
            $mol_mem_key
        ], $mol_form_draft.prototype, "value", null);
        __decorate([
            $mol_mem_key
        ], $mol_form_draft.prototype, "value_changed", null);
        __decorate([
            $mol_mem
        ], $mol_form_draft.prototype, "state", null);
        __decorate([
            $mol_mem
        ], $mol_form_draft.prototype, "changed", null);
        __decorate([
            $mol_mem
        ], $mol_form_draft.prototype, "result", null);
        __decorate([
            $mol_mem
        ], $mol_form_draft.prototype, "buttons", null);
        __decorate([
            $mol_action
        ], $mol_form_draft.prototype, "save", null);
        $$.$mol_form_draft = $mol_form_draft;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_form_draft, {
            width: '100%',
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_karaoke_form) = class $yuf_karaoke_form extends ($.$mol_form_draft) {
		title_name(){
			return (this.$.$mol_locale.text("$yuf_karaoke_form_title_name"));
		}
		Title(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.value_str("title", next)));
			return obj;
		}
		Title_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.title_name()));
			(obj.control) = () => ((this.Title()));
			return obj;
		}
		title_field_content(){
			return [(this.Title_field())];
		}
		audio_url_name(){
			return (this.$.$mol_locale.text("$yuf_karaoke_form_audio_url_name"));
		}
		Audio_url(){
			const obj = new this.$.$mol_string();
			(obj.value) = (next) => ((this.value_str("audio_url", next)));
			return obj;
		}
		Audio_url_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.audio_url_name()));
			(obj.control) = () => ((this.Audio_url()));
			return obj;
		}
		lyrics_name(){
			return (this.$.$mol_locale.text("$yuf_karaoke_form_lyrics_name"));
		}
		lyrics_syntax(){
			return null;
		}
		Lyrics(){
			const obj = new this.$.$yuf_textarea();
			(obj.syntax) = () => ((this.lyrics_syntax()));
			(obj.value) = (next) => ((this.value_str("lyrics", next)));
			return obj;
		}
		Lyrics_field(){
			const obj = new this.$.$mol_form_field();
			(obj.name) = () => ((this.lyrics_name()));
			(obj.control) = () => ((this.Lyrics()));
			return obj;
		}
		model(){
			const obj = new this.$.$yuf_karaoke_model();
			return obj;
		}
		body(){
			return [
				...(this.title_field_content()), 
				(this.Audio_url_field()), 
				(this.Lyrics_field())
			];
		}
	};
	($mol_mem(($.$yuf_karaoke_form.prototype), "Title"));
	($mol_mem(($.$yuf_karaoke_form.prototype), "Title_field"));
	($mol_mem(($.$yuf_karaoke_form.prototype), "Audio_url"));
	($mol_mem(($.$yuf_karaoke_form.prototype), "Audio_url_field"));
	($mol_mem(($.$yuf_karaoke_form.prototype), "Lyrics"));
	($mol_mem(($.$yuf_karaoke_form.prototype), "Lyrics_field"));
	($mol_mem(($.$yuf_karaoke_form.prototype), "model"));


;
"use strict";
var $;
(function ($) {
    $.$yuf_karaoke_syntax_flow = new $mol_syntax2({
        'code-global': /^\s*WEBVTT\s*$/,
        'code-field': /^(?:STYLE[-\s]*)([^]*?)^([\r\n])?$([\r\n]*)/,
        'code-comment-block': /^NOTE[\r\n]+([\s\S]*?)^(?:[\r\n])?$(?:[\r\n]*)/,
        'code-comment-inline': /^NOTE[-\s]*(.*)$/,
        'code-tag': /^(\d+)(?:\s+-\s*([\w\d\s]+))?$/,
        'code-keyword': /^([\d\.:]+)\s*-->\s*([\d\.:]+)(?:\s+([\w\d\s]+))?$/,
        'brace-open': /<{2}/,
        'brace-close': />{2}/,
        'code-number': /<(\d+[\d\.:]+)>/,
        'block-splitter': /[\r\n]{2,}/,
        'row-slitter': /[\r\n]/,
    });
    function $yuf_karaoke_syntax_parse(str) {
        let need_new_block = true;
        let need_new_row = true;
        let time_min = 0;
        let time_max = 0;
        let groups = [];
        this.$yuf_karaoke_syntax_flow.tokenize(str, (name, found, chunks) => {
            if (name === 'code-keyword') {
                const [min, max] = chunks;
                time_min = str_to_ms(min);
                time_max = str_to_ms(max);
            }
            if (name === 'block-splitter') {
                need_new_row = need_new_block = true;
                const rows = groups.at(-1);
                if (time_max && rows?.length) {
                    rows[rows.length - 1].push(time_max, ' ');
                }
                time_max = 0;
            }
            if (name === 'row-slitter') {
                need_new_row = true;
            }
            if (name === 'code-number') {
                const [min,] = chunks;
                time_min = str_to_ms(min);
            }
            if (name === '') {
                if (need_new_block)
                    groups.push([]);
                const rows = groups[groups.length - 1];
                if (need_new_row)
                    rows.push([]);
                need_new_block = need_new_row = false;
                rows[rows.length - 1].push(time_min, chunks[0]);
            }
        });
        return groups;
    }
    $.$yuf_karaoke_syntax_parse = $yuf_karaoke_syntax_parse;
    function str_to_ms(str) {
        const [, h, m, s, msec] = str.match(/(?:(\d+):)?(\d+):(\d+)(?:\.(\d+))?/) ?? [];
        let ms = 0;
        if (h)
            ms += Number(h) * 60 * 60 * 1000;
        if (m)
            ms += Number(m) * 60 * 1000;
        if (s)
            ms += Number(s) * 1000;
        if (msec)
            ms += Number(msec);
        return ms;
    }
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_karaoke_form extends $.$yuf_karaoke_form {
            lyrics_syntax() {
                return this.$.$yuf_karaoke_syntax_flow;
            }
        }
        $$.$yuf_karaoke_form = $yuf_karaoke_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_karaoke_text) = class $yuf_karaoke_text extends ($.$mol_view) {
		ids(id){
			return [];
		}
		hilited_length(id){
			return 0;
		}
		row_text(id){
			return "";
		}
		Group(id){
			const obj = new this.$.$yuf_karaoke_text_group();
			(obj.ids) = () => ((this.ids(id)));
			(obj.hilited_length) = (id) => ((this.hilited_length(id)));
			(obj.row_text) = (id) => ((this.row_text(id)));
			return obj;
		}
		group_content(){
			return [(this.Group("0"))];
		}
		uri(){
			return "";
		}
		time(){
			return 0;
		}
		sub(){
			return [...(this.group_content())];
		}
	};
	($mol_mem_key(($.$yuf_karaoke_text.prototype), "Group"));
	($.$yuf_karaoke_text_group) = class $yuf_karaoke_text_group extends ($.$mol_view) {
		hilited_length(id){
			return 0;
		}
		row_text(id){
			return "";
		}
		Row(id){
			const obj = new this.$.$yuf_karaoke_text_row();
			(obj.hilited_length) = () => ((this.hilited_length(id)));
			(obj.text) = () => ((this.row_text(id)));
			return obj;
		}
		row_content(){
			return [(this.Row(id))];
		}
		ids(){
			return [];
		}
		sub(){
			return [...(this.row_content())];
		}
	};
	($mol_mem_key(($.$yuf_karaoke_text_group.prototype), "Row"));
	($.$yuf_karaoke_text_row) = class $yuf_karaoke_text_row extends ($.$mol_view) {
		hilited_prefix(){
			return "";
		}
		Hilited(){
			const obj = new this.$.$mol_view();
			(obj.dom_name) = () => ("span");
			(obj.sub) = () => ([(this.hilited_prefix())]);
			return obj;
		}
		text(){
			return "";
		}
		content(){
			return [(this.Hilited()), (this.text())];
		}
		hilited_length(){
			return 0;
		}
		sub(){
			return (this.content());
		}
	};
	($mol_mem(($.$yuf_karaoke_text_row.prototype), "Hilited"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_karaoke_text extends $.$yuf_karaoke_text {
            data_raw() {
                return this.$.$mol_fetch.success(this.uri()).text();
            }
            data() {
                return this.$.$yuf_karaoke_syntax_parse(this.data_raw());
            }
            groups() { return this.data(); }
            group_content() {
                return this.groups().map((_, index) => this.Group(index));
            }
            ids(group_index) {
                return this.groups()[group_index].map((_, row_index) => [group_index, row_index]);
            }
            row_text([group_index, row_index]) {
                const row = this.groups()[group_index][row_index];
                return row.filter(token => typeof token === 'string').join('');
            }
            hilited_group_index_last() {
                return this.groups().findLastIndex((_, group) => this.hilited_length([group, 0]) > 0);
            }
            scroll_task() {
                const index = this.hilited_group_index_last();
                const group = index >= 0 ? this.Group(index) : null;
                group && this.ensure_visible(group);
                return null;
            }
            auto() {
                this.scroll_task();
                return super.auto();
            }
            hilited_length([group_index, row_index]) {
                const time_current = this.time() * 1000;
                const row = this.groups()[group_index][row_index];
                let pos = 0;
                let prev_time = 0;
                for (let i = 0; i < row.length; i++) {
                    const val = row[i];
                    let next_time = row[i + 1];
                    if (typeof val === 'string') {
                        const range_full = (typeof next_time === 'number' ? next_time : 0) - prev_time;
                        const range_part = time_current - prev_time;
                        const part = range_full > 0 ? range_part / range_full : 1;
                        pos += Math.min(val.length, Math.floor(val.length * part));
                        continue;
                    }
                    if (val >= time_current) {
                        break;
                    }
                    prev_time = val;
                }
                return pos;
            }
        }
        __decorate([
            $mol_mem
        ], $yuf_karaoke_text.prototype, "data_raw", null);
        __decorate([
            $mol_mem
        ], $yuf_karaoke_text.prototype, "data", null);
        __decorate([
            $mol_mem_key
        ], $yuf_karaoke_text.prototype, "row_text", null);
        __decorate([
            $mol_mem
        ], $yuf_karaoke_text.prototype, "hilited_group_index_last", null);
        __decorate([
            $mol_mem
        ], $yuf_karaoke_text.prototype, "scroll_task", null);
        $$.$yuf_karaoke_text = $yuf_karaoke_text;
        class $yuf_karaoke_text_group extends $.$yuf_karaoke_text_group {
            row_content() {
                return this.ids().map(id => this.Row(id));
            }
        }
        $$.$yuf_karaoke_text_group = $yuf_karaoke_text_group;
        class $yuf_karaoke_text_row extends $.$yuf_karaoke_text_row {
            content() {
                const hilited_length = this.hilited_length();
                const text = this.text();
                return [this.Hilited(), text.slice(hilited_length)];
            }
            hilited_prefix() {
                const hilited_length = this.hilited_length();
                return this.text().slice(0, hilited_length);
            }
        }
        $$.$yuf_karaoke_text_row = $yuf_karaoke_text_row;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_karaoke_text, {
            flex: {
                direction: 'column',
            },
            font: {
                size: '2rem'
            },
            gap: '2rem',
            lineHeight: '2.25rem'
        });
        $mol_style_define($yuf_karaoke_text_group, {
            flex: {
                direction: 'column',
            },
        });
        $mol_style_define($yuf_karaoke_text_row, {
            padding: 0,
            justifyContent: 'center',
            whiteSpace: 'pre',
            Hilited: {
                whiteSpace: 'pre',
                color: $mol_theme.focus
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_play) = class $mol_icon_play extends ($.$mol_icon) {
		path(){
			return "M8,5.14V19.14L19,12.14L8,5.14Z";
		}
	};


;
"use strict";

;
	($.$yuf_video_play) = class $yuf_video_play extends ($.$yuf_check_icon2) {
		hint_checked(){
			return (this.$.$mol_locale.text("$yuf_video_play_hint_checked"));
		}
		hint_unchecked(){
			return (this.$.$mol_locale.text("$yuf_video_play_hint_unchecked"));
		}
		Icon_checked(){
			const obj = new this.$.$mol_icon_pause();
			return obj;
		}
		Icon_unchecked(){
			const obj = new this.$.$mol_icon_play();
			return obj;
		}
	};
	($mol_mem(($.$yuf_video_play.prototype), "Icon_checked"));
	($mol_mem(($.$yuf_video_play.prototype), "Icon_unchecked"));


;
"use strict";

;
	($.$mol_icon_arrow_collapse) = class $mol_icon_arrow_collapse extends ($.$mol_icon) {
		path(){
			return "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_arrow_collapse_all) = class $mol_icon_arrow_collapse_all extends ($.$mol_icon) {
		path(){
			return "M19.5,3.09L20.91,4.5L16.41,9H20V11H13V4H15V7.59L19.5,3.09M20.91,19.5L19.5,20.91L15,16.41V20H13V13H20V15H16.41L20.91,19.5M4.5,3.09L9,7.59V4H11V11H4V9H7.59L3.09,4.5L4.5,3.09M3.09,19.5L7.59,15H4V13H11V20H9V16.41L4.5,20.91L3.09,19.5Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_arrow_expand) = class $mol_icon_arrow_expand extends ($.$mol_icon) {
		path(){
			return "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_arrow_expand_all) = class $mol_icon_arrow_expand_all extends ($.$mol_icon) {
		path(){
			return "M9.5,13.09L10.91,14.5L6.41,19H10V21H3V14H5V17.59L9.5,13.09M10.91,9.5L9.5,10.91L5,6.41V10H3V3H10V5H6.41L10.91,9.5M14.5,13.09L19,17.59V14H21V21H14V19H17.59L13.09,14.5L14.5,13.09M13.09,9.5L17.59,5H14V3H21V10H19V6.41L14.5,10.91L13.09,9.5Z";
		}
	};


;
"use strict";

;
	($.$yuf_video_full) = class $yuf_video_full extends ($.$yuf_check_icon2) {
		hint_checked(){
			return (this.$.$mol_locale.text("$yuf_video_full_hint_checked"));
		}
		hint_unchecked(){
			return (this.$.$mol_locale.text("$yuf_video_full_hint_unchecked"));
		}
		Icon_checked(){
			const obj = new this.$.$mol_icon_arrow_collapse_all();
			return obj;
		}
		Icon_unchecked(){
			const obj = new this.$.$mol_icon_arrow_expand_all();
			return obj;
		}
	};
	($mol_mem(($.$yuf_video_full.prototype), "Icon_checked"));
	($mol_mem(($.$yuf_video_full.prototype), "Icon_unchecked"));


;
"use strict";

;
	($.$yuf_number) = class $yuf_number extends ($.$mol_number) {
		blur_event(next){
			if(next !== undefined) return next;
			return null;
		}
		String(){
			const obj = new this.$.$yuf_number_string();
			(obj.blur_event) = (next) => ((this.blur_event(next)));
			(obj.type) = () => ((this.type()));
			(obj.value) = (next) => ((this.value_string(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.string_enabled()));
			(obj.submit) = (next) => ((this.submit(next)));
			return obj;
		}
	};
	($mol_mem(($.$yuf_number.prototype), "blur_event"));
	($mol_mem(($.$yuf_number.prototype), "String"));
	($.$yuf_number_string) = class $yuf_number_string extends ($.$mol_string) {
		blur_event(next){
			if(next !== undefined) return next;
			return null;
		}
		event(){
			return {...(super.event()), "blur": (next) => (this.blur_event(next))};
		}
	};
	($mol_mem(($.$yuf_number_string.prototype), "blur_event"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_number extends $.$yuf_number {
            blur_event() {
                const next = this.value(this.value_string() ? undefined : this.value_min());
                this.value_string(String(next || '0'));
            }
        }
        $$.$yuf_number = $yuf_number;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_minus) = class $mol_icon_minus extends ($.$mol_icon) {
		path(){
			return "M19,13H5V11H19V13Z";
		}
	};


;
"use strict";

;
	($.$mol_icon_plus) = class $mol_icon_plus extends ($.$mol_icon) {
		path(){
			return "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
		}
	};


;
"use strict";

;
	($.$yuf_number_range_string) = class $yuf_number_range_string extends ($.$mol_string) {
		step(){
			return 1;
		}
		min(){
			return 0;
		}
		max(){
			return 100;
		}
		type(){
			return "range";
		}
		keyboard(){
			return "decimal";
		}
		attr(){
			return {...(super.attr()), "title": (this.hint())};
		}
		field(){
			return {
				...(super.field()), 
				"step": (this.step()), 
				"min": (this.min()), 
				"max": (this.max())
			};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("yuf/number/range/string/string.view.css", "[yuf_number_range_string] {\n\t-webkit-appearance: none;\n\twidth: auto;\n\theight: .5rem;\n\tborder-radius: var(--mol_gap_round);\n\tmargin-bottom: 0.2rem;\n\tbackground-color: var(--mol_theme_shade);\n\tcursor: pointer;\n\n\toverflow: visible;\n\tpadding: 0;\n}\n\n[yuf_number_range_string]::-webkit-slider-thumb {\n\t-webkit-appearance: none;\n\tbackground-color: var(--mol_theme_control);\n\twidth: 1rem;\n\theight: 1rem;\n\tborder-radius: var(--mol_gap_round);\n\toverflow: visible;\n\tcursor: pointer;\n\tborder-style: none;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n\n[yuf_number_range_string]::-moz-range-thumb {\n\tbackground-color: var(--mol_theme_control);\n\twidth: 1rem;\n\theight: 1rem;\n\tborder-radius: var(--mol_gap_round);\n\toverflow: visible;\n\tcursor: pointer;\n\tborder-style: none;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$yuf_number_range) = class $yuf_number_range extends ($.$mol_number) {
		type(){
			return "range";
		}
		step(){
			return 0;
		}
		dec_icon(){
			const obj = new this.$.$mol_icon_minus();
			return obj;
		}
		inc_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		String(){
			const obj = new this.$.$yuf_number_range_string();
			(obj.type) = () => ((this.type()));
			(obj.value) = (next) => ((this.value_string(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.string_enabled()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.min) = () => ((this.value_min()));
			(obj.max) = () => ((this.value_max()));
			(obj.step) = () => ((this.step()));
			return obj;
		}
	};
	($mol_mem(($.$yuf_number_range.prototype), "dec_icon"));
	($mol_mem(($.$yuf_number_range.prototype), "inc_icon"));
	($mol_mem(($.$yuf_number_range.prototype), "String"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_number_range extends $.$yuf_number_range {
            step() {
                return this.precision_change() * this.boost();
            }
        }
        $$.$yuf_number_range = $yuf_number_range;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_number_range, {
            Dec: {
                minHeight: '1.25rem',
                width: '1rem',
                justifyContent: 'center',
            },
            Inc: {
                minHeight: '1.25rem',
                width: '1rem',
                justifyContent: 'center',
            },
            flex: {
                grow: 11,
                shrink: 1,
            },
            minWidth: '8rem',
            justifyContent: 'space-between',
            alignItems: 'center',
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_video_slider) = class $yuf_video_slider extends ($.$yuf_number_range) {
		precision(){
			return 0.05;
		}
		value_max(){
			return 100;
		}
		value_min(){
			return 0;
		}
		sub(){
			return [(this.String())];
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("yuf/video/slider/slider.view.css", "[yuf_video_slider] > [yuf_number_slider_string] {\n\t-webkit-appearance: none;\n\twidth: 100%;\n\theight: .5rem;\n\tborder-radius: var(--mol_gap_round);\n\tmargin-bottom: 0.2rem;\n\tbackground-color: var(--mol_theme_card);\n\tcursor: pointer;\n}\n\n[yuf_video_slider] > [yuf_number_slider_string]::-webkit-slider-thumb {\n\t-webkit-appearance: none;\n\tbackground-color: var(--mol_theme_control);\n\twidth: 1rem;\n\theight: 1rem;\n\tborder-radius: var(--mol_gap_round);\n\toverflow: visible;\n\tcursor: pointer;\n\tborder-style: none;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n\n[yuf_video_slider] > [yuf_number_slider_string]::-moz-range-thumb {\n\tbackground-color: var(--mol_theme_control);\n\twidth: 1rem;\n\theight: 1rem;\n\tborder-radius: var(--mol_gap_round);\n\toverflow: visible;\n\tcursor: pointer;\n\tborder-style: none;\n\tbox-shadow: 0 0 0 1px var(--mol_theme_line);\n}\n");
})($ || ($ = {}));

;
"use strict";

;
	($.$yuf_video_estimate) = class $yuf_video_estimate extends ($.$mol_view) {
		time_formatted(){
			return "";
		}
		time(){
			return 0;
		}
		duration(){
			return 0;
		}
		ms_enabled(){
			return false;
		}
		sub(){
			return [(this.time_formatted())];
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_video_estimate extends $.$yuf_video_estimate {
            time_formatted() {
                const duration_ms = this.duration() * 1000;
                const time_ms = this.time() * 1000;
                const duration = Number.isNaN(duration_ms) || duration_ms === Infinity
                    ? null
                    : new $mol_time_duration(duration_ms).normal;
                const time = Number.isNaN(time_ms) ? null : new $mol_time_duration(time_ms).normal;
                const ms_enabled = this.ms_enabled();
                const sec_fmt = `ss${ms_enabled ? '.sss' : ''}`;
                const template = `${duration?.hour ? 'hh:' : ''}mm:${sec_fmt}`;
                let duration_str = duration?.toString(template) ?? '-';
                let time_str = time?.toString(template) ?? '-';
                if (ms_enabled && duration_str.length > 3) {
                    duration_str = duration_str.slice(0, -1);
                }
                if (ms_enabled && time_str.length > 3) {
                    time_str = time_str.slice(0, -1);
                }
                return `${time_str} / ${duration_str}`;
            }
        }
        $$.$yuf_video_estimate = $yuf_video_estimate;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_video_bar) = class $yuf_video_bar extends ($.$mol_view) {
		playing(next){
			if(next !== undefined) return next;
			return false;
		}
		Playing(){
			const obj = new this.$.$yuf_video_play();
			(obj.checked) = (next) => ((this.playing(next)));
			return obj;
		}
		fullscreen(next){
			if(next !== undefined) return next;
			return false;
		}
		Fullscreen(){
			const obj = new this.$.$yuf_video_full();
			(obj.checked) = (next) => ((this.fullscreen(next)));
			return obj;
		}
		left_content(){
			return [(this.Playing()), (this.Fullscreen())];
		}
		Left(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.left_content()));
			return obj;
		}
		time(next){
			if(next !== undefined) return next;
			return 0;
		}
		duration(){
			return 100;
		}
		Slider(){
			const obj = new this.$.$yuf_video_slider();
			(obj.value) = (next) => ((this.time(next)));
			(obj.value_max) = () => ((this.duration()));
			return obj;
		}
		mid_content(){
			return [(this.Slider())];
		}
		Mid(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.mid_content()));
			return obj;
		}
		Time(){
			const obj = new this.$.$yuf_video_estimate();
			(obj.time) = () => ((this.time()));
			(obj.duration) = () => ((this.duration()));
			return obj;
		}
		right_content(){
			return [(this.Time())];
		}
		Right(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.right_content()));
			return obj;
		}
		sub(){
			return [
				(this.Left()), 
				(this.Mid()), 
				(this.Right())
			];
		}
	};
	($mol_mem(($.$yuf_video_bar.prototype), "playing"));
	($mol_mem(($.$yuf_video_bar.prototype), "Playing"));
	($mol_mem(($.$yuf_video_bar.prototype), "fullscreen"));
	($mol_mem(($.$yuf_video_bar.prototype), "Fullscreen"));
	($mol_mem(($.$yuf_video_bar.prototype), "Left"));
	($mol_mem(($.$yuf_video_bar.prototype), "time"));
	($mol_mem(($.$yuf_video_bar.prototype), "Slider"));
	($mol_mem(($.$yuf_video_bar.prototype), "Mid"));
	($mol_mem(($.$yuf_video_bar.prototype), "Time"));
	($mol_mem(($.$yuf_video_bar.prototype), "Right"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_video_bar, {
            gap: $mol_gap.block,
            background: {
                color: $mol_theme.card,
            },
            flex: {
                grow: 1,
            },
            Left: {
                flex: {
                    shrink: 1,
                    basis: '4rem',
                    grow: 0,
                }
            },
            Mid: {
                alignItems: 'center',
                flex: {
                    grow: 10,
                    basis: '10rem',
                }
            },
            Right: {
                alignItems: 'center',
                padding: {
                    right: $mol_gap.block,
                },
            },
            Time: {
                display: 'block',
                whiteSpace: 'nowrap',
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_karaoke_bar) = class $yuf_karaoke_bar extends ($.$yuf_video_bar) {
		left_content(){
			return [(this.Playing())];
		}
	};


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_karaoke_bar extends $.$yuf_karaoke_bar {
        }
        $$.$yuf_karaoke_bar = $yuf_karaoke_bar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_karaoke_bar, {});
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_karaoke_player) = class $yuf_karaoke_player extends ($.$mol_view) {
		title(){
			return (this.model().title());
		}
		uri(){
			return (this.model().audio_url());
		}
		lyrics_url(){
			return (this.model().lyrics_url());
		}
		Track(){
			const obj = new this.$.$yuf_karaoke_text();
			(obj.uri) = () => ((this.lyrics_url()));
			(obj.time) = () => ((this.video_time()));
			return obj;
		}
		video_time(next){
			return (this.Player().time(next));
		}
		video_duration(){
			return (this.Player().duration());
		}
		playing(next){
			return (this.Player().playing(next));
		}
		Player(){
			const obj = new this.$.$mol_video_player();
			(obj.uri) = () => ((this.uri()));
			(obj.controls) = () => (false);
			(obj.autoplay) = () => (false);
			(obj.loop) = () => (false);
			(obj.uri) = () => ((this.uri()));
			return obj;
		}
		fullscreen(next){
			if(next !== undefined) return next;
			return false;
		}
		Bar(){
			const obj = new this.$.$yuf_karaoke_bar();
			(obj.playing) = (next) => ((this.playing(next)));
			(obj.fullscreen) = (next) => ((this.fullscreen(next)));
			(obj.duration) = () => ((this.video_duration()));
			(obj.time) = (next) => ((this.video_time(next)));
			return obj;
		}
		bar_content(){
			return [(this.Bar())];
		}
		model(){
			const obj = new this.$.$yuf_karaoke_model();
			return obj;
		}
		sub(){
			return [
				(this.Track()), 
				(this.Player()), 
				...(this.bar_content())
			];
		}
	};
	($mol_mem(($.$yuf_karaoke_player.prototype), "Track"));
	($mol_mem(($.$yuf_karaoke_player.prototype), "Player"));
	($mol_mem(($.$yuf_karaoke_player.prototype), "fullscreen"));
	($mol_mem(($.$yuf_karaoke_player.prototype), "Bar"));
	($mol_mem(($.$yuf_karaoke_player.prototype), "model"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_karaoke_player, {
            flex: {
                direction: 'column'
            },
            Player: {
                height: '1rem',
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_karaoke_page) = class $yuf_karaoke_page extends ($.$mol_page) {
		title(){
			return (this.model().title());
		}
		audio_url(){
			return (this.model().audio_url());
		}
		buttons_content(){
			return (this.buttons());
		}
		Edit_check_icon(){
			const obj = new this.$.$mol_icon_edit();
			return obj;
		}
		edit_enabled(next){
			if(next !== undefined) return next;
			return false;
		}
		Edit_check(){
			const obj = new this.$.$mol_check_icon();
			(obj.Icon) = () => ((this.Edit_check_icon()));
			(obj.checked) = (next) => ((this.edit_enabled(next)));
			return obj;
		}
		Close(){
			return null;
		}
		value_str(id, next){
			return (this.Form().value_str(id, next));
		}
		done(next){
			if(next !== undefined) return next;
			return null;
		}
		buttons(){
			return (this.Form().buttons());
		}
		Form(){
			const obj = new this.$.$yuf_karaoke_form();
			(obj.model) = () => ((this.model()));
			(obj.foot) = () => ([]);
			(obj.done) = (next) => ((this.done(next)));
			return obj;
		}
		edit_form_content(){
			return [(this.Form())];
		}
		Player_bar(){
			return (this.Player().Bar());
		}
		Player(){
			const obj = new this.$.$yuf_karaoke_player();
			(obj.model) = () => ((this.model()));
			(obj.bar_content) = () => ([]);
			return obj;
		}
		sing_content(){
			return [(this.Player())];
		}
		model(){
			const obj = new this.$.$yuf_karaoke_model();
			return obj;
		}
		tools(){
			return [
				...(this.buttons_content()), 
				(this.Edit_check()), 
				(this.Close())
			];
		}
		body(){
			return [...(this.edit_form_content()), ...(this.sing_content())];
		}
		foot(){
			return [(this.Player_bar())];
		}
	};
	($mol_mem(($.$yuf_karaoke_page.prototype), "Edit_check_icon"));
	($mol_mem(($.$yuf_karaoke_page.prototype), "edit_enabled"));
	($mol_mem(($.$yuf_karaoke_page.prototype), "Edit_check"));
	($mol_mem(($.$yuf_karaoke_page.prototype), "done"));
	($mol_mem(($.$yuf_karaoke_page.prototype), "Form"));
	($mol_mem(($.$yuf_karaoke_page.prototype), "Player"));
	($mol_mem(($.$yuf_karaoke_page.prototype), "model"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_karaoke_page extends $.$yuf_karaoke_page {
            buttons_content() {
                return this.edit_enabled() ? super.buttons_content() : [];
            }
            edit_form_content() {
                return this.edit_enabled() ? super.edit_form_content() : [];
            }
            sing_content() {
                return this.edit_enabled() ? [] : super.sing_content();
            }
        }
        $$.$yuf_karaoke_page = $yuf_karaoke_page;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_karaoke_page, {
            flex: {
                basis: $yuf_theme_gap.page_xl
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_karaoke_link) = class $yuf_karaoke_link extends ($.$yuf_link) {
		title(){
			return (this.model().title());
		}
		needle(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.title()));
			(obj.needle) = () => ((this.needle()));
			return obj;
		}
		model(){
			const obj = new this.$.$yuf_karaoke_model();
			return obj;
		}
		content(){
			return [(this.Title())];
		}
	};
	($mol_mem(($.$yuf_karaoke_link.prototype), "Title"));
	($mol_mem(($.$yuf_karaoke_link.prototype), "model"));


;
"use strict";

;
	($.$yuf_karaoke_catalog) = class $yuf_karaoke_catalog extends ($.$yuf_catalog) {
		spread_ids(){
			return (this.store().ids());
		}
		by_id(id){
			return (this.store().by_id(id));
		}
		done(id, next){
			if(next !== undefined) return next;
			return null;
		}
		param_suffix(){
			return "kar";
		}
		menu_title(){
			return (this.$.$mol_locale.text("$yuf_karaoke_catalog_menu_title"));
		}
		store(){
			const obj = new this.$.$yuf_karaoke_store();
			return obj;
		}
		Spread(id){
			const obj = new this.$.$yuf_karaoke_page();
			(obj.model) = () => ((this.by_id(id)));
			(obj.done) = (next) => ((this.done(id, next)));
			(obj.Close) = () => ((this.Spread_close()));
			return obj;
		}
		Menu_link(id){
			const obj = new this.$.$yuf_karaoke_link();
			(obj.model) = () => ((this.by_id(id)));
			(obj.needle) = () => ((this.menu_filter()));
			(obj.link_arg) = () => ((this.arg(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$yuf_karaoke_catalog.prototype), "done"));
	($mol_mem(($.$yuf_karaoke_catalog.prototype), "store"));
	($mol_mem_key(($.$yuf_karaoke_catalog.prototype), "Spread"));
	($mol_mem_key(($.$yuf_karaoke_catalog.prototype), "Menu_link"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_karaoke_catalog extends $.$yuf_karaoke_catalog {
            done(id, e) {
                this.spread('');
            }
        }
        $$.$yuf_karaoke_catalog = $yuf_karaoke_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_karaoke_catalog, {
            Menu: {
                flex: {
                    basis: $yuf_theme_gap.page_l
                }
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_karaoke_app) = class $yuf_karaoke_app extends ($.$yuf_catalog_app) {
		ws(){
			const obj = new this.$.$yuf_ws_statefull();
			return obj;
		}
		Ws_status(){
			const obj = new this.$.$yuf_ws_status();
			(obj.ws) = () => ((this.ws()));
			return obj;
		}
		store(){
			const obj = new this.$.$yuf_karaoke_store();
			return obj;
		}
		Catalog(){
			const obj = new this.$.$yuf_karaoke_catalog();
			(obj.store) = () => ((this.store()));
			return obj;
		}
		logged(next){
			if(next !== undefined) return next;
			return true;
		}
		menu_links_authorized(){
			return (this.menu_links());
		}
		foot_second_post(){
			return [(this.Ws_status())];
		}
		param(){
			return "yuf_kar";
		}
		spreads(){
			return {"catalog": (this.Catalog())};
		}
	};
	($mol_mem(($.$yuf_karaoke_app.prototype), "ws"));
	($mol_mem(($.$yuf_karaoke_app.prototype), "Ws_status"));
	($mol_mem(($.$yuf_karaoke_app.prototype), "store"));
	($mol_mem(($.$yuf_karaoke_app.prototype), "Catalog"));
	($mol_mem(($.$yuf_karaoke_app.prototype), "logged"));


;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($yuf_karaoke_app, {
            Ws_status: {
                padding: $mol_gap.text,
            },
            Menu: {
                Foot: {
                    padding: $mol_gap.block,
                }
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$yuf_karaoke_demo) = class $yuf_karaoke_demo extends ($.$mol_example_large) {
		Karaoke(){
			const obj = new this.$.$yuf_karaoke_app();
			return obj;
		}
		title(){
			return "Karaoke demo";
		}
		sub(){
			return [(this.Karaoke())];
		}
		tags(){
			return ["game", "karaoke"];
		}
		aspects(){
			return ["Application"];
		}
	};
	($mol_mem(($.$yuf_karaoke_demo.prototype), "Karaoke"));


;
"use strict";
var $;
(function ($) {
    class $yuf_ws_socket_mock extends $yuf_ws_socket {
        open_timeout() { return 1000; }
        answer_timeout() { return 500; }
        periodically_timeout() { return 5000; }
        close_on_every_tick() { return 100_000; }
        native() {
            if (this._native)
                return this._native;
            const native = {
                readyState: WebSocket.CONNECTING,
                close: (code = 1000) => {
                    native.readyState = WebSocket.CLOSING;
                    this.periodically_timer?.destructor();
                    new this.$.$mol_after_timeout(this.open_timeout(), () => {
                        native.readyState = WebSocket.CLOSED;
                        this.onclose({ type: code > 1000 ? 'error' : 'close' });
                    });
                }
            };
            this._native = native;
            new this.$.$mol_after_timeout(this.open_timeout(), () => {
                native.readyState = WebSocket.OPEN;
                this.$.$mol_log3_rise({
                    place: `${this.factory()}.native()`,
                    message: 'opened'
                });
                this.onopen();
                this.periodically_schedule();
            });
            return this._native;
        }
        periodically_timer = null;
        periodically_schedule() {
            this.periodically_timer = new this.$.$mol_after_timeout(this.periodically_timeout(), () => this.periodically());
        }
        periodically_tick = 0;
        periodically() {
            const tick = this.close_on_every_tick();
            if (((++this.periodically_tick) % tick) === 0) {
                this.native().close(1006);
                return;
            }
            if (this.native().readyState !== WebSocket.OPEN)
                return;
            for (const sub of this.subs) {
                const answer = this.answer(sub, true);
                if (!answer)
                    continue;
                if (!sub)
                    continue;
                Object.assign(sub, answer);
                this.onmessage({
                    data: JSON.stringify(answer),
                });
            }
            this.periodically_schedule();
        }
        destructor() {
            this.subs = [];
            this.periodically_timer?.destructor();
            super.destructor();
        }
        answer(obj, periodically = false) {
            return null;
        }
        subs = [];
        message_equal(a, b) {
            return $mol_compare_deep(this.message_normalize(a), this.message_normalize(b));
        }
        message_normalize(msg) {
            return msg;
        }
        send(raw) {
            const obj = JSON.parse(raw.toString());
            this.$.$mol_log3_come({
                place: `${this.factory()}.send()`,
                message: 'req',
                data: obj
            });
            const prev = this.subs.find(sub => this.message_equal(obj, sub));
            const message = this.answer({ ...prev, ...obj });
            if (prev) {
                this.subs = this.subs.filter(sub => sub !== prev);
            }
            if (!message)
                return;
            this.subs.push(message);
            new this.$.$mol_after_timeout(this.answer_timeout(), () => this.receive(message));
        }
        factory() { return this.constructor; }
        receive(message) {
            if (message === undefined)
                return;
            if (this.native().readyState !== WebSocket.OPEN)
                return;
            this.$.$mol_log3_done({
                place: `${this.factory()}.answer_receive()`,
                message: 'answer',
                data: message,
            });
            this.onmessage({
                data: JSON.stringify(message),
            });
        }
    }
    $.$yuf_ws_socket_mock = $yuf_ws_socket_mock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_ws_statefull_socket_mock extends $yuf_ws_socket_mock {
        message_sub(obj) {
            return this.$.$yuf_entity2.active_model(this.message_normalize(obj));
        }
        answer(obj, periodically = false) {
            if (obj.type === 'ping')
                return { type: 'pong' };
            if (obj.error === null)
                return null;
            try {
                const first = this.message_sub(obj);
                if (!first)
                    return null;
                if (periodically && !first.mock_periodically())
                    return null;
                const data = first.mock(obj.data);
                if (data === null)
                    return data;
                return JSON.parse(JSON.stringify({
                    ...obj,
                    data,
                    error: undefined,
                    message: undefined,
                    req_id: data === undefined ? undefined : obj.req_id,
                }));
            }
            catch (e) {
                if (e instanceof Error) {
                    const error = e.message || 'INTERNAL_ERROR';
                    const message = e.cause
                        && typeof e.cause === 'object'
                        && 'message' in e.cause
                        && typeof e.cause.message === 'string'
                        ? e.cause.message
                        : '';
                    return { ...obj, error, message, data: undefined };
                }
                $mol_fail_hidden(e);
            }
        }
        message_normalize({ type, query, device, id }) {
            return { type, id, query, device };
        }
    }
    $.$yuf_ws_statefull_socket_mock = $yuf_ws_statefull_socket_mock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_karaoke_store_mock extends $yuf_karaoke_store {
        mock(next) {
            if (next)
                return next;
            const result = [];
            for (let i = 1; i <= 100; i++) {
                result.push(String(i));
            }
            return result;
        }
    }
    $.$yuf_karaoke_store_mock = $yuf_karaoke_store_mock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $yuf_karaoke_model_mock extends $yuf_karaoke_model {
        mock(next) {
            if (next)
                return next;
            return {
                title: $mol_stub_message(100).trim() + this._id,
                lyrics: `WEBVTT

00:16.500 --> 00:23.290
Oh<00:16.770> <00:17.020>yeah, <00:17.360>I'll<00:18.020> <00:18.570>tell<00:18.790>
<00:19.040>you <00:19.190>something,<00:19.910> <00:21.120>I <00:21.320>think
<00:21.500>you'll <00:21.670>understand

00:24.150 --> 00:31.670
When <00:24.500>I<00:25.180> <00:25.710>say<00:25.920> <00:26.170>that
<00:26.330>something,<00:27.350> <00:28.250>I <00:28.390>wanna<00:28.800>
<00:29.050>hold <00:29.450>your <00:29.590>hand

00:32.060 --> 00:37.770
I <00:32.180>wanna <00:32.510>hold<00:32.860> <00:33.110>your <00:33.410>hand<00:34.980>
<00:35.450>I <00:35.580>wanna<00:35.920> <00:36.170>hold <00:36.560>your<00:36.830> <00:37.080>hand

00:38.350 --> 00:44.930
Oh, <00:38.680>please,<00:39.340> <00:40.190>say <00:40.370>to
<00:40.530>me<00:41.260> <00:42.500>you'll <00:42.710>let<00:42.880> <00:43.130>me <00:43.300>be
<00:43.640>your<00:43.960> <00:44.210>man

00:45.470 --> 00:52.950
And<00:45.830> <00:46.080>please,<00:46.720> <00:47.320>say <00:47.520>to
<00:47.690>me,<00:48.370> <00:49.660>you'll<00:49.840> <00:50.090>let <00:50.240>me <00:50.420>hold<00:50.800>
<00:51.050>your <00:51.220>hand

00:53.380 --> 00:59.150
Now <00:53.560>let <00:53.710>me<00:53.910> <00:54.160>hold
<00:54.500>your<00:54.830> <00:55.080>hand.<00:56.610>
<00:57.070>I <00:57.210>wanna <00:57.550>hold<00:57.900> <00:58.150>your <00:58.460>hand

01:00.660 --> 01:06.740
And<01:00.980> <01:01.230>when <01:01.560>I<01:01.910> <01:02.160>touch <01:02.500>you<01:02.840>
<01:03.090>I <01:03.410>feel<01:03.750> <01:04.000>happy,<01:04.540> <01:05.240>inside

01:07.740 --> 01:13.620
It's<01:08.080> <01:08.330>such <01:08.670>a<01:09.000> <01:09.250>feeling<01:09.920>
<01:10.170>that <01:10.530>my<01:10.890> <01:11.140>love,<01:11.570> <01:12.270>I <01:12.410>can't <01:12.570>hide

01:14.110 --> 01:18.730
I <01:14.260>can't <01:14.420>hide<01:15.530>
<01:15.710>I<01:15.860> <01:16.110>can't <01:16.260>hide

01:19.490 --> 01:26.020
Yeah<01:19.840> <01:20.090>you,<01:20.680> <01:21.340>got <01:21.520>that
<01:21.680>something,<01:22.370> <01:23.650>I<01:23.810> <01:24.060>think
<01:24.250>you'll <01:24.440>understand

01:26.630 --> 01:34.050
When<01:26.940> <01:27.190>I<01:27.800> <01:28.470>say <01:28.650>that<01:28.800>
<01:29.050>something,<01:29.720> <01:31.070>I <01:31.240>wanna
<01:31.610>hold<01:31.980> <01:32.230>your <01:32.370>hand

01:34.560 --> 01:40.280
I <01:34.690>wanna<01:35.040> <01:35.290>hold <01:35.650>your<01:36.010> <01:36.260>hand<01:37.710>
<01:38.210>I <01:38.360>wanna <01:38.660>hold<01:39.090> <01:39.340>your <01:39.560>hand

01:42.060 --> 01:47.850
And <01:42.380>when <01:42.740>I<01:43.060> <01:43.310>touch <01:43.650>you<01:43.990>
<01:44.240>I <01:44.550>feel<01:44.930> <01:45.180>happy,<01:45.630> <01:46.370>inside

01:49.180 --> 01:55.020
It's <01:49.500>such<01:49.810> <01:50.060>a <01:50.360>feeling<01:51.010>
<01:51.260>that <01:51.700>my<01:52.040> <01:52.290>love,<01:52.670> <01:53.460>I <01:53.600>can't<01:53.750> <01:54.000>hide

01:55.250 --> 02:00.460
I <01:55.420>can't <01:55.550>hide<01:56.670>
<01:57.110>I <01:57.270>can't <01:57.420>hide

02:00.730 --> 02:07.190
Yeah<02:01.040> <02:01.290>you,<02:01.810> <02:02.490>got <02:02.660>that<02:02.810>
<02:03.060>something,<02:03.680> <02:05.070>I <02:05.250>think
<02:05.440>you'll <02:05.620>understand

02:08.040 --> 02:15.270
When <02:08.380>I<02:08.930> <02:09.580>feel<02:09.760> <02:10.010>that
<02:10.180>something,<02:10.840> <02:12.200>I <02:12.360>wanna<02:12.760>
<02:13.010>hold <02:13.400>your <02:13.550>hand

02:15.700 --> 02:22.380
I<02:15.840> <02:16.090>wanna <02:16.400>hold<02:16.800> <02:17.050>your <02:17.360>hand<02:18.880>
<02:19.340>I <02:19.470>wanna<02:19.800> <02:20.050>hold <02:20.440>your <02:20.740>hand`.trim(),
                audio_url: 'yuf/karaoke/model/mock/2.mp3',
            };
        }
    }
    $.$yuf_karaoke_model_mock = $yuf_karaoke_model_mock;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $yuf_karaoke_demo extends $.$yuf_karaoke_demo {
            get $() {
                return super.$.$mol_ambient({
                    $yuf_ws_socket: super.$.$yuf_ws_statefull_socket_mock,
                    $yuf_karaoke_store: super.$.$yuf_karaoke_store_mock,
                    $yuf_karaoke_model: super.$.$yuf_karaoke_model_mock,
                });
            }
        }
        __decorate([
            $mol_memo.field
        ], $yuf_karaoke_demo.prototype, "$", null);
        $$.$yuf_karaoke_demo = $yuf_karaoke_demo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));


//# sourceMappingURL=node.js.map
