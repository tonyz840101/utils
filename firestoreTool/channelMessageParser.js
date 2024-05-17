/*
standalone function to parse firestore channel message
*/

function parseFirebaseRawMessage (input) {
    // console.log('input', typeof input, input)
    if (typeof input !== 'object' || input === null) {
        return input
    }
    let keys = Object.keys(input).sort()
    if (keys.includes('integerValue')) {
        return parseInt(input.integerValue)
    } else if (keys.includes('booleanValue')) {
        return input.booleanValue
    } else if (keys.includes('nullValue')) {
        return null
    } else if (keys.includes('stringValue')) {
        return input.stringValue
    } else if (keys.includes('doubleValue')) {
        return input.doubleValue
    } else if (keys.includes('mapValue')) {
        if (Object.keys(input.mapValue).length !== 0) {
            input = input.mapValue.fields
            Object.keys(input).sort().forEach(key => {
                input[key] = parseFirebaseRawMessage(input[key])
            })
            return input
        } else {
            return {}
        }
    } else if (keys.includes('arrayValue')) {
        if (Object.keys(input.arrayValue).length !== 0) {
            input = input.arrayValue.values.sort().map(v => parseFirebaseRawMessage(v))
            return input
        } else {
            return []
        }
    } else {
        keys.forEach(key => {
            input[key] = parseFirebaseRawMessage(input[key])
        })
        return input
    }
}