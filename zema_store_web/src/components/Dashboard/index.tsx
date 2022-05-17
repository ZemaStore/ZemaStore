import React from "react";

type Props = {};

const DashboardComponent = (props: Props) => {
  return (
    <div className="mt-20 relative">
      <div className="z-0 my-5 w-full grid grid:cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-between gap-10">
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img className="w-24 h-24" src="/images/users.svg" alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">534</h1>
            <span className="text-gray-500">Users</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img className="w-24 h-24" src="/images/song.svg" alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">9.43k</h1>
            <span className="text-gray-500">Songs</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img
            className="w-24 h-24"
            src="/images/folder-music.svg"
            alt=""
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">9.7k</h1>
            <span className="text-gray-500">Albums</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img
            className="w-24 h-24"
            src="/images/economy-grow.svg"
            alt=""
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">50 M</h1>
            <span className="text-gray-500">Total Revenue</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img
            className="w-24 h-24"
            src="/images/concert.svg"
            alt=""
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">534</h1>
            <span className="text-gray-500">Active Events</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-x-4">
        <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
          <h1 className="text-xl font-bold text-gray-800 mt-4">
            Today’s Status
          </h1>
          <div className="flex justify-between space-x-4 text-center mt-6">
            <div className="bg-indigo-50 rounded-xl p-10">
              <h3>8.7K</h3>
              <span>Total Present</span>
            </div>
            <div className="bg-indigo-50 rounded-xl p-10">
              <h3>99</h3>
              <span>Registrations</span>
            </div>
            <div className="bg-indigo-50 rounded-xl p-10">
              <h3>30</h3>
              <span>Totals Session</span>
            </div>
          </div>
        </div>
        <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
          <h1 className="text-xl font-bold text-gray-800 mt-4">
            Today’s Status
          </h1>
          <div className="flex justify-between space-x-4 text-center mt-6">
            <div className="bg-indigo-50 rounded-xl p-10">
              <h3>8.7K</h3>
              <span>Total Present</span>
            </div>
            <div className="bg-indigo-50 rounded-xl p-10">
              <h3>99</h3>
              <span>Registrations</span>
            </div>
            <div className="bg-indigo-50 rounded-xl p-10">
              <h3>30</h3>
              <span>Totals Session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
