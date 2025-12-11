import { useEffect, useState } from "react";

interface User
{
    id: number;
    username: string;
    name: string;
}

const UsersList = () =>
{
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() =>
    {
        const fetchUsers = async () =>
        {
            // Simulate network delay (5 seconds)
            await new Promise((resolve) => setTimeout(resolve, 5000));

            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();

            setUsers(data);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    // Filter by username dynamically
    const filteredUsers = users.filter((u) =>
        u.username.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <p>Loading... (5s delay)</p>;

    return (
        <div>
            <input
                type="text"
                placeholder="Search by username..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "12px", padding: "6px" }}
            />

            <ul>
                {filteredUsers.map((u) => (
                    <li key={u.id}>
                        {u.username} – {u.name}
                    </li>
                ))}
            </ul>

            {filteredUsers.length === 0 && <p>No matching users.</p>}
        </div>
    );
};

export default UsersList;
