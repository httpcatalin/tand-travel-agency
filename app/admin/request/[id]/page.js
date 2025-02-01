'use client'
import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function AdminUserDetail() {
    const { id } = useParams()
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const [bookingData, setBookingData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [formState, setFormState] = useState({})
    const [bookingFormState, setBookingFormState] = useState({})
    const [editingUser, setEditingUser] = useState(false)
    const [editingBooking, setEditingBooking] = useState(false)
    const [loading, setLoading] = useState(true)
    const [newComment, setNewComment] = useState('')

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/users/${id}?type=${type}`)
            if (data.data) {
                setBookingData(data.data)
                if (data.data.user) {
                    setUserData(data.data.user)
                    setFormState({
                        fullName: data.data.user.fullName || '',
                        phone: data.data.user.phone || '',
                        email: data.data.user.email || '',
                        isDone: data.data.isDone || false
                    })
                }
                if (type === 'stay') {
                    setBookingFormState({
                        destination: data.data.destination || '',
                        checkIn: data.data.checkIn ? new Date(data.data.checkIn).toISOString().split('T')[0] : '',
                        checkOut: data.data.checkOut ? new Date(data.data.checkOut).toISOString().split('T')[0] : '',
                        nights: data.data.nights || '',
                        adults: data.data.adults || '',
                        children: data.data.children || '',
                        hotel: data.data.hotel || '',
                        price: data.data.price || ''
                    })
                }
                if (type === 'flight') {
                    setBookingFormState({
                        from: data.data.from || '',
                        to: data.data.to || '',
                        departDate: data.data.departDate ? new Date(data.data.departDate).toISOString().split('T')[0] : '',
                        returnDate: data.data.returnDate ? new Date(data.data.returnDate).toISOString().split('T')[0] : '',
                        class: data.data.class || ''
                    })
                }
            }
            setLoading(false)
        } catch (error) {
            console.error('Fetch error:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id, type])

    const handleUserInputChange = e => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleBookingInputChange = e => {
        setBookingFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = async () => {
        try {
            const { data } = await axios.put(`/api/users/${id}?type=${type}`, {
                user: formState,
                booking: bookingFormState
            })
            if (data) {
                setEditingUser(false)
                setEditingBooking(false)
                fetchData()
            }
        } catch (error) {
            console.error('Save error:', error)
        }
    }

    const addComment = async () => {
        if (!newComment.trim()) return
        try {
            const { data } = await axios.put(`/api/users/${id}?type=${type}`, {
                comment: newComment
            })
            if (data) {
                setNewComment('')
                fetchData()
            }
        } catch (error) {
            console.error('Comment error:', error)
        }
    }

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
    if (!bookingData) return <div className="flex justify-center items-center h-screen">No data found</div>

    return (
        <main className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">{type === 'stay' ? 'Stay Booking Details' : 'Flight Booking Details'}</h1>
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">User Details</h2>
                    <button onClick={() => setEditingUser(!editingUser)} className="px-4 py-2 bg-blue-500 text-white rounded">
                        {editingUser ? 'Cancel' : 'Edit User'}
                    </button>
                </div>
                {editingUser ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Full Name</label>
                            <input type="text" name="fullName" value={formState.fullName} onChange={handleUserInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Email</label>
                            <input type="email" name="email" value={formState.email} onChange={handleUserInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Phone</label>
                            <input type="text" name="phone" value={formState.phone} onChange={handleUserInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block mb-1">Status</label>
                            <select name="isDone" value={formState.isDone} onChange={handleUserInputChange} className="w-full p-2 border rounded">
                                <option value="false">Pending</option>
                                <option value="true">Completed</option>
                            </select>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Full Name:</strong> {userData?.fullName}</p>
                        <p><strong>Email:</strong> {userData?.email}</p>
                        <p><strong>Phone:</strong> {userData?.phone}</p>
                        <p><strong>Status:</strong> {formState.isDone === "true" ? 'Completed' : 'Pending'}</p>
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Booking Details</h2>
                    <button onClick={() => setEditingBooking(!editingBooking)} className="px-4 py-2 bg-blue-500 text-white rounded">
                        {editingBooking ? 'Cancel' : 'Edit Booking'}
                    </button>
                </div>
                {editingBooking ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {type === 'stay' && (
                            <>
                                <div>
                                    <label className="block mb-1">Destination</label>
                                    <input type="text" name="destination" value={bookingFormState.destination} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Check In</label>
                                    <input type="date" name="checkIn" value={bookingFormState.checkIn} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Check Out</label>
                                    <input type="date" name="checkOut" value={bookingFormState.checkOut} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Nights</label>
                                    <input type="number" name="nights" value={bookingFormState.nights} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Adults</label>
                                    <input type="number" name="adults" value={bookingFormState.adults} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Children</label>
                                    <input type="number" name="children" value={bookingFormState.children} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Hotel</label>
                                    <input type="text" name="hotel" value={bookingFormState.hotel} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Price</label>
                                    <input type="number" name="price" value={bookingFormState.price} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                            </>
                        )}
                        {type === 'flight' && (
                            <>
                                <div>
                                    <label className="block mb-1">From</label>
                                    <input type="text" name="from" value={bookingFormState.from} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">To</label>
                                    <input type="text" name="to" value={bookingFormState.to} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Departure Date</label>
                                    <input type="date" name="departDate" value={bookingFormState.departDate} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Return Date</label>
                                    <input type="date" name="returnDate" value={bookingFormState.returnDate} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                                <div>
                                    <label className="block mb-1">Class</label>
                                    <input type="text" name="class" value={bookingFormState.class} onChange={handleBookingInputChange} className="w-full p-2 border rounded" />
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {type === 'stay' && (
                            <>
                                <p><strong>Destination:</strong> {bookingData.destination}</p>
                                <p><strong>Check In:</strong> {new Date(bookingData.checkIn).toLocaleDateString()}</p>
                                <p><strong>Check Out:</strong> {new Date(bookingData.checkOut).toLocaleDateString()}</p>
                                <p><strong>Nights:</strong> {bookingData.nights}</p>
                                <p><strong>Adults:</strong> {bookingData.adults}</p>
                                <p><strong>Children:</strong> {bookingData.children}</p>
                                <p><strong>Hotel:</strong> {bookingData.hotel || 'Not specified'}</p>
                                <p><strong>Price:</strong> ${bookingData.price || 0}</p>
                            </>
                        )}
                        {type === 'flight' && (
                            <>
                                <p><strong>From:</strong> {bookingData.from}</p>
                                <p><strong>To:</strong> {bookingData.to}</p>
                                <p><strong>Departure:</strong> {new Date(bookingData.departDate).toLocaleDateString()}</p>
                                {bookingData.returnDate && <p><strong>Return:</strong> {new Date(bookingData.returnDate).toLocaleDateString()}</p>}
                                <p><strong>Class:</strong> {bookingData.class}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
            {(editingUser || editingBooking) && (
                <div className="mb-6">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Save All Changes
                    </button>
                </div>
            )}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                <div className="mb-4">
                    <textarea value={newComment} onChange={e => setNewComment(e.target.value)} className="w-full border rounded p-2" placeholder="Write a comment..." rows="3" />
                    <button onClick={addComment} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Comment</button>
                </div>
                <div className="space-y-4">
                    {bookingData.comments?.map((comment, index) => (
                        <div key={index} className="p-4 bg-gray-100 rounded">
                            <p>{comment.content}</p>
                            <p className="text-sm text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}