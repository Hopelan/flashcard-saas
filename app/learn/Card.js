import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function Card({ flashcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`relative  bg-muted rounded-md p-4 shadow-sm
    transition ease-in-out duration-500 transform-style-3d backface-hidden 
    ${flip && "transform rotate-y-180"}`}
      onClick={() => setFlip(!flip)}
    >
      <div
        className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] 
        backface-hidden `}
      >
        {" "}
        <div>
          <h2>{flashcard.front}</h2>
        </div>
      </div>

      <div className="backface-hidden  absolute top-1/2 left-1/2  transform rotate-y-180">
        {flashcard.back}
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={() => setFlip(!flip)} variant="ghost" size="sm">
          <EyeIcon className="w-5 h-5" />
          <span className="sr-only">View Answer</span>
        </Button>
      </div>
    </div>
  );
}

export default Card;

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
