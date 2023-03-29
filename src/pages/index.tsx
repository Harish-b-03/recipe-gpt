import Head from 'next/head'
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../components/Atomic/Loading";
import Flyout from "../components/Flyout";
import Footer from "../components/Footer";
import SelectedIngredient from "../components/SelectedIngredient";
import TopBar from "../components/TopBar";
import { ingredients } from "../ingredients";
import InputField from "../components/InputField"

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
  
  const [SelectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [FilteredIngredients, setFilteredIngredients] = useState<ingredientType[]>(ingredients)
  const [showFlyout, setshowFlyout] = useState(false)
  const [Response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    if(SelectedIngredients.length > 0){
        const response = await fetch('api/getResponse',{
          method: 'POST',
          headers: {"Content-type": "application/json;charset=UTF-8"},
          body: JSON.stringify(SelectedIngredients)
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
    if(SelectedIngredients.length<= 3)
        setSelectedIngredients(prev => [...prev, ingredient['ingredient']]);
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
        setFilteredIngredients([]);
    else{
      const exactResults = ingredients.filter((item)=>{
          var temp = item.ingredient.toLowerCase();
          return temp.startsWith(search.toLowerCase());
      })

      const relevantResults = ingredients.filter((item)=>{
          var temp = item.ingredient.toLowerCase();
          return temp.includes(search.toLowerCase());
      })
      // To get the exact results first and followed by relevant results
      setFilteredIngredients([...exactResults, ...relevantResults])
    }
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
          
          <TopBar/>
          
          <div className="pt-[70px] w-full h-full">
            <SelectedIngredient Ingredients={SelectedIngredients}/>
            
            <div className="w-full h-[70%] overflow-y-scroll flex justify-center items-center">
                <div className="relative">
                  <InputField setSearch={setSearch} loading={loading} search={search} FilteredIngredients={FilteredIngredients} addIngredient={addIngredient} handleSubmit={handleSubmit}/>
                </div>
            </div>  
          </div>
          <Toaster position="top-center" gutter={8}/>

          {/* <Footer handleSubmit={handleSubmit} /> */}

          <Flyout showFlyout={showFlyout} setshowFlyout={setshowFlyout} Response={Response}/>
          
          { loading && <Loading/> }

      </main>
    </>
  )
}

export default Home