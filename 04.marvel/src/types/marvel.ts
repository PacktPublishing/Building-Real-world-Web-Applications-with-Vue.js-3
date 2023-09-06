export enum Path {
    CHARACTERS = "characters",
    COMICS = "comics",
    CREATORS = "creators",
    EVENTS = "events",
    SERIES = "series",
    STORIES = "stories",
}

export type PagedResults = {
    count: number,
    limit: number,
    offset: number,
    total: number
}

export interface Characters extends PagedResults {
    results: Character[]
}

export interface Comics extends PagedResults {
    results: Comic[]
}

export type Character = {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    comics: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    series: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    stories: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
            type: string;
        }[];
    };
    events: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    urls: {
        type: string;
        url: string;
    }[];
};

export type Comic = {
    id: number;
    title: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    creators: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
            role: string;
        }[];
    };
    characters: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    series: {
        resourceURI: string;
        name: string;
    };
    stories: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
            type: string;
        }[];
    };
    events: {
        available: number;
        collectionURI: string;
        items: {
            resourceURI: string;
            name: string;
        }[];
    };
    urls: {
        type: string;
        url: string;
    }[];
};