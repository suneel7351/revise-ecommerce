import { Avatar, Rating } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
function ReviewCard({ review }) {
  const { user } = useSelector((state) => state.user);
  const commentLines = review?.comment.split('\n');
  return (
    <>
      {review && (
        <div
          className="bg-white border border-gray-100 shadow-sm 
  p-4 flex flex-col items-center justify-center gap-3 max-w-[400px] min-w-[270px] h-[250px]"
        >
          <div className="">
            {commentLines.map((line, index) => (
              <p key={index} style={{ padding: `0 ${2 * index}rem`, textAlign: "center" }}>
                {line}
              </p>
            ))}
          </div>
          <Rating
            value={review.rating}
            readOnly
            precision={0.5}
            style={{ color: "#fe5f1e" }}
            contentEditable={false}
          />
          <div className="border border-slate-200 shadow-md p-1 rounded-full">
            {" "}
            <Avatar
              src={user && user.avatar && user.avatar.url}
              style={{ width: "70px", height: "70px" }}
              alt={review.name}
            />
          </div>
          <span className="text-xl">{review.name}</span>

        </div>
      )}





    </>
  );
}

export default ReviewCard;
