export let addScriptTo = (script, list, listSetState) => {
    let list2 = [...list]
    list2.push(script)
    listSetState(list2)
}
