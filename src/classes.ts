/**
 * The base object that can be extended.
 * 
 * This isn't exported on purpose, as its
 * point is just to ensure the name code
 * is the name on all sub classes.
 */
class ExtendableBaseObject {
    name: String

    constructor(name: String) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setName(newName: String) {
        this.name = newName
    }
}

export class Script extends ExtendableBaseObject {
    run: String

    constructor(name: String = "main", run: String) {
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
        let e = (this.getName() === "main" ? "" : `${this.getName()}_`) + "script"
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

export class Machine {
    type: "container" | "mac" | "win" | "fbsd"

    constructor(type: "container" | "mac" | "win" | "fbsd") {
        this.type = type
    }

    getType() {
        return this.type
    }

    setType(newType: "container" | "mac" | "win" | "fbsd") {
        this.type = newType
    }
}
