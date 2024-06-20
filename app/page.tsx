"use client"

import { Input } from "@/components/ui/input"
import { DropDownOptions } from "@/components/DropDownOptions";
import { ButtonComponent } from "@/components/Button";
import { Header } from "@/components/Header/page";
import useQuiz from "./store";
import Sliderbar from "@/components/Slidebar/page";

export default function Home() {
  const addNumberOfQuestions = useQuiz(state => state.addNumberOfQuestions)

  return (
    <section className="flex justify-start items-start">
      <Header />
      <Sliderbar />

      <section className="p-10 my-10 w-full">
        <h1 className="font-bold font-sans mb-3 text-2xl tracking-tight md:text-4xl lg:text-5xl mt-5"><span className="text-[#FF0000]">Knowledge</span> favors the bold</h1>
        <p className="font-sans">Quiz Craft is an open-source quiz application built using Next.js and an API. Here, you can choose the category and level to test your skills and knowledge.</p>
        <h2 className="font-bold font-sans mt-2 text-3xl tracking-tight">Practicing quizzes daily offers several benefits</h2>
        <ul className="list-disc pl-4 font-sans mt-2">
          <li>Retention and recall</li>
          <li>Identifies weaknesses</li>
          <li>Boosts confidence</li>
          <li>Builds discipline</li>
          <li>Engaging learning</li>
          <li>Progress tracking</li>
        </ul>

        <h1 className="font-bold font-sans text-3xl tracking-tight md:text-4xl lg:text-5xl mt-4 text-[#FF0000]">Begin a quiz</h1>
        <Input
          className="font-sans border border-red-500 placeholder-opacity-50 mt-4 w-96 rounded"
          type="number"
          onChange={(e) => addNumberOfQuestions(e.target.value)}
          placeholder="Enter number of questions"
          min={0}
          max={20}
          required
        />
        <DropDownOptions />
        <ButtonComponent />
        <p className="font-sans mt-3">For further details about the project, visit <span className="text-[#FF0000]">quizcraft.in</span> or contact the developer at <span className="text-[#FF0000]">aswnrh.dev@gmail.com</span>. Feel free to visit again!</p>

      </section>
    </section>
  );
}
