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

    constructor(name: String, run: String) {
        super(name)
        this.run = run
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

    constructor(
        name: String = "dependencies",
        folder: String,
        populate: Script,
        fingerprint: Script
    ) {
        super(name)
        this.folder = folder
        this.populate = populate
        this.fingerprint = fingerprint
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

    setPopulate(newThing: Script) {
        this.populate = newThing
    }

    getFingerprint() {
        return this.fingerprint
    }

    setFingerprint(newThing: Script) {
        this.fingerprint = newThing
    }
}

export class Environment {
    keys: object

    constructor(keys: object) {
        this.keys = keys
    }
}

type machineType = "container" | "mac" | "win" | "fbsd"

export class Machine {
    type: machineType

    constructor(type: machineType) {
        this.type = type
    }

    getType() {
        return this.type
    }

    setType(newType: machineType) {
        this.type = newType
    }
}
