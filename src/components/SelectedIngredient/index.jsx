import Label from "./Label";
import SelectedIngredientCard from "./SelectedIngredientCard";

const SelectedIngredient = ({ ingredients, setSelectedIngredients }) => {
    return (
        <div className="w-full md:h-[15%] px-2 sm:px-10 flex justify-between items-center overflow-y-auto">
            <div className="w-full flex flex-col sm:flex-row justify-start items-center">
                <div className="">
                    <Label title="Ingredients Selected:" />
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
