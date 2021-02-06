import React from 'react';
import API from '../config';

const ShowImage=({item,url})=>(
    <div className='product-img'>
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} style={{height:'286px',width:'180px'}} className='mb-3' />
    </div>
);

export default ShowImage;