const room = HBInit({
    roomName: "🏐 [VHPL] VOLLEYBALL [BETA TEST]",
    maxPlayers: 24,
    noPlayer: true,
    geo: {"code" : "CA", "lat": 43.651070, "lon": -79.347015}
})

// ========> DATABASE COLLECTION <======== //

var authArray = []

var masterAdmins = [
    "IZ74AeQVaSn9oZl1ubkXGQYi2AaezQkrDG0Nj2kIvqI" //stacjs
    //"" // alelelexe.
]

var pubAdmins = [];

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

function announce(msg, targetId, color, style, sound) {
    if (color == null) {
        color = 0xFFFD82;
    }
    if (style == null) {
        style = "bold";
    }
    if (sound == null) {
        sound = 0;
    }
    room.sendAnnouncement(msg, targetId, color, style, sound);
    console.log("Announce: " + msg);
}

function whisper(msg, targetId, color, style, sound) {
    if (color == null) {
        color = 0x66C7FF;
    }
    if (style == null) {
        style = "normal";
    }
    if (sound == null) {
        sound = 0;
    }
    room.sendAnnouncement(msg, targetId, color, style, sound);
    if (room.getPlayer(targetId) != null) {
        console.log("Whisper -> " + room.getPlayer(targetId).name + ": " + msg);
    }
}

// ========> GAME FUNCTIONS <======== //

room.onPlayerJoin = async function (player) {
    console.log(`${player.name} joined`);
    whisper(`Welcome to VHPL, enter !help for available commands`,player.id)

    if (masterAdmins.findIndex((auth) => auth == player.auth) != -1) {
        masterAdmins.push(player.id);
        announce(`Master Admin ${player.name} has joined.`);
        room.setPlayerAdmin(player.id, true);
    }
    if (pubAdmins.findIndex((auth) => auth == player.auth) != -1) {
        pubAdmins.push(player.id);
        announce(`Admin ${player.name} has joined.`);
        room.setPlayerAdmin(player.id,true);
    }
    var players = room.getPlayerList().filter((player) => player.id != 0);
}

room.onPlayerLeave = function (player) {
    console.log(`${player.name} has left.`)
}

room.onPlayerChat = function (message, player) {
    
}
