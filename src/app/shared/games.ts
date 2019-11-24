export class Games {

    // GAMES: {
    //     id: number,
    //     name: string
    // }[];

    GAMES: Array<string>;

    constructor() {
        this.GAMES = [
            'Bioshock',
            'Amnesia: The Dark Descent',
            'Tomb Raider',
            'Fallout NV',
            'Fallout 4',
            'Portal',
            'Portal 2',
            'Super Mario',
            'Grand Theft Auto V',
            'Dead Space',
            'Tetris'
        ];
    }

    getGames() {
        return this.GAMES;
    }

}

// { id: 1, name: 'Amnesia: The Dark Descent' },
//         { id: 2, name: 'Tomb Raider' },
//         { id: 3, name: 'Fallout NV' },
//         { id: 4, name: 'Fallout 4' },
//         { id: 5, name: 'Portal' },
//         { id: 6, name: 'Portal 2' },
//         { id: 7, name: 'Super Mario' },
//         { id: 8, name: 'Portal' },
//         { id: 9, name: 'Portal' },
//         { id: 10, name: 'Portal' },
//         { id: 11, name: 'Bioshock' },
//         { id: 12, name: 'Grand Theft Auto V' },
//         { id: 13, name: 'Dead Space' },
//         { id: 14, name: 'Tetris' }
