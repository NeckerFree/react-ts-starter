import { useEffect, useState } from "react";

interface User
{
    id: number;
    name: string;
}


const UsersList = () =>
{
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        const fetchUsers = async () =>
        {
            // Simulate network delay (5 seconds)
            await new Promise((resolve) => setTimeout(resolve, 5000));
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();

            setUsers(data);      // Update state
            setLoading(false);   // Trigger re-render
        };

        fetchUsers();          // Side effect runs once on mount
    }, []);                  // Empty dependency array = run only once

    if (loading) return <p>Loading...</p>;

    return (
        <ul>
            {users.map((u) => (
                <ul>
                    <li key={u.id}>{u.id}. {u.name}</li>
                </ul>
            ))}
        </ul>
    );
};

export default UsersList;
