export class Task {
    name: String
    YamlNodes: Array<any>
    dependsOn: Array<Task>

    constructor(name: String, YamlNodes: Array<any>, dependsOn: Array<Task>) {
        this.name = name
        this.YamlNodes = YamlNodes
        this.dependsOn = dependsOn
    }
}

export class Script {
    name: String
    run: Array<String> | String

    constructor(name: String = "main", run: Array<String> | String) {
        this.name = name
        this.run = run
    }
}

// have to name it CICache to fix conficts
export class CICache {
    folder: String
    name: String
    populate: Array<Script> | Script | undefined
    fingerprint: Array<Script> | Script | undefined

    constructor(
        name: String = "dependencies",
        folder: String,
        populate: Array<Script> | Script,
        fingerprint: Array<Script> | Script
    ) {
        this.folder = folder
        this.name = name
        this.populate = populate
        this.fingerprint = fingerprint
    }
}

export class Environment {
    keys: object

    constructor(keys: object) {
        this.keys = keys
    }
}

export class Machine {
    type: any

    constructor(type: "container" | "mac" | "win" | "fbsd") {
        this.type = type
    }
}
