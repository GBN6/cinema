export interface Movies {
    id: number;
    title: string;
    genere: string;
    length: string;
    ageRest: string;
    description: string;
    hours: number[];
    score: string;
    director: string;
    actors: string[];
    boxOff: number;
    premier: boolean;
  }
  
  export const movie: Movies = [
    {
      id: 1,
      title: 'Black Panther: Wakanda Forever',
      genre: 'Action, Super hero',
      length: '130 min',
      ageRest: 'PG-13',
      description: 'Whenever i have time i will add some description',
      hours: ['12.30', '16.30', '18.30'],
      score: '8/10',
      director: 'Ryan Coogler',
      actors: ['Maciek', 'Janek', 'Ktos', 'Leszek'],
      boxOff: 200,
      premier: true
    },
    {
        id: 1,
        title: 'Apokawixa',
        genre: 'Horro',
        length: '110 min',
        ageRest: 'PG-13',
        description: 'Whenever i have time i will add some description',
        hours: ['12.30', '16.30', '18.30'],
        score: '6/10',
        director: 'James Cameron',
        actors: ['Maciek', 'Janek', 'Ktos', 'Leszek'],
        boxOff: 200,
        premier: false
    },
  ];
  