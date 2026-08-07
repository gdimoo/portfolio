"use client";

import React, { useState, useEffect } from 'react';
import {
    Flag,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Info
} from 'lucide-react';

const questions = [
    // Logic & Python Basics (1-5)
    {
        question: "1. What is the output of the following Python code?",
        code: `def mystery_function(numbers):
    total = 0
    for i in range(len(numbers)):
        if numbers[i] % 2 == 1:
            total += numbers[i]
    return total

my_list = [1, 4, 5, 8, 9]
print(mystery_function(my_list))`,
        options: ["A) 10", "B) 14", "C) 15", "D) 27"],
        correct: 2 // C) 15
    },
    {
        question: "2. The following code is supposed to find the maximum number in a list. What will it actually return for the given input?",
        code: `def find_max(nums):
    current_max = 0
    for num in nums:
        if num > current_max:
            current_max = num
    return current_max

print(find_max([-5, -2, -10, -1]))`,
        options: ["A) -1", "B) -5", "C) 0", "D) It will throw an error"],
        correct: 2 // C) 0
    },
    {
        question: "3. Which data structure operates on a Last-In, First-Out (LIFO) principle?",
        code: null,
        options: ["A) Queue", "B) Stack", "C) Array", "D) Linked List"],
        correct: 1 // B) Stack
    },
    {
        question: "4. Look at the nested loops below. If n = 5, how many times in total will 'Hi' be printed?",
        code: `n = 5
count = 0
for i in range(n):
    for j in range(n):
        print("Hi")
        count += 1`,
        options: ["A) 5", "B) 10", "C) 20", "D) 25"],
        correct: 3 // D) 25
    },
    {
        question: "5. If you want to check if a string is a Palindrome using a loop, which approach is generally most efficient?",
        code: null,
        options: [
            "A) Loop through the entire string from start to end and compare with another reversed string.",
            "B) Loop from index 0 to the middle of the string (len/2) and compare characters at opposite ends.",
            "C) Loop through the string backwards from the end to the start.",
            "D) Use two nested loops to compare every character with every other character."
        ],
        correct: 1 // B
    },
    // Java Intuition (6-10)
    {
        question: "6. Compare this Java code to Python. What will this program print?",
        code: `public class Main {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        
        if (x > 3 && y < 20) {
            for (int i = 0; i < 3; i++) {
                System.out.print(i + " ");
            }
        }
    }
}`,
        options: ["A) 1 2 3", "B) 0 1 2", "C) 0 1 2 3", "D) Syntax error"],
        correct: 1 // B) 0 1 2
    },
    {
        question: "7. In Java, unlike Python, you must declare the type of a variable. Which of the following is a valid integer declaration in Java?",
        code: null,
        options: ["A) num = 5;", "B) int num = 5;", "C) integer num = 5;", "D) var num : int = 5;"],
        correct: 1 // B
    },
    {
        question: "8. What is the equivalent of a Python 'list' (e.g., [1, 2, 3]) in basic Java that has a fixed size?",
        code: null,
        options: ["A) Dictionary", "B) Tuple", "C) Array", "D) Set"],
        correct: 2 // C) Array
    },
    {
        question: "9. What does the 'public' keyword mean in 'public class Main'?",
        code: null,
        options: [
            "A) The class is available on the internet.",
            "B) The class can be accessed from any other class.",
            "C) The class cannot be modified.",
            "D) The class requires a password to run."
        ],
        correct: 1 // B
    },
    {
        question: "10. Which symbol is used for a single-line comment in Java?",
        code: null,
        options: ["A) #", "B) <!--", "C) //", "D) %"],
        correct: 2 // C
    },
    // OOP Concepts (11-15)
    {
        question: "11. In Object-Oriented Programming, a 'Class' is best described as:",
        code: null,
        options: [
            "A) A specific instance of an object.",
            "B) A blueprint or template for creating objects.",
            "C) A function that returns a value.",
            "D) A type of loop."
        ],
        correct: 1 // B
    },
    {
        question: "12. What is 'Encapsulation'?",
        code: null,
        options: [
            "A) Hiding the internal state and requiring all interaction to be performed through an object's methods.",
            "B) Creating a new class from an existing class.",
            "C) Writing code that can take on multiple forms.",
            "D) Compiling code into machine language."
        ],
        correct: 0 // A
    },
    {
        question: "13. What is the output of this pseudo-OOP code?",
        code: `class Dog:
    def __init__(self, name):
        self.name = name
        self.tricks = []

    def add_trick(self, trick):
        self.tricks.append(trick)

d1 = Dog("Fido")
d2 = Dog("Buddy")
d1.add_trick("roll over")

print(len(d2.tricks))`,
        options: ["A) 1", "B) 0", "C) 2", "D) Error"],
        correct: 1 // B) 0
    },
    {
        question: "14. 'Inheritance' allows a class to:",
        code: null,
        options: [
            "A) Hide its variables from other classes.",
            "B) Run multiple threads simultaneously.",
            "C) Inherit fields and methods from another class.",
            "D) Prevent other classes from being created."
        ],
        correct: 2 // C
    },
    {
        question: "15. A 'Constructor' is a special method used to:",
        code: null,
        options: [
            "A) Destroy an object when it's no longer needed.",
            "B) Initialize a newly created object.",
            "C) Copy one object to another.",
            "D) Convert an object to a string."
        ],
        correct: 1 // B
    },
    // Math & Algo Basics (16-20)
    {
        question: "16. If an algorithm takes N steps for an input of size N, its time complexity is proportional to:",
        code: null,
        options: ["A) N^2", "B) log(N)", "C) 1", "D) N"],
        correct: 3 // D
    },
    {
        question: "17. What is the value of 2^4 (2 to the power of 4)?",
        code: null,
        options: ["A) 8", "B) 16", "C) 32", "D) 64"],
        correct: 1 // B
    },
    {
        question: "18. Which operation is generally faster in an Array?",
        code: null,
        options: [
            "A) Inserting an element at the beginning.",
            "B) Accessing an element by its index (e.g., arr[5]).",
            "C) Searching for a specific value.",
            "D) Deleting an element from the middle."
        ],
        correct: 1 // B
    },
    {
        question: "19. Log base 2 of 8 is:",
        code: null,
        options: ["A) 2", "B) 3", "C) 4", "D) 8"],
        correct: 1 // B
    },
    {
        question: "20. What is the purpose of the modulo operator (%)?",
        code: null,
        options: [
            "A) To calculate percentages.",
            "B) To find the quotient of division.",
            "C) To find the remainder of division.",
            "D) To multiply numbers."
        ],
        correct: 2 // C
    }
];

export default function App() {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Array<number | null>>(new Array(questions.length).fill(null));
    const [flaggedQs, setFlaggedQs] = useState<boolean[]>(new Array(questions.length).fill(false));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [animationKey, setAnimationKey] = useState(0); // Used to re-trigger fade-in on question change

    const currentQuestion = questions[currentQIndex];
    const answeredCount = userAnswers.filter((ans) => ans !== null).length;
    const unansweredCount = questions.length - answeredCount;
    const flaggedCount = flaggedQs.filter((f) => f).length;

    // Re-trigger animation when question changes
    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [currentQIndex]);

    const handleSelectOption = (optIndex: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQIndex] = optIndex;
        setUserAnswers(newAnswers);
    };

    const toggleFlag = () => {
        const newFlagged = [...flaggedQs];
        newFlagged[currentQIndex] = !newFlagged[currentQIndex];
        setFlaggedQs(newFlagged);
    };

    const handleNext = () => {
        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(currentQIndex + 1);
        } else {
            setCurrentQIndex(0); // Loop back to first
        }
    };

    const handlePrev = () => {
        if (currentQIndex > 0) {
            setCurrentQIndex(currentQIndex - 1);
        }
    };

    const calculateScore = () => {
        let score = 0;
        userAnswers.forEach((ans, index) => {
            if (ans === questions[index].correct) {
                score++;
            }
        });
        return score;
    };

    const confirmSubmit = () => {
        setShowSubmitModal(false);
        setIsSubmitted(true);
    };

    const handleRestart = () => {
        setUserAnswers(new Array(questions.length).fill(null));
        setFlaggedQs(new Array(questions.length).fill(false));
        setCurrentQIndex(0);
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        const score = calculateScore();
        const percentage = (score / questions.length) * 100;

        let resultTitle = "";
        let resultDesc = null;

        if (percentage >= 80) {
            resultTitle = "Excellent!";
            resultDesc = (
                <>
                    Your logic and foundational knowledge are rock solid. You are fully prepared to jump into Java Syntax and Object-Oriented concepts.
                    <br /><br />
                    <strong className="text-slate-900">Tutor Note:</strong> We can fast-track the syntax and go straight to classes/objects!
                </>
            );
        } else if (percentage >= 50) {
            resultTitle = "Good Start!";
            resultDesc = (
                <>
                    You have a decent grasp of programming logic. You might need a quick review on specific concepts (like OOP terminology or loop tracing) before we dive deep into Java.
                    <br /><br />
                    <strong className="text-slate-900">Tutor Note:</strong> Focus on comparing Python behavior vs Java static typing.
                </>
            );
        } else {
            resultTitle = "Let's Review the Basics";
            resultDesc = (
                <>
                    Don't worry! Transitioning to a new language and paradigm can be tricky. We will review basic control flows, logic, and what Objects actually are before writing complex Java code.
                    <br /><br />
                    <strong className="text-slate-900">Tutor Note:</strong> Need to spend time on basic Logic/Tracing before jumping into OOP.
                </>
            );
        }

        return (
            <div className="min-h-screen p-4 md:p-8 bg-slate-50 flex items-center justify-center font-sans text-slate-800">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-2xl w-full text-center animate-in fade-in zoom-in duration-500">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
                        <span className="text-4xl font-bold text-blue-600">{score}/{questions.length}</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-900">{resultTitle}</h2>
                    <p className="text-slate-600 mb-8 text-lg leading-relaxed">{resultDesc}</p>

                    <button
                        onClick={handleRestart}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-8 rounded-lg transition-all text-lg shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
                    >
                        <RotateCcw size={20} /> Restart Test
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 bg-slate-50 font-sans text-slate-800 flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 max-w-6xl w-full items-start">

                {/* Left Column: Quiz Content */}
                <main className="w-full bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col min-h-[75vh]">

                    {/* Header */}
                    <header className="bg-slate-900 text-white p-5 md:px-8 flex justify-between items-center shrink-0">
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight">Pre-test: Data Structures & Java</h1>
                            <p className="text-slate-400 text-sm mt-1">MUIC - {'{Abstractions, OOP}'} Transition</p>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium">Question {currentQIndex + 1} of {questions.length}</p>
                            <p className="text-xs text-slate-400 mt-1">{answeredCount} Answered</p>
                        </div>
                    </header>

                    {/* Quiz Container */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col">

                        {/* Action Bar */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="md:hidden text-sm font-medium text-slate-500">
                                Q {currentQIndex + 1} / {questions.length}
                            </div>
                            <button
                                onClick={toggleFlag}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors px-3 py-1.5 rounded-md ml-auto ${flaggedQs[currentQIndex]
                                    ? 'text-red-600 bg-red-50 hover:bg-red-100'
                                    : 'text-slate-500 hover:text-red-500 hover:bg-slate-50'
                                    }`}
                            >
                                <Flag size={16} fill={flaggedQs[currentQIndex] ? "currentColor" : "none"} />
                                {flaggedQs[currentQIndex] ? 'Flagged' : 'Flag for review'}
                            </button>
                        </div>

                        {/* Question Display Area (Animated on change) */}
                        <div key={animationKey} className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex-grow flex flex-col">
                            <div className="text-lg font-medium mb-6 text-slate-900 leading-relaxed">
                                {currentQuestion.question}
                            </div>

                            {/* Code Snippet */}
                            {currentQuestion.code && (
                                <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-900 text-slate-50 p-4">
                                    <pre className="font-mono text-[0.9rem] leading-relaxed overflow-x-auto">
                                        <code>{currentQuestion.code}</code>
                                    </pre>
                                </div>
                            )}

                            {/* Options */}
                            <div className="space-y-3 mb-8 flex-grow">
                                {currentQuestion.options.map((opt, idx) => {
                                    const isSelected = userAnswers[currentQIndex] === idx;
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => handleSelectOption(idx)}
                                            className={`
                        border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 font-medium
                        ${isSelected
                                                    ? 'border-blue-500 bg-blue-50/50 text-blue-900 shadow-[0_0_0_1px_rgba(59,130,246,0.2)]'
                                                    : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50'}
                      `}
                                        >
                                            {opt}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer / Main Navigation */}
                        <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-auto">
                            <button
                                onClick={handlePrev}
                                disabled={currentQIndex === 0}
                                className="text-slate-600 hover:text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >
                                <ArrowLeft size={18} /> Previous
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm flex items-center gap-2"
                            >
                                {currentQIndex === questions.length - 1 ? (
                                    <>Go to First <RotateCcw size={18} /></>
                                ) : (
                                    <>Next <ArrowRight size={18} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </main>

                { }
                <aside className="w-full bg-white rounded-2xl shadow-lg p-6 border border-slate-200 lg:sticky lg:top-8 flex flex-col h-fit">
                    <h3 className="font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Info size={18} className="text-slate-400" />
                        Navigation
                    </h3>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-3 text-xs mb-6 text-slate-600">
                        <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded bg-slate-50 border border-slate-200"></span> Pending
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded bg-green-100 border border-green-300"></span> Answered
                        </div>
                        <div className="flex items-center gap-2 relative">
                            <span className="w-3.5 h-3.5 rounded bg-slate-50 border border-slate-200"></span>
                            <Flag size={10} className="absolute left-[8px] top-[-4px] text-red-500 bg-white rounded-full" /> Flagged
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded bg-slate-50 ring-2 ring-slate-800 ring-offset-1"></span> Current
                        </div>
                    </div>

                    {/* Grid Buttons */}
                    <div className="grid grid-cols-5 gap-2 mb-8">
                        {questions.map((_, i) => {
                            const isAnswered = userAnswers[i] !== null;
                            const isFlagged = flaggedQs[i];
                            const isCurrent = i === currentQIndex;

                            let baseClasses = "relative w-full aspect-square rounded-md font-medium text-sm flex items-center justify-center transition-all duration-200 cursor-pointer ";

                            if (isAnswered) {
                                baseClasses += "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 ";
                            } else {
                                baseClasses += "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 ";
                            }

                            if (isCurrent) {
                                baseClasses += "ring-2 ring-slate-800 ring-offset-1 z-10 font-bold ";
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => setCurrentQIndex(i)}
                                    className={baseClasses}
                                    aria-label={`Go to question ${i + 1}`}
                                >
                                    {i + 1}
                                    {isFlagged && (
                                        <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-sm">
                                            <Flag size={10} className="text-red-500" fill="currentColor" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Submit Section */}
                    <div className="mt-auto pt-4 border-t border-slate-100">
                        {unansweredCount > 0 && (
                            <p className="text-sm text-amber-600 font-medium mb-3 flex items-center gap-1.5">
                                <AlertTriangle size={16} />
                                {unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}.
                            </p>
                        )}
                        <button
                            onClick={() => setShowSubmitModal(true)}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            Finish & Submit
                        </button>
                    </div>
                </aside>
            </div>

            { }
            {showSubmitModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Submit Quiz?</h3>

                        <div className="space-y-3 mb-8 text-slate-600">
                            <p>Are you sure you want to submit your answers?</p>

                            {(unansweredCount > 0 || flaggedCount > 0) && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-sm mt-4">
                                    {unansweredCount > 0 && (
                                        <div className="font-medium flex items-center gap-2 mb-1">
                                            <AlertTriangle size={14} /> {unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}.
                                        </div>
                                    )}
                                    {flaggedCount > 0 && (
                                        <div className="flex items-center gap-2">
                                            <Flag size={14} className="text-red-500" /> {flaggedCount} flagged for review.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSubmit}
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                            >
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}