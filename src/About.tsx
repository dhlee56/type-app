import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';


const About = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const productId = 1
  return (
    <>
        <div>
        About 
        </div>
        <button
            onClick = {() => {
                navigate(`/product/${productId}`);
            }}
        >Go to product</button>
    </>
    
  )
}

export default About
