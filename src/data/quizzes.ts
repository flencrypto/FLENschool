export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 1 | 2 | 3;
}

export interface Quiz {
  topicId: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    topicId: "bio-cells",
    questions: [
      {
        id: "bio-cells-q1",
        question: "Which of the following is found in a plant cell but NOT in an animal cell?",
        options: ["Mitochondria", "Cell wall", "Nucleus", "Cell membrane"],
        correctIndex: 1,
        explanation: "Plant cells have a cell wall (made of cellulose), a large vacuole, and chloroplasts, which are not found in animal cells.",
        difficulty: 1,
      },
      {
        id: "bio-cells-q2",
        question: "What is osmosis?",
        options: [
          "The movement of molecules from high to low concentration",
          "The movement of water from low to high solute concentration through a semi-permeable membrane",
          "The movement of water from high to low solute concentration through a semi-permeable membrane",
          "Active transport of ions against a concentration gradient",
        ],
        correctIndex: 2,
        explanation: "Osmosis is the movement of water molecules from an area of high water concentration (low solute) to low water concentration (high solute) through a semi-permeable membrane.",
        difficulty: 2,
      },
      {
        id: "bio-cells-q3",
        question: "Mitosis produces:",
        options: [
          "4 genetically different cells",
          "2 genetically identical cells",
          "4 genetically identical cells",
          "2 genetically different cells",
        ],
        correctIndex: 1,
        explanation: "Mitosis produces 2 genetically identical daughter cells with the same number of chromosomes as the parent cell. It is used for growth and repair.",
        difficulty: 1,
      },
      {
        id: "bio-cells-q4",
        question: "Which type of cell does NOT have a membrane-bound nucleus?",
        options: ["Animal cell", "Plant cell", "Fungal cell", "Bacterial cell"],
        correctIndex: 3,
        explanation: "Bacterial cells are prokaryotic – they do not have a nucleus surrounded by a membrane. Their DNA floats freely in the cytoplasm.",
        difficulty: 2,
      },
      {
        id: "bio-cells-q5",
        question: "Active transport differs from diffusion because active transport:",
        options: [
          "Moves molecules from high to low concentration",
          "Does not require energy",
          "Moves molecules against the concentration gradient and requires energy",
          "Only moves water molecules",
        ],
        correctIndex: 2,
        explanation: "Active transport uses energy (from respiration) to move molecules against the concentration gradient – from low to high concentration. Diffusion is passive and moves molecules down a concentration gradient.",
        difficulty: 3,
      },
    ],
  },
  {
    topicId: "maths-quadratics",
    questions: [
      {
        id: "maths-quad-q1",
        question: "Solve: x² - 5x + 6 = 0",
        options: ["x = 2 or x = 3", "x = -2 or x = -3", "x = 1 or x = 6", "x = -1 or x = -6"],
        correctIndex: 0,
        explanation: "Factorise: (x - 2)(x - 3) = 0, so x = 2 or x = 3. Check: 2×3 = 6 ✓ and 2+3 = 5 ✓",
        difficulty: 1,
      },
      {
        id: "maths-quad-q2",
        question: "What is the discriminant of 2x² + 3x - 5 = 0?",
        options: ["9", "49", "−31", "−49"],
        correctIndex: 1,
        explanation: "Discriminant = b² − 4ac = 3² − 4(2)(−5) = 9 + 40 = 49. Since discriminant > 0, there are two real solutions.",
        difficulty: 2,
      },
      {
        id: "maths-quad-q3",
        question: "Complete the square: x² + 6x + 5 = (x + a)² + b. What are a and b?",
        options: ["a = 3, b = −4", "a = 6, b = 5", "a = 3, b = 14", "a = −3, b = −4"],
        correctIndex: 0,
        explanation: "x² + 6x + 5 = (x + 3)² − 9 + 5 = (x + 3)² − 4. So a = 3 and b = −4.",
        difficulty: 3,
      },
    ],
  },
  {
    topicId: "chem-bonding",
    questions: [
      {
        id: "chem-bond-q1",
        question: "Ionic bonding occurs between:",
        options: [
          "Two non-metals",
          "A metal and a non-metal",
          "Two metals",
          "A metalloid and a metal",
        ],
        correctIndex: 1,
        explanation: "Ionic bonding forms when a metal transfers electrons to a non-metal, creating oppositely charged ions that attract each other electrostatically.",
        difficulty: 1,
      },
      {
        id: "chem-bond-q2",
        question: "Which property is characteristic of ionic compounds?",
        options: [
          "Low melting point",
          "Conduct electricity when solid",
          "Conduct electricity when dissolved in water",
          "Are always gases at room temperature",
        ],
        correctIndex: 2,
        explanation: "Ionic compounds conduct electricity when dissolved in water or when molten, because the ions are free to move and carry charge. They do NOT conduct electricity when solid (ions are fixed in place).",
        difficulty: 2,
      },
      {
        id: "chem-bond-q3",
        question: "In covalent bonding, what is shared between atoms?",
        options: ["Neutrons", "Electrons", "Protons", "Ions"],
        correctIndex: 1,
        explanation: "In covalent bonding, pairs of electrons are shared between non-metal atoms. Each atom contributes one electron to the shared pair.",
        difficulty: 1,
      },
    ],
  },
  {
    topicId: "phys-electricity",
    questions: [
      {
        id: "phys-elec-q1",
        question: "A resistor has a voltage of 12V across it and a current of 3A through it. What is its resistance?",
        options: ["4 Ω", "36 Ω", "0.25 Ω", "9 Ω"],
        correctIndex: 0,
        explanation: "Using Ohm's Law: R = V/I = 12/3 = 4 Ω",
        difficulty: 1,
      },
      {
        id: "phys-elec-q2",
        question: "In a series circuit with two resistors, the total resistance is:",
        options: [
          "Less than either individual resistor",
          "Equal to the smaller resistor",
          "The sum of both resistors",
          "The product of both resistors",
        ],
        correctIndex: 2,
        explanation: "In a series circuit: Rtotal = R1 + R2. The current has only one path, so all resistances add up.",
        difficulty: 2,
      },
      {
        id: "phys-elec-q3",
        question: "Which device measures potential difference in a circuit?",
        options: ["Ammeter", "Voltmeter", "Ohmmeter", "Galvanometer"],
        correctIndex: 1,
        explanation: "A voltmeter measures potential difference (voltage) and is connected in PARALLEL with the component being measured.",
        difficulty: 1,
      },
    ],
  },
  {
    topicId: "english-reading-skills",
    questions: [
      {
        id: "eng-read-q1",
        question: "Which of the following is an example of personification?",
        options: [
          "The wind was as sharp as a knife.",
          "The wind howled with rage.",
          "The wind blew strongly.",
          "A knife-sharp wind.",
        ],
        correctIndex: 1,
        explanation: "Personification gives human qualities to non-human things. 'The wind howled with rage' gives the wind a human emotion (rage) and a human action (howling with emotion).",
        difficulty: 1,
      },
      {
        id: "eng-read-q2",
        question: "What does 'pathetic fallacy' mean?",
        options: [
          "When a character acts in a pathetic way",
          "A logical fallacy in an argument",
          "When weather or environment reflects a character's emotions",
          "An exaggerated description for effect",
        ],
        correctIndex: 2,
        explanation: "Pathetic fallacy is a literary device where the natural environment (weather, landscape) mirrors or reflects a character's emotional state (e.g. stormy weather when a character is upset).",
        difficulty: 2,
      },
      {
        id: "eng-read-q3",
        question: "A simile is best described as:",
        options: [
          "A direct comparison stating one thing IS another",
          "A comparison using 'like' or 'as'",
          "Giving human qualities to objects",
          "An extreme exaggeration for effect",
        ],
        correctIndex: 1,
        explanation: "A simile compares two things using 'like' or 'as' (e.g. 'brave as a lion'). A metaphor makes a direct comparison without these words.",
        difficulty: 1,
      },
    ],
  },
  {
    topicId: "hist-wwi",
    questions: [
      {
        id: "hist-wwi-q1",
        question: "Who was assassinated in Sarajevo in 1914, triggering WWI?",
        options: [
          "Kaiser Wilhelm II",
          "Archduke Franz Ferdinand",
          "Tsar Nicholas II",
          "President Woodrow Wilson",
        ],
        correctIndex: 1,
        explanation: "Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, was assassinated in Sarajevo on 28 June 1914 by Gavrilo Princip, a Bosnian-Serb nationalist. This triggered the chain of alliances that led to WWI.",
        difficulty: 1,
      },
      {
        id: "hist-wwi-q2",
        question: "What does the 'M' in the MAIN causes of WWI stand for?",
        options: ["Migration", "Militarism", "Monarchy", "Manufacturing"],
        correctIndex: 1,
        explanation: "MAIN stands for Militarism (arms race), Alliances (Triple Entente vs Triple Alliance), Imperialism (competition for colonies), and Nationalism (pride in one's nation). Militarism describes the build-up of military forces before 1914.",
        difficulty: 2,
      },
      {
        id: "hist-wwi-q3",
        question: "The Treaty of Versailles (1919) blamed Germany for WWI using:",
        options: [
          "The Fourteen Points",
          "The Schlieffen Plan",
          "The War Guilt Clause (Article 231)",
          "The Entente Cordiale",
        ],
        correctIndex: 2,
        explanation: "Article 231 of the Treaty of Versailles – the 'War Guilt Clause' – forced Germany to accept full responsibility for starting WWI. This was deeply resented in Germany and helped fuel the rise of extremist parties like the Nazis.",
        difficulty: 2,
      },
    ],
  },
  {
    topicId: "cs-algorithms",
    questions: [
      {
        id: "cs-alg-q1",
        question: "What is 'decomposition' in computational thinking?",
        options: [
          "Removing unnecessary details from a problem",
          "Writing code in a programming language",
          "Breaking a complex problem into smaller, manageable sub-problems",
          "Sorting data into the correct order",
        ],
        correctIndex: 2,
        explanation: "Decomposition is the process of breaking down a complex problem into smaller, more manageable sub-problems. It makes it easier to solve and code each part independently.",
        difficulty: 1,
      },
      {
        id: "cs-alg-q2",
        question: "Binary search requires the data to be:",
        options: ["Random", "Sorted", "In reverse order", "In a linked list"],
        correctIndex: 1,
        explanation: "Binary search only works on sorted data. It works by repeatedly halving the search space – comparing the middle element to the target and eliminating half the remaining data.",
        difficulty: 2,
      },
      {
        id: "cs-alg-q3",
        question: "What is the worst-case time complexity of bubble sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctIndex: 3,
        explanation: "Bubble sort has O(n²) worst-case time complexity because it requires nested loops – for each of n elements, it may need to make up to n comparisons. It is inefficient for large datasets.",
        difficulty: 3,
      },
    ],
  },
  {
    topicId: "geo-hazards",
    questions: [
      {
        id: "geo-haz-q1",
        question: "At a destructive plate boundary, what happens?",
        options: [
          "Two plates move apart",
          "Two plates slide past each other",
          "A denser oceanic plate sinks beneath a continental plate",
          "Two continental plates collide and crumple",
        ],
        correctIndex: 2,
        explanation: "At a destructive (convergent) boundary, the denser oceanic plate is subducted (sinks) beneath the less dense continental plate. This causes earthquakes and volcanic activity.",
        difficulty: 2,
      },
      {
        id: "geo-haz-q2",
        question: "Which scale measures earthquake magnitude?",
        options: ["Beaufort scale", "Saffir-Simpson scale", "Richter scale", "Fujita scale"],
        correctIndex: 2,
        explanation: "The Richter scale measures earthquake magnitude (energy released). It is logarithmic – each whole number increase represents 10 times more ground shaking.",
        difficulty: 1,
      },
    ],
  },
  {
    topicId: "fr-present-tense",
    questions: [
      {
        id: "fr-pres-q1",
        question: "How do you say 'I speak French' in French?",
        options: ["Je parles français", "Je parle français", "J'ai parlé français", "Je parlais français"],
        correctIndex: 1,
        explanation: "The verb 'parler' (to speak) in the present tense with 'je' (I) is 'parle' (no -s). So: Je parle français. Note: je parles is wrong – -er verbs drop the final -s for je.",
        difficulty: 1,
      },
      {
        id: "fr-pres-q2",
        question: "Which is the correct conjugation of 'avoir' (to have) for 'nous' (we)?",
        options: ["avons", "avez", "ont", "a"],
        correctIndex: 0,
        explanation: "Avoir conjugation: j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont. 'Nous avons' means 'we have'.",
        difficulty: 2,
      },
    ],
  },
  {
    topicId: "cs-prompt-engineering",
    questions: [
      {
        id: "cs-prompt-q1",
        question: "What is an AI 'hallucination'?",
        options: [
          "When the AI becomes self-aware",
          "When an AI generates plausible-sounding but incorrect information",
          "When the AI refuses to answer a question",
          "When the AI takes too long to respond",
        ],
        correctIndex: 1,
        explanation: "An AI hallucination is when a language model generates text that sounds confident and plausible but is factually incorrect or made up. Always verify AI-generated facts from reliable sources.",
        difficulty: 1,
      },
      {
        id: "cs-prompt-q2",
        question: "Which prompt is most likely to get a detailed, useful response from an LLM?",
        options: [
          "Tell me about history",
          "What is history?",
          "You are a GCSE history tutor. Explain the main causes of WWI in 3 bullet points suitable for a Year 10 student.",
          "WWI causes",
        ],
        correctIndex: 2,
        explanation: "Effective prompts include: a role/persona for the AI, a specific task, format instructions (e.g. bullet points), and audience context. Vague prompts produce vague answers.",
        difficulty: 2,
      },
    ],
  },
];

export function getQuiz(topicId: string): Quiz | undefined {
  return quizzes.find((q) => q.topicId === topicId);
}
