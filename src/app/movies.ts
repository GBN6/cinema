export interface Hours {
  hour: string;
  reservedSeats: string[]
}

export interface Movies {
  id: number;
  img: string;
  title: string;
  genre: string;
  length: string;
  ageRest: string;
  description: string;
  hours:Hours[];
  score: string;
  director: string;
  actors: string[];
  boxOff: number;
  premier: boolean;
}

// export const movie: Movies[] = [
//   {
//     id: 0,
//     img: 'assets/wakanda_poster.jpg',
//     title: 'Black Panther: Wakanda Forever',
//     genre: 'Action, Super hero',
//     length: '130 min',
//     ageRest: 'PG-13',
//     description: 'Whenever i have time i will add some description',
//     hours:[
//       {
//         hour: '12.30',
//         reservedSeats: ['A3', 'C4', 'H5']
//       },
//       {
//         hour: '16.30',
//         reservedSeats: ['A10', 'B15', 'B16', 'C12', 'F1']
//       },
//       {
//         hour: '20.30',
//         reservedSeats: ['A7', 'A6', 'D2', 'D4', 'E7', 'E10', 'F1']
//       },
//     ] ,
//     score: '8/10',
//     director: 'Ryan Coogler',
//     actors: ['Maciek', 'Janek', 'Ktos', 'Leszek'],
//     boxOff: 200,
//     premier: true,
//   },
//   {
//     id: 1,
//     img: 'assets/apokawixa_poster.jpeg',
//     title: 'Apokawixa',
//     genre: 'Horro',
//     length: '110 min',
//     ageRest: 'PG-13',
//     description: 'Whenever i have time i will add some description',
//     hours:[
//       {
//         hour: '10.30',
//         reservedSeats: ['H5', 'H6', 'I3', 'I7']
//       },
//       {
//         hour: '14.30',
//         reservedSeats: ['G10', 'H15', 'H16', 'F12', 'F1']
//       },
//       {
//         hour: '20.30',
//         reservedSeats: ['E7', 'E6', 'F2', 'F4', 'G7', 'H10', 'I1']
//       },
//     ] ,
//     score: '6/10',
//     director: 'James Cameron',
//     actors: ['Artut', 'Ziemowit', 'Wiesiek', 'Leszek'],
//     boxOff: 10,
//     premier: false,
//   },
// ];
