import React, { useState, useEffect } from "react";
import useApp from "../Hooks/useApp";
import AppsDataCard from "../Components/AppsDataCard";
import NotFound from "../Components/NotFound";
import Spinner from "../Components/LoadingSpinner";

const AllApps = () => {
  // useApp হুক থেকে প্রাথমিক ডেটা এবং পেজ লোডিং স্টেট আনা হচ্ছে
  const { apps: initialApps, loading: pageLoading, error } = useApp();
  
  // কম্পোনেন্টের জন্য প্রয়োজনীয় স্টেটগুলো
  const [search, setSearch] = useState("");
  const [filteredApps, setFilteredApps] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // সার্চের জন্য লোডিং স্টেট

  // initialApps লোড হওয়ার পর filteredApps স্টেটকে সেট করা হচ্ছে
  useEffect(() => {
    if (initialApps) {
      setFilteredApps(initialApps);
    }
  }, [initialApps]);

  // সার্চ ইনপুটের পরিবর্তনের উপর ভিত্তি করে অ্যাপ ফিল্টার করার জন্য
  useEffect(() => {
    const term = search.trim().toLowerCase();

    // যদি সার্চ ইনপুট খালি থাকে, তাহলে সব অ্যাপ দেখাও এবং আর কিছু করো না
    if (!term) {
      setFilteredApps(initialApps || []);
      return;
    }

    // সার্চ শুরু হওয়ার আগে লোডিং স্টেট true করা
    setIsSearching(true);

    // একটি কাল্পনিক API কলের ডিলে সিমুলেট করার জন্য setTimeout ব্যবহার করা হচ্ছে
    // বাস্তবে এখানে debounce ফাংশন ব্যবহার করা উচিত
    const searchTimeout = setTimeout(() => {
      const result = initialApps.filter((app) =>
        app.title.toLowerCase().includes(term)
      );
      setFilteredApps(result);
      setIsSearching(false); // সার্চ শেষ হলে লোডিং স্টেট false করা
    }, 500); // 500ms ডিলে

    // কম্পোনেন্ট আনমাউন্ট বা সার্চ টার্ম পরিবর্তন হলে আগের таймout ক্লিয়ার করা
    return () => clearTimeout(searchTimeout);
  }, [search, initialApps]);

  // প্রাথমিক পেজ লোডিং অবস্থা হ্যান্ডেল করা
  if (pageLoading) {
    // এখানে আপনি একটি বড় স্পিনার বা স্কেলেটন UI দেখাতে পারেন
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Loading Applications...</p>
      </div>
    );
  }

  // ডেটা লোড করার সময় এরর হলে তা দেখানো
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <h2 className="font-bold text-3xl">Failed to load applications.</h2>
      </div>
    );
  }

  const handleGoBack = () => {
    setSearch("");
  };

  return (
    <div className="py-20 px-4 md:px-8">
      <div className="text-center">
        <h2 className="font-bold text-5xl pb-4">Our All Applications</h2>
        <p className="text-[#627382] text-[20px]">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>
      <div className="flex justify-between items-center pt-10">
        <span className="font-semibold text-2xl">
          ({filteredApps.length}) Apps Found
        </span>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            value={search}
            type="text"
            className="grow"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Apps"
          />
        </label>
      </div>

      {/* সার্চ চলাকালীন স্পিনার দেখানো */}
      {isSearching ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 gap-4">
          {filteredApps.map((app) => (
            <AppsDataCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <NotFound onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default AllApps;