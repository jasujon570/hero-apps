import { Link, useLoaderData } from "react-router";
import HeroSection from "../Components/HeroSection";
import AppsDataCard from "../Components/AppsDataCard";
import useApp from "../Hooks/useApp";

const Home = () => {
  const { apps, loading, error } = useApp();
  const topApps = apps.slice(0, 8);
  return (
    <div>
      <HeroSection />
      <div className="pb-20">
        <div className="text-center">
          <h2 className="font-bold text-5xl pb-4">Trending Apps</h2>
          <p className="text-[#627382] text-[20px]">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-20 gap-4">
          {topApps.map((app) => (
            <AppsDataCard key={app.id} app={app} />
          ))}
        </div>
        <div className="text-center">
          <Link to='/apps'>
            <button className="btn bg-linear-to-r from-[#632EE3] to-[#9F62F2] font-semibold text-white px-10">
              Show All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
