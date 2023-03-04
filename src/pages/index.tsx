import Head from 'next/head'
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../components/Atomic/Loading";
import Flyout from "../components/Flyout";
import Footer from "../components/Footer";
import SelectedIngredient from "../components/SelectedIngredient";
import TopBar from "../components/TopBar";
import { ingredients } from "../ingredients";

type ingredientType = {
  "ingredient": string,
  "ingredientId": number,
}

type responseType = {
  any: Array<{
    text: string
  }>
}

const Home = () => {
  
  const [Ingredients, setIngredients] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [FilteredIngredients, setFilteredIngredients] = useState<ingredientType[]>(ingredients)
  const [showFlyout, setshowFlyout] = useState(false)
  const [Response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    if(Ingredients.length > 0){
        const response = await fetch('api/getResponse',{
          method: 'POST',
          headers: {"Content-type": "application/json;charset=UTF-8"},
          body: JSON.stringify(Ingredients)
        });
        const data = await response.json()
        console.log(data)
        setResponse(data.choices[0].text)
        setshowFlyout(true)
    } else{
        toast.error('Please select atleast 1 ingredient',{ 
            icon: '😊',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }
    setLoading(false)
  }

  const addIngredient = (ingredient:ingredientType) => {
    if(Ingredients.length<= 3)
        setIngredients(prev => [...prev, ingredient['ingredient']]);
    else
        toast.error('Select not more than 4 ingredients',{ 
            icon: '😊',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
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
    <>
      <Head>
        <title>recipe - GPT</title>
        <meta name="description" content="RecipeGPT is a recipe recommendation app built on OpenAI GPT-3 API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen p-0 m-0 flex flex-col justify-between items-center bg-black">
          
          <TopBar setSearch={setSearch}/>
          
          <SelectedIngredient Ingredients={Ingredients}/>
          
          <div className="w-full h-[60%] overflow-y-scroll">
              
              <div className="w-full h-fit px-2 sm:px-10 flex flex-wrap">
                  {
                    (FilteredIngredients.length > 0)?
                    FilteredIngredients.map((ingredient:ingredientType)=>{
                              return (
                                <div 
                                onClick={()=>{
                                  (Ingredients.length > 0 && Ingredients.includes(ingredient['ingredient']))?
                                  setIngredients(prev => prev.filter((item)=>item !== ingredient['ingredient']))
                                  :
                                  addIngredient(ingredient)} 
                                }
                                      key={ingredient.ingredient} 
                                      className={` ${(Ingredients.includes(ingredient["ingredient"]))?'bg-violet-400':'bg-[#30004A]'} my-2 mx-2 px-4 py-2 w-full sm:w-fit max-h-fit text-white border-[1px] border-solid border-violet-900 rounded-lg cursor-pointer hover:bg-violet-500`}>
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
          
          <Toaster position="top-center" gutter={8}/>

          <Footer handleSubmit={handleSubmit} />

          <Flyout showFlyout={showFlyout} setshowFlyout={setshowFlyout} Response={Response}/>
          
          { loading && <Loading/> }

      </main>
    </>
  )
}

export default Home