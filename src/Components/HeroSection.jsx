import playStoreLogo from "../assets/playstore.png";
import appStoreLogo from "../assets/appstore.png";
import heroImg from "../assets/hero.png";
import Container from "./Container";

const HeroSection = () => {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h1 className="font-bold text-5xl md:text-7xl pb-4">
            We Build <br />
            <span className="bg-gradient-to-r from-[#632ee3] to-[#9f62f2] bg-clip-text text-transparent">
              Productive
            </span>{" "}
            Apps
          </h1>
          <p className="pt-4 pb-10 text-gray-600">
            At HERO.IO, we craft innovative apps designed to make everyday life
            simpler, smarter, and more exciting. <br />
            Our goal is to turn your ideas into digital experiences that truly
            make an impact.
          </p>
          <div className="flex gap-4 justify-center pb-10">
            <button className="btn btn-outline">
              <img src={playStoreLogo} alt="" /> Google Play
            </button>
            <button className="btn btn-outline">
              <img src={appStoreLogo} alt="" /> App Store
            </button>
          </div>
        </div>

        <div>
          <img className="mx-auto" src={heroImg} alt="Hero illustration" />
        </div>
      </Container>

      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-r from-[#632ee3] to-[#9f62f2] w-full">
          <Container>
            <div className="text-center text-white py-20">
              <h2 className="font-bold text-4xl md:text-5xl">
                Trusted by Millions, Built for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-[16px] pt-10">
                <div>
                  <h3 className="pb-4 opacity-80">Total Downloads</h3>
                  <span className="font-extrabold text-5xl md:text-6xl">
                    29.6M
                  </span>
                  <p className="pt-4 opacity-80">21% more than last month</p>
                </div>
                <div>
                  <h3 className="pb-4 opacity-80">Total Reviews</h3>
                  <span className="font-extrabold text-5xl md:text-6xl">
                    906K
                  </span>
                  <p className="pt-4 opacity-80">46% more than last month</p>
                </div>
                <div>
                  <h3 className="pb-4 opacity-80">Active Apps</h3>
                  <span className="font-extrabold text-5xl md:text-6xl">
                    132+
                  </span>
                  <p className="pt-4 opacity-80">31 more will Launch</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
