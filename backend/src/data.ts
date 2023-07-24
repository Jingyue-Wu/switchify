interface Song {
    name: string;
    artist: string;
}

let songName: string = '';
let songList: Song[] = [];

function setSongName(name: string) {
    songName = name;
}

function setSongList(list: Song[]) {
    songList = list;
}

export { songName, setSongName, songList, setSongList };
