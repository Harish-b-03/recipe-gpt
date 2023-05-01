import Head from "next/head";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../components/Atomic/Loading";
import Flyout from "../components/Flyout";
import Footer from "../components/Footer";
import SelectedIngredient from "../components/SelectedIngredient";
import TopBar from "../components/TopBar";
import { ingredients } from "../ingredients";
import SearchBox from "../components/SearchBox";
import OpenAIKeyPopup from "../components/InputPopup";

type IngredientType = {
    ingredient: string;
    ingredientId: number;
};

type responseType = {
    any: Array<{
        text: string;
    }>;
};

const Home = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        []
    );
    const [search, setSearch] = useState("");
    const [filteredIngredients, setFilteredIngredients] =
        useState<IngredientType[]>(ingredients);
    const [showFlyout, setShowFlyout] = useState(false);
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [showKeyInput, setShowKeyInput] = useState(false);

    const callGetResponse = async () => {
        setLoading(true);
        console.log(apiKey);
        if (selectedIngredients.length > 0) {
            await fetch("api/getResponse", {
                method: "POST",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify({
                    key: apiKey,
                    data: selectedIngredients,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setResponse(data.choices[0].text);
                    setShowFlyout(true);
                    setLoading(false);
                })
                .catch((err) => {
                    toast.error("An error occured. Please look at the console");
                    toast.error("Please give a valid API Key");
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast.error("Please select atleast 1 ingredient", {
                icon: "😊",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }
        setLoading(false);
        setShowKeyInput(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setShowKeyInput(true);
    };

    const addIngredient = (ingredient: IngredientType) => {
        if (selectedIngredients.length <= 3) {
            if (selectedIngredients.indexOf(ingredient.ingredient) < 0)
                setSelectedIngredients((prev) => [
                    ...prev,
                    ingredient["ingredient"],
                ]);
        } else
            toast.error("Select not more than 4 ingredients", {
                icon: "😊",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
    };

    useEffect(() => {
        if (search === "") setFilteredIngredients([]);
        else {
            const exactResults = ingredients.filter((item) => {
                var temp = item.ingredient.toLowerCase();
                return temp.startsWith(search.toLowerCase());
            });

            const relevantResults = ingredients.filter((item) => {
                var temp = item.ingredient.toLowerCase();
                return temp.includes(search.toLowerCase());
            });
            // To get the exact results first and followed by relevant results
            setFilteredIngredients([...exactResults, ...relevantResults]);
        }
    }, [search]);

    const onChangeInput = (e: any) => {
        setSearch(e.target.value);
    };

    const clearSearch = () => {
        setSearch("");
    };

    const closeFlyout = () => {
        setShowFlyout(false);
    };

    const hideKeyInput = () => {
        setShowKeyInput(false);
    };

    return (
        <>
            <Head>
                <title>recipe - GPT</title>
                <meta
                    name="description"
                    content="RecipeGPT is a recipe recommendation app built on OpenAI GPT-3 API"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="w-full h-screen p-0 m-0 flex flex-col justify-between items-center bg-black">
                <TopBar />

                <div className="pt-[70px] w-full h-full">
                    <SelectedIngredient
                        ingredients={selectedIngredients}
                        setSelectedIngredients={setSelectedIngredients}
                    />

                    <div className="w-full h-[60%] md:h-[70%] md:overflow-y-scroll flex justify-center items-center">
                        <div className="relative">
                            <SearchBox
                                clearSearch={clearSearch}
                                onChangeInput={onChangeInput}
                                loading={loading}
                                search={search}
                                filteredIngredients={filteredIngredients}
                                addIngredient={addIngredient}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
                <Toaster position="bottom-center" gutter={8} />

                <Footer handleSubmit={handleSubmit} />

                <Flyout
                    showFlyout={showFlyout}
                    closeFlyout={closeFlyout}
                    response={response}
                />

                {showKeyInput && (
                    <OpenAIKeyPopup
                        hideKeyInput={hideKeyInput}
                        callGetResponse={callGetResponse}
                        onChange={(e: any) => {
                            setApiKey(e.target.value);
                        }}
                    />
                )}

                {loading && <Loading />}
            </main>
        </>
    );
};

export default Home;
