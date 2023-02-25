import { useEffect, useState } from "react";
import getResponse from "./api/getResponse";
import { ingredients } from "./ingredients";

const Home = () => {
  
  const [Ingredients, setIngredients] = useState([])
  const [search, setSearch] = useState("")
  const [FilteredIngredients, setFilteredIngredients] = useState(ingredients)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getResponse(Ingredients);
    console.log(response)
  }

  const addIngredient = (ingredient) => {
    if(Ingredients.length<= 3)
        setIngredients(prev => [...prev, ingredient]);
  }

  useEffect(() => {
    if(search === "")
        setFilteredIngredients(ingredients);
    else
        setFilteredIngredients(ingredients.filter((item)=>{
            var temp = item.ingredient.toLowerCase();
            return temp.includes(search.toLowerCase());
        }))
  }, [search])
  

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
        <div className="w-full h-[10%] px-10 flex justify-between items-center border-b-slate-900 border-solid border-b-[1px]">
            <div className="mx-2 text-xl font-bold text-white">
                <span>Recipe</span>
                <span className="text-violet-500">GPT</span>
            </div>
            <div className="w-[300px] h-[50%] relative flex justify-center items-center">
                <input 
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search Ingredient...."
                className="w-[300px] h-full px-5 text-white bg-[rgba(255,255,255,0.1)] rounded-xl"
                />
            </div>
        </div>
        <div className="w-full h-[15%] px-10 flex justify-between items-center">
            <div className="flex">
                <span className="mr-4 ml-2 text-white underline underline-offset-4">
                    Ingredients Selected:
                </span>
                <div>
                    <span className="mx-1">[</span>
                    {
                        Ingredients.map((item)=>
                        {
                            return (
                                <span className="text-white mx-2">
                                    {`${(item.ingredient.length > 30)?item.ingredient.substring(0,27)+'...':item.ingredient}, `}
                                </span>
                            )
                        })
                    }
                    <span>]</span>
                </div>
            </div>
        </div>
        <div className="w-full h-[60%] overflow-y-scroll">
            
            <div className="w-full h-fit px-10 flex flex-wrap">
                {
                    (FilteredIngredients.length > 0)?
                        FilteredIngredients.map((ingredient)=>{
                            return (
                                <div 
                                    onClick={()=>{
                                        (Ingredients.length > 0 && Ingredients.includes(ingredient))?
                                            setIngredients(prev => prev.filter((item)=>item.ingredientId !== ingredient.ingredientId))
                                            :
                                            addIngredient(ingredient)} 
                                    }
                                    key={ingredient.ingredient} 
                                    className={` ${(Ingredients.includes(ingredient))?'bg-violet-400':'bg-[#30004A]'} my-2 mx-2 px-4 py-2 max-h-[40px] text-white border-[1px] border-solid border-violet-900 rounded-lg cursor-pointer hover:bg-violet-500`}>
                                        {ingredient.ingredient}
                                </div>
                            )
                        })
                    :
                    <div className="w-full h-full text-lg text-violet-500 flex justify-center items-center">
                        <span>No such ingredient found :(</span>
                    </div>
                }
            </div>
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