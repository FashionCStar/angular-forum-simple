export class Todo {
    static _id = 0;
    id: string;
    title: string;
    state: string;
    completedAt: any;
    createdAt: any;

    constructor(title?, state?) {
        this.id = '' + Todo._id++;

        this.title = title;
        this.state = state;

        this.createdAt = new Date()
    }
}
