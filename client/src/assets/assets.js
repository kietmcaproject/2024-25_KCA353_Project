import logo from './logo.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import cross_icon from './cross_icon.png'
import profile_icon from './profile_icon.png'
import logout_icon from './logout_icon.png'
import logo_white from './logo_white.png'
import why_us_bg from './why-us-bg.jpg'
import facebook_icon from './facebook_icon.png'
import linkedin_icon from './linkedin_icon.png'
import twitter_icon from './twitter_icon.png'

const assets = {
    logo,
    add_icon_green,
    add_icon_white,
    cross_icon,
    profile_icon,
    logout_icon,
    logo_white,
    why_us_bg,
    facebook_icon,
    linkedin_icon,
    twitter_icon
}

export const categoryName = {
    'all': 'All',
    'clothes': 'Clothes',
    'books': 'Books',
    'daily-use': 'Daily Use',
    'projects': 'Projects',
    'car': 'Car',
    'bike': 'Bike',
    'pg-rooms': 'PG Rooms'
};

export const calendarMonth = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    return months[month];
}

export const hour = (hour) => {
    if (hour > 12) {
        return hour - 12;
    } else {
        return hour;
    }
}

export const category_list = [
    {
        menu_name: "All",
        menu_image: menu_1,
        link_location: '/'
    },
    {
        menu_name: "Clothes",
        menu_image: menu_2,
        link_location: '/category/clothes'
    },
    {
        menu_name: "Books",
        menu_image: menu_3,
        link_location: '/category/books'
    },
    {
        menu_name: "Essentials",
        menu_image: menu_4,
        link_location: '/category/daily-use'
    },
    {
        menu_name: "Projects",
        menu_image: menu_5,
        link_location: '/category/projects'
    },
    {
        menu_name: "Car",
        menu_image: menu_6,
        link_location: '/category/car'
    },
    {
        menu_name: "Bike",
        menu_image: menu_7,
        link_location: '/category/bike'
    },
    {
        menu_name: "PG Rooms",
        menu_image: menu_8,
        link_location: '/category/pg-rooms'
    }
]

export const CategoryURLList = [
    '/',
    '/category/clothes',
    '/category/books',
    '/category/daily-use',
    '/category/projects',
    '/category/car',
    '/category/bike',
    '/category/pg-rooms',
    '/short',
    '/jugaad-req',
    '/about',
    "/addRequest",
    "/profile",
    "/chat",
    "/why-us",
    "/signup",
    "/login",
    "/logout"
];

export default assets;