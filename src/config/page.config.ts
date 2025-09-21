interface PageConfig {
    HOME: string;
    LOGIN: string;
    NOT_FOUND: string;
    BUCKET: string;
    LIST: string;
    SINGLE: (id: number) => string;
}

const PAGE: PageConfig = {
    HOME: "/",
    LOGIN: "/login",
    NOT_FOUND: "/not-found",
    BUCKET: "/bucket",
    LIST: "/list",
    SINGLE: (id: number) => `/list/${id}`,
}

export { PAGE };