import { useEffect, useState } from "react";
import getResponse from "./api/getResponse";
import Flyout from "./components/Flyout";
import { ingredients } from "./ingredients";

const Home = () => {
  
  const [Ingredients, setIngredients] = useState([])
  const [search, setSearch] = useState("")
  const [FilteredIngredients, setFilteredIngredients] = useState(ingredients)
  const [showFlyout, setshowFlyout] = useState(false)
  const [Response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await getResponse(Ingredients);
    console.log(response)
    setLoading(false)
    setResponse(response.choices[0].text)
    setshowFlyout(true)
  }

  const addIngredient = (ingredient) => {
    if(Ingredients.length<= 3)
        setIngredients(prev => [...prev, ingredient.ingredient]);
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
        <div className="w-full h-[10%] px-2 sm:px-10 flex justify-between items-center border-b-slate-900 border-solid border-b-[1px]">
            <div className="mx-2 text-xl font-bold text-white">
                <span>Recipe</span>
                <span className="text-violet-500">GPT</span>
            </div>
            <div className="w-[200px] sm:w-[300px] h-[50%] relative flex justify-center items-center">
                <input 
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search Ingredient...."
                className="w-full h-full px-5 text-white bg-[rgba(255,255,255,0.1)] rounded-xl"
                />
            </div>
        </div>
        <div className="w-full h-[15%] sm:h-[15%] px-2 sm:px-10 flex justify-between items-center">
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
                                <span key={item} className="text-white mx-2">
                                    {`${(item.length > 30)?item.substring(0,27)+'...':item}, `}
                                </span>
                            )
                        })
                    }
                    <span>]</span>
                </div>
            </div>
        </div>
        <div className="w-full h-[75%] sm:h-[60%] overflow-y-scroll">
            
            <div className="w-full h-fit px-2 sm:px-10 flex flex-wrap">
                {
                    (FilteredIngredients.length > 0)?
                        FilteredIngredients.map((ingredient)=>{
                            return (
                                <div 
                                    onClick={()=>{
                                        (Ingredients.length > 0 && Ingredients.includes(ingredient.ingredient))?
                                            setIngredients(prev => prev.filter((item)=>item !== ingredient.ingredient))
                                            :
                                            addIngredient(ingredient)} 
                                    }
                                    key={ingredient.ingredient} 
                                    className={` ${(Ingredients.includes(ingredient.ingredient))?'bg-violet-400':'bg-[#30004A]'} my-2 mx-2 px-4 py-2 w-full sm:w-fit max-h-fit text-white border-[1px] border-solid border-violet-900 rounded-lg cursor-pointer hover:bg-violet-500`}>
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
        <div className="w-full h-[10%] sm:h-[15%] flex justify-center items-center">
            <button onClick={handleSubmit} className="px-5 py-2 bg-violet-100 text-violet-900 shadow-xl border-[1px] border-solid border-violet-400">
                Get Recipes
            </button>
        </div>
        <Flyout showFlyout={showFlyout} setshowFlyout={setshowFlyout} Response={Response}/>
        {
            loading && 
            <div className="w-screen h-full fixed top-0 bg-[rgba(0,0,0,0.9)] z-50">
                <div class="w-full h-full flex flex-col items-center justify-center">
                    <div
                        class="text-violet-500 h-12 w-12 inline-block animate-spin rounded-full border-[6px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                        >
                    </div>
                    <div className="mt-10 px-5 py-2 text-lg font-bold tracking-wider rounded-xl bg-[rgba(0,0,0,0.9)] text-violet-500">
                        Talking to chef <span className="underline underline-offset-4">GPT</span>....
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Home