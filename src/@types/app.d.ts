declare interface IAlertSite {
    AlertSite: {
        open: boolean;
        message: string;
        processUploading: number;
    };
}

declare interface IModalSites {
    ModalSites: {
        modalLogin: boolean;
        modalRegister: boolean;
    };
}

declare interface IAllTracksGet {
    AllTracks: {
        allTracks: IAllTracks[];
    };
}

declare interface ITracksForPlayer {
    id: number;
    track: IAllTracks;
}

declare interface IAllTracks {
    description: string;
    download: string;
    downloads: string;
    folder_name: string;
    id: string;
    likes: null | string;
    name: string;
    public: string;
    size: string;
    tag: string;
    time: string;
    title: string;
    uid: string;
    views: string;
}

declare interface IPlayer {
    Player: {
        startPlay: boolean;
        playList: ITracksForPlayer[];
        playingId: number;
    };
}
