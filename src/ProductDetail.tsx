import {useParams} from 'react-router-dom'
export default function ProductDetail() {
	const params = useParams();
	const productId = params.id;
    return  <div> Product Detail {productId}</div> 
  }