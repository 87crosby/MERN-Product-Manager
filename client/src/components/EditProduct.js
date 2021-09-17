import React, {useEffect} from 'react';
import {useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const EditProduct = () =>{

    const { idParam } = useParams();
    const [productInfo, setproductInfo] = useState({});
    const history = useHistory(); //this is for redirecting when we submit the form
    let [validationErrors, setValidationErrors] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${idParam}`)
        .then(res=>{
            console.log(res)
            setproductInfo(res.data.results)
        })
        .catch(err=>{
            console.log("Error:", err)
        })
    },[idParam])

    const changeHandler = (e)=>{
        console.log("changin something")
        console.log(e.target.name, e.target.value)
        if(e.target.type == "checkbox"){ //update state a little differently if the event target is the checkbox
            setproductInfo({
                ...productInfo,
                isVeteran: !productInfo.isVeteran
            })
        } else{//for all the other input types, update state as we normally do
            setproductInfo({ 
                ...productInfo,
                [e.target.name]:e.target.value
            })

        }
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${idParam}`, productInfo)
            .then(res=>{
                console.log("response after submitting post request-->", res)
                if (res.data.err) {
                    // If there are validation errors, show the errors
                    setValidationErrors(res.data.err.errors);

                } else {
                    // If there are no error in the submission then add info to wall
                    history.push("/");
                }
            })
            .catch(err=>console.log("Error:", err))

    }
    
    return (
        <div>
            <h3>Edit a product below</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Name:</label>
                    <input onChange={changeHandler} type="text" name="name" id="" className="form-control" value={productInfo.name} />
                    <p className="text-danger">{validationErrors.name ? validationErrors.name.message : ""}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Price:</label>
                    <input onChange={changeHandler} type="number" name="price" id="" className="form-control" value={productInfo.price} />
                    <p className="text-danger">{validationErrors.price ? validationErrors.price.message : ""}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Description:</label>
                    <input onChange={changeHandler} type="text" name="description" id="" className="form-control" value={productInfo.description} />
                    <p className="text-danger">{validationErrors.description ? validationErrors.description.message : ""}</p>
                </div>
                <input className="btn btn-dark" type="submit" value="Edit Product!" />

            </form>
        </div>
    );

}

export default EditProduct