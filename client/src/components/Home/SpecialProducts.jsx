import SpecialProductItems from "./SpecialProductItems";

function SpecialProducts({ product }) {




    return (
        <div className="container">
            <div className="flex flex-wrap gap-4">
                {
                    product?.map((item, index) => {
                        return <SpecialProductItems product={item} key={index + "6"} />
                    })
                }
            </div>
        </div>
    );
}

export default SpecialProducts;
