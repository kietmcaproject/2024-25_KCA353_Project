import React from "react";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Community.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function component() {
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/auth/user-details`,
                    {
                        method: "GET",
                        headers: {
                            authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setName(data.user.name);
            } catch (error) {
                console.error("Error in fetching: ", error);
            }
        };
        fetchdata();
    }, []);

    return (
        <div>
            <div className="container-1">
                <div className="line1">
                    {" "}
                    Welcome to the community, {name} !!{" "}
                </div>
                <div className="line2">
                    "Even small actions can make a big impact. By donating
                    surplus food, we keep moving forward towards a waste-free,
                    well-fed community."
                </div>
            </div>

            <div className="main-container">
                <div className="box-1 posts">
                    <h1 className="h1">Reducing Food Waste at home :-</h1>
                    <br />
                    Food waste is a significant issue worldwide, contributing to
                    environmental problems and food insecurity. However, each of
                    us can make a difference by adopting simple yet effective
                    strategies to reduce food waste right in our homes.
                    <br />
                    <br />
                    <ul>
                        <li>
                            Meal Planning: One of the most effective ways to
                            reduce food waste is by planning your meals. Before
                            heading to the grocery store, take inventory of what
                            you already have and plan your meals for the week
                            based on those ingredients. This helps prevent
                            overbuying and ensures that everything you purchase
                            has a purpose.
                        </li>
                        <br />
                        <li>
                            Proper Storage Techniques: Many foods spoil
                            prematurely due to improper storage. Learn the best
                            ways to store different types of produce, dairy, and
                            pantry items to extend their shelf life. For
                            example, storing herbs in a glass of water or
                            keeping bread in the freezer can prevent them from
                            going bad too soon.
                        </li>
                        <br />
                        <li>
                            Creative Use of Leftovers: Instead of letting
                            leftovers go to waste, get creative in the kitchen.
                            Turn yesterday's roasted vegetables into a delicious
                            frittata, use leftover rice to make fried rice with
                            added veggies and protein, or blend overripe fruits
                            into smoothies or sauces.
                        </li>
                        <br />
                        <li>
                            Composting: Not all food scraps need to end up in
                            the trash. Start a compost bin in your backyard or
                            use a countertop composting system to turn fruit and
                            vegetable scraps, coffee grounds, and eggshells into
                            nutrient-rich soil for your garden. Composting
                            reduces landfill waste and benefits the environment.
                        </li>
                        <br />
                        <li>
                            Donate Excess Food: If you find yourself with more
                            food than you can consume, consider donating the
                            excess to local food banks or shelters. Many
                            organizations welcome non-perishable items as well
                            as fresh produce, helping to reduce food insecurity
                            in your community while minimizing waste.
                        </li>
                        <br />
                    </ul>
                </div>
                <div className="box-2 posts">
                    <h1 className="h1">
                        Understanding Expiration Dates: How to Minimize Food
                        Waste :-
                    </h1>
                    <br />
                    Have you ever tossed out food simply because it reached its
                    expiration date? Understanding expiration dates and learning
                    how to assess food safety can significantly reduce food
                    waste in your home. Let's delve into this topic and discover
                    how you can minimize waste while ensuring food safety.
                    <br />
                    <br />
                    <ul>
                        <li>
                            Types of Expiration Dates:
                            <br />
                            Use By: This date is recommended by the manufacturer
                            for peak quality and freshness. It's best to consume
                            food before this date for the best flavor and
                            texture.
                            <br />
                            Sell By: This date is primarily for retailers,
                            indicating how long to display the product for sale.
                            It's not a safety date and doesn't necessarily mean
                            the food is bad after this date.
                            <br />
                            Best Before: Similar to Use By, this date suggests
                            the period of best quality, but the food is still
                            safe to consume after this date in most cases.
                        </li>
                        <br />
                        <li>
                            Assessing Food Safety:-
                            <br />
                            Smell and Appearance:Trust your senses. If food
                            looks or smells off, it's likely spoiled. Mud,
                            discoloration, and unusual odors are signs to
                            discard.
                            <br />
                            Texture:- Changes in texture, such as sliminess in
                            meats or grains, indicate spoilage.
                            <br />
                            Taste:- If food tastes unusual or bitter, it's safer
                            to discard it.
                        </li>
                        <br />
                        <li>
                            Tips to Minimize Waste:-
                            <br />
                            Understand Shelf Life: Some foods,like canned goods,
                            have a long shelf life beyond the expiration date if
                            stored properly. Use common sense and check for
                            signs of spoilage.
                            <br />
                            Freeze Before Expiry: If you can't consume certain
                            items before they expire, freeze them. Many foods,
                            including bread, meats, and fruits, freeze well and
                            can be used later.
                            <br />
                            Use By Sensory Indicators: Learn to rely on your
                            senses rather than just the date. For example, sour
                            milk is obviously bad even if it'swithin the "Use
                            By" date.
                            <br />
                            Rotate Stock: When shopping, use the "first in,
                            first out" rule. Place newer items at the back of
                            your pantry or fridge and older ones at the front
                            for easier consumption.
                        </li>
                        <br />
                        <li>
                            Reducing Overbuying:
                            <br />
                            Plan meals and shopping lists to buy only what you
                            need for a specific period.
                            <br />
                            Avoid impulse buys and bulk purchases of perishable
                            items unless you have plans to use them efficiently.
                        </li>
                    </ul>
                    <br />
                    By understanding expiration dates and employing these
                    strategies, you can minimize food waste, save money, and
                    ensure the safety of the food you consume.
                </div>
                <div className="box-3 posts">
                    <h1 className="h1">
                        Building a Sustainable Food System: How Everyone Can
                        Play a Part :-{" "}
                    </h1>
                    <br />
                    Creating a sustainable food system is crucial for the
                    well-being of our planet and future generations. While the
                    task may seem daunting, every individual can contribute to
                    this cause in meaningful ways. Let's explore how you can
                    play a part in building a more sustainable food system:-
                    <br />
                    <br />
                    <ul>
                        <li>
                            Support Local Farmers:
                            <br />- Purchase locally grown produce and products
                            whenever possible. This reduces carbon emissions
                            from transportation and supports your local economy.
                            <br />- Visit farmers' markets or join
                            community-supported agriculture (CSA) programs to
                            access fresh, seasonal produce directly from
                            farmers.
                        </li>
                        <br />
                        <li>
                            Reduce Food Waste:*
                            <br />- Plan meals, store food properly, and use
                            leftovers creatively to minimize waste.
                            <br />- Compost food scraps to reduce methane
                            emissions in landfills and create nutrient-rich soil
                            for gardens.
                        </li>

                        <br />
                        <li>
                            Choose Sustainable Packaging:*
                            <br />- Opt for products with minimal packaging or
                            packaging made from recyclable or biodegradable
                            materials.
                            <br />- Bring reusable bags and containers when
                            shopping to reduce plastic waste.
                        </li>

                        <br />
                        <li>
                            Embrace Plant-Based Meals:*
                            <br />- Incorporate more plant-based meals into your
                            diet. Plant-based diets have a lower environmental
                            impact compared to diets high in animal products.
                            <br />- Choose sustainably sourced seafood and meat
                            products when consuming animal-based foods.
                        </li>

                        <br />
                        <li>
                            Grow Your Own Food:*
                            <br />- Start a home garden, even if it's small.
                            Growing your own herbs, fruits, and vegetables can
                            reduce your reliance on store-bought produce and
                            promote a connection to nature.
                        </li>
                        <br />
                        <li>
                            Support Sustainable Food Initiatives:*
                            <br />- Get involved in or support organizations and
                            initiatives that promote sustainable food practices,
                            such as food rescue programs, urban farming
                            projects, and community gardens.
                            <br />- Advocate for policies that prioritize
                            sustainability in agriculture and food production.
                        </li>
                        <br />
                        <li>
                            Educate Yourself and Others:*
                            <br />- Stay informed about food sustainability
                            issues and share your knowledge with friends,
                            family, and community members.
                            <br />- Encourage others to make sustainable food
                            choices and join efforts to create a more
                            sustainable food system.
                        </li>
                        <br />
                        <li>
                            Reduce Food Miles:*
                            <br />- Choose foods that are locally produced or
                            sourced regionally to reduce the carbon footprint
                            associated with transportation.
                            <br />- Consider the environmental impact of
                            imported foods and opt for local alternatives when
                            feasible.
                        </li>
                    </ul>
                    <br />
                    By taking these steps and encouraging others to do the same,
                    we can collectively work towards a more sustainable food
                    system that supports environmental conservation, promotes
                    food security, and fosters healthier communities.
                </div>
            </div>
        </div>
    );
}
