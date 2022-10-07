
export interface Item {
    id: number;
    itemName: string;
    description: string;
    done: boolean;
    dueDate: Date;
    doneDate?: Date;
}