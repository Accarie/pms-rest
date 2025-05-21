/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet";
import { CommonContext } from "@/context";
import { getSlotRequests } from "@/services/slot-request";
// import { getSlots } from "@/services/slots";
import { getVehicles } from "@/services/vehicle";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";

const AdminDashboard: React.FC = () => {
  const PAGE_SIZES = [5, 10, 15, 20];
  const [loading, setLoading] = useState(false);
  const [requestsPage, setRequestsPage] = useState(1);
  const [requestsLimit, setRequestsLimit] = useState(PAGE_SIZES[0]);
  const [vehiclesPage, setVehiclesPage] = useState(1);
  const [vehiclesLimit, setVehiclesLimit] = useState(PAGE_SIZES[0]);
  const [searchKey, setSearchKey] = useState("");
  const [totalSlots, setTotalSlots] = useState(0); // New state for total slots

  const { setRequests, slotRequests, setMeta, meta, setVehicles, vehicles } =
    useContext(CommonContext);

  const userSlice = useSelector((state: any) => state.userSlice);
  const role: string = userSlice.user.role;

  useEffect(() => {
    if (role === "ADMIN") {
      setLoading(true);

      getSlotRequests({
        page: requestsPage,
        limit: requestsLimit,
        setLoading,
        setMeta,
        setRequests,
        searchKey,
      });

      getVehicles({
        page: vehiclesPage,
        limit: vehiclesLimit,
        setLoading,
        setMeta,
        setVehicles,
        searchKey,
      });

      const fetchSlots = async () => {
       try {
        // const slotsData = await getSlots();
        // setTotalSlots(slotsData?.total ?? 0);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
        setTotalSlots(0);
  }
};


      fetchSlots();
    }
  }, [
    requestsPage,
    requestsLimit,
    vehiclesPage,
    vehiclesLimit,
    searchKey,
    role,
    setMeta,
    setRequests,
    setVehicles,
  ]);

  const requestColumns: DataTableColumn[] = [
    { accessor: "vehicle.plateNumber", title: "Plate Number" },
    { accessor: "vehicle.model", title: "Model" },
    {
      accessor: "slot.location",
      title: "Slot Location",
      render: ({ slot }: any) => slot?.location || "N/A",
    },
    {
      accessor: "status",
      title: "Status",
      render: ({ status }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${
            status === "APPROVED"
              ? "bg-green-100 text-green-600"
              : status === "REJECTED"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-500"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  const vehicleColumns: DataTableColumn[] = [
    { accessor: "plateNumber", title: "Plate Number" },
    { accessor: "vehicleType", title: "Type" },
    { accessor: "model", title: "Model" },
    { accessor: "color", title: "Color" },
    { accessor: "maker", title: "Manufacturer" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <Sidebar />
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="w-full lg:ml-[16.6667%] flex flex-col">
        <Navbar />
        <div className="px-4 sm:px-10 py-8 space-y-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, Admin
          </h1>
          <p className="text-gray-600 mb-6">
            Digital Parking Management System
          </p>

          {/*======= Search =======*/}
          <div className="flex justify-end">
            <div className="bg-white rounded-full shadow-md flex items-center h-12 w-full sm:w-1/2 lg:w-1/4 px-4">
              <input
                type="text"
                placeholder="Search"
                className="flex-grow outline-none bg-transparent text-sm"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <BiSearch className="text-gray-600" size={20} />
            </div>
          </div>

          {/*======= Summary Cards (only 3) =======*/}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Total Requests", value: meta?.total || 0 },
              { label: "Total Vehicles", value: vehicles?.length || 0 },
              { label: "Total Slots", value: totalSlots },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:bg-primary-black hover:shadow-xl"
              >
                <h2 className="text-sm text-gray-500">{card.label}</h2>
                <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
              </div>
            ))}
          </div>

          {/*======= Slot Requests =======*/}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Slot Requests</h2>
            <DataTable
              records={slotRequests || []}
              columns={requestColumns}
              page={requestsPage}
              recordsPerPage={requestsLimit}
              onPageChange={setRequestsPage}
              onRecordsPerPageChange={setRequestsLimit}
              totalRecords={meta?.total || 0}
              recordsPerPageOptions={PAGE_SIZES}
              loadingText={loading ? "Loading..." : "Fetching records..."}
              noRecordsText="Requests will appear here."
              highlightOnHover
              striped
              withTableBorder
              borderRadius="md"
              withColumnBorders
              paginationActiveBackgroundColor="#3b82f6"
            />
          </div>

          {/*======= Registered Vehicles =======*/}
          <div>
            <h2 className="text-xl font-semibold mb-4">Registered Vehicles</h2>
            <DataTable
              records={vehicles || []}
              columns={vehicleColumns}
              page={vehiclesPage}
              recordsPerPage={vehiclesLimit}
              onPageChange={setVehiclesPage}
              onRecordsPerPageChange={setVehiclesLimit}
              totalRecords={meta?.total || 0}
              recordsPerPageOptions={PAGE_SIZES}
              loadingText={loading ? "Loading..." : "Fetching vehicles..."}
              highlightOnHover
              striped
              withTableBorder
              borderRadius="md"
              withColumnBorders
              paginationActiveBackgroundColor="#3b82f6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
