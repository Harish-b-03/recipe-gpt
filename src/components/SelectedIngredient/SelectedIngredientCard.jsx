import { useState } from "react";

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

export default SelectedIngredientCard;