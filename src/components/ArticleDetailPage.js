import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

export default function ArticleDetailPage() {
  const [articleData, setArticleData] = useState([]);
  // const [selectedArticle,setSelectedArticle] = useState(null)
  const { slug } = useParams();
  const loginData = useSelector((state)=>state.userData)
  // console.log("slug", slug);

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/articles/${slug}`)
      .then((response) => {
        console.log("response", response);
        console.log("data", response.data.article.body);
        const selectedData = response.data.article;
        setArticleData([selectedData]);
      });
  }, []);

  console.log("Selected Article:", articleData);

  return (
    <>
    <div className="container mx-auto">
      <div className="flex justify-between mt-4">
          <h2 className="font-bold text-2xl ml-8 items-center">Article Detail Page</h2>
          <div>
            <ProfileHeader data={loginData}/>
          </div>
        </div>
        </div>
      {articleData.map((data) => (
        <div
          className="border bg-gray-100 rounded-md p-6 m-6 cursor-pointer"
          key={data.slug}
        >
          <h2 className='font-extrabold text-white'>
            {data.title}
          </h2>
          <h2>
            {data.description}
          </h2>
          <h2>
            {data.body}
          </h2>
        </div>
      ))}
      {/* <textarea
          // value={comment}
          // onChange={handleCommentChange}
          className="m-6 resize-none w-full p-4"
          placeholder="Comment here..."
          rows={4}  */}
        {/* /> */}
        <button className="bg-blue-500  text-white p-3 rounded-md float-right">Comment</button>
    </>
  );
}
