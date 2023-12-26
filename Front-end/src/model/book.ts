export interface Book{
    averageRating: number | undefined
    title:string
    description?:string
    id:number
    isbn:string
    price: number
    author: string
    category?:string
    publishDate?: Date
    publisher?:string
    pagesNumber?:number
    coverImageLink?:string
    amount: number
}

export interface Review{
    comment?: string
    rate?: number
}

export interface BooksResponse{
    message?: string
    books?: Book[]
}