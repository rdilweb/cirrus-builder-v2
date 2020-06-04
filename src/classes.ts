/**
 * The base object that can be extended.
 *
 * This isn't exported, its point is
 * just to ensure the name/ID code exists
 * in all the sub classes.
 */
class BaseObject {
    /**
     * The name of the node.
     */
    name: string
    /**
     * The ID number - used within React to differentiate components,
     * not actually part of the generated YAML.
     */
    id: number

    /**
     * Basic no-argument constructor.
     */
    constructor() {
        this.name = ""
        this.id = Math.floor(Math.random() * 10000)
    }

    /**
     * Get the node's name.
     */
    getName(): string {
        return this.name.replace(" ", "_")
    }

    /**
     * Set the node's name to the passed string.
     */
    setName(newName: string) {
        this.name = newName
    }

    /**
     * Get the object ID.
     */
    getId(): number {
        return this.id
    }
}

/**
 * Abstract script instruction.
 */
export class Script extends BaseObject {
    /**
     * The command that will be executed during the runtime
     * of this script in CI builds.
     */
    run: string
    /**
     * If this `Script` is a member of a `CICache`.
     * This is to determine if the `run` property
     * can be excluded from the `toString` data.
     */
    isCacheMember: boolean

    /**
     * The class constructor.
     */
    constructor() {
        super()
        this.run = ""
        this.isCacheMember = false
    }

    /**
     * Get the command that will be run by the agent during the build.
     */
    getRun(): string {
        return this.run
    }

    /**
     * Set the command that will be run by the agent during the build.
     */
    setRun(newRun: string) {
        this.run = newRun
    }

    /**
     * Sets `isCacheMembership` to true when called.
     */
    announceCacheMembership() {
        this.isCacheMember = true
    }

    /**
     * Generates a string based on the saved data.
     */
    toString(): string | null {
        // eslint-disable-next-line
        if (this.run == "" && this.isCacheMember) {
            // part of a cache, and the user doesn't want this script
            return null
        }
        let e =
            (this.getName() === "main" ? "" : `${this.getName()}_`) + "script"
        return `${e}: ${this.getRun()}`
    }
}

/**
 * An abstract cache instruction.
 * Yes, **we do need** to name it CICache to fix conficts.
 */
export class CICache extends BaseObject {
    /**
     * The cache's target folder.
     */
    folder: string
    /**
     * The cache's populate script.
     */
    populate: Script
    /**
     * The cache's fingerprint script.
     */
    fingerprint: Script

    /**
     * Basic no-argument constructor.
     */
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
        // let the scripts know this is a CICache
        this.populate.announceCacheMembership()
        this.fingerprint.announceCacheMembership()
    }

    /**
     * Get the cache's target folder.
     */
    getFolder(): string {
        return this.folder
    }

    /**
     * Set the cache's target folder.
     */
    setFolder(newThing: string) {
        this.folder = newThing
    }

    /**
     * Get the cache's populate script.
     */
    getPopulate(): Script {
        return this.populate
    }

    /**
     * Get the cache's fingerprint script.
     */
    getFingerprint(): Script {
        return this.fingerprint
    }

    /**
     * Returns a YAML representation of this object.
     */
    toString(): string {
        // this part we know will be there
        const base = `${this.getName()}_cache:
        folder: ${this.getFolder()}`

        let p: string =
            this.getPopulate.toString() == null
                ? ""
                : "\n        " + this.getPopulate().toString()

        let f: string =
            this.getFingerprint().toString() == null
                ? ""
                : "\n        " + this.getFingerprint().toString()

        return base + p + f
    }
}

/**
 * The machine type.
 */
export type machineType = "docker" | "mac" | "win" | "fbsd"

/**
 * A class to hold the data for the build machine.
 */
export class Machine {
    /**
     * The machine's type.
     */
    type: machineType

    /**
     * Basic no-argument constructor.
     */
    constructor() {
        this.type = "docker"
    }

    /**
     * Get the machine's type.
     */
    getType(): machineType {
        return this.type
    }

    /**
     * Set the machine's type.
     */
    setType(newType: machineType) {
        this.type = newType
    }

    /**
     * Export this object as a YAML string.
     */
    toString(
        macOsVersion: string,
        freeBsdVersion: string,
        dockerContainer: string
    ): String {
        switch (this.getType()) {
            case "docker":
                return "container:\n        image: " + dockerContainer
            case "fbsd":
                return (
                    "freebsd_instance:\n        image_family: " + freeBsdVersion
                )
            case "win":
                return "windows_container:\n        image: cirrusci/windowsservercore:2019"
            default:
                return "osx_instance:\n        image: " + macOsVersion
        }
    }
}

/**
 * An artifact from the build.
 */
export class Artifact extends BaseObject {
    /**
     * The artifact's location.
     */
    path: string

    /**
     * Basic no-argument constructor.
     */
    constructor() {
        // init superclass
        super()
        // set initial text for path
        this.path = ""
    }

    /**
     * Get the artifact's location.
     */
    getPath(): string {
        return this.path
    }

    /**
     * Set the artifact's location.
     */
    setPath(newThing: string) {
        this.path = newThing
    }

    /**
     * Returns a YAML representation of this object.
     */
    toString(): string {
        // this part we know will be there
        return `${this.getName()}_artifacts:
        path: ${this.getPath()}`
    }
}
