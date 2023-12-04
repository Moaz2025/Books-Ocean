export interface Book{
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