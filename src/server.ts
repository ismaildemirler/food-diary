import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.json());

type Entry = {
    id: string;
    food: string;
    calories: number;
    date: string;
};

let entries: Entry[] = [];

app.get('/entries', (req: Request, res: Response) => {
    res.json(entries);
});

app.post('/entries', (req: Request, res: Response) => {
    const { food, calories, date } = req.body;
    const newEntry: Entry = { id: uuidv4(), food, calories, date };
    entries.push(newEntry);
    res.status(201).json(newEntry);
});

app.put('/entries/:id', (req, res) => {
    const { id } = req.params;
    const { food, calories, date } = req.body;

    const entryIndex = entries.findIndex(entry => entry.id === id);
    if (entryIndex !== -1) {
        entries[entryIndex] = { ...entries[entryIndex], food, calories, date };
        res.json(entries[entryIndex]);
    } else {
        res.status(404).json({ message: 'Entry not found' });
    }
});

app.delete('/entries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    entries = entries.filter(entry => entry.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
