import { useLoaderData } from "react-router";
import HeroSection from "../Components/HeroSection";
import AppsDataCard from "../Components/AppsDataCard";

const Home = () => {
  const apps = useLoaderData();
  return (
    <div>
      <HeroSection />
      <div>
        <h2 className="font-bold text-5xl">Trending Apps</h2>
        <p>Explore All Trending Apps on the Market developed by us</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-20 gap-4">
          {apps.map((app) => (
            <AppsDataCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
