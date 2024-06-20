"use client"

import useQuiz from "@/app/store"
import { Button } from "@/components/ui/button"

export const ButtonComponent = () => {
    const config = useQuiz(state => state.config)
    const addStatus = useQuiz(state => state.addStatus)

    const handleStartQuiz = () => {
        if (config.category.name && config.level && config.numberOfQuestions > 0) {
            addStatus('start')
        } else {
            alert('Please select a category, level, and enter the number of questions.')
        }
    }

    return (
        <Button className="mt-4 font-sans rounded w-96 bg-[#FF0000] hover:bg-[#020205] transition duration-300 ease-in-out" onClick={handleStartQuiz}>
            Press to start
        </Button>
    )
}

