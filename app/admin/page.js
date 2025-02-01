'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [usersStay, setUsersStay] = useState([]);
    const [usersFlight, setusersFlight] = useState([]);
    const [filter, setFilter] = useState('flight');
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    const fetchUsers = async () => {
        let url = `/api/users`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setUsersStay(data.usersStay);
        console.log(usersFlight);
        setusersFlight(data.usersFlight);
        console.log(usersStay)
    };


    useEffect(() => {
        fetchUsers();
    }, [filter, sortField, sortOrder]);

    const getBookingType = (user) => {
        const hasStay = user.stayBookings && user.stayBookings.length > 0;
        const hasFlight = user.flightBookings && user.flightBookings.length > 0;
        if (hasStay) return 'Stay';
        if (hasFlight) return 'Flight';
        return 'None';
    };

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* Filters */}
            <div className="mb-6 space-x-4">
                <button onClick={() => setFilter('stay')}
                    className={`px-4 py-2 rounded-md ${filter === 'stay' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    Stay Only
                </button>
                <button onClick={() => setFilter('flight')}
                    className={`px-4 py-2 rounded-md ${filter === 'flight' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    Flight Only
                </button>
            </div>

            {/* Sort options */}
            <div className="mb-6 space-x-4">
                <label className="font-bold">Sort By:</label>
                <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                    <option value="createdAt">Creation Date</option>
                    <option value="fullName">Name</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Phone</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter === 'stay' && usersStay.map((user) => (

                            <tr key={user._id}>
                                <td className="py-2 px-4 border">{user.user.fullName}</td>
                                <td className="py-2 px-4 border">{user.user.email}</td>
                                <td className="py-2 px-4 border">{user.user.phone}</td>
                                <td className="py-2 px-4 border">{user.isDone ? "Completed" : "Pend"}</td>
                                <td className="py-2 px-4 border">
                                    <Link href={`/admin/request/${user._id}?type=stay`}>
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                            Detail
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                        }
                        {filter === 'flight' && usersFlight.map((user) => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border">{user.user.fullName}</td>
                                <td className="py-2 px-4 border">{user.user.email}</td>
                                <td className="py-2 px-4 border">{user.user.phone}</td>
                                <td className="py-2 px-4 border">{user.isDone}</td>

                                <td className="py-2 px-4 border">
                                    <Link href={`/admin/request/${user._id}?type=flight`}>
                                        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                            Detail
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );
}