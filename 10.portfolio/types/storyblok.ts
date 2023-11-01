export type StoryBlok = {
    _uid: string;
    body: any;
    headline: string;
    title?: string;
    description: string;
    image: {
        filename: string;
        alt: string;
    };
};

export type StoryBlokPortfolio = {
    title: string;
    image: {
        filename: string;
        alt: string;
    };
    body: any;
    description: string;
}

export type StoryblokProject = {
    uuid: string;
    full_slug: string;
    content: StoryBlok
};