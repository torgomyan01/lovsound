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
declare interface IAllLikes {
    AllLikes: {
        AllLikes: ILikes[];
    };
}

declare interface ILikes {
    by: string;
    id: string;
    time: string;
    track: string;
}

declare interface IPlayer {
    Player: {
        startPlay: boolean;
        playList: IAllTracks[];
        playingId: number;
    };
}

declare interface IUser {
    city: string;
    country: string;
    date: string;
    description: string;
    email: string;
    first_name: string;
    idu: string;
    last_name: string;
}

declare interface IAuth {
    AuthSite: {
        userID: number | null;
        isLogin: boolean;
        userInfo: IUser | null;
    };
}
