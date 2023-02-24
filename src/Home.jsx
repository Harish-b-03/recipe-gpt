import { useState } from "react";
import getResponse from "./api/getResponse";
import { ingredients } from "./ingredients";

const Home = () => {
  
  const [Ingredients, setIngredients] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getResponse(Ingredients);
    console.log(response)
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
        <div className="w-full h-[15%] px-10 flex justify-start items-center">
            <span className="mr-4 ml-2 text-white underline underline-offset-4">
                Ingredients Selected:
            </span>
            <div>
                <span className="mx-1">[</span>
                    {
                        Ingredients.map((item)=>{return <span className="text-white mx-2">{`${item.ingredient}, `}</span>})
                    }
                <span>]</span>
            </div>
        </div>
        <div className="w-full h-[70%] px-10 flex flex-wrap overflow-y-scroll">
            {
                ingredients.map((ingredient)=>{
                    return (
                        <div 
                            onClick={()=>{
                                (Ingredients.length > 0 && Ingredients.includes(ingredient))?
                                    setIngredients(prev => prev.filter((item)=>item.ingredientId != ingredient.ingredientId))
                                    :
                                    setIngredients(prev => [...prev, ingredient])} 
                            }
                            key={ingredient.ingredient} 
                            className={` ${(Ingredients.includes(ingredient))?'bg-violet-400':'bg-[#30004A]'} my-2 mx-2 px-4 py-2 text-white border-[1px] border-solid border-violet-900 rounded-lg cursor-pointer hover:bg-violet-500`}>
                                {ingredient.ingredient}
                        </div>
                    )
                })
            }
        </div>
        <div className="w-full h-[15%] flex justify-center items-center">
            <button onClick={handleSubmit} className="px-5 py-2 bg-violet-100 text-violet-900 shadow-xl border-[1px] border-solid border-violet-400">
                Get Receipes
            </button>
        </div>
    </div>
  )
}

export default Home