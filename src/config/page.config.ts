interface PageConfig {
    HOME: string;
    LOGIN: string;
    REGISTER: string;
    NOT_FOUND: string;
    BUCKET: string;
    LIST: string;
    SINGLE: (id: number) => string;
    PROFILE: string;
}

const PAGE: PageConfig = {
    HOME: "/",
    LOGIN: "/sign-in",
    REGISTER: "/sign-up",
    NOT_FOUND: "/not-found",
    BUCKET: "/bucket",
    LIST: "/list",
    SINGLE: (id: number) => `/list/${id}`,
    PROFILE: "/profile",
}

export { PAGE };