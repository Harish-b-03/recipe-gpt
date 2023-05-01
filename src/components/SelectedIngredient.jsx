import { useState } from "react";

const Label = () => {
    return (
        <div className="w-full sm:w-max text-center sm:mr-4 sm:ml-2 mt-5 mb-3 sm:my-0 font-bold text-white sm:underline underline-offset-4">
            Ingredients Selected:
        </div>
    );
};

const SelectedIngredientCard = ({ item, setSelectedIngredients }) => {
    const [showRemoveButton, setShowRemoveButton] = useState(false);

    return (
        <div
            key={item}
            onMouseEnter={() => {
                setShowRemoveButton(true);
            }}
            onMouseLeave={() => {
                setShowRemoveButton(false);
            }}
            className="w-5/6 md:w-fit relative text-gray-200 mx-1 sm:mx-2 mb-2 bg-gray-900 py-1 px-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:text-white"
        >
            {`${item.length > 30 ? item.substring(0, 27) + "..." : item}`}
            {showRemoveButton && (
                <div
                    onClick={() =>
                        setSelectedIngredients((prev) =>
                            prev.filter((i) => i !== item)
                        )
                    }
                    className="absolute top-0 right-0 h-[12px] w-[12px] -translate-y-1/2 translate-x-1/2 hidden md:flex justify-center items-center text-xs bg-gray-900 rounded-full transition-all duration-200 hover:bg-red-500"
                >
                    <span className="pb-1">-</span>
                </div>
            )}
            {
                <div
                    onClick={() =>
                        setSelectedIngredients((prev) =>
                            prev.filter((i) => i !== item)
                        )
                    }
                    className="absolute top-0 right-0 h-full w-6 flex md:hidden justify-center items-center text-xs"
                >
                    x
                </div>
            }
        </div>
    );
};

const SelectedIngredient = ({ ingredients, setSelectedIngredients }) => {
    return (
        <div className="w-full md:h-[15%] px-2 sm:px-10 flex justify-between items-center overflow-y-auto">
            <div className="w-full flex flex-col sm:flex-row justify-start items-center">
                <div className="">
                    <Label />
                </div>
                {ingredients.length === 0 ? (
                    <div className="w-5/6 text-center md:text-start text-sm sm:mr-4 ml-2 my-1 sm:my-0 font-bold text-gray-500 py-1 px-3">
                        No Ingredients Selected
                    </div>
                ) : (
                    <div className="w-full md:w-fit flex flex-col md:flex-row justify-center items-center">
                        {ingredients.map((item, index) => {
                            return (
                                <SelectedIngredientCard
                                    key={index}
                                    item={item}
                                    setSelectedIngredients={
                                        setSelectedIngredients
                                    }
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectedIngredient;
