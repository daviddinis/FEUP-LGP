export default interface Submission {
    id: string;
    user: string;
    isFlagged: boolean;
    name: string;
    type: string;
    state: number;
    date: Date;
  }