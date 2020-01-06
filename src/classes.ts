class Task {
    name: String
    YamlNodes: Array<any>

    constructor(name: String, YamlNodes: Array<any>) {
        this.name = name
        this.YamlNodes = YamlNodes
    }
}

class Script {
    name: String
    run: Array<Script>

    constructor(name: String = "main", run: Array<Script>) {
        this.name = name
        this.run = run
    }
}

// have to name it CICache to fix conficts
class CICache {
    folder: String
    name: String
    populate: Array<Script> | Script | undefined
    fingerprint: Array<Script> | Script | undefined

    constructor(
        name: String = "dependencies",
        folder: String,
        populate: Array<Script> | Script | undefined,
        fingerprint: Array<Script> | Script | undefined
    ) {
        this.folder = folder
        this.name = name
        this.populate = populate
        this.fingerprint = fingerprint
    }
}

class Environment {
    keys: object
    constructor(keys: object) {
        this.keys = keys
    }
}

class Machine {
    type: any

    constructor(type: "container" | "mac" | "win" | "fbsd") {
        this.type = type
    }
}
