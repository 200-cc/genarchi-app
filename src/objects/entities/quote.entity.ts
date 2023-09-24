export default class QuoteEntity {
    public id: number
    public text: string
    public author: string
    public likes: number

    constructor(id: number, text: string, author: string, likes: number) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.likes = likes;
    }
}
