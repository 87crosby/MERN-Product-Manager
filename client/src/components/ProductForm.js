import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";

const ProductForm = () => {

    const history = useHistory(); //this is for redirecting when we submit the form

    //have a variable to store all the products i get back from the api in
    const [allProducts, setAllProducts] = useState([])

    //state variable to track if create is clicked
    const [createClicked, setCreateClicked] = useState(false)

    let [formInfo, setFormInfo] = useState({
        name: null,
        price: null,
        description: null
    })

    let [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => {
                console.log("******res is this-->", res)
                setAllProducts(res.data.results)
            })
            .catch(err => console.log("ERRORRRR-->", err))
    }, [createClicked])

    // Change handler to check if page has changed
    const changeHandler = (e) => {
        console.log("changin something")
        console.log(e.target.name, e.target.value)
        if (e.target.type == "checkbox") { //update state a little differently if the event target is the checkbox
            setFormInfo({
                ...formInfo,
                isVeteran: !formInfo.isVeteran
            })
        } else {//for all the other input types, update state as we normally do
            setFormInfo({
                ...formInfo,
                [e.target.name]: e.target.value
            })

        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submitted with this info-->", formInfo)
        axios.post("http://localhost:8000/api/products", formInfo)
            .then(res => {
                console.log("response after submitting post request-->", res)
                if (res.data.err) {
                    // If there are validation errors, show the errors
                    setValidationErrors(res.data.err.errors);

                } else {
                    // If there are no error in the submission then add info to wall
                    setCreateClicked(!createClicked)
                    history.push("/");
                }
            })
            .catch(err => console.log("errrrrr-->", err))
    }
    
    const deleteClickHandler = (e,idOfProduct)=>{
        console.log("Attempting to delete: ", idOfProduct)
        axios.delete(`http://localhost:8000/api/products/${idOfProduct}`)
            .then(res=>{
                console.log(res)
                setCreateClicked(!createClicked)
            })
            .catch(res=>{
                console.log("Error: ", res)
            })
    }


    return (
        <div>
            <h1>Product Manager</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Name:</label>
                    <input onChange={changeHandler} type="text" name="name" id="" className="form-control" />
                    <p className="text-danger">{validationErrors.name ? validationErrors.name.message : ""}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Price:</label>
                    <input onChange={changeHandler} type="number" name="price" id="" className="form-control" />
                    <p className="text-danger">{validationErrors.price ? validationErrors.price.message : ""}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Description:</label>
                    <input onChange={changeHandler} type="text" name="description" id="" className="form-control" />
                    <p className="text-danger">{validationErrors.description ? validationErrors.description.message : ""}</p>
                </div>
                <input className="btn btn-dark" type="submit" value="Create Product!" />

            </form>
            <hr className="mt-3 mb-3" />
            <div>
                <h3 className="display-5">All Products:</h3>
                {/* display all the products */}
                {allProducts.map((product, i) => {
                    return <div key={i} className="card">
                        <div className="card-body">
                            <h5 className="card-title"><Link to={`/product/${product._id}`}>{product.name}</Link>  <button onClick={(e)=>deleteClickHandler(e,product._id)} className="btn btn-danger">Delete</button></h5>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};


export default ProductForm;
