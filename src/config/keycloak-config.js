const session = require("express-session")
const Keycloak = require("keycloak-connect")

let _keycloak

const keycloakConfig = {
    clientId: "workbc-api",
    bearerOnly: true,
    serverUrl: "http://192.168.1.8:8080/auth",
    realm: "Workbc"
}

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!")
        return _keycloak
    }

    console.log("Initializing Keycloak...")
    const memoryStore = new session.MemoryStore()
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)
    return _keycloak
}

function getKeycloak() {
    if (!_keycloak) {
        console.error("Keycloak has not been initialized. Please called init first.")
    }
    return _keycloak
}

module.exports = {
    initKeycloak,
    getKeycloak
}
