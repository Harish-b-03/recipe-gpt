import { useEffect, useState } from "react";
import getResponse from "./api/getResponse";
import Loading from "./components/Atomic/Loading";
import Flyout from "./components/Flyout";
import Footer from "./components/Footer";
import SelectedIngredient from "./components/SelectedIngredient";
import TopBar from "./components/TopBar";
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
    if(Ingredients.length > 0){
        const response = await getResponse(Ingredients);
        console.log(response)
        setResponse(response.choices[0].text)
        setshowFlyout(true)
    }
    setLoading(false)
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
    <div className="w-full h-screen p-0 m-0 flex flex-col justify-between sm:justify-center items-center bg-black">
        
        <TopBar setSearch={setSearch}/>
        
        <SelectedIngredient Ingredients={Ingredients}/>
        
        <div className="w-full h-[60%] overflow-y-scroll">
            
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

        <Footer handleSubmit={handleSubmit} />

        <Flyout showFlyout={showFlyout} setshowFlyout={setshowFlyout} Response={Response}/>
        
        { loading && <Loading/> }

    </div>
  )
}

export default Home