export {}

declare global {
    interface MapConstructor {
        create<K, V>(...entries: [K, V][]): Map<K, V>
    }
}

Map.create = function <K, V>(...entries: [K, V][]): Map<K, V> {
    return new Map(entries)
}
