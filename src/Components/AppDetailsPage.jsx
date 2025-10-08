import { useParams, useLoaderData } from "react-router-dom";
import starIcon from "../assets/icon-ratings.png";
import reviewIcon from "../assets/icon-review.png";
import downloadIcon from "../assets/icon-downloads.png";
import Container from "./Container";

const formatNumber = (num) => {
  if (num >= 1000000)
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return num;
};

const processRatings = (ratings) => {
  return ratings.sort((a, b) => {
    const starA = parseInt(a.name.split(" ")[0]);
    const starB = parseInt(b.name.split(" ")[0]);
    return starB - starA;
  });
};

const calculateBarWidth = (count, maxCount) => {
  if (maxCount === 0) return "0%";
  return `${(count / maxCount) * 100}%`;
};

const AppDetailsPage = () => {
  const loaderData = useLoaderData();
  const allAppsData = Array.isArray(loaderData) ? loaderData : [];

  const { id } = useParams();

  const app = allAppsData.find((app) => app.id === parseInt(id));

  if (!app) {
    return (
      <div className="text-center py-20 text-xl font-bold">
        Loading app data... or App Not Found!
      </div>
    );
  }

  const processedRatings = processRatings(app.ratings);
  const maxRatingCount = Math.max(...processedRatings.map((r) => r.count));
  const totalReviews = app.reviews;

  return (
    <div className="bg-[#F5F5F5] w-screen relative left-1/2 -translate-x-1/2">
      <Container>
        <div className="mx-auto p-4 md:p-8 max-w-screen-2xl">
          <header className="flex items-start gap-6 border-b pb-8 mb-8">
            <img
              src={app.image}
              alt={app.title}
              className="w-full h-full sm:w-32 sm:h-32 object-contain rounded-2xl p-4 bg-gray-100"
            />

            <div className="flex flex-col gap-2 w-full">
              <div className="border-b">
                <h1 className="text-3xl font-bold text-gray-900 leading-snug">
                  {app.title}
                </h1>
                <p className="text-md text-gray-500 mb-4">
                  Developed by{" "}
                  <span className="text-blue-600 font-medium">
                    {app.companyName}
                  </span>
                </p>
              </div>

              <div className="flex gap-8 mt-4 pt-2 border-t md:border-t-0 justify-between sm:justify-start">
                <div className="text-center">
                  <img
                    src={downloadIcon}
                    alt="Downloads"
                    className="w-5 h-5 mx-auto mb-1 opacity-70"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {app.downloads}
                  </p>
                  <p className="text-sm text-gray-500">Downloads</p>
                </div>

                <div className="text-center">
                  <img
                    src={starIcon}
                    alt="Rating"
                    className="w-5 h-5 mx-auto mb-1 opacity-70"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {app.ratingAvg}
                  </p>
                  <p className="text-sm text-gray-500">Avg Ratings</p>
                </div>

                <div className="text-center">
                  <img
                    src={reviewIcon}
                    alt="Reviews"
                    className="w-5 h-5 mx-auto mb-1 opacity-70"
                  />
                  <p className="text-xl font-bold text-gray-800">
                    {formatNumber(totalReviews)}
                  </p>
                  <p className="text-sm text-gray-500">Total Reviews</p>
                </div>
              </div>

              <button className="btn mt-6 w-fit bg-gradient-to-r from-[#632ee3] to-[#9f62f2] hover:from-[#9f62f2] hover:to-[#632ee3] text-white font-semibold py-2 px-6 rounded-lg shadow-lg flex items-center gap-2 transition ease-in-out duration-300">
                Install Now ({app.size} MB)
              </button>
            </div>
          </header>

          <section className="py-8 border-b mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ratings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="flex flex-col space-y-4">
                  {processedRatings.map((rating) => (
                    <div key={rating.name} className="flex items-center gap-3">
                      <span className="w-12 text-sm text-gray-600 text-right">
                        {rating.name.split(" ")[0]} star
                      </span>

                      <div className="flex-1 h-5">
                        {" "}
                        <div
                          className="h-5 bg-orange-500 transition-all duration-500 ease-out"
                          style={{
                            width: calculateBarWidth(
                              rating.count,
                              maxRatingCount
                            ),
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 ml-[60px] flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>3000</span>
                  <span>6000</span>
                  <span>9000</span>
                  <span>12000</span>
                </div>
              </div>
            </div>
          </section>

          {/* --- Description Section --- */}
          <section className="py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Description
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              {app.description}
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default AppDetailsPage;
