import { v4 as uuidv4 } from "uuid";

class Category {
    // a interrogação avisa que o parâmetro é opcional
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    contructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Category };
