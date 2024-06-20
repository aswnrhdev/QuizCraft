import { useEffect, useState } from "react";
import useQuiz from "../store";
import { MutatingDots } from 'react-loader-spinner'
import { Header } from "@/components/Header/page";
import Sliderbar from "@/components/Slidebar/page";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    const config = useQuiz(state => state.config);
    const addScore = useQuiz(state => state.addScore);
    const score = useQuiz(state => state.config.score);

    useEffect(() => {
        async function getQuestions() {
            setLoading(true);
            try {
                const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${process.env.NEXT_PUBLIC_QUIZ_API_KEY}&category=${config.category.name}&difficulty=${config.level}&limit=${config.numberOfQuestions}`);
                const data = await response.json();
                // console.log(data);

                const shuffledData = data.map(question => {
                    const answersArray = Object.keys(question.answers)
                        .filter(key => question.answers[key])
                        .map(key => ({ key, text: question.answers[key] }));

                    return {
                        ...question,
                        answersArray: shuffleArray(answersArray)
                    };
                });

                setTimeout(() => {
                    setQuestions(shuffledData);
                    setLoading(false);
                }, 0);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        }

        getQuestions();
    }, [config.category.name, config.level, config.numberOfQuestions]);

    const handleAnswerClick = (selectedOption) => {
        setSelectedAnswer(selectedOption);

        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.correct_answer === selectedOption) {
            setCorrectAnswer(selectedOption);
            setShowFeedback(true);
            setFeedbackText('Correct Answer!');
            addScore();
        } else {
            setCorrectAnswer(currentQuestion.correct_answer);
            setShowFeedback(true);
            setFeedbackText('Wrong Answer!');
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setSelectedAnswer('');
            setCorrectAnswer('');
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setShowFeedback(false);
            setFeedbackText('');
        } else {
            setQuizCompleted(true);
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <MutatingDots
                    visible={true}
                    height={100}
                    width={100}
                    color="#FF0000"
                    secondaryColor="#FF0000"
                    radius={12.5}
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>No questions available.</div>;
    }

    if (quizCompleted) {
        const averageScore = (score / config.numberOfQuestions).toFixed(2);

        return (
            <>
                <Header />
                <section className="font-sans tracking-tighter flex flex-col justify-center items-center mt-32">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-[#FF0000]">Quiz Completed!</h1>
                    <p className="text-1xl">Number of Questions Attended: {config.numberOfQuestions}</p>
                    <p className="text-1xl text-[#059212]">Number of Questions Solved: {score}</p>
                    <p className="text-2xl mt-5">Average Score per Question: {averageScore}</p>
                    <button
                        onClick={handleRefresh}
                        className="mt-4 py-2 px-4 bg-black text-white rounded-lg"
                    >
                        Attempt Another One
                    </button>
                    <section className="flex justify-center items-center bg-black w-full mt-20 h-96">
                        <h1 className=" text-[#F5EDED] cursor-pointer">All rights reserved Quicraft @2024</h1>
                    </section>
                </section>
            </>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <section className="flex justify-center items-center">
            <Header />
            <section className="flex flex-col justify-center items-center mt-10">
                <h1 className="font-bold font-sans text-3xl md:text-4xl lg:text-6xl mt-20"><span className="text-[#FF0000]">Score:</span> {score}</h1>
                <h1 className="font-sans tracking-tight lg:text-2xl mt-16 text-[#000000]">Question Number <span className="text-[#FF0000]">#{currentQuestionIndex + 1}</span></h1>
                <h4 className="font-sans mt-3">{currentQuestion.question}</h4>

                <div className="flex justify-evenly items-center my-10 flex-wrap w-[75%]">
                    {currentQuestion.answersArray.map(({ key, text }, index) => (
                        <button
                            key={index}
                            className={`font-sans w-[33%] my-4 py-3 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 ${selectedAnswer && (key === correctAnswer ? 'bg-[#059212]' : key === selectedAnswer ? 'bg-[#FF0000]' : '')}`}
                            onClick={() => handleAnswerClick(key)}
                            disabled={selectedAnswer !== ''}
                        >
                            {text}
                        </button>
                    ))}
                </div>

                {showFeedback && (
                    <button onClick={nextQuestion} className="mt-4 py-2 px-4 bg-black border w-60 text-white rounded-lg">
                        Next Question
                    </button>
                )}
            </section>
        </section>
    );
};
