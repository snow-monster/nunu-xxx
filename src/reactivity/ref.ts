


class RefImpl {
    private _value: any
    constructor (value: any) {
        this._value = value
    }
    get value() {
        return this._value
    }
    set value(newValue) {
        this._value = newValue
    }
}
export function ref<T>(value: T) {
    return new RefImpl(value)
}