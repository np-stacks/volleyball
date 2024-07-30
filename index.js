const room = HBInit({
    roomName: "🏐 [VHPL] VOLLEYBALL [BETA TEST]",
    maxPlayers: 24,
    noPlayer: true, // what is that for
    geo: {"code" : "CA", "lat": 43.651070, "lon": -79.347015}
})

// ========> DATABASE COLLECTION <======== //

var superAdmins;
if (localStorage.getItem("VHPL.superAdmins") == null) {
    superAdmins = [
        "IZ74AeQVaSn9oZl1ubkXGQYi2AaezQkrDG0Nj2kIvqI", // stacks auth
        "EVRdfD9nj3X0UpUuxfSxoSSaCXD-WSkKLPplHSjcnrQ" // alex auth
    ]
    localStorage.setItem("VHPL.superAdmins", JSON.stringify(superAdmins))
} else {
    superAdmins = localStorage.getItem("VHPL.superAdmins")
}

var pubAdmins;
if (localStorage.getItem("VHPL.pubAdmins") == null) {
    pubAdmins = []
    localStorage.setItem("VHPL.pubAdmins", JSON.stringify(pubAdmins))
} else {
    pubAdmins = localStorage.getItem("VHPL.pubAdmins")
}

// ========> VARIABLES <======== //

var roomPlayerData = []

const hexColor = {
    join: 0x038cfc,
    leave: 0xeb1e1e,
    error: 0xb80000,
    goal: 0xd4c822,
    chose: 0xdb7a0b,
    choose: 0xa612e0,
    warning: 0xfa2419,
    gameinfo: 0xedc009,
    info: 0xb0b0b0,
    status: 0x24d624,
    admin: 0xe0d319,
    private: 0xeb9534,
    red: 0xfc1212,
    blue: 0x1855d9,
    spec: 0xb0b0b0,
    green: 0x1dde20,
};


// ========> GAME FUNCTIONS <======== //

room.onPlayerJoin = async function (player) {
    if (roomPlayerData.find(x => x.auth == player.auth)) {
        roomPlayerData.splice(roomPlayerData.indexOf(roomPlayerData.find(x => x.auth == player.auth),1))
    }
    roomPlayerData.push({id: player.id, name: player.name, auth: player.auth, conn: player.conn, afk: false, mute: false, status: 0})
    room.sendAnnouncement()
}
