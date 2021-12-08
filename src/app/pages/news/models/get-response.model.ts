export interface NewsResponseI {
    title: string,
    multimedia: { url: string }[]
}



export interface NewsResponse {
    results: NewsResponseI[]
}