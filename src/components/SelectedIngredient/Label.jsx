import React from "react";

const Label = ({ title }) => {
    return (
        <div className="w-full sm:w-max text-center sm:mr-4 sm:ml-2 mt-5 mb-3 sm:my-0 font-bold text-white sm:underline underline-offset-4">
            {title}
        </div>
    );
};

export default Label;
