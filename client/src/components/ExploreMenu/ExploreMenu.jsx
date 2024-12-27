import React from 'react'
import './ExploreMenu.css'
import { category_list } from '../../assets/assets'
import { Link } from 'react-router-dom';

const ExploreMenu = (props) => {

    const { categoryText, setCategoryText } = props;

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Browse Jugaad Requests</h1>
            <p className='explore-menu-text'>Discover various categories to assist with.</p>
            <div className="explore-menu-list">
                {category_list.map((item, index) => (
                    <Link to={item.link_location} key={index}>
                        <div className="explore-menu-list-item" onClick={() => {
                            setCategoryText(prev => prev === item.menu_name ? 'All' : item.menu_name);
                        }}>
                            <img className={categoryText === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.title} />
                            <p>{item.menu_name}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <hr />
        </div>
    )
}

export default ExploreMenu