import { track, trigger } from './effect'
export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly'
}
export function reactive<T extends Object>(raw:T) {
    return new Proxy(raw, {
        get(target, key, receiver) {
            if(key === ReactiveFlags.IS_REACTIVE) {
                return true
            }
            const res = Reflect.get(target, key, receiver)
            track(target, key, receiver)
            return res
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            trigger(target, key, value, receiver)
            return true
        }
    })
}

export function isReactive (value: any) {
    return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly (value: any) {
    return !!value[ReactiveFlags.IS_READONLY]
}
export function isProxy(value: any) {
    return isReactive(value) || isReadonly(value)
}