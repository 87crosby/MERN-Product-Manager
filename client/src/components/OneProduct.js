import React, {useEffect} from 'react';
import {useState} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

const OneProduct = () =>{
    const { idParam } = useParams();
    const [productInfo, setProductInfo] = useState({});
    const history = useHistory();
    console.log(idParam);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${idParam}`)
        .then(res=>{
            console.log(res)
            setProductInfo(res.data.results)
        })
        .catch(err=>{
            console.log("Error:", err)
        })
    },[idParam])

    const deleteClickHandler = ()=>{
        console.log("Attempting to delete: ", productInfo._id)
        axios.delete(`http://localhost:8000/api/products/${productInfo._id}`)
            .then(res=>{
                console.log(res)
                history.push("/")
            })
            .catch(res=>{
                console.log("Error: ", res)
            })
    }

    return(
        <div className="mt-5">
            <h6><strong>Name: {productInfo.name}</strong></h6>
            <p>Price: $ {productInfo.price}</p>
            <p>Description: {productInfo.description}</p>
            <p><Link className="btn btn-info" to={`/product/edit/${productInfo._id}`}>Edit</Link>  <button onClick={deleteClickHandler} className="btn btn-danger">Delete product</button></p>
        </div>
    )
}

export default OneProduct;