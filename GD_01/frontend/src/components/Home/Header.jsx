import React from "react";

function Header() {
  return (
    <div className="header flex justify-center items-center h-[88.5vh] text-center px-[30px] ">
      <div>
        <div  className="bg-dark bg-opacity-50 text-white w-[900px] p-5">
          <h1 className="text-[60px] ">DriveOnDemand</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
            nostrum voluptatum voluptates unde laborum, quidem ipsum illo vel,
            sint culpa accusamus velit fugiat recusandae aspernatur fuga quia.
            Natus, commodi aliquid.\
          </p>

          <button className="bg-medium px-5 py-3 text-white m-4">
            Explore now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
