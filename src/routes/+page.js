import { randomItem } from 'supergeneric/randomItem'

export const load = async () => {
  let quotes = [
    {
      text: 'Life is really simple, but we insist on making it complicated.',
      author: 'Confucius',
    },
    {
      text: `Like all magnificent things, it's very simple.`,
      author: 'Natalie Babbitt, Tuck Everlasting',
    },
    {
      text: `Every solution to every problem is simple. It's the distance between the two where the mystery lies.`,
      author: 'Derek Landy, Skulduggery Pleasant',
    },
    {
      text: `Every solution to every problem is simple. It's the distance between the two where the mystery lies.`,
      author: 'Derek Landy, Skulduggery Pleasant',
    },
    {
      text: `Nature is pleased with simplicity. And nature is no dummy.`,
      author: 'Isaac Newton',
    },
    {
      text: `I do believe in simplicity. It is astonishing as well as sad, how many trivial affairs even the wisest thinks he must attend to in a day; how singular an affair he thinks he must omit. When the mathematician would solve a difficult problem, he first frees the equation of all incumbrances, and reduces it to its simplest terms. So simplify the problem of life, distinguish the necessary and the real. Probe the earth to see where your main roots run.`,
      author: 'Henry David Thoreau',
    },
  ]

  // grab a random quote
  let quote = randomItem(quotes)

	return { quote }
}
