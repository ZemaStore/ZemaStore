import React, { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import ReportService from "../../app/services/reports.service";
import { Report } from "../../helpers/types";

type Props = {
  report: Report
};

const DashboardComponent = (props: Props) => {
  const [activeUsers, setActiveUsers] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [totalArtists, setTotalArtists] = useState(0)
  const [totalSongs, setTotalSongs] = useState(0)
  const [totalAlbums, setTotalAlbums] = useState(0)
  const [totalActiveEvents, setTotalActiveEvents] = useState(0)
  const [totalRevenue, settotalRevenue] = useState(0)

  const fetchAlbums = useCallback(
    async () => {
      const data = await ReportService.getTotalAlbums()
      setTotalAlbums(data)
    },
    [],
  )
  const fetchSongs = useCallback(
    async () => {
      const data = await ReportService.getTotalSongs()
      setTotalSongs(data)
    },
    [],
  )
  const fetchArtists = useCallback(
    async () => {
      const data = await ReportService.getTotalArtists()
      setTotalArtists(data)
    },
    [],
  )
  const fetchEvents = useCallback(
    async () => {
      const data = await ReportService.getTotalActiveEvents()
      setTotalActiveEvents(data)
    },
    [],
  )
  const fetchRevenue = useCallback(
    async () => {
      const data = await ReportService.getTotalRevenue()
      settotalRevenue(data)
    },
    [],
  )
  const fetchActiveUsers = useCallback(
    async () => {
      const { data } = await ReportService.getTotalActiveUsers()
      setActiveUsers(data)
    },
    [],
  )
  const fetchCustomers = useCallback(
    async () => {
      const data = await ReportService.getTotalCustomers()
      console.log("data is ", data)
      setTotalCustomers(data)
    },
    [],
  )

  useEffect(() => {
    fetchActiveUsers()
    fetchAlbums()
    fetchCustomers()
    fetchEvents()
    fetchArtists()
    fetchRevenue()
    fetchSongs()
  }, [])



  return (
    <div className="mt-20 relative w-full">
      <div className="z-0 my-5 w-full grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 justify-between ">
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img className="w-24 h-24" src="/images/users.svg" alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              <CountUp duration={0.5} start={0} end={totalCustomers} />
            </h1>
            <span className="text-gray-500">Users</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img className="w-24 h-24" src="/images/users.svg" alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              <CountUp duration={0.5} start={0} end={totalArtists} />
            </h1>
            <span className="text-gray-500">Artists</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img className="w-24 h-24" src="/images/song.svg" alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              <CountUp duration={0.5} start={0} end={totalSongs} />
            </h1>
            <span className="text-gray-500">Songs</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img className="w-24 h-24" src="/images/folder-music.svg" alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              <CountUp duration={0.5} start={0} end={totalAlbums} />
            </h1>
            <span className="text-gray-500">Albums</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img className="w-24 h-24" src="/images/economy-grow.svg" alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">$
              <CountUp duration={0.5} start={0} end={totalRevenue} />
            </h1>
            <span className="text-gray-500">Total Revenue</span>
          </div>
        </div>
        <div className="min-h-[200px] bg-white w-full rounded-xl shadow-lg flex items-center justify-around">
          <img className="w-24 h-24" src="/images/concert.svg" alt="" />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              <CountUp duration={0.5} start={0} end={totalActiveEvents} />
            </h1>
            <span className="text-gray-500">Active Events</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-x-4">
        <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
          <h1 className="text-xl font-bold text-gray-800 mt-4">
            Today’s Status
          </h1>
          <div className="text-center mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
            <div className="bg-indigo-50 rounded-xl p-10 w-full h-full">
              <h3>8.7K</h3>
              <span>Total Present</span>
            </div>
            <div className="bg-indigo-50 rounded-xl p-10 w-full h-full">
              <h3>99</h3>
              <span>Registrations</span>
            </div>
            <div className="bg-indigo-50 rounded-xl p-10 w-full h-full">
              <h3>30</h3>
              <span>Totals Session</span>
            </div>
          </div>
        </div>
        <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
          <h1 className="text-xl font-bold text-gray-800 mt-4">
            Today’s Status
          </h1>
          <div className="text-center mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
            <div className="bg-indigo-50 rounded-xl p-10 w-full h-full">
              <h3>8.7K</h3>
              <span>Total Present</span>
            </div>
            <div className="bg-indigo-50 rounded-xl p-10 w-full h-full">
              <h3>99</h3>
              <span>Registrations</span>
            </div>
            <div className="bg-indigo-50 rounded-xl p-10 w-full h-full">
              <h3>30</h3>
              <span>Totals Session</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default DashboardComponent;
