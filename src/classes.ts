/**
 * The base object that can be extended.
 *
 * This isn't exported, as its point is
 * just to ensure the name/id code exists
 * in all the sub classes.
 */
class ExtendableBaseObject {
    name: string
    id: number

    constructor() {
        this.name = ""
        this.id = Math.floor(Math.random() * 10000)
    }

    getName(): string {
        return this.name
    }

    setName(newName: string) {
        this.name = newName
    }

    getId(): number {
        return this.id
    }
}

/**
 * Abstract script instruction.
 */
export class Script extends ExtendableBaseObject {
    run: string

    constructor() {
        super()
        this.run = ""
    }

    getRun(): string {
        return this.run
    }

    setRun(newRun: string) {
        this.run = newRun
    }

    toString(): string {
        let e =
            (this.getName() === "main" ? "" : `${this.getName()}_`) + "script"
        return `${e}: ${this.getRun()}`
    }
}

/**
 * An abstract cache instruction.
 * Yes, **we do need** to name it CICache to fix conficts.
 */
export class CICache extends ExtendableBaseObject {
    folder: string
    populate: Script
    fingerprint: Script

    constructor() {
        // init superclass
        super()
        // set initial text for folder
        this.folder = ""
        // create script instances
        this.populate = new Script()
        this.fingerprint = new Script()
        // set names of scripts
        this.populate.setName("populate")
        this.fingerprint.setName("fingerprint")
    }

    getFolder(): string {
        return this.folder
    }

    setFolder(newThing: string) {
        this.folder = newThing
    }

    getPopulate(): Script {
        return this.populate
    }

    getFingerprint(): Script {
        return this.fingerprint
    }

    toString(): string {
        return (
            this.getName() +
            "_cache:\n    folder: " +
            this.getFolder() +
            "\n    " +
            this.getPopulate().toString() +
            "\n    " +
            this.getFingerprint().toString()
        )
    }
}

/**
 * The machine type.
 * 
 * This includes `string` on the end because otherwise, TS complains
 * about the result of the radio buttons' bound `value` props being
 * cast to this type.
 */
export type machineType = "docker" | "mac" | "win" | "fbsd" | string

/**
 * A class to hold the data for the build machine.
 */
export class Machine {
    type: machineType

    constructor() {
        this.type = "docker"
    }

    getType(): machineType {
        return this.type
    }

    setType(newType: machineType) {
        this.type = newType
    }

    toString(macOsVersion: String, freeBsdVersion: String, dockerContainer: String): String {
        switch (this.getType()) {
            case "docker":
                return "container:\n        image: " + dockerContainer
            case "fbsd":
                return "freebsd_instance:\n        image_family: " + freeBsdVersion
            case "win":
                return "windows_container:\n        image: cirrusci/windowsservercore:2019"
            default:
                return "osx_instance:\n        image: " + macOsVersion
        }
    }
}
