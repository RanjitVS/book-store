import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories,getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox';
import {prices} from './fixedPrices';
import RadioBox from './RadioBox';
import Search from './Search';

const Shop = () => {
    const[myFilters,setMyFilters]=useState({
        filters:{category:[],price:[]}
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])
    const [size,setSize]=useState(0)
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init();
        loadFilterResults(skip,limit,myFilters.filters);
    }, [])

    const handleFilters=(filters,filterBy)=>{
        //console.log(filters,filterBy);
        const  newFilters={...myFilters}
        newFilters.filters[filterBy]=filters
        if(filterBy=='price'){
            let priceValues=handlePrice(filters)
            newFilters.filters[filterBy]=priceValues
        }
        loadFilterResults(myFilters.filters)
        setMyFilters(newFilters)
    }
    const handlePrice=value=>{
        const data=prices
        let array=[]
        for(let key in data){
            if(data[key]._id===parseInt(value)){
                array=data[key].array;
            }
        }
        return array
    }
    const loadFilterResults=(newFilters)=>{
        //console.log(newFilters)

        getFilteredProducts(skip,limit,newFilters).then(obj=>{
            console.log(obj)
            if(obj.error){
                setError(obj.error)
            }
            else{
                setFilteredResults(obj.data)
                setSize(obj.size)
                setSkip(0)
            }
        })
    }

    const loadMore=()=>{
        let toSkip=skip+limit;

        //console.log(newFilters)

        getFilteredProducts(toSkip,limit,myFilters.filters).then(obj=>{
            console.log(obj)
            if(obj.error){
                setError(obj.error)
            }
            else{
                setFilteredResults([...filteredResults,...obj.data])
                setSize(obj.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton=()=>{
        return(
            size>0&&size>=limit&&(
                <button className='btn btn-warning' onClick={loadMore}>Load More</button>
            )
        )
    }

    return (
        <Layout  className='container-fluid'>
              <Search />
            <div className='row'>
               
            <div className='col-8'>
                    <h2 className='mb-4'> Products</h2>
                    <hr />
                    <div className='row'>
                        {filteredResults.map((product,i)=>(
                                <div key={i} className='col-4 mb-3'>
                                    <Card product={product} />
                                </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>

                <div className='col-4'>
                    <h4>Filter by categories</h4>
                    <hr />
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters=>handleFilters(filters,'category')} />
                    </ul>
                    <h4>Filter by price range</h4>
                    <hr />
                    <div>
                        <RadioBox prices={prices} handleFilters={filters=>handleFilters(filters,'price')} />
                    </div>
                </div>
               
            </div>
        </Layout>
    )
}
export default Shop;