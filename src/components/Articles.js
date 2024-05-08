import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Loader from "./Loader";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
// import Heart from "react-animated-heart";
import HeartComponent from "./HeartComponent";
import ProfileHeader from "./ProfileHeader";

export default function Articles() {
  const [articlesData, setArticlesData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  // const loginData = useSelector((state) => state.userData);
  const loginData = JSON.parse(localStorage.getItem('loginData'))
  // localStorage.setItem('loginData', JSON.stringify(loginData));

  const handleInfiniteScroll = () => {
    // console.log("scrollHeight",document.documentElement.scrollHeight)
    // console.log("innerHeight",window.innerHeight)
    // console.log("scrollTop",document.documentElement.scrollTop)
    // console.log("offset", offset);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setOffset((prev) => prev + 5);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('offset',offset);
  // console.log(offset)
  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/articles?offset=${offset}&limit=5`)
      .then((response) => {
        // console.log(response.data)
        const newData = response.data.articles;
        setArticlesData((prevData) => [...prevData, ...newData]);
        setLoading(false);
      });
  }, [offset]);
  console.log("articlesData", articlesData);

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/articles?limit=5`)
      .then((response) => {
        // console.log(response.data)
        const newData = response.data.articles;
        setArticlesData(newData);
        setLoading(false);
      });
      // localStorage.setItem('loginData',loginData)
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  // useEffect(() => {
  //   if (loginData) {
  //     localStorage.setItem('loginData', JSON.stringify(loginData));
  //   }
  // }, [loginData]);

  const dateFormat = (timestamp) => {
    const date = new Date(timestamp);
  
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit"
    };
  
    const formattedDate = date.toLocaleDateString("en-US", options);
    
    return formattedDate;
  };

  const handleFavouritesCount = (favoritesCount)=>{
    console.log("fav count",favoritesCount)
  }

  return (
    <>
      <div className="container mx-auto ">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl ml-8 items-center mt-4 text-green-500">
            Global Feed
          </h2>
          <div>
            <ProfileHeader data={loginData} />
          </div>
        </div>
        <hr />
        {articlesData.map((article) => (
          <>
            <div
              key={article.slug}
              className=" m-6 px-6"
              // onClick={()=>handleArticleDetail(article.slug)}
            >
              {/* <div className="flex justify-between h-6">
                <div>
                  {article.author.username} {dateFormat(article.createdAt)}
                </div>
                <div>
                  <HeartComponent value={article} />
                  <span>{article.favoritesCount}</span>
                </div>
              </div> */}
              <div className="flex justify-between items-center">
                <div className="flex flex-row">
                  <img
                    class="w-10 h-10 rounded-full"
                    src={article.author.image}
                    alt="Rounded avatar"
                  />
                  <br />
                  <div className="flex flex-col text-green-500 ml-2 ">
                    <span className="font-medium text-lg">
                      {article.author.username}
                    </span>
                    <span className="font-normal text-gray-400 text-sm">
                      {" "}
                      {dateFormat(article.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 border p-2 rounded-md" onClick={()=>handleFavouritesCount(article.favouritesCount)}>
                  <HeartComponent value={article}/>
                  <span className="text-base">{article.favoritesCount}</span>
                </div>
              </div>

              <Link to={`/article/${article.slug}`}>
                <h2 className="font-bold text-2xl cursor-pointer">
                  {article.title}
                </h2>
              </Link>
              <h2 className="text-gray-400">{article.description}</h2>
              <h2 className="text-gray-400">
                {article.body.substring(0, 100)}
              </h2>
            </div>
            <div className="text-right mb-4">
              {article.tagList.map((tag) => (
                <span className="px-2 py-1 text-gray-400 border rounded-2xl m-2">{tag}</span>
              ))}
            </div>
            <hr />
          </>
        ))}

        {loading && (
          <div className="flex justify-center mt-2">
            <Oval
              visible={true}
              height="30"
              width="40"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
    </>
  );
}
