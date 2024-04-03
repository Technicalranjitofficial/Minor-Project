import { CalcData } from "@/Redux/reducers/CalculatorSlice";

const HIGHLY_RECOMMENDED_THRESHOLD = 0.8; // Adjust as needed
const RECOMMENDED_THRESHOLD = 0.6; // Adjust as needed
const AVERAGE_THRESHOLD = 0.4; // Adjust as needed
const MODERATELY_RECOMMENDED_THRESHOLD = 0.2; // Adjust as needed
const MIN_INTERACTIONS_THRESHOLD = 5;

export const applyColorBasedOnRatioBorder = (like: number, dislike: number) => {
  const totalInteractions = like + dislike;

  if (totalInteractions < MIN_INTERACTIONS_THRESHOLD) {
    return {
      color: "text-cyan-500",
      text: "In Progress",
    };
    // Not enough interactions for a reliable recommendation
  }

  const p = like / totalInteractions;
  const ratio = Math.round(p * 100) / 100;
  switch (true) {
    case ratio >= HIGHLY_RECOMMENDED_THRESHOLD:
      // applyColor(rowRef, '00FF00');
      // Green color
      return {
        color: "border-green-500",
        text: "Highly Recomended",
      };

    case ratio >= RECOMMENDED_THRESHOLD && ratio < HIGHLY_RECOMMENDED_THRESHOLD:
      // applyColor(rowRef, '00FFFF'); // Blue color
      return {
        color: "border-blue-500",
        text: "Recomended",
      };

    case ratio >= AVERAGE_THRESHOLD && ratio < RECOMMENDED_THRESHOLD:
      // applyColor(rowRef, 'FFFF00'); // Yellow color
      return {
        color: "border-yellow-500",
        text: "Average",
      };
    case ratio >= MODERATELY_RECOMMENDED_THRESHOLD && ratio < AVERAGE_THRESHOLD:
      // applyColor(rowRef, 'FFA500'); // Orange color
      return {
        color: "border-orange-500",
        text: "Below Average",
      };
    case ratio < MODERATELY_RECOMMENDED_THRESHOLD:
      // applyColor(rowRef, 'FF0000'); // Red color
      return {
        color: "border-red-500",
        text: "Not Recomended",
      };

    default:
      return {
        color: "text-blue-500",
        text: "Not Rated",
      };
  }
};

export const applyColorBasedOnRatio = (like: number, dislike: number) => {
  const totalInteractions = like + dislike;

  if (totalInteractions < MIN_INTERACTIONS_THRESHOLD) {
    return {
      color: "text-cyan-500",
      text: "In Progress",
    };
    // Not enough interactions for a reliable recommendation
  }

  const p = like / totalInteractions;
  const ratio = Math.round(p * 100) / 100;
  switch (true) {
    case ratio >= HIGHLY_RECOMMENDED_THRESHOLD:
      // applyColor(rowRef, '00FF00');
      // Green color
      return {
        color: "text-green-500",
        text: "Highly Recomended",
      };
      break;
    case ratio >= RECOMMENDED_THRESHOLD && ratio < HIGHLY_RECOMMENDED_THRESHOLD:
      // applyColor(rowRef, '00FFFF'); // Blue color
      return {
        color: "text-blue-500",
        text: "Recomended",
      };

    case ratio >= AVERAGE_THRESHOLD && ratio < RECOMMENDED_THRESHOLD:
      // applyColor(rowRef, 'FFFF00'); // Yellow color
      return {
        color: "yellow",
        text: "Average",
      };
    case ratio >= MODERATELY_RECOMMENDED_THRESHOLD && ratio < AVERAGE_THRESHOLD:
      // applyColor(rowRef, 'FFA500'); // Orange color
      return {
        color: "orange",
        text: "Below Average",
      };
    case ratio < MODERATELY_RECOMMENDED_THRESHOLD:
      // applyColor(rowRef, 'FF0000'); // Red color
      return {
        color: "text-red-500",
        text: "Not Recomended",
      };
    default:
      return {
        color: "text-blue-500",
        text: "Not Rated",
      };
  }
};
export const status = (rating: number) => {
  if (rating <= 2) {
    return {
      color: "text-red-500",
      text: "Poor",
    };
  } else if (rating >= 3 && rating < 4) {
    return {
      color: "text-yellow-500",
      text: "Average",
    };
  } else if (rating >= 4 && rating < 5) {
    return {
      color: "text-green-500",
      text: "Good",
    };
  } else if (rating >= 5) {
    return {
      color: "text-green-500",
      text: "Excellent",
    };
  } else {
    return {
      color: "text-red-500",
      text: "Not Rated",
    };
  }
};

export const border_status = (rating: number) => {
  if (rating <= 2) {
    return {
      color: "border-red-500",
      text: "Poor",
    };
  } else if (rating >= 3 && rating < 4) {
    return {
      color: "border-yellow-500",
      text: "Average",
    };
  } else if (rating >= 4 && rating < 5) {
    return {
      color: "border-green-500",
      text: "Good",
    };
  } else if (rating >= 5) {
    return {
      color: "border-green-500",
      text: "Excellent",
    };
  } else {
    return {
      color: "border-red-500",
      text: "Not Rated",
    };
  }
};

export const sectionNumber = Array.from(
  { length: 56 },
  (_, index) => index + 1
);

export const ElectiveSubjects = ["All Elective", "ML", "IOT", "NLP", "DA"];

export const LikeStatus = (likes: number, dislikes: number) => {
  const rat = likes / Math.max(dislikes, 1);
  // Avoid division by zero

  // Round off value to 2 decimal places
  const ratio = Math.round(rat * 100) / 100;
  console.log(ratio);

  switch (true) {
    case likes === 0 && dislikes === 0:
      return {
        color: "text-blue-500",
        text: "Not Rated",
      }; // Red color
    case ratio >= 3:
      // Highly recommended
      return {
        color: "text-green-500",
        text: "Highly Recommended",
      }; // Green color

    case ratio >= 2 && ratio < 3:
      // Recommended
      return {
        color: "text-cyan-500",
        text: "Recommended",
      }; // Green color
    case ratio >= 1.6 && ratio < 2:
      // Average
      return {
        color: "text-blue-500",
        text: "Average",
      }; // Yellow color
    case ratio >= 1 && ratio < 1.6:
      // Moderately Recommended
      return {
        color: "text-[#FFFF00]",
        text: "Below Average",
      }; // Yellow color
    case ratio < 1:
      // Not Recommended
      return {
        color: "text-red-500",
        text: "Not Recommended",
      }; // Red color
    default:
      return {
        color: "text-blue-500",
        text: "Not Rated",
      }; // Red color
  }
};

export const FilterAllGroups = [
  "Choose",
  "Elective",
  "CSE-1",
  "CSE-2",
  "CSE-3",
  "CSE-4",
  "CSE-5",
  "CSE-6",
  "CSE-7",
  "CSE-8",
  "CSE-9",
  "CSE-10",
  "CSE-11",
  "CSE-12",
  "CSE-13",
  "CSE-14",
  "CSE-15",
  "CSE-16",
  "CSE-17",
  "CSE-18",
  "CSE-19",
  "CSE-20",
  "CSE-21",
  "CSE-22",
  "CSE-23",
  "CSE-24",
  "CSE-25",
  "CSE-26",
  "CSE-27",
  "CSE-28",
  "CSE-29",
  "CSE-30",
  "CSE-31",
  "CSE-32",
  "CSE-33",
  "CSE-34",
  "CSE-35",
  "CSE-36",
  "CSE-37",
  "CSE-38",
  "CSE-39",
];

export const AllGroupLinkNames = [
  "Choose",
  "CSE-1",
  "CSE-2",
  "CSE-3",
  "CSE-4",
  "CSE-5",
  "CSE-6",
  "CSE-7",
  "CSE-8",
  "CSE-9",
  "CSE-10",
  "CSE-11",
  "CSE-12",
  "CSE-13",
  "CSE-14",
  "CSE-15",
  "CSE-16",
  "CSE-17",
  "CSE-18",
  "CSE-19",
  "CSE-20",
  "CSE-21",
  "CSE-22",
  "CSE-23",
  "CSE-24",
  "CSE-25",
  "CSE-26",
  "CSE-27",
  "CSE-28",
  "CSE-29",
  "CSE-30",
  "CSE-31",
  "CSE-32",
  "CSE-33",
  "CSE-34",
  "CSE-35",
  "CSE-36",
  "CSE-37",
  "CSE-38",
  "CSE-39",
  "Mr. Sankalp Nayak(ML)",
  "Mr. Sohail Khan(ML)",
  "Dr. Ramesh Kumar Thakur(ML)",
  "Dr. Minakhi Rout(ML)",
  "Dr. Kumar Surjeet Chaudhury(ML)",
  "Prof. P. K. Samanta(ML)",
  "Prof. Wriddhi Bhowmick(ML)",
  "Prof. T. Kar(ML)",
  "Mr. A Ranjith(ML)",
  "Mr. Chandra Shekhar(ML)",
  "Prof. A. Gorai(ML)",
  "Mr. Sunil Kumar Gouda(ML)",
  "Prof. Parveen Malik(ML)",
  "Mr. Nayan Kumar S. Behera(ML)",
  "Dr. Jayeeta Chakraborty(ML)",
  "Dr. Satya Champati Rai(ML)",
  "Dr. Partha Pratim Sarangi(ML)",
  "Dr. Rinku Datta Rakshit(ML)",
  "Dr. Babita Panda(ML)",
  "Dr. Pampa Sinha(ML)",
  "Prof. Subodh Kumar Mohanty(ML)",
  "Dr. Shubhasri Kundu(ML)",
  "Dr. Subrat Kumar Barik(ML)",
  "Dr. Padarbinda Samal(ML)",
  "Dr. Satarupa Mohanty(DA)",
  "Dr. Pratyusa Mukherjee(DA)",
  "Dr. Subhadip Pramanik(DA)",
  "Dr. Abhaya Kumar Sahoo(DA)",
  "Mr. Abinas Panda(DA)",
  "Dr. Sarita Tripathy(DA)",
  "Mrs. Naliniprava Behera(DA)",
  "Dr. Nibedan Panda(DA)",
  "Mr. Pragma Kar(DA)",
  "Dr. Santosh Kumar Baliarsingh(DA)",
  "Mr. Deependra Singh(DA)",
  "Dr. Santwana Sagnika(DA)",
  "Mrs. Jayanti Dansana(DA)",
  "Mr. Vishal Meena(DA)",
  "Dr. Subhranshu Sekhar Tripathy(DA)",
  "Mr. Ajay Anand(DA)",
  "Mrs. Meghana G Raj(DA)",
  "Ms. Sricheta Parui(DA)",
  "Dr. Mukesh Kumar(DA)",
  "Mr. Jhalak Hota(DA)",
  "Dr. Rajat Kumar Behera(DA)",
  "Dr. Soumya Ranjan Nayak(DA)",
  "Dr. Saikat Chakraborty(DA)",
  "Mr. Rabi Shaw(DA)",
  "Dr. Aleena Swetapadma(DA)",
  "Mr. R. N. Ramakant Parida(IOT)",
  "Dr. Debachudamani Prusti(IOT)",
  "Mrs. Ronali Padhy(IOT)",
  "Prof. T. M. Behera(IOT)",
  "Dr. Hitesh Mahapatra(IOT)",
  "Dr. Banchhanidhi Dash(IOT)",
  "Prof. Akshaya Kumar Pati(IOT)",
  "Prof. A. Samui(IOT)",
  "Mr. Prasenjit Maiti(IOT)",
  "Prof. Deepak Kumar Rout(IOT)",
  "Prof. Swagat Das(IOT)",
  "Mrs. Lipika Dewangan(NLP)",
  "Dr. Mainak Bandyopadhyay(NLP)",
  "Dr. Murari Mandal(NLP)",
  "Dr. Ambika Prasad Mishra(NLP)",
];

export const AllGroupLinkNames2 = [
  "Choose",
  "CSE-1",
  "CSE-2",
  "CSE-3",
  "CSE-4",
  "CSE-5",
  "CSE-6",
  "CSE-7",
  "CSE-8",
  "CSE-9",
  "CSE-10",
  "CSE-11",
  "CSE-12",
  "CSE-13",
  "CSE-14",
  "CSE-15",
  "CSE-16",
  "CSE-17",
  "CSE-18",
  "CSE-19",
  "CSE-20",
  "CSE-21",
  "CSE-22",
  "CSE-23",
  "CSE-24",
  "CSE-25",
  "CSE-26",
  "CSE-27",
  "CSE-28",
  "CSE-29",
  "CSE-30",
  "CSE-31",
  "CSE-32",
  "CSE-33",
  "CSE-34",
  "CSE-35",
  "CSE-36",
  "CSE-37",
  "CSE-38",
  "CSE-39",
  "CSE-40",
  "CSE-41",
  "CSE-42",
  "CSE-43",
  "CSE-44",
  "CSE-45",
  "CSE-46",
  "CSE-47",
  "CSE-48",
  "CSE-49",
  "CSE-50",
  "CSE-51",
  "CSE-52",
  "CSE-53",
  "CSE-54",
  "CSE-55",
];



export const Branch = [
  "CSE",
  "IT",
  "CSCE",
  "CSSE",
]

export const whichYear = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
]

export const sgpa = {
  "O": 10,
  "E": 9,
  "A": 8,
  "B": 7,
  "C": 6,
  "D": 5,
  "F": 4,
};


export const calculateCGPA = (data:CalcData[]) => {
  var total = 0;
  var totalCredit = 0;
  data.map((item): number => {
    if(item.Grade==="-1") return 0;
    total += sgpa[item.Grade as keyof typeof sgpa] * Number(item.Credit);
    totalCredit += Number(item.Credit);
    return 0; // Return a dummy value of type number
  });

  console.log(total, totalCredit)
  return (total / totalCredit).toFixed(2);
}

export const Semester = Array.from({ length: 6 }, (_, index) => index + 1);

export const CalcInfo = {
  CSE: {
    "1": [
      {
        name: "PHYSICS",
        Credit: "3",
        SUBCODE: "PH10001",
        Grade:"O",
      },
      {
        name: "Differential Equations and Linear Algebra",
        Credit: "4",
        SUBCODE: "MA11001",
        Grade:"O",
      },
      {
        name: "SCIENCE OF LIVING SYSTEMS",
        Credit: "2",
        SUBCODE: "LS10001",
        Grade:"O",
      },
      {
        name: "ENVIROMENTAL SCIENCE",
        Credit: "2",
        SUBCODE: "CH10003",
        Grade:"O",
      },
      {
        name: "PHYSICS LAB",
        Credit: "1",
        SUBCODE: "PH19001",
        Grade:"O",
      },
      {
        name: "PROGRAMMING LAB",
        Credit: "4",
        SUBCODE: "CS19001",
        Grade:"O",
      },
      {
        name: "ENGINEERING DRAWING & GRAPHICS",
        Credit: "1",
        SUBCODE: "CE18001",
        Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-II",
        Credit: "2",
        SUBCODE: null,
        Grade:"O",
      },
      {
        name: "SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
        Grade:"O",
      },
    ],

    "2": [
      {
        name: "CHEMISTRY",
        Credit: "3",
        SUBCODE: "CH10001",
        Grade:"O",
      },
      {
        name: "Transform Calculus and Numerical Analysis",
        Credit: "4",
        SUBCODE: "MA11002",
        Grade:"O",
      },
      {
        name: "ENGLISH",
        Credit: "2",
        SUBCODE: "HS10001",
        Grade:"O",
      },
      {
        name: "BASIC ELECTRONICS",
        Credit: "2",
        SUBCODE: "EC10001",
        Grade:"O",
      },
      {
        name: "CHEMISTRY LAB",
        Credit: "1",
        SUBCODE: "CH19001",
        Grade:"O",
      },
      {
        name: "YOGA",
        Credit: "1",
        SUBCODE: "YG18001",
        Grade:"O",
      },
      {
        name: "ENGINEERING LAB",
        Credit: "1",
        SUBCODE: "EX19001",
        Grade:"O",
      },
      {
        name: "WORKSHOP",
        Credit: "1",
        SUBCODE: "ME18001",
         Grade:"O",
      },
      {
        name: "COMMUNICATION LAB",
        Credit: "1",
        SUBCODE: "HS18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "SOCIAL SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "3": [
      {
        name: "DS",
        Credit: "4",
        SUBCODE: "CS2001",
         Grade:"O",
      },
      {
        name: "Digital Systems Design",
        Credit: "3",
        SUBCODE: "EC20005",
         Grade:"O",
      },
      {
        name: "Scientific and Technical Writing",
        Credit: "2",
        SUBCODE: "EX20003",
         Grade:"-1",
      },
       {
        name: "HASS Elective - II",
        Credit: "3",
        SUBCODE: "EX20003",
         Grade:"-1",
      },
      {
        name: "Industry 4.0 Technologies",
        Credit: "2",
        SUBCODE: "EX20001",
         Grade:"O",
      },
      {
        name: "Automata Theory and Formal Languages",
        Credit: "4",
        SUBCODE: "CS21003",
         Grade:"O",
      },
      {
        name: "PS",
        Credit: "4",
        SUBCODE: "MA2011",
         Grade:"O",
      },
      {
        name: "DSA LAB",
        Credit: "1",
        SUBCODE: "CS2091",
         Grade:"O",
      },
      {
        name: "Digital Systems Design LAB",
        Credit: "1",
        SUBCODE: "EC29005",
         Grade:"O",
      },
    ],
    "4": [
      {
        name: "Scientific and Technical Writing",
        Credit: "2",
        SUBCODE: "EX20003",
         Grade:"-1",
      },
       {
        name: "HASS Elective - II",
        Credit: "3",
        SUBCODE: "EX20003",
         Grade:"-1",
      },

      

      {
        name: "OOPJ",
        Credit: "3",
        SUBCODE: "CS20004",
         Grade:"O",
      },
      {
        name: "OS",
        Credit: "3",
        SUBCODE: "CS2002",
         Grade:"O",
      },
      {
        name: "Discrete Structures",
        Credit: "4",
        SUBCODE: "MA21002",
         Grade:"O",
      },
      {
        name: "COA",
        Credit: "4",
        SUBCODE: "CS21002",
         Grade:"O",
      },
  
      {
        name: "DBMS",
        Credit: "3",
        SUBCODE: "CS20006",
         Grade:"O",
      },
      {
        name: "OOPJ LAB",
        Credit: "1",
        SUBCODE: "CS29004",
         Grade:"O",
      },
      {
        name: "OS LAB",
        Credit: "1",
        SUBCODE: "CS29002",
         Grade:"O",
      },
      {
        name: "DBMS LAB",
        Credit: "1",
        SUBCODE: "CS29006",
         Grade:"O",
      },
      {
        name: "Vocational Electives",
        Credit: "1",
        SUBCODE: "CS28001",
         Grade:"O",
      },
    ],
    "5": [
      {
        name: "COMPUTER NETWORKS",
        Credit: "3",
        SUBCODE: "IT3009",
         Grade:"O",
      },
      {
        name: "DESIGN & ANALYSIS OF ALGO",
        Credit: "3",
        SUBCODE: "CS2012",
         Grade:"O",
      },
      {
        name: "HIGH PERFORMANCE COMPUT",
        Credit: "4",
        SUBCODE: "CS3010",
         Grade:"O",
      },
      {
        name: "SOFTWARE ENGINEERING",
        Credit: "4",
        SUBCODE: "IT3003",
         Grade:"O",
      },
      {
        name: "NETWORK LAB",
         Grade:"O",
        Credit: "1",
        SUBCODE: "IT3095",
      },
      {
        name: "ALGORITHM LAB",
        Credit: "1",
        SUBCODE: "CS2098",
         Grade:"O",
      },
      {
        name: "D_ELECTIVE-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "D_ELECTIVE-2",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "6": [
      {
        name: "COMPUTER DESIGN",
        Credit: "3",
        SUBCODE: "CS3008",
         Grade:"O",
      },
      {
        name: "CLOUD COMPUTING",
        Credit: "3",
        SUBCODE: "IT3022",
         Grade:"O",
      },
      {
        name: "TOOLS & TECHNICS LAB",
        Credit: "2",
        SUBCODE: "CS3096",
         Grade:"O",
      },
      {
        name: "CLOUD COMPUTING LAB",
        Credit: "1",
        SUBCODE: "IT3098",
         Grade:"O",
      },
      {
        name: "MINOR PROJECT",
        Credit: "2",
        SUBCODE: "CS3082",
         Grade:"O",
      },
      {
        name: "SPM",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "D_ELECTIVE-4",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "D_ELECTIVE-5",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "O_ELECTIVE-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "7": [
      {
        name: "HS ELECTIVE-2",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "PROFESSIONAL PRACTICE,LAW & ETHICS",
        Credit: "2",
        SUBCODE: "HS4001",
         Grade:"O",
      },
      {
        name: "O_ELECTIVE-2(MI-2)",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "PROJECT 1/INTERNSHIP",
        Credit: "3",
        SUBCODE: "CS4081",
         Grade:"O",
      },
      {
        name: "PRACTICAL TRAINING",
        Credit: "2",
        SUBCODE: "CS4083",
         Grade:"O",
      },

      {
        name: "O_ELECTIVE-3(MI-3)",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "O_ELECTIVE-2(MI-4)",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },

      {
        name: "HO-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "PEOJECT MINOR/LAB",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
  },

  IT: {
    "1": [
      {
        name: "CHEMISTRY",
        Credit: "3",
        SUBCODE: "CH10001",
         Grade:"O",
      },
      {
        name: "Transform Calculus and Numerical Analysis",
        Credit: "4",
        SUBCODE: "MA11002",
         Grade:"O",
      },
      {
        name: "ENGLISH",
        Credit: "2",
        SUBCODE: "HS10001",
         Grade:"O",
      },
      {
        name: "BASIC ELECTRONICS",
        Credit: "2",
        SUBCODE: "EC10001",
         Grade:"O",
      },
      {
        name: "CHEMISTRY LAB",
        Credit: "1",
        SUBCODE: "CH19001",
         Grade:"O",
      },
      {
        name: "YOGA",
        Credit: "1",
        SUBCODE: "YG18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING LAB",
        Credit: "1",
        SUBCODE: "EX19001",
         Grade:"O",
      },
      {
        name: "WORKSHOP",
        Credit: "1",
        SUBCODE: "ME18001",
         Grade:"O",
      },
      {
        name: "COMMUNICATION LAB",
        Credit: "1",
        SUBCODE: "HS18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "HASS ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "2": [
      {
        name: "PHYSICS",
        Credit: "3",
        SUBCODE: "PH10001",
         Grade:"O",
      },
      {
        name: "Differential Equations and Linear Algebra",
        Credit: "4",
        SUBCODE: "MA11001",
         Grade:"O",
      },
      {
        name: "SCIENCE OF LIVING SYSTEMS",
        Credit: "2",
        SUBCODE: "LS10001",
         Grade:"O",
      },
      {
        name: "ENVIROMENTAL SCIENCE",
        Credit: "2",
        SUBCODE: "CH10003",
         Grade:"O",
      },
      {
        name: "PHYSICS LAB",
        Credit: "1",
        SUBCODE: "PH19001",
         Grade:"O",
      },
      {
        name: "PROGRAMMING LAB",
        Credit: "4",
        SUBCODE: "CS19001",
         Grade:"O",
      },
      {
        name: "ENGINEERING DRAWING & GRAPHICS",
        Credit: "1",
        SUBCODE: "CE18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-II",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "3": [
      {
        name: "DS",
        Credit: "4",
        SUBCODE: "CS21001",
         Grade:"O",
      },

      {
        name: "Communication Engineering",
        Credit: "3",
        SUBCODE: "EC20008",
         Grade:"O",
      },
      {
        name: "OOPJ",
        Credit: "3",
        SUBCODE: "CS20004",
         Grade:"O",
      },
      
      {
        name: "COA",
        Credit: "4",
        SUBCODE: "CS21002",
         Grade:"O",
      },
      {
        name: "PS",
        Credit: "4",
        SUBCODE: "MA21001",
         Grade:"O",
      },
      {
        name: "Scientific and Technical Writing",
        Credit: "2",
        SUBCODE: "EX20003",
         Grade:"O",
      },
      {
        name: "DS LAB",
        Credit: "1",
        SUBCODE: "CS29001",
         Grade:"O",
      },{
        name: "Communication Engineering LAB",
        Credit: "1",
        SUBCODE: "EC29002",
         Grade:"O",
      },
      {
        name: "OOPJ LAB",
        Credit: "1",
        SUBCODE: "CS29004",
         Grade:"O",
      },
    ],
    "4": [
      {
        name: "Industry 4.0 Technologies",
        Credit: "2",
        SUBCODE: "EX20001",
         Grade:"O",
      },
      {
        name: "Discrete Structures",
        Credit: "4",
        SUBCODE: "MA21002",
         Grade:"O",
      },
      {
        name: "OS",
        Credit: "3",
        SUBCODE: "CS20002",
         Grade:"O",
      },

      {
        name: "Engineering Economics",
        Credit: "3",
        SUBCODE: "HS30101",
         Grade:"O",
      },
      {
        name: "Information Theory and Coding",
        Credit: "3",
        SUBCODE: "CS20008",
         Grade:"O",
      },
      {
        name: "DBMS",
        Credit: "3",
        SUBCODE: "CS20006",
         Grade:"O",
      },
      
      {
        name: "OS LAB",
        Credit: "1",
        SUBCODE: "CS29002",
         Grade:"O",
      },
      {
        name: "DBMS LAB",
        Credit: "1",
        SUBCODE: "CS29004",
         Grade:"O",
      },
      {
        name: "Vocational Electives",
        Credit: "1",
        SUBCODE: "CS28001",
         Grade:"O",
      },
    ],
    "5": [
      {
        name: "COMPUTER NETWORKS",
        Credit: "3",
        SUBCODE: "IT3005",
         Grade:"O",
      },
      {
        name: "DESIGN & ANALYSIS OF ALGO",
        Credit: "3",
        SUBCODE: "CS2012",
         Grade:"O",
      },
      {
        name: "IOT",
        Credit: "3",
        SUBCODE: "IT3007",
         Grade:"O",
      },
      {
        name: "SOFTWARE ENGINEERING",
        Credit: "4",
        SUBCODE: "IT3003",
         Grade:"O",
      },
      {
        name: "NETWORK LAB",
        Credit: "1",
        SUBCODE: "IT3095",
         Grade:"O",
      },
      {
        name: "ALGORITHM LAB",
        Credit: "1",
        SUBCODE: "CS2098",
         Grade:"O",
      },
      {
        name: "ELECTIVE-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "ELECTIVE-2",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "6": [
      {
        name: "DATA ANALYTICS",
        Credit: "3",
        SUBCODE: "IT3006",
         Grade:"O",
      },
      {
        name: "CLOUD COMPUTING",
        Credit: "3",
        SUBCODE: "IT3022",
         Grade:"O",
      },
      {
        name: "TOOLS & TECHNICS LAB",
        Credit: "2",
        SUBCODE: "CS3096",
         Grade:"O",
      },
      {
        name: "CLOUD COMPUTING LAB",
        Credit: "1",
        SUBCODE: "IT3098",
         Grade:"O",
      },
      {
        name: "MINOR PROJECT",
        Credit: "2",
        SUBCODE: "CS3082",
         Grade:"O",
      },
      {
        name: "D_ELECTIVE-3",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "D_ELECTIVE-4",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "D_ELECTIVE-5",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "O_ELECTIVE-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "7": [
      {
        name: "HS ELECTIVE-2",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "PROFESSIONAL PRACTICE,LAW & ETHICS",
        Credit: "2",
        SUBCODE: "HS4001",
         Grade:"O",
      },
      {
        name: "O_ELECTIVE-2(MI-2)",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "PROJECT 1/INTERNSHIP",
        Credit: "3",
        SUBCODE: "CS4081",
         Grade:"O",
      },
      {
        name: "PRACTICAL TRAINING",
        Credit: "2",
        SUBCODE: "CS4083",
         Grade:"O",
      },

      {
        name: "O_ELECTIVE-3(MI-3)",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "O_ELECTIVE-2(MI-4)",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },

      {
        name: "HO-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "PEOJECT MINOR/LAB",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
  },

  CSCE: {
    "1": [
      {
        name: "CHEMISTRY",
        Credit: "3",
        SUBCODE: "CH10001",
         Grade:"O",
      },
      {
        name: "Transform Calculus and Numerical Analysis",
        Credit: "4",
        SUBCODE: "MA11002",
         Grade:"O",
      },
      {
        name: "ENGLISH",
        Credit: "2",
        SUBCODE: "HS10001",
         Grade:"O",
      },
      {
        name: "BASIC ELECTRONICS",
        Credit: "2",
        SUBCODE: "EC10001",
         Grade:"O",
      },
      {
        name: "CHEMISTRY LAB",
        Credit: "1",
        SUBCODE: "CH19001",
         Grade:"O",
      },
      {
        name: "YOGA",
        Credit: "1",
        SUBCODE: "YG18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING LAB",
        Credit: "1",
        SUBCODE: "EX19001",
         Grade:"O",
      },
      {
        name: "WORKSHOP",
        Credit: "1",
        SUBCODE: "ME18001",
         Grade:"O",
      },
      {
        name: "COMMUNICATION LAB",
        Credit: "1",
        SUBCODE: "HS18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "HASS Elective - I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "2": [
      {
        name: "PHYSICS",
        Credit: "3",
        SUBCODE: "PH10001",
         Grade:"O",
      },
      {
        name: "Differential Equations and Linear Algebra",
        Credit: "4",
        SUBCODE: "MA11001",
         Grade:"O",
      },
      {
        name: "SCIENCE OF LIVING SYSTEMS",
        Credit: "2",
        SUBCODE: "LS10001",
         Grade:"O",
      },
      {
        name: "ENVIROMENTAL SCIENCE",
        Credit: "2",
        SUBCODE: "CH10003",
         Grade:"O",
      },
      {
        name: "PHYSICS LAB",
        Credit: "1",
        SUBCODE: "PH19001",
         Grade:"O",
      },
      {
        name: "PROGRAMMING LAB",
        Credit: "4",
        SUBCODE: "CS19001",
         Grade:"O",
      },
      {
        name: "ENGINEERING DRAWING & GRAPHICS",
        Credit: "1",
        SUBCODE: "CE18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-II",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "3": [
      {
        name: "DS",
        Credit: "4",
        SUBCODE: "CS21001",
         Grade:"O",
      },

      {
        name: "Scientific and Technical Writing",
        Credit: "2",
        SUBCODE: "EX20003",
         Grade:"O",
      },
      {
        name: "Industry 4.0 Technologies",
        Credit: "2",
        SUBCODE: "EX20001",
         Grade:"O",
      },
      {
        name: "Digital Systems Design",
        Credit: "3",
        SUBCODE: "EC20005",
         Grade:"O",
      },
      {
        name: "PS",
        Credit: "4",
        SUBCODE: "MA21001",
         Grade:"O",
      },
      {
        name: "Communication Engineering",
        Credit: "3",
        SUBCODE: "EC20008",
         Grade:"O",
      },
      {
        name: "DS LAB",
        Credit: "1",
        SUBCODE: "CS29001",
         Grade:"O",
      },
      {
        name: "Communication Engineering LAB",
        Credit: "1",
        SUBCODE: "EC29002",
         Grade:"O",
      },
      {
        name: "DSD LAB",
        Credit: "1",
        SUBCODE: "EC29005",
         Grade:"O",
      },
    ],
    "4": [
      {
        name: "OOPJ",
        Credit: "3",
        SUBCODE: "CS20004",
         Grade:"O",
      },
      {
        name: "Discrete Structures",
        Credit: "4",
        SUBCODE: "MA21002",
         Grade:"O",
      },
      {
        name: "OS",
        Credit: "3",
        SUBCODE: "CS20002",
         Grade:"O",
      },
      {
        name: "Engineering Economics",
        Credit: "3",
        SUBCODE: "HS30101",
         Grade:"O",
      },

      
      {
        name: "Information Security",
        Credit: "3",
        SUBCODE: "CS20010",
         Grade:"O",
      },
      {
        name: "DBMS",
        Credit: "3",
        SUBCODE: "CS20006",
         Grade:"O",
      },
      {
        name: "OOPJ LAB",
        Credit: "1",
        SUBCODE: "CS29004",
         Grade:"O",
      },
      {
        name: "OS LAB",
        Credit: "1",
        SUBCODE: "CS29002",
         Grade:"O",
      },
      {
        name: "DBMS LAB",
        Credit: "1",
        SUBCODE: "CS29006",
         Grade:"O",
      },
      {
        name: "Vocational Electives",
        Credit: "1",
        SUBCODE: "CS28001",
         Grade:"O",
      },
    ],
    "5": [
      {
        name: "COMPUTER NETWORKS",
        Credit: "3",
        SUBCODE: "IT3005",
         Grade:"O",
      },
      {
        name: "DESIGN & ANALYSIS OF ALGO",
        Credit: "3",
        SUBCODE: "CS2012",
         Grade:"O",
      },
      {
        name: "DBMS",
        Credit: "4",
        SUBCODE: "CS2004",
         Grade:"O",
      },
      {
        name: "SOFTWARE ENGINEERING",
        Credit: "4",
        SUBCODE: "IT3003",
         Grade:"O",
      },
      {
        name: "NETWORK LAB",
        Credit: "1",
        SUBCODE: "IT3095",
         Grade:"O",
      },
      {
        name: "ALGORITHM LAB",
        Credit: "1",
        SUBCODE: "CS2098",
         Grade:"O",
      },
      {
        name: "ELECTIVE-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "ELECTIVE-2",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "DBMS LAB",
        Credit: "1",
        SUBCODE: "CS2094",
         Grade:"O",
      },
    ],
    "6": [
      {
        name: "COMPUTER DESIGN",
        Credit: "3",
        SUBCODE: "CS3008",
         Grade:"O",
      },
      {
        name: "MATHEMATICS-II",
        Credit: "4",
        SUBCODE: "MA11002",
         Grade:"O",
      },
      {
        name: "ENGLISH",
        Credit: "2",
        SUBCODE: "HS10001",
         Grade:"O",
      },
      {
        name: "BASIC ELECTRONICS",
        Credit: "2",
        SUBCODE: "EC10001",
         Grade:"O",
      },
      {
        name: "CHEMISTRY LAB",
        Credit: "1",
        SUBCODE: "CH19001",
         Grade:"O",
      },
      {
        name: "YOGA",
        Credit: "1",
        SUBCODE: "YG18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING LAB",
        Credit: "1",
        SUBCODE: "EX19001",
         Grade:"O",
      },
      {
        name: "WORKSHOP",
        Credit: "1",
        SUBCODE: "ME18001",
         Grade:"O",
      },
      {
        name: "COMMUNICATION LAB",
        Credit: "1",
        SUBCODE: "HS18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
       Grade:"O",
      },
      {
        name: "SOCIAL SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "7": [
      {
        name: "SEMESESTE-7",
        Credit: "3",
        SUBCODE: "CH10001",
         Grade:"O",
      },
      {
        name: "MATHEMATICS-II",
        Credit: "4",
        SUBCODE: "MA11002",
         Grade:"O",
      },
      {
        name: "ENGLISH",
        Credit: "2",
        SUBCODE: "HS10001",
         Grade:"O",
      },
      {
        name: "BASIC ELECTRONICS",
        Credit: "2",
        SUBCODE: "EC10001",
         Grade:"O",
      },
      {
        name: "CHEMISTRY LAB",
        Credit: "1",
        SUBCODE: "CH19001",
         Grade:"O",
      },
      {
        name: "YOGA",
        Credit: "1",
        SUBCODE: "YG18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING LAB",
        Credit: "1",
        SUBCODE: "EX19001",
         Grade:"O",
      },
      {
        name: "WORKSHOP",
        Credit: "1",
        SUBCODE: "ME18001",
         Grade:"O",
      },
      {
        name: "COMMUNICATION LAB",
        Credit: "1",
        SUBCODE: "HS18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "SOCIAL SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "8": [
      {
        name: "SEMESTER-8",
        Credit: "3",
        SUBCODE: "CH10001",
         Grade:"O",
      },
      {
        name: "MATHEMATICS-II",
        Credit: "4",
        SUBCODE: "MA11002",
         Grade:"O",
      },
      {
        name: "ENGLISH",
        Credit: "2",
        SUBCODE: "HS10001",
         Grade:"O",
      },
      {
        name: "BASIC ELECTRONICS",
        Credit: "2",
        SUBCODE: "EC10001",
         Grade:"O",
      },
      {
        name: "CHEMISTRY LAB",
        Credit: "1",
        SUBCODE: "CH19001",
         Grade:"O",
      },
      {
        name: "YOGA",
        Credit: "1",
        SUBCODE: "YG18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING LAB",
        Credit: "1",
        SUBCODE: "EX19001",
         Grade:"O",
      },
      {
        name: "WORKSHOP",
        Credit: "1",
        SUBCODE: "ME18001",
         Grade:"O",
      },
      {
        name: "COMMUNICATION LAB",
        Credit: "1",
        SUBCODE: "HS18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "SOCIAL SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
  },

  CSSE: {
    "1": [
      {
        name: "CHEMISTRY",
        Credit: "3",
        SUBCODE: "CH10001",
         Grade:"O",
      },
      {
        name: "Transform Calculus and Numerical Analysis",
        Credit: "4",
        SUBCODE: "MA11002",
         Grade:"O",
      },
      {
        name: "ENGLISH",
        Credit: "2",
        SUBCODE: "HS10001",
         Grade:"O",
      },
      {
        name: "BASIC ELECTRONICS",
        Credit: "2",
        SUBCODE: "EC10001",
         Grade:"O",
      },


      {
        name: "CHEMISTRY LAB",
        Credit: "1",
        SUBCODE: "CH19001",
         Grade:"O",
      },
      {
        name: "YOGA",
        Credit: "1",
        SUBCODE: "YG18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING LAB",
        Credit: "1",
        SUBCODE: "EX19001",
         Grade:"O",
      },
      {
        name: "WORKSHOP",
        Credit: "1",
        SUBCODE: "ME18001",
         Grade:"O",
      },
      {
        name: "COMMUNICATION LAB",
        Credit: "1",
        SUBCODE: "HS18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "HASS Elective - I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "2": [
      {
        name: "PHYSICS",
        Credit: "3",
        SUBCODE: "PH10001",
         Grade:"O",
      },
      {
        name: "Differential Equations and Linear Algebra",
        Credit: "4",
        SUBCODE: "MA11001",
         Grade:"O",
      },
      {
        name: "SCIENCE OF LIVING SYSTEMS",
        Credit: "2",
        SUBCODE: "LS10001",
         Grade:"O",
      },
      {
        name: "ENVIROMENTAL SCIENCE",
        Credit: "2",
        SUBCODE: "CH10003",
         Grade:"O",
      },
      {
        name: "PHYSICS LAB",
        Credit: "1",
        SUBCODE: "PH19001",
         Grade:"O",
      },
      {
        name: "PROGRAMMING LAB",
        Credit: "4",
        SUBCODE: "CS19001",
         Grade:"O",
      },
      {
        name: "ENGINEERING DRAWING & GRAPHICS",
        Credit: "1",
        SUBCODE: "CE18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-II",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
    "3": [
      {
        name: "DS",
        Credit: "4",
        SUBCODE: "CS21001",
         Grade:"O",
      },

      {
        name: "Scientific and Technical Writing",
        Credit: "2",
        SUBCODE: "EX20003",
         Grade:"O",
      },
      {
        name: "COA",
        Credit: "4",
        SUBCODE: "CS21002",
         Grade:"O",
      },
      {
        name: "Digital Systems Design",
        Credit: "3",
        SUBCODE: "EC20005",
         Grade:"O",
      },
      {
        name: "PS",
        Credit: "4",
        SUBCODE: "MA21001",
         Grade:"O",
      },
      {
        name: "OOPJ",
        Credit: "3",
        SUBCODE: "CS20004",
         Grade:"O",
      },
      {
        name: "DS LAB",
        Credit: "1",
        SUBCODE: "CS29001",
         Grade:"O",
      },
      {
        name: "OOPJ LAB",
        Credit: "1",
        SUBCODE: "CS29004",
         Grade:"O",
      },
      {
        name: "DSD LAB",
        Credit: "1",
        SUBCODE: "EC29005",
         Grade:"O",
      },
    ],
    "4": [
      {
        name: "Industry 4.0 Technologies",
        Credit: "3",
        SUBCODE: "EX20001",
         Grade:"O",
      },
      {
        name: "Discrete Structures",
        Credit: "4",
        SUBCODE: "MA21002",
         Grade:"O",
      },
      {
        name: "OS",
        Credit: "3",
        SUBCODE: "CS20002",
         Grade:"O",
      },
      {
        name: "Engineering Economics",
        Credit: "3",
        SUBCODE: "HS30101",
         Grade:"O",
      },

      
      {
        name: "PDC",
        Credit: "4",
        SUBCODE: "EC20006",
         Grade:"O",
      },
      {
        name: "DBMS",
        Credit: "3",
        SUBCODE: "CS20006",
         Grade:"O",
      },
      
      {
        name: "OS LAB",
        Credit: "1",
        SUBCODE: "CS29002",
         Grade:"O",
      },
      {
        name: "DBMS LAB",
        Credit: "1",
        SUBCODE: "CS29006",
         Grade:"O",
      },
      {
        name: "Vocational Electives",
        Credit: "1",
        SUBCODE: "CS28001",
         Grade:"O",
      },
    ],
    "5": [
      {
        name: "COMPUTER NETWORKS",
        Credit: "3",
        SUBCODE: "IT3005",
         Grade:"O",
      },
      {
        name: "IOT",
        Credit: "3",
        SUBCODE: "IT3007",
         Grade:"O",
      },
      {
        name: "Artificial Intelligence",
        Credit: "3",
        SUBCODE: "CS 3011",
         Grade:"O",
      },
      {
        name: "SOFTWARE ENGINEERING",
        Credit: "4",
        SUBCODE: "IT3003",
         Grade:"O",
      },
      {
        name: "NETWORK LAB",
        Credit: "1",
        SUBCODE: "IT3095",
         Grade:"O",
      },
      {
        name: "Advanced Programming LAB",
        Credit: "1",
        SUBCODE: "CS2098",
         Grade:"O",
      },
      {
        name: "ELECTIVE-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "ELECTIVE-2",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      
    ],
    "6": [
      {
        name: "Cloud Computing",
        Credit: "3",
        SUBCODE: "IT 3022",
         Grade:"O",
      },
      {
        name: "Embedded Systems Design and Application",
        Credit: "3",
        SUBCODE: "EC 3033 ",
         Grade:"O",
      },
      {
        name: "D-Elective-III",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },{
        name: "D-Elective-IV",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },{
        name: "D-Elective-V",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      
    
      {
        name: "OPEN Elective",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "CC LAB",
        Credit: "1",
        SUBCODE: "IT3098",
         Grade:"O",
      },
      {
        name: "T&TL LAB",
        Credit: "2",
        SUBCODE: "CS3096",
         Grade:"O",
      },
      {
        name: "MINOR PROJECT",
        Credit: "2",
        SUBCODE: "CM3082",
         Grade:"O",
      },
     
    ],
    "7": [
      {
        name: "HS-ELECTIVE-II",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "Professional Practice, Law & Ethics",
        Credit: "2",
        SUBCODE: "HS4001",
         Grade:"O",
      },
      {
        name: "OPEN ELECTIVE-II",
        Credit: "3",
        SUBCODE: "HS10001",
         Grade:"O",
      },
      {
        name: "MI-3",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },{
        name: "MI-4",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },{
        name: "HO-1",
        Credit: "3",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "Project-1/Internship",
        Credit: "3",
        SUBCODE: "CM4081",
         Grade:"O",
      },
      {
        name: "Practical Training",
        Credit: "2",
        SUBCODE: "CM4083",
         Grade:"O",
      },
      {
        name: "Project-Minor/ LAB",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      
    ],
    "8": [
      {
        name: "SEMESTER-8",
        Credit: "3",
        SUBCODE: "CH10001",
         Grade:"O",
      },
      {
        name: "MATHEMATICS-II",
        Credit: "4",
        SUBCODE: "MA11002",
         Grade:"O",
      },
      {
        name: "ENGLISH",
        Credit: "2",
        SUBCODE: "HS10001",
         Grade:"O",
      },
      {
        name: "BASIC ELECTRONICS",
        Credit: "2",
        SUBCODE: "EC10001",
         Grade:"O",
      },
      {
        name: "CHEMISTRY LAB",
        Credit: "1",
        SUBCODE: "CH19001",
         Grade:"O",
      },
      {
        name: "YOGA",
        Credit: "1",
        SUBCODE: "YG18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING LAB",
        Credit: "1",
        SUBCODE: "EX19001",
         Grade:"O",
      },
      {
        name: "WORKSHOP",
        Credit: "1",
        SUBCODE: "ME18001",
         Grade:"O",
      },
      {
        name: "COMMUNICATION LAB",
        Credit: "1",
        SUBCODE: "HS18001",
         Grade:"O",
      },
      {
        name: "ENGINEERING ELECTIVE-I",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
      {
        name: "SOCIAL SCIENCE ELECTIVE",
        Credit: "2",
        SUBCODE: null,
         Grade:"O",
      },
    ],
  },


};


export const secureId =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMzQyMF9SQU5KSVQgS1VNQVIgREFTIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xEYktTM0wyLTJodXprUkE2QTZRekVNNTJ2RUhrbXcwOXZFOHhyd0dUUGhZQT1zOTYtYyIsInN1YiI6IjEwOTgyNDUwNzgwNDY5MjI4NzI3NyIsImRhdGEiOnsiYWRkcmVzcyI6eyJhZGRyZXNzIjoiS2lpdCBSb2FkLFBhdGlhIEJodWJhbmVzaHdhciIsImNpdHkiOiJCaHViYW5lc3dhciIsInN0YXRlIjoiT2Rpc2hhIiwiY291bnRyeSI6IkluZGlhIiwicGluY29kZSI6Ijc1MTAyNCJ9LCJpZCI6IjY1YzNjZjZkNmE1MmNhZmQwNzMyYWNlMiIsInVzZXJuYW1lIjoiMjEwNTM0MjAiLCJGbmFtZSI6IlJhbmppdCIsIkxuYW1lIjoiRGFzIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwiYWdlIjpudWxsLCJnZW5kZXIiOm51bGwsImRvYiI6IjIwMjQtMDItMTNUMTg6MzA6MDAuMDAwWiIsImJsb29kR3JvdXAiOm51bGwsImNvbnRhY3QiOiIwOTYzMTYyNzEwNCIsImlzQWN0aXZlIjp0cnVlLCJwcm9maWxlUGljIjpudWxsLCJyb2xlIjoiRE9DVE9SIiwidXNlcklkIjoiUFQtazl3eFgiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQzOjU3LjcwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQ1OjEwLjgyNloiLCJkb2N0b3JQcm9maWxlIjp7ImlkIjoiNjVjM2NmNzk2YTUyY2FmZDA3MzJhY2UzIiwic3BlY2lhbGl6YXRpb25zIjpbInBvcCJdLCJkZXNjcmlwdGlvbiI6ImkgYW0gYSBkb2N0b3IiLCJmZWUiOm51bGx9fSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZXhwIjoxNzA4ODU2MTUwLCJpYXQiOjE3MDc5OTIxNTB9.kO7rz-EWzb5yci7v5aD3GdPkFez7fJJvMe8XQSRNAHk";