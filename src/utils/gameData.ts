// 30+ days worth of educational content

export interface ParallelSentence {
  day: number;
  english: string;
  parallel: string;
  words?: string[];
  difficulty: number;
}

export interface StoryData {
  day: number;
  title: string;
  sentences: string[];
  theme: string;
  difficulty: number;
}

export interface ConceptQuestion {
  day: number;
  subject: 'science' | 'math';
  step: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface VisualWordData {
  day: number;
  imageQuery: string;
  correctWord: string;
  options: string[];
  difficulty: number;
}

export interface QuizQuestion {
  day: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: number;
}

export interface ErrorQuestion {
  day: number;
  incorrectSentence: string;
  correctSentence: string;
  errorType: string;
  explanation: string;
}

export interface MatchMeaningPair {
  day: number;
  word: string;
  meaning: string;
  distractors: string[];
}

// PARALLEL SENTENCE DATA (30+ days)
export const parallelSentences: ParallelSentence[] = [
  // Week 1 - Basic
  { day: 1, english: "The sun rises in the east.", parallel: "The sun comes up in the eastern sky.", words: ["sun", "comes", "up", "in", "the", "eastern", "sky"], difficulty: 1 },
  { day: 2, english: "She loves to read books.", parallel: "She enjoys reading books.", words: ["She", "enjoys", "reading", "books"], difficulty: 1 },
  { day: 3, english: "The dog is barking loudly.", parallel: "The dog barks with a loud voice.", words: ["The", "dog", "barks", "with", "a", "loud", "voice"], difficulty: 1 },
  { day: 4, english: "Water is essential for life.", parallel: "Water is necessary for living.", words: ["Water", "is", "necessary", "for", "living"], difficulty: 1 },
  { day: 5, english: "Children play in the park.", parallel: "Kids have fun at the playground.", words: ["Kids", "have", "fun", "at", "the", "playground"], difficulty: 1 },
  { day: 6, english: "The farmer grows vegetables.", parallel: "The farmer cultivates crops.", words: ["The", "farmer", "cultivates", "crops"], difficulty: 1 },
  { day: 7, english: "Birds fly in the sky.", parallel: "Birds soar through the air.", words: ["Birds", "soar", "through", "the", "air"], difficulty: 1 },
  
  // Week 2 - Intermediate
  { day: 8, english: "He walks to school every day.", parallel: "He goes to school on foot daily.", words: ["He", "goes", "to", "school", "on", "foot", "daily"], difficulty: 2 },
  { day: 9, english: "The river flows through the village.", parallel: "The stream runs across the settlement.", words: ["The", "stream", "runs", "across", "the", "settlement"], difficulty: 2 },
  { day: 10, english: "Mother cooks delicious food.", parallel: "Mother prepares tasty meals.", words: ["Mother", "prepares", "tasty", "meals"], difficulty: 2 },
  { day: 11, english: "The tree provides shade.", parallel: "The tree offers protection from sun.", words: ["The", "tree", "offers", "protection", "from", "sun"], difficulty: 2 },
  { day: 12, english: "Students learn new things.", parallel: "Pupils acquire fresh knowledge.", words: ["Pupils", "acquire", "fresh", "knowledge"], difficulty: 2 },
  { day: 13, english: "The moon shines at night.", parallel: "The moon glows in the darkness.", words: ["The", "moon", "glows", "in", "the", "darkness"], difficulty: 2 },
  { day: 14, english: "Rain helps plants grow.", parallel: "Rainfall assists vegetation development.", words: ["Rainfall", "assists", "vegetation", "development"], difficulty: 2 },
  
  // Week 3 - Advanced
  { day: 15, english: "Hard work leads to success.", parallel: "Dedication brings achievement.", words: ["Dedication", "brings", "achievement"], difficulty: 3 },
  { day: 16, english: "Education opens many doors.", parallel: "Learning creates numerous opportunities.", words: ["Learning", "creates", "numerous", "opportunities"], difficulty: 3 },
  { day: 17, english: "Honesty is the best policy.", parallel: "Truthfulness is the finest approach.", words: ["Truthfulness", "is", "the", "finest", "approach"], difficulty: 3 },
  { day: 18, english: "Time waits for no one.", parallel: "Time doesn't pause for anyone.", words: ["Time", "doesn't", "pause", "for", "anyone"], difficulty: 3 },
  { day: 19, english: "Practice makes perfect.", parallel: "Repetition creates mastery.", words: ["Repetition", "creates", "mastery"], difficulty: 3 },
  { day: 20, english: "Unity brings strength.", parallel: "Togetherness creates power.", words: ["Togetherness", "creates", "power"], difficulty: 3 },
  { day: 21, english: "Knowledge is power.", parallel: "Information provides strength.", words: ["Information", "provides", "strength"], difficulty: 3 },
  
  // Week 4 - Complex
  { day: 22, english: "The early bird catches the worm.", parallel: "Those who start first get the best rewards.", words: ["Those", "who", "start", "first", "get", "the", "best", "rewards"], difficulty: 4 },
  { day: 23, english: "Actions speak louder than words.", parallel: "What you do matters more than what you say.", words: ["What", "you", "do", "matters", "more", "than", "what", "you", "say"], difficulty: 4 },
  { day: 24, english: "Every cloud has a silver lining.", parallel: "Every problem has a positive aspect.", words: ["Every", "problem", "has", "a", "positive", "aspect"], difficulty: 4 },
  { day: 25, english: "Where there's a will, there's a way.", parallel: "Determination finds solutions.", words: ["Determination", "finds", "solutions"], difficulty: 4 },
  { day: 26, english: "A friend in need is a friend indeed.", parallel: "True friendship shows during difficult times.", words: ["True", "friendship", "shows", "during", "difficult", "times"], difficulty: 4 },
  { day: 27, english: "Don't judge a book by its cover.", parallel: "Don't form opinions based on appearance.", words: ["Don't", "form", "opinions", "based", "on", "appearance"], difficulty: 4 },
  { day: 28, english: "Better late than never.", parallel: "Arriving delayed is preferable to not arriving.", words: ["Arriving", "delayed", "is", "preferable", "to", "not", "arriving"], difficulty: 4 },
  { day: 29, english: "Two heads are better than one.", parallel: "Collaboration produces better results.", words: ["Collaboration", "produces", "better", "results"], difficulty: 4 },
  { day: 30, english: "The pen is mightier than the sword.", parallel: "Words have more power than violence.", words: ["Words", "have", "more", "power", "than", "violence"], difficulty: 4 },
];

// STORY BUILDER DATA (30+ stories)
export const storyData: StoryData[] = [
  {
    day: 1,
    title: "The Kind Farmer",
    sentences: [
      "There was a kind farmer named Ramu.",
      "He lived in a small village.",
      "Every morning, he worked in his fields.",
      "One day, he found a wounded bird.",
      "He took care of the bird until it healed.",
      "The bird became his friend forever."
    ],
    theme: "village",
    difficulty: 1
  },
  {
    day: 2,
    title: "Market Day",
    sentences: [
      "It was market day in the village.",
      "Sita went with her mother to buy vegetables.",
      "They saw many colorful fruits.",
      "Sita helped carry the bags.",
      "On the way back, they met their neighbor.",
      "They shared some fruits with her."
    ],
    theme: "market",
    difficulty: 1
  },
  {
    day: 3,
    title: "The School Festival",
    sentences: [
      "The school was preparing for a festival.",
      "All students were excited.",
      "Raj practiced singing for three days.",
      "Maya prepared a beautiful dance.",
      "On festival day, parents came to watch.",
      "Everyone enjoyed the performances."
    ],
    theme: "school",
    difficulty: 1
  },
  {
    day: 4,
    title: "The Lost Goat",
    sentences: [
      "Gopal had a white goat.",
      "One evening, the goat didn't return home.",
      "Gopal searched everywhere in the village.",
      "He asked his friends for help.",
      "They found the goat near the river.",
      "Gopal was very happy to see his goat."
    ],
    theme: "village",
    difficulty: 1
  },
  {
    day: 5,
    title: "Planting Trees",
    sentences: [
      "Teacher told students about trees.",
      "Trees give us oxygen and fruits.",
      "The class decided to plant saplings.",
      "Each student planted one tree.",
      "They watered the plants daily.",
      "After months, small trees started growing."
    ],
    theme: "environment",
    difficulty: 1
  },
  {
    day: 6,
    title: "The Helpful Neighbor",
    sentences: [
      "Mrs. Sharma was an old lady.",
      "She lived alone in the village.",
      "Young children helped her fetch water.",
      "They also bought groceries for her.",
      "Mrs. Sharma told them stories.",
      "The children loved her like a grandmother."
    ],
    theme: "community",
    difficulty: 2
  },
  {
    day: 7,
    title: "Harvest Festival",
    sentences: [
      "The harvest season had arrived.",
      "Farmers celebrated with a big festival.",
      "They thanked nature for good crops.",
      "There was music and dancing.",
      "Everyone shared food together.",
      "It was the happiest day of the year."
    ],
    theme: "festival",
    difficulty: 2
  },
  {
    day: 8,
    title: "The Clever Crow",
    sentences: [
      "A thirsty crow found a pot of water.",
      "But the water level was too low.",
      "The crow couldn't reach it with his beak.",
      "He thought of a clever plan.",
      "He dropped pebbles into the pot.",
      "The water rose up and he drank happily."
    ],
    theme: "wisdom",
    difficulty: 2
  },
  {
    day: 9,
    title: "Learning to Cycle",
    sentences: [
      "Amit wanted to learn cycling.",
      "His father agreed to teach him.",
      "At first, Amit fell many times.",
      "But he didn't give up.",
      "After two weeks of practice,",
      "Amit could ride the bicycle perfectly."
    ],
    theme: "perseverance",
    difficulty: 2
  },
  {
    day: 10,
    title: "The Village Well",
    sentences: [
      "The village well was everyone's water source.",
      "People gathered there every morning.",
      "One summer, the well started drying up.",
      "Villagers worked together to dig it deeper.",
      "After hard work, they found more water.",
      "The village was saved from water shortage."
    ],
    theme: "cooperation",
    difficulty: 2
  },
  // Continue with more stories...
  {
    day: 11,
    title: "The Moonlit Night",
    sentences: [
      "On a full moon night, children played outside.",
      "The moonlight made everything look magical.",
      "Grandmother told them stories about the moon.",
      "She said the moon watches over everyone.",
      "Children looked up and smiled at the moon.",
      "They felt safe and happy."
    ],
    theme: "nature",
    difficulty: 2
  },
  {
    day: 12,
    title: "The Honest Boy",
    sentences: [
      "Ravi found a wallet on the road.",
      "It had a lot of money inside.",
      "He could have kept it for himself.",
      "But he knew it was wrong.",
      "He gave the wallet to the police.",
      "The owner thanked him with tears of joy."
    ],
    theme: "honesty",
    difficulty: 2
  },
  {
    day: 13,
    title: "The Rainy Day",
    sentences: [
      "Dark clouds covered the sky.",
      "Soon, heavy rain started falling.",
      "Children ran outside to play in the rain.",
      "They made paper boats.",
      "The boats sailed in the flowing water.",
      "It was the most fun day ever."
    ],
    theme: "joy",
    difficulty: 1
  },
  {
    day: 14,
    title: "The Village Library",
    sentences: [
      "A new library opened in the village.",
      "It had hundreds of books.",
      "Children visited every day after school.",
      "They discovered new worlds in books.",
      "Reading became their favorite hobby.",
      "The library changed many young lives."
    ],
    theme: "education",
    difficulty: 2
  },
  {
    day: 15,
    title: "The Sick Buffalo",
    sentences: [
      "Farmer's buffalo fell sick.",
      "The veterinary doctor came to check.",
      "He gave medicine and instructions.",
      "The farmer followed them carefully.",
      "After a week, the buffalo recovered.",
      "The farmer thanked the doctor."
    ],
    theme: "care",
    difficulty: 2
  },
  {
    day: 16,
    title: "The Drawing Competition",
    sentences: [
      "A drawing competition was announced.",
      "Meera loved to draw.",
      "She practiced drawing village scenes.",
      "On competition day, she drew her home.",
      "The judges appreciated her work.",
      "She won the first prize."
    ],
    theme: "achievement",
    difficulty: 2
  },
  {
    day: 17,
    title: "The Bridge Builder",
    sentences: [
      "The river separated two villages.",
      "People had difficulty crossing it.",
      "The government decided to build a bridge.",
      "Workers worked hard for months.",
      "Finally, the bridge was completed.",
      "Both villages celebrated together."
    ],
    theme: "progress",
    difficulty: 3
  },
  {
    day: 18,
    title: "The Street Dog",
    sentences: [
      "A street dog roamed the village.",
      "Most people ignored him.",
      "But one girl named Priya fed him daily.",
      "She also gave him a name - Moti.",
      "Moti became friendly and loyal.",
      "He protected the village at night."
    ],
    theme: "kindness",
    difficulty: 2
  },
  {
    day: 19,
    title: "The Science Fair",
    sentences: [
      "The school organized a science fair.",
      "Students made different projects.",
      "Arun created a working water pump model.",
      "He explained how it works to visitors.",
      "Teachers were impressed by his knowledge.",
      "He inspired others to love science."
    ],
    theme: "innovation",
    difficulty: 3
  },
  {
    day: 20,
    title: "The Mango Tree",
    sentences: [
      "An old mango tree stood in the village center.",
      "It had been there for fifty years.",
      "Children played under its shade.",
      "In summer, it gave sweet mangoes.",
      "Everyone loved and protected the tree.",
      "It became a symbol of the village."
    ],
    theme: "heritage",
    difficulty: 2
  },
  {
    day: 21,
    title: "Learning to Save",
    sentences: [
      "Father taught his son about saving money.",
      "He gave him a piggy bank.",
      "Every week, the boy saved some coins.",
      "After six months, he had good savings.",
      "He bought books with that money.",
      "Father was proud of his son's discipline."
    ],
    theme: "financial literacy",
    difficulty: 3
  },
  {
    day: 22,
    title: "The Clean Village Drive",
    sentences: [
      "The village looked dirty and unclean.",
      "Young people decided to change this.",
      "They organized a cleanliness drive.",
      "Everyone joined with brooms and bags.",
      "They cleaned streets and public spaces.",
      "The village became beautiful again."
    ],
    theme: "cleanliness",
    difficulty: 2
  },
  {
    day: 23,
    title: "The Night Sky",
    sentences: [
      "Grandfather loved astronomy.",
      "He showed his grandson the night sky.",
      "He pointed out different constellations.",
      "He told stories about each star pattern.",
      "The boy was fascinated by the universe.",
      "He decided to study astronomy when he grew up."
    ],
    theme: "curiosity",
    difficulty: 3
  },
  {
    day: 24,
    title: "The Pottery Class",
    sentences: [
      "A potter came to teach the children.",
      "He brought clay and a wheel.",
      "Children learned to shape pots.",
      "It was harder than it looked.",
      "But with practice, they improved.",
      "Each child took home their creation."
    ],
    theme: "craft",
    difficulty: 2
  },
  {
    day: 25,
    title: "The Solar Panel",
    sentences: [
      "The village had frequent power cuts.",
      "The school installed solar panels.",
      "Now it had electricity all day.",
      "Students could study even in evenings.",
      "Other villagers also started using solar power.",
      "The village moved towards clean energy."
    ],
    theme: "technology",
    difficulty: 3
  },
  {
    day: 26,
    title: "The Birthday Gift",
    sentences: [
      "It was mother's birthday.",
      "The children had no money for gifts.",
      "They decided to make cards themselves.",
      "They drew beautiful pictures with messages.",
      "They also cleaned the entire house.",
      "Mother said it was the best gift ever."
    ],
    theme: "love",
    difficulty: 2
  },
  {
    day: 27,
    title: "The Football Match",
    sentences: [
      "Two village teams played football.",
      "The match was very competitive.",
      "Both teams played their best.",
      "In the last minute, Rohit scored a goal.",
      "His team won by one goal.",
      "But both teams shook hands after the game."
    ],
    theme: "sportsmanship",
    difficulty: 2
  },
  {
    day: 28,
    title: "The Voice of Radio",
    sentences: [
      "The village got a community radio station.",
      "Local people could share news and stories.",
      "Farmers got weather updates.",
      "Children's programs were broadcast.",
      "Music and education reached everyone.",
      "The radio connected the whole community."
    ],
    theme: "communication",
    difficulty: 3
  },
  {
    day: 29,
    title: "The Medicinal Plants",
    sentences: [
      "The village elder knew about medicinal plants.",
      "She made a garden with healing herbs.",
      "She taught others their uses.",
      "People used them for common illnesses.",
      "Traditional knowledge was preserved.",
      "The village became healthier naturally."
    ],
    theme: "traditional knowledge",
    difficulty: 3
  },
  {
    day: 30,
    title: "The Dream",
    sentences: [
      "Little Anita had a big dream.",
      "She wanted to become a doctor.",
      "Her parents were poor farmers.",
      "But they supported her education.",
      "She studied hard every day.",
      "Years later, she became the village's first doctor."
    ],
    theme: "aspiration",
    difficulty: 3
  },
];

// CONCEPT LADDER DATA (Science & Math - 30+ days)
export const conceptQuestions: ConceptQuestion[] = [
  // Science - Week 1
  { day: 1, subject: 'science', step: 1, question: 'What do plants need to make food?', options: ['Sunlight, water, CO2', 'Only water', 'Only sunlight', 'Soil only'], correctAnswer: 0, explanation: 'Plants need sunlight, water, and carbon dioxide for photosynthesis.' },
  { day: 1, subject: 'science', step: 2, question: 'What is the process called?', options: ['Photosynthesis', 'Respiration', 'Digestion', 'Circulation'], correctAnswer: 0, explanation: 'The process of making food is called photosynthesis.' },
  { day: 2, subject: 'science', step: 1, question: 'What gives plants their green color?', options: ['Chlorophyll', 'Water', 'Sunlight', 'Air'], correctAnswer: 0, explanation: 'Chlorophyll is the green pigment in plants.' },
  { day: 3, subject: 'science', step: 1, question: 'How many states of matter are there?', options: ['Three main states', 'Two', 'Five', 'One'], correctAnswer: 0, explanation: 'The three main states are solid, liquid, and gas.' },
  { day: 4, subject: 'science', step: 1, question: 'What is water in ice form?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correctAnswer: 0, explanation: 'Ice is the solid state of water.' },
  { day: 5, subject: 'science', step: 1, question: 'What gas do we breathe in?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], correctAnswer: 0, explanation: 'We breathe in oxygen from the air.' },
  
  // Math - Week 1
  { day: 1, subject: 'math', step: 1, question: 'What is 5 + 7?', options: ['12', '11', '13', '10'], correctAnswer: 0, explanation: '5 plus 7 equals 12.' },
  { day: 2, subject: 'math', step: 1, question: 'What is 15 - 8?', options: ['7', '6', '8', '9'], correctAnswer: 0, explanation: '15 minus 8 equals 7.' },
  { day: 3, subject: 'math', step: 1, question: 'What is 4 × 3?', options: ['12', '7', '15', '10'], correctAnswer: 0, explanation: '4 times 3 equals 12.' },
  { day: 4, subject: 'math', step: 1, question: 'What is 20 ÷ 4?', options: ['5', '4', '6', '10'], correctAnswer: 0, explanation: '20 divided by 4 equals 5.' },
  { day: 5, subject: 'math', step: 1, question: 'How many sides does a triangle have?', options: ['3', '4', '5', '6'], correctAnswer: 0, explanation: 'A triangle has three sides.' },
  
  // Continue with more days...
  { day: 6, subject: 'science', step: 1, question: 'What is the center of our solar system?', options: ['The Sun', 'The Earth', 'The Moon', 'Mars'], correctAnswer: 0, explanation: 'The Sun is at the center of our solar system.' },
  { day: 7, subject: 'science', step: 1, question: 'How many days does it take Earth to orbit the Sun?', options: ['365 days', '30 days', '7 days', '100 days'], correctAnswer: 0, explanation: 'Earth takes 365 days to complete one orbit around the Sun.' },
  { day: 8, subject: 'science', step: 1, question: 'What is the largest organ in the human body?', options: ['Skin', 'Heart', 'Brain', 'Liver'], correctAnswer: 0, explanation: 'The skin is the largest organ.' },
  { day: 9, subject: 'science', step: 1, question: 'What do bees collect from flowers?', options: ['Nectar', 'Water', 'Leaves', 'Seeds'], correctAnswer: 0, explanation: 'Bees collect nectar to make honey.' },
  { day: 10, subject: 'science', step: 1, question: 'What is the boiling point of water?', options: ['100°C', '50°C', '0°C', '200°C'], correctAnswer: 0, explanation: 'Water boils at 100 degrees Celsius.' },
  
  { day: 6, subject: 'math', step: 1, question: 'What is 7 × 8?', options: ['56', '54', '64', '48'], correctAnswer: 0, explanation: '7 times 8 equals 56.' },
  { day: 7, subject: 'math', step: 1, question: 'What is 100 - 47?', options: ['53', '57', '63', '43'], correctAnswer: 0, explanation: '100 minus 47 equals 53.' },
  { day: 8, subject: 'math', step: 1, question: 'What is 1/2 + 1/2?', options: ['1', '1/4', '2', '0'], correctAnswer: 0, explanation: 'One half plus one half equals one whole.' },
  { day: 9, subject: 'math', step: 1, question: 'How many centimeters in 1 meter?', options: ['100', '10', '1000', '50'], correctAnswer: 0, explanation: 'There are 100 centimeters in 1 meter.' },
  { day: 10, subject: 'math', step: 1, question: 'What is the area of a square with side 5?', options: ['25', '20', '10', '15'], correctAnswer: 0, explanation: 'Area = side × side = 5 × 5 = 25.' },
  
  // More advanced questions
  { day: 11, subject: 'science', step: 1, question: 'What type of energy does a solar panel produce?', options: ['Electrical', 'Heat only', 'Sound', 'Wind'], correctAnswer: 0, explanation: 'Solar panels convert sunlight into electrical energy.' },
  { day: 12, subject: 'science', step: 1, question: 'What is the main gas in Earth\'s atmosphere?', options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Hydrogen'], correctAnswer: 0, explanation: 'Nitrogen makes up about 78% of the atmosphere.' },
  { day: 13, subject: 'science', step: 1, question: 'What force pulls objects toward Earth?', options: ['Gravity', 'Magnetism', 'Friction', 'Pressure'], correctAnswer: 0, explanation: 'Gravity pulls all objects toward the center of Earth.' },
  { day: 14, subject: 'science', step: 1, question: 'What is the process of water turning to vapor?', options: ['Evaporation', 'Condensation', 'Freezing', 'Melting'], correctAnswer: 0, explanation: 'Evaporation is when water turns into water vapor.' },
  { day: 15, subject: 'science', step: 1, question: 'Which vitamin comes from sunlight?', options: ['Vitamin D', 'Vitamin C', 'Vitamin A', 'Vitamin B'], correctAnswer: 0, explanation: 'Our skin produces Vitamin D when exposed to sunlight.' },
  
  { day: 11, subject: 'math', step: 1, question: 'What is 12 × 12?', options: ['144', '124', '134', '154'], correctAnswer: 0, explanation: '12 times 12 equals 144.' },
  { day: 12, subject: 'math', step: 1, question: 'What is 3/4 as a percentage?', options: ['75%', '50%', '25%', '100%'], correctAnswer: 0, explanation: '3/4 = 0.75 = 75%.' },
  { day: 13, subject: 'math', step: 1, question: 'How many angles in a rectangle?', options: ['4', '3', '5', '6'], correctAnswer: 0, explanation: 'A rectangle has 4 angles, all 90 degrees.' },
  { day: 14, subject: 'math', step: 1, question: 'What is the perimeter of a square with side 6?', options: ['24', '36', '12', '18'], correctAnswer: 0, explanation: 'Perimeter = 4 × side = 4 × 6 = 24.' },
  { day: 15, subject: 'math', step: 1, question: 'What is 15% of 100?', options: ['15', '10', '20', '25'], correctAnswer: 0, explanation: '15% of 100 = (15/100) × 100 = 15.' },
];

// VISUAL TO WORD DATA (30 days)
export const visualWordData: VisualWordData[] = [
  { day: 1, imageQuery: 'farmer field', correctWord: 'Farmer', options: ['Farmer', 'Teacher', 'Doctor', 'Driver'], difficulty: 1 },
  { day: 2, imageQuery: 'village market', correctWord: 'Market', options: ['Market', 'School', 'Hospital', 'Temple'], difficulty: 1 },
  { day: 3, imageQuery: 'children playing', correctWord: 'Playing', options: ['Playing', 'Studying', 'Sleeping', 'Eating'], difficulty: 1 },
  { day: 4, imageQuery: 'cow grazing', correctWord: 'Cow', options: ['Cow', 'Buffalo', 'Goat', 'Horse'], difficulty: 1 },
  { day: 5, imageQuery: 'sunset landscape', correctWord: 'Sunset', options: ['Sunset', 'Sunrise', 'Night', 'Moon'], difficulty: 1 },
  { day: 6, imageQuery: 'river flowing', correctWord: 'River', options: ['River', 'Lake', 'Ocean', 'Pond'], difficulty: 1 },
  { day: 7, imageQuery: 'tree nature', correctWord: 'Tree', options: ['Tree', 'Plant', 'Flower', 'Grass'], difficulty: 1 },
  { day: 8, imageQuery: 'school classroom', correctWord: 'Classroom', options: ['Classroom', 'Library', 'Office', 'Home'], difficulty: 2 },
  { day: 9, imageQuery: 'family dinner', correctWord: 'Family', options: ['Family', 'Friends', 'Neighbors', 'Strangers'], difficulty: 2 },
  { day: 10, imageQuery: 'books study', correctWord: 'Books', options: ['Books', 'Papers', 'Notebooks', 'Magazines'], difficulty: 2 },
  { day: 11, imageQuery: 'rain clouds', correctWord: 'Rain', options: ['Rain', 'Snow', 'Storm', 'Wind'], difficulty: 2 },
  { day: 12, imageQuery: 'bicycle riding', correctWord: 'Bicycle', options: ['Bicycle', 'Motorcycle', 'Car', 'Bus'], difficulty: 2 },
  { day: 13, imageQuery: 'vegetables fresh', correctWord: 'Vegetables', options: ['Vegetables', 'Fruits', 'Grains', 'Spices'], difficulty: 2 },
  { day: 14, imageQuery: 'festival celebration', correctWord: 'Festival', options: ['Festival', 'Party', 'Wedding', 'Meeting'], difficulty: 2 },
  { day: 15, imageQuery: 'moon night', correctWord: 'Moon', options: ['Moon', 'Star', 'Sun', 'Planet'], difficulty: 1 },
  { day: 16, imageQuery: 'doctor hospital', correctWord: 'Doctor', options: ['Doctor', 'Nurse', 'Patient', 'Medicine'], difficulty: 2 },
  { day: 17, imageQuery: 'birds flying', correctWord: 'Birds', options: ['Birds', 'Airplane', 'Kite', 'Clouds'], difficulty: 1 },
  { day: 18, imageQuery: 'water well', correctWord: 'Well', options: ['Well', 'Tap', 'River', 'Tank'], difficulty: 2 },
  { day: 19, imageQuery: 'agriculture farming', correctWord: 'Agriculture', options: ['Agriculture', 'Industry', 'Service', 'Trade'], difficulty: 3 },
  { day: 20, imageQuery: 'bridge river', correctWord: 'Bridge', options: ['Bridge', 'Road', 'Building', 'Tower'], difficulty: 2 },
  { day: 21, imageQuery: 'solar panel', correctWord: 'Solar Panel', options: ['Solar Panel', 'Window', 'Mirror', 'Screen'], difficulty: 3 },
  { day: 22, imageQuery: 'pottery clay', correctWord: 'Pottery', options: ['Pottery', 'Painting', 'Sculpture', 'Craft'], difficulty: 3 },
  { day: 23, imageQuery: 'harvest crops', correctWord: 'Harvest', options: ['Harvest', 'Planting', 'Watering', 'Plowing'], difficulty: 3 },
  { day: 24, imageQuery: 'community gathering', correctWord: 'Community', options: ['Community', 'Crowd', 'Audience', 'Team'], difficulty: 3 },
  { day: 25, imageQuery: 'traditional dance', correctWord: 'Dance', options: ['Dance', 'Music', 'Drama', 'Song'], difficulty: 2 },
  { day: 26, imageQuery: 'handloom weaving', correctWord: 'Weaving', options: ['Weaving', 'Sewing', 'Knitting', 'Embroidery'], difficulty: 3 },
  { day: 27, imageQuery: 'nature landscape', correctWord: 'Nature', options: ['Nature', 'City', 'Building', 'Factory'], difficulty: 1 },
  { day: 28, imageQuery: 'education learning', correctWord: 'Education', options: ['Education', 'Entertainment', 'Exercise', 'Employment'], difficulty: 3 },
  { day: 29, imageQuery: 'stars night sky', correctWord: 'Stars', options: ['Stars', 'Lights', 'Fireflies', 'Candles'], difficulty: 2 },
  { day: 30, imageQuery: 'village rural', correctWord: 'Village', options: ['Village', 'City', 'Town', 'District'], difficulty: 2 },
];

// ERROR DETECTIVE DATA (30 days)
export const errorQuestions: ErrorQuestion[] = [
  { day: 1, incorrectSentence: 'She go to school daily.', correctSentence: 'She goes to school daily.', errorType: 'verb', explanation: 'Use "goes" with third person singular (she, he, it).' },
  { day: 2, incorrectSentence: 'The childrens are playing.', correctSentence: 'The children are playing.', errorType: 'plural', explanation: '"Children" is already plural, no need for "s".' },
  { day: 3, incorrectSentence: 'I has a book.', correctSentence: 'I have a book.', errorType: 'verb', explanation: 'Use "have" with I, you, we, they.' },
  { day: 4, incorrectSentence: 'He dont like milk.', correctSentence: 'He doesn\'t like milk.', errorType: 'contraction', explanation: 'Use "doesn\'t" (does not) with he, she, it.' },
  { day: 5, incorrectSentence: 'They was happy.', correctSentence: 'They were happy.', errorType: 'verb', explanation: 'Use "were" with plural subjects.' },
  { day: 6, incorrectSentence: 'Me and my friend went.', correctSentence: 'My friend and I went.', errorType: 'pronoun', explanation: 'Use "I" as subject, and put yourself last.' },
  { day: 7, incorrectSentence: '5 + 3 = 7', correctSentence: '5 + 3 = 8', errorType: 'math', explanation: '5 plus 3 equals 8, not 7.' },
  { day: 8, incorrectSentence: 'Plants make food at night.', correctSentence: 'Plants make food during daytime.', errorType: 'science', explanation: 'Photosynthesis needs sunlight, so happens during day.' },
  { day: 9, incorrectSentence: 'Water freezes at 100°C.', correctSentence: 'Water freezes at 0°C.', errorType: 'science', explanation: 'Water freezes at 0°C and boils at 100°C.' },
  { day: 10, incorrectSentence: 'A triangle has four sides.', correctSentence: 'A triangle has three sides.', errorType: 'math', explanation: 'Triangle means three sides.' },
  { day: 11, incorrectSentence: 'The sun rises in west.', correctSentence: 'The sun rises in the east.', errorType: 'general', explanation: 'The sun rises in the east and sets in the west.' },
  { day: 12, incorrectSentence: 'She is more taller than me.', correctSentence: 'She is taller than me.', errorType: 'comparison', explanation: 'Don\'t use "more" with "-er" comparatives.' },
  { day: 13, incorrectSentence: 'I seen him yesterday.', correctSentence: 'I saw him yesterday.', errorType: 'verb', explanation: 'Use "saw" for past tense of "see".' },
  { day: 14, incorrectSentence: 'He can runs fast.', correctSentence: 'He can run fast.', errorType: 'verb', explanation: 'After "can", use base form of verb.' },
  { day: 15, incorrectSentence: '12 ÷ 4 = 4', correctSentence: '12 ÷ 4 = 3', errorType: 'math', explanation: '12 divided by 4 equals 3.' },
  { day: 16, incorrectSentence: 'There are nine planets.', correctSentence: 'There are eight planets.', errorType: 'science', explanation: 'Since 2006, Pluto is not considered a planet.' },
  { day: 17, incorrectSentence: 'Me am hungry.', correctSentence: 'I am hungry.', errorType: 'pronoun', explanation: 'Use "I" as subject, "me" as object.' },
  { day: 18, incorrectSentence: 'She dont has a pen.', correctSentence: 'She doesn\'t have a pen.', errorType: 'verb', explanation: 'Use "doesn\'t have" with third person singular.' },
  { day: 19, incorrectSentence: 'We was going home.', correctSentence: 'We were going home.', errorType: 'verb', explanation: 'Use "were" with we, you, they.' },
  { day: 20, incorrectSentence: '7 × 6 = 48', correctSentence: '7 × 6 = 42', errorType: 'math', explanation: '7 times 6 equals 42.' },
  { day: 21, incorrectSentence: 'He is more better now.', correctSentence: 'He is better now.', errorType: 'comparison', explanation: '"Better" is already comparative, don\'t add "more".' },
  { day: 22, incorrectSentence: 'The Earth is flat.', correctSentence: 'The Earth is round.', errorType: 'science', explanation: 'Earth is spherical (round) in shape.' },
  { day: 23, incorrectSentence: 'I and you are friends.', correctSentence: 'You and I are friends.', errorType: 'pronoun', explanation: 'Put yourself last in listing.' },
  { day: 24, incorrectSentence: 'A square has 3 sides.', correctSentence: 'A square has 4 sides.', errorType: 'math', explanation: 'A square has 4 equal sides.' },
  { day: 25, incorrectSentence: 'Birds has wings.', correctSentence: 'Birds have wings.', errorType: 'verb', explanation: 'Use "have" with plural subjects.' },
  { day: 26, incorrectSentence: '50 - 25 = 35', correctSentence: '50 - 25 = 25', errorType: 'math', explanation: '50 minus 25 equals 25.' },
  { day: 27, incorrectSentence: 'She is the most tallest.', correctSentence: 'She is the tallest.', errorType: 'comparison', explanation: 'Don\'t use "most" with "-est" superlatives.' },
  { day: 28, incorrectSentence: 'Humans have five senses.', correctSentence: 'Humans have five basic senses.', errorType: 'science', explanation: 'The five basic senses are sight, hearing, smell, taste, touch.' },
  { day: 29, incorrectSentence: 'My brother he is a teacher.', correctSentence: 'My brother is a teacher.', errorType: 'pronoun', explanation: 'Don\'t use double subject.' },
  { day: 30, incorrectSentence: '1/2 + 1/4 = 2/6', correctSentence: '1/2 + 1/4 = 3/4', errorType: 'math', explanation: '1/2 + 1/4 = 2/4 + 1/4 = 3/4.' },
];

// MATCH MEANING DATA (30 days)
export const matchMeaningData: MatchMeaningPair[] = [
  { day: 1, word: 'Happy', meaning: 'Feeling joy', distractors: ['Feeling sad', 'Feeling angry', 'Feeling tired'] },
  { day: 2, word: 'Beautiful', meaning: 'Very pretty', distractors: ['Very ugly', 'Very big', 'Very small'] },
  { day: 3, word: 'Strong', meaning: 'Having power', distractors: ['Being weak', 'Being slow', 'Being fast'] },
  { day: 4, word: 'Wise', meaning: 'Having good judgment', distractors: ['Being foolish', 'Being young', 'Being old'] },
  { day: 5, word: 'Brave', meaning: 'Showing courage', distractors: ['Showing fear', 'Showing anger', 'Showing joy'] },
  { day: 6, word: 'Kind', meaning: 'Being helpful and caring', distractors: ['Being mean', 'Being lazy', 'Being busy'] },
  { day: 7, word: 'Honest', meaning: 'Telling the truth', distractors: ['Telling lies', 'Being quiet', 'Being loud'] },
  { day: 8, word: 'Patient', meaning: 'Able to wait calmly', distractors: ['Always in hurry', 'Always sleeping', 'Always eating'] },
  { day: 9, word: 'Generous', meaning: 'Willing to give', distractors: ['Being selfish', 'Being hungry', 'Being thirsty'] },
  { day: 10, word: 'Humble', meaning: 'Not proud or arrogant', distractors: ['Very proud', 'Very rich', 'Very poor'] },
  { day: 11, word: 'Curious', meaning: 'Wanting to know', distractors: ['Not interested', 'Always sleeping', 'Always playing'] },
  { day: 12, word: 'Creative', meaning: 'Having new ideas', distractors: ['Copying others', 'Being boring', 'Being normal'] },
  { day: 13, word: 'Diligent', meaning: 'Working hard', distractors: ['Being lazy', 'Being careless', 'Being sleepy'] },
  { day: 14, word: 'Grateful', meaning: 'Feeling thankful', distractors: ['Being ungrateful', 'Being sad', 'Being angry'] },
  { day: 15, word: 'Loyal', meaning: 'Being faithful', distractors: ['Being traitor', 'Being stranger', 'Being enemy'] },
  { day: 16, word: 'Polite', meaning: 'Having good manners', distractors: ['Being rude', 'Being silly', 'Being funny'] },
  { day: 17, word: 'Responsible', meaning: 'Being dependable', distractors: ['Being careless', 'Being young', 'Being small'] },
  { day: 18, word: 'Confident', meaning: 'Believing in yourself', distractors: ['Full of doubt', 'Full of fear', 'Full of anger'] },
  { day: 19, word: 'Friendly', meaning: 'Easy to talk to', distractors: ['Hard to approach', 'Always busy', 'Always absent'] },
  { day: 20, word: 'Compassionate', meaning: 'Showing sympathy', distractors: ['Being cruel', 'Being neutral', 'Being distant'] },
  { day: 21, word: 'Optimistic', meaning: 'Hopeful about future', distractors: ['Always worried', 'Always sad', 'Always angry'] },
  { day: 22, word: 'Perseverance', meaning: 'Not giving up', distractors: ['Quitting easily', 'Being lazy', 'Being afraid'] },
  { day: 23, word: 'Sincere', meaning: 'Being genuine', distractors: ['Being fake', 'Being pretend', 'Being dishonest'] },
  { day: 24, word: 'Thoughtful', meaning: 'Considering others', distractors: ['Being selfish', 'Being careless', 'Being rushed'] },
  { day: 25, word: 'Energetic', meaning: 'Full of energy', distractors: ['Always tired', 'Always lazy', 'Always sleeping'] },
  { day: 26, word: 'Intelligent', meaning: 'Being smart', distractors: ['Being foolish', 'Being slow', 'Being careless'] },
  { day: 27, word: 'Flexible', meaning: 'Able to adapt', distractors: ['Very rigid', 'Very strict', 'Very fixed'] },
  { day: 28, word: 'Ambitious', meaning: 'Having big goals', distractors: ['No dreams', 'No plans', 'No hopes'] },
  { day: 29, word: 'Cooperative', meaning: 'Working together', distractors: ['Working alone', 'Fighting always', 'Competing always'] },
  { day: 30, word: 'Determined', meaning: 'Having strong will', distractors: ['Giving up easily', 'Being confused', 'Being uncertain'] },
];

// QUIZ BATTLE DATA (30+ days, multiple subjects)
export const quizQuestions: QuizQuestion[] = [
  // English - Week 1
  { day: 1, question: 'What is the plural of "child"?', options: ['Children', 'Childs', 'Childes', 'Childern'], correctAnswer: 0, subject: 'English', difficulty: 1 },
  { day: 1, question: 'Which is a noun?', options: ['Table', 'Run', 'Beautiful', 'Quickly'], correctAnswer: 0, subject: 'English', difficulty: 1 },
  { day: 2, question: 'What is the opposite of "big"?', options: ['Small', 'Large', 'Huge', 'Tall'], correctAnswer: 0, subject: 'English', difficulty: 1 },
  { day: 2, question: 'Which word is a verb?', options: ['Jump', 'Happy', 'Slow', 'Table'], correctAnswer: 0, subject: 'English', difficulty: 1 },
  { day: 3, question: '"She ___ to school" - Fill the blank', options: ['goes', 'go', 'going', 'gone'], correctAnswer: 0, subject: 'English', difficulty: 1 },
  
  // Math - Week 1
  { day: 1, question: 'What is 9 + 6?', options: ['15', '14', '16', '13'], correctAnswer: 0, subject: 'Math', difficulty: 1 },
  { day: 2, question: 'What is 18 - 9?', options: ['9', '8', '10', '7'], correctAnswer: 0, subject: 'Math', difficulty: 1 },
  { day: 3, question: 'What is 6 × 7?', options: ['42', '48', '36', '54'], correctAnswer: 0, subject: 'Math', difficulty: 1 },
  { day: 4, question: 'What is 24 ÷ 6?', options: ['4', '3', '5', '6'], correctAnswer: 0, subject: 'Math', difficulty: 1 },
  { day: 5, question: 'How many minutes in 1 hour?', options: ['60', '100', '50', '30'], correctAnswer: 0, subject: 'Math', difficulty: 1 },
  
  // Science - Week 1
  { day: 1, question: 'What do we call baby frog?', options: ['Tadpole', 'Calf', 'Kitten', 'Puppy'], correctAnswer: 0, subject: 'Science', difficulty: 1 },
  { day: 2, question: 'Which planet is called Red Planet?', options: ['Mars', 'Venus', 'Jupiter', 'Saturn'], correctAnswer: 0, subject: 'Science', difficulty: 1 },
  { day: 3, question: 'What is the hardest natural substance?', options: ['Diamond', 'Iron', 'Gold', 'Silver'], correctAnswer: 0, subject: 'Science', difficulty: 2 },
  { day: 4, question: 'How many bones in adult human body?', options: ['206', '200', '300', '150'], correctAnswer: 0, subject: 'Science', difficulty: 2 },
  { day: 5, question: 'What gas do plants release?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], correctAnswer: 0, subject: 'Science', difficulty: 1 },
  
  // General Knowledge
  { day: 1, question: 'How many colors in a rainbow?', options: ['7', '5', '6', '8'], correctAnswer: 0, subject: 'GK', difficulty: 1 },
  { day: 2, question: 'How many days in a week?', options: ['7', '5', '6', '8'], correctAnswer: 0, subject: 'GK', difficulty: 1 },
  { day: 3, question: 'What is the capital of India?', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], correctAnswer: 0, subject: 'GK', difficulty: 1 },
  { day: 4, question: 'How many continents are there?', options: ['7', '5', '6', '8'], correctAnswer: 0, subject: 'GK', difficulty: 1 },
  { day: 5, question: 'Which is the longest river in India?', options: ['Ganga', 'Yamuna', 'Godavari', 'Krishna'], correctAnswer: 0, subject: 'GK', difficulty: 2 },
  
  // More questions for extended days
  { day: 6, question: 'What is the past tense of "go"?', options: ['went', 'goes', 'gone', 'going'], correctAnswer: 0, subject: 'English', difficulty: 2 },
  { day: 7, question: 'What is 15 × 4?', options: ['60', '50', '70', '55'], correctAnswer: 0, subject: 'Math', difficulty: 2 },
  { day: 8, question: 'Which organ pumps blood?', options: ['Heart', 'Liver', 'Kidney', 'Lungs'], correctAnswer: 0, subject: 'Science', difficulty: 1 },
  { day: 9, question: 'How many states in India?', options: ['28', '25', '29', '30'], correctAnswer: 0, subject: 'GK', difficulty: 2 },
  { day: 10, question: 'What is 1/4 of 100?', options: ['25', '50', '75', '10'], correctAnswer: 0, subject: 'Math', difficulty: 2 },
];

export const BADGES = [
  { id: 'grammar-guardian', name: 'Grammar Guardian', description: 'Master 10 grammar concepts', icon: '📚', requirement: 10 },
  { id: 'story-teller', name: 'Story Teller of the Village', description: 'Complete 5 stories', icon: '📖', requirement: 5 },
  { id: 'math-warrior', name: 'Math Warrior', description: 'Solve 20 math problems', icon: '🔢', requirement: 20 },
  { id: 'science-explorer', name: 'Science Explorer', description: 'Answer 15 science questions', icon: '🔬', requirement: 15 },
  { id: 'speed-master', name: 'Speed Master', description: 'Win 10 quick battles', icon: '⚡', requirement: 10 },
  { id: 'error-hunter', name: 'Error Hunter', description: 'Find 15 errors', icon: '🔍', requirement: 15 },
  { id: 'word-wizard', name: 'Word Wizard', description: 'Match 20 meanings', icon: '✨', requirement: 20 },
  { id: 'streak-keeper', name: 'Streak Keeper', description: '7 day streak', icon: '🔥', requirement: 7 },
  { id: 'perfect-score', name: 'Perfect Score', description: 'Get 100% in any game', icon: '💯', requirement: 1 },
  { id: 'village-hero', name: 'Village Hero', description: 'Complete all levels', icon: '🏆', requirement: 1 },
];
