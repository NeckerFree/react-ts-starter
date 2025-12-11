import { useEffect, useState } from "react";

interface User
{
    id: number;
    name: string;
    username: string;
    email: string;
}

const UsersList = () =>
{
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 3;

    useEffect(() =>
    {
        const fetchUsers = async () =>
        {
            // Simulate 5-second loading delay
            await new Promise((resolve) => setTimeout(resolve, 5000));

            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data: User[] = await response.json();

            setUsers(data);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    // Filter by username
    const filteredUsers = users.filter((u) =>
        u.username.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const usersToRender = filteredUsers.slice(startIndex, endIndex);

    const goNext = () =>
    {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goPrev = () =>
    {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (loading) return <p>Loading... (5s delay)</p>;

    return (
        <div style={{ maxWidth: 400 }}>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by username..."
                value={search}
                onChange={(e) =>
                {
                    setSearch(e.target.value);
                    setCurrentPage(1); // Reset to first page when filtering
                }}
                style={{ marginBottom: 12, padding: 6, width: "100%" }}
            />

            {/* Users List */}
            <ul>
                {usersToRender.map((u) => (
                    <li key={u.id}>
                        <strong>{u.username}</strong> — {u.name}
                    </li>
                ))}
            </ul>

            {/* No results */}
            {filteredUsers.length === 0 && <p>No matching users.</p>}

            {/* Pagination Controls */}
            {filteredUsers.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button onClick={goPrev} disabled={currentPage === 1}>
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button onClick={goNext} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UsersList;
