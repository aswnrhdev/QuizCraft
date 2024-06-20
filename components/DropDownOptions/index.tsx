"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useQuiz from "@/app/store"

type CategoryType = {
    id: number,
    name: string
}
const Level = ['Easy', 'Medium', 'Hard']

export const DropDownOptions = () => {

    const [categories, setCategories] = useState<CategoryType[]>([])
    const addCategory = useQuiz(state => state.addCategory)
    const config = useQuiz(state => state.config)
    const addLevel = useQuiz(state => state.addLevel)

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await fetch('https://quizapi.io/api/v1/categories?apiKey=P7SDHX6drukqsAAjUdU15k4AhsonPoTyctTyQeiG');
                const data = await response.json();
                console.log(data);

                setCategories([...data]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategory();
    }, []);

    return (
        <section className="flex space-x-8 mt-4">
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="font-sans border border-red-500 placeholder-opacity-50 w-44 rounded focus:outline-none"
                            variant="outline"
                        >
                            {config.category.name ? config.category.name : 'Category'}
                        </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
                        {categories.map((category) => (
                            <DropdownMenuItem
                                key={category.name}
                                onClick={() => addCategory(category.id, category.name)}
                                className="hover:bg-gradient-to-r from-white to-E43A19"
                            >
                                {category.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            <div >
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="font-sans border border-red-500 placeholder-opacity-50 w-44 rounded" variant="outline">{config.level ? config.level : 'Level'}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {Level.map(e => (
                            <DropdownMenuItem key={e} onClick={() => addLevel(e)}>
                                {e}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>

    )
}
