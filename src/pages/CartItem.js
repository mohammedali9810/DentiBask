import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { removeItem , decrementQuantity, incrementQuantity} from '../store/slices/cartslice';

function CartItem({ id, image, title, price, quantity = 0 }) {
  const dispatch = useDispatch();

  return (
    <div className="row d-flex  border border-3 m-3 p-4">
      <div className='col-4 justify-content-start'>
      <Card.Img variant="top" src={image} alt="item" className="" />
      </div>
      
      <div className='col-4 col-xs-12 justify-center-start'>

        <Card.Title className="">{title}</Card.Title>
        <Card.Text className="">
          <small>$</small>
          <strong>{price}</strong>
        </Card.Text>
      </div>
      <div className='col-4 col-xs-12  d-flex justify-center-start  align-items-center'>
          <Button variant="danger"  onClick={() => dispatch(decrementQuantity(id))}>-</Button>
          <span className='mx-2'>{quantity}</span>
          <Button variant="success" onClick={() => dispatch(incrementQuantity(id))}>+</Button>
        <Button variant="danger" className=""  onClick={() => dispatch(removeItem(id))}
        >remove
          
        </Button>
        </div>

    </div>
  );
}

export default CartItem;
