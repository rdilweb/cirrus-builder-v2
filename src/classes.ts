/**
 * The base object that can be extended.
 *
 * This isn't exported on purpose, as its
 * point is just to ensure the name code
 * is the name on all sub classes.
 */
class ExtendableBaseObject {
    name: String
    id: Number

    constructor(name: String) {
        this.name = name
        this.id = Math.floor(Math.random() * 10000)
    }

    getName() {
        return this.name
    }

    setName(newName: String) {
        this.name = newName
    }

    getId() {
        return this.id
    }
}

export class Script extends ExtendableBaseObject {
    run: String

    constructor() {
        super("")
        this.run = ""
    }

    getRun() {
        return this.run
    }

    setRun(newRun: String) {
        this.run = newRun
    }

    toString() {
        let e =
            (this.getName() === "main" ? "" : `${this.getName()}_`) + "script"
        return `${e}: ${this.getRun()}`
    }
}

// have to name it CICache to fix conficts
export class CICache extends ExtendableBaseObject {
    folder: String
    populate: Script
    fingerprint: Script

    constructor() {
        super("")
        this.folder = ""
        this.populate = new Script()
        this.fingerprint = new Script()
    }

    getFolder() {
        return this.folder
    }

    setFolder(newThing: String) {
        this.folder = newThing
    }

    getPopulate() {
        return this.populate
    }

    getFingerprint() {
        return this.fingerprint
    }
}

export class Environment {
    keys: object

    constructor(keys: object) {
        this.keys = keys
    }
}

type machineType = "docker" | "mac" | "win" | "fbsd"

export class Machine {
    type: machineType

    constructor() {
        this.type = "docker"
    }

    getType() {
        return this.type
    }

    setType(newType: machineType) {
        this.type = newType
    }
}
