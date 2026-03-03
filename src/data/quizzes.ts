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
  {
    topicId: "cs-nlp-app-creation",
    questions: [
      {
        id: "cs-nlp-q1",
        question: "What does 'vibe coding' mean in the context of AI-assisted development?",
        options: [
          "Writing code while listening to music",
          "Describing what you want in plain English and letting AI generate the code",
          "Copying and pasting code from the internet",
          "Using a visual drag-and-drop app builder",
        ],
        correctIndex: 1,
        explanation: "Vibe coding means describing your desired application in natural language and using an AI coding assistant (like Grok or GitHub Copilot) to translate that into working code.",
        difficulty: 1,
      },
      {
        id: "cs-nlp-q2",
        question: "What is the MOST important thing to do after an AI generates code for you?",
        options: [
          "Deploy it immediately without changes",
          "Share it on social media",
          "Test it thoroughly and review it for errors or security issues",
          "Delete it and write it yourself instead",
        ],
        correctIndex: 2,
        explanation: "AI-generated code must always be reviewed and tested. It can contain bugs, security vulnerabilities, or logic errors. You are responsible for the code you deploy.",
        difficulty: 2,
      },
      {
        id: "cs-nlp-q3",
        question: "Which of the following is a limitation of building apps using natural language AI prompts?",
        options: [
          "It makes development faster",
          "You don't need to know any programming",
          "The AI may misunderstand requirements or generate incorrect/insecure code",
          "It only works for small projects",
        ],
        correctIndex: 2,
        explanation: "AI can misinterpret requirements, produce code with bugs, or generate security vulnerabilities. Understanding the basics of programming helps you spot and fix these issues.",
        difficulty: 2,
      },
    ],
  },
  {
    topicId: "blockchain-basics",
    questions: [
      {
        id: "bc-basics-q1",
        question: "What makes a blockchain tamper-resistant?",
        options: [
          "It is stored on a single secure server",
          "Each block contains the hash of the previous block, so changing one block invalidates all subsequent blocks",
          "Only governments can edit the blockchain",
          "Blocks are encrypted with a password",
        ],
        correctIndex: 1,
        explanation: "Each block stores the cryptographic hash of the previous block. If you alter any block, its hash changes, breaking the chain and making tampering obvious to the network.",
        difficulty: 2,
      },
      {
        id: "bc-basics-q2",
        question: "What is a 'distributed ledger'?",
        options: [
          "A spreadsheet shared by email",
          "A database controlled by one company",
          "A record of transactions copied across many computers on a network",
          "A paper-based accounting system",
        ],
        correctIndex: 2,
        explanation: "A distributed ledger is a shared database replicated across many nodes (computers). No single party controls it, making it more resilient and transparent.",
        difficulty: 1,
      },
      {
        id: "bc-basics-q3",
        question: "In Proof of Work, what do miners compete to do?",
        options: [
          "Write the most code",
          "Solve a complex mathematical puzzle to add the next block",
          "Vote on which transactions are valid",
          "Hold the most cryptocurrency",
        ],
        correctIndex: 1,
        explanation: "Proof of Work requires miners to use computing power to find a number (nonce) that makes the block's hash meet a difficulty target. The first miner to succeed adds the block and earns a reward.",
        difficulty: 2,
      },
    ],
  },
  {
    topicId: "blockchain-crypto",
    questions: [
      {
        id: "bc-crypto-q1",
        question: "Who is the pseudonymous creator of Bitcoin?",
        options: ["Vitalik Buterin", "Elon Musk", "Satoshi Nakamoto", "Nick Szabo"],
        correctIndex: 2,
        explanation: "Bitcoin was created in 2009 by a person (or group) using the pseudonym Satoshi Nakamoto. Their true identity remains unknown.",
        difficulty: 1,
      },
      {
        id: "bc-crypto-q2",
        question: "What is the maximum supply of Bitcoin?",
        options: ["1 million", "21 million", "100 million", "Unlimited"],
        correctIndex: 1,
        explanation: "Bitcoin has a hard cap of 21 million coins. This scarcity is built into the protocol and is one reason why some people view Bitcoin as 'digital gold'.",
        difficulty: 2,
      },
      {
        id: "bc-crypto-q3",
        question: "Ethereum differs from Bitcoin primarily because it supports:",
        options: [
          "Faster transaction speeds only",
          "Smart contracts and decentralised applications",
          "A larger maximum coin supply",
          "Centralised governance",
        ],
        correctIndex: 1,
        explanation: "Ethereum was designed as a programmable blockchain. Developers can deploy smart contracts (self-executing code) and build decentralised applications (dApps) on it.",
        difficulty: 2,
      },
    ],
  },
  {
    topicId: "blockchain-smart-contracts",
    questions: [
      {
        id: "bc-sc-q1",
        question: "A smart contract is best described as:",
        options: [
          "A legal document signed digitally",
          "Self-executing code stored on a blockchain that runs when predefined conditions are met",
          "A type of cryptocurrency wallet",
          "An agreement between two banks",
        ],
        correctIndex: 1,
        explanation: "Smart contracts are programs deployed on a blockchain. They automatically execute when their conditions are met – no intermediary (like a lawyer or bank) is needed.",
        difficulty: 1,
      },
      {
        id: "bc-sc-q2",
        question: "What is a 'gas fee' on the Ethereum network?",
        options: [
          "The cost of electricity to run a computer",
          "A fee paid to Ethereum's founders",
          "A payment in ETH for the computing power required to process a transaction",
          "A charge for converting ETH to other currencies",
        ],
        correctIndex: 2,
        explanation: "Gas fees compensate validators for the computation needed to execute transactions and smart contracts. They vary based on network demand.",
        difficulty: 2,
      },
    ],
  },
  {
    topicId: "blockchain-defi-nfts",
    questions: [
      {
        id: "bc-defi-q1",
        question: "What does DeFi stand for?",
        options: ["Digital Finance", "Decentralised Finance", "Distributed Fiat", "Digital Fiat"],
        correctIndex: 1,
        explanation: "DeFi stands for Decentralised Finance – financial services (lending, trading, savings) built on blockchains without traditional banks or intermediaries.",
        difficulty: 1,
      },
      {
        id: "bc-defi-q2",
        question: "What makes an NFT non-fungible?",
        options: [
          "It can be used as regular currency",
          "It is identical to all other tokens of the same type",
          "Each NFT is unique – it is not interchangeable with any other token",
          "It is only available on the Bitcoin network",
        ],
        correctIndex: 2,
        explanation: "Non-fungible means unique and not interchangeable. Unlike Bitcoin (where one BTC equals another BTC), each NFT has a unique identifier proving ownership of a specific asset.",
        difficulty: 2,
      },
    ],
  },
  {
    topicId: "blockchain-security",
    questions: [
      {
        id: "bc-sec-q1",
        question: "What is the golden rule of crypto private keys?",
        options: [
          "Share it with your exchange for safekeeping",
          "Write it on a sticky note and keep it on your monitor",
          "Never share it with anyone – whoever has it controls your funds",
          "Store it in a cloud document for easy access",
        ],
        correctIndex: 2,
        explanation: "Your private key is like the master password to your cryptocurrency. Anyone who has it can take all your funds. It must NEVER be shared or stored insecurely.",
        difficulty: 1,
      },
      {
        id: "bc-sec-q2",
        question: "What is a 'cold wallet'?",
        options: [
          "A wallet that has run out of funds",
          "A software app on your phone",
          "An offline hardware device for storing crypto private keys",
          "A wallet stored on a crypto exchange",
        ],
        correctIndex: 2,
        explanation: "A cold wallet (hardware wallet) stores your private keys offline, making it immune to online hacks. Examples include Ledger and Trezor. Hot wallets (online) are more convenient but riskier.",
        difficulty: 2,
      },
      {
        id: "bc-sec-q3",
        question: "What is a 'rug pull' in the crypto world?",
        options: [
          "When the blockchain network goes offline",
          "A legitimate way to exit an investment",
          "When developers abandon a project and steal investors' funds",
          "When transaction fees become too high",
        ],
        correctIndex: 2,
        explanation: "A rug pull is a scam where the team behind a crypto project suddenly withdraws all liquidity or sells their tokens, leaving other investors with worthless coins.",
        difficulty: 2,
      },
    ],
  },
];

export function getQuiz(topicId: string): Quiz | undefined {
  return quizzes.find((q) => q.topicId === topicId);
}
