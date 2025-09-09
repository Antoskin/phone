interface PageConfig {
    HOME: string;
    NOT_FOUND: string;
    BUCKET: string;
    LIST: string;
    SINGLE: (id: number) => string;
}

const PAGE: PageConfig = {
    HOME: "/",
    NOT_FOUND: "/not-found",
    BUCKET: "/bucket",
    LIST: "/list",
    SINGLE: (id: number) => `/single/${id}`,
}

export { PAGE };