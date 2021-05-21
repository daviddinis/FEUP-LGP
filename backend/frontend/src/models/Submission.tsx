export default interface Submission {
    id: string;
    user: {
      id: string,
      username: string,
      isFlagged: boolean;
    };
    name: string;
    type: string;
    state: number;
    date: Date;
  }