
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
/**
*/
export function greet() {
    wasm.greet();
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/
export const Movement = Object.freeze({ TOP:0,"0":"TOP",RIGHT:1,"1":"RIGHT",DOWN:2,"2":"DOWN",LEFT:3,"3":"LEFT", });
/**
*/
export class Game {

    static __wrap(ptr) {
        const obj = Object.create(Game.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_game_free(ptr);
    }
    /**
    * @returns {number}
    */
    get width() {
        var ret = wasm.__wbg_get_game_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set width(arg0) {
        wasm.__wbg_set_game_width(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get height() {
        var ret = wasm.__wbg_get_game_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set height(arg0) {
        wasm.__wbg_set_game_height(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get snake_speed() {
        var ret = wasm.__wbg_get_game_snake_speed(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set snake_speed(arg0) {
        wasm.__wbg_set_game_snake_speed(this.ptr, arg0);
    }
    /**
    * @returns {Vector}
    */
    get snake_direction() {
        var ret = wasm.__wbg_get_game_snake_direction(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * @param {Vector} arg0
    */
    set snake_direction(arg0) {
        _assertClass(arg0, Vector);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_game_snake_direction(this.ptr, ptr0);
    }
    /**
    * @returns {Vector}
    */
    get food_location() {
        var ret = wasm.__wbg_get_game_food_location(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * @param {Vector} arg0
    */
    set food_location(arg0) {
        _assertClass(arg0, Vector);
        var ptr0 = arg0.ptr;
        arg0.ptr = 0;
        wasm.__wbg_set_game_food_location(this.ptr, ptr0);
    }
    /**
    * @returns {number}
    */
    get score() {
        var ret = wasm.__wbg_get_game_score(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set score(arg0) {
        wasm.__wbg_set_game_score(this.ptr, arg0);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} snake_speed
    * @param {number} snake_length
    * @param {Vector} snake_direction
    */
    constructor(width, height, snake_speed, snake_length, snake_direction) {
        _assertClass(snake_direction, Vector);
        var ptr0 = snake_direction.ptr;
        snake_direction.ptr = 0;
        var ret = wasm.game_new(width, height, snake_speed, snake_length, ptr0);
        return Game.__wrap(ret);
    }
    /**
    * Runs the game.
    * Interfaced with from JavaScript
    * @param {number} timespan
    * @param {number | undefined} movement
    */
    process(timespan, movement) {
        wasm.game_process(this.ptr, timespan, isLikeNone(movement) ? 4 : movement);
    }
    /**
    * Processes movement.
    * Moves snake forward, if needed changes the direction of the snake.
    * @param {number} dt
    * @param {number | undefined} movement
    */
    process_movement(dt, movement) {
        wasm.game_process_movement(this.ptr, dt, isLikeNone(movement) ? 4 : movement);
    }
    /**
    * Processes food. Checks if food is supposed to be consumed
    */
    process_food() {
        wasm.game_process_food(this.ptr);
    }
    /**
    * Checks if game is lost
    * @returns {boolean}
    */
    is_over() {
        var ret = wasm.game_is_over(this.ptr);
        return ret !== 0;
    }
    /**
    * Returs snake in JavaScript Array form.
    * @returns {Array<any>}
    */
    get_snake() {
        var ret = wasm.game_get_snake(this.ptr);
        return takeObject(ret);
    }
}
/**
*/
export class Vector {

    static __wrap(ptr) {
        const obj = Object.create(Vector.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vector_free(ptr);
    }
    /**
    * @returns {number}
    */
    get x() {
        var ret = wasm.__wbg_get_vector_x(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vector_x(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        var ret = wasm.__wbg_get_vector_y(this.ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vector_y(this.ptr, arg0);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    constructor(x, y) {
        var ret = wasm.vector_new(x, y);
        return Vector.__wrap(ret);
    }
    /**
    * Legacy function for substraction of two vectors.
    * Used by JavaScript as well as `ops::Sub` trait definition.
    * @param {Vector} other
    * @returns {Vector}
    */
    legacy_substract(other) {
        _assertClass(other, Vector);
        var ret = wasm.vector_legacy_substract(this.ptr, other.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * Legacy function for addition of two vectors.
    * Used by JavaScript as well as `ops::Add` trait definition.
    * @param {Vector} other
    * @returns {Vector}
    */
    legacy_add(other) {
        _assertClass(other, Vector);
        var ret = wasm.vector_legacy_add(this.ptr, other.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * Legacy function for checking if two vectors are equal.
    * Used by JavaScript as well as `cmp::PartialEq` trait definition.
    * @param {Vector} other
    * @returns {boolean}
    */
    legacy_equal_to(other) {
        _assertClass(other, Vector);
        var ret = wasm.vector_legacy_equal_to(this.ptr, other.ptr);
        return ret !== 0;
    }
    /**
    * Checks if `self` is the opposite of Vector `other`
    * @param {Vector} other
    * @returns {boolean}
    */
    is_opposite(other) {
        _assertClass(other, Vector);
        var ret = wasm.vector_is_opposite(this.ptr, other.ptr);
        return ret !== 0;
    }
    /**
    * Gets the opposite of a `self`
    * @returns {Vector}
    */
    opposite() {
        var ret = wasm.vector_opposite(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * Returns normalized `self`
    * @returns {Vector}
    */
    normalize() {
        var ret = wasm.vector_normalize(this.ptr);
        return Vector.__wrap(ret);
    }
    /**
    * Returns `self` scaled by `scale`
    * @param {number} scale
    * @returns {Vector}
    */
    scale_by(scale) {
        var ret = wasm.vector_scale_by(this.ptr, scale);
        return Vector.__wrap(ret);
    }
    /**
    * Returns length of `self`
    * @returns {number}
    */
    len() {
        var ret = wasm.vector_len(this.ptr);
        return ret;
    }
    /**
    * Returns the dot product of `self` and `other`
    * @param {Vector} other
    * @returns {number}
    */
    dot_product(other) {
        _assertClass(other, Vector);
        var ret = wasm.vector_dot_product(this.ptr, other.ptr);
        return ret;
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {

        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('app_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_vector_new = function(arg0) {
        var ret = Vector.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_alert_7d37aa9648f374c9 = function(arg0, arg1) {
        alert(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_self_86b4b13392c7af56 = handleError(function() {
        var ret = self.self;
        return addHeapObject(ret);
    });
    imports.wbg.__wbg_require_f5521a5b85ad2542 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_crypto_b8c92eaac23d0d80 = function(arg0) {
        var ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_msCrypto_9ad6677321a08dd8 = function(arg0) {
        var ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_getRandomValues_dd27e6b0652b3236 = function(arg0) {
        var ret = getObject(arg0).getRandomValues;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getRandomValues_e57c9b75ddead065 = function(arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    };
    imports.wbg.__wbg_randomFillSync_d2ba53160aec6aba = function(arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_static_accessor_MODULE_452b4680e8614c81 = function() {
        var ret = module;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_04918f9bdadadf45 = function() {
        var ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_60db4345d488a9b8 = function(arg0, arg1) {
        var ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_buffer_e35e010c3ba9f945 = function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_139e70222494b1ff = function(arg0) {
        var ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_d771848e3c7935bb = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_2cfa674c2a529bc1 = function(arg0) {
        var ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_e0c461e90217842c = function(arg0) {
        var ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_8a52f1c1a11c02a8 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        var ret = wasm.memory;
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;

    return wasm;
}

export default init;

